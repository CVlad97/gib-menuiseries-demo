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

  const supportBadges = [
    'Sur devis',
    product.slug === 'renovation-depannage' ? 'Intervention locale' : 'Etude sur mesure',
    'Adapte exterieur',
  ]

  return (
    <article className="surface-panel group overflow-hidden border-[#1398db]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(19,122,186,0.14)]">
      <MediaImage
        alt={heroAsset?.alt_text ?? product.name}
        className="aspect-[5/4] overflow-hidden"
        fallbackSrc={meta.fallback}
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        src={heroAsset?.image_url ?? meta.fallback}
      />
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag !bg-[#1398db]/10 !text-[#0f6ea7]">{meta.label}</span>
          {product.simulation_eligible ? (
            <span className="tag !bg-emerald-500/12 !text-emerald-800">
              <Sparkles className="size-3.5" />
              projection
            </span>
          ) : null}
          {highlight ? <span className="tag !bg-[color:var(--gold-soft)] !text-[#8a671c]">{highlight}</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {supportBadges.map((badge) => (
            <span key={badge} className="micro-badge">{badge}</span>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-black">{product.name}</h3>
          <p className="text-sm leading-7 text-black/70">{product.summary}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#0f6ea7]/70">{meta.description}</p>
          <p className="rounded-[1.2rem] border border-[#1398db]/10 bg-[#1398db]/[0.05] px-3 py-3 text-sm leading-6 text-black/62">
            {product.climate_note}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="cta-primary !px-4 !py-2" to={`/produits/${product.slug}`}>
            Voir le detail
            <ArrowRight className="size-4" />
          </Link>
          <Link className="cta-secondary !border-[#1398db]/20 !px-4 !py-2 !text-[#0f6ea7]" to={`/devis?product=${product.slug}`}>
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  )
}
