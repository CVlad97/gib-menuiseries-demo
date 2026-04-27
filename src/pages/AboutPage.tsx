import { ArrowRight, BadgeCheck, Mail, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { company } from '../lib/content'

const certifications = [
  'Laquage conforme a la norme NF P 24 351',
  'Qualite selon la norme ISO 9001',
  'Securite selon la norme OHSAS 18001',
  'Environnement selon la norme ISO 14001',
]

export function AboutPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="A propos"
          title="Notre entreprise de menuiserie : GIB Menuiseries Services a Ducos."
          description="Notre entreprise s attache a vous proposer des solutions performantes et innovantes qui repondent aux normes de securite et ecologiques. Soyez accompagne et conseille par une equipe d experts formes et qualifies."
          action={
            <Link className="cta-primary" to="/devis">
              <ArrowRight className="size-4" />
              Demander un devis
            </Link>
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Direction"
            title="Une entreprise locale, directe et orientee resultat."
            description="M. Olivier GIBOYAU s appuie sur plus de 20 ans d experience en menuiserie aluminium pour accompagner les projets de construction, de renovation et de remplacement en Martinique."
          />
          <div className="mt-8 grid gap-4">
            <article className="rounded-[1.6rem] border border-[#1398db]/12 bg-[#eef8ff] p-5 text-sm leading-7 text-[#135987]/78">
              En relation directe avec les donneurs d ordre publics et prives, GIB accompagne les particuliers, les professionnels et les coproprietes sur toute la Martinique depuis Zone Cocotte a Ducos.
            </article>
            <article className="rounded-[1.6rem] border border-[#1398db]/12 bg-[#eef8ff] p-5 text-sm leading-7 text-[#135987]/78">
              Notre principal fournisseur SEPALUMIC est base en France depuis plus de 44 ans et fait partie des pionniers de l aluminium. Ce partenariat nous permet de proposer des solutions performantes et durables.
            </article>
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Certifications"
            title="Des reperes simples pour faire confiance."
            description="GIB dispose de plusieurs certifications et s appuie sur des produits francais pour garantir qualite, durabilite et serieux d execution."
          />
          <div className="mt-8 grid gap-3">
            {certifications.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-[#1398db]/12 bg-white p-4 text-sm leading-7 text-black/72">
                <BadgeCheck className="mt-1 size-4 text-[#e12726]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Offres historiques"
          title="Volet roulant, porte, fenetre, cloture, pergola, baie vitree, portail et diagnostic immobilier."
          description="Notre entreprise assure la pose de volet roulant, porte, fenetre, cloture, pergola, baie vitree, store et portail sur toute l ile, avec une logique simple : ecouter, conseiller, mesurer et etablir un devis precis."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="cta-primary" href={`tel:${company.phone_international}`}>
            <PhoneCall className="size-4" />
            Appeler
          </a>
          <a className="cta-secondary" href={`mailto:${company.email}`}>
            <Mail className="size-4" />
            Ecrire
          </a>
          <Link className="cta-secondary" to="/produits">
            Voir les offres
          </Link>
        </div>
      </section>
    </div>
  )
}
