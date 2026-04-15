import {
  ArrowRight,
  CheckCircle2,
  DraftingCompass,
  GalleryVerticalEnd,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { assets, categoryMeta, company, featuredAssets, products } from '../lib/content'

const heroAssets = ['portail-dallas', 'baie-coulissante', 'pergola-ambiance-1']
  .map((id) => assets.find((asset) => asset.id === id))
  .filter(Boolean)

const homeFeatured = featuredAssets.slice(0, 4)
const homeProducts = products.slice(0, 4)

export function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="shell pt-8 sm:pt-12 lg:pt-16">
        <div className="glass-panel-strong overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <span className="eyebrow">Martinique · vitrine premium · GitHub Pages ready</span>
                <h1 className="headline max-w-3xl text-[var(--text)]">
                  Montrez le projet. Qualifiez le besoin. Passez au devis sans tunnel fragile.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  {company.hero_promise} Cette base front absorbe d abord les visuels officiels GIB,
                  garde un fallback local embarque et reste deployable sans backend bloquant.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link className="cta-primary" to="/devis">
                  <DraftingCompass className="size-4" />
                  Demander un devis
                </Link>
                <Link className="cta-secondary" to="/simulation">
                  <Sparkles className="size-4" />
                  Lancer une simulation
                </Link>
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp direct
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="metric-card">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Pas de prix vitrine</p>
                  <p className="mt-2 text-lg font-semibold text-white">Qualification puis chiffrage</p>
                </div>
                <div className="metric-card">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Sources</p>
                  <p className="mt-2 text-lg font-semibold text-white">Site officiel + fallback local</p>
                </div>
                <div className="metric-card">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Canal rapide</p>
                  <p className="mt-2 text-lg font-semibold text-white">WhatsApp et devis guide</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {company.proof_points.map((item) => (
                  <div key={item.label} className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-2">
              <div className="glass-panel absolute -left-4 -top-4 hidden rounded-[2rem] px-4 py-3 text-sm text-white/72 md:block lg:-left-8 lg:-top-6">
                Tropical, sur mesure, demonstrable.
              </div>
              {heroAssets[0] ? (
                <MediaImage
                  alt={heroAssets[0].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10 md:row-span-2"
                  fallbackSrc={categoryMeta[heroAssets[0].category].fallback}
                  imgClassName="h-full min-h-[320px] w-full object-cover"
                  src={heroAssets[0].image_url}
                />
              ) : null}
              {heroAssets[1] ? (
                <MediaImage
                  alt={heroAssets[1].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10"
                  fallbackSrc={categoryMeta[heroAssets[1].category].fallback}
                  imgClassName="h-full min-h-[155px] w-full object-cover"
                  src={heroAssets[1].image_url}
                />
              ) : null}
              {heroAssets[2] ? (
                <MediaImage
                  alt={heroAssets[2].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10"
                  fallbackSrc={categoryMeta[heroAssets[2].category].fallback}
                  imgClassName="h-full min-h-[155px] w-full object-cover"
                  src={heroAssets[2].image_url}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <SectionHeading
            description="Un cockpit commercial simple : galerie de references, fiches produits claires, simulation locale et devis guide. L architecture reste statique, mais deja branchable plus tard sur Supabase si tu le souhaites."
            eyebrow="Socle demonstrable"
            title="Une home premium qui vend la qualite sans partir dans l usine a gaz."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {company.commitments.map((item) => (
              <div key={item} className="rounded-[1.8rem] border border-black/6 bg-white p-5 shadow-[0_18px_45px_rgba(17,22,21,0.06)]">
                <CheckCircle2 className="size-5 text-[#b98e45]" />
                <p className="mt-4 text-sm leading-7 text-black/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Produits et parcours</span>
            <h2 className="section-title mt-4 text-[var(--text)]">Une structure claire pour les gammes et les realisations.</h2>
          </div>
          <Link className="cta-secondary hidden sm:inline-flex" to="/produits">
            Voir tout le catalogue
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {homeProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <SectionHeading
            action={
              <Link className="cta-primary" to="/galerie">
                <GalleryVerticalEnd className="size-4" />
                Ouvrir la galerie
              </Link>
            }
            description="Les premiers assets proviennent du site officiel GIB et sont maintenant ranges dans une bibliotheque exploitable sur la home, les fiches produits et les CTA de devis."
            eyebrow="Bibliotheque assets"
            light
            title="Des references visuelles reelles, structurees pour montrer puis convertir."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeFeatured.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/[0.03]">
                <MediaImage
                  alt={asset.alt_text}
                  className="aspect-[4/3] overflow-hidden"
                  fallbackSrc={categoryMeta[asset.category].fallback}
                  imgClassName="h-full w-full object-cover"
                  src={asset.image_url}
                />
                <div className="space-y-3 p-4">
                  <span className="tag">{categoryMeta[asset.category].label}</span>
                  <h3 className="text-lg font-semibold text-white">{asset.title}</h3>
                  <p className="text-sm text-white/68">{asset.location}</p>
                  <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#d9c28b]" to={`/devis?product=${asset.product_type}&asset=${asset.id}`}>
                    Demander un devis similaire
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel p-6 sm:p-8">
            <span className="eyebrow">Tunnel de conversion</span>
            <h2 className="section-title mt-4 text-[var(--text)]">Un parcours court, comprehensible et relancable.</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/72">
              <div>
                <p className="font-semibold text-white">1. Montrer</p>
                <p>Home premium et galerie pour inspirer sans dependre d un backend.</p>
              </div>
              <div>
                <p className="font-semibold text-white">2. Projeter</p>
                <p>Simulation locale avec upload photo ou fallback visuel par categorie.</p>
              </div>
              <div>
                <p className="font-semibold text-white">3. Qualifier</p>
                <p>Formulaire de devis sans prix public ferme, avec contexte, dimensions et commune.</p>
              </div>
              <div>
                <p className="font-semibold text-white">4. Relancer</p>
                <p>Stockage local de demonstration pret a etre remplace plus tard par un vrai back-office.</p>
              </div>
            </div>
          </div>
          <div className="surface-panel p-6 sm:p-8 lg:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                <PhoneCall className="size-5 text-[#b98e45]" />
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/44">Contact rapide</p>
                <a className="mt-2 block text-lg font-semibold text-black" href={`tel:${company.phone_international}`}>
                  {company.phone_display}
                </a>
                <p className="mt-2 text-sm text-black/60">Appel direct ou WhatsApp pour cadrer la prochaine action.</p>
              </div>
              <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                <Mail className="size-5 text-[#b98e45]" />
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/44">Email public</p>
                <a className="mt-2 block text-lg font-semibold text-black" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <p className="mt-2 text-sm text-black/60">Transmission de brief, plans, photos ou contraintes de pose.</p>
              </div>
              <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                <MapPin className="size-5 text-[#b98e45]" />
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/44">Zone</p>
                <p className="mt-2 text-lg font-semibold text-black">{company.location_label}</p>
                <p className="mt-2 text-sm text-black/60">{company.service_area}</p>
              </div>
              <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                <ShieldCheck className="size-5 text-[#b98e45]" />
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/44">Cadre commercial</p>
                <p className="mt-2 text-lg font-semibold text-black">Pas de prix ferme en front</p>
                <p className="mt-2 text-sm text-black/60">On montre, on simule, puis on enclenche une demande de devis contextualisee.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
