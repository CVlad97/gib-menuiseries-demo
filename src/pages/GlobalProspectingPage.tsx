import { useMemo, useState } from 'react'
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MessageCircle,
  PhoneCall,
  Plus,
  Search,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import {
  globalProspectTemplates,
  martiniqueZones,
  prospectChannels,
  prospectSegments,
  type ProspectChannel,
  type ProspectSegment,
} from '../data/globalProspecting'
import { buildWhatsAppUrl, company } from '../lib/content'

type ProspectStatus = 'A contacter' | 'Contacte' | 'Relance J+1' | 'Relance J+3' | 'Relance J+7' | 'Qualifie' | 'Perdu'

interface GlobalProspect {
  id: string
  createdAt: string
  name: string
  segment: ProspectSegment
  zone: string
  contactName: string
  email: string
  phone: string
  channel: ProspectChannel
  need: string
  source: string
  status: ProspectStatus
  score: number
  nextAction: string
  lastContact: string
  notes: string
}

const storageKey = 'gib-global-prospects'

const statuses: ProspectStatus[] = [
  'A contacter',
  'Contacte',
  'Relance J+1',
  'Relance J+3',
  'Relance J+7',
  'Qualifie',
  'Perdu',
]

const starterProspects: GlobalProspect[] = [
  {
    id: 'starter-syndics',
    createdAt: new Date().toISOString(),
    name: 'Syndics Martinique - vague 1',
    segment: 'Syndics',
    zone: 'Fort-de-France',
    contactName: 'Gestionnaire travaux',
    email: '',
    phone: '',
    channel: 'Email',
    need: 'Portails, volets, garde-corps, acces residence, depannage',
    source: 'Google Maps / PagesJaunes / recommandations',
    status: 'A contacter',
    score: 9,
    nextAction: 'Lister 30 syndics, envoyer flyer, appeler J+1.',
    lastContact: '',
    notes: 'Priorite forte : contrats recurrence et travaux copropriete.',
  },
  {
    id: 'starter-hotels',
    createdAt: new Date().toISOString(),
    name: 'Hotels et villas - Sud Martinique',
    segment: 'Tourisme',
    zone: 'Trois-Ilets',
    contactName: 'Responsable technique / direction',
    email: '',
    phone: '',
    channel: 'WhatsApp',
    need: 'Baies, volets, pergolas, securisation avant saison',
    source: 'Google Maps / Instagram / conciergeries',
    status: 'A contacter',
    score: 8,
    nextAction: 'Cibler 25 etablissements, proposer audit photo.',
    lastContact: '',
    notes: 'Angle commercial : confort client, resistance climat, intervention locale.',
  },
  {
    id: 'starter-btp',
    createdAt: new Date().toISOString(),
    name: 'Entreprises BTP - sous-traitance',
    segment: 'BTP',
    zone: 'Toute Martinique',
    contactName: 'Conducteur travaux',
    email: '',
    phone: '',
    channel: 'Telephone',
    need: 'Sous-traitance menuiserie aluminium et fermetures',
    source: 'Chantiers visibles / reseau local',
    status: 'A contacter',
    score: 8,
    nextAction: 'Appeler 15 entreprises et demander le responsable travaux.',
    lastContact: '',
    notes: 'Demander s ils ont des lots menuiserie a chiffrer cette semaine.',
  },
]

const emptyForm: Omit<GlobalProspect, 'id' | 'createdAt'> = {
  name: '',
  segment: 'Immobilier',
  zone: 'Ducos',
  contactName: '',
  email: '',
  phone: '',
  channel: 'WhatsApp',
  need: '',
  source: '',
  status: 'A contacter',
  score: 7,
  nextAction: '',
  lastContact: '',
  notes: '',
}

function readProspects(): GlobalProspect[] {
  if (typeof window === 'undefined') {
    return starterProspects
  }

  const raw = window.localStorage.getItem(storageKey)
  if (!raw) {
    window.localStorage.setItem(storageKey, JSON.stringify(starterProspects))
    return starterProspects
  }

  try {
    return JSON.parse(raw) as GlobalProspect[]
  } catch {
    return starterProspects
  }
}

