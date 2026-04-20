import { ArrowRight, BadgeCheck, Mail, MessageCircle, PhoneCall, PlayCircle, Waves, Wrench } from 'lucide-react'
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
  'Menuiserie aluminium',
  'Renovation d habitat',
  'Depannage, reglage et remplacement',
  'Intervention Martinique',
]

const processSteps = [
  { title: 'Vous nous contactez', description: 'Telephone, WhatsApp ou demande de devis avec vos photos et votre besoin.' },
  { title: 'Nous analysons', description: 'Rappel, diagnostic et orientation vers la bonne solution : pose, reglage, remplacement ou renovation.' },
  { title: 'Nous chiffrons', description: 'Devis clair et personnalise selon vos contraintes, vos dimensions et votre usage.' },
  { title: 'Nous intervenons', description: 'Fabrication, pose ou depannage avec un suivi simple jusqu a la remise en service.' },
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
            <div className="space-y-6">
              <img alt="Logo GIB Menuiseries Services" className="h-18 w-auto max-w-full sm:h-20" src={logoSrc} />
              <div className="space-y-4">
                <p className="eyebrow !bg-[#1398db]/10 !text-[#0f6ea7] !border-[#1398db]/20">Zone Cocotte · Ducos · Martinique</p>
                <h1 className="section-title text-[var(--text-dark)]">
                  Menuiserie aluminium, renovation et depannage pour l habitat en Martinique.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-black/72 sm:text-lg">
                  Depuis Ducos, GIB accompagne les particuliers, les professionnels et les coproprietes pour la pose, le reglage, le remplacement et la remise en etat de menuiseries adaptees au climat tropical, a l exterieur et a l usage reel du terrain.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroMarkers.map((item) => (
                  <span key={item} className="tag !bg-[#1398db]/10 !text-[#0f6ea7]">{item}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a className="cta-primary" href={`tel:${company.phone_international}`}>
                  <PhoneCall className="size-4" />
                  Appel immediat
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

              <div className="flex flex-wrap gap-3 text-sm text-black/66">
                <span className="contact-pill">Reponse rapide</span>
                <span className="contact-pill">Photos et besoin par WhatsApp</span>
                <span className="contact-pill">Diagnostic et devis sur mesure</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-[#1398db]/14 bg-[linear-gradient(145deg,rgba(19,152,219,0.12),rgba(83,196,216,0.08))] p-6 shadow-[0_24px_60px_rgba(19,122,186,0.12)]">
                <p className="text-xs uppercase tracking-[0.24em] text-[#0f6ea7]/80">Repere metier</p>
                <div className="mt-4 space-y-4 text-sm leading-7 text-black/72">
                  <p>
                    Menuiserie aluminium, volet roulant, fenetre et porte, portail, cloture, garde-corps, baie vitree, pergola, renovation, depannage et diagnostic immobilier.
                  </p>
                  <p>
                    Le message reste simple : vous contactez GIB, vous expliquez votre besoin, nous vous orientons vers la bonne prise en charge et nous vous rappelons rapidement.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[#1398db]/14 bg-white p-5">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#1398db]/10 text-[#1398db]">
                    <Waves className="size-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-black">Climat tropical et exterieur</p>
                  <p className="mt-2 text-sm leading-6 text-black/66">Des solutions pensees pour le soleil, l humidite, le sel, l air marin et l usage quotidien.</p>
                </div>
                <div className="rounded-[1.5rem] border border-[#1398db]/14 bg-white p-5">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#1398db]/10 text-[#1398db]">
                    <Wrench className="size-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-black">Prise en charge concrete</p>
                  <p className="mt-2 text-sm leading-6 text-black/66">Reglage, remplacement, depannage ou pose : le type d intervention est compris rapidement.</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {company.proof_points.map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-[#1398db]/12 bg-white p-4 shadow-[0_10px_30px_rgba(19,122,186,0.06)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#0f6ea7]/70">{item.label}</p>
                    <p className="mt-2 text-base font-semibold text-black">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="rounded-[1.4rem] border border-[#1398db]/12 bg-white/88 px-4 py-3 text-sm leading-6 text-black/66 shadow-[0_10px_28px_rgba(19,122,186,0.05)]">
                Appel, WhatsApp ou devis : la prise de contact reste directe, locale et rapidement exploitable pour un besoin de pose, de remplacement ou de depannage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Menuiserie aluminium"
            title="Des solutions lisibles, durables et adaptees a l habitat en Martinique."
            description="GIB prend les mesures, evalue les contraintes et vous oriente vers la bonne reponse : pose neuve, renovation, reglage, remplacement ou depannage selon votre situation."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {visibleOffers.map((product) => (
              <ProductCard key={product!.slug} product={product!} />
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Prise en charge"
            title="Un parcours simple pour etre rassure vite."
            description="Le but est de vous donner un contact rapide, une lecture claire du besoin et une prise en charge adaptee au terrain, sans complexite inutile."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="process-step">
                <span className="process-index">0{index + 1}</span>
                <p className="mt-4 text-base font-semibold text-black">{step.title}</p>
                <p className="mt-3 text-sm leading-7 text-black/66">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Renovation d habitat"
              title="Renovation, remplacement et remise en etat avec une lecture terrain plus claire."
              description="L equipe GIB intervient sur l ile pour l habitat principal, les villas, les bungalows et certains sites professionnels avec une logique concrete : proteger, remettre en etat, fiabiliser et ameliorer le confort."
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
              eyebrow="Confiance"
              title="Des reperes concrets pour vous sentir en confiance plus vite."
              description="Au lieu de promesses vagues, GIB met en avant ce qui compte vraiment pour un prospect local : presence reelle, prise en charge simple, adaptation climat et contact direct."
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
            title="Telephone, WhatsApp, devis : un contact simple et local."
            description="Le bon modele reste direct : vous appelez, vous envoyez vos photos ou vous demandez un devis, puis GIB vous recontacte pour cadrer l intervention."
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
