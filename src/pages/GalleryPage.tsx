import { useMemo, useState } from 'react'
import { Filter, Sparkles } from 'lucide-react'
import { AssetCard } from '../components/AssetCard'
import { Lightbox } from '../components/Lightbox'
import { SectionHeading } from '../components/SectionHeading'
import { assets, categoryMeta } from '../lib/content'
import type { AssetCollection, Category, MediaAsset } from '../types/content'

const allCategories = Object.entries(categoryMeta)
const collections: Array<{ key: AssetCollection | 'all'; label: string }> = [
  { key: 'all', label: 'Tout' },
  { key: 'realisations', label: 'Realisations' },
  { key: 'inspirations', label: 'Inspirations' },
  { key: 'projet-du-moment', label: 'Projet du moment' },
]

export function GalleryPage() {
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [collection, setCollection] = useState<AssetCollection | 'all'>('all')
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null)

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const categoryMatch = category === 'all' || asset.category === category
      const collectionMatch = collection === 'all' || asset.collection === collection
      return categoryMatch && collectionMatch
    })
  }, [category, collection])

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          description="La galerie s appuie en priorite sur des visuels reels du site officiel GIB pour montrer un habitat, des exterieurs et des menuiseries deja posees. L objectif ici est la credibilite terrain avant la decoration."
          eyebrow="Realisations"
          light
          title="Des photos utiles pour choisir et demander un devis."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
              <Filter className="size-4" />
              Filtres par categorie
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`chip-button ${category === 'all' ? 'chip-button-active' : ''}`}
                onClick={() => setCategory('all')}
                type="button"
              >
                Tout
              </button>
              {allCategories.map(([key, meta]) => (
                <button
                  key={key}
                  className={`chip-button ${category === key ? 'chip-button-active' : ''}`}
                  onClick={() => setCategory(key as Category)}
                  type="button"
                >
                  {meta.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
              <Sparkles className="size-4" />
              Sections de galerie
            </div>
            <div className="flex flex-wrap gap-2">
              {collections.map((item) => (
                <button
                  key={item.key}
                  className={`chip-button ${collection === item.key ? 'chip-button-active' : ''}`}
                  onClick={() => setCollection(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredAssets.map((asset) => (
          <AssetCard asset={asset} key={asset.id} onOpen={setSelectedAsset} />
        ))}
      </div>

      <div className="surface-panel px-6 py-7 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Source primaire</p>
            <p className="mt-2 text-lg font-semibold text-black">Site officiel GIB</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Source secondaire</p>
            <p className="mt-2 text-lg font-semibold text-black">Instagram importe en local, sans flux live fragile</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Objectif</p>
            <p className="mt-2 text-lg font-semibold text-black">Montrer des poses reelles, lumineuses et credibles</p>
          </div>
        </div>
      </div>

      <Lightbox asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
    </div>
  )
}
