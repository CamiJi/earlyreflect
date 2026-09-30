
Retours V1
earlyreflect — Retours sur la v1
Build évalué : https://camiji.github.io/earlyreflect/ (Astro v6.4.8, GitHub Pages)
Référence : specs-earlyreflect.md v1
Priorité générale : la première impression. La page d'accueil passe avant tout le reste.
0. Point structurel : passage sur WordPress (tranché)
La v1 est un site statique Astro sur GitHub Pages. Ce n'est pas la cible. Le site final doit tourner sous WordPress, comme prévu au cahier des charges (§2 : Mathieu met le site à jour lui-même, sans coder et sans déploiement).
La v1 reste utile : sa structure, son contenu et sa mise en page sont validés et servent de maquette de référence. Le travail consiste à les porter sur WordPress, pas à repartir de zéro.
À prévoir pour le portage :
thème bloc sur mesure avec les tokens dans theme.json, et les sections de la home en patterns de blocs (spec §2.3) ;
type de contenu « Projet » avec taxonomie Discipline et champs, dans un plugin compagnon (spec §4) ;
bilingue via Polylang, avec les limites de la version gratuite sur les thèmes bloc (spec §2.4) ;
formulaire de contact géré par WordPress (Jetpack Forms ou plugin léger), donc sans service tiers ;
redirections 301 depuis les anciennes URLs (spec §3) ;
plan WordPress.com payant requis pour l'upload d'un thème maison et l'installation de plugins ;
guide d'autonomie pour Mathieu (spec §10.6).
Point de vigilance : la v1 utilise du JavaScript pour les filtres de la grille Travaux. En WordPress, ces filtres doivent rester fonctionnels sans JS, en repli sur des URLs de taxonomie.
1. Bugs à corriger
#
Problème
Correction attendue
1.1
Les balises canonical, og:url et og:image pointent vers camijii.github.io (deux i), alors que le site est sur camiji.github.io. Les URLs canoniques sont donc fausses sur toutes les pages.
Générer les URLs depuis une seule variable de configuration du site. Prévoir qu'elle deviendra https://earlyreflect.com.
1.2
Le lien YouTube du footer pointe vers youtube.com/results?search=query : c'est un placeholder.
Mettre la vraie URL de chaîne, ou retirer le lien.
1.3
Toutes les images sont chargées depuis earlyreflect.com/wp-content/uploads/..., c'est-à-dire l'ancien site.
Rapatrier les fichiers dans les assets du nouveau site. Aucune image ne doit dépendre de l'ancien hébergement.
1.4
Les images sont servies en 1152 px de large, issues de la médiathèque WordPress.
Repartir des fichiers d'origine en haute définition, et générer les tailles responsives (WebP/AVIF, srcset).
1.5
La fiche France Inter indique « 2020– ».
Date à confirmer par Mathieu (2020 ou 2021), puis corriger partout.
2. Page d'accueil
2.1 Ordre des sections (nouvel ordre attendu)
​
La section Crédits quitte le bas de page pour venir juste après le bandeau. Le reste de l'ordre actuel est conservé.
2.2 Boutons du hero
Passer de 2 à 4 boutons, dans cet ordre :
Libellé EN
Libellé FR
Action
Watch the showreel
Voir le showreel
Ancre vers la section showreel
Get in touch
Me contacter
Page contact
Download CV (PDF)
Télécharger le CV (PDF)
Ouvre le PDF dans un nouvel onglet
LinkedIn
LinkedIn
Profil LinkedIn, nouvel onglet
Règles :
un seul bouton en aplat de couleur (« Voir le showreel ») ; les trois autres en style secondaire, contour fin. Quatre boutons pleins annulent toute hiérarchie ;
sur mobile, les boutons passent sur deux lignes de deux, sans déborder ;
le CV PDF doit exister en version EN et en version FR, et le bouton sert le bon fichier selon la langue de la page.
À fournir par Mathieu : les deux PDF.
2.3 Bandeau image
Reprendre la photo studio actuellement utilisée dans la section « About » de l'accueil.
Format bannière, ratio large (environ 16:6), pleine largeur du conteneur.
La photo actuelle est un crop vertical en basse définition : elle ne tiendra pas en bannière. Il faut un recadrage large depuis le fichier d'origine. À fournir par Mathieu.
Texte alternatif descriptif obligatoire.
La section « About » conserve son texte, mais sans l'image, qui est désormais en bannière.
2.4 Section Crédits
Remontée sous le bandeau.
Logos monochromes, hauteur normalisée, alignés sur une seule ligne en desktop et sur deux en mobile.
Aujourd'hui, Don't Nod, Focus Entertainment et France Inter sont affichés en texte alors que les autres sont en image : il faut les logos, ou tout passer en texte pour rester homogène. Logos à fournir par Mathieu.
Pas de lien sortant sur les logos.
2.5 Contact
Retirer l'adresse email affichée en clair dans la section contact de l'accueil et partout ailleurs. Seul le bouton vers le formulaire reste.
Le formulaire doit réellement envoyer, via WordPress une fois le portage fait (§0). Prévoir : protection anti-spam, message de confirmation explicite, message d'erreur explicite, et conservation des champs saisis en cas d'échec.
3. Page Music
Déplacer la section Work (la grille des projets musicaux) en premier, juste après le titre et l'intro de la page.
Les blocs Radio, Sorties et Distinction viennent ensuite.
Motif : ce sont les morceaux écoutables qui accrochent, pas le texte descriptif.
4. Design général
4.1 Typographie
Police : Lato (ou équivalent grotesque neutre).
Hébergement local de la police, pas d'appel à Google Fonts (performance et RGPD).
Ne charger que les graisses utilisées, en woff2, avec font-display: swap.
Chiffres tabulaires pour les années et les dates.
Conserver les règles de la spec : casse de phrase, pas de libellés en capitales, ligne de texte ≤ 68 caractères.
4.2 Couleurs
Token
Valeur
Usage
paper
#F4F4F0
Fond de page
ink
#000000
Texte et titres
brand
#007190
Aplats de boutons, texte des liens, état actif de la navigation, surlignage, filets, anneau de focus
brand-deep
#005A75
Survol et état pressé des boutons et des liens
Ces valeurs remplacent le §6.2 de la spec.
Contrôles de contraste (à vérifier par le dev avec un outil) :
#007190 sur #F4F4F0 ≈ 5,1:1 → conforme AA pour du texte courant.
Blanc sur #007190 ≈ 5,6:1 → conforme AA pour un libellé de bouton.
Blanc sur #005A75 ≈ 7,7:1 → conforme, y compris au survol.
Contrairement à la palette envisagée précédemment, une seule couleur de marque suffit ici : elle passe les contrastes aussi bien en texte qu'en aplat. Pas besoin d'introduire une seconde nuance en dehors du survol.
Le focus clavier doit rester visible partout, en brand, avec un décalage de 2 px.
Un seul accent sur le site : pas d'autre couleur introduite pour les pastilles de discipline, qui restent en gris.
5. Renforcer l'accroche de la page d'accueil
Ces points ne sont pas des corrections mais des propositions, à valider par Mathieu.
Mettre les titres dans le hero. « Senior sound designer, Wwise consultant and composer » décrit un métier ; les noms de jeux prouvent le niveau. Ajouter une seconde ligne, plus discrète, sous l'accroche : Heavy Rain · Detroit: Become Human · Watch Dogs: Legion · Tell Me Why · Banishers.
Le showreel doit être visible tôt. En desktop, la miniature de la vidéo doit apparaître dès le premier écran ou juste en dessous. Si le bandeau et les crédits repoussent trop la vidéo, réduire la hauteur du hero plutôt que de déplacer la vidéo.
Chiffrer les trois facettes. Les textes actuels sont génériques. Des nombres concrets accrochent mieux : années d'expérience, nombre de titres AAA, nombre d'étudiants par an, projets étudiants primés aux BAFTA.
Vérifier les visuels de la grille Travaux. Une grille de projets sans key art réel ne donne rien. Chaque projet doit avoir son visuel, en ratio 16:9 constant, avec les droits d'usage vérifiés.
Miniature YouTube en haute définition. La miniature actuelle est en hqdefault (480 px), visiblement floue en grand format. Utiliser maxresdefault, ou mieux, une image d'accroche choisie par Mathieu.
6. Ce qui est validé en l'état
Pour éviter les régressions : la navigation, la structure des pages, le découpage en quatre disciplines, les fiches projet, le lien d'évitement vers le contenu et le sélecteur de langue conviennent et ne doivent pas être retouchés.
