import { ArrowRight, BadgeCheck, Mail, MessageCircle, PhoneCall, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company } from '../lib/content'

const logoSrc =
  'https://le-de.cdn-website.com/179f7a3a04c5410bb41d060e3efd0cfd/dms3rep/multi/opt/logo+gib-fe923f67-381w.PNG'

const heroMainImage = 'media/gib/pergola-ambiance-1.jpg'
const heroSupportImages = [
  {
    label: 'Garde-corps',
    src: 'media/gib/garde-corps-portillon.jpg',
    alt: 'Garde-corps et portillon installes par GIB en Martinique.',
  },
  {
    label: 'Terrasse / toiture',
    src: 'media/gib/terrasse-thermotop.jpg',
    alt: 'Terrasse et toiture exterieure realisees par GIB en Martinique.',
  },
]

const heroTrustMarkers = ['Ducos', 'Intervention Martinique', 'RGE / Qualicoat']

const fieldProofs = [
  'Prise de mesures sur chantier',
  'Devis precis avant travaux',
  'Remplacement, depannage et reglage',
  'Solutions exterieures climat tropical',
]

const beforeAfterSteps = [
  {
    label: 'Avant',
    title: 'Un besoin a clarifier',
    text: 'Vous envoyez des photos, la commune et le probleme : ouverture abimee, volet bloque, terrasse trop exposee, projet de renovation.',
    image: 'media/gib/volet-ambiance-2.jpeg',
  },
  {
    label: 'Apres',
    title: 'Une solution mieux cadree',
    text: 'GIB vous oriente vers la bonne action : regler, depanner, remplacer, poser ou preparer un devis sur mesure.',
    image: 'media/gib/baie-coulissante.jpg',
  },
]

const trustItems = [
  'Certifiee RGE',
  'Qualicoat (vernis marin)',
  '+ 20 ans d experience',
  'Accompagnement sur mesure',
]

const diagnosticItems = ['Amiante', 'Termites', 'Electricite', 'Energie']

