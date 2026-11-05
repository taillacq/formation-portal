# Progression pédagogique

Méthode suggérée : lire, produire une réponse à l’exercice, comparer avec la solution, répondre au quiz, refaire les questions mal comprises et marquer la leçon terminée. Les temps incluent la pratique et restent indicatifs. Aucun niveau n’est verrouillé.

## ISTQB CTAL-TAE v2.0

Prérequis conseillés : bases du test de niveau CTFL, compréhension de scénarios et de pseudocode. Support d’autoformation non exhaustif ; conserver le syllabus officiel comme référence. Les correspondances ci-dessous portent sur les **chapitres thématiques**, sans garantie de couverture de tous les objectifs d’apprentissage officiels.

| Chapitre thématique | Leçons stables | Résultat à produire |
| --- | --- | --- |
| 1. Objectifs et cycle de vie | tae-01, tae-02 | Sélection argumentée de tests et répartition du retour dans le cycle |
| 2. Préparation | tae-03, tae-04 | Contrat d’environnement et grille de pilote avec calcul pondéré |
| 3. Architecture | tae-05, tae-06 | Séparation des responsabilités, contrat d’adaptateur et table de frontière |
| 4. Développement | tae-07, tae-08 | Pseudocode indépendant, assertions utiles et traitement de l’instabilité |
| 5. Déploiement et CI/CD | tae-09, tae-10 | Déploiement par vagues et pipeline avec critères de blocage |
| 6. Rapports et métriques | tae-11, tae-12 | Rapport actionnable, taux avec dénominateurs et estimation de gain |
| 7. Vérification de la solution | tae-13, tae-14 | Contrôles connus, propagation d’échec et épreuve des oracles |
| 8. Amélioration continue | tae-15, tae-16 | Expérience mesurée et dossier de synthèse d’un pilote |

Chaque leçon comporte trois QCM à réponse unique et une correction raisonnée. Le mini-bilan utilise une question de chaque leçon, soit 16 questions déjà présentes dans les quiz. Il sert à la révision ; il n’a pas la structure ni la pondération de l’examen officiel.

## Vibe Coding

Le terme est utilisé ici pour un développement assisté par IA avec revue et vérification explicites. Le fil rouge est un carnet de lecture sur données fictives. Un outil IA autorisé peut aider, mais aucune souscription n’est imposée et les exemples restent consultables sans lui.

| Étape | Leçons stables | Livrable progressif |
| --- | --- | --- |
| Cadrer | vibe-01, vibe-02 | Contrat observable et demande IA bornée |
| Construire | vibe-03, vibe-04 | Première page filtrable et point de retour connu |
| Vérifier | vibe-05, vibe-06 | Exemples de test indépendants et correction démontrée |
| Fiabiliser | vibe-07, vibe-08 | Schéma d’import validé, états d’erreur et parcours clavier |
| Livrer | vibe-09, vibe-10 | Lot statique et preuve d’aller-retour entre appareils |

Des exemples de code accompagnent le cadrage, la page initiale, le filtrage testé et la validation de fichier. Le code du portail constitue aussi une réalisation consultable des principes de sauvegarde. Le mini-bilan réutilise une question de chacune des dix leçons.

## Git : les bases et la pratique

Pour débuter : savoir créer un dossier et éditer un fichier texte. La consultation et les quiz ne nécessitent aucune installation. Pour exécuter les exercices : Git 2.28+ et un éditeur sur un poste autorisé. Le fil rouge utilise un dépôt fictif `atelier-git`, un partage local `partage.git` et un clone `lecteur-b`, sans connexion à un service.

| Étape | Leçons stables | Résultat à produire |
| --- | --- | --- |
| Repères | git-01, git-02 | Distinguer travail, index et historique ; créer un premier commit local |
| Travail quotidien | git-03, git-04 | Prédire le contenu préparé et examiner une évolution sans modifier le projet |
| Branches et intégration | git-05, git-06 | Isoler une intention et reconnaître une fusion fast-forward |
| Conflit | git-07 | Réconcilier deux éditions concurrentes et expliquer les deux parents du commit |
| Revenir et mettre de côté | git-08, git-09 | Désindexer sans perte, annuler un commit simple, réappliquer un stash et expliquer ignore |
| Collaboration | git-10, git-11 | Distinguer réception et intégration, partager une branche et un tag annoté |
| Synthèse | git-12 | Livrer une évolution vérifiée et retrouver le même état dans l’autre clone |

Les 12 leçons comprennent 36 questions originales, trois par leçon. Le mini-bilan reprend une question de chaque leçon. Les blocs de commandes accompagnent des actions dans l’éditeur ; ils ne sont jamais exécutés par le portail. La fiche **GIT-ATELIER.md** rappelle les états et commandes. Les notions avancées comme rebase, réécriture d’historique, sous-modules et récupération par reflog restent hors de cette initiation.

## Limites assumées

- Les QCM vérifient surtout compréhension et application simple ; les exercices demandent une production plus ouverte.
- Le portail ne corrige pas automatiquement les exercices libres. Il propose une solution commentée à comparer à votre travail.
- Aucun correcteur IA, appel à un modèle ou envoi de code n’est intégré.
- Les marqueurs terminés et scores sont un suivi personnel, pas une attestation.
- Les autres modules éventuels de la V1 ne sont pas repris : cette V3 conserve les deux parcours de la V2 et y ajoute Git.
