import { ArrowRight, MessageCircle, PhoneCall } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { buildProjectWhatsAppMessage, buildWhatsAppUrl, categoryMeta, company, products } from '../lib/content'

const pageHighlights = [
  'Volet roulant, fenetre et porte, portail, cloture et garde-corps, baie vitree, pergola bioclimatique.',
  'Avancee de terrasse, renovation d habitat, depannage express et diagnostic immobilier.',
  'Prise de mesures, analyse du besoin, devis sur mesure et accompagnement de chantier.',
  'Telephone, WhatsApp et demande de devis pour passer rapidement du besoin au contact.',
]

const audienceFocus = ['Particuliers', 'Professionnels', 'Coproprietes', 'Toute la Martinique']

export function ProductsPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Menuiserie aluminium"
          title="L installation de vos menuiseries en aluminium, du volet roulant au portail."
          description="Retrouvez les principaux produits GIB : portails, volets roulants, fenetres, baies vitrees, pergolas, clotures, garde-corps, renovation et depannage."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {audienceFocus.map((item) => (
            <span key={item} className="product-meta-chip !bg-white/85 !text-[#135987]">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageHighlights.map((item) => (
            <div key={item} className="category-highlight">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => {
            const meta = categoryMeta[product.category]
            const whatsappLink = buildWhatsAppUrl(buildProjectWhatsAppMessage({ product: product.name }))

            return (
              <article
                key={product.slug}
                className="category-showcase-card"
                style={{
                  '--category-gradient': meta.gradient,
                  '--category-border': meta.border,
                  '--category-ink': meta.ink,
                } as CSSProperties}
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] opacity-75">{meta.tone}</p>
                <h3 className="mt-3 font-[Marcellus] text-2xl leading-tight">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 opacity-82">{meta.description}</p>
                <a className="mt-5 inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black" href={whatsappLink} rel="noreferrer" target="_blank">
                  Devis avec photos
                </a>
              </article>
            )
          })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow">Besoin d aller plus vite</span>
            <h2 className="section-title text-[var(--text-dark)]">
              Appelez, ecrivez, demandez un devis : le parcours reste volontairement simple.
            </h2>
            <p className="text-sm leading-7 text-black/68 sm:text-base">
              Choisissez une famille de produits, envoyez des photos si besoin, puis passez rapidement vers un appel, WhatsApp ou une demande de devis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.phone_international}`}>
              <PhoneCall className="size-4" />
              Appeler
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              Commercial WhatsApp
            </a>
            <Link className="cta-secondary" to="/devis">
              <ArrowRight className="size-4" />
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
