export type ProspectSegment =
  | 'Appels d offres'
  | 'Collectivites'
  | 'Syndics'
  | 'Immobilier'
  | 'BTP'
  | 'Architectes'
  | 'Tourisme'
  | 'Commerces'
  | 'Assurances'
  | 'Particuliers'

export type ProspectChannel = 'Email' | 'Telephone' | 'WhatsApp' | 'Instagram' | 'Facebook' | 'Terrain'

export interface GlobalProspectTemplate {
  id: string
  segment: ProspectSegment
  title: string
  target: string
  need: string
  offer: string
  channel: ProspectChannel
  priority: 'Critique' | 'Forte' | 'Moyenne'
  score: number
  contactHint: string
  source: string
  firstAction: string
}

export const prospectSegments: ProspectSegment[] = [
  'Appels d offres',
  'Collectivites',
  'Syndics',
  'Immobilier',
  'BTP',
  'Architectes',
  'Tourisme',
  'Commerces',
  'Assurances',
  'Particuliers',
]

export const prospectChannels: ProspectChannel[] = [
  'Email',
  'Telephone',
  'WhatsApp',
  'Instagram',
  'Facebook',
  'Terrain',
]

export const globalProspectTemplates: GlobalProspectTemplate[] = [
  {
    id: 'ao-publics',
    segment: 'Appels d offres',
    title: 'Services achats publics et parapublics',
    target: 'Mairies, CTM, EPCI, hopitaux, bailleurs, SDIS, ports, etablissements publics',
    need: 'Lots menuiserie, fermetures, clotures, garde-corps, renovation, maintenance',
    offer: 'Dossier entreprise + demande DCE + qualification go/no-go',
    channel: 'Email',
    priority: 'Critique',
    score: 10,
    contactHint: 'Email commande publique publie dans BOAMP/DCE, profil acheteur officiel',
    source: 'BOAMP, marches-publics.gouv.fr, marches-securises.fr, achatpublic.com',
    firstAction: 'Importer les consultations ouvertes, verifier DCE, contacter uniquement le canal officiel.',
  },
  {
    id: 'syndics',
    segment: 'Syndics',
    title: 'Syndics et gestionnaires de coproprietes',
    target: 'Syndics, administrateurs de biens, residences, conseils syndicaux',
    need: 'Portails, garde-corps, volets, jalousies, acces residence, depannage apres incident',
    offer: 'Audit photo + devis sur site + intervention toute Martinique',
    channel: 'Email',
    priority: 'Critique',
    score: 9,
    contactHint: 'Email gestionnaire travaux, accueil syndic, telephone standard',
    source: 'Google Maps, PagesJaunes, sites syndics, recommandations clients',
    firstAction: 'Lister 30 syndics, envoyer presentation + flyer, appeler J+1.',
  },
  {
    id: 'agences-immo',
    segment: 'Immobilier',
    title: 'Agences immobilieres et gestion locative',
    target: 'Agences de vente, location, gestion saisonniere, administrateurs de biens',
    need: 'Rafraichissement avant vente/location, depannage volets, fermeture securisee',
    offer: 'Devis rapide sur photo pour biens a vendre/louer',
    channel: 'WhatsApp',
    priority: 'Forte',
    score: 8,
    contactHint: 'WhatsApp agence, email contact, negociateurs secteur sud/centre',
    source: 'Google Maps, Instagram, vitrines locales, reseaux immobiliers',
    firstAction: 'Contacter 20 agences avec message court + lien realisations.',
  },
  {
    id: 'btp',
    segment: 'BTP',
    title: 'Entreprises BTP et maitres d oeuvre',
    target: 'Constructeurs, renovateurs, entreprises generales, maitres d oeuvre',
    need: 'Sous-traitance menuiserie aluminium, fermetures, pose, chantiers neufs/renovation',
    offer: 'Partenaire local menuiserie pour lots alu et fermetures',
    channel: 'Telephone',
    priority: 'Forte',
    score: 8,
    contactHint: 'Conducteur de travaux, charge affaires, bureau technique',
    source: 'Chantiers visibles, reseaux BTP, annuaires professionnels',
    firstAction: 'Appeler 15 entreprises, demander responsable travaux, envoyer dossier GIB.',
  },
  {
    id: 'architectes',
    segment: 'Architectes',
    title: 'Architectes et bureaux d etudes',
    target: 'Architectes, dessinateurs, bureaux d etudes, economistes',
    need: 'Prescription menuiserie, garde-corps, pergolas, jalousies, contraintes tropicales',
    offer: 'Support technique + realisations locales + devis selon plans',
    channel: 'Email',
    priority: 'Forte',
    score: 8,
    contactHint: 'Email cabinet, architecte responsable projet',
    source: 'Ordre des architectes, Google, recommandations chantier',
    firstAction: 'Envoyer dossier entreprise + proposer un rendez-vous technique.',
  },
  {
    id: 'tourisme',
    segment: 'Tourisme',
    title: 'Hotels, villas et locations saisonnieres',
    target: 'Hotels, residences de tourisme, conciergeries, villas haut de gamme',
    need: 'Baies vitrees, volets, pergolas, securisation, entretien avant haute saison',
    offer: 'Diagnostic rapide + priorisation securite/confort client',
    channel: 'WhatsApp',
    priority: 'Forte',
    score: 8,
    contactHint: 'Responsable technique, direction, conciergerie',
    source: 'Google Maps, Booking, Airbnb managers, Instagram',
    firstAction: 'Cibler 25 etablissements et proposer audit photo + intervention.',
  },
  {
    id: 'commerces',
    segment: 'Commerces',
    title: 'Commerces et locaux professionnels',
    target: 'Boutiques, restaurants, bureaux, showrooms, locaux en ZI',
    need: 'Fermetures, rideaux/volets, portes, protections solaires, depannage',
    offer: 'Intervention locale Ducos/Cluny + devis rapide',
    channel: 'Terrain',
    priority: 'Moyenne',
    score: 7,
    contactHint: 'Gerant sur place, carte/flyer, QR code WhatsApp',
    source: 'Prospection terrain, zones commerciales, recommandations',
    firstAction: 'Tour terrain 2h/semaine avec flyer + QR code WhatsApp.',
  },
  {
    id: 'assurances',
    segment: 'Assurances',
    title: 'Assurances et sinistres',
    target: 'Agents assurance, experts sinistre, courtiers, gestionnaires dossiers',
    need: 'Remplacement apres effraction, cyclone, degat, fermeture urgente',
    offer: 'Photos + dimensions + devis assureur',
    channel: 'Email',
    priority: 'Forte',
    score: 8,
    contactHint: 'Agence locale, expert partenaire, gestion sinistre',
    source: 'Agences assurance locales, reseau clients',
    firstAction: 'Envoyer presentation courte avec procedure devis assureur.',
  },
  {
    id: 'particuliers',
    segment: 'Particuliers',
    title: 'Proprietaires maisons et villas',
    target: 'Proprietaires a Ducos, Lamentin, Riviere-Salee, Trois-Ilets, Robert, FDF',
    need: 'Portail, cloture, volets, baies, pergola, renovation ouverture',
    offer: 'Photo + dimensions = premiere orientation WhatsApp',
    channel: 'Facebook',
    priority: 'Moyenne',
    score: 7,
    contactHint: 'Groupes locaux, recommandations, Instagram, bouche-a-oreille',
    source: 'Facebook local, Instagram, QR flyer, avis clients',
    firstAction: 'Publier 3 posts/semaine + relancer les conversations entrantes.',
  },
]

export const martiniqueZones = [
  'Ducos',
  'Le Lamentin',
  'Fort-de-France',
  'Riviere-Salee',
  'Sainte-Luce',
  'Le Marin',
  'Trois-Ilets',
  'Schoelcher',
  'Le Robert',
  'Le Francois',
  'Gros-Morne',
  'Trinite',
  'Saint-Joseph',
  'Nord Caraibe',
  'Toute Martinique',
]
