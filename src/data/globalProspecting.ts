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

export interface QualifiedProspectSeed {
  id: string
  name: string
  segment: ProspectSegment
  zone: string
  contactName: string
  email: string
  phone: string
  channel: ProspectChannel
  need: string
  source: string
  sourceUrl: string
  score: number
  nextAction: string
  notes: string
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

export const qualifiedProspectSeeds: QualifiedProspectSeed[] = [
  {
    id: 'qual-syndic-martinique-gestion',
    name: 'Martinique Gestion & Syndic',
    segment: 'Syndics',
    zone: 'Fort-de-France',
    contactName: 'Service syndic / gestion copropriete',
    email: 'contact@martinique-gestion-syndic.com',
    phone: '+596596737779',
    channel: 'Email',
    need: 'Coproprietes : portails aluminium, garde-corps, volets, acces residence, clotures, depannage fermetures',
    source: 'Site officiel Martinique Gestion & Syndic',
    sourceUrl: 'https://www.martinique-gestion-syndic.com/page%2C129',
    score: 9,
    nextAction: 'Envoyer le mail qualifie avec flyer, puis appeler J+1 pour demander le gestionnaire travaux.',
    notes: 'Contact professionnel publie. Cible directe menuiserie alu coproprietes.',
  },
  {
    id: 'qual-immo-orpi-hb',
    name: 'ORPI H&B Immo',
    segment: 'Immobilier',
    zone: 'Fort-de-France',
    contactName: 'Agence / gestion locative',
    email: '',
    phone: '+596596704456',
    channel: 'Telephone',
    need: 'Biens en vente/location : volets roulants, baies vitrees, portes, portails, renovation avant mise sur le marche',
    source: 'Site officiel ORPI H&B Immo',
    sourceUrl: 'https://www.orpi.com/agencehbi/',
    score: 8,
    nextAction: 'Appeler, demander responsable gestion/location, proposer devis photo + dimensions.',
    notes: 'Contact agence public. Potentiel recommandations proprietaires.',
  },
  {
    id: 'qual-immo-orpi-atout',
    name: 'ORPI Atout Immobilier',
    segment: 'Immobilier',
    zone: 'Riviere-Salee',
    contactName: 'Agence / gestion locative',
    email: '',
    phone: '+596596688288',
    channel: 'Telephone',
    need: 'Biens proprietaires : fermetures, volets, portails, baies, renovation ouverture',
    source: 'Annuaire officiel ORPI Martinique',
    sourceUrl: 'https://www.orpi.com/agences-immobilieres-martinique/',
    score: 8,
    nextAction: 'Appeler, qualifier gestion locative et envoyer presentation GIB si besoin travaux.',
    notes: 'Cible directe proprietaires via agence, pas prospection particulier sauvage.',
  },
  {
    id: 'qual-immo-rb-agency',
    name: 'RB Agency',
    segment: 'Immobilier',
    zone: 'Fort-de-France',
    contactName: 'Gestion locative',
    email: '',
    phone: '+596596106065',
    channel: 'Telephone',
    need: 'Gestion locative : volets, fermetures, renovation, devis proprietaires',
    source: 'Site RB Agency',
    sourceUrl: 'https://www.rb-agency.fr/blog/gestion-locative-en-martinique-pourquoi-deleguer-a-une-agence-%2C129',
    score: 8,
    nextAction: 'Appeler, proposer procedure devis proprietaire avec photos + dimensions.',
    notes: 'Contact pro public. Numero a confirmer au premier appel.',
  },
  {
    id: 'qual-immo-propriogagnant',
    name: 'Propriogagnant',
    segment: 'Immobilier',
    zone: 'Fort-de-France',
    contactName: 'Agence / gestion locative',
    email: '',
    phone: '+596596106035',
    channel: 'Telephone',
    need: 'Gestion locative et vente : devis menuiserie aluminium pour biens proprietaires',
    source: 'Site officiel Propriogagnant',
    sourceUrl: 'https://www.propriogagnant.com/',
    score: 8,
    nextAction: 'Appeler, demander responsable gestion, envoyer presentation GIB et flyer.',
    notes: 'Contact agence public. Cible directe proprietaires via professionnel.',
  },
  {
    id: 'qual-btp-sogea',
    name: 'Sogea Martinique',
    segment: 'BTP',
    zone: 'Ducos / Martinique',
    contactName: 'Service travaux / achats',
    email: '',
    phone: '+596596568800',
    channel: 'Telephone',
    need: 'Chantiers publics/prives : menuiseries, fermetures, garde-corps, prestations associees',
    source: 'Annuaire entreprises / fiche publique SOGEA Martinique',
    sourceUrl: 'https://annuaire-entreprises.data.gouv.fr/entreprise/342227030',
    score: 8,
    nextAction: 'Appeler pour identifier conducteur travaux et proposer dossier entreprise GIB.',
    notes: 'Approche sous-traitance, pas de prospection grand public.',
  },
  {
    id: 'qual-architecte-caue',
    name: 'CAUE Martinique',
    segment: 'Architectes',
    zone: 'Fort-de-France',
    contactName: 'Accueil conseil architecture',
    email: '',
    phone: '+596596701010',
    channel: 'Telephone',
    need: 'Orientation architectes/projets : renovation, menuiseries alu, contraintes cycloniques et salines',
    source: 'Annuaire Service-Public',
    sourceUrl: 'https://lannuaire.service-public.gouv.fr/martinique/martinique/1c9dfa00-2378-413c-9dc9-b9a1f2e7a09b',
    score: 7,
    nextAction: 'Appeler pour demander le bon canal de mise en relation avec architectes/projets.',
    notes: 'Institutionnel : demander orientation, pas de prospection agressive.',
  },
  {
    id: 'qual-tourisme-bakoua',
    name: 'Hotel Bakoua Martinique',
    segment: 'Tourisme',
    zone: 'Trois-Ilets',
    contactName: 'Direction / maintenance',
    email: '',
    phone: '+596596660202',
    channel: 'Telephone',
    need: 'Baies vitrees, fermetures, volets, garde-corps, entretien et renovation hotellerie',
    source: 'Fiche publique Martinique Tour',
    sourceUrl: 'https://en.martinique-tour.com/stay/where-to-sleep-on-the-island/hotel-bakoua-martinique-les-trois-ilets-en-1356569/',
    score: 8,
    nextAction: 'Appeler, demander responsable maintenance, proposer audit photo des menuiseries.',
    notes: 'Angle : confort client, resistance saline, intervention locale.',
  },
  {
    id: 'qual-tourisme-pagerie',
    name: 'La Pagerie Hotel',
    segment: 'Tourisme',
    zone: 'Trois-Ilets',
    contactName: 'Direction / maintenance',
    email: 'direction@hotel-lapagerie.com',
    phone: '+596596660530',
    channel: 'Email',
    need: 'Pergolas, baies, volets, protections solaires, maintenance fermetures',
    source: 'Fiche publique Tourisme & Handicaps',
    sourceUrl: 'https://tourisme-handicaps.org/structures-label/hotel-la-pagerie/',
    score: 8,
    nextAction: 'Envoyer mail qualifie avec flyer, puis appeler maintenance/direction J+1.',
    notes: 'Prospect B2B tourisme.',
  },
  {
    id: 'qual-pro-solutions-far',
    name: 'Solutions FAR',
    segment: 'Commerces',
    zone: 'Ducos',
    contactName: 'Accueil / partenariats travaux',
    email: '',
    phone: '+596596771111',
    channel: 'Telephone',
    need: 'Partenariat local, orientation clients, stores, fermetures, renovation',
    source: 'Site officiel Solutions FAR',
    sourceUrl: 'https://www.solutionsfar.fr/contact',
    score: 6,
    nextAction: 'Appeler uniquement pour qualifier partenariat/recommandation, pas prospection concurrentielle agressive.',
    notes: 'Acteur du secteur : approche partenariat seulement.',
  },
  {
    id: 'qual-ao-prefecture-26-66044',
    name: 'AO Prefecture Martinique - lot cloture',
    segment: 'Appels d offres',
    zone: 'Fort-de-France',
    contactName: 'Service achats',
    email: 'sgc-achat@martinique.gouv.fr',
    phone: '',
    channel: 'Email',
    need: 'Appel d offres direct : installation de cloture et amenagements exterieurs',
    source: 'BOAMP / DCE marches-publics.gouv.fr',
    sourceUrl: 'https://www.boamp.fr/pages/avis/?q=idweb:26-66044',
    score: 10,
    nextAction: 'Telecharger DCE, verifier lot cloture, decision go/no-go, poser question officielle si besoin.',
    notes: 'Reponse acheteur recue : pas de lot menuiserie, mais lot cloture confirme.',
  },
  {
    id: 'qual-ao-semsamar-26-66492',
    name: 'AO SEMSAMAR - groupe scolaire Bagatelle',
    segment: 'Appels d offres',
    zone: 'Gros-Morne',
    contactName: 'Service travaux / acheteur',
    email: 'lvalentin@semsamar.fr',
    phone: '+33596731659',
    channel: 'Email',
    need: 'Appel d offres direct : lot menuiserie dans construction groupe scolaire',
    source: 'BOAMP',
    sourceUrl: 'https://www.boamp.fr/pages/avis/?q=idweb:26-66492',
    score: 10,
    nextAction: 'Appeler, demander profil acheteur/DCE, verifier lot menuiserie et capacite reponse.',
    notes: 'Contact publie dans avis BOAMP. Priorite forte.',
  }
]
