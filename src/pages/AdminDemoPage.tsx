import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Eye,
  MessageCircle,
  RefreshCw,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { company } from '../lib/content'
import {
  listLeads,
  listSimulations,
  seedDemoData,
  subscribeAdminUpdates,
  type LeadDraft,
  type SimulationDraft,
  updateLeadStatus,
  updateSimulationStatus,
} from '../lib/storage'

const leadStatuses: Array<{ value: LeadDraft['status']; label: string }> = [
  { value: 'new', label: 'Nouveau' },
  { value: 'qualified', label: 'Qualifie' },
  { value: 'quoted', label: 'Devis envoye' },
  { value: 'closed', label: 'Clos' },
]

const simulationStatuses: Array<{ value: SimulationDraft['status']; label: string }> = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'review', label: 'A revoir' },
  { value: 'converted', label: 'Convertie' },
]

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function buildWhatsAppSummary(lead: LeadDraft) {
  const lines = [
    `Lead demo GIB`,
    `Projet: ${lead.typeProjet}`,
    `Produit: ${lead.produit}`,
    `Commune: ${lead.commune || 'non renseignee'}`,
    `Dimensions: ${lead.dimensions || 'non renseignees'}`,
    `Contexte: ${lead.contexte || 'non renseigne'}`,
    `Contact: ${lead.contact || 'non renseigne'}`,
    `Statut: ${lead.status}`,
  ]

  if (lead.commentaire) {
    lines.push(`Note: ${lead.commentaire}`)
  }

  return `https://wa.me/596696905164?text=${encodeURIComponent(lines.join('\n'))}`
}

