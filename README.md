# earlyreflect.com — refonte statique

Refonte du site de Mathieu Fiorentini (sound designer) d'après son cahier des charges
(Notion « Spec Refont Site Mathieu Fiorentini », v1 — septembre 2026).

- **Stack** : [Astro](https://astro.build) 6 + Tailwind CSS 4 + TypeScript — site 100 % statique, zéro cookie
- **Démo** : https://camijii.github.io/earlyreflect/
- **Cible finale** : https://earlyreflect.com (bascule DNS, voir §Déploiement)
- **Contenu** : collections Markdown bilingues EN (racine) / FR (`/fr/`), langue par défaut : EN

## Démarrage

```bash
nvm use          # Node 22 (voir .nvmrc)
npm install
npm run dev      # http://localhost:4321/earlyreflect
npm run build    # sortie : dist/
npm run check    # TypeScript + Astro
```

## Structure

```
src/
├── content/projects/{en,fr}/{slug}.md   # CPT « Projet » (spec §4.1)
├── components/
│   ├── EarlyReflections.astro           # motif signature §6.4 (header/hero/progression audio)
│   ├── LiteYouTube|LiteVimeo|SoundCloudFacade.astro  # façades §7 (iframe au clic seulement)
│   ├── AudioPlayer.astro                # lecteur natif, progression = motif §7
│   ├── ProjectCard|ProjectGrid.astro    # grille filtrable §5.2 (filtres client, fallback liens)
│   └── pages/*.astro                    # pages §5.1→§5.7 partagées EN/FR
├── layouts/Layout.astro                 # head SEO/hreflang/OG + skip link
├── data/site.ts                         # réglages : socials, email, showreel, Formspree
├── data/pages.ts                        # copy bilingue des pages (§5.4→§5.7)
└── i18n/ui.ts                           # traductions + helpers d'URL
```

## Modifier le contenu (guide Mathieu)

### Ajouter un projet
1. Créer `src/content/projects/en/mon-projet.md` **et** `src/content/projects/fr/mon-projet.md`
2. Copier le frontmatter d'un projet existant (champs §4.1 : titre, studio, années, rôle,
   summary ≤ 160 car., disciplines multi-valuées, `featured: true` pour la home, `mediaUrl`…)
3. Le key art (16:9, ≥ 1600 px) va dans `public/images/` → `keyArt: "/earlyreflect/images/mon-projet.webp"`
4. Commit + push → le site se redéploie tout seul (GitHub Actions)

### Changer le showreel / accroche / logos / email
Tout est centralisé dans `src/data/site.ts` et `src/data/pages.ts` — texte clair, une ligne par réglage.

### Ce qu'il ne faut pas toucher
- `src/components/EarlyReflections.astro` (motif signature), `src/styles/global.css` (tokens design),
  `astro.config.mjs` (i18n + redirections), `.github/workflows/deploy.yml`.

## Déploiement

**Automatique** : tout push sur `main` → GitHub Actions build + deploy Pages.
Voir le workflow : `.github/workflows/deploy.yml` (Node 22).

**Bascule vers earlyreflect.com** (à faire quand Mathieu est prêt) :
1. Repo GitHub → Settings → Pages → Custom domain : `earlyreflect.com` (+ valider)
2. Chez le registrar du domaine, créer :
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `camijii.github.io`
3. Attendre la propagation DNS, réactiver « Enforce HTTPS » dans Pages
4. Mettre à jour `site` dans `astro.config.mjs` (`site: 'https://earlyreflect.com'`,
   `base: '/'` + ajuster les chemins `/earlyreflect/…` dans `data/site.ts` et les redirects)
5. Le site WordPress.com actuel reste en ligne jusqu'à l'étape 3 → zéro interruption SEO

**Redirections 301 émulées** (GitHub Pages ne fait pas de vraies 301) :
`/audio/` → `/work/?discipline=field-recording`, `/musique/` → `/music/`, `/cv/` → `/about/`
(stubs HTML meta-refresh générés par `astro.config.mjs` — spec §3).
`/about/` et `/contact/` sont conservées à l'identique.

## Formulaire de contact (Formspree)

Le formulaire §5.7 est branché sur Formspree avec un **endpoint placeholder** :
1. Créer un compte gratuit sur https://formspree.io (50 soumissions/mois)
2. Créer un formulaire → récupérer l'ID (ex. `abcd1234`)
3. Le coller dans `src/data/site.ts` → `formspreeId: 'abcd1234'`
4. Dans le dashboard Formspree, activer le spam filtering (Akismet inclus)

## Reste à faire — points [À VALIDER] de la spec

- [ ] **§11.1** : ce repo remplace le choix « plan WordPress.com Business » — à confirmer avec Mathieu
- [ ] **§9.6** : contenus à produire par Mathieu — photo portrait HD, bio EN/FR, key arts (droits à vérifier), CV PDF EN/FR, logos SVG monochromes
- [ ] **§11.2** : Polylang n/a (i18n natif) — la traduction se fait en dupliquant le `.md` dans `fr/`
- [ ] **§11.4** : mention d'Aphelion (NDA actif par défaut)
- [ ] **§11.5** : visibilité de l'offre consulting
- [ ] **§11.6** : commande France Inter 2020 ou 2021
- [ ] **§11.7** : projets live/A/V dans Musique
- [ ] **§11.8** : valider Schibsted Grotesk après maquette
- [ ] YouTube : remplacer l'URL placeholder des socials par la vraie chaîne
- [ ] Bandcamp : ajouter si retenu (§4.2)

## Recette (spec §8)

- [x] 0 iframe au premier chargement (façades) — zéro cookie, pas de bandeau
- [x] Contrastes AA vérifiés : ink/paper 14.9, muted/paper 5.5, signal/paper 6.9, white/signal 7.4
- [x] Skip link, focus visible `signal`, `prefers-reduced-motion` (motif statique)
- [x] hreflang + x-default, canonical, OG
- [x] Menu mobile `aria-expanded`, images lazy (sauf hero — aucun `<img>` dans le hero)
- [ ] Lighthouse mobile ≥ 90 : à mesurer en production (curl-friendly, 0 JS avant interaction)
- [ ] Test navigation clavier complète
