# Validation du lot V2.0.0

Date de préparation : 5 novembre 2026. **La V2 n’a pas été publiée sur GitHub pendant cette préparation.**

## Contrôles effectués

| Contrôle | Résultat |
| --- | --- |
| Syntaxe des trois fichiers JavaScript de production | Réussie avec `node --check` |
| Contenu : 26 identifiants uniques, 16 leçons ISTQB, 10 Vibe Coding | Réussi |
| 78 QCM, 4 choix distincts, une réponse valide, correction présente | Réussi |
| Exercices, solutions et notions présents dans toutes les leçons | Réussi structurellement ; ne constitue pas une revue d’accréditation |
| Aller-retour exact du format JSON | Réussi |
| Schéma, version, dates, doublons, identifiants et scores invalides | Refus vérifié |
| Fichier mal formé ou supérieur à 1 Mo | Refus vérifié |
| Fusion sans perte des acquis, meilleur score et dernier score | Réussie |
| Fusion répétée et ordre inversé des deux états | Idempotence et commutativité vérifiées |
| Copie préalable et relecture dans une nouvelle instance | Réussies |
| Import invalide | État et stockage inchangés vérifiés |
| Échec d’écriture de copie préalable ou de progression | Import refusé, état principal préservé vérifié |
| Quota dépassé ou stockage absent | Progression de session exportable vérifiée |
| Valeur locale corrompue | Protection puis réparation par import vérifiées |
| Deux onglets simulés, opérations successives | Fusion des acquis vérifiée ; pas de garantie transactionnelle pour des écritures strictement simultanées |
| Ressources référencées par HTML | Présentes, chemins relatifs |
| Dépendances réseau nécessaires | Aucune : contrôle des scripts, styles et absence de requête applicative |

Le programme `node tools/check.cjs` exécute **14 groupes de contrôles**. Ces contrôles portent sur le contenu, le moteur de progression et les dépendances ; ils ne sont pas des essais de clic dans un navigateur.

## Limite de la vérification visuelle

Le serveur d’aperçu a démarré, mais l’accès HTTP local a échoué dans l’environnement de préparation. Le navigateur intégré a affiché une erreur de connexion. L’essai avec le navigateur Windows a ensuite été arrêté par l’outil de contrôle, qui ne pouvait pas déterminer l’adresse courante avec assez de confiance pour appliquer sa politique.

**L’affichage réel, les clics de bout en bout, le téléchargement de fichier et l’accès depuis le réseau professionnel ne sont donc pas déclarés validés pour cette V2.** Ils restent à vérifier avec la recette ci-dessous. Les cinq contrôles V1 signalés comme réussis par l’utilisateur ne sont pas présentés comme des résultats V2.

## Recette après publication — navigateur cible

Cocher uniquement après observation du résultat.

### Consultation et pédagogie

- [ ] Ouvrir `https://taillacq.github.io/formation-portal/` depuis le navigateur professionnel ; vérifier V2.0.0 en pied de page.
- [ ] Vérifier 16 leçons ISTQB et 10 leçons Vibe Coding.
- [ ] Dans ISTQB, rechercher « stock », ouvrir une leçon, parcourir les notions, ouvrir la solution de l’exercice.
- [ ] Vérifier le premier et le dernier chapitre ISTQB ainsi que la dernière séance Vibe Coding.
- [ ] Répondre aux trois questions d’une leçon ; contrôler score, bonne réponse et explication pour chaque question.
- [ ] Faire un nouvel essai moins bon : le meilleur score reste conservé et le dernier score change.
- [ ] Marquer une leçon terminée ; actualiser ; vérifier marqueur, compteur et meilleur/dernier score.
- [ ] Ouvrir les deux mini-bilans : 16 et 10 questions, avec la mention de score seulement en session.

### Transfert réel entre deux appareils ou profils distincts

- [ ] Sur A, terminer `tae-01` et faire son quiz ; exporter dans Mes sauvegardes.
- [ ] Sur B, terminer `vibe-01` avant l’import, puis sélectionner l’export de A.
- [ ] Vérifier l’aperçu ; confirmer : les deux leçons sont terminées et le quiz de A est présent.
- [ ] Actualiser B : l’état fusionné reste présent.
- [ ] Importer à nouveau le même fichier sur B : aucun doublon et compteur de tentatives inchangé.
- [ ] Télécharger la copie préalable. Vérifier qu’elle contient l’état de B juste avant le dernier import (elle est remplacée à chaque import).
- [ ] Exporter B et importer dans A ; comparer les leçons et les meilleurs scores.

### Entrées invalides et affichage

- [ ] Dans une copie d’un export de test, remplacer `schemaVersion: 2` par `99` : import refusé et progression inchangée.
- [ ] Essayer un fichier texte quelconque : erreur compréhensible, aucun changement de progression.
- [ ] Si possible sur un profil de test, interdire le stockage : après une action, le portail avertit que l’état reste en session et l’export reste utilisable. Ne pas effacer sa progression habituelle pour cet essai.
- [ ] Parcourir navigation, champs et boutons avec Tab ; vérifier un focus visible et activation au clavier.
- [ ] À largeur mobile et avec zoom à 200 %, vérifier lisibilité, absence de commande perdue et accès à l’import.
- [ ] Les cours fonctionnent même si les liens externes de Sources ne sont pas accessibles.

## Critère d’acceptation

Les parcours, corrections, persistance et aller-retour entre deux contextes de navigateur doivent être observés comme fonctionnels sur l’adresse publiée. Si un point échoue, conserver le résultat exact (action, attendu, obtenu, version affichée) et éviter de publier des informations internes lors du signalement.

Ne pas importer les fichiers de progression personnels dans le dépôt GitHub. Pour un signalement, utiliser des données de démonstration.