export function HomePage() {
  return (
    <div className="space-y-7 sm:space-y-8">
      <section className="shell pt-6 sm:pt-8 lg:pt-10">
        <div className="hero-panel rounded-[1.55rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
            <div className="space-y-4">
              <img alt="Logo GIB Menuiseries Services" className="h-14 w-auto max-w-full sm:h-16" src={logoSrc} />
              <p className="eyebrow !bg-[#1398db]/10 !text-[#0f6ea7] !border-[#1398db]/20">Accueil</p>
              <h1 className="page-title max-w-4xl text-[var(--text-dark)]">
                Menuiserie aluminium, renovation et depannage en Martinique
              </h1>
              <p className="max-w-3xl text-[0.98rem] leading-7 text-black/72 sm:text-[1.03rem]">
                Pour une construction, une renovation ou un depannage, GIB vous accompagne avec plus de 20 ans d experience en Martinique.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {heroTrustMarkers.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#1398db]/18 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f6ea7] shadow-[0_8px_20px_rgba(19,122,186,0.08)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-1 flex flex-wrap gap-3">
                <Link className="cta-primary" to="/contact">
                  <ArrowRight className="size-4" />
                  Prendre un rendez-vous
                </Link>
                <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={`tel:${company.phone_international}`}>
                  <PhoneCall className="size-4 text-[#1398db]" />
                  Appeler
                </a>
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </div>
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                {fieldProofs.map((item) => (
                  <span
                    key={item}
                    className="rounded-[1rem] border border-[#1398db]/14 bg-white/86 px-3 py-2 text-[0.8rem] font-semibold leading-5 text-black/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <article className="overflow-hidden rounded-[1.45rem] border border-[#1398db]/18 bg-white shadow-[0_16px_34px_rgba(19,122,186,0.12)]">
                <img
                  alt="Pergola bioclimatique et confort exterieur installes par GIB en Martinique."
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                  src={heroMainImage}
                />
                <div className="space-y-2 px-4 py-4 sm:px-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#0f6ea7]/80">Pergola / toit ouvert</p>
                  <p className="text-base font-semibold leading-6 text-black sm:text-[1.05rem]">
                    Terrasse, ombre, securite et confort exterieur pour une maison mieux adaptee au climat martiniquais.
                  </p>
                </div>
              </article>

              <div className="grid gap-3 sm:grid-cols-2">
                {heroSupportImages.map((image) => (
                  <article
                    key={image.label}
                    className="overflow-hidden rounded-[1.2rem] border border-[#1398db]/16 bg-white shadow-[0_12px_24px_rgba(19,122,186,0.09)]"
                  >
                    <img alt={image.alt} className="h-36 w-full object-cover" src={image.src} />
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-black">{image.label}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow">Menuiserie aluminium</span>
          <h2 className="section-title mt-3 text-[var(--text-dark)]">
            L installation de vos menuiseries avec l intervention d artisans certifies RGE
          </h2>
          <div className="mt-4 space-y-3 text-[0.96rem] leading-7 text-black/72">
            <p>GIB est a votre ecoute pour la pose de menuiserie en aluminium sur toute l ile !</p>
            <p>
              Avec plus de 20 ans d experience, un large savoir-faire et de nombreuses connaissances, notre professionnel GIB vous propose la pose et la renovation de vos ouvrages exterieurs.
            </p>
            <p>
              Nous intervenons chez vous pour prendre les mesures et les contraintes de vos menuiseries afin de vous etablir un devis precis. Nous vous proposons un large choix de menuiseries en aluminium grace a notre fournisseur SEPALUMIC, reconnu comme pionnier dans l aluminium.
            </p>
            <p>
              Avec de nombreuses options de personnalisation, vous pouvez obtenir des produits sur mesure et harmoniser l ensemble de vos amenagements exterieurs comme vous le souhaitez.
            </p>
            <p>
              De plus, nous sommes certifies RGE et Qualicoat (vernis marin) pour vous garantir la perennite de nos ouvrages. GIB intervient rapidement pour :
            </p>
          </div>
          <ul className="mt-4 grid gap-2.5 text-[0.95rem] leading-7 text-black/72 sm:grid-cols-3">
            {['le remplacement', 'le depannage', 'le reglage de vos appareils'].map((item) => (
              <li key={item} className="rounded-[1.1rem] border border-[#1398db]/14 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(241,250,255,0.94))] px-4 py-3.5 font-semibold text-[var(--text-dark)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow">Renovation d habitat</span>
          <h2 className="section-title mt-3 text-[var(--text-dark)]">
            La renovation interieure et exterieure de vos habitations par notre equipe d artisans
          </h2>
          <div className="mt-4 space-y-3 text-[0.96rem] leading-7 text-black/72">
            <p>L equipe d artisans de GIB intervient sur toute l ile pour des maisons et des bungalows !</p>
            <p>
              Nous effectuons la renovation d habitat pour assurer votre confort toute l annee ! En effet, nous vous proposons le diagnostic de votre couverture, mais aussi des elements qui la constituent afin de preserver votre confort thermique.
            </p>
            <p>
              Nous sommes en mesure de remplacer et de poser les differents elements de votre toiture. Nous veillons egalement a ce que cette derniere puisse efficacement remplir son role en realisant un traitement d etancheite.
            </p>
            <p>
              De plus, en fonction de vos besoins, nos artisans realisent la renovation complete de vos salles de bains ainsi que de vos revetements de sol. Nous vous proposons differentes finitions de carrelage pour un interieur personnalise.
            </p>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow">Confiance</span>
          <h2 className="section-title mt-3 text-[var(--text-dark)]">
            Faites confiance a une equipe d experts formes et qualifies
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item} className="rounded-[1.1rem] border border-[#1398db]/14 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(236,248,255,0.94))] p-4 text-center">
                <div className="mx-auto inline-flex size-10 items-center justify-center rounded-full bg-[#1398db]/12 text-[#1398db]">
                  <BadgeCheck className="size-5" />
                </div>
                <p className="mt-3 text-[0.98rem] font-semibold leading-6 text-black">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow">Avant / apres</span>
          <div className="mt-3 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-3">
              <h2 className="section-title text-[var(--text-dark)]">Voir clair avant de lancer les travaux.</h2>
              <p className="text-[0.96rem] leading-7 text-black/72">
                Le site aide le client a passer d un besoin flou a une demande claire : photos, probleme, commune, puis appel ou devis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link className="cta-primary" to="/devis">
                  Demander un devis
                </Link>
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  Envoyer des photos
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {beforeAfterSteps.map((step) => (
                <article key={step.label} className="overflow-hidden rounded-[1.25rem] border border-[#1398db]/14 bg-white shadow-[0_14px_28px_rgba(19,122,186,0.08)]">
                  <img alt={`${step.label} projet GIB`} className="h-44 w-full object-cover" src={step.image} />
                  <div className="space-y-2 p-4">
                    <span className="tag !bg-[#1398db]/10 !text-[#0f6ea7]">{step.label}</span>
                    <h3 className="font-[Marcellus] text-xl leading-tight text-black">{step.title}</h3>
                    <p className="text-sm leading-6 text-black/68">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow !border-white/18 !bg-white/10 !text-white/86">Diagnostic immobilier</span>
          <h2 className="section-title mt-3 text-[var(--text)]">
            Nous diagnostiquons l ensemble de vos biens immobiliers avant une vente ou des travaux
          </h2>
          <div className="mt-4 space-y-3 text-[0.96rem] leading-7 text-white/78">
            <p>GIB intervient dans le diagnostic immobilier de vos biens sur toute l ile !</p>
            <p>
              Il est primordial de s assurer de l integrite d un bien lorsque celui-ci est destine a etre vendu ou renove. Le but est d eviter d eventuels problemes a l avenir. Pour cela, notre entreprise GIB vous propose d effectuer un diagnostic immobilier complet.
            </p>
            <p>Nous realisons divers diagnostics pour :</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {diagnosticItems.map((item) => (
              <div key={item} className="rounded-[1.1rem] border border-white/12 bg-white/[0.12] p-4 text-center">
                <p className="text-base font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <div className="surface-panel rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mt-3 text-[var(--text-dark)]">
            GIB Menuiseries Services, situe a Ducos, intervient sur toute la Martinique.
          </h2>
          <div className="mt-4 space-y-3 text-[0.96rem] leading-7 text-black/72">
            <p>
              GIB est disponible par telephone au 0596737219 ou par e-mail a contact@gibmenuiseries.com pour parler de votre projet.
            </p>
            <p>Vous souhaitez profiter des services de nos menuisiers pour un projet de construction ou de renovation ?</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.phone_international}`}>
              <PhoneCall className="size-4" />
              0596737219
            </a>
            <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={`mailto:${company.email}`}>
              <Mail className="size-4 text-[#1398db]" />
              contact@gibmenuiseries.com
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <Link className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" to="/contact">
              Contactez nous
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-black/66">
            <span className="contact-pill">Zone Cocotte, Ducos, 97224</span>
            <span className="contact-pill">Martinique</span>
            <a className="cta-secondary !px-4 !py-2 !text-sm !font-semibold !border-[#1398db]/18 !text-[#0f6ea7]" href={company.youtube_url} rel="noreferrer" target="_blank">
              <PlayCircle className="size-4 text-[#1398db]" />
              Video
            </a>
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <div className="glass-panel-strong rounded-[1.45rem] px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow !border-white/18 !bg-white/10 !text-white/86">Video</span>
              <h2 className="section-title mt-3 text-white">Voir les realisations et l ambiance GIB.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/76 sm:text-base">
                Un espace video permet de montrer les chantiers, les produits poses et le serieux de l entreprise avant un rendez-vous.
              </p>
            </div>
            <a className="cta-secondary !border-white/20 !bg-white/90 !text-[#0f6ea7]" href={company.youtube_url} rel="noreferrer" target="_blank">
              <PlayCircle className="size-4" />
              Ouvrir la video
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
