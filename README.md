# Formation Lab — V3 (Git ajouté)

Mise à jour de la V2 publiée sur GitHub Pages, avec un quatrième parcours **Git, GitHub & GitLab** : 12 leçons, cas pratiques, auto-évaluations et exemples de correction. Total : **49 modules** répartis sur 4 parcours.

## Publication sur GitHub
1. Sauvegarder la progression dans le portail actuel via **Exporter**.
2. Ouvrir `https://github.com/taillacq/formation-portal`, branche `main`.
3. Télécharger puis téléverser **index.html** à la racine du dépôt en remplaçant l’ancien. Si GitHub refuse le remplacement via Upload files, utiliser l’interface d’édition du fichier ou Git en local.
4. Enregistrer un commit, puis vérifier le succès du dernier `pages build and deployment` dans Actions.
5. Recharger `https://taillacq.github.io/formation-portal/` avec Ctrl+F5. Vérifier le quatrième parcours, le total de 49 modules et la progression existante.

## Compatibilité / confidentialité
- Aucune dépendance externe ; fonctionne sur GitHub Pages sans installation.
- Les identifiants de modules des trois parcours d’origine sont inchangés. Les clés localStorage de progression et notes sont identiques à la V2 ; l’export conserve le format JSON V2 compatible.
- La progression et les notes restent locales au navigateur, sans synchronisation automatique. La V3 ajoute une nouvelle formation ; cela peut faire baisser le pourcentage **global** sans effacer les leçons déjà terminées.
- Le site est **public** : ne jamais publier de secrets ou de données d’entreprise, y compris dans les exercices Git.

## Contenus Git
01 Git et premier dépôt ; 02 états/status ; 03 diff, staging, commits ; 04 historique ; 05 restore et revert ; 06 branches et merge ; 07 remotes/fetch/pull/push ; 08 PR/MR ; 09 conflits ; 10 .gitignore/secrets ; 11 workflow Codex + Git ; 12 mini-projet de publication.

Documentation officielle : https://git-scm.com/docs et https://docs.github.com/en/pull-requests/reference/merge-conflicts
