# Workflow anti-blocage GIB

## Objectif
Eviter qu'une bonne version reste uniquement en local sans publication GitHub Pages.

## Regle
Toute version montrable doit exister dans GitHub, pas seulement sur la machine locale.

## Methode recommandee
1. Faire les modifications localement.
2. Verifier le build local.
3. Pousser les changements sur une branche GitHub ou directement sur `main` si la passe est legere et validee.
4. Verifier GitHub Actions / GitHub Pages.
5. Verifier l'URL publique.
6. Ne plus considerer une version comme "prete" tant que l'URL publique n'affiche pas les marqueurs attendus.

## Check de publication
- build local OK
- pages produits OK
- page devis OK
- mobile OK
- URL GitHub Pages OK
- contenu public = contenu local attendu

## Si le push local est bloque
Utiliser le connecteur GitHub pour :
- creer ou mettre a jour les fichiers textes
- ouvrir une PR
- ou pousser la passe finale si l'ecriture GitHub est disponible

## Marqueurs de validation GIB
Avant de considerer la version validee, verifier publiquement :
- Ducos
- Martinique
- RGE
- Qualicoat
- +20 ans
- menuiserie aluminium
- renovation
- depannage
- reglage
- remplacement
- diagnostic immobilier

## Regle d'exploitation
Pas de nouvelle passe design lourde tant que la version publique precedente n'a pas ete verifiee sur GitHub Pages.

## Lien public de reference
https://cvlad97.github.io/gib-menuiseries-demo/
