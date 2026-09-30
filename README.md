# earlyreflect.com — site de Mathieu Fiorentini

Refonte du portfolio de Mathieu Fiorentini (sound designer) — **en production sur
https://earlyreflect.com** (hébergement GitHub Pages, gratuit, HTTPS Let's Encrypt).

- **Stack** : [Astro](https://astro.build) 6 + Tailwind CSS 4 + TypeScript — site 100 % statique, zéro cookie, 0 JS au chargement initial
- **Langues** : EN à la racine, FR sous `/fr/` (défaut : EN)
- **Contenu** : collections Markdown bilingues — **17 projets** migrés depuis l'ancien site
- **Design** : tokens dans `src/styles/global.css` (palette brand `#007190`, paper `#F4F4F0`, Lato auto-hébergée), motif signature « early reflections » (`EarlyReflections.astro`)

## Démarrage

```bash
nvm use          # Node 22 (voir .nvmrc)
npm install
npm run dev      # http://localhost:4321
npm run build    # sortie : dist/
npm run check    # TypeScript + Astro
```

## Structure

```
config-domain.mjs                        # LE fichier de la bascule de domaine (fait)
src/
├── content/projects/{en,fr}/{slug}.md   # les projets (§4.1 de la spec)
├── components/
│   ├── EarlyReflections.astro           # motif signature (header/hero/progression audio)
│   ├── WpImage.astro                    # images locales + srcset responsive
│   ├── LiteYouTube|LiteVimeo|SoundCloudFacade.astro  # façades (iframe au clic seulement)
│   ├── AudioPlayer.astro                # lecteur natif, progression = motif
│   ├── ProjectCard|ProjectGrid.astro    # grille filtrable (fallback liens sans JS)
│   └── pages/*.astro                    # pages partagées EN/FR
├── data/site.ts                         # réglages : socials, email, showreel, Formspree
├── data/pages.ts                        # copy bilingue (facettes, timeline, offres…)
├── i18n/ui.ts                           # traductions + helpers d'URL (mapping chemins FR)
└── pages/llms.txt.ts, llms-full.txt.ts, robots.txt.ts  # générés depuis le contenu
```

## Ajouter un jeu (le guide pour Mathieu)

→ **[docs/ajouter-un-projet.md](docs/ajouter-un-projet.md)** + le modèle de fiche
[docs/template-projet.md](docs/template-projet.md). En bref : dupliquer une fiche
`.md` dans `en/` et `fr/`, remplir, `git push` — le site se redéploie tout seul.

Pour une image brute (key art, pochette) :
```bash
node scripts/optimize-image.mjs mon-image.png nom-de-limage
# → WebP optimisé + tailles responsives + les lignes à coller dans la fiche
```

## Déploiement

Automatique : tout push sur `main` → GitHub Actions → Pages. Domaine
`earlyreflect.com` branché (procédure et diagnostic DNS :
[docs/brancher-le-domaine.md](docs/brancher-le-domaine.md)).

Redirections des anciennes URLs (émulées, meta-refresh) : `/audio/` →
`/work/?discipline=field-recording`, `/musique/` → `/music/`, `/cv/` → `/about/`.

## Discoverabilité IA

`/llms.txt` (index), `/llms-full.txt` (contenu intégral), `/persona.json` (identité
structurée) — générés depuis les collections à chaque build. Crawlers IA
explicitement autorisés dans robots.txt. Procédure : skill `ai-discoverability`.

## Scripts

| Script | Rôle |
|---|---|
| `audit.mjs` | Audit statique complet (SEO/a11y/liens/poids) du `dist/` |
| `optimize-image.mjs` | Image brute → WebP responsive + lignes à coller |
| `gen-og.mjs` | Régénère l'image Open Graph par défaut |
| `compose-clients-square.mjs` | Recompose l'image clients du hero (fond transparent) |
| `white-to-alpha.mjs` | Détourage fond blanc → alpha (usage ponctuel) |
| `scrape-earlyreflect.mjs`, `gen-content.mjs`, `inventory-wp-assets.mjs`, `localize-wp-assets.mjs` | Migration initiale (historique) |

## Historique des décisions

Les retours de Mathieu et leurs traitements : [docs/retour V1.md](docs/retour V1.md),
[retour V2.md](docs/retour V2.md), [retour v3.md](docs/retour v3.md). L'option
portage WordPress (estimée, non retenue pour l'instant) :
[docs/portage-wordpress.md](docs/portage-wordpress.md).

## Reste à faire (côté Mathieu)

- [ ] **CV PDF français** (l'EN 2026 est en ligne — le FR est un placeholder)
- [ ] **Key arts 16:9** des projets avec droits vérifiés (placeholders neutres en place)
- [ ] **Date France Inter** : 2020 ou 2021 (marqué dans les contenus)
- [ ] Étoffer les summaries FR courts (29-79 caractères)
