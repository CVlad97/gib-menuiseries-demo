import { useEffect, useMemo, useState } from 'react'
import { Copy, Crosshair, ExternalLink, FileDown, MapPin, MessageCircle, Navigation, PhoneCall, PlusCircle, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { buildWhatsAppUrl, company } from '../lib/content'
import { listTenders, saveTender, type TenderOpportunity } from '../lib/storage'

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
}

interface BoampTenderFeed {
  generatedAt: string
  count: number
  items: BoampTenderItem[]
}

interface LatLng {
  lat: number
  lng: number
  label: string
}

const ducosFallback: LatLng = {
  lat: 14.5753,
  lng: -60.9747,
  label: 'Ducos / GIB',
}

const communeCoordinates: Array<LatLng & { aliases: string[] }> = [
  { label: 'Fort-de-France', lat: 14.6161, lng: -61.0588, aliases: ['fort-de-france', 'fort de france', 'fdf'] },
  { label: 'Le Lamentin', lat: 14.6139, lng: -60.9996, aliases: ['lamentin', 'le lamentin'] },
  { label: 'Ducos', lat: 14.5753, lng: -60.9747, aliases: ['ducos'] },
  { label: 'Gros-Morne', lat: 14.7007, lng: -61.0072, aliases: ['gros morne', 'gros-morne'] },
  { label: 'Le Robert', lat: 14.6777, lng: -60.9392, aliases: ['robert', 'le robert'] },
  { label: 'Le Francois', lat: 14.6153, lng: -60.9031, aliases: ['francois', 'françois', 'le francois', 'le françois'] },
  { label: 'Riviere-Salee', lat: 14.5318, lng: -60.9817, aliases: ['riviere-salee', 'rivière-salée', 'riviere salee'] },
  { label: 'Schoelcher', lat: 14.6167, lng: -61.1014, aliases: ['schoelcher', 'schœlcher'] },
  { label: 'Saint-Joseph', lat: 14.6686, lng: -61.0396, aliases: ['saint-joseph', 'saint joseph'] },
  { label: 'Le Marin', lat: 14.4722, lng: -60.8697, aliases: ['marin', 'le marin'] },
  { label: 'Sainte-Luce', lat: 14.4672, lng: -60.9276, aliases: ['sainte-luce', 'sainte luce'] },
  { label: 'Les Trois-Ilets', lat: 14.5398, lng: -61.0343, aliases: ['trois-ilets', 'trois ilets', 'les trois-ilets'] },
  { label: 'Trinite', lat: 14.7381, lng: -60.9631, aliases: ['trinite', 'trinité', 'la trinite'] },
  { label: 'Saint-Pierre', lat: 14.7431, lng: -61.1757, aliases: ['saint-pierre', 'saint pierre'] },
]

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function inferLocation(item: Pick<BoampTenderItem, 'object' | 'organism' | 'notes'>): LatLng {
  const text = normalizeText(`${item.object} ${item.organism} ${item.notes}`)
  const found = communeCoordinates.find((commune) => commune.aliases.some((alias) => text.includes(normalizeText(alias))))

  return found ?? ducosFallback
}

function distanceKm(a: LatLng, b: LatLng) {
  const earthRadius = 6371
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2

  return 2 * earthRadius * Math.asin(Math.sqrt(h))
}

function prospectScore(item: BoampTenderItem, distance: number) {
  const distanceBonus = distance <= 8 ? 3 : distance <= 18 ? 2 : distance <= 35 ? 1 : 0
  const deadlineBonus = item.deadline && new Date(item.deadline) > new Date() ? 1 : 0

  return Math.min(10, item.score + distanceBonus + deadlineBonus)
}

function buildProspectWhatsApp(item: BoampTenderItem, distance: number, finalScore: number) {
  return buildWhatsAppUrl(
    [
      'Prospect AO prioritaire pour GIB',
      `Organisme : ${item.organism}`,
      `Objet : ${item.object}`,
      `Distance estimee : ${distance.toFixed(1)} km`,
      `Score prospection : ${finalScore}/10`,
      `Date limite : ${item.deadline || 'a verifier'}`,
      `Lien : ${item.url}`,
      'Action : verifier le DCE, identifier le lot menuiserie/fermeture et decider go/no-go.',
    ].join('\n'),
  )
}