export function AdminDemoPage() {
  const [leads, setLeads] = useState<LeadDraft[]>([])
  const [simulations, setSimulations] = useState<SimulationDraft[]>([])

  useEffect(() => {
    const refresh = () => {
      setLeads(listLeads())
      setSimulations(listSimulations())
    }

    refresh()
    return subscribeAdminUpdates(refresh)
  }, [])

  const hasData = leads.length > 0 || simulations.length > 0

  const stats = useMemo(() => {
    return {
      leads: leads.length,
      pendingLeads: leads.filter((entry) => entry.status === 'new' || entry.status === 'qualified').length,
      simulations: simulations.length,
      converted: simulations.filter((entry) => entry.status === 'converted').length,
    }
  }, [leads, simulations])

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          action={
            <div className="flex flex-wrap gap-3">
              <button className="cta-secondary" onClick={() => seedDemoData()} type="button">
                <WandSparkles className="size-4" />
                Charger des donnees demo
              </button>
              <Link className="cta-primary" to="/devis">
                <ClipboardList className="size-4" />
                Creer un lead
              </Link>
            </div>
          }
          description="Cet ecran reste 100% statique. Il lit localStorage, affiche les leads devis et les simulations, permet de changer le statut en direct et ouvre un WhatsApp pre-rempli vers le numero public GIB."
          eyebrow="Admin demo"
          light
          title="Une lecture claire des opportunites sans backend ni CRM branche."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Leads devis</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.leads}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Leads a traiter</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.pendingLeads}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Simulations</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.simulations}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Simulations converties</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stats.converted}</p>
        </div>
      </section>

      {!hasData ? (
        <section className="surface-panel px-6 py-10 text-center sm:px-8">
          <p className="eyebrow">Aucune donnee locale</p>
          <h2 className="section-title mt-4 text-[var(--text-dark)]">L admin demo attend ses premiers leads et simulations.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/62">
            Tu peux soit soumettre un devis et une simulation depuis la demo, soit injecter un petit jeu de donnees de presentation pour montrer l ecran tout de suite.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="cta-primary" onClick={() => seedDemoData()} type="button">
              Charger des donnees demo
            </button>
            <Link className="cta-secondary" to="/simulation">
              Creer une simulation
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            description="Chaque lead conserve un statut simple, les infos projet et un raccourci WhatsApp pour remonter le brief vers le numero public GIB."
            eyebrow="Leads devis"
            title="Lecture rapide des demandes entrantes."
          />
          <div className="mt-8 space-y-4">
            {leads.length === 0 ? (
              <p className="text-sm text-black/60">Aucun lead pour l instant.</p>
            ) : (
              leads.map((lead) => (
                <article key={lead.id} className="rounded-[1.8rem] border border-black/8 bg-white p-5 shadow-[0_14px_36px_rgba(17,22,21,0.05)]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag bg-black text-white">{lead.typeProjet}</span>
                        <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/58">
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black">{lead.produit}</h3>
                        <p className="mt-1 text-sm text-black/62">
                          {lead.commune || 'Commune non renseignee'} · {lead.dimensions || 'Dimensions non renseignees'}
                        </p>
                      </div>
                      <dl className="grid gap-3 text-sm text-black/68 md:grid-cols-2">
                        <div>
                          <dt className="font-semibold text-black">Contexte</dt>
                          <dd>{lead.contexte || 'Non renseigne'}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-black">Contact</dt>
                          <dd>{lead.contact || 'Non renseigne'}</dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="font-semibold text-black">Commentaire</dt>
                          <dd>{lead.commentaire || 'Aucune note'}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-black">Photos</dt>
                          <dd>{lead.photos.length > 0 ? `${lead.photos.length} fichier(s)` : 'Aucune'}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex w-full flex-col gap-3 lg:w-56">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                        Statut
                        <select
                          className="field-light mt-2"
                          onChange={(event) => updateLeadStatus(lead.id, event.target.value as LeadDraft['status'])}
                          value={lead.status}
                        >
                          {leadStatuses.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <a className="cta-whatsapp w-full" href={buildWhatsAppSummary(lead)} rel="noreferrer" target="_blank">
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                      <Link className="cta-secondary w-full" to={`/devis?product=${encodeURIComponent(lead.produit)}`}>
                        <ExternalLink className="size-4" />
                        Ouvrir devis
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="glass-panel px-6 py-8 sm:px-8">
          <SectionHeading
            description="Les simulations gardent leur ambiance, leur note terrain et un statut simple. Cela suffit pour une demo lisible avant branchement d un vrai back-office."
            eyebrow="Simulations"
            light
            title="Visualiser ce qui doit devenir un devis."
          />
          <div className="mt-8 space-y-4">
            {simulations.length === 0 ? (
              <p className="text-sm text-white/62">Aucune simulation pour l instant.</p>
            ) : (
              simulations.map((simulation) => (
                <article key={simulation.id} className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-4">
                  <div className="grid gap-4 md:grid-cols-[104px_1fr]">
                    <MediaImage
                      alt={`Simulation ${simulation.produit}`}
                      className="overflow-hidden rounded-[1.4rem]"
                      fallbackSrc="fallbacks/default.svg"
                      imgClassName="h-[104px] w-full object-cover"
                      src={simulation.imagePreview ?? 'fallbacks/default.svg'}
                    />
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag">{simulation.produit.replaceAll('-', ' ')}</span>
                        <span className="rounded-full bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/58">
                          {formatDate(simulation.createdAt)}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-white">Ambiance {simulation.ambiance}</p>
                      <p className="text-sm leading-7 text-white/68">{simulation.notes || 'Sans note terrain.'}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                      Statut
                      <select
                        className="field mt-2 min-w-48"
                        onChange={(event) => updateSimulationStatus(simulation.id, event.target.value as SimulationDraft['status'])}
                        value={simulation.status}
                      >
                        {simulationStatuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <Link className="cta-secondary" to={`/simulation?product=${simulation.produit}`}>
                        <Eye className="size-4" />
                        Ouvrir simulation
                      </Link>
                      <Link className="cta-primary" to={`/devis?product=${simulation.produit}`}>
                        <Sparkles className="size-4" />
                        Convertir en devis
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="glass-panel-strong px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Mode demo</p>
            <h2 className="section-title mt-4 text-[var(--text)]">Toujours statique, toujours GitHub Pages compatible.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp public GIB
            </a>
            <button className="cta-secondary" onClick={() => seedDemoData()} type="button">
              <RefreshCw className="size-4" />
              Regenerer les donnees demo
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-white/70">
          <p className="inline-flex items-center gap-2 font-semibold text-white">
            <CheckCircle2 className="size-4 text-[#d8c189]" />
            L admin demo lit uniquement localStorage. Aucun backend n a ete ajoute.
          </p>
        </div>
      </section>
    </div>
  )
}
