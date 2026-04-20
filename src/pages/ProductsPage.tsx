import { ArrowRight, MessageCircle, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { company, products } from '../lib/content'

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
          description="Nos experts travaillent avec un fournisseur francais, pionnier dans la fabrication de menuiserie aluminium. Ce catalogue remet en avant les vraies offres du site officiel GIB avec une lecture plus nette."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {audienceFocus.map((item) => (
            <span key={item} className="tag bg-black/6 text-black/72">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageHighlights.map((item) => (
            <div key={item} className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5 text-sm leading-7 text-black/72">
              {item}
            </div>
          ))}
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
              Comme sur le site officiel, le but n est pas de complexifier le parcours. Le catalogue sert a comprendre l offre puis a passer rapidement vers un appel, un e-mail, WhatsApp ou une demande de devis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.phone_international}`}>
              <PhoneCall className="size-4" />
              Appeler
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp
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
