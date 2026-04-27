import { ArrowRight, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { buildProjectWhatsAppMessage, buildWhatsAppUrl, categoryMeta, getAssetById } from '../lib/content'
import type { Product } from '../types/content'
import { MediaImage } from './MediaImage'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const heroAsset = getAssetById(product.hero_asset_id)
  const meta = categoryMeta[product.category]
  const whatsappLink = buildWhatsAppUrl(buildProjectWhatsAppMessage({
    product: product.name,
    assetTitle: heroAsset?.title,
  }))
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
    <article
      className="product-card group overflow-hidden transition duration-300 hover:-translate-y-1"
      style={{
        '--category-gradient': meta.gradient,
        '--category-border': meta.border,
        '--category-ink': meta.ink,
      } as CSSProperties}
    >
      <div className="relative">
        <MediaImage
          alt={heroAsset?.alt_text ?? product.name}
          className="aspect-[5/4] overflow-hidden"
          fallbackSrc={meta.fallback}
          imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          src={heroAsset?.image_url ?? meta.fallback}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f6ea7]/70 via-[#1398db]/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#0f6ea7] backdrop-blur">
          {meta.tone}
        </div>
        <a
          className="absolute bottom-4 right-4 rounded-full bg-white/94 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f6ea7] shadow-lg"
          href={whatsappLink}
          rel="noreferrer"
          target="_blank"
        >
          Photo + devis
        </a>
      </div>
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="product-accent-tag product-accent-tag-themed">{meta.label}</span>
          {product.simulation_eligible ? (
            <span className="product-accent-tag !bg-[color:var(--leaf-soft)] !text-[#2f7f61]">
              <Sparkles className="size-3.5" />
              Devis sur mesure
            </span>
          ) : null}
          {highlight ? <span className="product-accent-tag !bg-[color:var(--gold-soft)] !text-[#8a671c]">{highlight}</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {supportBadges.map((badge) => (
            <span key={badge} className="product-meta-chip">{badge}</span>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="card-title">{product.name}</h3>
          <p className="text-sm leading-7 text-black/70">{product.summary}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#0f6ea7]/70">{meta.description}</p>
          <p className="product-climate-panel">
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
