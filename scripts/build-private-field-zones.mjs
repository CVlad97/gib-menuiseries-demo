import { mkdir, writeFile } from 'node:fs/promises'

const outputPath = new URL('../private/gib-crm/zones-terrain-particuliers.private.csv', import.meta.url)

const zones = [
  {
    id: 'terrain-ducos-genipa',
    commune: 'Ducos',
    zone: 'Ducos centre / Genipa / ZI Cocotte',
    productPitch: 'Portails, volets roulants, clotures et baies vitrees proches atelier GIB',
    fieldAction: 'Passer chez commerces travaux, agences et zones visibles depuis voie publique avec flyer QR WhatsApp.',
    nextVisit: 'Semaine 1 - mardi matin',
    status: 'a_planifier',
    notes: 'Zone priorite 1 : proximite GIB, intervention rapide, preuve locale.',
  },
  {
    id: 'terrain-lamentin-acajou-californie',
    commune: 'Le Lamentin',
    zone: 'Acajou / Californie / Place d Armes',
    productPitch: 'Renovation ouvertures, volets roulants, portails aluminium, fermetures commerces',
    fieldAction: 'Prospection agences, syndics, commerces et artisans partenaires. QR devis photo + dimensions.',
    nextVisit: 'Semaine 1 - jeudi matin',
    status: 'a_planifier',
    notes: 'Zone mixte pro/particuliers. Ne pas relever adresses privees sans accord.',
  },
  {
    id: 'terrain-riviere-salee-petit-bourg',
    commune: 'Riviere-Salee',
    zone: 'Riviere-Salee centre / Petit-Bourg',
    productPitch: 'Portails et clotures aluminium pour maisons, volets et baies pour renovation',
    fieldAction: 'Passage terrain commerces locaux + posts geolocalises. Collecter uniquement leads entrants.',
    nextVisit: 'Semaine 2 - mardi apres-midi',
    status: 'a_planifier',
    notes: 'Angle securisation maison et devis rapide.',
  },
  {
    id: 'terrain-trois-ilets-anse-mitan',
    commune: 'Les Trois-Ilets',
    zone: 'Anse Mitan / Pointe du Bout / Anse a l Ane',
    productPitch: 'Pergolas, baies vitrees, garde-corps, volets et protections solaires pour villas/locations',
    fieldAction: 'Cibler conciergeries, agences saisonnieres, hotels et commerces touristiques.',
    nextVisit: 'Semaine 2 - jeudi matin',
    status: 'a_planifier',
    notes: 'Angle sel, vent, confort client, terrasse.',
  },
  {
    id: 'terrain-fdf-cluny-didier-redoute',
    commune: 'Fort-de-France',
    zone: 'Cluny / Didier / Redoute / Ravine Vilaine',
    productPitch: 'Volets roulants, portes, fenetres aluminium, garde-corps, renovation coproprietes',
    fieldAction: 'Syndics, agences, coproprietes via gestionnaires. Pas de boitage d adresses privees non qualifiees.',
    nextVisit: 'Semaine 3 - mardi matin',
    status: 'a_planifier',
    notes: 'Zone magasin Cluny : mettre en avant ouverture/proximite.',
  },
  {
    id: 'terrain-sainte-luce-marin-diamant',
    commune: 'Sainte-Luce / Le Marin / Le Diamant',
    zone: 'Littoral / villas / locations saisonnieres',
    productPitch: 'Pergolas, volets, baies vitrees, clotures et portails adaptes au littoral',
    fieldAction: 'Prospection conciergeries, agences villa, commerces travaux et posts Reels geolocalises.',
    nextVisit: 'Semaine 3 - jeudi matin',
    status: 'a_planifier',
    notes: 'Zone saisonniere : prioriser avant vacances et périodes cycloniques.',
  },
  {
    id: 'terrain-robert-francois-vauclin',
    commune: 'Le Robert / Le Francois / Le Vauclin',
    zone: 'Quartiers residentiels et littoraux',
    productPitch: 'Portails, clotures, garde-corps et volets roulants pour maisons individuelles',
    fieldAction: 'Flyers QR chez commerces materiaux et relais locaux. Campagne Facebook locale.',
    nextVisit: 'Semaine 4 - mardi matin',
    status: 'a_planifier',
    notes: 'Zone maisons individuelles : pitch securite + resistance saline.',
  },
]

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

await mkdir(new URL('../private/gib-crm/', import.meta.url), { recursive: true })

const header = 'id,created_at,commune,zone,product_pitch,field_action,next_visit,status,notes'
const createdAt = new Date().toISOString()
const rows = zones.map((zone) => [
  zone.id,
  createdAt,
  zone.commune,
  zone.zone,
  zone.productPitch,
  zone.fieldAction,
  zone.nextVisit,
  zone.status,
  zone.notes,
].map(csv).join(','))

await writeFile(outputPath, `${header}\n${rows.join('\n')}\n`, 'utf8')
console.log(`Wrote ${rows.length} field zones to ${outputPath.pathname}`)
