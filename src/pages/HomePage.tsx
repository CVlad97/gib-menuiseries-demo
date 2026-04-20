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
  { title: 'Intervention Martinique', description: 'Une entreprise locale basee a Ducos, joignable rapidement pour vos besoins sur l ile.' },
  { title: 'Climat tropical', description: 'Des solutions pensees pour le soleil, l humidite, les embruns et l usage exterieur.' },
  { title: 'RGE et Qualicoat', description: 'Des reperes deja presents dans le positionnement GIB pour parler durabilite, finition et serieux d execution.' },
  { title: '+ 20 ans et accompagnement', description: 'Photos, rappel, diagnostic, devis, intervention : le parcours reste simple et lisible avec un vrai savoir-faire terrain.' },
]

const heroMarkers = [
  'Construction et renovation',
  'Artisans depuis 20 ans',
  'Ducos · Martinique',
]

const visibleOffers = offerOrder
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean)

export function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="shell pt-8 sm:pt-12 lg:pt-14">
        <div className="hero-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="space-y-5">
              <img alt="Logo GIB Menuiseries Services" className="h-16 w-auto max-w-full sm:h-18" src={logoSrc} />
              <p className="eyebrow !bg-[#1398db]/10 !text-[#0f6ea7] !border-[#1398db]/20">Zone Cocotte · Ducos · Martinique</p>
              <h1 className="section-title max-w-4xl text-[var(--text-dark)]">
                GIB Menuiseries Services : notre equipe de menuisiers situee a Ducos
              </h1>
              <p className="max-w-3xl text-base leading-8 text-black/72 sm:text-lg">
                Concretisez vos projets de construction et de renovation en faisant appel a nos experts. Artisans depuis 20 ans, nos menuisiers sont a votre ecoute.
              </p>

              <div className="flex flex-wrap gap-2">
                {heroMarkers.map((item) => (
                  <span key={item} className="tag !bg-[#1398db]/10 !text-[#0f6ea7]">{item}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link className="cta-primary" to="/contact">
                  <ArrowRight className="size-4" />
                  Prendre un rendez-vous
                </Link>
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp direct
                </a>
                <a className="cta-secondary" href={`tel:${company.phone_international}`}>
                  <PhoneCall className="size-4" />
                  Appeler GIB
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-black/66">
                <span className="contact-pill">Entreprise locale reelle</span>
                <span className="contact-pill">Intervention sur toute l ile</span>
                <span className="contact-pill">Construction et renovation</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-[#1398db]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(233,247,255,0.94))] p-6 shadow-[0_20px_48px_rgba(19,122,186,0.1)]">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f6ea7]/80">Menuiserie aluminium</p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-black/72">
                  <p>
                    GIB est a votre ecoute pour la pose de menuiserie en aluminium sur toute l ile.
                  </p>
                  <p>
                    Avec plus de 20 ans d experience, un large savoir-faire et de nombreuses connaissances, notre professionnel GIB vous propose la pose et la renovation de vos ouvrages exterieurs.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.45rem] border border-[#1398db]/14 bg-white p-5 shadow-[0_12px_28px_rgba(19,122,186,0.06)]">
                  <p className="text-sm font-semibold text-black">RGE et Qualicoat</p>
                  <p className="mt-2 text-sm leading-6 text-black/66">Des ouvrages durables, adaptes au climat tropical et aux exterieurs en Martinique.</p>
                </div>
                <div className="rounded-[1.45rem] border border-[#1398db]/14 bg-white p-5 shadow-[0_12px_28px_rgba(19,122,186,0.06)]">
                  <p className="text-sm font-semibold text-black">Depannage et remplacement</p>
                  <p className="mt-2 text-sm leading-6 text-black/66">GIB intervient rapidement pour le remplacement, le depannage et le reglage de vos appareils.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Menuiserie aluminium"
            title="L installation de vos menuiseries avec l intervention d artisans certifies RGE"
            description="GIB est a votre ecoute pour la pose de menuiserie en aluminium sur toute l ile, avec plus de 20 ans d experience, un vrai savoir-faire terrain et un accompagnement sur mesure."
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
              title="La renovation interieure et exterieure de vos habitations par notre equipe d artisans"
              description="L equipe GIB intervient sur toute l ile pour les maisons et les bungalows, avec des solutions concretes pour preserver le confort thermique, remettre en etat et renover durablement."
            />
            <div className="mt-8 grid gap-4">
              {[
                'Diagnostic de couverture et des elements qui la constituent',
                'Remplacement et pose des differents elements de toiture',
                'Traitement d etancheite pour preserver le confort thermique',
                'Renovation complete de salles de bains et revetements de sol',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(239,249,255,0.92))] p-4 text-sm leading-7 text-black/72">
                  <BadgeCheck className="mt-1 size-4 text-[#1398db]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Faites confiance a une equipe d experts formes et qualifies"
              title="Faites confiance a une equipe d experts formes et qualifies"
              description="Certifiee RGE, Qualicoat, forte de plus de 20 ans d experience et d un accompagnement sur mesure, l equipe conserve les reperes historiques de la home GIB."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <article key={item.title} className="rounded-[1.6rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(233,246,255,0.92))] p-5">
                  <p className="text-base font-semibold text-black">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-black/68">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
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
            light
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {['Amiante', 'Termites', 'Electricite', 'Energie'].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/12 bg-white/[0.12] p-5 text-center">
                <p className="text-base font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Contact direct"
            title="GIB Menuiserie, situe a Ducos, intervient sur toute la Martinique."
            description="Votre professionnel GIB est disponible par telephone ou par e-mail pour concretiser l ensemble de vos projets de construction, de renovation et de depannage."
            action={
              <a className="cta-secondary !border-[#1398db]/18 !text-[#0f6ea7]" href={company.youtube_url} rel="noreferrer" target="_blank">
                <PlayCircle className="size-4 text-[#1398db]" />
                Video
              </a>
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.phone_international}`}>
              <PhoneCall className="size-4" />
              {company.phone_display}
            </a>
            <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={`mailto:${company.email}`}>
              <Mail className="size-4 text-[#1398db]" />
              {company.email}
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <Link className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
