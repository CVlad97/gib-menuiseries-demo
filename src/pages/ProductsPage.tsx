import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../lib/content'

export function ProductsPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          description="Chaque fiche reste simple : visuels reels, benefices client, adaptation au contexte martiniquais, puis CTA de simulation ou devis. L objectif est de garder une base exploitable, pas une maquette vide."
          eyebrow="Fiches produits"
          title="Une structure commune pour les produits, les realisations et la prochaine action commerciale."
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
