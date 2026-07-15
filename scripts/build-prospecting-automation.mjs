import { mkdir, readFile, writeFile } from 'node:fs/promises'

const tenderPath = new URL('../public/data/gib/boamp-tenders.json', import.meta.url)
const outputPath = new URL('../public/data/gib/prospecting-automation.json', import.meta.url)
const whatsappNumber = '596696653589'
const flyerUrl = 'https://cvlad97.github.io/gib-menuiseries-demo/media/gib/flyers/pub3.jpeg'
const siteUrl = 'https://www.gibmenuiseries.fr'
const instagramUrl = 'https://www.instagram.com/gibmenuiseries/'

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizePhone(value) {
  return String(value ?? '').replace(/[^\d+]/g, '')
}

function daysUntil(value) {
  if (!value) {
    return null
  }

  const deadline = new Date(`${value}T23:59:59Z`)
  const now = new Date()
  return Math.ceil((deadline.getTime() - now.getTime()) / 86400000)
}

function addDays(days) {
  const next = new Date()
  next.setUTCDate(next.getUTCDate() + days)
  return next.toISOString().slice(0, 10)
}

function pickActionType(item) {
  const text = normalize(`${item.object} ${item.lot} ${item.notes}`)
  if (text.includes('cloture') || text.includes('garde-corps') || text.includes('menuiserie')) {
    return 'response'
  }

  return 'qualification'
}

function buildEmailSubject(item) {
  const prefix = pickActionType(item) === 'response' ? 'Demande DCE / qualification lot' : 'Demande orientation DCE'
  return `${prefix} - ${item.organism} - ${item.sourceId || 'consultation'}`
}

function buildEmailBody(item) {
  const action = pickActionType(item) === 'response'
    ? 'verifier si un lot menuiserie, fermeture, cloture, garde-corps ou ouvrage associe correspond a notre activite'
    : 'identifier si des prestations de menuiserie, fermeture, acces, cloture ou renovation peuvent correspondre a notre activite'

  return [
    'Bonjour,',
    '',
    `Nous vous contactons pour GIB Menuiseries Services, entreprise basee a Ducos en Martinique, au sujet de la consultation suivante :`,
    `- Organisme : ${item.organism}`,
    `- Objet : ${item.object}`,
    `- Reference : ${item.sourceId || item.url || 'a verifier'}`,
    `- Date limite : ${item.deadline || 'a verifier'}`,
    '',
    `Nous souhaitons ${action}.`,
    '',
    'Pouvez-vous nous confirmer le lien DCE/profil acheteur a utiliser, ainsi que les modalites officielles pour poser une question ou deposer une reponse si le lot est pertinent ?',
    '',
    'Presentation GIB :',
    `Site : ${siteUrl}`,
    `Instagram : ${instagramUrl}`,
    `Flyer : ${flyerUrl}`,
    '',
    'Contact commercial : Vladimir Claveau',
    'WhatsApp : +596 696 65 35 89',
    'Email : gibmenuiseriesservices@gmail.com',
    'Zone Industrielle Cocotte, derriere Lapeyre, Ducos, Martinique',
    '',
    'Cordialement,',
    'GIB Menuiseries Services',
  ].join('\n')
}

function buildInternalWhatsApp(item) {
  return [
    'AO GIB a traiter',
    `Organisme : ${item.organism}`,
    `Objet : ${item.object}`,
    `Deadline : ${item.deadline || 'a verifier'}`,
    `Score : ${item.score}/10`,
    item.contact?.email ? `Email : ${item.contact.email}` : null,
    item.contact?.phone ? `Tel : ${item.contact.phone}` : null,
    `Lien : ${item.url}`,
    'Action : verifier DCE, identifier lot, preparer go/no-go.',
  ].filter(Boolean).join('\n')
}

function buildCallScript(item) {
  return [
    'Bonjour, je vous appelle pour GIB Menuiseries Services a Ducos.',
    `Nous avons repere votre consultation : ${item.object}.`,
    'Nous souhaitons verifier si un lot concerne les menuiseries, fermetures, clotures, garde-corps, portails, volets ou ouvrages associes.',
    'Pouvez-vous me confirmer le bon lien DCE/profil acheteur et la procedure officielle pour les questions ?',
    'Nous passerons uniquement par le canal prevu dans le reglement de consultation.',
  ].join('\n')
}

