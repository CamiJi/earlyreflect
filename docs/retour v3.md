Salut Camos, effectivement c'est top, merci encore j'ai juste deux petite modif encore si c'est possible. 

- Est-il possible d'ajouter finalement la liste de mes client sur la droite, comme dans l'image de référence ci joint. Tu trouveras également le png à intégrer

/var/www/html/sideprojects/earlyreflect/docs/logo retour V3.png

Gemini_Generated_Image_qq47rgqq47rgqq47

/var/www/html/sideprojects/earlyreflect/public/images/Gemini_Generated_Image_qq47rgqq47rgqq47.jpg

sideprojects/earlyreflect/public/images/_Gemini_Generated_Image_qq47rgqq47rgqq47.jpg

Salut Camos, effectivement c'est super ! Merci infiniment. Il me reste deux petites modifs à générer avant de passer avant de valider si c'est possible. Tu trouveras mes demandes ici

Retours V3
earlyreflect — Retours sur la v3
Build évalué : https://camiji.github.io/earlyreflect/
Documents de référence : specs-earlyreflect.md, retours-v1-earlyreflect.md, retours-v2-earlyreflect.md
Maquette jointe : capture annotée du hero en deux colonnes (fournie par Mathieu).
Priorité : le hero de la page d'accueil, en version desktop.
1. Corrigé en v3 — ne pas régresser
Les éléments suivants sont validés :
la suppression du bandeau photo ;
le texte de présentation remonté dans le hero, et la suppression de la section About ;
la suppression de la ligne de titres de jeux ;
le titre « Demo Reel » ;
le retrait de la note de chantier ;
les URLs projet en /work/{slug}.
2. Hero : passage en deux colonnes (desktop)

2.1 Mise en page
Reproduire la maquette jointe :
┌────────────────────────────────────────────────────────────────┐
│  COLONNE GAUCHE (~55 %)              COLONNE DROITE (~40 %)    │
│                                                                │
│  Mathieu Fiorentini                  ┌──────────────────────┐  │
│  Senior sound designer, Wwise        │                      │  │
│  consultant and composer             │   Image carrée des   │  │
│  Texte de présentation               │   clients (5 logos)  │  │
│  ▮ ▎ ▏ ▏ · · ·  (motif signature)     │                      │  │
│  [Watch the showreel] [Get in touch] │                      │  │
│  [Download CV (PDF)] [LinkedIn]      └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
​
Colonne gauche : contenu actuel du hero, inchangé (nom, accroche, texte de présentation, motif, quatre boutons).
Colonne droite : l'image carrée des clients (Don't Nod, Ubisoft, Quantic Dream, France Inter, ISART Digital), fournie en PNG par Mathieu.
Centrage vertical de l'image par rapport au bloc de texte de gauche.
Taille d'affichage de l'image : environ 480 px de côté sur un écran de 1440 px, sans jamais dépasser sa taille native.
L'image s'affiche sur fond blanc, comme sur la maquette, pour que les logos restent lisibles sur le fond de page #F4F4F0. Pas d'ombre, pas de bordure.
Texte alternatif : « Clients and employers: Don't Nod, Ubisoft, Quantic Dream, France Inter, ISART Digital » (et son équivalent FR).
Point de bascule en deux colonnes : à partir de 1024 px de large environ.
2.2 Boutons dans la colonne réduite
En passant à ~55 % de largeur, les quatre boutons ne tiennent plus sur une ligne, et « LinkedIn » se retrouve seul sur une seconde ligne (visible sur la maquette). [À VALIDER par Mathieu] Deux options :
(a) garder le rendu de la maquette tel quel ;
(b) répartir les boutons sur deux lignes de deux, pour un rendu plus volontaire.
2.3 Mobile et tablette
La priorité est le desktop. Sous le point de bascule, le rendu mobile peut rester simple :
l'image carrée passe sous les boutons, centrée, avec une largeur maximale d'environ 320 px ;
aucune autre adaptation demandée.
3. Section Credits : remplacement de la bannière
Remplacer l'image actuelle (banniere-clients-alpha.webp) par la « bannière jeux », déjà livrée par Mathieu.
La bannière clients ne doit plus apparaître dans cette section : les clients sont désormais dans le hero (§2), et la section Credits montre les jeux.
Mettre à jour le texte alternatif pour qu'il liste les jeux représentés sur la nouvelle bannière, au lieu des clients.
Le titre « Credits » et sa position (juste après le hero) sont conservés.
4. À corriger en plus
#
Problème
Correction
4.1
L'URL LinkedIn a changé entre la v2 (…/mathieu-fiorentini-8b18b045) et la v3 (…/mathieu-fiorentini-681441344).
Mathieu confirme laquelle est la bonne. Puis même URL partout : bouton du hero, footer, page contact.
4.2
Le <title> et og:title indiquent « Senior sound designer & composer », alors que la meta description et l'accroche visible disent « Senior sound designer, Wwise consultant and composer ».
Aligner les trois sur l'accroche visible, sauf si le raccourci est volontaire.
4.3
theme-color vaut encore #f6f7f5, l'ancienne couleur de fond.
Passer à #F4F4F0.
4.4
La grille « Selected work » est toujours sans visuels.
Reste en attente des key arts (retours v2, §4.2). Prévoir un placeholder neutre d'ici là.
4.5
France Inter est toujours daté « 2020– » (grille et facette Musique).
Date à confirmer par Mathieu (retours v2, §4.4).



Pour ce que tu suggères sur les futurs maj, pour l'instant ça me va parfaitement si on est sur que je peux facilement

- ajouter des images/liens
- ajouter du texte

Par la suite également il faudrait que je puisse tout basculer sur ma propre solution d'hébergement

Dis moi si tout est clair, merci encore et bonne jourée