function buildContactScript(item: BoampTenderItem) {
  return [
    `Bonjour, je vous contacte pour GIB Menuiseries Services, entreprise basee a Ducos en Martinique.`,
    `Nous avons repere votre consultation : ${item.object}.`,
    `Nous souhaitons verifier si un lot concerne les menuiseries, fermetures, portails, volets, clotures, garde-corps ou amenagements exterieurs.`,
    `Pouvez-vous nous confirmer le profil acheteur ou le lien DCE a utiliser pour consulter les pieces officielles ?`,
    `Merci, nous passerons uniquement par la procedure prevue dans le reglement de consultation.`,
  ].join('\n')
}

function buildMapsUrl(origin: LatLng, destination: LatLng) {
  const params = new URLSearchParams({
    api: '1',
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    travelmode: 'driving',
  })

  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function ProspectingAppPage() {
  const [feed, setFeed] = useState<BoampTenderFeed | null>(null)
  const [position, setPosition] = useState<LatLng>(ducosFallback)
  const [geoStatus, setGeoStatus] = useState('Position par defaut : Ducos.')
  const [importStatus, setImportStatus] = useState('')
  const [radiusKm, setRadiusKm] = useState(35)
  const [minScore, setMinScore] = useState(6)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch(withBase('data/gib/boamp-tenders.json'), { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Flux BOAMP indisponible (${response.status})`)))
      .then((data: BoampTenderFeed) => setFeed(data))
      .catch((error: Error) => setGeoStatus(error.message))
  }, [])

  const rankedProspects = useMemo(() => {
    const normalizedQuery = normalizeText(query)

    return (feed?.items ?? [])
      .map((item) => {
        const inferred = inferLocation(item)
        const distance = distanceKm(position, inferred)
        const finalScore = prospectScore(item, distance)

        return {
          item,
          inferred,
          distance,
          finalScore,
        }
      })
      .filter(({ item, distance, finalScore }) => {
        const haystack = normalizeText(`${item.organism} ${item.object} ${item.lot} ${item.notes}`)
        const queryMatch = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

        return distance <= radiusKm && finalScore >= minScore && queryMatch
      })
      .sort((a, b) => b.finalScore - a.finalScore || a.distance - b.distance)
      .slice(0, 24)
  }, [feed, minScore, position, query, radiusKm])

  function locateMe() {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocalisation navigateur indisponible. Position Ducos conservee.')
      return
    }

    setGeoStatus('Recherche de votre position...')
    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
          label: 'Ma position actuelle',
        })
        setGeoStatus(`Position detectee avec precision ${Math.round(result.coords.accuracy)} m.`)
      },
      () => setGeoStatus('Position refusee ou indisponible. Position Ducos conservee.'),
      { enableHighAccuracy: true, maximumAge: 300000, timeout: 10000 },
    )
  }

  function importProspect(item: BoampTenderItem) {
    const existing = listTenders()
    if (existing.some((tender) => tender.url === item.url)) {
      setImportStatus('Deja present dans le tableau AO.')
      return
    }

    saveTender({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'qualified',
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
      notes: item.notes,
    })
    setImportStatus(`${item.organism} importe dans le tableau AO.`)
  }

  async function copyContactScript(item: BoampTenderItem) {
    const script = buildContactScript(item)

    if (!navigator.clipboard) {
      setImportStatus(script)
      return
    }

    await navigator.clipboard.writeText(script)
    setImportStatus(`Script de contact copie pour ${item.organism}.`)
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          action={
            <div className="flex flex-wrap gap-3">
              <button className="cta-primary" onClick={locateMe} type="button">
                <Crosshair className="size-4" />
                Me geolocaliser
              </button>
              <Link className="cta-secondary" to="/admin-appels-offres">
                <FileDown className="size-4" />
                Tableau AO
              </Link>
            </div>
          }
          description="Classe les opportunites BOAMP Martinique selon votre position, la distance estimee, le score metier GIB et la date limite. Aucun tracking externe, aucune cle API."
          eyebrow="Prospection locale"
          light
          title="Trouver les appels d offres les plus proches et les plus utiles."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Flux BOAMP</p>
          <p className="mt-3 text-3xl font-semibold text-white">{feed?.count ?? 0}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Position</p>
          <p className="mt-3 text-lg font-semibold text-white">{position.label}</p>
          <p className="mt-2 text-xs text-white/58">{geoStatus}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Top prospects</p>
          <p className="mt-3 text-3xl font-semibold text-white">{rankedProspects.length}</p>
        </div>
      </section>

      <section className="surface-panel px-6 py-6 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.7fr_0.7fr] lg:items-end">
          <label className="text-sm font-semibold text-black/70">
            Recherche organisme / objet / lot
            <input
              className="field-light mt-3"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex. cloture, SEMSAMAR, Lamentin..."
              value={query}
            />
          </label>
          <label className="text-sm font-semibold text-black/70">
            Rayon {radiusKm} km
            <input
              className="mt-4 w-full accent-[#1398db]"
              max="80"
              min="5"
              onChange={(event) => setRadiusKm(Number(event.target.value))}
              step="5"
              type="range"
              value={radiusKm}
            />
          </label>
          <label className="text-sm font-semibold text-black/70">
            Score min. {minScore}/10
            <input
              className="mt-4 w-full accent-[#1398db]"
              max="10"
              min="1"
              onChange={(event) => setMinScore(Number(event.target.value))}
              type="range"
              value={minScore}
            />
          </label>
        </div>
      </section>

      {importStatus ? (
        <section className="rounded-[1.35rem] border border-emerald-300/40 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          {importStatus}
        </section>
      ) : null}

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Priorites terrain"
          title="Premiers organismes a travailler."
          description="La distance est estimee a partir des communes reperees dans l annonce. Si aucune commune n est detectee, l opportunite reste rattachee a Ducos par prudence."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {rankedProspects.map(({ item, inferred, distance, finalScore }) => (
            <article key={`${item.sourceId}-${item.url}`} className="rounded-[1.6rem] border border-[#1398db]/12 bg-white p-5 shadow-[0_14px_36px_rgba(19,122,186,0.06)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag !bg-[#eef8ff] !text-[#0f6ea7]">Score {finalScore}/10</span>
                    <span className="rounded-full bg-[#f5eee1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a671c]">
                      {distance.toFixed(1)} km
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-black">{item.organism}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/68">{item.object}</p>
                  </div>
                  <div className="grid gap-3 text-sm text-black/68 sm:grid-cols-2">
                    <p className="inline-flex items-center gap-2"><MapPin className="size-4 text-[#1398db]" /> {inferred.label}</p>
                    <p className="inline-flex items-center gap-2"><Navigation className="size-4 text-[#1398db]" /> Deadline : {item.deadline || 'a verifier'}</p>
                    <p className="sm:col-span-2 text-black/58">Script : verifier le DCE, identifier le lot utile, contacter uniquement via le canal prevu.</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3 md:w-52">
                  <button className="cta-primary w-full" onClick={() => importProspect(item)} type="button">
                    <PlusCircle className="size-4" />
                    Importer
                  </button>
                  <a className="cta-whatsapp w-full" href={buildProspectWhatsApp(item, distance, finalScore)} rel="noreferrer" target="_blank">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                  <a className="cta-secondary w-full" href={item.url} rel="noreferrer" target="_blank">
                    <ExternalLink className="size-4" />
                    Source
                  </a>
                  <a className="cta-secondary w-full" href={buildMapsUrl(position, inferred)} rel="noreferrer" target="_blank">
                    <Route className="size-4" />
                    Itineraire
                  </a>
                  <button className="cta-secondary w-full" onClick={() => copyContactScript(item)} type="button">
                    <Copy className="size-4" />
                    Copier script
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <span className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Action commerciale</span>
            <h2 className="section-title mt-3 text-white">Objectif : identifier le bon interlocuteur, pas spammer.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              Ouvrez l avis, trouvez le profil acheteur, verifiez le DCE, puis contactez uniquement via les canaux prevus par la consultation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.commercial_phone_international}`}>
              <PhoneCall className="size-4" />
              Appeler GIB
            </a>
            <Link className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" to="/dossier-entreprise">
              Dossier entreprise
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
