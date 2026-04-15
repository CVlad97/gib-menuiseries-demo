import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, FileImage, MessageCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, getAssetById, getProductBySlug } from '../lib/content'
import { saveLead } from '../lib/storage'

const projectTypes = ['Habitat', 'Renovation', 'Depannage', 'Projet professionnel']
const contexts = ['Neuf', 'Renovation', 'Remplacement', 'Besoin de conseil']

export function QuotePage() {
  const [searchParams] = useSearchParams()
  const requestedProduct = searchParams.get('product') ?? ''
  const requestedAsset = searchParams.get('asset') ?? ''

  const product = getProductBySlug(requestedProduct)
  const asset = getAssetById(requestedAsset)
  const category = product?.category ?? asset?.category ?? 'renovation'
  const meta = categoryMeta[category]

  const [status, setStatus] = useState<'idle' | 'saved'>('idle')
  const [typeProjet, setTypeProjet] = useState(projectTypes[0])
  const [produit, setProduit] = useState(product?.name ?? asset?.product_type.replaceAll('-', ' ') ?? '')
  const [contact, setContact] = useState('')
  const [commune, setCommune] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [contexte, setContexte] = useState(contexts[1])
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
    event.currentTarget.reset()
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          description="Le devis reste l issue logique : on qualifie le type de projet, les dimensions, la commune et les contraintes. Pas de prix public ferme sur cette demo."
          eyebrow="Demande de devis"
          title="Un formulaire premium, simple a relancer et sans backend obligatoire."
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
              {product?.summary ?? 'Projet a qualifier avec visuels, dimensions et contexte terrain.'}
            </p>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
              <p className="font-semibold text-white">Cadre commercial</p>
              <p className="mt-3">
                Cette demo peut donner une enveloppe ou un niveau de projet, mais ne publie pas de prix public ferme. L etape suivante reste le devis contextualise.
              </p>
            </div>
            <a className="cta-whatsapp w-full" href="https://wa.me/596696905164?text=Bonjour%20GIB%2C%20je%20souhaite%20vous%20envoyer%20mon%20brief%20pour%20un%20devis." rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              Basculer vers WhatsApp
            </a>
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
              <input className="field mt-3" onChange={(event) => setProduit(event.target.value)} placeholder="Portail, baie vitree, renovation..." value={produit} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Commune</p>
              <input className="field mt-3" onChange={(event) => setCommune(event.target.value)} placeholder="Ducos, Fort-de-France, Le Lamentin..." value={commune} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Contact rapide</p>
              <input className="field mt-3" onChange={(event) => setContact(event.target.value)} placeholder="Telephone, email ou WhatsApp du prospect" value={contact} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Dimensions approximatives</p>
              <input className="field mt-3" onChange={(event) => setDimensions(event.target.value)} placeholder="Ex. 3m x 2,2m" value={dimensions} />
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
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Photos</p>
              <label className="field mt-3 flex cursor-pointer items-center gap-3">
                <FileImage className="size-4" />
                <span>{photos.length > 0 ? `${photos.length} fichier(s) selectionne(s)` : 'Joindre des photos'}</span>
                <input
                  className="hidden"
                  multiple
                  onChange={(event) =>
                    setPhotos(Array.from(event.target.files ?? []).map((file) => file.name))
                  }
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
              placeholder="Expose le besoin, l urgence, les contraintes de pose, les inspirations ou le probleme a traiter."
              value={commentaire}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="cta-primary" type="submit">
              Envoyer la demande demo
            </button>
            <a className="cta-secondary" href="mailto:contact@gibmenuiseries.com">
              Envoyer par email
            </a>
          </div>

          {status === 'saved' ? (
            <div className="mt-6 rounded-[1.5rem] border border-emerald-500/18 bg-emerald-500/10 px-5 py-4 text-sm text-white/88">
              <p className="inline-flex items-center gap-2 font-semibold text-emerald-100">
                <CheckCircle2 className="size-4" />
                Demande sauvegardee localement dans le navigateur.
              </p>
              <p className="mt-2 text-white/72">Cette base peut ensuite etre branchee sur Supabase ou un back-office quand tu voudras sortir du mode statique.</p>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}
