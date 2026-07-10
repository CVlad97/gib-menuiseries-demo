import { useEffect, useMemo, useState } from 'react'
import { Download, ExternalLink, FileDown, FilePlus2, MessageCircle, RefreshCw, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { buildWhatsAppUrl } from '../lib/content'
import {
  deleteTender,
  listTenders,
  saveTender,
  seedDemoData,
  subscribeAdminUpdates,
  type TenderOpportunity,
  updateTender,
} from '../lib/storage'

const tenderStatuses: Array<{ value: TenderOpportunity['status']; label: string }> = [
  { value: 'watch', label: 'A analyser' },
  { value: 'qualified', label: 'Pertinent' },
  { value: 'dce', label: 'DCE telecharge' },
  { value: 'response', label: 'Reponse a preparer' },
  { value: 'submitted', label: 'Depose' },
  { value: 'won', label: 'Gagne' },
  { value: 'lost', label: 'Perdu' },
  { value: 'discarded', label: 'Ecarte' },
]

const priorities: Array<{ value: TenderOpportunity['priority']; label: string }> = [
  { value: 'high', label: 'Forte' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'low', label: 'Faible' },
]

const emptyTender = {
  organism: '',
  platform: '',
  url: '',
  object: '',
  lot: '',
  deadline: '',
  commune: 'Martinique',
  visitRequired: 'A verifier',
  documents: '',
  score: 5,
  nextAction: '',
  notes: '',
}

interface BoampTenderItem {
  sourceId: string
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
  priority: TenderOpportunity['priority']
  nextAction: string
  notes: string
  contact?: {
    email?: string
    phone?: string
    contactName?: string
    buyerCity?: string
    buyerPostalCode?: string
    buyerProfileUrl?: string
  }
}

interface BoampTenderFeed {
  generatedAt: string
  source: string
  sourceUrl: string
  count: number
  items: BoampTenderItem[]
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function getScoreLabel(score: number) {
  if (score >= 7) {
    return 'Prioritaire'
  }
  if (score >= 4) {
    return 'A qualifier'
  }
  return 'Faible'
}

function buildTenderWhatsApp(tender: TenderOpportunity) {
  return buildWhatsAppUrl(
    [
      'Appel d offres GIB a traiter',
      `Organisme : ${tender.organism || 'a renseigner'}`,
      `Objet : ${tender.object || 'a renseigner'}`,
      `Lot : ${tender.lot || 'a verifier'}`,
      `Plateforme : ${tender.platform || 'a verifier'}`,
      `Date limite : ${tender.deadline || 'a verifier'}`,
      `Score : ${tender.score}/10`,
      `Action suivante : ${tender.nextAction || 'a definir'}`,
      tender.url ? `Lien : ${tender.url}` : null,
    ].filter(Boolean).join('\n'),
  )
}

function escapeCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

function exportTenders(tenders: TenderOpportunity[]) {
  const headers = [
    'organisme',
    'plateforme',
    'lien',
    'objet',
    'lot',
    'date_limite',
    'commune',
    'visite_obligatoire',
    'pieces_demandees',
    'statut',
    'priorite',
    'score',
    'action_suivante',
    'notes',
  ]
  const rows = tenders.map((tender) => [
    tender.organism,
    tender.platform,
    tender.url,
    tender.object,
    tender.lot,
    tender.deadline,
    tender.commune,
    tender.visitRequired,
    tender.documents,
    tender.status,
    tender.priority,
    tender.score,
    tender.nextAction,
    tender.notes,
  ])
  const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'gib-appels-offres-export.csv'
  link.click()
  URL.revokeObjectURL(url)
}

export function TenderAdminPage() {
  const [tenders, setTenders] = useState<TenderOpportunity[]>([])
  const [draft, setDraft] = useState(emptyTender)
  const [error, setError] = useState('')
  const [importStatus, setImportStatus] = useState('')

  useEffect(() => {
    const refresh = () => setTenders(listTenders())

    refresh()
    return subscribeAdminUpdates(refresh)
  }, [])

  const stats = useMemo(() => {
    return {
      total: tenders.length,
      active: tenders.filter((tender) => ['watch', 'qualified', 'dce', 'response'].includes(tender.status)).length,
      urgent: tenders.filter((tender) => tender.priority === 'high').length,
      submitted: tenders.filter((tender) => tender.status === 'submitted').length,
    }
  }, [tenders])

  const firstClientTargets = useMemo(() => {
    const active = tenders
      .filter((tender) => tender.status !== 'discarded' && tender.status !== 'lost')
      .sort((a, b) => b.score - a.score)

    return active.slice(0, 5)
  }, [tenders])

  function handleChange(key: keyof typeof emptyTender, value: string) {
    setDraft((current) => ({
      ...current,
      [key]: key === 'score' ? Number(value) : value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!draft.organism.trim() || !draft.object.trim()) {
      setError('Renseigner au minimum l organisme et l objet du marche.')
      return
    }

    saveTender({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'watch',
      priority: draft.score >= 7 ? 'high' : draft.score >= 4 ? 'medium' : 'low',
      ...draft,
    })
    setDraft(emptyTender)
    setError('')
  }

  async function importBoampFeed() {
    setImportStatus('Import BOAMP en cours...')
    setError('')

    try {
      const response = await fetch(withBase('data/gib/boamp-tenders.json'), { cache: 'no-store' })

      if (!response.ok) {
        throw new Error(`Flux BOAMP indisponible (${response.status})`)
      }

      const feed = await response.json() as BoampTenderFeed
      const current = listTenders()
      const knownKeys = new Set(current.map((tender) => tender.url || `${tender.organism}|${tender.object}|${tender.deadline}`))
      let imported = 0

      for (const item of feed.items) {
        const key = item.url || `${item.organism}|${item.object}|${item.deadline}`
        if (knownKeys.has(key)) {
          continue
        }

        saveTender({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: 'watch',
          priority: item.priority,
          organism: item.organism,
          platform: item.platform,
          url: item.url,
          object: item.object,
          lot: item.lot,
          deadline: item.deadline,
          commune: item.commune,
          visitRequired: item.visitRequired,
          documents: item.documents,
          score: item.score,
          nextAction: item.nextAction,
          notes: [
            item.notes,
            item.sourceId ? `BOAMP ${item.sourceId}` : null,
            item.contact?.email ? `Email acheteur : ${item.contact.email}` : null,
            item.contact?.phone ? `Tel acheteur : ${item.contact.phone}` : null,
            item.contact?.contactName ? `Contact acheteur : ${item.contact.contactName}` : null,
            item.contact?.buyerProfileUrl ? `Profil acheteur : ${item.contact.buyerProfileUrl}` : null,
          ].filter(Boolean).join(' | '),
        })
        knownKeys.add(key)
        imported += 1
      }

      setImportStatus(`${imported} annonce(s) BOAMP importee(s). Flux genere : ${feed.generatedAt || 'date non renseignee'}.`)
    } catch (importError) {
      setImportStatus('')
      setError(importError instanceof Error ? importError.message : 'Import BOAMP impossible.')
    }
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          action={
            <div className="flex flex-wrap gap-3">
              <button className="cta-secondary" onClick={() => seedDemoData()} type="button">
                <RefreshCw className="size-4" />
                Charger demo
              </button>
              <button className="cta-secondary" onClick={importBoampFeed} type="button">
                <FileDown className="size-4" />
                Import BOAMP
              </button>
              <button className="cta-primary" disabled={tenders.length === 0} onClick={() => exportTenders(tenders)} type="button">
                <Download className="size-4" />
                Export CSV
              </button>
            </div>
          }
          description="Tableau de bord localStorage pour suivre les appels d offres GIB : detection, qualification, DCE, reponse, depot et resultat. Aucun backend, aucun scraping."
          eyebrow="Admin appels d offres"
          light
          title="Piloter les marches publics et organismes a traiter."
        />
      </section>

      {importStatus ? (
        <section className="rounded-[1.35rem] border border-emerald-300/40 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          {importStatus}
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">AO suivis</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">A traiter</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.active}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Priorite forte</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.urgent}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Deposes</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.submitted}</p>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Premiers clients"
          title="Organismes a prioriser apres import."
          description="Cette liste classe les opportunites importees par score. Elle sert a choisir les premiers organismes a analyser, pas a les spammer."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {firstClientTargets.length === 0 ? (
            <div className="rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5 text-sm text-black/62 lg:col-span-5">
              Importez le flux BOAMP pour afficher les premiers organismes a cibler.
            </div>
          ) : (
            firstClientTargets.map((target) => (
              <article key={target.id} className="rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]">{target.score}/10</p>
                <h3 className="mt-3 text-base font-semibold leading-6 text-black">{target.organism || 'Organisme a verifier'}</h3>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-black/62">{target.object}</p>
                <a className="mt-4 inline-flex text-sm font-semibold text-[#0f6ea7]" href={buildTenderWhatsApp(target)} rel="noreferrer" target="_blank">
                  Preparer contact
                </a>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <form className="surface-panel px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
          <SectionHeading
            eyebrow="Nouvelle opportunite"
            title="Ajouter un appel d offres."
            description="Ajoutez uniquement les consultations utiles et gardez les documents confidentiels hors site public."
          />
          <div className="mt-6 grid gap-4">
            <input className="field-light" onChange={(e) => handleChange('organism', e.target.value)} placeholder="Organisme" value={draft.organism} />
            <input className="field-light" onChange={(e) => handleChange('object', e.target.value)} placeholder="Objet du marche" value={draft.object} />
            <input className="field-light" onChange={(e) => handleChange('platform', e.target.value)} placeholder="Plateforme : BOAMP, PLACE..." value={draft.platform} />
            <input className="field-light" onChange={(e) => handleChange('url', e.target.value)} placeholder="Lien DCE / avis" value={draft.url} />
            <input className="field-light" onChange={(e) => handleChange('lot', e.target.value)} placeholder="Lot" value={draft.lot} />
            <input className="field-light" onChange={(e) => handleChange('deadline', e.target.value)} type="date" value={draft.deadline} />
            <input className="field-light" onChange={(e) => handleChange('commune', e.target.value)} placeholder="Commune / zone" value={draft.commune} />
            <select className="field-light" onChange={(e) => handleChange('visitRequired', e.target.value)} value={draft.visitRequired}>
              <option>A verifier</option>
              <option>Visite obligatoire</option>
              <option>Visite facultative</option>
              <option>Pas de visite</option>
            </select>
            <label className="text-sm font-semibold text-black/70">
              Score {draft.score}/10
              <input className="mt-3 w-full accent-[#1398db]" max="10" min="0" onChange={(e) => handleChange('score', e.target.value)} type="range" value={draft.score} />
            </label>
            <textarea className="field-light min-h-24" onChange={(e) => handleChange('documents', e.target.value)} placeholder="Pieces demandees" value={draft.documents} />
            <textarea className="field-light min-h-24" onChange={(e) => handleChange('nextAction', e.target.value)} placeholder="Action suivante" value={draft.nextAction} />
          </div>
          {error ? <p className="mt-4 rounded-[1rem] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
          <button className="cta-primary mt-5 w-full" type="submit">
            <FilePlus2 className="size-4" />
            Ajouter au suivi
          </button>
        </form>

        <section className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Suivi local"
            title="Opportunites AO a traiter."
            description="Changez les statuts directement. Les donnees restent dans le navigateur de demonstration."
          />
          <div className="mt-6 space-y-4">
            {tenders.length === 0 ? (
              <div className="rounded-[1.5rem] border border-[#1398db]/12 bg-white p-6 text-center text-sm text-black/62">
                Aucun appel d offres local. Chargez la demo ou ajoutez une opportunite.
              </div>
            ) : (
              tenders.map((tender) => (
                <article key={tender.id} className="rounded-[1.6rem] border border-[#1398db]/12 bg-white p-5 shadow-[0_14px_36px_rgba(19,122,186,0.06)]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag !bg-[#eef8ff] !text-[#0f6ea7]">{getScoreLabel(tender.score)} · {tender.score}/10</span>
                        <span className="rounded-full bg-[#f5eee1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a671c]">
                          {formatDate(tender.createdAt)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black">{tender.object || 'Objet a renseigner'}</h3>
                        <p className="mt-1 text-sm text-black/62">{tender.organism || 'Organisme a renseigner'} · {tender.commune}</p>
                      </div>
                      <dl className="grid gap-3 text-sm text-black/68 md:grid-cols-2">
                        <div>
                          <dt className="font-semibold text-black">Plateforme</dt>
                          <dd>{tender.platform || 'A verifier'}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-black">Date limite</dt>
                          <dd>{tender.deadline || 'A verifier'}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-black">Lot</dt>
                          <dd>{tender.lot || 'A verifier'}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-black">Visite</dt>
                          <dd>{tender.visitRequired}</dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="font-semibold text-black">Action suivante</dt>
                          <dd>{tender.nextAction || 'A definir'}</dd>
                        </div>
                        {tender.notes ? (
                          <div className="md:col-span-2">
                            <dt className="font-semibold text-black">Coordonnees / notes</dt>
                            <dd>{tender.notes}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>
                    <div className="flex w-full flex-col gap-3 lg:w-56">
                      <select
                        className="field-light"
                        onChange={(event) => updateTender(tender.id, { status: event.target.value as TenderOpportunity['status'] })}
                        value={tender.status}
                      >
                        {tenderStatuses.map((status) => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                      <select
                        className="field-light"
                        onChange={(event) => updateTender(tender.id, { priority: event.target.value as TenderOpportunity['priority'] })}
                        value={tender.priority}
                      >
                        {priorities.map((priority) => (
                          <option key={priority.value} value={priority.value}>{priority.label}</option>
                        ))}
                      </select>
                      <a className="cta-whatsapp w-full" href={buildTenderWhatsApp(tender)} rel="noreferrer" target="_blank">
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                      {tender.url ? (
                        <a className="cta-secondary w-full" href={tender.url} rel="noreferrer" target="_blank">
                          <ExternalLink className="size-4" />
                          Ouvrir source
                        </a>
                      ) : null}
                      <button className="cta-secondary w-full !border-red-200 !text-red-700" onClick={() => deleteTender(tender.id)} type="button">
                        <Trash2 className="size-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Mode statique</p>
            <h2 className="section-title mt-3 text-white">Pret pour une demo sans backend.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/74">
              Ce tableau ne scrape aucune plateforme et ne depose aucune offre. Il sert a piloter manuellement la veille et la qualification.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" to="/appels-offres">
              Voir veille AO
            </Link>
            <Link className="cta-secondary !border-white/25 !bg-white/10 !text-white" to="/dossier-entreprise">
              Dossier entreprise
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
