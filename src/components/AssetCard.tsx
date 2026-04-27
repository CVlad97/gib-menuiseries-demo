import { ExternalLink, Images, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../lib/content'
import type { MediaAsset } from '../types/content'
import { MediaImage } from './MediaImage'

interface AssetCardProps {
  asset: MediaAsset
  onOpen?: (asset: MediaAsset) => void
}

export function AssetCard({ asset, onOpen }: AssetCardProps) {
  const meta = categoryMeta[asset.category]
  const trustLabel =
    asset.source === 'official-site'
      ? 'visuel reel GIB'
      : asset.source === 'instagram'
        ? 'Instagram GIB'
        : asset.source.replaceAll('-', ' ')

  return (
    <article className="instagram-tile overflow-hidden">
      <button
        className="group block w-full text-left"
        onClick={() => onOpen?.(asset)}
        type="button"
      >
        <div className="relative overflow-hidden">
          <MediaImage
            alt={asset.alt_text}
            className="aspect-[4/3] w-full overflow-hidden"
            fallbackSrc={meta.fallback}
            imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            src={asset.image_url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f6ea7]/72 via-[#1398db]/16 to-transparent" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="tag">{meta.label}</span>
            <span className="tag !bg-white/86 !text-[#0f6ea7]">{asset.collection.replaceAll('-', ' ')}</span>
            <span className={`tag ${asset.source === 'instagram' ? '!bg-[#dff5f6] !text-[#11687c]' : '!bg-[#f5eee1]/90 !text-[#8a671c]'}`}>{trustLabel}</span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-white">{asset.title}</p>
              <p className="mt-1 text-sm text-white/72">{asset.location}</p>
            </div>
            <span className="rounded-full border border-white/18 bg-white/10 p-3 text-white backdrop-blur">
              <Images className="size-4" />
            </span>
          </div>
        </div>
      </button>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-[#135987]/72">
          <span>{asset.source === 'official-site' ? 'source officielle GIB' : trustLabel}</span>
          {asset.source_url ? (
            <a
              className="inline-flex items-center gap-1 text-[#0f6ea7] transition hover:text-[#1398db]"
              href={asset.source_url}
              rel="noreferrer"
              target="_blank"
            >
              source
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="cta-secondary !px-4 !py-2" onClick={() => onOpen?.(asset)} type="button">
            Voir la photo
          </button>
          <Link
            className="cta-primary !px-4 !py-2"
            to={`/devis?product=${asset.product_type}&asset=${asset.id}`}
          >
            <Quote className="size-4" />
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  )
}
