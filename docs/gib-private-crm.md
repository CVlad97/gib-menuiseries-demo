# GIB CRM prive particuliers

La base particuliers ne doit pas etre publiee dans le site GitHub Pages. Elle contient potentiellement des numeros personnels et des adresses de chantiers.

## Ce qui est autorise

- Contacts WhatsApp qui ont contacte GIB ou envoye une demande.
- Clients existants et chantiers en cours.
- Prospects issus du formulaire site ou d une demande explicite.
- Contacts a rappeler avec preuve de source et statut de consentement.

## Ce qui n est pas autorise

- Constituer une liste de particuliers inconnus a partir de recherches Google.
- Deviner les personnes qui ont cherche "menuiserie alu Martinique" sur Google : ces donnees individuelles ne sont pas accessibles legalement.
- Publier les adresses de chantiers dans le depot ou sur GitHub Pages.
- Envoyer des messages massifs sans tri ni opt-out.

## Commandes

```bash
npm run crm:init
npm run crm:import-contacts
npm run crm:import-files
```

Cette commande cree localement :

- `private/gib-crm/particuliers-leads.private.csv`
- `private/gib-crm/chantiers-en-cours.private.csv`
- `private/gib-crm/whatsapp-import-a-trier.private.csv`
- `private/gib-crm/leads-web-2-mois.private.csv`

Le dossier `private/` est ignore par Git.

`npm run crm:import-contacts` tente d importer les contacts Android via Shizuku dans `whatsapp-import-a-trier.private.csv`. Cet import est une zone de tri : ne pas envoyer de relance avant validation humaine du besoin, de la source et du consentement.

`npm run crm:import-files` lit les fichiers `.txt`, `.csv` et `.vcf` de `/sdcard/Download/gib-crm-import` ou `private/gib-crm/imports`, puis extrait uniquement les lignes candidates dans `whatsapp-import-a-trier.private.csv`.

## Leads web des 2 derniers mois

On ne peut pas connaitre individuellement les personnes qui ont cherche "menuiserie alu Martinique" sur Google sans qu elles aient laisse une demande. Sources acceptables :

- export Google Business Profile : appels, messages, demandes d itineraire ;
- export Google Ads / Meta Ads : formulaires leads ;
- messages WhatsApp entrants ;
- formulaires site ;
- e-mails entrants ;
- demandes recues en magasin ou sur chantier.

Importer ces leads dans `private/gib-crm/leads-web-2-mois.private.csv`.
