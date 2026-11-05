# Atelier — Portail de formation V3.0.0

Livraison du 5 novembre 2026. Cette V3 ajoute **Git** aux parcours ISTQB CTAL-TAE v2.0 et Vibe Coding de la V2. Portail statique en français, compatible GitHub Pages : aucun backend, compte, paquet, CDN, police distante ou outil de construction nécessaire. JavaScript doit être autorisé dans le navigateur.

## Commencer

1. Décompresser l’archive. Pour un aperçu simple, ouvrir `index.html` dans un navigateur récent. La portée du stockage en ouverture directe dépend du navigateur ; utiliser l’adresse HTTPS publiée pour l’usage régulier.
2. Avant de remplacer la V2, exporter sa progression dans Mes sauvegardes.
3. Suivre **MISE-A-JOUR.md**, puis rejouer **VALIDATION.md** sur le navigateur cible.

## Trois parcours, le même principe

| Parcours | Leçons | Questions originales | Mini-bilan de révision |
| --- | ---: | ---: | ---: |
| ISTQB CTAL-TAE v2.0 | 16 | 48 | 16 questions reprises des quiz |
| Vibe Coding | 10 | 30 | 10 questions reprises des quiz |
| **Git : les bases et la pratique** | **12** | **36** | **12 questions reprises des quiz** |
| Total | 38 | 114 | 38 questions réutilisées, pas 38 questions supplémentaires |

Chaque leçon comprend un objectif, des notions, un exemple fictif, un exercice, une solution commentée à dévoiler, un point de vigilance et un quiz de trois questions corrigées. Navigation précédent/suivant, recherche par parcours, progression et transfert fonctionnent aussi pour Git.

Le parcours Git va du premier commit aux branches, conflits, retours arrière, stash, fichiers ignorés, partage et tags. Les exercices utilisent un carnet de lecture fictif. Le partage se simule entre dossiers locaux, sans service externe. Les leçons et quiz sont consultables sans installation ; la pratique nécessite **Git 2.28+**, un éditeur et un poste autorisé. Le portail n’exécute aucune commande Git. Voir **GIT-ATELIER.md** pour la fiche pratique.

Les 26 leçons V2, leurs identifiants, exercices et corrections sont conservés. Le parcours ISTQB reste un support indépendant non accrédité et non exhaustif ; les mini-bilans ne sont pas des examens officiels. Voir **SOURCES.md** et **PLAN-PEDAGOGIQUE.md**.

## Progression et compatibilité V2

La V3 conserve le format de progression de schéma 2 et exporte avec `contentVersion: "3.0.0"`. Elle accepte les exports V2 (`2.0.0`) et V3 (`3.0.0`). Les exports V1 restent incompatibles.

- Dans le même navigateur, à la même adresse, la V3 reprend la clé V2 au premier chargement **si aucune progression V3 n’existe**. Les écritures suivantes utilisent une nouvelle clé V3 ; la clé V2 reste inchangée.
- Sur un autre appareil, importer votre JSON V2 ou V3 depuis Mes sauvegardes, vérifier l’aperçu et confirmer la fusion.
- La fusion conserve les leçons terminées et les meilleurs scores. Le dernier score suit la date la plus récente ; le compteur de tentatives utilise le maximum pour éviter les doublons, sans totaliser les essais indépendants de plusieurs appareils.
- Avant un import, une copie locale de l’état précédent est conservée. Un fichier invalide est refusé avant mutation. Si la copie ou l’écriture échoue, l’import est refusé.

Les réponses choisies restent seulement dans la session. Les résultats des quiz de leçon sont persistants ; ceux des mini-bilans restent en session. Marquer une leçon terminée est un suivi personnel indépendant du score. Aucune note libre ni donnée sensible n’est collectée. Les exports sont locaux, non chiffrés et doivent rester hors du dépôt public. Détails dans **FORMAT-PROGRESSION.md**.

## Fichiers de l’archive

```text
index.html                 entrée du site
.nojekyll                  service statique direct sur GitHub Pages
favicon.svg                icône locale
assets/content.js          cours ISTQB et Vibe Coding conservés
assets/content-git.js      nouveau parcours Git
assets/progress.js         validation, reprise V2 et fusion
assets/app.js              navigation et interactions
assets/style.css           présentation et adaptation aux écrans
README.md                  ce guide
MISE-A-JOUR.md              installation, reprise V2 et retour arrière
VALIDATION.md              résultats et recette après publication
PLAN-PEDAGOGIQUE.md         progression des trois parcours
GIT-ATELIER.md              fiche pratique et repères Git
FORMAT-PROGRESSION.md       format et règles de fusion
SOURCES.md                 références publiques et attribution
SHA256SUMS.txt              empreintes des fichiers du lot
tools/check.cjs             contrôles du portail (facultatifs, Node 18+)
tools/check-git.cjs         scénarios Git locaux (facultatifs, Node 18+ et Git)
tools/serve.cjs             aperçu local facultatif (Node 18+)
```

Les outils sont facultatifs et ne sont jamais exécutés par le navigateur. Ils ne sont pas nécessaires sur le poste professionnel.

## Vérifications facultatives sur un poste de préparation

- `node tools/check.cjs` : contenu, sauvegardes, reprise V2 et dépendances.
- `node tools/check-git.cjs` : exécute les principaux scénarios dans de nouveaux dépôts temporaires fictifs. Aucun réseau, dépôt existant ni configuration globale modifié. Les dossiers de test sont conservés pour inspection ; leur chemin est affiché à la fin.
- `node tools/serve.cjs` : sert un aperçu à `http://127.0.0.1:4173/formation-portal/`, à arrêter par Ctrl+C.

Les seuls liens externes sont des lectures facultatives sur Sources. Aucun suivi d’audience ni envoi de progression n’est implémenté. L’hébergeur reçoit les requêtes normales de consultation des fichiers publics.

Ce lot ne contient aucune donnée professionnelle interne. **Aucune modification de GitHub ni publication de la V3 n’a été effectuée pendant sa préparation.**
