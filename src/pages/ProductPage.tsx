import { ArrowRight, MessageCircle, PhoneCall, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { categoryMeta, company, getAssetById, getAssetsByProduct, getProductBySlug } from '../lib/content'

const decisionChecklist: Record<string, string[]> = {
  portails: [
    'Quel niveau de securite et d intimite le client recherche.',
    'Comment accorder portail, cloture, portillon et style de facade.',
    'Quelle ouverture facilite le quotidien sur le terrain.',
  ],
  'fenetres-portes': [
    'Comment mieux ventiler et eclairer sans perdre en confort.',
    'Quel rendu choisir pour harmoniser la renovation.',
    'Comment qualifier les dimensions, contraintes et finitions avant devis.',
  ],
  'volets-roulants': [
    'Quel niveau de protection solaire et d intimite est attendu.',
    'Quelles ouvertures sont les plus exposees dans le logement.',
    'Comment integrer le volet dans une renovation propre et lisible.',
  ],
  'baies-vitrees': [
    'Comment ouvrir la piece vers l exterieur sans brouiller l usage.',
    'Quelle luminosite et quelle circulation le client veut gagner.',
    'Comment projeter le resultat avec des references visuelles proches.',
  ],
  pergolas: [
    'Comment mieux habiter la terrasse dans le climat martiniquais.',
    'Quel niveau de confort, d ombre et d image le lieu doit atteindre.',
    'Comment rendre l exterieur plus utile pour la famille ou les clients.',
  ],
  'avancee-terrasse': [
    'Comment proteger durablement une zone de passage ou une terrasse.',
    'Quelles dimensions et quelle avancee sont pertinentes sur la facade.',
    'Comment articuler protection solaire, pluie et rendu de la maison.',
  ],
  'clotures-portillons': [
    'Comment securiser les abords sans alourdir l esthetique.',
    'Quelle coherence garder avec portail, facade et limites du terrain.',
    'Quel niveau de lisibilite et de proprete le client veut retrouver.',
  ],
  'garde-corps': [
    'Comment securiser sans casser la ligne architecturale.',
    'Ou la finition doit etre sobre, rassurante et durable.',
    'Comment integrer le besoin dans un projet plus large si necessaire.',
  ],
  'renovation-depannage': [
    'Ce qui doit etre repare, remplace ou simplement remis a niveau.',
    'Ce qui est urgent et ce qui peut etre planifie proprement.',
    'Savoir s il faut reparer, regler, remplacer ou planifier une renovation.',
  ],
  'diagnostic-immobilier': [
    'Quel type de diagnostic est necessaire avant vente ou travaux.',
    'Quel niveau d urgence ou de priorite doit etre traite.',
    'Comment orienter ensuite le client vers la bonne suite de projet.',
  ],
}

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
  const checklist = decisionChecklist[product.slug] ?? []

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <MediaImage
            alt={heroAsset?.alt_text ?? product.name}
            className="h-full min-h-[360px]"
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
            <div className="rounded-[1.6rem] border border-[color:var(--line-strong)] bg-[color:var(--gold-soft)]/50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Adaptation Martinique</p>
              <p className="mt-3 text-sm leading-7 text-white/80">{product.climate_note}</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Verification chantier</p>
              <p className="mt-3 text-sm leading-7 text-white/74">
                GIB regarde d abord votre besoin : pose, renovation, depannage, remplacement ou reglage. Ensuite, l equipe vous oriente vers la solution adaptee depuis Ducos, sur toute la Martinique.
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
              <Link className="cta-secondary" to={`/devis?product=${product.slug}`}>
                <ArrowRight className="size-4" />
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Pourquoi choisir cette solution"
            title="Un produit utile quand le besoin est clair."
            description="Chaque fiche explique simplement a quoi sert le produit, dans quels cas il est utile et comment demander un devis."
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
            eyebrow="Avant de chiffrer"
            title="Les points a verifier avant le devis."
            description="GIB verifie le besoin, les mesures, l exposition, l etat de l existant et les priorites avant de chiffrer."
            light
          />
          <div className="mt-8 grid gap-4">
            {checklist.map((item) => (
              <article key={item} className="story-card">
                <p className="text-sm leading-7 text-white/74">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Preuves visuelles"
          title="Des references locales pour mieux se projeter."
          description="Les photos montrent des produits poses, des exterieurs et des finitions proches des besoins en Martinique."
          action={
            <a className="cta-secondary" href={company.youtube_url} rel="noreferrer" target="_blank">
              <PlayCircle className="size-4" />
              Espace video
            </a>
          }
          light
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Prochaine action"
          title="Envoyez votre besoin, GIB vous recontacte."
          description="Pas de prix public ferme : un devis depend des mesures, de l etat de l existant, des options et de la pose."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="cta-primary" to={`/devis?product=${product.slug}`}>
            Demander un devis
          </Link>
          <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
            <MessageCircle className="size-4" />
            Envoyer des photos
          </a>
          <a className="cta-secondary" href={`tel:${company.phone_international}`}>
            <PhoneCall className="size-4" />
            Etre rappele
          </a>
        </div>
      </section>
    </div>
  )
}
