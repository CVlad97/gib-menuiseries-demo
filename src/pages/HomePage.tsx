import { ArrowRight, BadgeCheck, Mail, MessageCircle, PhoneCall, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { company, products } from '../lib/content'

const logoSrc =
  'https://le-de.cdn-website.com/179f7a3a04c5410bb41d060e3efd0cfd/dms3rep/multi/opt/logo+gib-fe923f67-381w.PNG'

const offerOrder = [
  'volets-roulants',
  'fenetres-portes',
  'portails',
  'clotures-portillons',
  'baies-vitrees',
  'pergolas',
  'avancee-terrasse',
  'renovation-depannage',
  'diagnostic-immobilier',
]

const trustPoints = [
  { title: 'Certifiee RGE', description: 'Des artisans formes et qualifies pour vos projets de construction et de renovation.' },
  { title: 'Qualicoat (vernis marin)', description: 'Une finition adaptee pour garantir la perennite des ouvrages exterieurs.' },
  { title: '+ 20 ans d experience', description: 'Un savoir-faire terrain reconnu a Ducos et sur toute la Martinique.' },
  { title: 'Accompagnement sur mesure', description: 'Prise de mesures, contraintes chantier, conseil et devis precis.' },
]

const visibleOffers = offerOrder
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean)

export function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="shell pt-8 sm:pt-12 lg:pt-14">
        <div className="surface-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <img alt="Logo GIB Menuiseries Services" className="h-18 w-auto max-w-full sm:h-20" src={logoSrc} />
              <div className="space-y-4">
                <p className="eyebrow !bg-[#e12726]/[0.08] !text-[#e12726] !border-[#e12726]/20">Zone Cocotte · Ducos · Martinique</p>
                <h1 className="section-title text-[var(--text-dark)]">
                  GIB Menuiseries Services : notre equipe de menuisiers situee a Ducos.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-black/72 sm:text-lg">
                  Concretisez vos projets de construction et de renovation en faisant appel a nos experts. Artisans depuis 20 ans, nos menuisiers sont a votre ecoute pour la pose, la renovation, le depannage, le remplacement, le reglage et le diagnostic immobilier.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="cta-primary" href={`tel:${company.phone_international}`}>
                  <PhoneCall className="size-4" />
                  Appelez-nous
                </a>
                <a className="cta-secondary !border-[#1398db]/30 !text-black" href={`mailto:${company.email}`}>
                  <Mail className="size-4 text-[#1398db]" />
                  Ecrivez-nous
                </a>
                <Link className="cta-whatsapp" to="/devis">
                  <ArrowRight className="size-4" />
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-[#f8f9fb] p-6 shadow-[0_24px_60px_rgba(17,22,21,0.08)]">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Repere metier</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-black/72">
                <p>
                  Menuiserie aluminium, volet roulant, fenetre et porte, portail, cloture et garde-corps, baie vitree, pergola bioclimatique, avancee de terrasse, renovation d habitat, depannage express et diagnostic immobilier.
                </p>
                <p>
                  GIB intervient rapidement sur toute la Martinique et plus particulierement autour de Ducos, Le Lamentin, Fort-de-France, Schoelcher, Riviere-Pilote, Les Trois-Ilets et Le Robert.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {company.proof_points.map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-black/8 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/42">{item.label}</p>
                    <p className="mt-2 text-base font-semibold text-black">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Menuiserie aluminium"
            title="L installation de vos menuiseries avec l intervention d artisans certifies RGE."
            description="GIB est a votre ecoute pour la pose de menuiserie en aluminium sur toute l ile. Nous prenons les mesures et les contraintes de vos menuiseries afin de vous etablir un devis precis, avec un large choix de produits grace a notre fournisseur SEPALUMIC."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {visibleOffers.map((product) => (
              <ProductCard key={product!.slug} product={product!} />
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Renovation d habitat"
              title="La renovation interieure et exterieure de vos habitations par notre equipe d artisans."
              description="L equipe d artisans de GIB intervient sur toute l ile pour des maisons et des bungalows. Nous effectuons la renovation d habitat pour assurer votre confort toute l annee : toiture, menuiseries, salles de bains et revetements de sol."
            />
            <div className="mt-8 grid gap-4">
              {[
                'Diagnostic de couverture et des elements qui la constituent',
                'Remplacement et pose des differents elements de toiture',
                'Traitement d etancheite pour preserver le confort thermique',
                'Renovation complete de salles de bains et revetements de sol',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-black/8 bg-white p-4 text-sm leading-7 text-black/72">
                  <BadgeCheck className="mt-1 size-4 text-[#e12726]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Confiance"
              title="Faites confiance a une equipe d experts formes et qualifies."
              description="Les marqueurs historiques du site officiel restent au premier plan, avec une lecture plus nette et plus immediate."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <article key={item.title} className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5">
                  <p className="text-base font-semibold text-black">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-black/68">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <SectionHeading
            eyebrow="Diagnostic immobilier"
            title="Nous diagnostiquons l ensemble de vos biens immobiliers avant une vente ou des travaux."
            description="GIB intervient dans le diagnostic immobilier de vos biens sur toute l ile. Nous realisons des diagnostics amiante, termites, electricite et energie avec un parcours de contact direct."
            action={
              <Link className="cta-primary" to="/diagnostic-immobilier">
                <ArrowRight className="size-4" />
                Voir le diagnostic immobilier
              </Link>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {['Amiante', 'Termites', 'Electricite', 'Energie'].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-black/8 bg-white p-5 text-center">
                <p className="text-base font-semibold text-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Contact direct"
            title="Appelez-nous, ecrivez-nous, demandez un devis."
            description="Comme sur le site officiel, le bon modele reste direct et local : telephone, e-mail, devis, puis prise de rendez-vous si necessaire."
            action={
              <a className="cta-secondary !border-[#e12726]/20 !text-black" href={company.youtube_url} rel="noreferrer" target="_blank">
                <PlayCircle className="size-4 text-[#e12726]" />
                Video
              </a>
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.phone_international}`}>
              <PhoneCall className="size-4" />
              {company.phone_display}
            </a>
            <a className="cta-secondary !border-[#1398db]/30 !text-black" href={`mailto:${company.email}`}>
              <Mail className="size-4 text-[#1398db]" />
              {company.email}
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <Link className="cta-secondary !text-black" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
