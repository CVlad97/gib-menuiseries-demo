import { useEffect, useState } from 'react'
import { AlertTriangle, BarChart3, CheckCircle2, Clock3, ExternalLink, PhoneCall, ShieldCheck, Target } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { company } from '../lib/content'

interface WarRoomData {
  generatedAt: string
  mission: string
  proof: Record<string, number>
  moneyHypothesis: Array<{
    lever: string
    why: string
    expectedOutcome: string
    priority: number
  }>
  next24h: Array<{
    window: string
    action: string
    proofData: string
    owner: string
    status: string
  }>
  tenderActions: Array<{
    reference: string
    organism: string
    deadline: string
    daysUntilDeadline: number | null
    score: number
    type: string
    phone: string
    email: string
    action: string
  }>
  rules: string[]
}

const proofLabels: Record<string, string> = {
  openTenderActions: 'AO ouverts',
  urgentTenderActions: 'AO urgents',
  emailReadyTenderActions: 'AO avec e-mail',
  phoneReadyTenderActions: 'AO avec tel',
  qualifiedProspectsSeeded: 'Contacts pros',
  qualifiedPhonesSeeded: 'Numeros pros',
  qualifiedEmailsSeeded: 'E-mails pros',
  privateFieldZonesReady: 'Zones terrain',
  instagramReelsReady: 'Reels prets',
  emailsAlreadySent: 'E-mails envoyes',
  qualifiedReplies: 'Reponses qualifiees',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function WarRoom24hPage() {
  const [data, setData] = useState<WarRoomData | null>(null)
  const [notice, setNotice] = useState('Chargement du cockpit 24h...')

  useEffect(() => {
    fetch(withBase('data/gib/war-room-24h.json'), { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Cockpit indisponible (${response.status})`)))
      .then((payload: WarRoomData) => {
        setData(payload)
        setNotice(`Cockpit mis a jour : ${formatDate(payload.generatedAt)}`)
      })
      .catch((error: Error) => setNotice(error.message))
  }, [])

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr] lg:items-center">
          <SectionHeading
            description="Cockpit d execution base sur les donnees disponibles : appels d offres ouverts, contacts qualifies, zones terrain, Reels, e-mails envoyes et reponses recues."
            eyebrow="War room 24h"
            light
            title="Objectif : transformer les donnees GIB en rendez-vous et devis."
          />
          <div className="rounded-[1.6rem] border border-white/16 bg-white/12 p-5 text-white">
            <p className="text-sm font-semibold">{notice}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Regle business : pousser les dossiers a forte probabilite maintenant, classer les faibles rapidement, ne jamais perdre une heure sur un dossier non compatible.
            </p>
            <a className="cta-whatsapp mt-5" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <PhoneCall className="size-4" />
              WhatsApp Vladimir
            </a>
          </div>
        </div>
      </section>

      {data ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(data.proof).map(([key, value]) => (
              <div className="surface-panel px-5 py-5" key={key}>
                <p className="text-xs uppercase tracking-[0.22em] text-black/45">{proofLabels[key] ?? key}</p>
                <p className="mt-3 text-3xl font-semibold text-black">{value}</p>
              </div>
            ))}
          </section>

          <section className="surface-panel px-6 py-6 sm:px-8">
            <SectionHeading
              eyebrow="Argent"
              title="Les leviers qui peuvent rapporter le plus vite."
              description="Priorisation par probabilite, valeur potentielle et vitesse d execution."
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {data.moneyHypothesis.map((item) => (
                <article className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-5" key={item.lever}>
                  <div className="flex items-center justify-between gap-3">
                    <Target className="size-5 text-[#1398db]" />
                    <span className="micro-badge">Priorite {item.priority}/10</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-black">{item.lever}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/64">{item.why}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#173f35]">{item.expectedOutcome}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-panel px-6 py-6 sm:px-8">
            <SectionHeading
              eyebrow="Execution"
              title="Plan d attaque sur 24h."
              description="Chaque action doit produire une preuve : appel fait, DCE ouvert, rendez-vous demande, no-go classe ou relance programmee."
            />
            <div className="mt-6 grid gap-4">
              {data.next24h.map((item) => (
                <article className="rounded-[1.25rem] border border-black/8 bg-white p-5 shadow-[0_12px_28px_rgba(17,34,51,0.06)]" key={item.window}>
                  <div className="grid gap-4 lg:grid-cols-[120px_1fr_220px] lg:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#0f6ea7]">{item.window}</p>
                      <p className="mt-2 text-sm font-semibold text-black/58">{item.owner}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{item.action}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/62">{item.proofData}</p>
                    </div>
                    <span className={`micro-badge justify-center ${item.status === 'ready' ? '!bg-emerald-50 !text-emerald-700' : ''}`}>
                      {item.status === 'ready' ? 'Pret' : 'A faire'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
            <div className="surface-panel px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="size-5 text-[#1398db]" />
                <h2 className="text-xl font-semibold text-black">AO a arbitrer</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {data.tenderActions.map((item) => (
                  <article className="rounded-[1.2rem] border border-black/8 bg-white p-4" key={item.reference}>
                    <div className="flex flex-wrap gap-2">
                      <span className="tag">{item.reference}</span>
                      <span className="micro-badge">J{item.daysUntilDeadline}</span>
                      <span className="micro-badge">Score {item.score}/10</span>
                    </div>
                    <h3 className="mt-3 font-semibold text-black">{item.organism}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/64">{item.action}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      {item.phone ? <a className="cta-secondary !px-4 !py-2" href={`tel:${item.phone}`}>Appeler</a> : null}
                      {item.email ? <a className="cta-secondary !px-4 !py-2" href={`mailto:${item.email}`}>E-mail</a> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-panel px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-[#1398db]" />
                <h2 className="text-xl font-semibold text-black">Garde-fous</h2>
              </div>
              <div className="mt-5 space-y-3">
                {data.rules.map((rule) => (
                  <p className="flex gap-3 rounded-[1.1rem] border border-[#1398db]/10 bg-white p-4 text-sm leading-6 text-black/68" key={rule}>
                    {rule.includes('Ne pas') ? <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />}
                    {rule}
                  </p>
                ))}
              </div>
              <a className="cta-primary mt-5 w-full" href={withBase('data/gib/war-room-24h.json')} rel="noreferrer" target="_blank">
                <ExternalLink className="size-4" />
                Voir les donnees
              </a>
            </div>
          </section>
        </>
      ) : (
        <section className="surface-panel px-6 py-6 text-sm text-black/62">
          <Clock3 className="mb-3 size-5 text-[#1398db]" />
          {notice}
        </section>
      )}
    </div>
  )
}
