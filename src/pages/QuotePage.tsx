import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { QuoteForm } from '../components/QuoteForm'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, getAssetById, getProductBySlug } from '../lib/content'

export function QuotePage() {
  const [searchParams] = useSearchParams()
  const requestedProduct = searchParams.get('product') ?? ''
  const requestedAsset = searchParams.get('asset') ?? ''

  const product = getProductBySlug(requestedProduct)
  const asset = getAssetById(requestedAsset)
  const category = product?.category ?? asset?.category ?? 'renovation'
  const meta = categoryMeta[category]

  const summaryTitle = useMemo(() => {
    if (asset) {
      return asset.title
    }
    if (product) {
      return product.name
    }
    return 'Projet sur mesure'
  }, [asset, product])

  const summaryDescription = product?.summary ?? 'Projet a qualifier avec visuels, dimensions, commune et contraintes terrain.'
  const heroImageSrc = asset?.image_url ?? meta.fallback
  const heroImageAlt = asset?.alt_text ?? summaryTitle
  const initialProduit = product?.name ?? asset?.product_type.replaceAll('-', ' ') ?? ''

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Demande de devis"
          title="Demande de devis gratuit pour vos menuiseries en Martinique."
          description="Indiquez le produit, la commune, les dimensions si vous les avez et ajoutez des photos. GIB traite les besoins en menuiserie aluminium, bois, PVC, volets, portes, garde-corps, renovation et depannage."
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="glass-panel overflow-hidden">
          <MediaImage
            alt={heroImageAlt}
            className="aspect-[4/3] overflow-hidden"
            fallbackSrc={meta.fallback}
            imgClassName="h-full w-full object-cover"
            src={heroImageSrc}
          />
          <div className="space-y-4 p-6">
            <span className="eyebrow">Reference selectionnee</span>
            <h2 className="text-2xl font-semibold text-white">{summaryTitle}</h2>
            <p className="text-sm leading-7 text-white/72">{summaryDescription}</p>
            <div className="rounded-[1.6rem] border border-white/24 bg-white/18 p-5 text-sm text-white/76">
              <p className="font-semibold text-white">Comment aller plus vite</p>
              <p className="mt-3">
                Envoyez les photos, la commune, les dimensions approximatives et le besoin principal.
                GIB peut ensuite vous dire si le besoin concerne une pose, un depannage, un reglage ou un remplacement.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4 text-sm text-white/76">
                <p className="font-semibold text-white">Artisans depuis 20 ans</p>
                <p className="mt-2 leading-6">Ancrage terrain et suivi local en Martinique.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4 text-sm text-white/76">
                <p className="font-semibold text-white">Certifie RGE</p>
                <p className="mt-2 leading-6">Mention deja presente dans les contenus GIB.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4 text-sm text-white/76">
                <p className="font-semibold text-white">Garantie decennale a confirmer</p>
                <p className="mt-2 leading-6">A valider avant diffusion commerciale finale.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/18 bg-white/12 p-4 text-sm text-white/76">
                <p className="font-semibold text-white">Antilles: contraintes cycloniques et salines</p>
                <p className="mt-2 leading-6">Menuiseries pensees pour le climat local.</p>
              </div>
            </div>
          </div>
        </aside>

        <QuoteForm
          heroImageAlt={heroImageAlt}
          heroImageSrc={heroImageSrc}
          initialProduit={initialProduit}
          summaryDescription={summaryDescription}
          summaryTitle={summaryTitle}
        />
      </div>
    </div>
  )
}
