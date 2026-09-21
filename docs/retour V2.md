# earlyreflect — Retours sur la v2

# Retours V2

# earlyreflect — Retours sur la v2

Build évalué : https://camiji.github.io/earlyreflect/
Documents de référence : `specs-earlyreflect.md`, `retours-v1-earlyreflect.md`
Priorité : la page d'accueil. Les autres pages ne sont pas concernées par ce tour.

---

## 1. Corrigé en v2 — ne pas régresser

Les URLs canoniques, le rapatriement des images en local, la miniature YouTube en haute définition, les quatre boutons du hero, la remontée des crédits et le retrait de l'email en clair sont validés.

---

## 2. Page d'accueil — nouvel ordre des sections

```
1. Hero        nom + accroche + texte de présentation + 4 boutons
2. Crédits     une seule image : la bannière clients
3. Demo Reel   titre de section + vidéo + légende
4. Three facets
5. Selected work
6. Skills
7. Tools
8. Contact
```

Trois sections disparaissent de la page : le bandeau photo, l'ancienne section « About » et la ligne de titres de jeux du hero.

---

## 3. Modifications demandées

### 3.1 Supprimer le bandeau photo

- Retirer l'image `photoStudio` de la page d'accueil, ainsi que la section qui la contient.
- Le hero enchaîne désormais directement sur les crédits.

### 3.2 Remplacer entièrement la section Crédits par une image unique

- Supprimer la grille de logos actuelle : les cinq logos en image (Quantic Dream, Ubisoft, ISART Digital, INA, Gaumont Animation) **et** les trois noms en texte (Don't Nod, Focus Entertainment, France Inter).
- Les remplacer par le fichier **« bannière clients »** fourni par Mathieu, affiché en pleine largeur du conteneur.
- Le titre « Credits / Crédits » est conservé au-dessus, dans le même style que les autres titres de section.
- Texte alternatif obligatoire, listant les clients représentés sur la bannière.
- **Spécifications du fichier, à respecter par Mathieu :** SVG de préférence, sinon PNG ou WebP à fond transparent en résolution double. Une bannière horizontale unique devient illisible sur mobile : prévoir soit un SVG qui reste net, soit une seconde version pour les petits écrans (logos sur deux ou trois lignes).

### 3.3 Ajouter un titre à la section vidéo

- Ajouter un titre **« Demo Reel »** au-dessus de la vidéo YouTube.
- Même niveau de titre, même police et même taille que « Three facets », « Selected work » ou « Skills ».
- Version FR : « Demo Reel » également, le terme est d'usage dans le métier.
- Conserver la légende existante sous la vidéo.

### 3.4 Supprimer la section About et remonter son contenu dans le hero

- Supprimer la section « About » de la page d'accueil (titre compris).
- Déplacer son texte dans le hero, **juste sous la ligne « Senior sound designer, Wwise consultant and composer »**, sans titre.
- Le hero devient donc : nom, accroche, texte de présentation, boutons.
- Typographie : ce paragraphe doit être plus discret que l'accroche. Corps de texte normal, largeur limitée à environ 60 caractères, pour ne pas écraser les boutons.
- Les boutons restent en dessous de ce paragraphe.
- La page « About » du site n'est pas concernée : elle reste en place.

### 3.5 Supprimer la ligne de titres de jeux du hero

- Retirer « Heavy Rain · Detroit: Become Human · Watch Dogs: Legion · Tell Me Why · Banishers ».
- Les studios restent mentionnés dans le texte de présentation remonté au 3.4, donc la preuve ne disparaît pas du premier écran.

### 3.6 CV

- Uploader le CV fourni à la fois en anglais et en français

---

## 4. À corriger en plus

| # | Problème | Correction |
| --- | --- | --- |
| 4.1 | **Une note interne de développement est publiée sur le site.** Sous la section Crédits, la page affiche en clair une phrase indiquant que les logos Don't Nod, Focus et France Inter restent à fournir, avec la référence au document de retours. | Supprimer. Vérifier qu'aucune autre note de ce type ne subsiste sur les autres pages. Les remarques de chantier ne doivent jamais atterrir dans le rendu. |
| 4.2 | Les projets de « Selected work » s'affichent sans visuel : la grille n'est que du texte. C'est ce qui devrait accrocher en premier. | Chaque projet doit avoir son key art en 16:9. **À fournir par Mathieu**, avec vérification des droits d'usage. Tant qu'un visuel manque, prévoir un placeholder neutre plutôt qu'un vide. |
| 4.3 | Les fiches projet sont à des URLs du type `/work/en/{slug}`, alors que la version EN est déjà la version par défaut à la racine. | Aligner sur la spec : `/work/{slug}` en EN et `/fr/travaux/{slug}` en FR. À faire avant la mise en production, pour éviter d'avoir à rediriger ensuite. |
| 4.4 | France Inter est daté « 2020– » dans la grille et dans la facette Musique. | Date à confirmer par Mathieu, puis corriger partout. |

---

## 5. Remarque

Avec la suppression du bandeau, plus aucune photo de Mathieu n'apparaît sur la page d'accueil. C'est cohérent avec l'objectif, puisque ce sont les jeux et le reel qui vendent, mais il faut alors qu'un portrait figure sur la page « About », sans quoi le site devient entièrement impersonnel. À vérifier par Mathieu.