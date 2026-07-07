import { CheckCircle2, FileImage, Loader2, MessageCircle, PhoneCall, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { buildProjectWhatsAppMessage, buildWhatsAppUrl, company } from '../lib/content'
import { saveLead } from '../lib/storage'

const projectTypes = [
  'Habitat principal',
  'Renovation',
  'Depannage',
  'Projet professionnel',
  'Copropriete',
]

const contexts = ['Neuf', 'Renovation', 'Remplacement', 'Besoin de conseil']

const communes = [
  'Ducos',
  'Fort-de-France',
  'Le Lamentin',
  'Le Robert',
  'Schoelcher',
  'Riviere-Salee',
  'Saint-Joseph',
  'Le Francois',
  'Sainte-Luce',
  'Sainte-Anne',
  'Le Marin',
  'Les Trois-Ilets',
  'Gros-Morne',
  'Riviere-Pilote',
  'Saint-Pierre',
  'Case-Pilote',
  'Le Vauclin',
  'Autre commune',
]

interface QuoteFormProps {
  summaryTitle: string
  summaryDescription: string
  heroImageSrc: string
  heroImageAlt: string
  initialProduit: string
}

interface QuoteSnapshot {
  typeProjet: string
  produit: string
  contact: string
  commune: string
  dimensions: string
  contexte: string
  commentaire: string
  photos: string[]
}

const defaultProjectType = projectTypes[0]
const defaultContext = contexts[1]
const emptySnapshot: QuoteSnapshot = {
  typeProjet: defaultProjectType,
  produit: '',
  contact: '',
  commune: '',
  dimensions: '',
  contexte: defaultContext,
  commentaire: '',
  photos: [],
}

function buildLeadPayload(snapshot: QuoteSnapshot) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new' as const,
    typeProjet: snapshot.typeProjet,
    produit: snapshot.produit,
    contact: snapshot.contact,
    commune: snapshot.commune,
    dimensions: snapshot.dimensions,
    contexte: snapshot.contexte,
    commentaire: snapshot.commentaire,
    photos: snapshot.photos,
  }
}

