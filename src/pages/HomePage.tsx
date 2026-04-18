import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  PlayCircle,
  ShieldCheck,
  SunMedium,
  Trees,
  Waves,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { MediaImage } from '../components/MediaImage'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { assets, categoryMeta, company, featuredAssets, products } from '../lib/content'

const heroAssets = ['portail-dallas', 'baie-coulissante', 'pergola-ambiance-1']
  .map((id) => assets.find((asset) => asset.id === id))
  .filter(Boolean)

const spotlightProducts = products.filter((product) =>
  ['portails', 'baies-vitrees', 'pergolas', 'renovation-depannage'].includes(product.slug),
)

const audienceSegments = [
  {
    title: 'Particuliers et familles',
    description:
      'Pour mieux vivre chez soi, gagner en confort, proteger les ouvertures et remettre en valeur la facade.',
  },
  {
    title: 'Villas et locations saisonnieres',
    description:
      'Pour soigner l image du bien, fluidifier le dedans-dehors et mieux encaisser soleil, humidite et usage intensif.',
  },
  {
    title: 'Pros, commerces et coproprietes',
    description:
      'Pour securiser les acces, clarifier les parcours, valoriser l accueil client et fiabiliser l existant.',
  },
]

const climateProofs = [
  {
    icon: SunMedium,
    title: 'Protection solaire',
    description: 'Mieux gerer la chaleur, la lumiere et l ombrage selon l exposition du projet.',
  },
  {
    icon: Waves,
    title: 'Humidite et littoral',
    description: 'Parler durabilite, finitions adaptees et entretien dans un environnement tropical reel.',
  },
  {
    icon: ShieldCheck,
    title: 'Securite et serenite',
    description: 'Rassurer sur l usage quotidien, la fermeture, la renovation et la protection des acces.',
  },
  {
    icon: Trees,
    title: 'Esthetique locale',
    description: 'Conserver une lecture elegante, lumineuse et premium sans casser l identite de l habitat.',
  },
]

const beforeAfterStories = [
  {
    title: 'Entree a revaloriser',
    description:
      'Quand l entree semble datee ou peu rassurante, le portail et la cloture redonnent un niveau immediat au bien.',
    existing: 'Avant : acces peu lisible, facade qui manque de presence.',
    result: 'Apres : entree plus claire, plus nette, plus coherente avec le style de la maison.',
    assetId: 'portail-dallas',
  },
  {
    title: 'Terrasse peu exploitee',
    description:
      'La pergola bioclimatique sert a montrer un exterieur plus vivant, plus confortable et plus premium.',
    existing: 'Avant : terrasse trop exposee au soleil ou sous-utilisee.',
    result: 'Apres : espace d ombre, confort d usage et perception haut de gamme.',
    assetId: 'pergola-ambiance-1',
  },
  {
    title: 'Ouverture a repenser',
    description:
      'Les baies et grandes ouvertures aident a projeter une renovation plus lumineuse et mieux valorisee.',
    existing: 'Avant : circulation coupee, lumiere moins presente.',
    result: 'Apres : dedans-dehors plus fluide, vue ouverte, piece plus valorisee.',
    assetId: 'baie-coulissante',
  },
]

const socialRelay = [
  {
    title: 'Facebook',
    description: 'Relais simple pour rassurer, publier les realisations et appuyer la preuve sociale locale.',
    href: company.facebook_url,
  },
  {
    title: 'Instagram',
    description: 'Bloc inspiration et realisations recentes, sans rendre le site dependant d un flux externe.',
    href: company.instagram_url,
  },
  {
    title: 'Video',
    description: 'Espace prevu pour avant/apres, details de finition, chantiers et demonstration de pose.',
    href: company.youtube_url,
  },
]

