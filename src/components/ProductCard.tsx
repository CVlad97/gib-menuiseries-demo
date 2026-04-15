import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryMeta, getAssetById } from '../lib/content'
import type { Product } from '../types/content'
import { MediaImage } from './MediaImage'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const heroAsset = getAssetById(product.hero_asset_id)
  const meta = categoryMeta[product.category]

  return (
    <article className="glass-panel overflow-hidden">
      <MediaImage
        alt={heroAsset?.alt_text ?? product.name}
        className="aspect-[5/4] overflow-hidden"
        fallbackSrc={meta.fallback}
        imgClassName="h-full w-full object-cover"
        src={heroAsset?.image_url ?? meta.fallback}
      />
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag">{meta.label}</span>
          {product.simulation_eligible ? (
            <span className="tag bg-emerald-500/15 text-emerald-100">
              <Sparkles className="size-3.5" />
              simulation
            </span>
          ) : null}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
          <p className="text-sm leading-7 text-white/70">{product.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="cta-primary !px-4 !py-2" to={`/produits/${product.slug}`}>
            Voir la fiche
            <ArrowRight className="size-4" />
          </Link>
          <Link className="cta-secondary !px-4 !py-2" to={`/devis?product=${product.slug}`}>
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  )
}
