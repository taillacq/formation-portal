# Progression V3 : contrat, reprise V2 et limites

## Format JSON

```json
{
  "format": "formation-portal-progress",
  "schemaVersion": 2,
  "contentVersion": "3.0.0",
  "exportedAt": "2026-11-05T10:00:00.000Z",
  "progress": {
    "completed": ["tae-01"],
    "quizzes": {
      "tae-01": {
        "best": 3,
        "last": 2,
        "total": 3,
        "attempts": 4,
        "updatedAt": "2026-11-05T09:59:00.000Z"
      }
    }
  }
}
```

Cet exemple est documentaire, pas une sauvegarde de votre progression. `best` et `last` sont des nombres de bonnes réponses, pas des pourcentages. Chaque quiz de leçon compte trois questions. Les mini-bilans utilisent les questions du parcours mais ne sont pas enregistrés dans ce format.

## Validation avant toute modification

- Maximum 1 048 576 octets, vérifié sur le fichier puis sur le texte UTF-8.
- JSON lisible, objets et champs exacts ; aucun champ libre supplémentaire.
- Format et schéma compatibles : schéma `2`, version de contenu `3.0.0` ou ancienne `2.0.0`. Un export déclaré V2 ne peut contenir que les identifiants ISTQB et Vibe Coding existants.
- Identifiants connus, aucune leçon terminée dupliquée.
- Scores entiers entre 0 et 3, dernier score inférieur ou égal au meilleur, total égal à 3.
- Compteur entier entre 1 et 1 000 000, dates ISO UTC valides à la milliseconde.
- Refus complet pour une version future, un identifiant inconnu ou toute donnée invalide. Reprise V2 prise en charge, pas de migration V1.

Une sauvegarde n’est pas signée : le portail ne certifie pas l’authenticité d’un score et ne détecte pas une modification manuelle qui reste conforme au schéma. Il s’agit d’un outil personnel d’apprentissage.

## Fusion

| Donnée | Règle |
| --- | --- |
| Leçons terminées | Union sans doublon |
| Meilleur score | Maximum |
| Dernier score | Résultat dont `updatedAt` est le plus récent |
| Dates égales | Plus grand dernier score, règle déterministe |
| Nombre de tentatives | Maximum des deux compteurs |

Le compteur maximum évite de compter plusieurs fois un même export lors d’imports répétés. Il **ne totalise pas** les essais indépendants sur deux appareils ; ce n’est pas un journal exhaustif. La date du dernier essai repose sur l’horloge de l’appareil ; une horloge mal réglée peut fausser l’ordre des derniers résultats, sans perdre le meilleur score ni les leçons terminées.

La fusion est idempotente : réimporter le même fichier ne crée pas d’acquis supplémentaires. Elle est conservatrice : elle ne permet pas de retirer une leçon terminée ou de revenir à un score meilleur antérieur en effaçant le dernier essai.

## Stockage et copie préalable

Clé principale : `formation-portal.progress.v3`.

Copie locale avant dernier import : `formation-portal.progress.v3.before-import`.

Reprise automatique : si la clé principale V3 est absente au premier chargement, le portail lit `formation-portal.progress.v2`, valide le format V2 et reprend les acquis. Il ne modifie ni cette clé V2 ni sa copie préalable. Les leçons Git ne sont pas marquées par cette reprise. La nouvelle clé V3 est écrite à la prochaine action persistante (leçon terminée, quiz ou import). Un export immédiat produit déjà un fichier V3 contenant les acquis repris.

Un état V3 existant est toujours prioritaire. Les modifications réalisées ensuite dans la V2 exigent un import explicite de son nouvel export. En cas de clé V2 illisible, l’original reste intact et le portail avertit qu’il travaille en session ; un import valide permet de créer un état V3. La V2 ne sait pas lire un export V3 : un retour à la V2 retrouve seulement sa progression antérieure séparée.

Avant un import, l’ancienne valeur principale est copiée puis l’état fusionné est écrit par une seule opération `setItem`. Si la copie ou l’écriture échoue, l’import est signalé comme non appliqué et l’état principal existant est conservé. La copie est locale, non synchronisée et remplacée lors de l’import suivant. Elle peut être téléchargée si elle contient une progression compatible valide. La réimporter fusionne les acquis : ce n’est pas une commande d’annulation destructive.

Si la valeur principale V3 est corrompue, le portail la laisse intacte et travaille en session. Un import valide peut la réparer après copie de la valeur brute dans la clé préalable. Une copie brute invalide n’est pas proposée comme export valide ; les nouveaux acquis de session sont conservés dans la fusion. Une valeur V2 illisible reste dans sa propre clé lors de la réparation V3.

Si l’écriture normale d’un résultat est impossible, le résultat reste en mémoire et exportable ; un message signale la limite. Lorsque l’accès au stockage existe mais que l’import ne peut pas créer sa copie préalable, l’import est refusé. Le portail n’annonce pas une persistance qui a échoué.

## Plusieurs onglets et appareils

Avant une écriture, le portail relit et fusionne l’état du navigateur ; un événement de stockage avertit les autres onglets. Cela limite les pertes d’acquis en usage courant. `localStorage` n’offre pas de transaction entre plusieurs onglets : éviter deux écritures strictement simultanées ; les compteurs restent indicatifs. Exporter avant de fermer une session importante.

Le transfert entre appareils est volontaire et manuel. Les fichiers exportés ne sont jamais chargés sur GitHub par le portail. Aucune note personnelle ni réponse libre n’est collectée. Ne pas ajouter de données sensibles au JSON.
