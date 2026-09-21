# Modèle de fiche projet

*Copier ce fichier dans `src/content/projects/en/` (version EN) et `src/content/projects/fr/` (version FR) avec le nom du jeu en nom de fichier : `mon-jeu.md`.*

```markdown
---
title: "Mon Jeu"
studio: "Studio / éditeur"
years: "2024–2025"
role: "Senior sound designer"
platforms: "PC, PS5"            # optionnel
summary: "Résumé en une phrase (max ~160 caractères) — affiché dans la grille et dans Google."
disciplines: ["technical-sound-design"]   # au choix : show-reel, technical-sound-design, field-recording, music
featured: false                  # true = apparaît dans la sélection de la home (max 9)
order: 18                        # position dans la liste (les plus récents d'abord)

# Média principal — UN seul : vidéo YouTube, Vimeo, SoundCloud ou fichier audio
mediaUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
mediaCaption: "Légende courte sous le média"

# Liens externes (optionnel — articles, interviews, page Steam)
links:
  - label: "Page Steam"
    url: "https://store.steampowered.com/app/XXX"

# Médias secondaires (optionnel — extraits, making-of)
secondaryMedia:
  - url: "https://api.soundcloud.com/tracks/XXXXXX"
    caption: "Extrait d'ambiance"
---

## Ce que j'ai fait

Décris ici tes responsabilités, les défis, l'approche. 3-5 phrases suffisent.
Ce texte apparaît sous le média principal.
```

## Règles

- **Key art** : image 16:9, minimum 1600 px de large, dans `public/images/` puis
  ajouter `keyArt: "/earlyreflect/images/mon-jeu.webp"` et `keyArtAlt: "description"`
- **summary** : ≤ 160 caractères — c'est ce que Google affiche
- **disciplines** : au moins une, plusieurs possibles entre crochets séparées par virgules
- Le projet apparaît automatiquement : grille Travaux, page Musique (si `music`),
  RSS sitemap — aucun autre fichier à modifier
