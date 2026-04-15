import assetsData from '../data/assets.json'
import companyData from '../data/company.json'
import productsData from '../data/products.json'
import type { Category, CompanyProfile, MediaAsset, Product } from '../types/content'

export const company = companyData as CompanyProfile
export const assets = (assetsData as MediaAsset[]).filter((asset) => asset.published)
export const products = productsData as Product[]

export const categoryMeta: Record<
  Category,
  { label: string; fallback: string; accent: string; description: string }
> = {
  portail: {
    label: 'Portail',
    fallback: 'fallbacks/portail.svg',
    accent: 'from-[#c7a86a] to-[#8ea392]',
    description: 'Entrees, portails et acces exterieurs.',
  },
  fenetre: {
    label: 'Fenetre',
    fallback: 'fallbacks/fenetre.svg',
    accent: 'from-[#d8c189] to-[#8db4ab]',
    description: 'Luminosite, ventilation et ouvertures.',
  },
  'baie-vitree': {
    label: 'Baie vitree',
    fallback: 'fallbacks/baie-vitree.svg',
    accent: 'from-[#d9b976] to-[#82b4a4]',
    description: 'Ouvertures larges et vue degagee.',
  },
  'volet-roulant': {
    label: 'Volet roulant',
    fallback: 'fallbacks/volet-roulant.svg',
    accent: 'from-[#a3d0bd] to-[#d7c07d]',
    description: 'Confort solaire et fermeture maitrisee.',
  },
  pergola: {
    label: 'Pergola',
    fallback: 'fallbacks/pergola.svg',
    accent: 'from-[#d8c770] to-[#7ab098]',
    description: 'Terrasses et usage premium de l exterieur.',
  },
  cloture: {
    label: 'Cloture',
    fallback: 'fallbacks/cloture.svg',
    accent: 'from-[#c5a16b] to-[#9fb8aa]',
    description: 'Limites, portillons et abords.',
  },
  'garde-corps': {
    label: 'Garde-corps',
    fallback: 'fallbacks/garde-corps.svg',
    accent: 'from-[#b7d2cb] to-[#d8bd76]',
    description: 'Securisation et finition architecturale.',
  },
  renovation: {
    label: 'Renovation',
    fallback: 'fallbacks/renovation.svg',
    accent: 'from-[#d6c2a0] to-[#8fb6a7]',
    description: 'Reprise de l existant et trajectoire projet.',
  },
  depannage: {
    label: 'Depannage',
    fallback: 'fallbacks/depannage.svg',
    accent: 'from-[#d1b06f] to-[#9bbfaf]',
    description: 'Support terrain et priorisation des actions.',
  },
  'projet-pro': {
    label: 'Projet pro',
    fallback: 'fallbacks/projet-pro.svg',
    accent: 'from-[#9cc7b4] to-[#d3b874]',
    description: 'Dossiers pros, AO simples et implantation.',
  },
}

export function getAssetById(id: string): MediaAsset | undefined {
  return assets.find((asset) => asset.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getAssetsByProduct(slug: string): MediaAsset[] {
  return assets.filter((asset) => asset.product_type === slug)
}

export function getAssetsByCategory(category: Category): MediaAsset[] {
  return assets.filter((asset) => asset.category === category)
}

export const featuredAssets = assets.filter((asset) => asset.featured)
