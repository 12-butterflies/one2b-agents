/**
 * Fireflies Multi-Account MCP Server
 * One 2b — aggregates transcripts from all Fireflies workspaces
 *
 * Accounts covered:
 *   FIREFLIES_KEY_JPS_ONE2B  — jps@one2b.io
 *   FIREFLIES_KEY_JPS_12B    — jps@12butterflies.life
 *   FIREFLIES_KEY_12B        — 12b@12butterflies.life
 *
 * The hello@one2b.io workspace is already connected via the built-in Fireflies
 * connector — this MCP covers the three additional workspaces.
 *
 * Usage: node index.js (stdio transport — add to claude_desktop_config.json)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import fetch from 'node-fetch'

const FIREFLIES_GQL = 'https://api.fireflies.ai/graphql'

// ── Accounts ──────────────────────────────────────────────────────────────────

const ACCOUNTS = [
  { label: 'jps@one2b.io',          key: process.env.FIREFLIES_KEY_JPS_ONE2B },
  { label: 'jps@12butterflies.life', key: process.env.FIREFLIES_KEY_JPS_12B },
  { label: '12b@12butterflies.life', key: process.env.FIREFLIES_KEY_12B },
].filter(a => a.key)

if (ACCOUNTS.length === 0) {
  process.stderr.write('ERROR: No Fireflies API keys found in environment.\n')
  process.exit(1)
}

// ── GraphQL helper ────────────────────────────────────────────────────────────

async function gql(apiKey, query, variables = {}) {
  const res = await fetch(FIREFLIES_GQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors.map(e => e.message).join('; '))
  return json.data
}

// ── GraphQL queries ───────────────────────────────────────────────────────────

const TRANSCRIPTS_QUERY = `
query GetTranscripts($limit: Int, $skip: Int, $fromDate: DateTime, $toDate: DateTime) {
  transcripts(limit: $limit, skip: $skip, fromDate: $fromDate, toDate: $toDate) {
    id
    title
    date
    duration
    meeting_link
    organizer_email
    participants
    summary {
      keywords
      action_items
      overview
      shorthand_bullet
      bullet_gist
    }
  }
}
`

const TRANSCRIPT_QUERY = `
query GetTranscript($id: String!) {
  transcript(id: $id) {
    id
    title
    date
    duration
    meeting_link
    organizer_email
    participants
    summary {
      keywords
      action_items
      overview
      shorthand_bullet
      bullet_gist
    }
    sentences {
      speaker_name
      text
      start_time
    }
  }
}
`

const USER_QUERY = `
query GetUser {
  user {
    user_id
    name
    email
    num_transcripts
    recent_meeting
    minutes_logged
  }
}
`

const SEARCH_QUERY = `
query SearchTranscripts($keyword: String!) {
  transcripts(keyword: $keyword) {
    id
    title
    date
    participants
    summary {
      overview
      action_items
    }
  }
}
`

// ── Tool implementations ──────────────────────────────────────────────────────

async function getTranscriptsAll({ limit = 50, skip = 0, fromDate, toDate } = {}) {
  const results = await Promise.allSettled(
    ACCOUNTS.map(async ({ label, key }) => {
      const data = await gql(key, TRANSCRIPTS_QUERY, { limit, skip, fromDate, toDate })
      return (data.transcripts || []).map(t => ({ ...t, _account: label }))
    })
  )

  const all = []
  const seen = new Set()
  for (const r of results) {
    if (r.status === 'fulfilled') {
      for (const t of r.value) {
        if (!seen.has(t.id)) {
          seen.add(t.id)
          all.push(t)
        }
      }
    }
  }

  // Sort by date descending
  all.sort((a, b) => (b.date || 0) - (a.date || 0))
  return all
}

async function getTranscript({ id }) {
  for (const { label, key } of ACCOUNTS) {
    try {
      const data = await gql(key, TRANSCRIPT_QUERY, { id })
      if (data.transcript) return { ...data.transcript, _account: label }
    } catch (_) {
      // try next account
    }
  }
  throw new Error(`Transcript ${id} not found in any connected account`)
}

async function getUserAll() {
  const results = await Promise.allSettled(
    ACCOUNTS.map(async ({ label, key }) => {
      const data = await gql(key, USER_QUERY)
      return { account: label, ...data.user }
    })
  )
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
}

async function searchAll({ keyword }) {
  const results = await Promise.allSettled(
    ACCOUNTS.map(async ({ label, key }) => {
      const data = await gql(key, SEARCH_QUERY, { keyword })
      return (data.transcripts || []).map(t => ({ ...t, _account: label }))
    })
  )

  const all = []
  const seen = new Set()
  for (const r of results) {
    if (r.status === 'fulfilled') {
      for (const t of r.value) {
        if (!seen.has(t.id)) {
          seen.add(t.id)
          all.push(t)
        }
      }
    }
  }
  return all
}

// ── MCP Server ────────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'fireflies-multi', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'fireflies_multi_get_transcripts',
      description: `Get transcripts from ALL connected Fireflies accounts (${ACCOUNTS.map(a => a.label).join(', ')}). Deduplicates by ID. Each transcript includes an _account field showing which workspace it came from.`,
      inputSchema: {
        type: 'object',
        properties: {
          limit:    { type: 'number', description: 'Max per account (default 50)', default: 50 },
          skip:     { type: 'number', description: 'Pagination offset', default: 0 },
          fromDate: { type: 'string', description: 'ISO date string (e.g. 2024-01-01)' },
          toDate:   { type: 'string', description: 'ISO date string (e.g. 2026-12-31)' },
        },
      },
    },
    {
      name: 'fireflies_multi_get_transcript',
      description: 'Get full transcript content (including sentences) by ID. Tries all connected accounts.',
      inputSchema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: 'Fireflies transcript ID' },
        },
      },
    },
    {
      name: 'fireflies_multi_get_users',
      description: 'Get user/account info and transcript counts from all connected Fireflies accounts.',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'fireflies_multi_search',
      description: 'Search transcripts by keyword across ALL connected Fireflies accounts.',
      inputSchema: {
        type: 'object',
        required: ['keyword'],
        properties: {
          keyword: { type: 'string', description: 'Search keyword' },
        },
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    let result

    switch (name) {
      case 'fireflies_multi_get_transcripts':
        result = await getTranscriptsAll(args)
        break
      case 'fireflies_multi_get_transcript':
        result = await getTranscript(args)
        break
      case 'fireflies_multi_get_users':
        result = await getUserAll()
        break
      case 'fireflies_multi_search':
        result = await searchAll(args)
        break
      default:
        throw new Error(`Unknown tool: ${name}`)
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2),
      }],
    }
  } catch (err) {
    return {
      content: [{ type: 'text', text: `Error: ${err.message}` }],
      isError: true,
    }
  }
})

// ── Start ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport()
await server.connect(transport)
process.stderr.write(`Fireflies Multi MCP running — ${ACCOUNTS.length} accounts: ${ACCOUNTS.map(a => a.label).join(', ')}\n`)
