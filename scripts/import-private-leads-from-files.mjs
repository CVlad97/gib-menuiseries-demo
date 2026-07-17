import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const importDirs = [
  '/sdcard/Download/gib-crm-import',
  new URL('../private/gib-crm/imports/', import.meta.url).pathname,
]
const outputPath = new URL('../private/gib-crm/whatsapp-import-a-trier.private.csv', import.meta.url)
const reportPath = new URL('../private/gib-crm/import-report.private.json', import.meta.url)

const keywords = [
  'gib',
  'menuiserie',
  'menuis',
  'aluminium',
  'alu',
  'portail',
  'volet',
  'baie',
  'fenetre',
  'fenêtre',
  'porte',
  'pergola',
  'cloture',
  'clôture',
  'garde-corps',
  'jalousie',
  'chantier',
  'devis',
  'dimension',
  'renovation',
  'rénovation',
]

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function detectKeyword(text) {
  const normalized = normalize(text)
  return keywords.find((keyword) => normalized.includes(normalize(keyword))) ?? ''
}

function detectNeed(text) {
  const normalized = normalize(text)
  const services = [
    ['portail', 'Portail aluminium'],
    ['volet', 'Volet roulant'],
    ['baie', 'Baie vitree'],
    ['fenetre', 'Fenetre'],
    ['porte', 'Porte'],
    ['pergola', 'Pergola'],
    ['cloture', 'Cloture'],
    ['garde-corps', 'Garde-corps'],
    ['jalousie', 'Jalousie'],
    ['depannage', 'Depannage'],
  ]
  return services.find(([needle]) => normalized.includes(needle))?.[1] ?? 'Menuiserie alu a qualifier'
}

function extractPhones(text) {
  const matches = text.match(/(?:\+?596|0)\s*(?:6|5)\s*(?:\d[\s.-]*){7,8}/g) ?? []
  return matches
    .map((phone) => phone.replace(/[^\d+]/g, ''))
    .map((phone) => phone.startsWith('0') ? `+596${phone.slice(1)}` : phone)
}

function parseVcf(content, sourceFile) {
  const rows = []
  for (const card of content.split(/END:VCARD/i)) {
    const name = card.match(/FN:(.+)/i)?.[1]?.trim() ?? ''
    const phones = [...card.matchAll(/TEL[^:]*:(.+)/gi)].map((match) => match[1].trim())
    for (const phone of phones) {
      rows.push({ name, phone, keyword: detectKeyword(`${name} ${phone}`), need: 'Contact telephone a qualifier', sourceFile })
    }
  }
  return rows
}

function parseCsv(content, sourceFile) {
  const lines = content.split(/\r?\n/).filter(Boolean)
  const rows = []
  for (const line of lines.slice(1)) {
    const cols = line.split(',').map((item) => item.replace(/^"|"$/g, '').trim())
    const text = cols.join(' ')
    const phones = extractPhones(text)
    for (const phone of phones) {
      rows.push({ name: cols[0] ?? '', phone, keyword: detectKeyword(text), need: detectNeed(text), sourceFile })
    }
  }
  return rows
}

function parseText(content, sourceFile) {
  const rows = []
  const phoneSet = new Set(extractPhones(content))
  const hasGibKeyword = detectKeyword(content)

  for (const phone of phoneSet) {
    rows.push({ name: '', phone, keyword: hasGibKeyword, need: detectNeed(content), sourceFile })
  }

  if (phoneSet.size === 0 && hasGibKeyword) {
    rows.push({ name: '', phone: '', keyword: hasGibKeyword, need: detectNeed(content), sourceFile })
  }

  return rows
}

async function listImportFiles() {
  const files = []
  for (const dir of importDirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
      continue
    }
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (!entry.isFile()) {
        continue
      }
      const filePath = path.join(dir, entry.name)
      if (/\.(txt|csv|vcf)$/i.test(entry.name)) {
        files.push(filePath)
      }
    }
  }
  return files
}

await mkdir(new URL('../private/gib-crm/', import.meta.url), { recursive: true })
await mkdir(new URL('../private/gib-crm/imports/', import.meta.url), { recursive: true })

const files = await listImportFiles()
const imported = []

for (const file of files) {
  const content = await readFile(file, 'utf8')
  const ext = path.extname(file).toLowerCase()
  if (ext === '.vcf') {
    imported.push(...parseVcf(content, file))
  } else if (ext === '.csv') {
    imported.push(...parseCsv(content, file))
  } else {
    imported.push(...parseText(content, file))
  }
}

const seen = new Set()
const filtered = imported
  .filter((item) => item.keyword || item.phone)
  .filter((item) => {
    const key = `${item.name}|${item.phone}|${item.sourceFile}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })

const header = 'display_name,phone,detected_keyword,probable_need,consent_status,action,status,notes'
const rows = filtered.map((item) => [
  item.name,
  item.phone,
  item.keyword,
  item.need,
  item.phone ? 'a_confirmer' : 'info_sans_numero',
  'qualifier avant toute relance',
  item.keyword ? 'priorite_tri' : 'a_trier',
  `Import fichier prive: ${item.sourceFile}`,
].map(csv).join(','))

await writeFile(outputPath, `${header}\n${rows.join('\n')}\n`, 'utf8')
await writeFile(reportPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  importDirs,
  filesScanned: files.length,
  candidatesFound: imported.length,
  rowsWritten: filtered.length,
  output: outputPath.pathname,
}, null, 2)}\n`, 'utf8')

console.log(`Scanned ${files.length} files, wrote ${filtered.length} private rows to ${outputPath.pathname}`)
