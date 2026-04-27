import { Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { company } from '../lib/content'

export function ContactPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          eyebrow="Contact"
          title="Contactez GIB Menuiseries Services, nos artisans menuisiers a Ducos."
          description="Contactez notre entreprise specialisee en menuiserie d aluminium. Nous intervenons depuis plus de 20 ans sur toute l ile pour assurer vos installations, vos travaux de renovation et vos diagnostics immobiliers."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Informations complementaires"
            title="Telephone, e-mail, adresse et zone d intervention."
            description="La structure reste volontairement simple et fidele au site officiel : appeler, ecrire, situer l entreprise et comprendre la zone d intervention."
          />
          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Telephone</p>
              <a className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-black" href={`tel:${company.phone_international}`}>
                <PhoneCall className="size-4 text-[#e12726]" />
                {company.phone_display}
              </a>
            </div>
            <div className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">WhatsApp Business</p>
              <a className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-black" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4 text-[#42a97d]" />
                {company.whatsapp_display}
              </a>
              <p className="mt-3 text-sm leading-6 text-black/62">
                Envoyez vos photos, la commune, les dimensions approximatives et une courte description du besoin.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">E-mail</p>
              <a className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-black" href={`mailto:${company.email}`}>
                <Mail className="size-4 text-[#1398db]" />
                {company.email}
              </a>
            </div>
            <div className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Adresse</p>
              <p className="mt-3 inline-flex items-start gap-2 text-base font-semibold text-black">
                <MapPin className="mt-1 size-4 text-[#ffd400]" />
                Zone Cocotte, Ducos, 97224, Martinique
              </p>
            </div>
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Horaires et services"
            title="Du lundi au vendredi, avec une logique de contact direct."
            description="Notre professionnel GIB intervient sur toute l ile pour l installation de menuiserie en aluminium, la renovation d habitat et les diagnostics immobiliers."
          />
          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5 text-sm leading-7 text-black/72">
              <p className="font-semibold text-black">Heures d ouverture</p>
              <p className="mt-3">Lun - Jeu : 07:00 - 15:30</p>
              <p>Vendredi : 07:00 - 14:00</p>
              <p>Sam - Dim : Ferme</p>
            </div>
            <div className="rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5 text-sm leading-7 text-black/72">
              Installation de menuiserie en aluminium, renovation d habitat, depannage express, remplacement, reglage et diagnostic immobilier sur toute la Martinique.
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="cta-primary" to="/devis">
                Demander un devis
              </Link>
              <Link className="cta-secondary" to="/diagnostic-immobilier">
                Diagnostic immobilier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
