import { ArrowRight, MessageCircle, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { company, products } from '../lib/content'

const pageHighlights = [
  'Portails, volets roulants, fenetres, baies vitrees, pergolas, clotures et garde-corps en menuiserie aluminium.',
  'Renovation, depannage, remplacement et reglage pour repartir d un existant plus proprement.',
  'Discours plus frontal sur Ducos, la Martinique, la pose, la finition et la lecture terrain.',
  'CTA renforces vers appel, WhatsApp et devis personnalise.',
]

const audienceFocus = ['Particuliers', 'Pros', 'Coproprietes', 'Locations saisonnieres']

export function ProductsPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Catalogue GIB"
          title="Des pages produits plus claires, plus solides et plus credibles commercialement."
          description="Le catalogue reste simple a parcourir et chaque fiche aide mieux a comprendre l usage, la finition, l adaptation locale, la logique de remplacement ou de depannage et la prochaine action a engager."
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

      <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow">Besoin d aller plus vite</span>
            <h2 className="section-title text-[var(--text)]">
              Le catalogue sert a qualifier le besoin. La conversion passe ensuite par le bon canal.
            </h2>
            <p className="body-copy">
              Appel pour cadrer, WhatsApp pour envoyer des photos, devis pour formaliser le besoin.
              Le parcours reste volontairement court pour aller vers un appel, un WhatsApp ou un devis, avec mention possible d un diagnostic immobilier connexe si le projet l exige.
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
