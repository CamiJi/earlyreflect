# Brancher earlyreflect.com — procédure de bascule

**Réponse à « faut-il modifier le code et recompiler ? »** : oui, mais **2 lignes dans
1 fichier + 1 push**. Tout le reste suit automatiquement (canonicals, sitemap,
robots.txt, hreflang, CV, redirections, images) car tout est dérivé de
`config-domain.mjs`. La procédure est testée en conditions réelles (simulation
effectuée et validée).

## La bascule (5 minutes)

1. **Éditer `config-domain.mjs`** (racine du repo) :

```js
export const SITE_URL = 'https://earlyreflect.com';
export const BASE_PATH = '/';
```

2. **Commit + push** (`git add config-domain.mjs && git commit && git push`)
3. GitHub Actions redéploie — le site est servi avec les URLs `earlyreflect.com/…`
   (mais tant que le DNS n'est pas basculé, ce contenu n'est visible que sur
   l'adresse Pages — pas grave).

## Brancher le domaine (côté GitHub et registrar)

1. **GitHub** : Settings → Pages → Custom domain : `earlyreflect.com` → Save
2. **Registrar du domaine** (Mathieu) :
   - `A` @ → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` www → `camiji.github.io`
3. Attendre la propagation (de quelques minutes à quelques heures)
4. Réactiver « Enforce HTTPS » dans Settings → Pages (certificat auto Let's Encrypt)

## Ordre des opérations (zéro interruption SEO)

1. La bascule code ci-dessus (le sitePages sert déjà les URLs finales)
2. Le branchement DNS — le site WordPress.com actuel reste en ligne **jusqu'ici**
3. Vérification : `earlyreflect.com` répond, redirections `/audio/`, `/musique/`,
   `/cv/` OK
4. **Seulement ensuite** : résilier le WordPress.com — ⚠️ si le domaine a été
   enregistré via WordPress.com, le transférer d'abord vers un registrar
   (OVH, Cloudflare…) sinon le domaine meurt avec le compte
5. Mettre à jour la Search Console (nouveau domaine) — optionnel mais propre

## Ce que Mathieu peut faire lui-même (avec Copilot)

Les étapes 1 (édition de `config-domain.mjs`) et 2 (push) : une contribution
classique. Les étapes DNS : depuis le registrar, copier-coller les valeurs
ci-dessus. Aucun build local nécessaire — GitHub Actions fait tout.

## Vérifications post-bascule

```bash
curl -s https://earlyreflect.com/ | grep canonical      # → https://earlyreflect.com/
curl -s https://earlyreflect.com/robots.txt | grep Sitemap
curl -s https://earlyreflect.com/musique/ | grep content  # → /music/
curl -s -o /dev/null -w "%{http_code}" https://earlyreflect.com/documents/cv-en.pdf
```
