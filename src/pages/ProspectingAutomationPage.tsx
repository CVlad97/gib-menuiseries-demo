import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MessageCircle,
  PhoneCall,
  RefreshCw,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { company } from '../lib/content'

type AutomationStatus = 'pret' | 'envoye' | 'repondu' | 'relance' | 'stop' | 'ecarte'
type DossierStatus = 'a_preparer' | 'dce' | 'go' | 'no_go' | 'depose'

interface QueueItem {
  id: string
  sourceId: string
  type: 'response' | 'qualification'
  organism: string
  object: string
  lot: string
  deadline: string
  daysUntilDeadline: number | null
  priority: string
  score: number
  url: string
  contact: {
    email: string
    phone: string
    name: string
    profile: string
  }
  automation: {
    emailReady: boolean
    phoneReady: boolean
    whatsappReady: boolean
    officialSubmission: string
    duplicateGuard: string
  }
  email: {
    to: string
    subject: string
    body: string
    mailto: string
  } | null
  whatsapp: {
    to: string
    body: string
    url: string
  }
  call: {
    phone: string
    script: string
    telUrl: string
  }
  dossier: {
    status: string
    checklist: string[]
    warning: string
  }
  followUps: Array<{
    label: string
    date: string
    action: string
  }>
}

interface AutomationFeed {
  source: string
  generatedAt: string
  tenderFeedGeneratedAt: string
  summary: {
    totalTenderRows: number
    uniqueQueueItems: number
    emailReady: number
    phoneReady: number
    urgent: number
    manualSubmissionRequired: number
  }
  compliance: string[]
  queue: QueueItem[]
}

interface QueueTracking {
  id: string
  emailStatus: AutomationStatus
  whatsappStatus: AutomationStatus
  callStatus: AutomationStatus
  dossierStatus: DossierStatus
  lastAction: string
  notes: string
}

const trackingKey = 'gib-prospecting-automation-tracking'

function readTracking(): QueueTracking[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(trackingKey)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as QueueTracking[]
  } catch {
    return []
  }
}

