export type Category =
  | 'portail'
  | 'fenetre'
  | 'baie-vitree'
  | 'volet-roulant'
  | 'pergola'
  | 'cloture'
  | 'garde-corps'
  | 'renovation'
  | 'depannage'
  | 'projet-pro'

export type AssetSource = 'official-site' | 'instagram' | 'fallback-local'
export type AssetCollection = 'realisations' | 'inspirations' | 'projet-du-moment'

export interface CompanyProfile {
  name: string
  short_name: string
  tagline: string
  hero_promise: string
  phone_display: string
  phone_international: string
  commercial_phone_display: string
  commercial_phone_international: string
  email: string
  location_label: string
  service_area: string
  whatsapp_display: string
  whatsapp_number: string
  whatsapp_url: string
  instagram_url: string
  facebook_url: string
  youtube_url: string
  contact_note: string
  proof_points: Array<{ label: string; value: string }>
  commitments: string[]
}

export interface Product {
  slug: string
  name: string
  category: Category
  summary: string
  hero_asset_id: string
  simulation_eligible: boolean
  climate_note: string
  benefits: string[]
  use_cases: string[]
  reassurance: string[]
}

export interface MediaAsset {
  id: string
  title: string
  source: AssetSource
  image_url: string
  thumbnail_url: string
  source_url: string | null
  category: Category
  product_type: string
  location: string
  featured: boolean
  published: boolean
  collection: AssetCollection
  before_after_group: string | null
  alt_text: string
}
