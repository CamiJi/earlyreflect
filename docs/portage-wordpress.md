# Estimation portage WordPress (à ne lancer qu'une fois le design gelé)

Constat retour V1 §0 : la cible finale est WordPress. La maquette Astro sert de
référence de design — on ne code pas deux fois le design, on porte une fois.

## Ordre de grandeur : 5-7 jours de dev concentrée

| Élément | Difficulté | Effort |
|---|---|---|
| Tokens design (`global.css` → `theme.json`) | 🟢 | 1-2 h |
| Header / footer → template parts | 🟢 | 1-2 h |
| Sections home → patterns verrouillés (spec §2.3) | 🟢 | 1 j |
| Motif early reflections → bloc statique | 🟢 | 2 h |
| Templates (home, travaux, fiche, consulting, musique, à propos, contact, légal) | 🟡 | 1-2 j |
| CPT Projet + taxonomie Discipline + champs (Block Bindings ou ACF) | 🟡 | 1 j |
| Filtres grille avec URL partageable → bloc custom | 🔴 | 1 j |
| Façades média (lite-youtube/Vimeo/SoundCloud) → bloc custom | 🔴 | 1 j |
| Lecteur audio signature (progression = motif) → bloc custom | 🔴 | 1 j |
| Rattrapage pixel-perfect (defaults Gutenberg) | 🟡 | 1-2 j |

## Les 3 vrais développements JS

1. **Filtres** : Query Loop + bloc custom ; repli no-JS sur URLs de taxonomie
   (`/work/discipline/field-recording/`) plutôt que `?discipline=` (retour V1 §0)
2. **Façades média** : les embeds natifs WP ne sont pas en façade → bloc custom
   (JS vanilla existant transférable à ~80 %)
3. **Lecteur audio** : progression = motif early reflections (JS existant transférable)

## Risque principal

Pas le style lui-même : **les defaults de Gutenberg** (marges, markup des colonnes,
gap). Le pixel-perfect demande ~300 lignes de CSS de rattrapage dans le thème.
C'est là qu'on perd du temps, pas sur la palette ni les patterns.

## Prérequis côté Mathieu

- Plan WordPress.com **Business** (~25-35 €/mois) pour upload thème + plugins,
  ou hébergement self-hosted (~5 €/mois, ex. o2switch)
- Assets définitifs : key arts HD (droits presse), CV PDF EN/FR, SVG logos

## Options d'infrastructure WordPress (documentées pour Mathieu)

| Option | Coût | Avantages | Inconvénients |
|---|---|---|---|
| **WordPress.com Business** | ~25-35 €/mois (annuel) | Zéro maintenance, staging inclus, plugins + thème custom autorisés, Automattic gère tout | Le plus cher sur 3 ans (~1 000 €) |
| **Self-hosted o2switch** (FR) | ~5 €/mois tout inclus | Hébergement illimité, cPanel, support FR réputé, e-mail inclus | Maintenance basique à soi (mises à jour) |
| **Self-hosted OVH (Perso/Pro)** | ~5-10 €/mois | Proximité, e-mail inclus, module WP 1 clic | Interface datée, perf variables |
| **AWS Lightsail (Bitnami WP)** | ~4-6 €/mois | Puissant, facturation à l'usage, snapshots | Plus technique (SSH, console AWS) |
| **Kimsufi / dédié** | ~5 €+/mois |machine dédiée complète | Overkill pour un portfolio, admin serveur complète |

### Découplage du domaine (self-hosted)

`earlyreflect.com` n'a pas besoin de bouger de registrar :
1. Créer l'hébergement + installer WordPress (ou migrer via Duplicator)
2. Porter le site (thème, contenu)
3. Chez le registrar du domaine : pointer les DNS (A/CNAME) vers le nouvel hébergeur
4. Propagation (~quelques heures), HTTPS gratuit via Let's Encrypt

Le site actuel WordPress.com reste en ligne jusqu'à l'étape 3 → zéro interruption.
La v1 Astro (contenu en Markdown) s'importe ensuite dans le CPT Projet via un
script de migration, ou une resaisie assistée par les patterns verrouillés.

## Ce qui rend le portage mécanique (déjà en place)

- Tokens centralisés dans `src/styles/global.css` (→ deviennent `theme.json`)
- Contenu en Markdown standard (→ deviennent posts/pages CPT)
- Fiche projet figée (→ template du CPT)
- JS vanilla, zéro framework (→ réutilisable dans les blocs custom)