function writeTracking(items: QueueTracking[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(trackingKey, JSON.stringify(items))
}

function defaultTracking(id: string): QueueTracking {
  return {
    id,
    emailStatus: 'pret',
    whatsappStatus: 'pret',
    callStatus: 'pret',
    dossierStatus: 'a_preparer',
    lastAction: '',
    notes: '',
  }
}

function formatDateTime(value: string) {
  if (!value) {
    return 'a verifier'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function exportJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function buildCsv(feed: AutomationFeed, tracking: QueueTracking[]) {
  const trackingById = new Map(tracking.map((item) => [item.id, item]))
  const headers = [
    'organisme',
    'reference',
    'objet',
    'deadline',
    'email',
    'telephone',
    'score',
    'email_status',
    'whatsapp_status',
    'call_status',
    'dossier_status',
    'source',
  ]
  const rows = feed.queue.map((item) => {
    const state = trackingById.get(item.id) ?? defaultTracking(item.id)
    return [
      item.organism,
      item.sourceId,
      item.object,
      item.deadline,
      item.contact.email,
      item.contact.phone,
      item.score,
      state.emailStatus,
      state.whatsappStatus,
      state.callStatus,
      state.dossierStatus,
      item.url,
    ].map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')
  })

  return [headers.join(','), ...rows].join('\n')
}

export function ProspectingAutomationPage() {
  const [feed, setFeed] = useState<AutomationFeed | null>(null)
  const [tracking, setTracking] = useState<QueueTracking[]>(() => readTracking())
  const [filter, setFilter] = useState<'tous' | 'email' | 'tel' | 'reponse'>('tous')
  const [notice, setNotice] = useState('Chargement de la queue automation...')

  useEffect(() => {
    fetch(withBase('data/gib/prospecting-automation.json'), { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Queue indisponible (${response.status})`)))
      .then((data: AutomationFeed) => {
        setFeed(data)
        setNotice(`Queue chargee : ${data.summary.uniqueQueueItems} actions uniques.`)
      })
      .catch((error: Error) => setNotice(error.message))
  }, [])

  const trackingById = useMemo(() => new Map(tracking.map((item) => [item.id, item])), [tracking])

  const visibleQueue = useMemo(() => {
    const items = feed?.queue ?? []

    return items.filter((item) => {
      if (filter === 'email') {
        return item.automation.emailReady
      }
      if (filter === 'tel') {
        return item.automation.phoneReady
      }
      if (filter === 'reponse') {
        return item.type === 'response'
      }
      return true
    })
  }, [feed, filter])

  const stats = useMemo(() => {
    const items = feed?.queue ?? []
    return {
      total: items.length,
      emailReady: items.filter((item) => item.automation.emailReady).length,
      phoneReady: items.filter((item) => item.automation.phoneReady).length,
      responseReady: items.filter((item) => item.type === 'response').length,
      sent: tracking.filter((item) => item.emailStatus === 'envoye' || item.whatsappStatus === 'envoye').length,
    }
  }, [feed, tracking])

  function persist(next: QueueTracking[], message: string) {
    setTracking(next)
    writeTracking(next)
    setNotice(message)
  }

  function patchTracking(id: string, patch: Partial<QueueTracking>) {
    const current = trackingById.get(id) ?? defaultTracking(id)
    const nextItem = {
      ...current,
      ...patch,
      lastAction: new Date().toISOString().slice(0, 10),
    }
    const next = [nextItem, ...tracking.filter((item) => item.id !== id)]
    persist(next, 'Suivi mis a jour.')
  }

  async function copyText(text: string, message: string) {
    if (!navigator.clipboard) {
      setNotice(text)
      return
    }

    await navigator.clipboard.writeText(text)
    setNotice(message)
  }

  function exportCsv() {
    if (!feed) {
      return
    }

    const blob = new Blob([buildCsv(feed, tracking)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gib-automation-suivi-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  function markAllReady() {
    if (!feed) {
      return
    }

    const next = feed.queue.map((item) => trackingById.get(item.id) ?? defaultTracking(item.id))
    persist(next, 'Toutes les lignes sont initialisees dans le suivi local.')
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.9fr] lg:items-center">
          <SectionHeading
            description="Queue automatique issue de BOAMP : e-mails prets, WhatsApp interne, appels, relances et checklist de reponse AO. Les depots officiels restent manuels pour respecter les profils acheteurs."
            eyebrow="Automation commerciale"
            light
            title="Prospection mail, WhatsApp et gestion des appels d offres."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Actions', stats.total],
              ['E-mails prets', stats.emailReady],
              ['Telephones', stats.phoneReady],
              ['Reponses AO', stats.responseReady],
            ].map(([label, value]) => (
              <div className="rounded-[1.4rem] border border-white/16 bg-white/12 p-5" key={label}>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-6 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-black">{notice}</p>
            <p className="text-xs leading-6 text-black/55">
              Derniere generation queue : {feed ? formatDateTime(feed.generatedAt) : 'chargement'} · flux BOAMP : {feed ? formatDateTime(feed.tenderFeedGeneratedAt) : 'chargement'}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="cta-secondary" onClick={markAllReady} type="button">
              <RefreshCw className="size-4" />
              Initialiser suivi
            </button>
            <button className="cta-secondary" onClick={exportCsv} type="button">
              <Download className="size-4" />
              Export suivi
            </button>
            {feed ? (
              <button className="cta-secondary" onClick={() => exportJson(feed, 'gib-prospecting-automation.json')} type="button">
                <Download className="size-4" />
                Export queue
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="surface-panel px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-[#1398db]" />
            <h2 className="text-xl font-semibold text-black">Regles automatiques</h2>
          </div>
          <div className="mt-5 space-y-3">
            {(feed?.compliance ?? [
              'Utiliser uniquement les contacts publies.',
              'Ne pas deposer automatiquement une offre.',
              'Valider DCE, prix et pieces avant reponse.',
            ]).map((rule) => (
              <p className="flex gap-3 rounded-[1.1rem] border border-[#1398db]/10 bg-white p-4 text-sm leading-6 text-black/68" key={rule}>
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                {rule}
              </p>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-6 sm:px-8">
          <SectionHeading
            eyebrow="Mode operationnel"
            title="Ce qui est automatise."
            description="Le site prepare les actions et trace le suivi. L envoi email reel peut etre execute via le connecteur Hostinger apres validation. WhatsApp ouvre un brouillon Android, car l envoi automatique massif est bloque par design."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ['Mail', 'Sujet + corps + mailto + payload exportable.'],
              ['WhatsApp', 'Brouillon interne vers Vladimir avec AO prioritaire.'],
              ['Appel', 'Script pret + lien tel quand numero publie.'],
              ['Dossier AO', 'Checklist DCE, go/no-go, pieces et depot manuel.'],
            ].map(([title, text]) => (
              <div className="process-step" key={title}>
                <h3 className="font-semibold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/62">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-6 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {[
            ['tous', 'Tous'],
            ['email', 'Avec e-mail'],
            ['tel', 'Avec telephone'],
            ['reponse', 'Reponse AO'],
          ].map(([value, label]) => (
            <button
              className={`chip-button ${filter === value ? 'chip-button-active' : ''}`}
              key={value}
              onClick={() => setFilter(value as typeof filter)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        {visibleQueue.map((item) => {
          const state = trackingById.get(item.id) ?? defaultTracking(item.id)
          const checklist = item.dossier.checklist.join('\n- ')

          return (
            <article className="surface-panel px-5 py-5 sm:px-6" key={item.id}>
              <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag">{item.type === 'response' ? 'Reponse AO' : 'Qualification'}</span>
                    <span className="micro-badge">Score {item.score}/10</span>
                    <span className="micro-badge">Deadline {item.deadline || 'a verifier'}</span>
                    <span className="micro-badge">Email {state.emailStatus}</span>
                    <span className="micro-badge">Dossier {state.dossierStatus}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight text-black">{item.organism}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/66">{item.object}</p>
                  </div>
                  <div className="grid gap-3 text-sm text-black/68 md:grid-cols-2">
                    <p><strong>Reference :</strong> {item.sourceId}</p>
                    <p><strong>Lot :</strong> {item.lot || 'a verifier'}</p>
                    <p><strong>Email :</strong> {item.contact.email ? <a className="text-[#0f6ea7]" href={`mailto:${item.contact.email}`}>{item.contact.email}</a> : 'non fourni'}</p>
                    <p><strong>Telephone :</strong> {item.contact.phone ? <a className="text-[#0f6ea7]" href={`tel:${item.contact.phone}`}>{item.contact.phone}</a> : 'non fourni'}</p>
                    <p className="md:col-span-2"><strong>Profil/DCE :</strong> {item.contact.profile || item.url}</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-amber-300/40 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                    <AlertTriangle className="mr-2 inline size-4" />
                    {item.dossier.warning}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {item.email ? (
                    <a className="cta-primary w-full" href={item.email.mailto} onClick={() => patchTracking(item.id, { emailStatus: 'envoye' })}>
                      <Mail className="size-4" />
                      Ouvrir e-mail
                    </a>
                  ) : null}
                  <a className="cta-whatsapp w-full" href={item.whatsapp.url} onClick={() => patchTracking(item.id, { whatsappStatus: 'envoye' })} rel="noreferrer" target="_blank">
                    <MessageCircle className="size-4" />
                    WhatsApp Vladimir
                  </a>
                  {item.call.telUrl ? (
                    <a className="cta-secondary w-full" href={item.call.telUrl} onClick={() => patchTracking(item.id, { callStatus: 'envoye' })}>
                      <PhoneCall className="size-4" />
                      Appeler acheteur
                    </a>
                  ) : null}
                  <a className="cta-secondary w-full" href={item.url} rel="noreferrer" target="_blank">
                    <ExternalLink className="size-4" />
                    Source AO
                  </a>
                  <button className="cta-secondary w-full" onClick={() => copyText(item.email?.body ?? item.whatsapp.body, `Message copie pour ${item.organism}.`)} type="button">
                    <Copy className="size-4" />
                    Copier mail
                  </button>
                  <button className="cta-secondary w-full" onClick={() => copyText(item.call.script, `Script appel copie pour ${item.organism}.`)} type="button">
                    <PhoneCall className="size-4" />
                    Script appel
                  </button>
                  <button className="cta-secondary w-full" onClick={() => copyText(`Checklist ${item.organism}\n- ${checklist}`, `Checklist DCE copiee pour ${item.organism}.`)} type="button">
                    <ClipboardCheck className="size-4" />
                    Checklist DCE
                  </button>
                  <select className="field-light" value={state.dossierStatus} onChange={(event) => patchTracking(item.id, { dossierStatus: event.target.value as DossierStatus })}>
                    <option value="a_preparer">Dossier a preparer</option>
                    <option value="dce">DCE telecharge</option>
                    <option value="go">Go reponse</option>
                    <option value="no_go">No-go</option>
                    <option value="depose">Depose</option>
                  </select>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Execution</span>
            <h2 className="section-title mt-3 text-white">Prochaine etape : connecter l envoi e-mail reel.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              La queue est prête. Depuis le chat, je peux utiliser Hostinger pour envoyer les lignes e-mail prêtes, puis le dashboard servira au suivi des reponses et depots.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="cta-primary" to="/prospection-globale">
              <Send className="size-4" />
              Pipeline global
            </Link>
            <Link className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" to="/admin-appels-offres">
              Tableau AO
            </Link>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              WhatsApp GIB
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
