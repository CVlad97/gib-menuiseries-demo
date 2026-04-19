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
  const highlight =
    product.slug === 'renovation-depannage'
      ? 'Depannage, reglage et remplacement'
      : product.slug === 'volets-roulants'
        ? 'Reglage, motorisation et remplacement'
        : product.slug === 'fenetres-portes'
          ? 'Renovation et remplacement d ouvrants'
          : null

  return (
    <article className="surface-panel group overflow-hidden transition duration-300 hover:-translate-y-1">
      <MediaImage
        alt={heroAsset?.alt_text ?? product.name}
        className="aspect-[5/4] overflow-hidden"
        fallbackSrc={meta.fallback}
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        src={heroAsset?.image_url ?? meta.fallback}
      />
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag !bg-black/[0.06] !text-black/74">{meta.label}</span>
          {product.simulation_eligible ? (
            <span className="tag !bg-emerald-500/12 !text-emerald-800">
              <Sparkles className="size-3.5" />
              projection
            </span>
          ) : null}
          {highlight ? <span className="tag !bg-[color:var(--gold-soft)] !text-[#7a5618]">{highlight}</span> : null}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-black">{product.name}</h3>
          <p className="text-sm leading-7 text-black/70">{product.summary}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-black/38">{meta.description}</p>
          <p className="rounded-[1.2rem] border border-black/8 bg-black/[0.02] px-3 py-3 text-sm leading-6 text-black/62">
            {product.climate_note}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="cta-primary !px-4 !py-2" to={`/produits/${product.slug}`}>
            Voir la solution
            <ArrowRight className="size-4" />
          </Link>
          <Link className="cta-secondary !px-4 !py-2" to={`/devis?product=${product.slug}`}>
            Devis personnalise
          </Link>
        </div>
      </div>
    </article>
  )
}
