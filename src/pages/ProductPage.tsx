import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, getAssetById, getAssetsByProduct, getProductBySlug } from '../lib/content'

export function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="shell pt-12">
        <div className="surface-panel px-6 py-10 text-center sm:px-8">
          <p className="eyebrow">Produit introuvable</p>
          <h1 className="section-title mt-4 text-[var(--text-dark)]">La fiche demandee n existe pas encore.</h1>
          <Link className="cta-primary mt-6" to="/produits">
            Revenir au catalogue
          </Link>
        </div>
      </div>
    )
  }

  const heroAsset = getAssetById(product.hero_asset_id)
  const productAssets = getAssetsByProduct(product.slug)
  const meta = categoryMeta[product.category]

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <MediaImage
            alt={heroAsset?.alt_text ?? product.name}
            className="h-full min-h-[340px]"
            fallbackSrc={meta.fallback}
            imgClassName="h-full w-full object-cover"
            src={heroAsset?.image_url ?? meta.fallback}
          />
          <div className="space-y-6 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <span className="eyebrow">{meta.label}</span>
            <div className="space-y-4">
              <h1 className="section-title text-[var(--text)]">{product.name}</h1>
              <p className="body-copy">{product.summary}</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Adaptation Martinique</p>
              <p className="mt-3 text-sm leading-7 text-white/76">{product.climate_note}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="cta-primary" to={`/devis?product=${product.slug}`}>
                Demander un devis
                <ArrowRight className="size-4" />
              </Link>
              {product.simulation_eligible ? (
                <Link className="cta-secondary" to={`/simulation?product=${product.slug}`}>
                  <Sparkles className="size-4" />
                  Simulation
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            description="Ce bloc reste volontairement concret : ce que le client gagne, ou le produit s integre, et pourquoi la demande de devis reste l etape suivante."
            eyebrow="Benefices client"
            title="Une fiche qui rassure et cadre la prochaine conversation."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Benefices</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-black/68">
                {product.benefits.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Cas d usage</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-black/68">
                {product.use_cases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Reassurance</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.reassurance.map((item) => (
                <span key={item} className="rounded-full bg-black/6 px-3 py-2 text-sm text-black/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel px-6 py-8 sm:px-8">
          <SectionHeading
            description="Photos issues de la bibliotheque GIB integree localement. Elles restent reutilisables dans la galerie, la simulation et les CTA de devis similaires."
            eyebrow="Photos GIB"
            light
            title="Des references visuelles directement exploitees sur la fiche."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {productAssets.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.04]">
                <MediaImage
                  alt={asset.alt_text}
                  className="aspect-[4/3] overflow-hidden"
                  fallbackSrc={meta.fallback}
                  imgClassName="h-full w-full object-cover"
                  src={asset.image_url}
                />
                <div className="space-y-2 p-4">
                  <p className="text-base font-semibold text-white">{asset.title}</p>
                  <p className="text-sm text-white/62">{asset.location}</p>
                  <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8c189]" to={`/devis?product=${product.slug}&asset=${asset.id}`}>
                    Devis similaire
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Action suivante</p>
            <h2 className="section-title mt-4 text-[var(--text)]">On garde le tunnel court.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="cta-primary" to={`/devis?product=${product.slug}`}>
              Demander un devis
            </Link>
            <a className="cta-whatsapp" href="https://wa.me/596696905164?text=Bonjour%20GIB%2C%20je%20souhaite%20parler%20du%20produit%20vu%20sur%20la%20demo." rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              Envoyer sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
