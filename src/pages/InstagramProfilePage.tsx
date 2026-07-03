import { BadgeCheck, ChevronLeft, CheckCircle2, Images, Link2, MessageCircle, Sparkles } from 'lucide-react'
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
