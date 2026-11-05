# Validation du lot V3.0.0

Préparation du 5 novembre 2026. **La V3 n’a pas été publiée sur GitHub pendant cette préparation.**

## Résultats observés

### Portail et progression : 19 groupes de contrôles réussis

Programme : `node tools/check.cjs`.

| Contrôle | Résultat |
| --- | --- |
| 38 leçons uniques, dont 16 ISTQB, 10 Vibe Coding et 12 Git | Réussi |
| 114 questions, quatre choix distincts, bonne réponse et correction présentes | Réussi |
| Objectifs, notions, exercices et solutions dans chaque leçon | Présence vérifiée ; pas une accréditation pédagogique |
| Les 26 leçons V2 conservent leurs identifiants, contenus et corrections | Comparaison exacte réussie avec la V2 voisine lors de la préparation |
| Aller-retour du JSON de progression | Réussi |
| Fichier invalide, trop volumineux, schéma/version inconnus, dates et scores invalides | Refus vérifié avant mutation |
| Fusion sans perte, répétition d’import et inversion des deux états | Réussies |
| Meilleur score conservé après un moins bon essai | Réussi |
| Copie préalable et relecture persistante dans une autre instance | Réussies |
| Échec de la copie ou de l’écriture d’import | Refus avec état principal préservé vérifié |
| Stockage absent ou quota dépassé | État de session exportable vérifié |
| Valeur locale corrompue et réparation par import | Vérifiées |
| Deux onglets simulés, opérations successives | Acquis réunis ; pas de transaction garantie entre écritures strictement simultanées |
| Import d’un export V2 dans une progression V3 comprenant Git | Acquis des deux versions conservés |
| Reprise locale V2 lorsqu’aucun état V3 n’existe | Vérifiée, clé V2 laissée inchangée |
| Priorité d’un état V3 existant sur la clé V2 | Vérifiée |
| Fichier déclaré V2 contenant des identifiants Git | Refus vérifié |
| Valeur V2 illisible | Original conservé, écriture V3 après import valide vérifiée |
| Ressources HTML et dépendances réseau | Fichiers présents, chemins relatifs, aucune dépendance distante nécessaire |

La syntaxe des quatre fichiers JavaScript de production a aussi été contrôlée avec `node --check`.

### Pratique Git : 8 scénarios réels réussis

Programme : `node tools/check-git.cjs`, avec Git **2.55.0.windows.5**. Les dépôts ont été créés dans un nouveau dossier temporaire, sur données fictives seulement. Aucun accès réseau, aucun dépôt existant ni configuration globale modifié.

1. Initialisation sur main, identité locale et premier commit.
2. Distinction contenu préparé/édition suivante, historique et comparaison.
3. Branche séparée et intégration fast-forward sans nouveau commit de fusion.
4. Conflit provoqué sur une même ligne, résolution et commit à deux parents.
5. Désindexation sans perte de texte puis revert d’un dernier commit simple.
6. Stash incluant un fichier non suivi, apply sans retrait du stash, règle ignore.
7. Dépôt nu local, clone, envoi depuis B, fetch séparé de l’intégration dans A.
8. Tag annoté envoyé explicitement et atelier final : quatre titres identiques et même commit dans les deux copies.

Ces essais confirment les mécanismes enseignés dans l’environnement indiqué. Ils ne garantissent pas une configuration identique sur tous les postes ; les messages peuvent varier selon la version et la langue de Git.

## Limite de vérification dans le navigateur

L’ouverture directe de `index.html` a été refusée par la politique du navigateur de contrôle : seuls HTTP et HTTPS sont admis, pas le protocole de fichier local. Cette limite n’a pas été contournée. L’aperçu HTTP local avait déjà échoué pendant la préparation V2 ; il n’est pas présenté comme validé pour la V3.

**L’affichage réel, les clics, le téléchargement de fichier et l’accès depuis le réseau professionnel restent à vérifier sur la V3 publiée.** Les contrôles de moteur et les scénarios Git ci-dessus ne sont pas des essais de navigateur de bout en bout. Les vérifications réussies précédemment sur la V1 ne sont pas réutilisées comme résultats V3.

## Recette après publication

Cocher seulement après observation du résultat.

### Installation et navigation

- [ ] Depuis le navigateur professionnel, ouvrir `https://taillacq.github.io/formation-portal/` et vérifier **V3.0.0** en pied de page.
- [ ] Vérifier trois parcours, 38 leçons et 114 questions sur l’accueil.
- [ ] Ouvrir Git : 12 leçons, 36 questions et un mini-bilan de 12 questions.
- [ ] Rechercher « conflit » dans Git, ouvrir la leçon et consulter l’exemple, le bloc de commandes, l’exercice et sa solution.
- [ ] Vérifier le précédent/suivant, la première et la dernière leçon Git.
- [ ] Ouvrir aussi ISTQB et Vibe Coding pour confirmer l’accès aux contenus conservés.

### Quiz et persistance Git

- [ ] Répondre aux trois questions de git-01 ; voir score, réponse attendue et explication pour chaque question.
- [ ] Faire un second essai moins bon : le meilleur score reste, le dernier score change.
- [ ] Marquer git-01 terminée, actualiser : marqueur et scores persistent.
- [ ] Revenir à l’accueil : compteur total et carte Git reflètent la leçon terminée.
- [ ] Ouvrir le mini-bilan Git : 12 questions avec correction, mention que son score reste en session.

### Reprise et transfert entre appareils

- [ ] Avant l’installation V3, conserver un export de progression V2.
- [ ] À la première ouverture V3 au même endroit, vérifier la présence des acquis ISTQB/Vibe Coding et l’absence de leçons Git déjà terminées par cette seule reprise.
- [ ] Si aucun acquis V2 n’existe dans ce navigateur, importer le fichier V2 après contrôle de l’aperçu ; vérifier qu’il s’ajoute aux éventuels acquis Git.
- [ ] Sur A, terminer une leçon Git et exporter la progression V3.
- [ ] Sur B, garder au moins un acquis différent, importer A et confirmer la fusion : les deux ensembles sont présents après actualisation.
- [ ] Réimporter le même fichier : aucun doublon, compteur d’essais non additionné.
- [ ] Télécharger la copie avant dernier import ; vérifier qu’elle correspond à l’état juste avant cette fusion.
- [ ] Exporter B, fusionner dans A et comparer les meilleurs scores et marqueurs Git/ISTQB/Vibe Coding.

### Erreurs et accessibilité

- [ ] Dans une copie fictive d’un export, mettre schemaVersion à 99 : refus et état inchangé.
- [ ] Choisir un fichier texte non JSON : erreur compréhensible, sans perte d’acquis.
- [ ] Parcourir les commandes avec Tab : focus visible et activation au clavier.
- [ ] À largeur mobile et zoom 200 %, vérifier lisibilité, navigation vers Git, accès aux quiz et à l’import.
- [ ] Si possible dans un profil de test, bloquer le stockage : le portail avertit et l’export reste disponible. Ne pas effacer sa progression habituelle pour cet essai.
- [ ] Vérifier que les cours restent consultables quand les liens externes de Sources ne sont pas accessibles.

## Critère d’acceptation

Les cours, corrections, persistance et aller-retour V3 doivent être observés comme fonctionnels sur l’adresse publiée. En cas d’échec, relever version affichée, action, attendu et obtenu. Utiliser des données fictives pour signaler un problème ; ne publier ni progression personnelle ni document interne dans le dépôt.
