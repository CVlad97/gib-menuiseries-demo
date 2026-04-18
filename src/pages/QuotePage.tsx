import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, FileImage, MessageCircle, PhoneCall } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, company, getAssetById, getProductBySlug } from '../lib/content'
import { saveLead } from '../lib/storage'

const projectTypes = ['Habitat principal', 'Renovation', 'Depannage', 'Projet professionnel', 'Copropriete']
const contexts = ['Neuf', 'Renovation', 'Remplacement', 'Besoin de conseil']

export function QuotePage() {
  const [searchParams] = useSearchParams()
  const requestedProduct = searchParams.get('product') ?? ''
  const requestedAsset = searchParams.get('asset') ?? ''

  const product = getProductBySlug(requestedProduct)
  const asset = getAssetById(requestedAsset)
  const category = product?.category ?? asset?.category ?? 'renovation'
  const meta = categoryMeta[category]
  const defaultTypeProjet = projectTypes[0]
  const defaultProduit = product?.name ?? asset?.product_type.replaceAll('-', ' ') ?? ''
  const defaultContexte = contexts[1]

  const [status, setStatus] = useState<'idle' | 'saved'>('idle')
  const [typeProjet, setTypeProjet] = useState(defaultTypeProjet)
  const [produit, setProduit] = useState(defaultProduit)
  const [contact, setContact] = useState('')
  const [commune, setCommune] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [contexte, setContexte] = useState(defaultContexte)
  const [commentaire, setCommentaire] = useState('')
  const [photos, setPhotos] = useState<string[]>([])

  const summaryTitle = useMemo(() => {
    if (asset) {
      return asset.title
    }
    if (product) {
      return product.name
    }
    return 'Projet sur mesure'
  }, [asset, product])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    saveLead({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'new',
      typeProjet,
      produit,
      contact,
      commune,
      dimensions,
      contexte,
      commentaire,
      photos,
    })

    setStatus('saved')
    setTypeProjet(defaultTypeProjet)
    setProduit(defaultProduit)
    setContact('')
    setCommune('')
    setDimensions('')
    setContexte(defaultContexte)
    setCommentaire('')
    setPhotos([])
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Demande de devis"
          title="Un formulaire de devis simple, rassurant et plus proche du terrain."
          description="On cadre le type de projet, la commune, les dimensions approximatives et les photos. Aucun prix public ferme n est affiche : le but est de qualifier avant chiffrage, remplacement, reglage ou depannage."
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="glass-panel overflow-hidden">
          <MediaImage
            alt={asset?.alt_text ?? summaryTitle}
            className="aspect-[4/3] overflow-hidden"
            fallbackSrc={meta.fallback}
            imgClassName="h-full w-full object-cover"
            src={asset?.image_url ?? meta.fallback}
          />
          <div className="space-y-4 p-6">
            <span className="eyebrow">Reference selectionnee</span>
            <h2 className="text-2xl font-semibold text-white">{summaryTitle}</h2>
            <p className="text-sm leading-7 text-white/72">
              {product?.summary ?? 'Projet a qualifier avec visuels, dimensions, commune et contraintes terrain.'}
            </p>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
              <p className="font-semibold text-white">Comment aller plus vite</p>
              <p className="mt-3">
                Envoyez les photos, la commune, les dimensions approximatives et le besoin principal.
                GIB peut ensuite cadrer l etude, le depannage, le remplacement, le reglage ou la prochaine action.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-[color:var(--line-strong)] bg-[color:var(--gold-soft)]/40 p-5 text-sm text-white/74">
              <p className="font-semibold text-white">Aucun prix public ferme</p>
              <p className="mt-3">
                La logique reste volontairement simple : qualification, photos, projection,
                puis devis adapte au vrai chantier.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
              <p className="font-semibold text-white">Besoin connexe</p>
              <p className="mt-3">
                Si la situation releve aussi d un diagnostic immobilier ou d une orientation complementaire, la demande peut etre requalifiee sans casser le parcours principal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="cta-whatsapp w-full" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                Basculer vers WhatsApp
              </a>
              <a className="cta-secondary w-full" href={`tel:${company.phone_international}`}>
                <PhoneCall className="size-4" />
                Appeler directement
              </a>
            </div>
          </div>
        </aside>

        <form className="glass-panel-strong px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Type de projet</p>
              <select className="field mt-3" onChange={(event) => setTypeProjet(event.target.value)} value={typeProjet}>
                {projectTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Produit</p>
              <input className="field mt-3" onChange={(event) => setProduit(event.target.value)} placeholder="Portail, baie vitree, pergola, renovation..." value={produit} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commune</p>
              <input className="field mt-3" onChange={(event) => setCommune(event.target.value)} placeholder="Ducos, Fort-de-France, Le Lamentin..." value={commune} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Contact rapide</p>
              <input className="field mt-3" onChange={(event) => setContact(event.target.value)} placeholder="Telephone, email ou WhatsApp" value={contact} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Dimensions approximatives</p>
              <input className="field mt-3" onChange={(event) => setDimensions(event.target.value)} placeholder="Ex. 3 m x 2,2 m" value={dimensions} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Contexte</p>
              <select className="field mt-3" onChange={(event) => setContexte(event.target.value)} value={contexte}>
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
                <span>{photos.length > 0 ? `${photos.length} fichier(s) selectionne(s)` : 'Joindre des photos du chantier ou de l existant'}</span>
                <input
                  className="hidden"
                  multiple
                  onChange={(event) => setPhotos(Array.from(event.target.files ?? []).map((file) => file.name))}
                  type="file"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commentaire</p>
            <textarea
              className="field mt-3 min-h-36"
              onChange={(event) => setCommentaire(event.target.value)}
              placeholder="Precisez le besoin, l urgence, les contraintes, l exposition, le style recherche ou le probleme a resoudre."
              value={commentaire}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="cta-primary w-full sm:w-auto" type="submit">
              Enregistrer la demande
            </button>
            <a className="cta-whatsapp w-full sm:w-auto" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              Envoyer sur WhatsApp
            </a>
            <a className="cta-secondary w-full sm:w-auto" href={`mailto:${company.email}`}>
              Envoyer par email
            </a>
          </div>

          {status === 'saved' ? (
            <div className="mt-6 rounded-[1.5rem] border border-emerald-500/18 bg-emerald-500/10 px-5 py-4 text-sm text-white/88">
              <p className="inline-flex items-center gap-2 font-semibold text-emerald-100">
                <CheckCircle2 className="size-4" />
                Demande sauvegardee localement dans le navigateur.
              </p>
              <p className="mt-2 text-white/72">
                La demande est enregistree localement pour la demonstration du parcours. En production, elle pourra etre reliee a un suivi commercial ou a un stockage centralise.
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}
