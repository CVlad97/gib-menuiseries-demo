import { mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const outputDir = new URL('../public/media/gib/instagram/reels/', import.meta.url)
const manifestPath = new URL('../public/data/gib/instagram-reels.json', import.meta.url)
const sourceManifestPath = new URL('../src/data/instagramReels.json', import.meta.url)
const fontFile = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'

const reels = [
  {
    id: 'gib-reel-devis-photo',
    title: ['DEVIS PLUS', 'RAPIDE'],
    subtitle: 'Photo + dimensions + commune',
    cta: 'WhatsApp : 0696 65 35 89',
    image: 'public/media/gib/flyers/pub3.jpeg',
    caption:
      'Pour un premier avis rapide : envoyez une photo, vos dimensions approximatives et votre commune. GIB Menuiseries vous oriente pour votre projet alu en Martinique.',
    hashtags: '#gibmenuiseries #devistravaux #menuiseriemartinique #artisan972 #ducos',
  },
  {
    id: 'gib-reel-portail-securite',
    title: ['SECURISEZ', 'VOTRE ENTREE'],
    subtitle: 'Portails et clotures aluminium',
    cta: 'Pose locale en Martinique',
    image: 'public/media/gib/portail-dallas.jpg',
    caption:
      'Portail aluminium, cloture, acces maison : une entree propre et securisee commence par une bonne prise de mesures.',
    hashtags: '#portailmartinique #cloturemartinique #menuiseriealu #travauxmartinique',
  },
  {
    id: 'gib-reel-baie-lumiere',
    title: ['PLUS DE', 'LUMIERE'],
    subtitle: 'Baies vitrees et chassis coulissants',
    cta: 'Envoyez vos dimensions',
    image: 'public/media/gib/baie-luminosite.jpeg',
    caption:
      'Baie vitree aluminium : plus de lumiere, une ouverture moderne et une pose adaptee aux contraintes locales.',
    hashtags: '#baievitree #menuiseriemartinique #aluminiummartinique #renovationmartinique',
  },
  {
    id: 'gib-reel-volet-confort',
    title: ['VOLETS', 'ROULANTS'],
    subtitle: 'Confort, securite, depannage',
    cta: 'GIB intervient en Martinique',
    image: 'public/media/gib/volet-ambiance-1.jpeg',
    caption:
      'Volets roulants en Martinique : confort solaire, securite et depannage. Envoyez photo + commune pour un premier retour.',
    hashtags: '#voletmartinique #voletroulant #depannage #travauxmartinique',
  },
  {
    id: 'gib-reel-pergola-terrasse',
    title: ['TERRASSE', 'PLUS CONFORT'],
    subtitle: 'Pergolas aluminium sur mesure',
    cta: 'Projet sur devis',
    image: 'public/media/gib/pergola-ambiance-2.jpg',
    caption:
      'Pergola aluminium : creer de l ombre, structurer la terrasse et ameliorer le confort exterieur.',
    hashtags: '#pergolamartinique #terrasse #menuiseriealu #artisan972',
  },
  {
    id: 'gib-reel-garde-corps',
    title: ['SECURITE', 'ET FINITION'],
    subtitle: 'Garde-corps, portillons, clotures',
    cta: 'Ducos - Toute Martinique',
    image: 'public/media/gib/garde-corps-portillon.jpg',
    caption:
      'Garde-corps et clotures : securiser sans sacrifier le rendu. GIB accompagne vos projets en Martinique.',
    hashtags: '#gardecorps #cloturemartinique #securitemaison #gibmenuiseries',
  },
]

function absolute(relativePath) {
  return new URL(relativePath, root).pathname
}

function escapeDrawtext(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/:/g, '\\:')
    .replace(/'/g, "\\\\'")
    .replace(/%/g, '\\%')
}

function drawText(text, x, y, size, color = 'white') {
  return [
    `drawtext=fontfile='${fontFile}'`,
    `text='${escapeDrawtext(text)}'`,
    `x=${x}`,
    `y=${y}`,
    `fontsize=${size}`,
    `fontcolor=${color}`,
    'shadowcolor=black@0.45',
    'shadowx=3',
    'shadowy=3',
  ].join(':')
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`${command} exited with ${code}`))
    })
  })
}

await mkdir(outputDir, { recursive: true })
await mkdir(new URL('../public/data/gib/', import.meta.url), { recursive: true })
await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })

const manifest = []

for (const reel of reels) {
  const input = absolute(reel.image)
  if (!existsSync(input)) {
    throw new Error(`Missing image for ${reel.id}: ${input}`)
  }

  const output = new URL(`${reel.id}.mp4`, outputDir).pathname
  const poster = reel.image.replace(/^public\//, '')
  const filters = [
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    'eq=contrast=1.06:saturation=1.08:brightness=-0.02',
    'drawbox=x=0:y=0:w=1080:h=1920:color=black@0.28:t=fill',
    'drawbox=x=0:y=0:w=1080:h=1920:color=#0f6ea7@0.12:t=fill',
    drawText(reel.title[0], 70, 230, 92),
    drawText(reel.title[1], 70, 330, 92, '#ffd84d'),
    drawText(reel.subtitle, 70, 490, 44),
    drawText(reel.cta, 70, 1580, 50, '#ffffff'),
    drawText('GIB Menuiseries Services', 70, 1660, 38, '#ffd84d'),
    drawText('Ducos - Martinique', 70, 1715, 34),
  ].join(',')

  await run('ffmpeg', [
    '-y',
    '-loop',
    '1',
    '-t',
    '8',
    '-i',
    input,
    '-vf',
    filters,
    '-r',
    '30',
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '24',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    output,
  ])

  manifest.push({
    id: reel.id,
    title: reel.title.join(' '),
    src: `media/gib/instagram/reels/${reel.id}.mp4`,
    poster,
    durationSeconds: 8,
    format: 'reel 1080x1920',
    caption: reel.caption,
    hashtags: reel.hashtags,
    cta: reel.cta,
    status: 'ready_to_review',
    recommendedUse: 'Instagram Reels, WhatsApp status, Facebook local',
  })
}

const payload = { generatedAt: new Date().toISOString(), count: manifest.length, reels: manifest }
await writeFile(manifestPath, `${JSON.stringify(payload, null, 2)}\n`)
await writeFile(sourceManifestPath, `${JSON.stringify(payload, null, 2)}\n`)

console.log(`Generated ${manifest.length} reels`)
