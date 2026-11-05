# Atelier — Portail de formation V2.0.0

Livraison du 5 novembre 2026. Portail statique en français, prêt à téléverser sur GitHub Pages. Aucun backend, compte, paquet à installer, CDN, police distante ou outil de construction. JavaScript doit être autorisé dans le navigateur.

## Commencer

1. Décompresser l’archive.
2. Pour un aperçu, ouvrir `index.html` dans un navigateur récent. La portée du stockage en ouverture directe de fichier dépend du navigateur : utiliser l’adresse HTTPS publiée pour l’usage régulier.
3. Pour mettre à jour le site, suivre **MISE-A-JOUR.md**.
4. Après publication, suivre **VALIDATION.md** sur le navigateur cible.

## Le contenu

- **ISTQB CTAL-TAE v2.0** : 16 leçons, deux par chapitre thématique, exercices commentés, 48 questions originales et un mini-bilan de 16 questions issues des quiz.
- **Vibe Coding** : 10 leçons progressives, carnet de lecture fictif comme fil rouge, exemples de code, exercices commentés, 30 questions originales et mini-bilan de 10 questions issues des quiz.
- Chaque leçon : objectif, notions, exemple fictif, vigilance, exercice, solution masquée jusqu’à ouverture et quiz corrigé.
- Recherche dans chaque parcours, navigation précédent/suivant, reprise de la première leçon non terminée, interface adaptée aux petits écrans et impression de la leçon.

Support indépendant d’autoformation, **non accrédité et non exhaustif**. Les mini-bilans ne sont pas des examens blancs officiels et ne reproduisent pas le niveau ni la pondération de la certification. Consulter le syllabus et les ressources officielles en complément. Voir **SOURCES.md** et **PLAN-PEDAGOGIQUE.md**.

## Progression

Les leçons terminées, meilleurs/derniers scores et compteurs de tentatives restent dans `localStorage` du navigateur. Les réponses choisies et corrections courantes restent seulement en mémoire de session. Marquer une leçon terminée est une déclaration personnelle, indépendante de la réussite au quiz.

Sur la page **Mes sauvegardes** : exporter un fichier JSON, le transférer par un moyen personnel autorisé, puis sélectionner le fichier sur l’appareil d’arrivée et confirmer l’aperçu. L’import est une **fusion** : il conserve les acquis des deux côtés. Il ne remplace pas la progression et ne permet pas d’annuler une leçon terminée. Voir **FORMAT-PROGRESSION.md** pour les règles, limites et compteurs.

Une copie locale avant le dernier import est conservée et peut être téléchargée. Les imports invalides sont refusés avant modification ; un import dont la copie préalable ou l’écriture échoue est refusé. Un fichier exporté ne contient ni nom, ni secret, ni texte libre et n’est pas chiffré.

**V2 autonome**, conformément à la demande : pas de migration de la V1. La nouvelle clé est `formation-portal.progress.v2` ; les anciennes clés ne sont ni lues, ni effacées. Ne pas importer d’exports V1. Aucune commande `localStorage.clear()` n’est utilisée.

## Ce que contient l’archive

```text
index.html                 entrée du site
.nojekyll                  service statique direct par GitHub Pages
favicon.svg                icône locale
assets/content.js          cours, exercices, questions et corrigés
assets/progress.js         validation, stockage et fusion
assets/app.js              navigation et interactions
assets/style.css           présentation et adaptation aux écrans
README.md                  ce guide
MISE-A-JOUR.md              mise à jour et retour arrière
VALIDATION.md              résultats et recette après publication
PLAN-PEDAGOGIQUE.md         progression des deux parcours
FORMAT-PROGRESSION.md       format et règles de fusion
SOURCES.md                 références et attribution
SHA256SUMS.txt              empreintes des fichiers du lot
tools/check.cjs             contrôles facultatifs du moteur (Node 18+)
tools/serve.cjs             aperçu local facultatif (Node 18+)
```

Les fichiers `tools/` servent à la vérification facultative sur un poste de préparation ; ils ne sont jamais exécutés par le site et ne sont pas nécessaires sur le poste professionnel.

## Vérification facultative avec Node

Depuis le dossier décompressé : `node tools/check.cjs`. Aucun téléchargement de dépendance. Pour un serveur d’aperçu facultatif : `node tools/serve.cjs`, puis ouvrir `http://127.0.0.1:4173/formation-portal/`. Arrêter avec Ctrl+C.

Les seuls liens externes sont des lectures facultatives sur la page Sources. Les cours, quiz et sauvegardes ne les chargent pas automatiquement. Aucun suivi d’audience ni envoi de progression n’est implémenté. L’hébergeur reçoit les requêtes HTTP nécessaires à la consultation des fichiers publics.

Le lot livré ne contient aucune donnée professionnelle interne. **Aucune modification de GitHub ni publication de cette V2 n’a été effectuée pendant la préparation.**
