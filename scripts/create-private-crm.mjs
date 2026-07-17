import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const root = new URL('../private/gib-crm/', import.meta.url)

const files = [
  {
    path: 'particuliers-leads.private.csv',
    content: [
      'id,created_at,full_name,phone,email,commune,chantier_address,need,source,consent_status,last_contact,next_action,status,score,notes',
      '',
    ].join('\n'),
  },
  {
    path: 'chantiers-en-cours.private.csv',
    content: [
      'id,created_at,client_name,phone,commune,chantier_address,project_type,stage,next_visit,next_action,private_notes',
      '',
    ].join('\n'),
  },
  {
    path: 'whatsapp-import-a-trier.private.csv',
    content: [
      'display_name,phone,detected_keyword,probable_need,consent_status,action,status,notes',
      '',
    ].join('\n'),
  },
  {
    path: 'leads-web-2-mois.private.csv',
    content: [
      'id,created_at,lead_date,full_name,phone,email,commune,need,source,campaign,consent_status,next_action,status,notes',
      '',
    ].join('\n'),
  },
  {
    path: 'README.md',
    content: `# Base CRM privee GIB

Ce dossier est ignore par Git et ne doit pas etre publie sur GitHub Pages.

## Regles
- Importer uniquement les particuliers qui ont contacte GIB, demande un devis, envoye une photo, laisse leurs coordonnees ou donne un accord clair.
- Ne pas ajouter de personnes "trouvees sur Google" avec telephone prive sans consentement.
- Ne pas publier les adresses de chantiers.
- Garder la preuve de source dans \`source\` et le statut dans \`consent_status\`.

## Statuts consent_status
- \`entrant_whatsapp\` : la personne a contacte GIB sur WhatsApp.
- \`client_existant\` : client ou chantier existant.
- \`formulaire_site\` : demande recue via formulaire.
- \`a_confirmer\` : contact a verifier avant toute relance.
- \`stop\` : ne plus contacter.

## Fichiers
- \`particuliers-leads.private.csv\` : prospects particuliers qualifies.
- \`chantiers-en-cours.private.csv\` : adresses chantier et suivi operationnel.
- \`whatsapp-import-a-trier.private.csv\` : zone tampon avant validation humaine.
- \`leads-web-2-mois.private.csv\` : leads entrants web, Google Business, Ads, formulaire, Meta ou WhatsApp.
	`,
  },
]

await mkdir(root, { recursive: true })

for (const file of files) {
  const url = new URL(file.path, root)
  if (existsSync(url)) {
    continue
  }
  await writeFile(url, file.content, 'utf8')
}

console.log(`Private GIB CRM ready: ${root.pathname}`)
