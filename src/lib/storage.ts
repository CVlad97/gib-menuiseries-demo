export interface LeadDraft {
  id: string
  createdAt: string
  status: 'new' | 'qualified' | 'quoted' | 'closed'
  name: string
  email: string
  urgency: string
  typeProjet: string
  produit: string
  contact: string
  commune: string
  dimensions: string
  contexte: string
  commentaire: string
  photos: string[]
}

export interface SimulationDraft {
  id: string
  createdAt: string
  status: 'draft' | 'review' | 'converted'
  produit: string
  ambiance: string
  notes: string
  imagePreview?: string
}

export interface TenderOpportunity {
  id: string
  createdAt: string
  status: 'watch' | 'qualified' | 'dce' | 'response' | 'submitted' | 'won' | 'lost' | 'discarded'
  priority: 'low' | 'medium' | 'high'
  organism: string
  platform: string
  url: string
  object: string
  lot: string
  deadline: string
  commune: string
  visitRequired: string
  documents: string
  score: number
  nextAction: string
  notes: string
}

const leadKey = 'gib-demo-leads'
const simulationKey = 'gib-demo-simulations'
const tenderKey = 'gib-demo-tenders'
const updateEvent = 'gib-admin-updated'

function notifyUpdated() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(updateEvent))
}

function readArray<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
  notifyUpdated()
}

function normalizeLead(entry: Partial<LeadDraft> & Pick<LeadDraft, 'id' | 'createdAt'>): LeadDraft {
  return {
    id: entry.id,
    createdAt: entry.createdAt,
    status: entry.status ?? 'new',
    name: entry.name ?? '',
    email: entry.email ?? '',
    urgency: entry.urgency ?? '',
    typeProjet: entry.typeProjet ?? 'Habitat',
    produit: entry.produit ?? 'Projet sur mesure',
    contact: entry.contact ?? '',
    commune: entry.commune ?? '',
    dimensions: entry.dimensions ?? '',
    contexte: entry.contexte ?? '',
    commentaire: entry.commentaire ?? '',
    photos: entry.photos ?? [],
  }
}

function normalizeSimulation(
  entry: Partial<SimulationDraft> & Pick<SimulationDraft, 'id' | 'createdAt'>,
): SimulationDraft {
  return {
    id: entry.id,
    createdAt: entry.createdAt,
    status: entry.status ?? 'draft',
    produit: entry.produit ?? 'Projet sur mesure',
    ambiance: entry.ambiance ?? 'clair',
    notes: entry.notes ?? '',
    imagePreview: entry.imagePreview,
  }
}

function normalizeTender(
  entry: Partial<TenderOpportunity> & Pick<TenderOpportunity, 'id' | 'createdAt'>,
): TenderOpportunity {
  return {
    id: entry.id,
    createdAt: entry.createdAt,
    status: entry.status ?? 'watch',
    priority: entry.priority ?? 'medium',
    organism: entry.organism ?? '',
    platform: entry.platform ?? '',
    url: entry.url ?? '',
    object: entry.object ?? '',
    lot: entry.lot ?? '',
    deadline: entry.deadline ?? '',
    commune: entry.commune ?? 'Martinique',
    visitRequired: entry.visitRequired ?? 'A verifier',
    documents: entry.documents ?? '',
    score: Number.isFinite(entry.score) ? Number(entry.score) : 0,
    nextAction: entry.nextAction ?? '',
    notes: entry.notes ?? '',
  }
}

export function listLeads(): LeadDraft[] {
  return readArray<Partial<LeadDraft> & Pick<LeadDraft, 'id' | 'createdAt'>>(leadKey).map(normalizeLead)
}

export function saveLead(entry: LeadDraft) {
  writeArray(leadKey, [normalizeLead(entry), ...listLeads()].slice(0, 30))
}

export function listSimulations(): SimulationDraft[] {
  return readArray<Partial<SimulationDraft> & Pick<SimulationDraft, 'id' | 'createdAt'>>(
    simulationKey,
  ).map(normalizeSimulation)
}

export function saveSimulation(entry: SimulationDraft) {
  writeArray(simulationKey, [normalizeSimulation(entry), ...listSimulations()].slice(0, 30))
}

export function listTenders(): TenderOpportunity[] {
  return readArray<Partial<TenderOpportunity> & Pick<TenderOpportunity, 'id' | 'createdAt'>>(
    tenderKey,
  ).map(normalizeTender)
}

export function saveTender(entry: TenderOpportunity) {
  writeArray(tenderKey, [normalizeTender(entry), ...listTenders()].slice(0, 60))
}

export function updateLeadStatus(id: string, status: LeadDraft['status']) {
  const nextEntries = listLeads().map((entry) => (entry.id === id ? { ...entry, status } : entry))
  writeArray(leadKey, nextEntries)
}

export function updateSimulationStatus(id: string, status: SimulationDraft['status']) {
  const nextEntries = listSimulations().map((entry) =>
    entry.id === id ? { ...entry, status } : entry,
  )
  writeArray(simulationKey, nextEntries)
}

export function updateTender(id: string, patch: Partial<TenderOpportunity>) {
  const nextEntries = listTenders().map((entry) =>
    entry.id === id ? normalizeTender({ ...entry, ...patch, id: entry.id, createdAt: entry.createdAt }) : entry,
  )
  writeArray(tenderKey, nextEntries)
}

export function deleteTender(id: string) {
  writeArray(tenderKey, listTenders().filter((entry) => entry.id !== id))
}

export function seedDemoData() {
  if (listLeads().length === 0) {
    writeArray<LeadDraft>(leadKey, [
      normalizeLead({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'new',
        typeProjet: 'Habitat',
        produit: 'Portails aluminium',
        contact: '06 96 00 00 00',
        commune: 'Ducos',
        dimensions: '3m x 2,2m',
        contexte: 'Renovation',
        commentaire: 'Portail coulissant, facade claire, besoin de projection avant devis.',
        photos: ['facade-maison.jpg'],
      }),
    ])
  }

  if (listSimulations().length === 0) {
    writeArray<SimulationDraft>(simulationKey, [
      normalizeSimulation({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'review',
        produit: 'baies-vitrees',
        ambiance: 'tropical',
        notes: 'Projet terrasse couverte avec recherche de luminosite et continuité dedans-dehors.',
      }),
    ])
  }

  if (listTenders().length === 0) {
    writeArray<TenderOpportunity>(tenderKey, [
      normalizeTender({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'qualified',
        priority: 'high',
        organism: 'Commune a confirmer',
        platform: 'BOAMP / profil acheteur',
        url: 'https://www.boamp.fr/pages/recherche/',
        object: 'Remplacement de menuiseries exterieures sur batiment public',
        lot: 'Lot menuiserie / fermetures',
        deadline: '',
        commune: 'Martinique',
        visitRequired: 'A verifier',
        documents: 'RC, CCTP, DPGF, AE, DC1, DC2',
        score: 8,
        nextAction: 'Telecharger le DCE et verifier la visite obligatoire.',
        notes: 'Exemple demo. Remplacer par une consultation reelle avant usage commercial.',
      }),
    ])
  }
}

export function subscribeAdminUpdates(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const listener = () => callback()

  window.addEventListener(updateEvent, listener)
  window.addEventListener('storage', listener)

  return () => {
    window.removeEventListener(updateEvent, listener)
    window.removeEventListener('storage', listener)
  }
}
