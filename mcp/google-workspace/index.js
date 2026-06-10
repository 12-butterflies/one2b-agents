/**
 * Google Workspace MCP — One 2b
 * Covers: Google Sheets (cell-level reads/writes) + Google Docs (section reads/writes)
 *
 * Auth: Service account JSON key path via GOOGLE_SERVICE_ACCOUNT_KEY_PATH
 * Or OAuth2 refresh token via GOOGLE_REFRESH_TOKEN + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
 *
 * Agents that use this:
 *   Capital Readiness Curator — surgical data room spreadsheet updates
 *   Document Agent            — read/write Google Docs in data room staging
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { google } from 'googleapis'

// ── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH) {
    return new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
    })
  }
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return oauth2
}

const auth = getAuth()
const sheets = google.sheets({ version: 'v4', auth })
const docs = google.docs({ version: 'v1', auth })

// ── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  // SHEETS
  {
    name: 'sheets_read_range',
    description: 'Read a range of cells from a Google Sheet. Returns values as a 2D array.',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'Google Sheets file ID' },
        range: { type: 'string', description: 'A1 notation range, e.g. Sheet1!A1:F20' },
      },
      required: ['spreadsheet_id', 'range'],
    },
  },
  {
    name: 'sheets_write_range',
    description: 'Write values to a range of cells in a Google Sheet. Overwrites only the specified cells — does not touch anything outside the range.',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'Google Sheets file ID' },
        range: { type: 'string', description: 'A1 notation range, e.g. Sheet1!B5:D5' },
        values: {
          type: 'array',
          description: '2D array of values. Outer array = rows, inner array = columns.',
          items: { type: 'array', items: {} },
        },
        value_input_option: {
          type: 'string',
          enum: ['RAW', 'USER_ENTERED'],
          description: 'RAW = literal string. USER_ENTERED = parsed as if typed (formulas, dates, numbers). Default: USER_ENTERED.',
        },
      },
      required: ['spreadsheet_id', 'range', 'values'],
    },
  },
  {
    name: 'sheets_append_row',
    description: 'Append a new row to the first empty row after existing data in a sheet.',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'Google Sheets file ID' },
        range: { type: 'string', description: 'Sheet name or named range to append to, e.g. Sheet1' },
        values: {
          type: 'array',
          description: 'Single row as a flat array of values.',
          items: {},
        },
      },
      required: ['spreadsheet_id', 'range', 'values'],
    },
  },
  {
    name: 'sheets_get_metadata',
    description: 'Get spreadsheet metadata — sheet names, row/column counts, named ranges.',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheet_id: { type: 'string', description: 'Google Sheets file ID' },
      },
      required: ['spreadsheet_id'],
    },
  },
  // DOCS
  {
    name: 'docs_read',
    description: 'Read the full text content of a Google Doc. Returns structured content with paragraph styles.',
    inputSchema: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'Google Docs file ID' },
      },
      required: ['document_id'],
    },
  },
  {
    name: 'docs_replace_text',
    description: 'Replace all occurrences of a text string in a Google Doc. Use for surgical field updates — counterparty name, date, figure replacement.',
    inputSchema: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'Google Docs file ID' },
        find: { type: 'string', description: 'Text to find (exact match)' },
        replace: { type: 'string', description: 'Replacement text' },
        match_case: { type: 'boolean', description: 'Case-sensitive match. Default: true.' },
      },
      required: ['document_id', 'find', 'replace'],
    },
  },
  {
    name: 'docs_insert_text',
    description: 'Insert text at a specific index in a Google Doc.',
    inputSchema: {
      type: 'object',
      properties: {
        document_id: { type: 'string', description: 'Google Docs file ID' },
        text: { type: 'string', description: 'Text to insert' },
        index: { type: 'number', description: 'Character index at which to insert' },
      },
      required: ['document_id', 'text', 'index'],
    },
  },
  {
    name: 'docs_create_from_template',
    description: 'Copy a template Google Doc and populate {{FIELD}} placeholders with supplied values. Returns the new document ID.',
    inputSchema: {
      type: 'object',
      properties: {
        template_id: { type: 'string', description: 'Google Docs file ID of the template' },
        title: { type: 'string', description: 'Title for the new document' },
        destination_folder_id: { type: 'string', description: 'Drive folder ID to place the new doc in' },
        fields: {
          type: 'object',
          description: 'Key-value pairs where key = placeholder (without braces), value = replacement text',
          additionalProperties: { type: 'string' },
        },
      },
      required: ['template_id', 'title', 'destination_folder_id', 'fields'],
    },
  },
]

// ── Tool handlers ─────────────────────────────────────────────────────────────

async function handleTool(name, args) {
  switch (name) {

    case 'sheets_read_range': {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: args.spreadsheet_id,
        range: args.range,
      })
      return { values: res.data.values ?? [], range: res.data.range }
    }

    case 'sheets_write_range': {
      const res = await sheets.spreadsheets.values.update({
        spreadsheetId: args.spreadsheet_id,
        range: args.range,
        valueInputOption: args.value_input_option ?? 'USER_ENTERED',
        requestBody: { values: args.values },
      })
      return {
        updated_cells: res.data.updatedCells,
        updated_range: res.data.updatedRange,
      }
    }

    case 'sheets_append_row': {
      const res = await sheets.spreadsheets.values.append({
        spreadsheetId: args.spreadsheet_id,
        range: args.range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [args.values] },
      })
      return { updated_range: res.data.updates?.updatedRange }
    }

    case 'sheets_get_metadata': {
      const res = await sheets.spreadsheets.get({
        spreadsheetId: args.spreadsheet_id,
        fields: 'sheets.properties,namedRanges',
      })
      return {
        sheets: res.data.sheets.map(s => ({
          title: s.properties.title,
          sheet_id: s.properties.sheetId,
          row_count: s.properties.gridProperties?.rowCount,
          column_count: s.properties.gridProperties?.columnCount,
        })),
        named_ranges: res.data.namedRanges ?? [],
      }
    }

    case 'docs_read': {
      const res = await docs.documents.get({ documentId: args.document_id })
      const text = res.data.body.content
        .flatMap(el => el.paragraph?.elements ?? [])
        .map(el => el.textRun?.content ?? '')
        .join('')
      return { text, title: res.data.title }
    }

    case 'docs_replace_text': {
      const res = await docs.documents.batchUpdate({
        documentId: args.document_id,
        requestBody: {
          requests: [{
            replaceAllText: {
              containsText: {
                text: args.find,
                matchCase: args.match_case ?? true,
              },
              replaceText: args.replace,
            },
          }],
        },
      })
      const occurrences = res.data.replies?.[0]?.replaceAllText?.occurrencesChanged ?? 0
      return { occurrences_changed: occurrences }
    }

    case 'docs_insert_text': {
      await docs.documents.batchUpdate({
        documentId: args.document_id,
        requestBody: {
          requests: [{ insertText: { location: { index: args.index }, text: args.text } }],
        },
      })
      return { inserted: true }
    }

    case 'docs_create_from_template': {
      const drive = google.drive({ version: 'v3', auth })
      const copy = await drive.files.copy({
        fileId: args.template_id,
        requestBody: {
          name: args.title,
          parents: [args.destination_folder_id],
        },
      })
      const newDocId = copy.data.id
      // Populate all {{FIELD}} placeholders
      const requests = Object.entries(args.fields).map(([key, value]) => ({
        replaceAllText: {
          containsText: { text: `{{${key}}}`, matchCase: true },
          replaceText: value,
        },
      }))
      if (requests.length) {
        await docs.documents.batchUpdate({
          documentId: newDocId,
          requestBody: { requests },
        })
      }
      return {
        document_id: newDocId,
        url: `https://docs.google.com/document/d/${newDocId}/edit`,
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

// ── Server ────────────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'google-workspace', version: '1.0.0' },
  { capabilities: { tools: {} } },
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }))

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params
  try {
    const result = await handleTool(name, args)
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
  } catch (err) {
    return {
      content: [{ type: 'text', text: `Error: ${err.message}` }],
      isError: true,
    }
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
