import { ArrowUpRight, Building2, CheckCircle2, ClipboardCheck, FileSearch, Mail, MessageCircle, PhoneCall, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { company } from '../lib/content'

const platforms = [
  {
    name: 'PLACE - marches-publics.gouv.fr',
    scope: 'Services de l Etat, etablissements publics et organismes nationaux.',
    url: 'https://www.marches-publics.gouv.fr/',
  },
  {
    name: 'BOAMP',
    scope: 'Avis officiels de marches publics avec filtres Martinique et mots-cles metiers.',
    url: 'https://www.boamp.fr/pages/recherche/',
  },
  {
    name: 'e-marches Martinique',
    scope: 'Portail dedie aux consultations de collectivites et administrations de Martinique.',
    url: 'https://www.marches-securises.fr/perso/martinique/',
  },
  {
    name: 'Collectivite Territoriale de Martinique',
    scope: 'Profil acheteur CTM, consultations, DCE et depots de reponses.',
    url: 'https://collectiviteterritorialedemartinique.achatpublic.com/sdm/ent/gen/ent_recherche.do',
  },
  {
    name: 'CCI Martinique',
    scope: 'Marches de la CCI et informations pratiques pour repondre aux consultations.',
    url: 'https://www.martinique.cci.fr/ccim-marches-publics.aspx',
  },
  {
    name: 'Grand Port Maritime de la Martinique',
    scope: 'Marches publics et consultations lies aux installations portuaires.',
    url: 'https://www.martinique.port.fr/marche_public.aspx',
  },
]

const targetBuyers = [
  'Etat et services deconcentres',
  'Collectivite Territoriale de Martinique',
  'Communes et communautes d agglomeration',
  'Etablissements scolaires et hospitaliers',
  'Bailleurs sociaux et residences',
  'Syndics de copropriete',
  'Grand Port, aeroport, offices et etablissements publics',
  'Architectes, bureaux d etudes et maitres d oeuvre',
]

const watchKeywords = [
  'menuiserie aluminium',
  'menuiseries exterieures',
  'fermetures',
  'volets roulants',
  'portes et fenetres',
  'garde-corps',
  'clotures',
  'portails',
  'serrurerie metallerie',
  'renovation batiment',
  'second oeuvre',
  'travaux tous corps d etat',
]

const weeklyActions = [
  'Scanner les plateformes officielles avec les mots-cles metiers et le filtre Martinique 972.',
  'Telecharger uniquement les DCE pertinents et noter la date limite, les lots, les pieces exigees et la visite obligatoire.',
  'Qualifier vite : capacite technique, delai, distance, references, besoin de cotraitance ou sous-traitance.',
  'Appeler l acheteur uniquement via les canaux autorises par le reglement de consultation.',
  'Preparer un dossier propre : DC1, DC2, attestations, assurances, memoire technique, references, photos chantier.',
]

const responsePack = [
  'Presentation GIB : Ducos, intervention Martinique, menuiserie aluminium, renovation et depannage.',
  'References photos : portails, volets, fenetres, baies vitrees, pergolas, clotures et garde-corps.',
  'Moyens humains et techniques : atelier, equipe, vehicule, methode de pose et suivi chantier.',
  'Methode chantier : reperage, prise de mesures, validation technique, fabrication, pose, controle et reception.',
  'Limites a confirmer : garanties, certifications, assurances et references nominatives avant depot officiel.',
]

const qualificationSteps = [
  {
    title: 'Detecter',
    text: 'Repérer les avis avec filtre Martinique, mots-cles menuiserie, fermetures, renovation, second oeuvre et garde-corps.',
  },
  {
    title: 'Qualifier',
    text: 'Verifier la date limite, le lot, la visite obligatoire, les pieces, les capacites et la pertinence pour GIB.',
  },
  {
    title: 'Decider',
    text: 'Classer en go / no-go : seul, cotraitance, sous-traitance, demande de precision ou abandon.',
  },
  {
    title: 'Repondre',
    text: 'Adapter le memoire technique, joindre les attestations validees et deposer uniquement sur le profil acheteur.',
  },
]

const scoringRules = [
  'Metier principal GIB present dans le lot : +3',
  'Intervention en Martinique accessible : +2',
  'Delai compatible avec approvisionnement et pose : +2',
  'Pieces administratives deja disponibles : +1',
  'Visite obligatoire possible : +1',
  'References comparables disponibles : +1',
  'Score 7 a 10 : prioritaire. Score 4 a 6 : a qualifier. Score 0 a 3 : faible priorite.',
]

const tenderExamples = [
  {
    target: 'Collectivite / commune',
    object: 'Remplacement de menuiseries exterieures sur batiment communal',
    fit: 'Fort',
    action: 'Telecharger DCE, verifier visite et quantitatif.',
  },
  {
    target: 'Bailleur / residence',
    object: 'Pose ou remplacement de volets roulants et fermetures',
    fit: 'Fort',
    action: 'Identifier lots, delais, acces logements et references.',
  },
  {
    target: 'Maitre d oeuvre',
    object: 'Consultation entreprise pour lot garde-corps / clotures',
    fit: 'Moyen a fort',
    action: 'Proposer dossier entreprise et references photos.',
  },
]

export function TendersPage() {
  const publicTenderMessage = encodeURIComponent(
    [
      'Bonjour GIB, je souhaite echanger sur un appel d offres / marche public en Martinique.',
      'Organisme :',
      'Objet du marche :',
      'Date limite :',
      'Lien ou reference :',
      'Besoin : menuiserie / fermeture / renovation / garde-corps / autre',
    ].join('\n'),
  )
  const whatsappTenderUrl = `https://wa.me/${company.whatsapp_number}?text=${publicTenderMessage}`

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="surface-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <SectionHeading
            eyebrow="Appels d offres Martinique"
            title="Veille marches publics, organismes et dossiers travaux pour GIB."
            description="Cette page sert a positionner GIB sur les consultations publiques et les opportunites d organismes : Etat, collectivites, bailleurs, syndics, etablissements publics, architectes et maitres d oeuvre."
          />
          <div className="rounded-[1.7rem] border border-[#1398db]/14 bg-white p-5 shadow-[0_18px_40px_rgba(19,122,186,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f6ea7]">Objectif commercial</p>
            <p className="mt-3 text-sm leading-7 text-black/72">
              Aspirer les appels d offres ne veut pas dire scraper ou spammer. Le bon systeme est une veille legale, des alertes
              mots-cles et un dossier GIB pret a repondre rapidement aux marches pertinents.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="cta-primary" href={whatsappTenderUrl} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                Envoyer un AO
              </a>
              <Link className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" to="/dossier-entreprise">
                <FileSearch className="size-4 text-[#1398db]" />
                Dossier GIB
              </Link>
              <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={`tel:${company.commercial_phone_international}`}>
                <PhoneCall className="size-4 text-[#1398db]" />
                Appeler GIB
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Cibles"
            title="Organismes a surveiller."
            description="Les opportunites peuvent venir de la commande publique, du logement, des infrastructures, du tourisme, des coproprietes et des maitres d oeuvre."
          />
          <div className="mt-6 grid gap-3">
            {targetBuyers.map((buyer) => (
              <div key={buyer} className="flex items-start gap-3 rounded-[1.2rem] border border-[#1398db]/12 bg-white p-4 text-sm text-black/72">
                <Building2 className="mt-0.5 size-4 shrink-0 text-[#1398db]" />
                <span>{buyer}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Sources"
            title="Plateformes de veille a ouvrir chaque semaine."
            description="Ces liens donnent acces aux consultations, avis, DCE ou profils acheteurs. Les depots doivent toujours respecter le reglement de consultation."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                className="group rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5 text-black transition hover:-translate-y-1 hover:border-[#1398db]/28 hover:shadow-[0_18px_34px_rgba(19,122,186,0.12)]"
                href={platform.url}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-semibold">{platform.name}</p>
                  <ArrowUpRight className="size-4 text-[#1398db] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-sm leading-6 text-black/62">{platform.scope}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Mots-cles"
          title="Alertes a creer pour capter les marches pertinents."
          description="La veille doit combiner les mots-cles metiers, le filtre Martinique 972 et les familles travaux / second oeuvre."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {watchKeywords.map((keyword) => (
            <span key={keyword} className="rounded-full border border-[#1398db]/14 bg-[#eef8ff] px-4 py-2 text-sm font-semibold text-[#0f6ea7]">
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Routine"
            title="Plan de veille hebdomadaire."
            description="Le gain de marche vient de la regularite : detection rapide, tri strict et dossier pret avant la date limite."
          />
          <div className="mt-6 space-y-3">
            {weeklyActions.map((action, index) => (
              <div key={action} className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]">Etape {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Dossier GIB"
            title="Pack de reponse a preparer."
            description="Ces elements accelerent les candidatures et les reponses aux lots menuiserie, fermeture, renovation ou second oeuvre."
          />
          <div className="mt-6 space-y-3">
            {responsePack.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4 text-sm leading-6 text-black/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#2f9c83]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel px-6 py-8 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Qualification"
          title="Pipeline simple pour transformer une annonce en opportunite."
          description="Le but est de ne pas perdre de temps : chaque appel d offres doit etre detecte, note, puis classe avant d engager une reponse."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {qualificationSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.35rem] border border-[#1398db]/12 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f6ea7]">Phase {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/66">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Scoring"
            title="Regle go / no-go rapide."
            description="Une opportunite doit etre notee avant de mobiliser du temps de preparation."
          />
          <div className="mt-6 space-y-2">
            {scoringRules.map((rule) => (
              <div key={rule} className="flex items-start gap-3 rounded-[1.15rem] border border-[#1398db]/12 bg-white p-4 text-sm leading-6 text-black/70">
                <ClipboardCheck className="mt-0.5 size-4 shrink-0 text-[#1398db]" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel overflow-hidden px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Exemples"
            title="Opportunites a rechercher en priorite."
            description="Ces exemples donnent le type d annonces a surveiller pour les prestations GIB."
          />
          <div className="mt-6 overflow-x-auto rounded-[1.35rem] border border-[#1398db]/12 bg-white">
            <table className="min-w-[720px] text-left text-sm">
              <thead className="bg-[#eef8ff] text-xs uppercase tracking-[0.18em] text-[#0f6ea7]">
                <tr>
                  <th className="px-4 py-3">Cible</th>
                  <th className="px-4 py-3">Objet probable</th>
                  <th className="px-4 py-3">Fit</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1398db]/10 text-black/70">
                {tenderExamples.map((example) => (
                  <tr key={example.object}>
                    <td className="px-4 py-4 font-semibold text-black">{example.target}</td>
                    <td className="px-4 py-4">{example.object}</td>
                    <td className="px-4 py-4">{example.fit}</td>
                    <td className="px-4 py-4">{example.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="surface-panel bg-[linear-gradient(135deg,#0f6ea7,#173f35)] px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow !border-white/18 !bg-white/10 !text-white/82">Action directe</span>
            <h2 className="section-title mt-3 text-white">Un appel d offres menuiserie est repere ?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              Envoyez la reference, l organisme, la date limite et le lien du DCE. GIB peut qualifier rapidement si le marche
              correspond a ses prestations et preparer les prochaines pieces.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="cta-whatsapp" href={whatsappTenderUrl} rel="noreferrer" target="_blank">
              <MessageCircle className="size-4" />
              Transmettre un AO
            </a>
            <a className="cta-secondary !border-white/25 !bg-white/95 !text-[#0f6ea7]" href={`mailto:${company.email}`}>
              <Mail className="size-4" />
              Envoyer par e-mail
            </a>
            <Link className="cta-secondary !border-white/25 !bg-white/10 !text-white" to="/devis">
              <FileSearch className="size-4" />
              Devis travaux
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-amber-300/35 bg-amber-50 px-5 py-5 text-sm leading-7 text-amber-950">
        <div className="flex items-start gap-3">
          <Search className="mt-1 size-4 shrink-0" />
          <p>
            Note legale : cette page ne contourne aucune plateforme et ne depose aucune offre automatiquement. Elle organise la
            veille, la qualification et la preparation commerciale. Les reponses officielles doivent etre deposees sur le profil
            acheteur indique dans chaque reglement de consultation.
          </p>
        </div>
      </section>
    </div>
  )
}
