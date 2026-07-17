import { execFile } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const outputPath = new URL('../private/gib-crm/whatsapp-import-a-trier.private.csv', import.meta.url)
const keywords = [
  'gib',
  'menuis',
  'chantier',
  'alu',
  'aluminium',
  'portail',
  'volet',
  'baie',
  'pergola',
  'cloture',
  'clôture',
  'fenetre',
  'fenêtre',
  'garde',
]

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function parseRow(line) {
  const fields = {}
  for (const match of line.matchAll(/(\w+)=([^,]+)/g)) {
    fields[match[1]] = match[2].trim()
  }
  return fields
}

function detectKeyword(name) {
  const normalized = name.toLowerCase()
  return keywords.find((keyword) => normalized.includes(keyword)) ?? ''
}

await mkdir(new URL('../private/gib-crm/', import.meta.url), { recursive: true })

let stdout = ''
try {
  const result = await execFileAsync('shizuku', [
    'content',
    'query',
    '--uri',
    'content://com.android.contacts/data',
    '--projection',
    'display_name:data1:mimetype:contact_id',
    '--where',
    "mimetype='vnd.android.cursor.item/phone_v2'",
  ], { maxBuffer: 1024 * 1024 * 8 })
  stdout = result.stdout
} catch (error) {
  console.error('Import impossible : Shizuku ne repond pas ou les contacts ne sont pas accessibles.')
  console.error('Demarrer Shizuku puis relancer : npm run crm:import-contacts')
  process.exitCode = 1
}

if (!stdout) {
  process.exit()
}

const seen = new Set()
const rows = []

for (const line of stdout.split('\n')) {
  const row = parseRow(line)
  const name = row.display_name ?? ''
  const phone = row.data1 ?? ''
  const key = `${name}|${phone}`
  if (!name || !phone || seen.has(key)) {
    continue
  }
  seen.add(key)
  const keyword = detectKeyword(name)
  rows.push([
    name,
    phone,
    keyword,
    keyword ? 'a qualifier menuiserie alu' : 'a verifier',
    'a_confirmer',
    'ne pas envoyer avant validation humaine',
    keyword ? 'priorite_tri' : 'a_trier',
    'Import contacts Android prive. Source et consentement a confirmer.',
  ].map(csv).join(','))
}

const header = 'display_name,phone,detected_keyword,probable_need,consent_status,action,status,notes'
await writeFile(outputPath, `${header}\n${rows.join('\n')}\n`, 'utf8')
console.log(`Imported ${rows.length} contacts to ${outputPath.pathname}`)
