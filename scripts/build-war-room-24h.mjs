import { mkdir, readFile, writeFile } from 'node:fs/promises'

const queuePath = new URL('../public/data/gib/prospecting-automation.json', import.meta.url)
const operationsPath = new URL('../public/data/gib/prospecting-operations.json', import.meta.url)
const outputPath = new URL('../public/data/gib/war-room-24h.json', import.meta.url)

const queue = JSON.parse(await readFile(queuePath, 'utf8'))
const operations = JSON.parse(await readFile(operationsPath, 'utf8'))

const openTenderActions = (queue.queue ?? []).map((item) => ({
  id: item.id,
  reference: item.sourceId,
  organism: item.organism,
  deadline: item.deadline,
  daysUntilDeadline: item.daysUntilDeadline,
  score: item.score,
  type: item.type,
  phone: item.contact?.phone ?? '',
  email: item.contact?.email ?? '',
  action: item.type === 'response'
    ? 'Appeler et ouvrir DCE pour verifier lot menuiserie/cloture avant chiffrage.'
    : 'Ouvrir DCE uniquement pour confirmer presence menuiserie/fermeture, sinon classer no-go.',
}))

const payload = {
  generatedAt: new Date().toISOString(),
  mission: 'GIB 24h revenue sprint',
  proof: {
    openTenderActions: queue.summary?.uniqueQueueItems ?? openTenderActions.length,
    urgentTenderActions: queue.summary?.urgent ?? 0,
    emailReadyTenderActions: queue.summary?.emailReady ?? 0,
    phoneReadyTenderActions: queue.summary?.phoneReady ?? 0,
    qualifiedProspectsSeeded: 12,
    qualifiedPhonesSeeded: 11,
    qualifiedEmailsSeeded: 4,
    privateFieldZonesReady: operations.summary?.privateFieldZonesReady ?? 7,
    instagramReelsReady: operations.summary?.instagramReelsReady ?? 6,
    emailsAlreadySent: operations.summary?.emailsSent ?? 6,
    qualifiedReplies: 2,
  },
  moneyHypothesis: [
    {
      lever: 'AO SEMSAMAR',
      why: 'Lot menuiserie explicite, deadline courte, telephone et e-mail publies.',
      expectedOutcome: 'Go/no-go aujourd hui puis DCE/chiffrage si lot compatible.',
      priority: 10,
    },
    {
      lever: 'La Pagerie',
      why: 'Reponse direction recue, telephone direct public dans signature, segment hotelier a forte valeur.',
      expectedOutcome: 'Obtenir un rendez-vous maintenance ou etre reference fournisseur.',
      priority: 9,
    },
    {
      lever: 'Syndics / gestion locative',
      why: 'Volume recurrent : coproprietes, residences, portails, volets, garde-corps, depannage.',
      expectedOutcome: 'Identifier 3 gestionnaires travaux et programmer visites/devis.',
      priority: 9,
    },
    {
      lever: 'Terrain Ducos-Lamentin-Riviere-Salee',
      why: 'Proximite GIB, zones pavillonnaires et commerces travaux, cout acquisition faible.',
      expectedOutcome: 'Generer demandes WhatsApp photo + dimensions via QR/flyer.',
      priority: 8,
    },
  ],
  next24h: [
    {
      window: 'H0-H1',
      action: 'Appeler SEMSAMAR au +33 596 73 16 59, demander le profil acheteur et confirmer lot menuiserie.',
      proofData: 'AO 26-66492, score 8/10, deadline 31/07/2026, telephone disponible.',
      owner: 'Vladimir',
      status: 'to_do',
    },
    {
      window: 'H1-H2',
      action: 'Ouvrir DSNA DCE et classer go/no-go. Ne pas perdre de temps si aucun lot fermeture/menuiserie.',
      proofData: 'AO 26-52714, deadline 29/07/2026, score 6/10, qualification seulement.',
      owner: 'GIB',
      status: 'to_do',
    },
    {
      window: 'H2-H3',
      action: 'Relancer La Pagerie avec un message court : proposer 15 minutes avec direction/maintenance.',
      proofData: 'Reponse recue le 18/07/2026 par Elodie des Chaumes, Directrice Generale.',
      owner: 'GIB',
      status: 'ready',
    },
    {
      window: 'H3-H5',
      action: 'Appeler 5 contacts pros avec telephone : syndics, immobilier, hotels, BTP.',
      proofData: '12 contacts pros qualifies, 11 numeros, 4 e-mails.',
      owner: 'Vladimir',
      status: 'to_do',
    },
    {
      window: 'H5-H8',
      action: 'Tour terrain Ducos/Genipa/ZI Cocotte avec flyer QR WhatsApp et script photo + dimensions.',
      proofData: 'Zone priorite 1, proximite GIB, cout terrain faible.',
      owner: 'Vladimir',
      status: 'to_do',
    },
    {
      window: 'H8-H12',
      action: 'Publier 1 Reel produit + 3 stories devis sur Instagram, CTA WhatsApp uniquement.',
      proofData: '6 Reels deja generes et presents sur Android.',
      owner: 'GIB',
      status: 'ready',
    },
    {
      window: 'H12-H24',
      action: 'Relances J+1/J+3 : mettre a jour statuts, isoler les chauds, preparer visites et devis.',
      proofData: 'Dashboard local + CRM prive + operations journal.',
      owner: 'GIB',
      status: 'to_do',
    },
  ],
  tenderActions: openTenderActions,
  rules: [
    'Ne pas promettre de prix, delai ou depot AO sans DCE valide.',
    'Ne pas publier contacts particuliers ou adresses chantier.',
    'Ne pas envoyer WhatsApp de masse sans validation humaine.',
    'Chaque action doit produire un statut : qualifie, relance, no-go, stop ou rendez-vous.',
  ],
}

await mkdir(new URL('../public/data/gib/', import.meta.url), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Wrote 24h war room to ${outputPath.pathname}`)
