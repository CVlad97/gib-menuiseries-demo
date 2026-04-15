export interface LeadDraft {
  id: string
  createdAt: string
  status: 'new' | 'qualified' | 'quoted' | 'closed'
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

const leadKey = 'gib-demo-leads'
const simulationKey = 'gib-demo-simulations'
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