function buildDossierChecklist(item) {
  const base = [
    'Ouvrir avis BOAMP et profil acheteur',
    'Telecharger RC, CCTP, DPGF/BPU, AE, CCAP et annexes',
    'Verifier date limite, visite obligatoire, questions autorisees',
    'Identifier lot menuiserie/fermeture/cloture/garde-corps',
    'Decision go/no-go : capacite, delai, references, pieces administratives',
    'Preparer DC1/DC2, attestation assurance, Kbis, RIB, memoire technique',
  ]

  if (pickActionType(item) === 'response') {
    base.push('Chiffrer le lot pertinent et preparer une question technique si besoin')
  } else {
    base.push('Ecarter si aucun lot GIB ou garder en veille fournisseur/sous-traitance')
  }

  return base
}

function makeMailto(to, subject, body) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${to}?${params.toString()}`
}

function makeWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

function buildQueueItem(item) {
  const email = item.contact?.email ?? ''
  const phone = normalizePhone(item.contact?.phone)
  const remainingDays = daysUntil(item.deadline)
  const actionType = pickActionType(item)
  const subject = buildEmailSubject(item)
  const body = buildEmailBody(item)
  const internalWhatsApp = buildInternalWhatsApp(item)

  return {
    id: `ao-${item.sourceId || normalize(`${item.organism}-${item.deadline}`).replaceAll(' ', '-')}`,
    sourceId: item.sourceId,
    type: actionType,
    organism: item.organism,
    object: item.object,
    lot: item.lot,
    deadline: item.deadline,
    daysUntilDeadline: remainingDays,
    priority: remainingDays !== null && remainingDays <= 10 ? 'urgent' : item.priority,
    score: item.score,
    url: item.url,
    contact: {
      email,
      phone,
      name: item.contact?.contactName ?? '',
      profile: item.contact?.buyerProfileUrl ?? '',
    },
    automation: {
      emailReady: Boolean(email),
      phoneReady: Boolean(phone),
      whatsappReady: true,
      officialSubmission: 'manual_required',
      duplicateGuard: `${normalize(email)}|${normalize(item.organism)}|${normalize(item.object)}`,
    },
    email: email ? {
      to: email,
      subject,
      body,
      mailto: makeMailto(email, subject, body),
    } : null,
    whatsapp: {
      to: '+596 696 65 35 89',
      body: internalWhatsApp,
      url: makeWhatsAppUrl(internalWhatsApp),
    },
    call: {
      phone,
      script: buildCallScript(item),
      telUrl: phone ? `tel:${phone}` : '',
    },
    dossier: {
      status: 'to_prepare',
      checklist: buildDossierChecklist(item),
      warning: 'Ne pas deposer une offre automatiquement. Le DCE, les pieces et le chiffrage doivent etre valides par un humain.',
    },
    followUps: [
      { label: 'J+1', date: addDays(1), action: 'Verifier reception ou ouvrir profil acheteur officiel' },
      { label: 'J+3', date: addDays(3), action: 'Relancer si aucune reponse et deadline compatible' },
      { label: 'J+7', date: addDays(7), action: 'Decision go/no-go ou classement' },
    ],
  }
}

const raw = await readFile(tenderPath, 'utf8')
const feed = JSON.parse(raw)
const seen = new Set()
const queue = []

for (const item of feed.items ?? []) {
  const queueItem = buildQueueItem(item)
  if (seen.has(queueItem.automation.duplicateGuard)) {
    continue
  }
  seen.add(queueItem.automation.duplicateGuard)
  queue.push(queueItem)
}

queue.sort((a, b) => {
  const urgentA = a.daysUntilDeadline ?? 999
  const urgentB = b.daysUntilDeadline ?? 999
  return urgentA - urgentB || b.score - a.score
})

const payload = {
  source: 'GIB prospecting automation queue',
  generatedAt: new Date().toISOString(),
  tenderFeedGeneratedAt: feed.generatedAt,
  summary: {
    totalTenderRows: feed.items?.length ?? 0,
    uniqueQueueItems: queue.length,
    emailReady: queue.filter((item) => item.automation.emailReady).length,
    phoneReady: queue.filter((item) => item.automation.phoneReady).length,
    urgent: queue.filter((item) => item.priority === 'urgent').length,
    manualSubmissionRequired: queue.length,
  },
  compliance: [
    'Utiliser uniquement les contacts publies ou fournis volontairement.',
    'Ne pas deposer automatiquement une offre sur un profil acheteur.',
    'Respecter les canaux officiels du DCE pour questions et depots.',
    'Arreter les relances si STOP, refus ou absence de pertinence.',
    'Verifier les certifications, assurances et prix avant toute reponse officielle.',
  ],
  queue,
}

await mkdir(new URL('../public/data/gib/', import.meta.url), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

console.log(`Wrote ${queue.length} automation items to ${outputPath.pathname}`)
