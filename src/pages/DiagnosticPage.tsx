import { ArrowRight, CheckCircle2, Mail, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { company } from '../lib/content'

const diagnostics = ['Amiante', 'Termites', 'Electricite', 'Energie']

export function DiagnosticPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Diagnostic immobilier"
          title="Nous diagnostiquons l ensemble de vos biens immobiliers avant une vente ou des travaux."
          description="GIB intervient dans le diagnostic immobilier de vos biens sur toute l ile. Le but est d eviter d eventuels problemes a l avenir avant une vente, une renovation ou des travaux."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {diagnostics.map((item) => (
            <div key={item} className="rounded-[1.6rem] border border-[#1398db]/12 bg-[#eef8ff] p-5 text-center">
              <p className="text-base font-semibold text-[#132534]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Quand le proposer"
            title="Un service connexe, mais bien reel dans l offre GIB."
            description="Ce service devient pertinent si vous preparez la vente d un bien immobilier ou des travaux dans celui-ci. La logique reste simple : appel, qualification, puis orientation vers le bon diagnostic."
          />
          <div className="mt-8 grid gap-3">
            {[
              'Avant une vente immobiliere',
              'Avant des travaux de renovation',
              'Pour controler l integrite du bien',
              'Pour orienter correctement la suite du projet',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-[#1398db]/12 bg-white p-4 text-sm leading-7 text-black/72">
                <CheckCircle2 className="mt-1 size-4 text-[#1398db]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Contact simple"
            title="Appeler, ecrire ou demander un devis d orientation."
            description="Comme sur le site officiel, le contact reste volontairement direct et local depuis Zone Cocotte a Ducos."
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
            <Link className="cta-secondary" to="/devis">
              <ArrowRight className="size-4" />
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