export function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="shell pt-8 sm:pt-12 lg:pt-16">
        <div className="glass-panel-strong overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <span className="eyebrow">Ducos · Martinique · RGE · Qualicoat · +20 ans</span>
                <h1 className="headline max-w-4xl text-[var(--text)]">
                  Menuiserie aluminium, renovation et depannage en Martinique.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                  {company.hero_promise} GIB intervient depuis Ducos sur toute la Martinique pour la pose de menuiseries aluminium, la renovation, le depannage, le remplacement et le reglage de vos ouvrages.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a className="cta-primary" href={`tel:${company.phone_international}`}>
                  <PhoneCall className="size-4" />
                  Appeler GIB
                </a>
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp direct
                </a>
                <Link className="cta-secondary" to="/devis">
                  <ArrowRight className="size-4" />
                  Demander un devis
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {company.proof_points.map((item) => (
                  <div key={item.label} className="metric-card">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-[color:var(--line-strong)] bg-[color:var(--gold-soft)]/70 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/48">Prestations</p>
                  <p className="mt-3 text-base font-semibold text-white">
                    Portails, volets roulants, fenetres, baies, pergolas, clotures, garde-corps, renovation, depannage, remplacement et reglage.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/48">Reference officielle</p>
                  <p className="mt-3 text-base font-semibold text-white">
                    GIB intervient depuis Ducos sur toute la Martinique, avec un savoir-faire reconnu en pose, renovation, depannage et remplacement.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative grid gap-4 md:grid-cols-[0.82fr_1.18fr] md:grid-rows-2">
              <div className="floating-note absolute -left-3 top-4 hidden md:block lg:-left-10">
Appeler, envoyer des photos, demander un devis.
              </div>
              {heroAssets[0] ? (
                <MediaImage
                  alt={heroAssets[0].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10 md:row-span-2"
                  fallbackSrc={categoryMeta[heroAssets[0].category].fallback}
                  imgClassName="h-full min-h-[360px] w-full object-cover"
                  src={heroAssets[0].image_url}
                />
              ) : null}
              {heroAssets[1] ? (
                <MediaImage
                  alt={heroAssets[1].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10"
                  fallbackSrc={categoryMeta[heroAssets[1].category].fallback}
                  imgClassName="h-full min-h-[170px] w-full object-cover"
                  src={heroAssets[1].image_url}
                />
              ) : null}
              {heroAssets[2] ? (
                <MediaImage
                  alt={heroAssets[2].alt_text}
                  className="overflow-hidden rounded-[2rem] border border-white/10"
                  fallbackSrc={categoryMeta[heroAssets[2].category].fallback}
                  imgClassName="h-full min-h-[170px] w-full object-cover"
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
            eyebrow="Ce que le site clarifie"
            title="Le message devient plus direct, plus rassurant et plus utile commercialement."
            description="Le discours se recentre sur les vrais besoins du marche martiniquais : confort, securite, renovation, protection solaire, valorisation du bien et adaptation au climat tropical."
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
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Offre connexe"
            title="Un premier niveau d orientation peut aussi ouvrir vers le diagnostic immobilier."
            description="Quand le besoin depasse la menuiserie seule, la demonstration mentionne proprement un relai possible vers un diagnostic immobilier connexe, sans brouiller le coeur de metier GIB."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.8rem] border border-black/8 bg-black/[0.02] p-5 text-sm leading-7 text-black/72">
              Cette mention sert de passerelle utile pour certains projets de renovation, vente, mise en location ou remise a niveau, tout en gardant le coeur du site centre sur la menuiserie aluminium, le depannage, le remplacement et le reglage.
            </div>
            <div className="rounded-[1.8rem] border border-[color:var(--line-strong)] bg-[color:var(--gold-soft)]/40 p-5 text-sm leading-7 text-black/76">
              Le parcours principal ne change pas : appel, WhatsApp, photos, visite si necessaire, puis devis ou orientation vers le bon interlocuteur.
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-panel px-6 py-8 sm:px-8">
            <SectionHeading
              eyebrow="Profils clients"
              title="Une home qui parle clairement aux particuliers, pros et coproprietes."
              description="La page d accueil distingue mieux les usages pour particuliers, villas, commerces, coproprietes et projets touristiques, sans s eloigner du ton du site GIB d origine."
              light
            />
            <div className="mt-8 grid gap-4">
              {audienceSegments.map((segment) => (
                <article key={segment.title} className="story-card">
                  <p className="text-lg font-semibold text-white">{segment.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/70">{segment.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-8 sm:px-8">
            <SectionHeading
              eyebrow="Pourquoi cela parle ici"
              title="Le contexte martiniquais devient un argument commercial clair."
              description="Le site reprend les arguments concrets du site original : soleil, humidite, embruns, entretien, securite, renovation et usage exterieur."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {climateProofs.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                    <Icon className="size-5 text-[#b98e45]" />
                    <p className="mt-4 text-base font-semibold text-black">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-black/68">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Produits phares</span>
            <h2 className="section-title mt-4 text-[var(--text)]">
              Des gammes mieux presentes, avec un angle plus vendeur et moins generique.
            </h2>
          </div>
          <Link className="cta-secondary hidden sm:inline-flex" to="/produits">
            Voir tout le catalogue
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {spotlightProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <SectionHeading
            eyebrow="Avant / apres"
            title="Un espace pour montrer les transformations et aider le client a se projeter."
            description="Les visuels servent a rendre les benefices plus lisibles au premier coup d oeil : entree revalorisee, terrasse mieux exploitee, ouverture plus lumineuse."
            action={
              <Link className="cta-primary" to="/galerie">
                <Camera className="size-4" />
                Voir les realisations
              </Link>
            }
            light
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {beforeAfterStories.map((story) => {
              const asset = assets.find((item) => item.id === story.assetId)
              const meta = asset ? categoryMeta[asset.category] : categoryMeta.renovation

              return (
                <article key={story.title} className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-4">
                  <div className="grid gap-4">
                    <div className="rounded-[1.6rem] border border-dashed border-white/12 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/42">Projection avant</p>
                      <p className="mt-3 text-sm leading-7 text-white/68">{story.existing}</p>
                    </div>
                    {asset ? (
                      <MediaImage
                        alt={asset.alt_text}
                        className="overflow-hidden rounded-[1.6rem] border border-white/10"
                        fallbackSrc={meta.fallback}
                        imgClassName="h-[220px] w-full object-cover"
                        src={asset.image_url}
                      />
                    ) : null}
                    <div className="rounded-[1.6rem] border border-[color:var(--line-strong)] bg-[color:var(--gold-soft)]/40 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/42">Resultat vise</p>
                      <p className="mt-3 text-sm leading-7 text-white/80">{story.result}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{story.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/68">{story.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Videos et reseaux"
              title="Un bloc prevu pour la preuve visuelle, sans dependre d un flux fragile."
              description="Des emplacements restent prevus pour les videos, reels, details de finition et realisations vues sur les reseaux, sans rendre le site dependant d un flux externe."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {socialRelay.map((item) => (
                <a
                  key={item.title}
                  className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5 transition duration-300 hover:-translate-y-0.5"
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <p className="text-base font-semibold text-black">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-black/66">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel px-6 py-8 sm:px-8">
            <SectionHeading
              eyebrow="Parcours commercial"
              title="La home pousse partout vers une prise de contact utile."
              description="Le visiteur peut appeler, envoyer un WhatsApp, demander un devis ou transmettre des photos sans passer par un tunnel complexe."
              light
            />
            <div className="mt-8 space-y-4">
              <div className="story-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c189]">1. Rassurer</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Certifications, experience, adaptation locale, visuels reels et pages plus lisibles.
                </p>
              </div>
              <div className="story-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c189]">2. Projeter</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Produits phares, realisations, logique avant/apres et renvoi vers les reseaux.
                </p>
              </div>
              <div className="story-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c189]">3. Convertir</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Appel, WhatsApp, devis guide, envoi de photos et qualification du besoin sans afficher de prix ferme.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="cta-primary" href={`tel:${company.phone_international}`}>
                <PhoneCall className="size-4" />
                Appeler
              </a>
              <Link className="cta-secondary" to="/devis">
                <BadgeCheck className="size-4" />
                Lancer un devis
              </Link>
              <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                Envoyer des photos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <SectionHeading
            eyebrow="Realisations et inspirations"
            title="Des visuels reels deja reutilises comme preuve, pas comme simple decoration."
            description="La bibliotheque media sert a illustrer les fiches, la home et les demandes de devis similaires avec des visuels reels deja utilises par GIB."
            action={
              <a className="cta-secondary" href={company.youtube_url} rel="noreferrer" target="_blank">
                <PlayCircle className="size-4" />
                Ouvrir la video
              </a>
            }
            light
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredAssets.slice(0, 4).map((asset) => (
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
    </div>
  )
}
