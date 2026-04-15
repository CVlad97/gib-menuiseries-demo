import { useEffect } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { categoryMeta } from '../lib/content'
import type { MediaAsset } from '../types/content'
import { MediaImage } from './MediaImage'

interface LightboxProps {
  asset: MediaAsset | null
  onClose: () => void
}

export function Lightbox({ asset, onClose }: LightboxProps) {
  useEffect(() => {
    if (!asset) {
      return undefined
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [asset, onClose])

  if (!asset) {
    return null
  }

  const meta = categoryMeta[asset.category]

  return (
    <div className="fixed inset-0 z-50 bg-black/86 p-4 backdrop-blur-sm sm:p-8" role="dialog">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/72">
            <span className="tag">{meta.label}</span>
            <span>{asset.location}</span>
          </div>
          <button className="cta-secondary !rounded-full !p-3" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <div className="glass-panel-strong grid flex-1 overflow-hidden lg:grid-cols-[1.35fr_0.65fr]">
          <MediaImage
            alt={asset.alt_text}
            className="h-full bg-black"
            fallbackSrc={meta.fallback}
            imgClassName="h-full w-full object-cover"
            loading="eager"
            src={asset.image_url}
          />
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-4">
              <p className="eyebrow">Bibliotheque asset</p>
              <h3 className="section-title text-[var(--text)]">{asset.title}</h3>
              <p className="body-copy">{asset.alt_text}</p>
              <ul className="space-y-3 text-sm text-white/74">
                <li>Source : {asset.source}</li>
                <li>Collection : {asset.collection.replaceAll('-', ' ')}</li>
                <li>Produit : {asset.product_type.replaceAll('-', ' ')}</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="cta-secondary" onClick={onClose} type="button">
                Fermer
              </button>
              {asset.source_url ? (
                <a className="cta-primary" href={asset.source_url} rel="noreferrer" target="_blank">
                  Voir la source
                  <ExternalLink className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
