# Installer la V3 sur le portail existant

Site : https://taillacq.github.io/formation-portal/

Configuration conservée : dépôt `taillacq/formation-portal`, branche `main`, source Pages `/(root)`, « Deploy from a branch ». Aucun changement de service d’hébergement n’est nécessaire.

## 1. Sauvegarder avant la mise à jour

Depuis la V2, ouvrir **Mes sauvegardes** et télécharger le JSON de progression. Le conserver sur un emplacement personnel autorisé, hors du dépôt public. Sur GitHub, noter le commit fonctionnel et télécharger une copie du dépôt (**Code → Download ZIP**).

La V3 possède une clé de navigateur distincte. Au premier chargement, si aucun état V3 n’existe et si une progression V2 valide est présente à la même adresse, elle est reprise automatiquement. La clé V2 reste intacte. Les actions suivantes sont enregistrées dans la clé V3. Si le navigateur ou l’adresse change, utiliser l’import JSON.

## 2. Décompresser et téléverser

1. Décompresser `formation-portal-v3.zip`.
2. Ouvrir le [dépôt formation-portal](https://github.com/taillacq/formation-portal), puis **Add file → Upload files** sur `main`.
3. Glisser le **contenu** du dossier décompressé à la racine : `index.html`, `assets/`, `favicon.svg`, les guides et, si souhaité, `tools/`. Ne pas téléverser seulement le ZIP ni placer les fichiers dans un sous-dossier `formation-portal-v3/`.
4. Vérifier notamment la présence du **nouveau fichier `assets/content-git.js`**, en plus de `content.js`, `progress.js`, `app.js` et `style.css`. Le nouveau HTML charge ces fichiers dans cet ordre.
5. Conserver ou ajouter `.nojekyll` à la racine. Si ce fichier est masqué dans l’explorateur, afficher les fichiers masqués ou le créer via **Add file → Create new file**, nom `.nojekyll`, contenu vide ou une ligne.
6. Enregistrer le commit, par exemple `Portail V3 : ajouter la formation Git`.

Le minimum requis au fonctionnement est `index.html`, `.nojekyll`, `favicon.svg` et le dossier `assets/` complet. Les guides et outils sont publics et peuvent aussi être téléversés. **Ne joindre aucun export personnel, fichier de travail ou document interne.**

## 3. Contrôler le déploiement et la version

Dans [Actions](https://github.com/taillacq/formation-portal/actions), attendre la réussite de **pages build and deployment** pour le nouveau commit. Puis ouvrir le [portail](https://taillacq.github.io/formation-portal/).

Vérifier : **V3.0.0** en pied de page, navigation Git, trois parcours, **38 leçons** et **114 questions**, dont 12 leçons Git. Si une ancienne version apparaît, actualiser complètement (Ctrl+F5), vérifier l’URL et le résultat du déploiement. Les ressources portent `?v=3.0.0` pour distinguer le nouveau lot.

Le nom **ISTQB CTAL-TAE v2.0** reste normal : il désigne la version du syllabus, pas celle du portail.

## 4. Vérifier la reprise de progression

- Même navigateur et même adresse : les acquis ISTQB et Vibe Coding doivent être présents, Git démarre sans acquis. Un message signale la reprise V2 lors de cette première session.
- Si les acquis attendus sont absents, ouvrir **Mes sauvegardes**, sélectionner l’export V2 conservé, vérifier l’aperçu et confirmer la fusion.
- Si une progression V3 existe déjà dans ce navigateur, elle est prioritaire : un changement ultérieur en V2 exige un import explicite de la nouvelle sauvegarde V2.
- Télécharger ensuite un premier export V3, terminer une leçon Git, répondre à son quiz et actualiser.

La V2 ne sait pas relire un export V3 ; le transfert est compatible **V2 vers V3**, pas l’inverse.

## 5. Valider le parcours et le transfert

Rejouer **VALIDATION.md** depuis le navigateur professionnel. Vérifier cours et corrigés Git, persistance d’une leçon Git, import répété sans doublon et fusion entre deux appareils. L’atelier Git lui-même se pratique uniquement sur un poste où Git est autorisé ; sa lecture et ses quiz fonctionnent sans installation.

## Retour à la V2

Exporter d’abord la progression V3. Restaurer les fichiers de la V2 depuis la copie conservée ou annuler le commit de mise à jour avec un nouveau commit, puis attendre le déploiement et vérifier V2.0.0 après actualisation complète. Si `.nojekyll` a été ajouté séparément, prendre aussi ce commit en compte.

La V2 retrouve sa propre clé, laissée intacte par la V3. Elle ne voit ni les nouvelles leçons Git ni les actions effectuées dans la V3. Garder l’export V3 pour une réinstallation ultérieure ; ne pas effacer le stockage du navigateur.

Référence : [GitHub Docs — Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