function writeProspects(prospects: GlobalProspect[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(prospects))
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function buildEmailBody(prospect: Pick<GlobalProspect, 'name' | 'segment' | 'zone' | 'need'>) {
  return [
    'Bonjour,',
    '',
    'Je me permets de vous presenter GIB Menuiseries Services, entreprise situee a Ducos avec magasin a Cluny, specialisee dans la menuiserie aluminium en Martinique.',
    '',
    'Nous intervenons sur : baies vitrees, chassis coulissants, volets roulants, portails aluminium, pergolas, garde-corps, jalousies, protections solaires, renovation et depannage.',
    '',
    `Pour votre secteur ${prospect.zone || 'Martinique'}, le besoin identifie peut concerner : ${prospect.need || 'menuiserie, fermeture, renovation ou securisation'}.`,
    '',
    'Realisations : https://www.gibmenuiseries.fr',
    'Instagram : https://www.instagram.com/gibmenuiseries/',
    'Flyer : https://cvlad97.github.io/gib-menuiseries-demo/media/gib/flyers/pub3.jpeg',
    '',
    'Pour une premiere estimation rapide, vous pouvez envoyer des photos, la commune, les dimensions approximatives et le type de besoin.',
    '',
    'Bien cordialement,',
    'Vladimir Claveau',
    'Contact commercial - GIB Menuiseries Services',
    'WhatsApp : +596 696 65 35 89',
    'Email : gibmenuiseriesservices@gmail.com',
    'Zone Industrielle Cocotte, derriere Lapeyre, Ducos, Martinique',
    '',
    'Si vous n etes pas concerne, repondez simplement STOP et je ne vous relancerai pas.',
  ].join('\n')
}

function buildCallScript(prospect: GlobalProspect) {
  return [
    `Bonjour, je suis Vladimir pour GIB Menuiseries Services a Ducos.`,
    `Je vous appelle car vous etes dans le segment ${prospect.segment} sur ${prospect.zone}.`,
    `Nous intervenons en menuiserie aluminium : baies, volets, portails, pergolas, garde-corps, jalousies, renovation et depannage.`,
    `Avez-vous actuellement un besoin sur ${prospect.need || 'menuiserie, fermeture ou renovation'} ?`,
    'Si oui, je peux vous envoyer notre flyer et demander photos + dimensions pour une premiere orientation.',
    'Sinon, quel serait le bon interlocuteur travaux/maintenance a contacter ?',
  ].join('\n')
}

function toCsv(prospects: GlobalProspect[]) {
  const headers = ['name', 'segment', 'zone', 'contactName', 'email', 'phone', 'channel', 'status', 'score', 'nextAction', 'need', 'source', 'notes']
  const rows = prospects.map((prospect) =>
    headers.map((key) => {
      const value = String(prospect[key as keyof GlobalProspect] ?? '')
      return `"${value.replace(/"/g, '""')}"`
    }).join(','),
  )

  return [headers.join(','), ...rows].join('\n')
}

export function GlobalProspectingPage() {
  const [prospects, setProspects] = useState<GlobalProspect[]>(() => readProspects())
  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<ProspectSegment | 'Tous'>('Tous')
  const [status, setStatus] = useState<ProspectStatus | 'Tous'>('Tous')
  const [notice, setNotice] = useState('')

  const filteredProspects = useMemo(() => {
    const needle = normalizeText(query)

    return prospects
      .filter((prospect) => segment === 'Tous' || prospect.segment === segment)
      .filter((prospect) => status === 'Tous' || prospect.status === status)
      .filter((prospect) => {
        const haystack = normalizeText(`${prospect.name} ${prospect.segment} ${prospect.zone} ${prospect.need} ${prospect.email} ${prospect.phone} ${prospect.notes}`)
        return needle.length === 0 || haystack.includes(needle)
      })
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  }, [prospects, query, segment, status])

  const stats = useMemo(() => {
    const qualified = prospects.filter((prospect) => prospect.status === 'Qualifie').length
    const toContact = prospects.filter((prospect) => prospect.status === 'A contacter').length
    const relaunch = prospects.filter((prospect) => prospect.status.includes('Relance')).length
    const averageScore = prospects.length > 0 ? Math.round(prospects.reduce((sum, prospect) => sum + prospect.score, 0) / prospects.length) : 0

    return { qualified, toContact, relaunch, averageScore }
  }, [prospects])

  function persist(nextProspects: GlobalProspect[], message: string) {
    setProspects(nextProspects)
    writeProspects(nextProspects)
    setNotice(message)
  }

  function addProspect() {
    if (!form.name.trim()) {
      setNotice('Ajoutez au minimum un nom de prospect ou une vague de prospection.')
      return
    }

    const nextProspect: GlobalProspect = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: form.name.trim(),
    }

    persist([nextProspect, ...prospects], `${nextProspect.name} ajoute au pipeline.`)
    setForm(emptyForm)
  }

  function updateStatus(id: string, nextStatus: ProspectStatus) {
    persist(
      prospects.map((prospect) =>
        prospect.id === id
          ? {
              ...prospect,
              status: nextStatus,
              lastContact: nextStatus === 'Contacte' ? new Date().toISOString().slice(0, 10) : prospect.lastContact,
            }
          : prospect,
      ),
      'Statut mis a jour.',
    )
  }

  function seedFromTemplate(templateId: string) {
    const template = globalProspectTemplates.find((entry) => entry.id === templateId)
    if (!template) {
      return
    }

    const nextProspect: GlobalProspect = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: template.title,
      segment: template.segment,
      zone: 'Toute Martinique',
      contactName: template.contactHint,
      email: '',
      phone: '',
      channel: template.channel,
      need: template.need,
      source: template.source,
      status: 'A contacter',
      score: template.score,
      nextAction: template.firstAction,
      lastContact: '',
      notes: `Offre : ${template.offer}. Cible : ${template.target}.`,
    }

    persist([nextProspect, ...prospects], `${template.title} ajoute au pipeline.`)
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
    const blob = new Blob([toCsv(filteredProspects)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gib-prospection-globale-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Export CSV genere.')
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr] lg:items-center">
          <SectionHeading
            description="Une app locale pour piloter la prospection GIB hors appels d offres : cibles, scoring, scripts, relances, export et actions WhatsApp/e-mail."
            eyebrow="Prospection globale"
            light
            title="Transformer chaque segment Martinique en pipeline commercial."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Prospects', prospects.length],
              ['A contacter', stats.toContact],
              ['Relances', stats.relaunch],
              ['Score moyen', `${stats.averageScore}/10`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.4rem] border border-white/16 bg-white/12 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="surface-panel px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <Plus className="size-5 text-[#1398db]" />
            <h2 className="text-xl font-semibold text-black">Ajouter une cible</h2>
          </div>
          <div className="mt-5 grid gap-4">
            <input className="field-light" placeholder="Nom prospect ou vague, ex. Syndics FDF" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="field-light" value={form.segment} onChange={(event) => setForm({ ...form, segment: event.target.value as ProspectSegment })}>
                {prospectSegments.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select className="field-light" value={form.zone} onChange={(event) => setForm({ ...form, zone: event.target.value })}>
                {martiniqueZones.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="field-light" placeholder="E-mail" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              <input className="field-light" placeholder="Telephone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="field-light" value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value as ProspectChannel })}>
                {prospectChannels.map((item) => <option key={item}>{item}</option>)}
              </select>
              <input className="field-light" max="10" min="1" type="number" value={form.score} onChange={(event) => setForm({ ...form, score: Number(event.target.value) })} />
            </div>
            <input className="field-light" placeholder="Interlocuteur, ex. responsable travaux" value={form.contactName} onChange={(event) => setForm({ ...form, contactName: event.target.value })} />
            <textarea className="field-light min-h-24" placeholder="Besoin identifie" value={form.need} onChange={(event) => setForm({ ...form, need: event.target.value })} />
            <textarea className="field-light min-h-24" placeholder="Source, prochaine action, notes" value={form.nextAction} onChange={(event) => setForm({ ...form, nextAction: event.target.value })} />
            <button className="cta-primary w-full" onClick={addProspect} type="button">
              <Plus className="size-4" />
              Ajouter au pipeline
            </button>
          </div>
        </div>

        <div className="surface-panel px-6 py-6 sm:px-8">
          <SectionHeading
            eyebrow="Segments prets"
            title="10 angles de prospection a lancer."
            description="Cliquez sur un segment pour creer une vague preconfiguree, puis ajoutez les contacts reels au fur et a mesure."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {globalProspectTemplates.map((template) => (
              <button
                className="rounded-[1.35rem] border border-[#1398db]/12 bg-white p-4 text-left shadow-[0_12px_30px_rgba(19,122,186,0.06)] transition hover:-translate-y-0.5 hover:border-[#1398db]/28"
                key={template.id}
                onClick={() => seedFromTemplate(template.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]">{template.segment}</p>
                    <h3 className="mt-2 font-semibold leading-6 text-black">{template.title}</h3>
                  </div>
                  <span className="rounded-full bg-[#eef8ff] px-3 py-1 text-xs font-semibold text-[#0f6ea7]">{template.score}/10</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-black/62">{template.firstAction}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {notice ? (
        <section className="rounded-[1.35rem] border border-emerald-300/40 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          {notice}
        </section>
      ) : null}

      <section className="surface-panel px-6 py-6 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.5fr_0.5fr_auto] lg:items-end">
          <label className="text-sm font-semibold text-black/70">
            Recherche globale
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/35" />
              <input className="field-light pl-11" placeholder="Nom, commune, besoin, telephone..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
          </label>
          <label className="text-sm font-semibold text-black/70">
            Segment
            <select className="field-light mt-3" value={segment} onChange={(event) => setSegment(event.target.value as ProspectSegment | 'Tous')}>
              <option>Tous</option>
              {prospectSegments.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-black/70">
            Statut
            <select className="field-light mt-3" value={status} onChange={(event) => setStatus(event.target.value as ProspectStatus | 'Tous')}>
              <option>Tous</option>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <button className="cta-secondary" onClick={exportCsv} type="button">
            <Download className="size-4" />
            Export CSV
          </button>
        </div>
      </section>

      <section className="grid gap-4">
        {filteredProspects.map((prospect) => {
          const emailBody = buildEmailBody(prospect)
          const whatsappText = buildWhatsAppUrl(emailBody)
          const callScript = buildCallScript(prospect)

          return (
            <article className="surface-panel px-5 py-5 sm:px-6" key={prospect.id}>
              <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag">{prospect.segment}</span>
                    <span className="micro-badge">{prospect.zone}</span>
                    <span className="micro-badge">Score {prospect.score}/10</span>
                    <span className="micro-badge">{prospect.status}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight text-black">{prospect.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/64">{prospect.need || 'Besoin a qualifier.'}</p>
                  </div>
                  <div className="grid gap-3 text-sm text-black/68 md:grid-cols-2">
                    <p><strong>Contact :</strong> {prospect.contactName || 'a identifier'}</p>
                    <p><strong>Source :</strong> {prospect.source || 'a renseigner'}</p>
                    <p><strong>Email :</strong> {prospect.email ? <a className="text-[#0f6ea7]" href={`mailto:${prospect.email}`}>{prospect.email}</a> : 'a trouver'}</p>
                    <p><strong>Tel :</strong> {prospect.phone ? <a className="text-[#0f6ea7]" href={`tel:${prospect.phone}`}>{prospect.phone}</a> : 'a trouver'}</p>
                    <p className="md:col-span-2"><strong>Prochaine action :</strong> {prospect.nextAction || 'Qualifier le contact et envoyer la presentation GIB.'}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <select className="field-light" value={prospect.status} onChange={(event) => updateStatus(prospect.id, event.target.value as ProspectStatus)}>
                    {statuses.map((item) => <option key={item}>{item}</option>)}
                  </select>
                  {prospect.phone ? (
                    <a className="cta-primary w-full" href={`tel:${prospect.phone}`}>
                      <PhoneCall className="size-4" />
                      Appeler
                    </a>
                  ) : (
                    <a className="cta-primary w-full" href={`tel:${company.commercial_phone_international}`}>
                      <PhoneCall className="size-4" />
                      Appeler GIB
                    </a>
                  )}
                  <a className="cta-whatsapp w-full" href={whatsappText} rel="noreferrer" target="_blank">
                    <MessageCircle className="size-4" />
                    Message WhatsApp
                  </a>
                  {prospect.email ? (
                    <a className="cta-secondary w-full" href={`mailto:${prospect.email}?subject=${encodeURIComponent('Presentation GIB Menuiseries Services')}&body=${encodeURIComponent(emailBody)}`}>
                      <Mail className="size-4" />
                      E-mail
                    </a>
                  ) : null}
                  <button className="cta-secondary w-full" onClick={() => copyText(emailBody, `Message copie pour ${prospect.name}.`)} type="button">
                    <Copy className="size-4" />
                    Copier message
                  </button>
                  <button className="cta-secondary w-full" onClick={() => copyText(callScript, `Script appel copie pour ${prospect.name}.`)} type="button">
                    <Copy className="size-4" />
                    Script appel
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: 'J+0',
            text: 'Envoyer presentation + flyer + lien realisations. Marquer Contacte.',
            Icon: CalendarClock,
          },
          {
            title: 'J+1',
            text: 'Appeler ou WhatsApp court : verifier reception et demander le bon interlocuteur.',
            Icon: PhoneCall,
          },
          {
            title: 'J+3/J+7',
            text: 'Relancer avec une preuve : chantier, offre securite maison, devis photo + dimensions.',
            Icon: CheckCircle2,
          },
        ].map(({ title, text, Icon }) => (
          <div className="process-step" key={title}>
            <Icon className="size-6 text-[#1398db]" />
            <h3 className="mt-4 text-xl font-semibold text-black">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-black/64">{text}</p>
          </div>
        ))}
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Controle qualite</span>
            <h2 className="section-title mt-3 text-white">Ne jamais envoyer a l aveugle.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              Verifier la source, le bon interlocuteur, le consentement implicite B2B ou le canal officiel, puis tracer STOP et les relances dans ce pipeline.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="cta-primary" to="/prospection-locale">
              <Target className="size-4" />
              AO geolocalises
            </Link>
            <Link className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" to="/admin-appels-offres">
              <BarChart3 className="size-4" />
              Tableau AO
            </Link>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <ExternalLink className="size-4" />
              WhatsApp GIB
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
