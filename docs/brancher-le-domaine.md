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

## ⚠️ CRITIQUE — le domaine est chez Wild West Domains (GoDaddy), connecté à WordPress.com

Diagnostic du 2026-09-23 (RDAP + résolution DNS) :

- **Registrar réel** : Wild West Domains, LLC (filiale GoDaddy) — le domaine
  n'est PAS enregistré chez WordPress.com, il y est seulement « connecté »
- **Expiration** : 15 février 2028 (aucune urgence de renouvellement)
- **Verrous** : transfer/delete/renew prohibited — protections standard, se
  lèvent volontairement
- **DNS servis par** : ns1-3.wordpress.com (le site actuel répond sur leurs IP)

### Le blocage connu

Dans l'éditeur DNS de WordPress.com, l'enregistrement `A @` est marqué
« Géré par WordPress.com » : **non éditable** — c'est l'A auto-géré pour leur
hébergement. L'avertissement « serveurs de noms externes » s'affiche malgré des
NS publics pointant chez eux.

### Option 1 — tout dans l'interface WordPress.com (essayer d'abord)

1. Cliquer le lien « Vous pouvez mettre à jour vos serveurs de noms ici »
   (force le mode DNS géré par WordPress.com — les NS publics y sont déjà :
   sans risque, et ça déverrouille l'éditeur)
2. Remplacer l'enregistrement `A @` par les 4 IP GitHub :
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. `CNAME www` → `camiji.github.io` ; le `CNAME *` existant est inutile, à supprimer
4. Avant tout ça : côté GitHub, Settings → Pages → Custom domain
   `earlyreflect.com` (prépare le certificat HTTPS)

### Option 2 — basculer par GoDaddy/Wild West (le définitif)

Le domaine leur appartient depuis 2016 :
1. Connexion au compte GoDaddy/Wild West → DNS du domaine
2. Remettre les NS par défaut GoDaddy (`ns35/ns36.domaincontrol.com`) — la zone
   WordPress.com devient inerte automatiquement
3. Créer les mêmes records : 4 `A` @ + `CNAME www` → `camiji.github.io`
4. C'est LA bascule : le site WordPress actuel cesse de répondre sur le domaine,
   le nouveau prend le relais (contenu déjà migré)

## Troubleshooting du certificat (retour d'expérience du 23/09)

Symptôme : le provisioning reste figé sur « 1 of 3 — Certificate Requested »
pendant des heures, certificat `*.github.io` servi à la place.

Cause trouvée : un **`CNAME *` → earlyreflect.com** (wildcard) dans la zone DNS
crée des chemins de résolution ambigus qui font échouer la validation Let's
Encrypt en silence.

Fix : supprimer le wildcard, puis relancer (vider / re-remettre le Custom domain
dans Settings → Pages). L'émission prend 10-30 min ensuite (le « up to 24
hours » de l'UI est le pire cas, très rare).

Vérifier l'avancement :
```bash
curl -s https://api.github.com/repos/CamiJi/earlyreflect/pages \
  -H "Authorization: Bearer <token>" | python3 -c \
  "import json,sys; d=json.load(sys.stdin); print(d['https_certificate']['state'])"
# new → dns_changed → requesting → issued (✓)
```

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
