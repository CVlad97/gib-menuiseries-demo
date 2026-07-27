import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const root = new URL('../', import.meta.url).pathname
const blockedPatterns = [
  { label: 'DELIKREOL reference', regex: /delikreol|deli\s?kreol/i, scope: 'all' },
  { label: 'Private CRM path in public app', regex: /private\/gib-crm|\.private\.(csv|json|vcf)/i, scope: 'public-app' },
  { label: 'Potential secret', regex: /(sk-proj-|sk-[A-Za-z0-9]{20,}|api[_-]?key\s*[:=]\s*['"][^'"]{12,})/i, scope: 'all' },
]
const allowedDirs = new Set(['src', 'public', 'docs', 'scripts'])
const ignoredDirs = new Set(['node_modules', 'dist', 'private', '.git'])
const ignoredFiles = new Set(['package-lock.json'])
const ignoredRelativeFiles = new Set(['scripts/safety-check.mjs'])
const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.css', '.html', '.txt', '.xml'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relative = path.relative(root, fullPath)
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) {
        continue
      }
      if (!relative.includes(path.sep) && !allowedDirs.has(entry.name)) {
        continue
      }
      files.push(...await walk(fullPath))
    } else if (
      !ignoredFiles.has(entry.name)
      && !ignoredRelativeFiles.has(relative)
      && textExtensions.has(path.extname(entry.name))
    ) {
      files.push(fullPath)
    }
  }
  return files
}

const findings = []
for (const file of await walk(root)) {
  const info = await stat(file)
  if (info.size > 1024 * 1024) {
    continue
  }
  const content = await readFile(file, 'utf8')
  const relative = path.relative(root, file)
  for (const pattern of blockedPatterns) {
    if (pattern.scope === 'public-app' && !relative.startsWith('src/') && !relative.startsWith('public/')) {
      continue
    }
    if (pattern.regex.test(content)) {
      findings.push(`${pattern.label}: ${relative}`)
    }
  }
}

if (findings.length > 0) {
  console.error('Safety check failed:')
  for (const finding of findings) {
    console.error(`- ${finding}`)
  }
  process.exit(1)
}

console.log('Safety check OK: no DELIKREOL reference, private CRM leak or obvious secret found.')