export function QuoteForm({
  summaryTitle,
  summaryDescription,
  heroImageSrc,
  heroImageAlt,
  initialProduit,
}: QuoteFormProps) {
  const [snapshot, setSnapshot] = useState<QuoteSnapshot>({
    ...emptySnapshot,
    produit: initialProduit,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [submittedSnapshot, setSubmittedSnapshot] = useState<QuoteSnapshot | null>(null)

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl(
        buildProjectWhatsAppMessage({
          product: snapshot.produit || summaryTitle,
          commune: snapshot.commune,
          dimensions: snapshot.dimensions,
          contexte: snapshot.contexte,
          commentaire: snapshot.commentaire,
          assetTitle: summaryTitle,
          photoCount: snapshot.photos.length,
        }),
      ),
    [snapshot.commentaire, snapshot.commune, snapshot.contexte, snapshot.dimensions, snapshot.photos.length, snapshot.produit, summaryTitle],
  )

  function updateField(key: keyof QuoteSnapshot) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setSnapshot((current) => ({
        ...current,
        [key]: event.target.value,
      }))
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setSnapshot((current) => ({
      ...current,
      photos: Array.from(event.target.files ?? []).map((file) => file.name),
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setStatus('loading')

    const nextSnapshot = snapshot
    const payload = buildLeadPayload(nextSnapshot)

    await new Promise((resolve) => window.setTimeout(resolve, 700))
    saveLead(payload)
    setSubmittedSnapshot(nextSnapshot)
    setStatus('success')
  }

  function resetForm() {
    setSnapshot({
      ...emptySnapshot,
      produit: initialProduit,
    })
    setSubmittedSnapshot(null)
    setStatus('idle')
  }

  if (status === 'success' && submittedSnapshot) {
    return (
      <div className="glass-panel-strong flex h-full flex-col justify-between px-6 py-8 sm:px-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/28 bg-emerald-400/16 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-50">
            <CheckCircle2 className="size-4" />
            Demande enregistree
          </div>
          <h3 className="section-title text-white">Votre demande est bien partie.</h3>
          <p className="max-w-2xl text-sm leading-7 text-white/78">
            Nous avons sauvegarde votre brief localement. Vous pouvez maintenant envoyer les photos et les dimensions par
            WhatsApp pour accelerer le traitement.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">Projet</p>
              <p className="mt-2 font-semibold text-white">{submittedSnapshot.produit || summaryTitle}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{submittedSnapshot.typeProjet}</p>
            </div>
            <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">Zone</p>
              <p className="mt-2 font-semibold text-white">{submittedSnapshot.commune || 'A confirmer'}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{submittedSnapshot.dimensions || 'Dimensions a preciser'}</p>
            </div>
          </div>
          <div className="rounded-[1.35rem] border border-white/18 bg-white/10 p-4 text-sm leading-7 text-white/78">
            <p className="font-semibold text-white">Reassurance locale</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Artisans depuis 20 ans</span>
              <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Certifie RGE</span>
              <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Garantie decennale a confirmer</span>
              <span className="contact-pill !border-white/12 !bg-white/10 !text-white">
                Antilles: contraintes cycloniques et salines
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a className="cta-whatsapp w-full sm:w-auto" href={whatsappUrl} rel="noreferrer" target="_blank">
            <MessageCircle className="size-4" />
            Ouvrir WhatsApp
          </a>
          <a className="cta-secondary w-full sm:w-auto" href={`tel:${company.phone_international}`}>
            <PhoneCall className="size-4" />
            Appeler
          </a>
          <a className="cta-secondary w-full sm:w-auto" href={`mailto:${company.email}`}>
            Envoyer un e-mail
          </a>
          <button className="cta-primary w-full sm:w-auto" onClick={resetForm} type="button">
            <RotateCcw className="size-4" />
            Nouvelle demande
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="glass-panel-strong px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
      <div className="rounded-[1.45rem] border border-white/16 bg-white/10 p-5 text-sm leading-7 text-white/78">
        <p className="text-xs uppercase tracking-[0.24em] text-white/48">Validation rapide</p>
        <p className="mt-3">
          Remplissez la demande, puis ouvrez WhatsApp avec vos photos. GIB peut ainsi mieux orienter la solution avant
          le rendez-vous.
        </p>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Type de projet</p>
          <select className="field mt-3" onChange={updateField('typeProjet')} value={snapshot.typeProjet}>
            {projectTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Produit</p>
          <input
            className="field mt-3"
            onChange={updateField('produit')}
            placeholder="Portail, baie vitree, pergola, renovation..."
            value={snapshot.produit}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commune</p>
          <select className="field mt-3" onChange={updateField('commune')} value={snapshot.commune}>
            <option value="">Choisir une commune</option>
            {communes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Contact rapide</p>
          <input
            className="field mt-3"
            onChange={updateField('contact')}
            placeholder="Telephone, email ou WhatsApp"
            value={snapshot.contact}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Dimensions approximatives</p>
          <input
            className="field mt-3"
            onChange={updateField('dimensions')}
            placeholder="Ex. 3 m x 2,2 m"
            value={snapshot.dimensions}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Contexte</p>
          <select className="field mt-3" onChange={updateField('contexte')} value={snapshot.contexte}>
            {contexts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Photos ou captures</p>
          <label className="field mt-3 flex cursor-pointer items-center gap-3">
            <FileImage className="size-4" />
            <span>{snapshot.photos.length > 0 ? `${snapshot.photos.length} fichier(s) selectionne(s)` : 'Joindre des photos du chantier ou de l existant'}</span>
            <input className="hidden" multiple onChange={handleFileChange} type="file" accept="image/*" />
          </label>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commentaire</p>
        <textarea
          className="field mt-3 min-h-36"
          onChange={updateField('commentaire')}
          placeholder="Precisez le besoin, l urgence, les contraintes, l exposition, le style recherche ou le probleme a resoudre."
          value={snapshot.commentaire}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="cta-primary w-full sm:w-auto" disabled={status === 'loading'} type="submit">
          {status === 'loading' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Envoi en cours
            </>
          ) : (
            'Enregistrer la demande'
          )}
        </button>
        <a className="cta-whatsapp w-full sm:w-auto" href={whatsappUrl} rel="noreferrer" target="_blank">
          <MessageCircle className="size-4" />
          Preparer WhatsApp avec photos
        </a>
        <a className="cta-secondary w-full sm:w-auto" href={`mailto:${company.email}`}>
          Envoyer par email
        </a>
      </div>

      <div className="mt-6 rounded-[1.45rem] border border-white/16 bg-white/10 p-5 text-sm leading-7 text-white/76">
        <p className="font-semibold text-white">Mentions locales utiles</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Artisans depuis 20 ans</span>
          <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Certifie RGE</span>
          <span className="contact-pill !border-white/12 !bg-white/10 !text-white">Garantie decennale a confirmer</span>
          <span className="contact-pill !border-white/12 !bg-white/10 !text-white">
            Antilles: contraintes cycloniques et salines
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/68">{summaryDescription}</p>
      <div className="mt-6 rounded-[1.45rem] border border-white/16 bg-white/10 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/48">Piece de reference</p>
        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-white/12">
          <img alt={heroImageAlt} className="aspect-[4/3] w-full object-cover" loading="lazy" src={heroImageSrc} />
        </div>
        <p className="mt-3 text-sm leading-7 text-white/72">
          Si l image ne s affiche pas, le fallback sera utilise automatiquement pour garder la page legere.
        </p>
      </div>
    </form>
  )
}
