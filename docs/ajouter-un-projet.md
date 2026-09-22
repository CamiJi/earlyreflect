# Ajouter un jeu au site — guide pour Mathieu

**Réponse courte à « est-ce qu'il y a besoin de rebuild ? » : non, jamais.**
À chaque `push` sur GitHub, le site se regénère et se redéploie **automatiquement**
(environ 1 à 2 minutes). Tu n'as qu'à pousser des fichiers texte.

## Prérequis (une seule fois)

1. Un compte **GitHub** (gratuit) — et être ajouté comme collaborateur du repo
   `CamiJi/earlyreflect` (Camille t'invite : Settings → Collaborators)
2. **VS Code** + Git installé sur ta machine
3. Cloner le repo (une seule fois) :

```bash
git clone https://github.com/CamiJi/earlyreflect.git
cd earlyreflect
npm install        # une seule fois (Node 22 requis, voir .nvmrc)
```

## Ajouter un jeu (10 minutes, toutes les 6 mois)

### 1. Copier une fiche existante

Prends une fiche récente comme modèle — par exemple
`src/content/projects/en/banishers-ghosts-of-new-eden.md` — et crée une copie :

- **`src/content/projects/en/mon-jeu.md`** (version anglaise)
- **`src/content/projects/fr/mon-jeu.md`** (version française)

Le nom du fichier = le slug dans l'URL : `mon-jeu.md` → `/work/mon-jeu/`.

### 2. Remplir la fiche

Tous les champs sont décrits dans [`docs/template-projet.md`](template-projet.md).
L'essentiel :

| Champ | Note |
|---|---|
| `title`, `studio`, `years`, `role` | Le bandeau d'infos de la fiche |
| `summary` | ≤ 160 caractères — c'est ce que Google affiche |
| `disciplines` | `show-reel`, `technical-sound-design`, `field-recording`, `music` |
| `mediaUrl` | YouTube / Vimeo / SoundCloud — rendu en façade cliquable |
| `keyArt` | Image 16:9 (≥ 1600 px) dans `public/images/` + `keyArtAlt` obligatoire |
| `featured: true` | Pour l'afficher dans la sélection de la home (6 à 9 max) |

### 3. Ajouter le key art

Glisse l'image (16:9, ≥ 1600 px) dans `public/images/`, puis référence-la dans la
fiche :

```yaml
keyArt: "/earlyreflect/images/mon-jeu.webp"
keyArtAlt: "Key art de Mon Jeu (copyright Studio — autorisé pour portfolio)"
```

### 4. Vérifier en local (optionnel mais confortable)

```bash
npm run dev
```

→ http://localhost:4321/earlyreflect — tu vois le site en direct pendant que tu
édites. `Ctrl+C` pour arrêter.

### 5. Publier

```bash
git add -A
git commit -m "Ajout de Mon Jeu"
git push
```

**C'est tout.** GitHub Actions regénère le site et le déploie tout seul —
vérifie sur https://camiji.github.io/earlyreflect/ deux minutes plus tard.

## Autres mises à jour courantes

| Quoi | Où |
|---|---|
| Showreel, email, réseaux sociaux, logos outils | `src/data/site.ts` |
| Textes des pages (facettes, offres consulting, musique…) | `src/data/pages.ts` |
| Bannière clients / images globales | `public/images/` |
| CV PDF | `public/documents/cv-en.pdf` + `cv-fr.pdf` (même nom de fichier) |

## Basculer sur ton propre hébergement (quand tu veux)

Le site est 100 % statique — rien de spécial à installer chez un hébergeur. Trois
scénarios, du plus simple au plus autonome :

### Scénario A — rester où c'est (recommandé, 0 €/mois)

On garde le repo GitHub + GitHub Pages, et on branche ton domaine :
1. GitHub (Settings → Pages) → Custom domain : `earlyreflect.com`
2. Chez ton registrar : 4 lignes DNS `A` (185.199.108-111.153) + `CNAME www` → `camiji.github.io`
3. Camille adapte la config du site (domaine final, base `/`) — 5 min

Tes visiteurs ne voient que `earlyreflect.com`. Zéro interruption : l'ancien site
reste en ligne jusqu'à la bascule DNS.

### Scénario B — ton propre hébergement, déploiement manuel

Avec `npm run build`, le site complet tient dans un dossier `dist/` :

```bash
npm run build
rsync -av --delete dist/ utilisateur@ton-serveur:/var/www/earlyreflect/
```

N'importe quel serveur web (nginx, Apache) sert ces fichiers tel quel. Le site
est à jour à chaque rsync. Inconvénient : c'est toi qui pousses.

### Scénario C — ton hébergement + déploiement automatique

Comme le B, mais le push GitHub déclenche le déploiement (workflow qui fait le
rsync à chaque mise à jour). La config se fait une fois avec Camille ; ensuite
même usage que le scénario A : tu pushes, ça se déploie sur TON serveur.

> Dans les trois cas, l'ajout d'un jeu reste identique : une fiche `.md` remplie,
> un push. Seule change la destination du déploiement.

## Ce qu'il ne faut pas toucher

- `src/components/EarlyReflections.astro` — le motif signature
- `src/styles/global.css` — les tokens de design (couleurs, typo)
- `.github/workflows/deploy.yml` — le déploiement automatique
- `astro.config.mjs` — la config du site (i18n, redirections)

## En cas de pépin

- Le build est cassé après un push ? GitHub te l'envoie par mail
  (onglet **Actions** du repo → run en rouge) — en général : une apostrophe non
  échappée dans un `title:` → mets la valeur entre guillemets.
- Rien de grave : un mauvais push n'arrête jamais le site, le précédent reste en
  ligne tant que le nouveau n'est pas vert.
