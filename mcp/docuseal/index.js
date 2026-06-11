/**
 * DocuSeal MCP — One 2b
 * Covers: template upload, submission creation, status, signed PDF retrieval
 *
 * Auth: DOCUSEAL_API_KEY env var
 * API base: DOCUSEAL_API_BASE env var (defaults to https://api.docuseal.com for Cloud)
 *           Set to https://sign.one2b.io/api if self-hosted later
 *
 * Agents that use this:
 *   Document Agent — NDA, CPA, partnership agreement e-signing
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const API_KEY = process.env.DOCUSEAL_API_KEY
const API_BASE = process.env.DOCUSEAL_API_BASE || 'https://api.docuseal.com'

if (!API_KEY) {
  process.stderr.write('DOCUSEAL_API_KEY not set — MCP will start but all calls will fail auth\n')
}

async function docusealRequest(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = { raw: text } }
  if (!res.ok) throw new Error(`DocuSeal ${method} ${path} → ${res.status}: ${JSON.stringify(data)}`)
  return data
}

const TOOLS = [
  {
    name: 'docuseal_list_templates',
    description: 'List all document templates in DocuSeal. Returns template IDs and names.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'docuseal_create_submission',
    description: 'Create a signing submission from a template. Sends signing link to counterparty email. Returns submission ID and signing URL.',
    inputSchema: {
      type: 'object',
      properties: {
        template_id: { type: 'number', description: 'DocuSeal template ID' },
        submitters: {
          type: 'array',
          description: 'List of signers. Each needs name and email.',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string', description: 'Role as defined in template (e.g. "Company", "Counterparty")' },
              fields: {
                type: 'array',
                description: 'Pre-fill field values',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    default_value: { type: 'string' },
                  },
                },
              },
            },
            required: ['name', 'email'],
          },
        },
        message: { type: 'object', description: 'Custom email subject and body', properties: { subject: { type: 'string' }, body: { type: 'string' } } },
      },
      required: ['template_id', 'submitters'],
    },
  },
  {
    name: 'docuseal_get_submission',
    description: 'Get status of a signing submission. Returns status (pending/completed/declined), signers, and completion timestamp.',
    inputSchema: {
      type: 'object',
      properties: {
        submission_id: { type: 'number', description: 'DocuSeal submission ID' },
      },
      required: ['submission_id'],
    },
  },
  {
    name: 'docuseal_get_signed_documents',
    description: 'Retrieve download URLs for signed PDF documents from a completed submission.',
    inputSchema: {
      type: 'object',
      properties: {
        submission_id: { type: 'number', description: 'DocuSeal submission ID (must be completed)' },
      },
      required: ['submission_id'],
    },
  },
  {
    name: 'docuseal_upload_template',
    description: 'Upload a PDF as a new DocuSeal template. Returns the new template ID.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Template name (e.g. "One 2b NDA v1.0")' },
        documents: {
          type: 'array',
          description: 'Array of document objects with name and url (publicly accessible PDF URL)',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' },
            },
            required: ['name', 'url'],
          },
        },
      },
      required: ['name', 'documents'],
    },
  },
  {
    name: 'docuseal_void_submission',
    description: 'Void (cancel) a pending signing submission.',
    inputSchema: {
      type: 'object',
      properties: {
        submission_id: { type: 'number', description: 'DocuSeal submission ID to void' },
      },
      required: ['submission_id'],
    },
  },
]

const server = new Server(
  { name: 'docuseal', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }))

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params
  try {
    let result

    switch (name) {
      case 'docuseal_list_templates':
        result = await docusealRequest('GET', '/templates')
        break

      case 'docuseal_create_submission':
        result = await docusealRequest('POST', '/submissions', {
          template_id: args.template_id,
          submitters: args.submitters,
          ...(args.message && { message: args.message }),
        })
        break

      case 'docuseal_get_submission':
        result = await docusealRequest('GET', `/submissions/${args.submission_id}`)
        break

      case 'docuseal_get_signed_documents': {
        const sub = await docusealRequest('GET', `/submissions/${args.submission_id}`)
        if (sub.status !== 'completed') {
          result = { status: sub.status, message: 'Submission not yet completed — no signed documents available' }
        } else {
          result = { status: 'completed', documents: sub.documents || [] }
        }
        break
      }

      case 'docuseal_upload_template':
        result = await docusealRequest('POST', '/templates/pdf', {
          name: args.name,
          documents: args.documents,
        })
        break

      case 'docuseal_void_submission':
        result = await docusealRequest('DELETE', `/submissions/${args.submission_id}`)
        break

      default:
        throw new Error(`Unknown tool: ${name}`)
    }

    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
  } catch (err) {
    return { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true }
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
