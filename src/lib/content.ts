import assetsData from '../data/assets.json'
import companyData from '../data/company.json'
import productsData from '../data/products.json'
import type { Category, CompanyProfile, MediaAsset, Product } from '../types/content'

export const company = companyData as CompanyProfile
export const assets = (assetsData as MediaAsset[]).filter((asset) => asset.published)
export const products = productsData as Product[]

export const categoryMeta: Record<
  Category,
  {
    label: string
    fallback: string
    accent: string
    description: string
    tone: string
    gradient: string
    border: string
    ink: string
  }
> = {
  portail: {
    label: 'Portail',
    fallback: 'fallbacks/portail.svg',
    accent: 'from-[#c7a86a] to-[#8ea392]',
    description: 'Entrees, portails et acces exterieurs.',
    tone: 'Bronze securite',
    gradient: 'linear-gradient(135deg, #0f6ea7 0%, #53c4d8 48%, #e6c17d 100%)',
    border: '#c8944f',
    ink: '#fff6e3',
  },
  fenetre: {
    label: 'Fenetre',
    fallback: 'fallbacks/fenetre.svg',
    accent: 'from-[#d8c189] to-[#8db4ab]',
    description: 'Luminosite, ventilation et ouvertures.',
    tone: 'Ivoire lumiere',
    gradient: 'linear-gradient(135deg, #edf7f7 0%, #a9d5d0 48%, #f5dca8 100%)',
    border: '#9ecac7',
    ink: '#11343a',
  },
  'baie-vitree': {
    label: 'Baie vitree',
    fallback: 'fallbacks/baie-vitree.svg',
    accent: 'from-[#d9b976] to-[#82b4a4]',
    description: 'Ouvertures larges et vue degagee.',
    tone: 'Lagon ouvert',
    gradient: 'linear-gradient(135deg, #0e4f6f 0%, #24a8c8 52%, #d8f4ec 100%)',
    border: '#34b6cf',
    ink: '#eefcff',
  },
  'volet-roulant': {
    label: 'Volet roulant',
    fallback: 'fallbacks/volet-roulant.svg',
    accent: 'from-[#a3d0bd] to-[#d7c07d]',
    description: 'Confort solaire et fermeture maitrisee.',
    tone: 'Graphite solaire',
    gradient: 'linear-gradient(135deg, #1275b3 0%, #8ccfdb 46%, #f2cf77 100%)',
    border: '#819199',
    ink: '#fff9df',
  },
  pergola: {
    label: 'Pergola',
    fallback: 'fallbacks/pergola.svg',
    accent: 'from-[#d8c770] to-[#7ab098]',
    description: 'Terrasses, ombre et confort exterieur.',
    tone: 'Sauge terrasse',
    gradient: 'linear-gradient(135deg, #2f9c83 0%, #86c9ae 50%, #f4d178 100%)',
    border: '#8dbb8f',
    ink: '#f7ffe9',
  },
  cloture: {
    label: 'Cloture',
    fallback: 'fallbacks/cloture.svg',
    accent: 'from-[#c5a16b] to-[#9fb8aa]',
    description: 'Limites, portillons et abords.',
    tone: 'Terre facade',
    gradient: 'linear-gradient(135deg, #0f6ea7 0%, #c58a4c 50%, #f5eee1 100%)',
    border: '#b9824f',
    ink: '#fff2de',
  },
  'garde-corps': {
    label: 'Garde-corps',
    fallback: 'fallbacks/garde-corps.svg',
    accent: 'from-[#b7d2cb] to-[#d8bd76]',
    description: 'Securisation et finition architecturale.',
    tone: 'Acier clair',
    gradient: 'linear-gradient(135deg, #346d8c 0%, #9ac8d0 46%, #f5eee1 100%)',
    border: '#9aaeb2',
    ink: '#f8fbfb',
  },
  renovation: {
    label: 'Renovation',
    fallback: 'fallbacks/renovation.svg',
    accent: 'from-[#d6c2a0] to-[#8fb6a7]',
    description: 'Remise en etat, confort et travaux utiles.',
    tone: 'Chantier propre',
    gradient: 'linear-gradient(135deg, #0f6ea7 0%, #74bc9a 48%, #e7d4b8 100%)',
    border: '#b99873',
    ink: '#fff5e8',
  },
  depannage: {
    label: 'Depannage',
    fallback: 'fallbacks/depannage.svg',
    accent: 'from-[#d1b06f] to-[#9bbfaf]',
    description: 'Support terrain et priorisation des actions.',
    tone: 'Signal rapide',
    gradient: 'linear-gradient(135deg, #1398db 0%, #f08b6f 46%, #ffd27a 100%)',
    border: '#e06a4f',
    ink: '#fff2e6',
  },
  'projet-pro': {
    label: 'Projet pro',
    fallback: 'fallbacks/projet-pro.svg',
    accent: 'from-[#9cc7b4] to-[#d3b874]',
    description: 'Dossiers pros, AO simples et implantation.',
    tone: 'Bureau technique',
    gradient: 'linear-gradient(135deg, #0f6ea7 0%, #53c4d8 48%, #b9d6d0 100%)',
    border: '#4b8daa',
    ink: '#eefbff',
  },
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${company.whatsapp_number}?text=${encodeURIComponent(message)}`
}

export function buildProjectWhatsAppMessage(details: {
  product?: string
  commune?: string
  dimensions?: string
  contexte?: string
  commentaire?: string
  assetTitle?: string
  photoCount?: number
}) {
  const lines = [
    'Bonjour GIB, je souhaite echanger sur mon projet menuiserie.',
    details.product ? `Produit : ${details.product}` : null,
    details.assetTitle ? `Reference photo : ${details.assetTitle}` : null,
    details.commune ? `Commune : ${details.commune}` : null,
    details.dimensions ? `Dimensions : ${details.dimensions}` : null,
    details.contexte ? `Contexte : ${details.contexte}` : null,
    details.commentaire ? `Description : ${details.commentaire}` : null,
    details.photoCount ? `Photos preparees : ${details.photoCount}. Je les joins dans WhatsApp.` : 'Je peux joindre des photos de l existant dans WhatsApp.',
  ]

  return lines.filter(Boolean).join('\n')
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
