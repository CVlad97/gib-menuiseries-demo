import { ClipboardCheck, Download, ExternalLink, FileCheck2, Mail, MessageCircle, PhoneCall, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { company } from '../lib/content'

const steps = [
  {
    title: '1. Verifier que le marche est ouvert',
    details: 'Controler la date limite, le type d avis, le profil acheteur, la plateforme et la possibilite de retirer le DCE.',
  },
  {
    title: '2. Identifier le lot utile',
    details: 'Chercher menuiserie, fermeture, cloture, portail, garde-corps, renovation, second oeuvre ou amenagement exterieur.',
  },
  {
    title: '3. Lire le reglement de consultation',
    details: 'Verifier visite obligatoire, questions autorisees, pieces demandees, format de depot et heure limite.',
  },
  {
    title: '4. Decider go / no-go',
    details: 'Repondre seulement si GIB a la capacite, le delai, les pieces administratives et un lot vraiment pertinent.',
  },
  {
    title: '5. Adapter le memoire technique',
    details: 'Ne jamais envoyer un modele brut. Adapter methode, moyens, planning, references et contraintes du site.',
  },
  {
    title: '6. Deposer sur la plateforme officielle',
    details: 'Aucun depot par e-mail sauf si le reglement le permet. Conserver accuse de depot et version finale.',
  },
]

const documents = [
  'Reglement de consultation',
  'CCTP / descriptif technique',
  'BPU / DPGF / DQE si fourni',
  'Acte d engagement',
  'DC1 et DC2',
  'Kbis, attestations fiscales et sociales',
  'Assurances RC / decennale si applicable',
  'Memoire technique GIB adapte',
  'References chantier autorisees',
  'Photos realisations utilisables',
]

const followUpPlan = [
  { timing: 'J-10 a J-7', action: 'Telecharger DCE, lire RC/CCTP, noter questions, verifier visite.' },
  { timing: 'J-6 a J-4', action: 'Decision go/no-go, collecte pieces, demande de precision si autorisee.' },
  { timing: 'J-3', action: 'Finaliser memoire technique et chiffrage. Controle pieces et signatures.' },
  { timing: 'J-1', action: 'Depot test si possible, verification format fichiers, relecture finale.' },
  { timing: 'Jour J', action: 'Depot officiel avant l heure limite. Telecharger accuse de reception.' },
  { timing: 'Apres depot', action: 'Suivre questions, notifications, attribution, retour acheteur et prochaines opportunites.' },
]

const emailTemplate = [
  'Bonjour,',
  '',
  'GIB Menuiseries Services, basee a Ducos, souhaite consulter les pieces de votre appel d offres concernant : [OBJET DU MARCHE].',
  '',
  'Pouvez-vous nous confirmer le profil acheteur officiel, le lien DCE et les modalites de questions/reponses prevues par le reglement de consultation ?',
  '',
  'Nous interviendrons uniquement via la procedure indiquee dans le DCE.',
  '',
  'Cordialement,',
  'GIB Menuiseries Services',
  '06 96 65 35 89',
  'contact@gibmenuiseries.com',
].join('\n')

const callScript = [
  'Bonjour, je vous appelle pour GIB Menuiseries Services a Ducos.',
  'Nous avons repere votre consultation [OBJET].',
  'Je souhaite simplement verifier le bon lien DCE / profil acheteur et savoir si une visite est obligatoire.',
  'Nous deposerons uniquement via la plateforme officielle indiquee.',
  'Pouvez-vous me confirmer le canal a utiliser pour les questions ?',
].join('\n')

function mailtoTemplate() {
  const subject = encodeURIComponent('Demande d acces DCE - GIB Menuiseries Services')
  const body = encodeURIComponent(emailTemplate)

  return `mailto:?subject=${subject}&body=${body}`
}

export function TenderMethodologyPage() {
  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          action={
            <div className="flex flex-wrap gap-3">
              <Link className="cta-primary" to="/prospection-locale">
                <ClipboardCheck className="size-4" />
                Dashboard prospection
              </Link>
              <Link className="cta-secondary" to="/admin-appels-offres">
                Suivi AO
              </Link>
            </div>
          }
          description="Methode operationnelle pour passer d une opportunite BOAMP a une reponse propre, legale et suivie."
          eyebrow="Methode AO"
          light
          title="Repondre aux appels d offres ouverts sans perdre de temps."
        />
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Process"
          title="La methode en 6 etapes."
          description="Chaque opportunite doit passer par ces controles avant mobilisation commerciale ou technique."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5">
              <h3 className="text-lg font-semibold text-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/66">{step.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Pieces"
            title="Checklist avant reponse."
            description="Ne pas deposer si une piece obligatoire manque."
          />
          <div className="mt-6 grid gap-3">
            {documents.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-[#1398db]/12 bg-white p-4 text-sm text-black/70">
                <FileCheck2 className="mt-0.5 size-4 shrink-0 text-[#2f9c83]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Planning"
            title="Suivi jusqu au depot."
            description="Le risque principal est de sous-estimer le temps de collecte des pieces et de depot plateforme."
          />
          <div className="mt-6 space-y-3">
            {followUpPlan.map((item) => (
              <div key={item.timing} className="rounded-[1.2rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]">{item.timing}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{item.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="E-mail"
            title="Message de demande DCE."
            description="A utiliser uniquement si le reglement ou l avis permet de contacter l acheteur. Sinon, passer par la plateforme."
          />
          <pre className="mt-6 whitespace-pre-wrap rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5 text-sm leading-7 text-black/72">{emailTemplate}</pre>
          <a className="cta-primary mt-5" href={mailtoTemplate()}>
            <Mail className="size-4" />
            Ouvrir e-mail
          </a>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Appel"
            title="Script telephone court."
            description="Objectif : verifier le bon canal, pas negocier hors procedure."
          />
          <pre className="mt-6 whitespace-pre-wrap rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5 text-sm leading-7 text-black/72">{callScript}</pre>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="cta-primary" href={`tel:${company.commercial_phone_international}`}>
              <PhoneCall className="size-4" />
              Appeler GIB
            </a>
            <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              WhatsApp interne
            </a>
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Modeles"
          title="Documents utiles."
          description="Ces fichiers servent de base, mais doivent etre completes avec les vraies pieces GIB."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="cta-secondary" download href={withBase('docs/gib/suivi-appels-offres-gib.csv')}>
            <Download className="size-4" />
            Tableau CSV
          </a>
          <a className="cta-secondary" download href={withBase('docs/gib/memoire-technique-type-gib.md')}>
            <Download className="size-4" />
            Memoire technique
          </a>
          <a className="cta-secondary" download href={withBase('docs/gib/checklist-dossier-entreprise-gib.md')}>
            <Download className="size-4" />
            Checklist dossier
          </a>
          <Link className="cta-primary" to="/dossier-entreprise">
            <ExternalLink className="size-4" />
            Dossier entreprise
          </Link>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-amber-300/35 bg-amber-50 px-5 py-5 text-sm leading-7 text-amber-950">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 size-4 shrink-0" />
          <p>
            Regle stricte : ne pas envoyer d offre hors plateforme si le reglement impose un depot dematerialise. Ne pas inventer
            de garantie, certification, delai ou reference. Toute reponse doit etre relue et validee humainement avant depot.
          </p>
        </div>
      </section>
    </div>
  )
}
