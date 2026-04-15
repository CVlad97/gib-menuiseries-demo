import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { CheckCircle2, ImagePlus, Sparkles } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, getAssetById, getAssetsByProduct, products } from '../lib/content'
import { saveSimulation } from '../lib/storage'

export function SimulationPage() {
  const [searchParams] = useSearchParams()
  const requestedProduct = searchParams.get('product') ?? products[0]?.slug ?? ''

  const [productSlug, setProductSlug] = useState(requestedProduct)
  const [ambiance, setAmbiance] = useState('clair')
  const [notes, setNotes] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | undefined>()
  const [saved, setSaved] = useState(false)

  const product = useMemo(
    () => products.find((item) => item.slug === productSlug) ?? products[0],
    [productSlug],
  )

  const productAssets = getAssetsByProduct(product.slug)
  const referenceAsset = getAssetById(product.hero_asset_id) ?? productAssets[0]
  const meta = categoryMeta[product.category]

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
  }

  function handleSave() {
    saveSimulation({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'draft',
      produit: product.slug,
      ambiance,
      notes,
      imagePreview: previewUrl,
    })
    setSaved(true)
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          description="La simulation reste volontairement legere : upload d une photo, choix produit, ambiance et note non contractuelle. L objectif est de qualifier vite sans promettre un rendu definitif ni un prix public ferme."
          eyebrow="Simulation demonstrable"
          light
          title="Projeter un futur ouvrage sans introduire de dependance backend."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Produit</p>
              <select className="field-light mt-3" onChange={(event) => setProductSlug(event.target.value)} value={productSlug}>
                {products.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Ambiance</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['clair', 'contraste', 'tropical'].map((item) => (
                  <button
                    key={item}
                    className={`chip-button ${ambiance === item ? 'chip-button-active' : ''}`}
                    onClick={() => setAmbiance(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Photo du client</p>
              <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-black/12 bg-black/[0.03] px-4 py-8 text-center text-sm text-black/60">
                <ImagePlus className="size-6 text-[#b98e45]" />
                <span className="mt-3 font-medium text-black">Importer une photo facade ou terrasse</span>
                <span className="mt-2">Sinon la simulation utilise un asset GIB comme fallback.</span>
                <input className="hidden" onChange={handleUpload} type="file" accept="image/*" />
              </label>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Note terrain</p>
              <textarea
                className="field-light mt-3 min-h-32"
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Contraintes, dimensions approximatives, commune, style recherche..."
                value={notes}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="cta-primary" onClick={handleSave} type="button">
                <Sparkles className="size-4" />
                Enregistrer la simulation
              </button>
              <Link className="cta-secondary" to={`/devis?product=${product.slug}`}>
                Passer au devis
              </Link>
            </div>
            {saved ? (
              <div className="rounded-[1.4rem] border border-emerald-500/18 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="size-4" />
                  Simulation sauvegardee localement dans le navigateur.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="relative min-h-[520px]">
            {previewUrl ? (
              <img alt="Simulation utilisateur" className="h-full min-h-[520px] w-full object-cover" src={previewUrl} />
            ) : (
              <MediaImage
                alt={referenceAsset?.alt_text ?? product.name}
                className="h-full min-h-[520px]"
                fallbackSrc={meta.fallback}
                imgClassName="h-full w-full object-cover"
                src={referenceAsset?.image_url ?? meta.fallback}
              />
            )}
            <div
              className={`absolute inset-0 ${
                ambiance === 'clair'
                  ? 'bg-white/6'
                  : ambiance === 'contraste'
                    ? 'bg-black/24'
                    : 'bg-emerald-500/12'
              }`}
            />
            <div className="absolute inset-x-6 top-6 rounded-[1.7rem] border border-white/14 bg-black/35 px-5 py-4 backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">{meta.label}</span>
                <span className="tag bg-white/10">simulation non contractuelle</span>
              </div>
              <h2 className="mt-4 text-3xl text-white" style={{ fontFamily: 'Marcellus, serif' }}>
                {product.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/74">{product.summary}</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="rounded-[1.6rem] border border-white/14 bg-black/40 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.24em] text-white/48">Projection</p>
                <p className="mt-2 text-sm leading-7 text-white/78">
                  {notes || 'Ajoute une note terrain pour contextualiser la simulation avant le devis.'}
                </p>
              </div>
              <Link className="cta-primary self-end" to={`/devis?product=${product.slug}`}>
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
