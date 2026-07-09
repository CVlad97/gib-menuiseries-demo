import { mkdir, writeFile } from 'node:fs/promises'

const endpoint = 'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records'
const outputPath = new URL('../public/data/gib/boamp-tenders.json', import.meta.url)

const keywords = [
  'menuiserie',
  'menuiseries',
  'fermeture',
  'fermetures',
  'volet',
  'volets',
  'portail',
  'portails',
  'garde-corps',
  'cloture',
  'clôture',
  'aluminium',
  'renovation',
  'rénovation',
  'second oeuvre',
]

function buildWhere() {
  const searchClauses = keywords.flatMap((keyword) => [
    `search(objet,"${keyword}")`,
    `search(descripteur_libelle,"${keyword}")`,
  ])

  return `code_departement="972" AND (${searchClauses.join(' OR ')})`
}

function asArray(value) {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function toDateInput(value) {
  if (!value) {
    return ''
  }

  return String(value).slice(0, 10)
}

function scoreTender(record) {
  const text = [
    record.objet,
    record.descripteur_libelle,
    record.type_marche,
    record.nomacheteur,
  ].flat().filter(Boolean).join(' ').toLowerCase()

  let score = 4

  for (const term of ['menuiserie', 'fermeture', 'volet', 'portail', 'garde-corps', 'cloture', 'clôture', 'aluminium']) {
    if (text.includes(term)) {
      score += 2
    }
  }

  if (text.includes('travaux')) {
    score += 1
  }

  if (record.datelimitereponse && new Date(record.datelimitereponse) > new Date()) {
    score += 1
  }

  return Math.max(1, Math.min(10, score))
}

function normalizeRecord(record) {
  const descriptors = asArray(record.descripteur_libelle)
  const marketTypes = asArray(record.type_marche_facette ?? record.type_marche)
  const score = scoreTender(record)

  return {
    source: 'BOAMP / DILA API ouverte',
    sourceId: record.idweb ?? record.id ?? '',
    organism: record.nomacheteur ?? 'Acheteur a verifier',
    platform: 'BOAMP',
    url: record.url_avis ?? (record.idweb ? `https://www.boamp.fr/pages/avis/?q=idweb:${record.idweb}` : ''),
    object: record.objet ?? 'Objet a verifier',
    lot: descriptors.length > 0 ? descriptors.join(', ') : marketTypes.join(', '),
    deadline: toDateInput(record.datelimitereponse),
    publishedAt: record.dateparution ?? '',
    commune: 'Martinique',
    visitRequired: 'A verifier dans le DCE',
    documents: 'Avis BOAMP. Telecharger le DCE sur le profil acheteur indique.',
    score,
    priority: score >= 7 ? 'high' : score >= 4 ? 'medium' : 'low',
    nextAction: 'Ouvrir l avis BOAMP, identifier le profil acheteur, telecharger le DCE et verifier les lots menuiserie.',
    notes: [
      descriptors.length > 0 ? `Descripteurs : ${descriptors.join(', ')}` : null,
      marketTypes.length > 0 ? `Type marche : ${marketTypes.join(', ')}` : null,
      record.procedure_libelle ? `Procedure : ${record.procedure_libelle}` : null,
    ].filter(Boolean).join(' | '),
  }
}

async function fetchBoamp() {
  const params = new URLSearchParams({
    limit: '60',
    order_by: 'dateparution desc',
    where: buildWhere(),
    select: [
      'idweb',
      'id',
      'objet',
      'nomacheteur',
      'code_departement',
      'dateparution',
      'datelimitereponse',
      'descripteur_libelle',
      'type_marche',
      'type_marche_facette',
      'procedure_libelle',
      'url_avis',
    ].join(','),
  })

  const response = await fetch(`${endpoint}?${params.toString()}`, {
    headers: {
      accept: 'application/json',
      'accept-encoding': 'gzip, deflate, br',
    },
  })

  if (!response.ok) {
    throw new Error(`BOAMP API error ${response.status}`)
  }

  const payload = await response.json()
  const items = (payload.results ?? [])
    .map(normalizeRecord)
    .filter((item, index, list) => list.findIndex((candidate) => candidate.sourceId === item.sourceId) === index)

  return {
    source: 'BOAMP / DILA API ouverte',
    sourceUrl: 'https://boamp-datadila.opendatasoft.com/explore/dataset/boamp/api/',
    generatedAt: new Date().toISOString(),
    department: '972',
    keywords,
    totalCount: payload.total_count ?? items.length,
    count: items.length,
    items,
  }
}

const data = await fetchBoamp()

await mkdir(new URL('../public/data/gib/', import.meta.url), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

console.log(`Wrote ${data.count} BOAMP tenders to ${outputPath.pathname}`)
