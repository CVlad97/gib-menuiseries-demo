import { ArrowRight, CheckCircle2, Download, FileText, Mail, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { company } from '../lib/content'

const capabilities = [
  'Menuiserie aluminium',
  'Portails, clotures et garde-corps',
  'Volets roulants et fermetures',
  'Portes, fenetres et baies vitrees',
  'Pergolas et amenagements exterieurs',
  'Renovation, remplacement, reglage et depannage',
]

const dossierItems = [
  'Presentation GIB Menuiseries Services',
  'Zone d intervention : Ducos et toute la Martinique',
  'Prestations et familles de travaux',
  'Methode de prise de mesures, preparation et pose',
  'References photos et realisations a completer',
  'Pieces administratives a valider avant depot officiel',
]

const downloadLinks = [
  {
    label: 'Tableau suivi appels d offres CSV',
    href: withBase('docs/gib/suivi-appels-offres-gib.csv'),
    description: 'Modele de suivi pour classer les consultations, dates limites, pieces et statuts.',
  },
  {
    label: 'Checklist dossier entreprise',
    href: withBase('docs/gib/checklist-dossier-entreprise-gib.md'),
    description: 'Liste des documents administratifs et techniques a reunir.',
  },
  {
    label: 'Memoire technique type',
    href: withBase('docs/gib/memoire-technique-type-gib.md'),
    description: 'Trame de reponse a adapter a chaque CCTP et reglement de consultation.',
  },
  {
    label: 'Organismes a surveiller',
    href: withBase('docs/gib/organismes-martinique-a-surveiller.json'),
    description: 'Base de veille organismes, canaux et mots-cles.',
  },
]

export function CompanyDossierPage() {
  const tenderMessage = encodeURIComponent(
    [
      'Bonjour GIB, je souhaite transmettre ou preparer un dossier entreprise pour un appel d offres.',
      'Organisme :',
      'Objet :',
      'Date limite :',
      'Pieces deja disponibles :',
    ].join('\n'),
  )
  const tenderWhatsAppUrl = `https://wa.me/${company.whatsapp_number}?text=${tenderMessage}`

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <SectionHeading
            eyebrow="Dossier entreprise"
            title="Pack GIB pour repondre aux organismes et appels d offres."
            description="Cette page rassemble les elements utiles pour presenter GIB aux acheteurs publics, bailleurs, syndics, architectes, maitres d oeuvre et organismes locaux."
          />
          <div className="rounded-[1.7rem] border border-[#1398db]/14 bg-white p-5 shadow-[0_18px_40px_rgba(19,122,186,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f6ea7]">Contact AO</p>
            <p className="mt-3 text-sm leading-7 text-black/72">
              Pour un dossier travaux, envoyez l organisme, l objet, la date limite et les pieces deja disponibles. Le depot
              officiel reste a faire sur la plateforme indiquee par l acheteur.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="cta-primary" href={tenderWhatsAppUrl} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                WhatsApp AO
              </a>
              <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={`tel:${company.commercial_phone_international}`}>
                <PhoneCall className="size-4 text-[#1398db]" />
                {company.commercial_phone_display}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Positionnement"
            title="GIB Menuiseries Services."
            description="Entreprise basee a Ducos, positionnee sur les menuiseries, fermetures, renovation et depannage en Martinique."
          />
          <div className="mt-6 grid gap-3">
            {dossierItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border border-[#1398db]/12 bg-white p-4 text-sm leading-6 text-black/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#2f9c83]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Prestations"
            title="Familles de travaux a mettre en avant."
            description="Ces prestations servent au discours commercial, a la recherche de consultations et a la preparation du memoire technique."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability} className="rounded-[1.25rem] border border-[#1398db]/12 bg-[#eef8ff] p-4 text-sm font-semibold text-[#0f6ea7]">
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Telechargements"
          title="Modeles de travail pour la veille et les reponses."
          description="Ces documents sont volontairement generiques. Ils doivent etre completes avec les informations officielles GIB avant un depot reel."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {downloadLinks.map((link) => (
            <a
              key={link.href}
              className="group rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5 text-black transition hover:-translate-y-1 hover:border-[#1398db]/28 hover:shadow-[0_18px_34px_rgba(19,122,186,0.12)]"
              download
              href={link.href}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 size-5 shrink-0 text-[#1398db]" />
                  <p className="font-semibold">{link.label}</p>
                </div>
                <Download className="size-4 text-[#1398db] transition group-hover:translate-y-0.5" />
              </div>
              <p className="mt-3 text-sm leading-6 text-black/62">{link.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <span className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Prochaine action</span>
            <h2 className="section-title mt-3 text-white">Completer les preuves avant depot officiel.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              Les modeles donnent la structure. Il faut maintenant ajouter les vraies attestations, assurances, references,
              certifications validees et photos de realisations autorisees.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="cta-whatsapp" to="/appels-offres">
              <ShieldCheck className="size-4" />
              Voir la veille AO
            </Link>
            <a className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" href={`mailto:${company.email}`}>
              <Mail className="size-4" />
              Envoyer les pieces
            </a>
            <Link className="cta-secondary !border-white/25 !bg-white/10 !text-white" to="/devis">
              <ArrowRight className="size-4" />
              Devis client
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
