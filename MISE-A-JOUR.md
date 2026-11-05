# Mettre à jour le portail existant

Site visé : https://taillacq.github.io/formation-portal/

Cette procédure suppose la configuration déjà validée : dépôt `taillacq/formation-portal`, branche `main`, source Pages `/(root)` et déploiement « Deploy from a branch ». Il n’est pas nécessaire de créer un autre dépôt ni de changer cette configuration.

## 1. Garder un retour arrière

Sur le dépôt GitHub, noter le dernier commit fonctionnel et télécharger une copie du dépôt (Code → Download ZIP). La V2 démarre une nouvelle progression, selon votre choix ; elle laisse les anciennes clés de navigateur intactes, sans les utiliser.

## 2. Préparer les fichiers

Décompresser `formation-portal-v2.zip`. Dans le dossier obtenu, `index.html` doit se trouver au même niveau que `assets/`, et non à l’intérieur d’un second dossier destiné à être publié sous le portail.

Les fichiers de sauvegarde de progression téléchargés depuis le portail sont **personnels et doivent rester hors du dépôt public**. Ne téléverser que les fichiers du lot livré, pas le dossier Téléchargements ni d’autres documents.

## 3. Téléverser dans GitHub

1. Ouvrir le [dépôt formation-portal](https://github.com/taillacq/formation-portal).
2. Sur `main`, choisir **Add file → Upload files**.
3. Glisser le **contenu** du dossier décompressé : `index.html`, le dossier `assets`, `favicon.svg` et les guides. Le dossier parent `formation-portal-v2` et le ZIP ne doivent pas être téléversés comme substitut au site.
4. Vérifier que le nouveau `index.html` remplace bien celui à la racine et que les quatre fichiers existent sous `assets/`.
5. Ajouter `.nojekyll` à la racine. Si l’explorateur masque ce fichier, afficher les fichiers masqués avant de le glisser ; autre possibilité : **Add file → Create new file**, nom `.nojekyll`, contenu vide (ou une simple ligne), puis enregistrer. La publication de fichiers HTML/JS/CSS simples reste possible sans ce fichier, mais il fait partie du lot prévu.
6. Enregistrer le commit avec un message tel que `Portail V2 : cours enrichis et transfert de progression`.

Les guides et outils peuvent être téléversés aussi : ils ne contiennent que des informations publiques du projet. Le minimum nécessaire au fonctionnement est `index.html`, `.nojekyll`, `favicon.svg` et le dossier `assets/` complet.

## 4. Attendre et contrôler

Ouvrir [Actions](https://github.com/taillacq/formation-portal/actions) et attendre la réussite du déploiement **pages build and deployment** correspondant au commit. Si le déploiement échoue, lire l’erreur avant de modifier les paramètres.

Ouvrir ensuite le [portail](https://taillacq.github.io/formation-portal/). Vérifier **V2.0.0** en pied de page, la marque « atelier » et les deux parcours affichant 16 et 10 leçons. Si l’ancien écran apparaît, actualiser complètement la page (Ctrl+F5) et vérifier l’URL. Le HTML référence les ressources avec `?v=2.0.0` pour distinguer le lot.

Rejouer la liste de **VALIDATION.md**, en particulier l’aller-retour de progression entre deux navigateurs. Les cinq vérifications V1 réussies ne valent pas validation de cette nouvelle version.

## 5. Utiliser la progression V2

Sur l’appareil A, terminer une leçon et répondre à son quiz. Dans **Mes sauvegardes**, télécharger le JSON. Sur l’appareil B, ouvrir la même adresse du portail, sélectionner ce fichier, lire l’aperçu et cliquer **Confirmer la fusion**. Vérifier le compteur et le score après actualisation. Lors du retour à A, exporter B et fusionner dans A de la même façon.

Il n’y a pas de synchronisation automatique ni de compte. Le navigateur doit autoriser les téléchargements et le choix de fichiers locaux. Si une règle du poste empêche ces actions, utiliser un moyen de transfert autorisé ; ne pas contourner les restrictions du poste.

## Retour à la version précédente

Avant le retour, exporter la progression V2 et la conserver. Sur GitHub, restaurer les fichiers de la copie précédente ou annuler les commits de mise à jour avec un nouveau commit. Si `.nojekyll` a été ajouté par un commit séparé, prendre en compte les deux commits. Attendre le nouveau déploiement réussi et vérifier l’écran V1 après actualisation complète.

La V1 ne sait pas lire le format V2. Les clés V2 restent dans le navigateur tant qu’elles ne sont pas effacées ; le fichier exporté permet de les réimporter lors d’une réinstallation de la V2 compatible. Ne pas effacer les données du navigateur pour revenir en arrière.

Référence de publication : [GitHub Docs — Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
