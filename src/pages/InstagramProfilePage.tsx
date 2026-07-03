import { BadgeCheck, ChevronLeft, CheckCircle2, Copy, Images, Link2, MessageCircle, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { MediaImage } from '../components/MediaImage'
import { SectionHeading } from '../components/SectionHeading'
import { withBase } from '../lib/base'
import { company, getAssetById } from '../lib/content'
import type { MediaAsset } from '../types/content'

const logoSrc = withBase('media/gib/logo-gib.png')
const validatedWhatsAppUrl =
  'https://wa.me/596696653589?text=Bonjour%2C%20je%20souhaite%20un%20devis%20GIB%20Menuiseries.%20Voici%20mon%20projet%20%3A'

const profileRows = [
  {
    label: 'Nom affiche',
    current: 'GIB MENUISERIES SERVICES',
    proposed: 'GIB Menuiseries | Portails • Baies • Volets',
    impact: 'Lecture immediate de l activite et du positionnement local.',
    risk: 'Faible si le nom reste proche de la marque actuelle.',
  },
  {
    label: 'Bio',
    current: 'Visible partiellement sur la capture, avec SEPALUMIC et gamme PVC REHAU.',
    proposed:
      'Menuiserie alu sur mesure en Martinique\nPortails • Baies vitrées • Volets roulants\n+20 ans • RGE • Qualicoat\nDucos — Toute Martinique\nPhotos + dimensions = devis rapide',
    impact: 'Le profil explique le service, la preuve et le CTA en une seule lecture.',
    risk: 'Faible, texte court et orienté devis.',
  },
  {
    label: 'Lien bio',
    current: '1 lien actif sur le profil',
    proposed: validatedWhatsAppUrl,
    impact: 'Le profil renvoie directement vers une demande de devis.',
    risk: 'Faible, canal de conversion deja valide.',
  },
  {
    label: 'Structure business',
    current: 'Page non associee sur la capture',
    proposed: 'Associer la Page Facebook GIB puis activer les options de contact.',
    impact: 'Meilleure coherence Meta et meilleur routage commercial.',
    risk: 'Moyen si Meta affiche plusieurs pages a choisir.',
  },
]

const storyHighlights = [
  'Realisations',
  'Portails',
  'Baies vitrées',
  'Volets',
  'Fenêtres',
  'Pergolas',
  'Clôtures',
  'Dépannage',
  'Avant/Après',
  'Devis',
  'Avis clients',
  'Contact',
]

const pinnedPosts = [
  'Qui sommes-nous ?',
  'Comment demander un devis ?',
  'Nos prestations',
]

const instagramAssets = [
  'instagram-entree-portail',
  'instagram-catalogue-pergola',
  'instagram-volet-anticyclonique',
]
  .map((id) => getAssetById(id))
  .filter((asset): asset is MediaAsset => Boolean(asset))

const instagramReels = [
  {
    id: 'reel-portail',
    title: 'Portail aluminium',
    description: 'Capsule courte pour montrer une entree, un acces et une finition plus lisible.',
    src: withBase('media/gib/instagram/videos/gib-menuiseries-portail-demo.mp4'),
    poster: withBase('media/gib/instagram/entree-portail.webp'),
  },
  {
    id: 'reel-pergola',
    title: 'Pergola terrasse',
    description: 'Reel de presentation pour parler confort exterieur, terrasse et ombrage en Martinique.',
    src: withBase('media/gib/instagram/videos/gib-menuiseries-pergola-demo.mp4'),
    poster: withBase('media/gib/official/pergola-elegance.jpg'),
  },
  {
    id: 'reel-volet',
    title: 'Volet roulant',
    description: 'Format reel simple pour rappeler le role thermique, securite et depannage du volet.',
    src: withBase('media/gib/instagram/videos/gib-menuiseries-volet-demo.mp4'),
    poster: withBase('media/gib/instagram/volet-anticyclonique.jpg'),
  },
]

const profilePreview = {
  displayName: 'GIB Menuiserie Martinique',
  handle: 'gibmenuiseries',
  bio: [
    'Menuiserie alu sur mesure en Martinique',
    'Portails • Volets • Baies • Pergolas',
    'Ducos • Toute Martinique',
    'Photos + dimensions = devis rapide',
  ],
  linkLabel: 'WhatsApp devis',
  ctas: ['Appeler', 'E-mail', 'Itinéraire'],
}

const contentIdeas = [
  {
    title: 'Post profil',
    hook: 'Menuiserie aluminium sur mesure en Martinique',
    body: 'Présentez clairement le positionnement, la zone et la promesse de réponse rapide.',
  },
  {
    title: 'Reel portail',
    hook: 'Sécuriser et moderniser une entrée',
    body: 'Montez une entrée, puis terminez par le CTA photo + dimensions sur WhatsApp.',
  },
  {
    title: 'Reel pergola',
    hook: 'Plus d ombre, plus de confort',
    body: 'Montrez la terrasse, la pose et la finition avant/après sur 6 à 8 secondes.',
  },
]

const publicationChecklist = [
  'Remplacer la bio du profil par la version courte.',
  'Mettre le lien WhatsApp ou la page devis en lien unique.',
  'Ajouter 3 posts épinglés : qui nous sommes, comment demander un devis, nos prestations.',
  'Créer les stories à la une : devis, réalisations, portails, volets, baies, pergolas.',
]

function FieldRow({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'muted' | 'strong' }) {
  const toneClass =
    tone === 'strong'
      ? 'text-[#0f6ea7]'
      : tone === 'muted'
        ? 'text-black/58'
        : 'text-black/78'

  return (
    <div className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black/42">{label}</p>
      <p className={`mt-2 text-sm leading-6 ${toneClass}`}>{value}</p>
    </div>
  )
}

export function InstagramProfilePage() {
  const [copied, setCopied] = useState(false)

  async function handleCopyBio() {
    try {
      await navigator.clipboard.writeText(profilePreview.bio.join('\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="shell space-y-10 pt-8 sm:pt-12">
      <section className="glass-panel-strong px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <SectionHeading
          action={
            <div className="flex flex-wrap gap-3">
              <a className="cta-secondary !border-white/20 !bg-white/90 !text-[#0f6ea7]" href={validatedWhatsAppUrl} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                WhatsApp devis
              </a>
              <a className="cta-primary" href={company.instagram_url} rel="noreferrer" target="_blank">
                <Images className="size-4" />
                Ouvrir Instagram
              </a>
            </div>
          }
          description="Cette page sert de preview interne pour reorganiser le profil Instagram GIB sans publier quoi que ce soit. Elle montre le wording, les preuves et la logique de conversion avant toute modification reelle."
          eyebrow="Instagram preview"
          light
          title="Un profil plus clair, plus vendeur et plus simple a valider."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
        <div className="surface-panel px-6 py-7 sm:px-8">
          <SectionHeading
            eyebrow="Apercu mobile"
            title="Le profil doit se lire en trois secondes sur smartphone."
            description="Cette maquette reprend la lecture Instagram classique: nom, photo, bio courte, lien unique et accès rapides. Elle sert à valider ce que le client voit avant publication."
          />

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#132534]/10 bg-[linear-gradient(180deg,#132534_0%,#0f6ea7_100%)] p-4 text-white shadow-[0_24px_60px_rgba(15,110,167,0.22)]">
            <div className="rounded-[1.5rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white">
                    <img alt="Logo GIB Menuiseries Services" className="h-full w-full object-cover" src={logoSrc} />
                  </div>
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/70">Instagram</p>
                    <h3 className="mt-1 text-lg font-semibold">{profilePreview.displayName}</h3>
                    <p className="text-sm text-white/68">@{profilePreview.handle}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/86">
                  Preview
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {company.proof_points.map((item) => (
                  <div key={item.label} className="rounded-[1rem] border border-white/12 bg-white/10 px-3 py-3 text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/58">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-4">
                {profilePreview.bio.map((line) => (
                  <p key={line} className="text-sm leading-6 text-white/88">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {profilePreview.ctas.map((cta) => (
                  <span key={cta} className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/84">
                    {cta}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-[1.2rem] border border-white/12 bg-white/8 px-4 py-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/58">{profilePreview.linkLabel}</p>
                  <p className="mt-1 text-sm font-semibold text-white">Photo + dimensions = devis plus rapide</p>
                </div>
                <Link2 className="size-4 text-white/84" />
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel px-6 py-7 sm:px-8">
          <SectionHeading
            eyebrow="Bio prête"
            title="Le texte à coller et le lien à garder en priorité."
            description="Le profil doit envoyer directement vers une prise de contact simple. Cette zone aide à valider le wording, puis à copier la bio avant publication."
            action={
              <button className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" onClick={handleCopyBio} type="button">
                <Copy className="size-4" />
                {copied ? 'Bio copiée' : 'Copier la bio'}
              </button>
            }
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[1.6rem] border border-[#1398db]/12 bg-white p-5 shadow-[0_14px_30px_rgba(19,122,186,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Nom affiche</p>
              <p className="mt-2 text-lg font-semibold text-black">{profilePreview.displayName}</p>
              <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Bio recommandee</p>
              <div className="mt-3 rounded-[1.25rem] border border-[#dff7fb] bg-[#f3fbff] p-4 text-sm leading-6 text-black/74">
                {profilePreview.bio.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-black/66">
                Le CTA doit rester simple: envoyer une photo, ajouter les dimensions et préciser la commune pour obtenir une première orientation.
              </p>
            </article>

            <div className="space-y-4">
              <article className="rounded-[1.6rem] border border-[#1398db]/12 bg-white p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Lien unique</p>
                <a className="mt-2 block break-all text-sm font-semibold text-[#0f6ea7]" href={validatedWhatsAppUrl} rel="noreferrer" target="_blank">
                  {validatedWhatsAppUrl}
                </a>
              </article>
              <article className="rounded-[1.6rem] border border-[#1398db]/12 bg-white p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Stories à la une</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {storyHighlights.slice(0, 6).map((item) => (
                    <span key={item} className="rounded-full border border-[#1398db]/14 bg-[#eef8ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f6ea7]">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <div className="surface-panel px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
          <div className="rounded-[1.9rem] border border-[#1398db]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,248,255,0.94))] p-4 shadow-[0_22px_44px_rgba(19,122,186,0.08)]">
            <div className="flex items-center justify-between border-b border-[#1398db]/10 pb-4">
              <div className="inline-flex items-center gap-3">
                <ChevronLeft className="size-5 text-[#132534]" />
                <h2 className="text-[1.05rem] font-semibold text-black">Modifier le profil</h2>
              </div>
              <span className="rounded-full bg-[#eef8ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6ea7]">
                Preview
              </span>
            </div>

            <div className="mt-5 flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_10px_24px_rgba(19,122,186,0.14)]">
                  <img alt="Logo GIB Menuiseries Services" className="h-full w-full object-cover" src={logoSrc} />
                </div>
                <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center rounded-full border border-white bg-[#1398db] p-1.5 text-white shadow-lg">
                  <CheckCircle2 className="size-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-xl font-semibold tracking-tight text-black">GIB MENUISERIES SERVICES</h3>
                  <span className="rounded-full bg-[#f5eee1] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#8a671c]">
                    Non publie
                  </span>
                </div>
                <p className="mt-1 text-sm text-black/58">gibmenuiseries</p>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  Menuiserie alu sur mesure en Martinique avec un parcours simple: photos, dimensions, commune, puis devis rapide.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag !bg-[#dff7fb] !text-[#0f6ea7]">1 lien</span>
                  <span className="tag !bg-[#eef4ff] !text-[#4e67a3]">Page Facebook a associer</span>
                  <span className="tag !bg-[#f5eee1] !text-[#8a671c]">Retour arriere possible</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {company.proof_points.map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-[1.15rem] border border-[#1398db]/10 bg-white px-4 py-3 text-center">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/42">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-black">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <FieldRow label="Nom" value="GIB MENUISERIES SERVICES" tone="strong" />
              <FieldRow label="Nom de profil" value="gibmenuiseries" tone="muted" />
              <FieldRow
                label="Bio"
                value="Menuiserie alu sur mesure en Martinique / Portails • Baies vitrées • Volets roulants / +20 ans • RGE • Qualicoat / Ducos — Toute Martinique / Photos + dimensions = devis rapide"
              />
              <FieldRow label="Liens" value="1 lien actif - WhatsApp devis valide" tone="strong" />
              <FieldRow label="Affichage du profil" value="Tout afficher" tone="muted" />
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-[#1398db]/12 bg-[#eef8ff] px-4 py-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#0f6ea7]">Retour arriere</p>
              <p className="mt-2 text-sm leading-6 text-black/74">
                Conserver une capture de l etat actuel avant validation finale pour pouvoir remettre le nom, la bio et le lien si le rendu ne convient pas.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-panel px-6 py-7 sm:px-8">
            <SectionHeading
              description="Chaque champ est remis dans un langage commercial direct, sans surcharger le profil. Le but est d obtenir plus de demandes qualifiees et moins de confusions sur l activite."
              eyebrow="Champs a valider"
              title="Un wording plus net, plus court et plus utile."
            />
            <div className="mt-6 grid gap-4">
              {profileRows.map((row) => (
                <article key={row.label} className="rounded-[1.4rem] border border-[#1398db]/12 bg-white p-5 shadow-[0_14px_30px_rgba(19,122,186,0.05)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-black">{row.label}</h3>
                    <span className="rounded-full bg-[#eef8ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6ea7]">
                      {row.risk}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-2">
                    <div className="rounded-[1.1rem] border border-[#f5eee1] bg-[#fffdf8] p-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/40">Valeur actuelle</p>
                      <p className="mt-2 text-sm leading-6 text-black/72">{row.current}</p>
                    </div>
                    <div className="rounded-[1.1rem] border border-[#dff7fb] bg-[#f3fbff] p-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#0f6ea7]">Nouvelle valeur proposee</p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-black/76">{row.proposed}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                    <p className="text-sm leading-6 text-black/68">
                      <span className="font-semibold text-black">Impact attendu:</span> {row.impact}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6ea7]">
                      <BadgeCheck className="size-4" />
                      Preview interne
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-7 sm:px-8">
            <SectionHeading
              description="Les stories et les posts epingles servent de raccourcis visuels. Ils doivent expliquer qui est GIB, ce qu il fait et comment demander un devis sans effort."
              eyebrow="Structure"
              title="Highlights et posts epingles, sans bruit visuel."
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {storyHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1398db]/14 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6ea7]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {pinnedPosts.map((item) => (
                <article key={item} className="rounded-[1.35rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,#ffffff,rgba(238,248,255,0.92))] p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Post epingle</p>
                  <h3 className="mt-2 text-lg font-semibold text-black">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/66">
                    Des sujets simples, utiles et repetables pour garder le profil lisible en premier regard.
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-7 sm:px-8">
            <SectionHeading
              description="Les photos publiees sur le site et sur Instagram doivent rester vraies, compactes et lisibles. Ici on montre les visuels reels deja disponibles dans le projet."
              eyebrow="Visuels reels"
              title="Trois posts qui racontent deja le metier GIB."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {instagramAssets.map((asset) => (
                <article key={asset.id} className="instagram-tile overflow-hidden">
                  <MediaImage
                    alt={asset.alt_text}
                    className="aspect-[4/5] w-full overflow-hidden"
                    fallbackSrc="fallbacks/default.svg"
                    imgClassName="h-full w-full object-cover"
                    src={asset.image_url}
                  />
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="tag !bg-[#dff7fb] !text-[#0f6ea7]">Instagram GIB</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]/68">
                        {asset.collection.replaceAll('-', ' ')}
                      </span>
                    </div>
                    <h3 className="font-[Marcellus] text-xl leading-tight text-black">{asset.title}</h3>
                    <p className="text-sm leading-6 text-black/66">{asset.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-7 sm:px-8">
            <SectionHeading
              description="Les reels ci-dessous sont generes a partir des visuels existants. Ils servent de base pour publier des contenus courts, propres et faciles a reprendre sur Instagram."
              eyebrow="Capsules video"
              title="Formats reels prets a utiliser."
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {instagramReels.map((reel) => (
                <article key={reel.id} className="overflow-hidden rounded-[1.45rem] border border-[#1398db]/12 bg-white shadow-[0_14px_30px_rgba(19,122,186,0.06)]">
                  <video className="aspect-[4/5] w-full bg-black object-cover" controls playsInline preload="metadata" poster={reel.poster}>
                    <source src={reel.src} type="video/mp4" />
                    Votre navigateur ne prend pas en charge la lecture video.
                  </video>
                  <div className="space-y-2 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f6ea7]">Reel Instagram</p>
                    <h3 className="font-[Marcellus] text-xl leading-tight text-black">{reel.title}</h3>
                    <p className="text-sm leading-6 text-black/66">{reel.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel px-6 py-7 sm:px-8">
            <SectionHeading
              eyebrow="Contenus"
              title="Idées de publications déjà cadrées."
              description="Ces contenus peuvent être publiés tels quels ou ajustés avec un ton plus commercial. Ils couvrent la vitrine du profil, les reels et les messages de conversion."
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {contentIdeas.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-[#1398db]/12 bg-white p-5 shadow-[0_14px_30px_rgba(19,122,186,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">{item.title}</p>
                  <h3 className="mt-2 text-xl font-semibold text-black">{item.hook}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/68">{item.body}</p>
                  <div className="mt-4 inline-flex rounded-full bg-[#eef8ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6ea7]">
                    Prêt à publier
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-[#1398db]/12 bg-[linear-gradient(180deg,#ffffff,rgba(238,248,255,0.92))] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">Checklist de publication</p>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {publicationChecklist.map((item) => (
                  <div key={item} className="rounded-[1.1rem] border border-[#dff7fb] bg-white px-4 py-3 text-sm leading-6 text-black/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="surface-panel px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Validation rapide</p>
                <h2 className="section-title mt-3 text-[var(--text-dark)]">Le profil reste coherent avec le site et le WhatsApp devis.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="cta-secondary !border-[#1398db]/24 !text-[#0f6ea7]" href={validatedWhatsAppUrl} rel="noreferrer" target="_blank">
                  <Link2 className="size-4" />
                  Lien bio
                </a>
                <a className="cta-primary" href={company.instagram_url} rel="noreferrer" target="_blank">
                  <Sparkles className="size-4" />
                  Previsualiser Instagram
                </a>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/42">Statut</p>
                <p className="mt-2 text-sm font-semibold text-black">Preview uniquement, aucune publication.</p>
              </div>
              <div className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/42">Nom</p>
                <p className="mt-2 text-sm font-semibold text-black">GIB Menuiseries | Portails • Baies • Volets</p>
              </div>
              <div className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/42">Bio</p>
                <p className="mt-2 text-sm font-semibold text-black">Plus claire, plus courte, plus orientee devis.</p>
              </div>
              <div className="rounded-[1.25rem] border border-[#1398db]/12 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/42">Lien</p>
                <p className="mt-2 text-sm font-semibold text-black">WhatsApp devis direct.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
