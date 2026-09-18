# Message à Mathieu — maquette V1.1 (retours appliqués)

*À copier-coller — dernier contenu : voir le tableau à jour dans le repo.*

---

Salut Mathieu !

La maquette V1.1 est en ligne, avec tes retours appliqués point par point :

- **Site de test** : https://camiji.github.io/earlyreflect/
- **Code** : https://github.com/CamiJi/earlyreflect — le dossier `docs/` contient les documents pour avancer : tes retours V1, l'estimation du portage WordPress (avec les options d'hébergement chiffrées), le guide d'architecture.

**Le principe actuel** : c'est une maquette **Astro** (site statique). L'idée n'est pas d'en faire le site définitif — on vérifie que les éléments collent, tu testes, et on itère sur les détails petit à petit : chaque modification se regénère et se déploie en quelques minutes, c'est fait pour.

**Le portage WordPress se fera une fois que c'est calé** : on transposera ce design en thème bloc (il a été pensé pour ça). Mais soyons honnêtes : c'est le moment le plus lourd du projet, et il nécessite une infra payante — plan WordPress.com Business (~25-35 €/mois) ou self-hosted (~5 €/mois). C'est documenté dans le repo, on tranchera ensemble au bon moment. D'où l'importance de stabiliser une version bien définitive **avant** d'attaquer WordPress.

## Tes retours V1 → ce qui a été fait

| Ton retour | Fait |
|---|---|
| §1.1 Canonicals fausses (`camijii` au lieu de `camiji`) | ✅ corrigé, une seule source de config (prête à devenir earlyreflect.com) |
| §1.2 Lien YouTube placeholder dans le footer | ✅ retiré — j'attends ta vraie chaîne |
| §1.3/1.4 Images sur l'ancien site, basse définition | ✅ rapatriées en local, WebP responsives HD (srcset) — plus aucune dépendance à l'ancien hébergement |
| §1.5 France Inter 2020 ou 2021 | ⏳ j'attends ta confirmation |
| §2.1 Crédits remontés sous le bandeau | ✅ |
| §2.2 Hero : 4 boutons (1 aplat + 3 contour), CV selon la langue, grille 2×2 mobile | ✅ |
| §2.3 Bandeau photo 16:6 pleine largeur | ✅ (crop actuel depuis la photo studio — le recadrage HD que tu fourniras fera le reste) |
| §2.4 Crédits homogènes, hauteur normalisée, pas de liens sortants | 🟡 5 logos + 3 en texte (Don't Nod, Focus, France Inter) — j'attends tes 3 SVG pour passer tout en images |
| §2.5 Email retiré de la home | ✅ bouton seul. J'ai gardé l'email obfusqué sur la page contact tant que le formulaire n'envoie rien — dis-moi si tu veux le retirer aussi |
| §3 Page Musique : la grille avant les blocs Radio/Sorties/Distinction | ✅ |
| §4.1 Police Lato, auto-hébergée, graisses utilisées seulement | ✅ |
| §4.2 Nouvelle palette (#007190 / #F4F4F0 / #000000), une seule couleur de marque | ✅ contrastes AA vérifiés (5,1 / 5,6 / 7,7) |
| §5 Ligne de crédits jeux sous le hero, facettes chiffrées, miniature maxresdefault | ✅ implémenté — à valider |
| §6 Navigation, structure, disciplines, fiches, skip link, sélecteur de langue | non touché, comme convenu |

## Ce qui m'attend de ta part

1. Les **CV PDF** EN et FR (des placeholders sont en ligne)
2. Le **recadrage HD large** de la photo studio pour la bannière
3. Les **3 SVG manquants** (Don't Nod, Focus, France Inter)
4. Ta **vraie URL YouTube**
5. La **date France Inter** (2020 ou 2021 ?)

## Et tu peux faire bosser ton IA dessus

Passe-lui ce repo et ton document de retours, rediscute avec elle — on regénère un nouvel envoi sur GitHub Pages à la demande, c'est très facile. L'important étant de stabiliser une version bien définitive avant de s'attaquer au WordPress — et à son infra, qui est particulière (plan payant, ou self-hosted avec découplage DNS — les options et les coûts sont détaillés dans `docs/portage-wordpress.md`).

Dis-moi ce qui coince ou manque, on itère !
