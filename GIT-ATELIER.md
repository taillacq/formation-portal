# Git — fiche de pratique du parcours V3

Cette fiche accompagne les douze leçons. Elle ne lance aucune commande. Lire la consigne et le corrigé de chaque leçon avant de passer à la suivante.

## Terrain de jeu

Sur un poste autorisé disposant de Git 2.28+, créer un **nouveau dossier vide** `atelier-git` avec l’explorateur et ouvrir un terminal dans ce dossier. Utiliser un éditeur de texte pour créer et modifier les fichiers. Les commandes Git ci-dessous sont identiques dans PowerShell et dans les shells usuels ; les commentaires commençant par `#` expliquent les étapes.

Tous les contenus sont fictifs. Ne pas utiliser un dépôt de travail réel ni une adresse interne. Le cours ne demande aucun mot de passe ou jeton, aucune installation sur le poste professionnel et aucun compte GitHub.

Structure obtenue après l’atelier de partage :

```text
dossier personnel d’exercice/
  atelier-git/       première copie, fichiers éditables
  partage.git/       dépôt nu local, à ne pas éditer directement
  lecteur-b/         seconde copie, fichiers éditables
```

Le nom `partage.git` est un dossier local dans cet exercice. Il ne désigne pas une URL ni le dépôt du portail.

## Les trois états

```text
Fichiers de travail  -- git add -->  Index préparé  -- git commit -->  Historique local
       ^                                 |
       |------ git restore (attention) ---|

git restore --staged : modifie l’index, garde les éditions du fichier de travail.
git push : partage une référence avec le distant, étape séparée du commit.
```

`add` prend le contenu au moment de son appel. Une édition suivante doit être préparée à son tour si elle doit appartenir au même commit.

## Lire avant de modifier

| Besoin | Commande | Résultat attendu |
| --- | --- | --- |
| Voir les états | `git status` | Chemins préparés, modifiés et non suivis |
| Lire le travail non préparé | `git diff` | Différence travail/index pour les fichiers suivis |
| Lire le prochain commit | `git diff --staged` | Différence index/HEAD, ou contenu initial préparé |
| Voir le graphe connu | `git log --oneline --graph --decorate --all` | Commits et références locales connues |
| Lire le dernier commit | `git show HEAD` | Métadonnées et changement du dernier commit |
| Vérifier la branche | `git branch --show-current` | Nom de la branche de travail |
| Vérifier les destinations | `git remote -v` | Adresses des distants configurés |

Si un afficheur paginé s’ouvre, `q` permet de le fermer. Une commande de lecture ne modifie pas les fichiers.

## Parcours pratique et contrôles attendus

1. **git-01 et git-02 :** initialiser avec `git init -b main`, définir l’identité **locale** fictive, préparer puis commiter README.md. Résultat : un commit, état propre, aucun distant.
2. **git-03 :** préparer une première ligne puis modifier encore le README. Résultat : le commit contient seulement l’état préparé ; l’autre édition reste dans le travail. La préparer et la commiter avant l’exercice de branche si vous souhaitez conserver cette ligne.
3. **git-04 :** examiner le commit et comparer deux états. Résultat : même état de travail avant et après l’observation.
4. **git-05 et git-06 :** ajouter livres.txt sur ajout-liste puis fusionner depuis main. Résultat prévu sans divergence : fast-forward, pas de commit de fusion supplémentaire, trois titres visibles.
5. **git-07 :** modifier la même première ligne sur titre-mer et main avec deux formulations différentes. Résultat : conflit volontaire. Écrire le contenu final, retirer tous les marqueurs, préparer et commiter. Le commit final possède deux parents.
6. **git-08 :** désindexer un brouillon sans perdre sa rédaction, puis l’enregistrer et annuler ce dernier commit simple. Résultat : le texte du brouillon disparaît avec revert, son commit reste dans l’historique.
7. **git-09 :** mettre de côté une modification et un fichier non suivi avec `stash push -u`, réappliquer une fois avec apply, puis ignorer le brouillon local non suivi. Résultat : travail repris, stash toujours listé, fichier fictif ignoré.
8. **git-10 :** créer le dépôt nu voisin, y envoyer main et le cloner. Dans le clone, ajouter un commit et le partager. Dans la première copie, fetch reçoit sans changer main ; l’intégration explicite `merge --ff-only origin/main` avance ensuite main si elle n’a pas divergé.
9. **git-11 :** créer un tag annoté sur l’état vérifié, puis envoyer explicitement ce tag vers le partage local. Résultat : repère partagé, aucune publication de site web.
10. **git-12 :** ajouter le quatrième titre sur une branche, relire, intégrer, partager et recevoir dans l’autre copie. Résultat : mêmes quatre titres et même identifiant de commit final dans les deux dossiers.

## Choisir le bon retour

| Intention | Choix du cours | Attention |
| --- | --- | --- |
| Garder mon texte mais le sortir du prochain commit | `git restore --staged chemin` | Agit sur l’index ; suppose un état de référence existant dans nos exercices |
| Abandonner des éditions suivies non préparées | `git restore chemin` | Remplace le fichier de travail depuis l’index ; sauvegarder d’abord le texte à garder |
| Annuler l’effet d’un commit simple enregistré | `git revert identifiant` | Nouveau commit inverse ; conflits possibles ; inspecter le commit visé |
| Mettre de côté temporairement | `git stash push -u -m "description"` | Inclut les fichiers non suivis, pas les ignorés ; reste local |
| Reprendre sans retirer le stash | `git stash apply` | Peut entrer en conflit ; vérifier avant toute réapplication |

Le parcours ne demande ni réécriture forcée de l’historique ni envoi forcé. `restore`, `revert` et une restauration de fichiers ne sont pas des synonymes.

## Déblocages courants

- **Identité d’auteur manquante :** dans le dépôt fictif, appliquer les deux commandes `git config --local` de la leçon 2 ; elles ne configurent pas l’accès à un hébergeur.
- **Branche impossible à changer :** lire status et comprendre les modifications qui seraient affectées ; ne pas forcer.
- **Fusion en cours :** résoudre et vérifier le résultat avant add/commit. Pour abandonner la fusion, `git merge --abort` tente de restaurer l’état initial ; démarrer avec un état propre est préférable.
- **Échec de --ff-only :** les branches ont peut-être divergé. Lire le graphe ; choisir ensuite la stratégie appropriée, au lieu de forcer.
- **Distant origin déjà présent :** lire `git remote -v` ; ne pas remplacer sa destination sans comprendre pourquoi. Les noms d’exercice doivent être neufs.
- **Avertissement LF/CRLF :** examiner les différences et les règles de fins de ligne du projet. Il ne signifie pas que les fichiers ont été publiés.

## Validation personnelle

Le quiz vérifie la compréhension. Pour valider la pratique, vous devez pouvoir montrer les fichiers attendus, expliquer ce qui a été préparé, lire le graphe et retrouver l’état final dans les deux copies. Ne déclarer une publication GitHub que si vous l’avez réellement effectuée et vérifiée.

Références officielles et liens par commande dans **SOURCES.md**.
