export interface LocalProspectingZone {
  id: string
  rank: number
  commune: string
  zones: string[]
  leadType: 'Particuliers' | 'Mixte pro/particuliers' | 'BTP / bailleurs'
  opportunity: string
  products: string[]
  fieldAction: string
  digitalAction: string
  evidence: string
  sourceUrl: string
  privacyRule: string
}

export const localProspectingZones: LocalProspectingZone[] = [
  {
    id: 'ducos-riviere-salee-lamentin',
    rank: 1,
    commune: 'Ducos / Riviere-Salee / Le Lamentin',
    zones: ['Ducos centre', 'Genipa', 'Petit-Bourg', 'Riviere-Salee centre', 'Acajou', 'Californie', 'Place d Armes'],
    leadType: 'Mixte pro/particuliers',
    opportunity: 'Axe central proche GIB, forte logique renovation maison, commerces, zones d activite et acces rapides pour visite.',
    products: ['Portails aluminium', 'Volets roulants', 'Clotures', 'Baies vitrees', 'Pergolas'],
    fieldAction: 'Tour terrain 2h : flyer QR WhatsApp chez commerces travaux, agences, zones pavillonnaires visibles depuis voie publique.',
    digitalAction: 'Campagne Meta/Google localisee rayon 8-12 km : "Photo + dimensions = devis plus rapide".',
    evidence: 'PLU/urbanisme Riviere-Salee et guichets urbanisme Martinique disponibles publiquement.',
    sourceUrl: 'https://riviere-salee.fr/plu/',
    privacyRule: 'Ne pas noter d adresse privee sans contact entrant ou accord du proprietaire.',
  },
  {
    id: 'trois-ilets-anse-mitan-pointe-bout',
    rank: 2,
    commune: 'Les Trois-Ilets',
    zones: ['Anse Mitan', 'Pointe du Bout', 'Rue des 3 Chandelles', 'Anse a l Ane', 'quartiers villas et locations'],
    leadType: 'Mixte pro/particuliers',
    opportunity: 'Zone villas, tourisme, locations saisonnieres : besoins pergolas, baies, volets, garde-corps, resistance saline.',
    products: ['Pergolas', 'Baies vitrees', 'Volets roulants', 'Garde-corps', 'Protections solaires'],
    fieldAction: 'Prospection conciergeries/agences villas + flyers QR chez commerces proches plages.',
    digitalAction: 'Posts/Reels geolocalises "villas et terrasses aux Trois-Ilets".',
    evidence: 'Programme logement cite rue des 3 Chandelles et secteur touristique visible publiquement.',
    sourceUrl: 'https://batisseurs-outremer.com/martinique-ozanam-lance-sa-programmation-2025-des-opportunites-concretes-pour-les-entreprises-du-btp/',
    privacyRule: 'Cibler agences/conciergeries ou leads entrants, pas occupants individuels.',
  },
  {
    id: 'fort-de-france-cluny-didier-redoute',
    rank: 3,
    commune: 'Fort-de-France',
    zones: ['Cluny', 'Didier', 'Redoute', 'Ravine Vilaine', 'Route de Balata', 'centre-ville coproprietes'],
    leadType: 'Particuliers',
    opportunity: 'Renovation maisons/coproprietes, securisation acces, remplacement volets et menuiseries anciennes.',
    products: ['Volets roulants', 'Portes', 'Fenêtres aluminium', 'Garde-corps', 'Portails'],
    fieldAction: 'Cibler syndics/agences + flyers sur zones commerciales, pas boitage massif sans ciblage.',
    digitalAction: 'Annonce "Menuiserie alu a Fort-de-France / Cluny : devis sur photo".',
    evidence: 'OZANAM cite des travaux neufs et rehabilitations lourdes a Fort-de-France.',
    sourceUrl: 'https://batisseurs-outremer.com/martinique-ozanam-lance-sa-programmation-2025-des-opportunites-concretes-pour-les-entreprises-du-btp/',
    privacyRule: 'Adresses chantier seulement si client ou demande entrante.',
  },
  {
    id: 'schoelcher-terreville-case-pilote',
    rank: 4,
    commune: 'Schoelcher / Case-Pilote',
    zones: ['Terreville', 'Fond Lahaye', 'Anse Madame', 'Case-Pilote bourg', 'quartiers littoraux'],
    leadType: 'Particuliers',
    opportunity: 'Maisons et appartements proches littoral : corrosion saline, garde-corps, volets, baies.',
    products: ['Garde-corps', 'Baies vitrees', 'Volets roulants', 'Clotures', 'Pergolas'],
    fieldAction: 'Prospection via agences immobilières et posts geolocalises, pas demarchage porte-a-porte intrusif.',
    digitalAction: 'Campagne "protegez vos ouvertures du sel et du vent".',
    evidence: 'Documents d urbanisme publies pour Schoelcher et Case-Pilote selon DEAL.',
    sourceUrl: 'https://www.martinique.developpement-durable.gouv.fr/consultation-des-plans-locaux-d-urbanisme-a179.html',
    privacyRule: 'Utiliser uniquement contact volontaire ou pro intermediaire.',
  },
  {
    id: 'sainte-luce-marin-diamant',
    rank: 5,
    commune: 'Sainte-Luce / Le Marin / Le Diamant',
    zones: ['Sainte-Luce littoral', 'Le Marin', 'Le Diamant', 'quartiers villas', 'locations saisonnieres'],
    leadType: 'Mixte pro/particuliers',
    opportunity: 'Villas, residences secondaires et tourisme : terrasses, pergolas, fermetures anti-intemperies, volets.',
    products: ['Pergolas', 'Volets roulants', 'Baies vitrees', 'Clotures', 'Portails'],
    fieldAction: 'Cibler conciergeries, agences saisonnieres et artisans partenaires.',
    digitalAction: 'Reels avant/apres terrasse/pergola + CTA WhatsApp.',
    evidence: 'Communes avec PLU/documents urbanisme publies par DEAL, sauf exceptions a verifier.',
    sourceUrl: 'https://www.martinique.developpement-durable.gouv.fr/consultation-des-plans-locaux-d-urbanisme-a179.html',
    privacyRule: 'Pas d adresse privee dans la base publique.',
  },
  {
    id: 'robert-francois-vauclin',
    rank: 6,
    commune: 'Le Robert / Le Francois / Le Vauclin',
    zones: ['Le Robert', 'Le Francois', 'Le Vauclin', 'quartiers residentiels et littoraux'],
    leadType: 'Particuliers',
    opportunity: 'Maisons individuelles et secteurs littoraux : portails, clotures, volets, garde-corps.',
    products: ['Portails aluminium', 'Clotures', 'Volets roulants', 'Garde-corps'],
    fieldAction: 'Tour terrain via commerces materiaux/agences locales + carte QR WhatsApp.',
    digitalAction: 'Campagne locale "securiser maison et jardin en aluminium".',
    evidence: 'Autorisations d urbanisme Martinique disponibles en donnees ouvertes.',
    sourceUrl: 'https://www.data.gouv.fr/datasets/liste-des-permis-de-construire-et-autres-autorisations-durbanisme',
    privacyRule: 'Identifier seulement les zones, pas les proprietaires.',
  },
]
