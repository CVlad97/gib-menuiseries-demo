import { ArrowRight, BadgeCheck, Mail, MessageCircle, PhoneCall, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company } from '../lib/content'

const logoSrc =
  'https://le-de.cdn-website.com/179f7a3a04c5410bb41d060e3efd0cfd/dms3rep/multi/opt/logo+gib-fe923f67-381w.PNG'

const trustItems = [
  'Certifiee RGE',
  'Qualicoat (vernis marin)',
  '+ 20 ans d experience',
  'Accompagnement sur mesure',
]

const diagnosticItems = ['Amiante', 'Termites', 'Electricite', 'Energie']

export function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="shell pt-8 sm:pt-12 lg:pt-14">
        <div className="hero-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-5">
              <img alt="Logo GIB Menuiseries Services" className="h-16 w-auto max-w-full sm:h-18" src={logoSrc} />
              <p className="eyebrow !bg-[#1398db]/10 !text-[#0f6ea7] !border-[#1398db]/20">Accueil</p>
              <h1 className="section-title max-w-4xl text-[var(--text-dark)]">
                GIB Menuiseries Services : notre equipe de menuisiers situee a Ducos 97200
              </h1>
              <p className="max-w-3xl text-base leading-8 text-black/72 sm:text-lg">
                Concretisez vos projets de construction et de renovation en faisant appel a nos experts ! Artisans depuis 20 ans, nos menuisiers sont a votre ecoute.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link className="cta-primary" to="/contact">
                  <ArrowRight className="size-4" />
                  Prendre un rendez-vous
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#1398db]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(233,247,255,0.94))] p-6 shadow-[0_18px_42px_rgba(19,122,186,0.1)]">
              <p className="text-xs uppercase tracking-[0.24em] text-[#0f6ea7]/80">Menuiserie aluminium</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-black/72">
                <p>GIB est a votre ecoute pour la pose de menuiserie en aluminium sur toute l ile !</p>
                <p>
                  Avec plus de 20 ans d experience, un large savoir-faire et de nombreuses connaissances, notre professionnel GIB vous propose la pose et la renovation de vos ouvrages exterieurs.
                </p>
                <p>
                  De plus, nous sommes certifies RGE et Qualicoat (vernis marin) pour vous garantir la perennite de nos ouvrages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <span className="eyebrow">Menuiserie aluminium</span>
          <h2 className="section-title mt-4 text-[var(--text-dark)]">
            L installation de vos menuiseries avec l intervention d artisans certifies RGE
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/72 sm:text-base">
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
          <ul className="mt-5 grid gap-3 text-sm leading-7 text-black/72 sm:grid-cols-3 sm:text-base">
            {['le remplacement', 'le depannage', 'le reglage de vos appareils'].map((item) => (
              <li key={item} className="rounded-[1.35rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(239,249,255,0.92))] px-4 py-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <span className="eyebrow">Renovation d habitat</span>
          <h2 className="section-title mt-4 text-[var(--text-dark)]">
            La renovation interieure et exterieure de vos habitations par notre equipe d artisans
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/72 sm:text-base">
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
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <span className="eyebrow">Confiance</span>
          <h2 className="section-title mt-4 text-[var(--text-dark)]">
            Faites confiance a une equipe d experts formes et qualifies
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(233,246,255,0.92))] p-5 text-center">
                <div className="mx-auto inline-flex size-11 items-center justify-center rounded-full bg-[#1398db]/10 text-[#1398db]">
                  <BadgeCheck className="size-5" />
                </div>
                <p className="mt-4 text-base font-semibold text-black">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <span className="eyebrow !border-white/18 !bg-white/10 !text-white/86">Diagnostic immobilier</span>
          <h2 className="section-title mt-4 text-[var(--text)]">
            Nous diagnostiquons l ensemble de vos biens immobiliers avant une vente ou des travaux
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-white/78 sm:text-base">
            <p>GIB intervient dans le diagnostic immobilier de vos biens sur toute l ile !</p>
            <p>
              Il est primordial de s assurer de l integrite d un bien lorsque celui-ci est destine a etre vendu ou renove. Le but est d eviter d eventuels problemes a l avenir. Pour cela, notre entreprise GIB vous propose d effectuer un diagnostic immobilier complet.
            </p>
            <p>Nous realisons divers diagnostics pour :</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {diagnosticItems.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/12 bg-white/[0.12] p-5 text-center">
                <p className="text-base font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <div className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mt-4 text-[var(--text-dark)]">
            GIB Menuiserie, situe a Ducos, intervient sur toute la Martinique.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/72 sm:text-base">
            <p>
              Votre professionnel GIB est disponible par telephone au numero suivant 0596737219 ou par e-mail contact@gibmenuiseries.com pour concretiser l ensemble de vos projets.
            </p>
            <p>Vous souhaitez profiter des services de nos menuisiers pour un projet de construction ou de renovation ?</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
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
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-black/66">
            <span className="contact-pill">Zone Cocotte, Ducos</span>
            <span className="contact-pill">Martinique</span>
            <a className="cta-secondary !px-4 !py-2 !text-sm !font-semibold !border-[#1398db]/18 !text-[#0f6ea7]" href={company.youtube_url} rel="noreferrer" target="_blank">
              <PlayCircle className="size-4 text-[#1398db]" />
              Video
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
