/* Contenus originaux en français. Références et limites dans SOURCES.md. */
(function(root){
'use strict';
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
const lessons=[];
const add=(id,course,chapter,title,minutes,goal,concepts,example,exercise,solution,pitfall,quiz,code='')=>lessons.push({id,course,chapter,title,minutes,goal,concepts,example,exercise,solution,pitfall,quiz,code});
add('tae-01','istqb','1 · Objectifs et cycle de vie','Choisir ce qui mérite d’être automatisé',25,
'Justifier une première sélection de tests par leur valeur et leur coût de possession.',[
['Partir du risque','Un test automatisé exécute des actions et compare des observations à un résultat attendu. Il apporte un retour répétable, mais ne remplace ni le jugement humain ni l’exploration. Commencez par un risque utilisateur précis : perdre une réservation, calculer un montant erroné ou refuser un accès autorisé.'],
['Évaluer le coût complet','Comparez fréquence d’exécution, stabilité, données disponibles, effort de création, analyse des échecs et maintenance. Un test souvent exécuté peut rester un mauvais candidat si son résultat est difficile à vérifier automatiquement. Le nombre de scripts produits n’est pas un objectif de qualité.'],
['Construire un petit portefeuille','Réservez les contrôles rapides et déterministes aux changements fréquents. Gardez des tests exploratoires pour les usages nouveaux et les observations subjectives. Documentez la raison de chaque choix pour pouvoir la réviser.']],
'Une billetterie fictive propose un calcul de tarif stable exécuté 30 fois par livraison et une nouvelle page dont l’ergonomie change chaque semaine. Commencer par le tarif fournit un retour plus prévisible ; la page appelle encore une exploration humaine.',
'Pour un catalogue fictif, classez : total du panier stable, ressenti visuel d’une animation, règle de remise modifiée chaque jour. Donnez un candidat prioritaire et deux informations à obtenir avant de coder.',
'Priorité au total du panier, sous réserve de connaître les arrondis et de disposer de données isolées. L’animation exige un jugement et la remise instable peut coûter cher à maintenir. Demander la fréquence réelle d’exécution et le contrat de calcul rend la décision vérifiable.',
'Automatiser un mauvais test accélère surtout la production d’un résultat peu utile.',[
q('Quel candidat offre le meilleur point de départ ?', ['Un écran encore redessiné chaque jour','Un calcul stable, fréquent et vérifiable','Une appréciation esthétique sans critère','Un scénario sans résultat attendu'],1,'Le calcul cumule stabilité, fréquence et oracle explicite. Les autres choix demandent d’abord de clarifier ou stabiliser le test.'),
q('Quel coût est souvent oublié ?', ['La maintenance et l’analyse des échecs','Le nombre de caractères du nom du test','La couleur du rapport','Le logo de l’outil'],0,'L’entretien des données, des adaptateurs et des résultats peut dépasser le coût initial du script.'),
q('Cent scripts passent mais aucun ne vérifie la réservation. Que conclure ?', ['Le risque est couvert car le volume est élevé','Le test manuel est devenu inutile','Le risque principal reste sans preuve','Il faut uniquement accélérer les scripts'],2,'Le volume ne prouve pas la couverture d’un risque. Il faut relier les assertions aux comportements importants.')]);
add('tae-02','istqb','1 · Objectifs et cycle de vie','Placer les tests dans le cycle de livraison',25,
'Répartir le retour des tests selon la rapidité attendue et le périmètre contrôlé.',[
['Décider du moment du retour','Une vérification de fonction peut répondre avant l’intégration. Un test d’API vérifie un contrat entre composants. Un parcours de bout en bout observe plusieurs systèmes assemblés. Chaque portée apporte une preuve différente ; multiplier les parcours larges augmente souvent le diagnostic et la durée.'],
['Préparer avant de lancer','Définissez tôt le résultat attendu, les points d’observation, les données et les moyens de réinitialisation. La testabilité se prépare avec le produit : identifiants accessibles, API de préparation, journaux corrélables et horloge contrôlable réduisent les contournements.'],
['Conserver plusieurs formes de retour','Le passage au vert des contrôles automatisés n’épuise pas les besoins de test. Ajoutez exploration, usages inhabituels et évaluation de l’expérience. Choisissez des contrôles pertinents à chaque étape au lieu de déplacer toute la vérification à la fin.']],
'Pour une réservation, le calcul de disponibilité se teste en composant, le refus d’une quantité négative en API et la confirmation visible dans un parcours intégré. Une exploration recherche ensuite les incompréhensions du formulaire.',
'Répartissez trois contrôles : arrondi d’un prix, contrat HTTP d’annulation, confirmation reçue après paiement simulé. Définissez le moment où chacun doit bloquer un changement.',
'Arrondi : test de composant à chaque modification. Annulation : test de contrat/API à l’intégration. Confirmation : parcours intégré après déploiement de test, avec dépendance de paiement simulée et preuve de réception. Le blocage dépend du risque, pas seulement du niveau de test.',
'Un test d’API rapide ne prouve pas que l’utilisateur peut effectuer tout le parcours.',[
q('Quel contrôle donne généralement le retour le plus ciblé sur un arrondi ?', ['Un parcours complet avec paiement réel','Une inspection visuelle de la page','Un test de composant du calcul','Un sondage utilisateur'],2,'Le test de composant isole le calcul et facilite le diagnostic. Il faudra d’autres preuves pour le parcours complet.'),
q('Quand faut-il discuter de la testabilité ?', ['Uniquement après le premier incident','Seulement à la fin de la recette','Jamais si un outil sait cliquer','Dès la conception et pendant le développement'],3,'Des interfaces d’observation et de préparation se conçoivent avec le système. Les ajouter tard peut être coûteux.'),
q('Un pipeline vert autorise-t-il à supprimer toute exploration ?', ['Non, les contrôles couvrent des attentes déjà définies','Oui, le vert prouve l’absence de défaut','Oui, si les tests tournent la nuit','Oui, si le rapport est signé'],0,'L’exploration peut découvrir des risques et comportements que les assertions prévues ne couvrent pas.')]);
add('tae-03','istqb','2 · Préparer l’automatisation','Rendre l’environnement et les données maîtrisables',30,
'Décrire les préconditions nécessaires à une exécution reproductible.',[
['Identifier les dépendances','Inventoriez version du produit, navigateur, outils, réseau, comptes de test, services et configuration. Un test qui passe sur une machine sans décrire ses dépendances n’est pas encore une preuve reproductible. Distinguez un échec du produit d’un environnement indisponible.'],
['Isoler les données','Créez des données fictives par test ou par exécution avec un identifiant unique. Une suite ne doit pas supposer qu’un autre test a créé son panier. Préparez les données par une interface stable, vérifiez leur création et prévoyez leur suppression même en cas d’échec.'],
['Rendre le temps et l’état observables','Les attentes doivent porter sur une condition significative avec une limite de temps, pas sur une pause arbitraire. Vérifiez l’état initial. Un service de courriel simulé ou une horloge contrôlée permet de tester sans patienter réellement des heures.']],
'Deux exécutions partagent le même siège : l’une réserve, l’autre échoue au hasard. Donner à chacune un événement de test et un espace de données distincts élimine la concurrence non voulue.',
'Rédigez un contrat d’environnement pour « réserver une place ». Citez au moins quatre préconditions, une stratégie d’isolation et une preuve de nettoyage.',
'Produit et configuration identifiés ; API de création disponible ; stock fictif connu ; service de paiement de test joignable. Utiliser un identifiant d’exécution pour l’événement et la commande. Le nettoyage supprime ces objets et une requête vérifie leur absence. Une panne de préparation est signalée séparément.',
'Relancer un test sans nettoyer son état peut créer un résultat différent au lieu d’expliquer l’échec.',[
q('Deux tests se disputent le même panier. Quelle correction traite la cause ?', ['Doubler toutes les pauses','Créer un panier isolé pour chaque test','Masquer le deuxième échec','Les renommer'],1,'L’isolation supprime la dépendance accidentelle. Les pauses changent seulement la probabilité du conflit.'),
q('Quelle attente est la plus pertinente ?', ['Attendre toujours 60 secondes','Attendre sans limite','Attendre « commande confirmée » avec délai maximal','Cliquer vingt fois'],2,'Une condition métier bornée rend l’attente explicite et évite une pause trop courte ou inutilement longue.'),
q('L’API de préparation ne répond plus. Quel diagnostic initial ?', ['Défaut d’affichage prouvé','Tous les tests doivent être déclarés réussis','Aucun résultat ne doit être conservé','Incident de précondition à distinguer du produit'],3,'Le scénario n’a pas atteint son état initial. Signaler la précondition évite d’attribuer à tort l’échec au comportement testé.')]);
add('tae-04','istqb','2 · Préparer l’automatisation','Évaluer un outil avec un pilote mesurable',30,
'Comparer des solutions sur un cas représentatif et des critères pondérés.',[
['Définir avant de comparer','Listez les contraintes impératives : systèmes pris en charge, réseau autorisé, exécution sans interface, compétences, licences, diagnostics et intégration. Un outil qui échoue sur une contrainte impérative n’est pas sauvé par une belle moyenne.'],
['Organiser un pilote utile','Utilisez un scénario normal, un échec volontaire et un changement simulé de l’interface. Mesurez le temps de création, la clarté du diagnostic et le coût de correction. Une démonstration préparée par un fournisseur ne prouve pas l’adéquation à votre contexte.'],
['Documenter la décision','Pondérez les critères selon les risques. Conservez mesures, hypothèses et limites. Un pilote conclut à une adoption progressive, à une adaptation ou à un abandon ; il ne sert pas à justifier une décision déjà prise.']],
'Sur deux outils fictifs, A crée un scénario en 2 h mais demande 5 h après changement ; B demande 3 h puis 1 h. Pour une interface souvent modifiée, B peut être préférable même si sa démonstration est moins rapide.',
'Avec des poids maintenance 50 %, diagnostic 30 %, prise en main 20 %, notez A : 2/5, 3/5, 5/5 et B : 4/5, 4/5, 3/5. Calculez les scores et indiquez une limite de ce classement.',
'A = 2×0,5 + 3×0,3 + 5×0,2 = 2,9/5. B = 4×0,5 + 4×0,3 + 3×0,2 = 3,8/5. B est préférable selon ces critères. Vérifier d’abord les contraintes obligatoires et la représentativité des mesures : une note subjective ne vaut pas une preuve.',
'Une grille pondérée sans critères d’exclusion peut retenir un outil inutilisable sur le réseau cible.',[
q('Quel élément doit précéder le score pondéré ?', ['Le choix du logo','Le nombre de vidéos de démonstration','Les contraintes impératives','La préférence d’une seule personne'],2,'Les exigences éliminatoires, par exemple l’exécution autorisée sur la cible, doivent être satisfaites avant le classement.'),
q('Pourquoi introduire un échec volontaire dans le pilote ?', ['Pour réduire artificiellement la note','Pour évaluer le diagnostic et la détection','Pour éviter de mesurer la maintenance','Pour supprimer les assertions'],1,'Un outil doit aider à comprendre un résultat négatif. Une démonstration seulement verte ne mesure pas cette capacité.'),
q('Un outil a le meilleur score mais requiert un service interdit. Que faire ?', ['Ignorer la contrainte','Adopter immédiatement','Désactiver tous les contrôles réseau','L’écarter ou rechercher une variante autorisée'],3,'Une contrainte impérative n’est pas compensée par d’autres notes. La variante doit être évaluée à son tour.')]);
add('tae-05','istqb','3 · Architecture','Séparer intention, logique et accès au système',35,
'Dessiner une architecture qui limite la propagation des changements.',[
['Séparer les responsabilités','Une intention métier décrit ce que le test veut démontrer. Une couche de logique orchestre les actions et assertions. Des adaptateurs accèdent au système : interface, API, fichiers ou base de test. Les données et la configuration restent identifiables au lieu d’être dispersées dans chaque script.'],
['Protéger les scénarios','Un changement de sélecteur doit idéalement toucher l’adaptateur, pas vingt scénarios. Inversement, une nouvelle règle métier doit se voir dans l’attente du test. Une abstraction utile isole une cause de changement ; elle ne se résume pas à renommer chaque clic.'],
['Préserver la lisibilité','Gardez les assertions significatives et rendez les erreurs localisables. Une couche qui avale toutes les exceptions ou invente des valeurs par défaut rend les scénarios lisibles en apparence mais trompeurs.']],
'Le scénario dit « réserver deux places et vérifier le total ». Le pilote d’interface connaît le bouton Réserver ; le client API prépare l’événement ; une fonction dédiée calcule l’attendu à partir d’exemples validés. Le scénario ne contient aucun chemin CSS.',
'Un identifiant de bouton change dans 18 tests. Proposez une séparation en trois responsabilités et indiquez où corriger le sélecteur.',
'Scénarios : intentions et résultats métier. Logique de réservation : opérations réutilisables. Adaptateur UI : localisation et interaction. Le nouveau sélecteur appartient à l’adaptateur ; les scénarios restent inchangés si le comportement utilisateur ne change pas.',
'Une abstraction trop générale peut cacher davantage de complexité qu’elle n’en retire.',[
q('Où placer un sélecteur d’interface partagé ?', ['Dans chaque assertion métier','Dans l’adaptateur d’accès à l’interface','Dans le nom du rapport','Dans le mot de passe du compte'],1,'L’adaptateur concentre les détails d’interaction et limite les modifications dispersées.'),
q('Que doit garder un scénario lisible ?', ['L’intention et les attentes métier','Toutes les coordonnées écran','Les détails de chaque protocole','Une exception ignorée à chaque étape'],0,'La lisibilité utile exprime la preuve attendue. Les détails techniques ont une place, mais pas nécessairement dans chaque scénario.'),
q('Une fonction attrape toute erreur et renvoie toujours « succès ». Quel risque ?', ['Un rapport trop détaillé','Des tests plus sensibles','Un faux résultat positif','Une meilleure isolation'],2,'L’erreur disparaît et le scénario peut passer alors que l’action n’a pas eu lieu.')]);
add('tae-06','istqb','3 · Architecture','Choisir une approche et des interfaces stables',35,
'Distinguer les styles de conception des tests et choisir une abstraction proportionnée.',[
['Comparer les approches','Un test piloté par les données applique une logique à plusieurs jeux de valeurs. Une approche par mots clés compose des actions de domaine. Un langage décrivant des comportements peut faciliter la discussion s’il reste précis. Ces formes ne garantissent ni de bons exemples ni de bonnes assertions.'],
['Définir un contrat d’adaptateur','Une opération comme reserver(événement, quantité) doit préciser ses entrées, ses sorties, ses erreurs et ce qu’elle attend réellement. Préférez un contrat explicite à une fonction universelle munie de dizaines d’options.'],
['Éviter la duplication de l’oracle','Recalculer l’attendu avec exactement le code du produit peut reproduire son défaut. Utilisez des exemples indépendamment validés, des propriétés ou une référence distincte. Choisissez les données pour révéler les frontières, pas seulement pour augmenter le nombre de lignes.']],
'Pour un tarif, une table couvre 0, 1, 10 et 11 places autour du seuil de remise. La même logique exécute chaque ligne et compare à un montant attendu validé séparément. Ajouter 100 lignes identiques ne crée pas 100 risques couverts.',
'Concevez une table pour une remise à partir de 10 billets : 8 € par billet, remise de 10 % sur le total dès 10. Donnez les attendus pour 9, 10 et 11 billets.',
'9 → 72 € ; 10 → 72 € ; 11 → 79,20 €. Les cas 9 et 10 distinguent la frontière. Le contrat précise les règles d’arrondi et le traitement des quantités invalides. Vérifier uniquement 1 et 5 billets manquerait le seuil.',
'Un scénario écrit en langage naturel peut rester ambigu : « le montant est correct » ne définit aucun oracle.',[
q('Une même logique avec plusieurs couples entrée/attendu illustre quoi ?', ['Une approche pilotée par les données','Une suppression des assertions','Un déploiement de production','Une mesure de disponibilité réseau'],0,'La variation des jeux de données est séparée de la logique du test.'),
q('Quels cas ciblent le mieux une remise dès 10 ?', ['2 et 3 uniquement','100 et 200 uniquement','9, 10 et 11','Des valeurs choisies sans critère'],2,'Les valeurs avant, sur et après le seuil permettent de vérifier la transition de règle.'),
q('Quel oracle présente le plus grand risque de défaut commun ?', ['Une table calculée et revue séparément','La même fonction de calcul que le produit','Un exemple métier approuvé','Une propriété indépendante'],1,'Réutiliser la logique fautive pour construire l’attendu peut confirmer le même défaut au lieu de le détecter.')]);
add('tae-07','istqb','4 · Développement','Écrire des tests indépendants et diagnostiquables',35,
'Construire une vérification dont l’échec fournit une piste exploitable.',[
['Structurer la preuve','Séparez préparation, action et vérification. Chaque assertion doit porter sur un comportement observable et afficher l’attendu et l’obtenu. Un test « sans exception » prouve rarement à lui seul que le résultat métier est bon.'],
['Limiter les dépendances','Chaque test prépare son état et peut s’exécuter seul ou dans un autre ordre. Les opérations de nettoyage sont garanties autant que possible même en cas d’erreur. Choisissez un niveau de test qui observe le risque sans dépendances inutiles.'],
['Produire des indices utiles','Associez identifiant de test, version du produit, étape et contexte de données fictives. Capturez les traces pertinentes au moment de l’échec. Évitez de journaliser des secrets ou de collecter tout le contenu d’un système : trop de bruit rend le diagnostic plus lent.']],
'Un test reçoit HTTP 200 mais le stock reste inchangé. L’assertion sur le seul statut passe à tort. Vérifier l’identifiant de réservation, son statut et le stock attendu fournit une preuve plus forte.',
'Écrivez le pseudocode d’un test qui réserve 2 places sur un stock de 5. Prévoyez une assertion métier et un nettoyage après échec.',
'Préparer un événement fictif avec stock 5 ; réserver 2 ; vérifier une réservation confirmée et un stock 3 ; dans un bloc de nettoyage garanti, supprimer réservation et événement. Le message d’assertion cite événement, attendu 3, obtenu et version, sans donnée réelle.',
'Une capture d’écran sans identifiant ni état attendu ne suffit pas à rendre un échec explicable.',[
q('Le serveur renvoie 200 mais le montant est faux. Quelle amélioration ?', ['Retirer le test','Vérifier aussi le montant attendu','Déclarer 200 suffisant pour tout','Allonger le nom du test'],1,'Le statut technique n’est qu’une partie du contrat. Une assertion métier est nécessaire.'),
q('Quelle propriété facilite l’exécution parallèle ?', ['Un état isolé et préparé par test','Un ordre imposé et caché','Un seul panier partagé','Un nettoyage reporté à la semaine suivante'],0,'L’isolation évite que des tests se modifient mutuellement leurs préconditions.'),
q('Quel journal est le plus utile ?', ['Un mot de passe en clair','Le contenu intégral de tous les fichiers','Une phrase « erreur » seule','Étape, attendu, obtenu et identifiant corrélable'],3,'Un contexte ciblé aide au diagnostic sans exposer inutilement des informations.')]);
add('tae-08','istqb','4 · Développement','Gérer les risques et la maintenance',30,
'Identifier les sources de fragilité et choisir une correction durable.',[
['Qualifier l’instabilité','Un test intermittent peut révéler un défaut de synchronisation du produit, une concurrence entre tests, des données partagées ou un problème d’infrastructure. Mesurez les occurrences et cherchez la cause avant de conclure que le test est mauvais.'],
['Traiter la dette du testware','Revoyez duplication, dépendances, conventions, interfaces et bibliothèques. Une revue de code, de petites modifications et des versions maîtrisées facilitent la maintenance. La solution de test est un logiciel à entretenir, avec propriétaires et critères de qualité.'],
['Encadrer les contournements','Une relance ou une quarantaine peut permettre une analyse, mais elle doit rester visible, avoir un responsable et une condition de sortie. Un vert obtenu après plusieurs tentatives ne doit pas faire disparaître le premier échec des métriques.']],
'Un parcours échoue 1 fois sur 10 quand deux travailleurs utilisent le même compte. Une relance réduit le rouge apparent ; des comptes distincts et une observation des sessions concurrentes permettent d’attaquer la cause.',
'Vous isolez provisoirement un test intermittent. Définissez quatre informations à conserver et un critère de réintégration.',
'Conserver risque couvert, fréquence et traces d’échec, responsable, date/condition de revue. Réintégrer après correction de la cause et une campagne représentative stable. Ne pas annoncer la couverture comme équivalente pendant la quarantaine ; vérifier si un contrôle complémentaire est nécessaire.',
'Une suite toujours verte parce que ses échecs sont ignorés perd sa valeur de signal.',[
q('Que prouve un test qui passe à la troisième tentative ?', ['L’absence de défaut','L’inutilité du premier échec','Un succès observé après instabilité à analyser','La qualité du réseau en toute circonstance'],2,'Le passage final ne supprime pas les échecs antérieurs ; leurs causes restent à qualifier.'),
q('Quelle quarantaine est maîtrisée ?', ['Sans responsable ni délai','Visible, avec risque identifié et condition de sortie','Définitive et silencieuse','Exclue de tous les rapports'],1,'Une mesure temporaire doit garder la visibilité sur la couverture et un chemin de résolution.'),
q('Quelle action réduit une cause structurelle de maintenance ?', ['Copier davantage les sélecteurs','Masquer les assertions cassées','Augmenter le nombre de relances','Centraliser les détails d’interface et les revoir'],3,'Une séparation des responsabilités évite de corriger la même interaction dans de nombreux scénarios.')]);

add('tae-09','istqb','5 · Déploiement et CI/CD','Déployer progressivement la solution de test',30,
'Préparer une adoption par étapes avec des critères d’entrée et de sortie.',[
['Distinguer pilote et généralisation','Un pilote valide des hypothèses sur un périmètre limité. La généralisation ajoute déploiement des outils, formation, gestion de versions et support. Définissez qui maintient la solution et comment un nouveau projet peut l’utiliser sans copier une installation manuelle.'],
['Maîtriser la configuration','Identifiez versions de l’outil, du testware, du produit et de l’environnement. Externalisez la configuration variable ; gardez les secrets hors du dépôt et des rapports. Préparez une vérification simple de l’installation avant de lancer les scénarios métier.'],
['Prévoir le retour arrière','Une nouvelle version de la solution de test peut casser le signal. Conservez une version connue, les changements et une procédure de retour. Vérifiez le comportement sur un petit périmètre avant de l’étendre.']],
'Une équipe livre un nouvel adaptateur à un projet volontaire, contrôle les diagnostics et compare la stabilité. Après validation, elle étend à deux projets et publie un guide. Les autres restent temporairement sur la version connue.',
'Rédigez un plan de déploiement en trois vagues avec un contrôle technique, un critère d’adoption et un moyen de retour.',
'Vague 1 : installation et test de bon fonctionnement sur environnement isolé. Vague 2 : projet pilote, données représentatives, seuils de stabilité et diagnostic convenus à l’avance. Vague 3 : adoption élargie avec formation et responsable identifié. À chaque vague, version précédente disponible et configuration documentée.',
'Le succès sur un poste local ne prouve pas que les agents d’exécution disposent de toutes les dépendances.',[
q('Quel élément rend le déploiement reproductible ?', ['Une installation mémorisée par une seule personne','Une configuration versionnée et des dépendances identifiées','Un nom de dossier différent par lancement','Un rapport sans version'],1,'Identifier les versions et les paramètres rend l’installation comparable entre machines.'),
q('Quel est le rôle d’une première vague limitée ?', ['Éliminer toute mesure','Éviter la formation pour toujours','Détecter les problèmes avant extension','Prouver que tous les projets sont identiques'],2,'L’extension progressive limite l’impact d’un défaut de solution ou d’installation.'),
q('Où placer un secret nécessaire à l’exécution ?', ['Dans chaque scénario public','Dans le nom d’une capture','Dans le dépôt de cours','Dans un mécanisme sécurisé de l’environnement cible'],3,'La configuration peut référencer un secret fourni par l’environnement sans publier sa valeur.')]);
add('tae-10','istqb','5 · Déploiement et CI/CD','Construire un pipeline qui donne un signal utile',35,
'Choisir des étapes, des critères de blocage et des artefacts adaptés au risque.',[
['Échelonner les contrôles','Commencez par les contrôles rapides : validité des fichiers, tests ciblés et contrats. Ajoutez des tests intégrés sur un environnement prêt. Les campagnes longues peuvent suivre un autre rythme ; leur absence du premier étage doit rester une décision de risque explicite.'],
['Définir le traitement d’un résultat','Échec d’assertion, erreur de préparation et test ignoré ont des sens différents. Un critère de passage doit préciser quels résultats bloquent et qui prend la décision lorsqu’un service est indisponible. Un pipeline vert avec des tests non exécutés peut être trompeur.'],
['Conserver les preuves','Publiez rapports, traces ciblées, identifiants des versions et contexte d’exécution. Fixez une durée de conservation adaptée. Pour paralléliser, isolez données et ressources ; diviser une suite dépendante ne la rend pas indépendante.']],
'À chaque modification : contrôles rapides et API. Après installation de test : quelques parcours critiques. Chaque nuit : cas plus longs. Un parcours de réservation défaillant bloque la livraison ; un environnement indisponible déclenche un diagnostic distinct, sans être transformé en réussite.',
'Proposez un pipeline pour une billetterie avec un budget de retour de 10 min. Que faire d’un test indispensable de 25 min ?',
'Placer les contrôles rapides avant les parcours critiques, mesurer réellement leur durée et conserver les artefacts. Le test de 25 min peut devenir une étape ultérieure bloquante avant publication, être réduit à une preuve ciblée ou parallélisé si indépendant. Le déplacer la nuit n’est acceptable que si le risque résiduel est explicitement accepté.',
'Respecter un budget de durée en supprimant une preuve critique sans décision de risque dégrade le contrôle de livraison.',[
q('Un test ignoré doit-il être compté comme réussi ?', ['Oui, toujours','Oui, si la suite est courte','Non, il faut rendre son absence visible','Oui, si le rapport est vert'],2,'Non exécuté et réussi ne prouvent pas la même chose. La couverture effective doit rester visible.'),
q('Quel prérequis favorise une parallélisation fiable ?', ['Les mêmes comptes et données partagés','L’isolation des ressources entre tests','Un ordre implicite','L’absence de nettoyage'],1,'Des tests indépendants réduisent les interférences entre travailleurs.'),
q('Un test critique dépasse le budget rapide. Quelle décision est justifiée ?', ['Le supprimer silencieusement','Le déclarer réussi sans exécution','Masquer sa durée','Prévoir une preuve bloquante plus tard ou le repenser'],3,'Le délai de retour et le risque se gèrent ensemble. Une étape ultérieure peut conserver la preuve nécessaire avant livraison.')]);
add('tae-11','istqb','6 · Rapports et métriques','Produire un rapport qui permet d’agir',25,
'Adapter les informations du résultat à la personne qui doit décider.',[
['Distinguer résultat et diagnostic','Un résultat indique ce qui a été observé : réussi, échoué, interrompu ou non exécuté. Un diagnostic propose une cause étayée : produit, testware, données ou infrastructure. Ne transformez pas une hypothèse en fait uniquement parce qu’une capture semble convaincante.'],
['Relier la preuve à une décision','Un développeur cherche une reproduction et une trace. Un responsable de livraison cherche les risques résiduels et les contrôles manquants. Une équipe de maintenance cherche les causes récurrentes et le coût d’analyse. Un même rapport peut offrir ces vues sans noyer chacun sous toutes les données.'],
['Conserver le contexte minimal','Indiquez version du produit et des tests, environnement, période, périmètre et tests non exécutés. Les chiffres sans dénominateur, ni contexte de campagne, sont difficiles à comparer.']],
'« 95 % de réussite » masque que cinq tests d’annulation n’ont pas été lancés. Un rapport utile précise 95 réussis, 0 échoué, 5 non exécutés sur 100 prévus, puis le risque d’annulation encore sans preuve.',
'Rédigez un rapport de cinq lignes pour 20 contrôles prévus : 15 réussis, 2 échoués, 3 non exécutés à cause d’un service de test indisponible.',
'Périmètre et versions identifiés. Résultats : 15/20 réussis, 2/20 échoués, 3/20 non exécutés. Les deux échecs sont à qualifier avec traces liées. Les trois absences ne valident pas le produit. Décision : rétablir le service, réexécuter le périmètre manquant et analyser les échecs avant de conclure sur les risques concernés.',
'Le pourcentage seul permet facilement d’oublier les tests qui n’ont jamais démarré.',[
q('Que faut-il joindre à « 95 % réussis » ?', ['Un logo','Le périmètre, le dénominateur et les absences','Le nombre de pages du rapport','Un nom flatteur de campagne'],1,'Ces informations permettent de comprendre ce qui a réellement été vérifié.'),
q('Une capture suggère un problème réseau. Comment le présenter ?', ['Comme une hypothèse à confirmer par des preuves','Comme une preuve définitive de défaut produit','Comme une réussite','En supprimant l’échec'],0,'Un diagnostic doit distinguer observation et interprétation afin de guider l’enquête.'),
q('Quel public a surtout besoin des risques résiduels avant livraison ?', ['Uniquement le dessinateur du logo','Personne','Le responsable de la décision de livraison','Uniquement le fournisseur d’écran'],2,'La décision exige une vue de ce qui reste non vérifié ou défaillant, pas seulement des traces techniques.')]);
add('tae-12','istqb','6 · Rapports et métriques','Interpréter les métriques sans se tromper',35,
'Calculer des indicateurs simples et expliquer leurs limites.',[
['Choisir un objectif mesurable','Une métrique doit éclairer une décision : raccourcir le retour, réduire les faux signaux ou mieux couvrir un risque. Compter les scripts peut mesurer un inventaire, mais pas directement la qualité. Comparez des campagnes de périmètre et d’environnement comparables.'],
['Séparer les dénominateurs','Le taux de réussite parmi les tests exécutés et la part du plan réellement exécutée répondent à deux questions différentes. Définissez aussi l’intermittence et le coût d’analyse de façon stable. Sans définition commune, deux tableaux de bord peuvent afficher des nombres incompatibles.'],
['Estimer plutôt que promettre','Un gain apparent d’exécution doit être diminué des coûts de construction, infrastructure, entretien et analyse. Distinguez effort humain et durée écoulée. Une estimation de rentabilité explicite ses hypothèses, sa période et ses incertitudes.']],
'Sur 100 tests prévus, 80 tournent et 72 passent. Réussite parmi exécutés : 72/80 = 90 %. Exécution du plan : 80/100 = 80 %. Réussite sur le plan : 72/100 = 72 %. Aucun de ces taux ne prouve à lui seul la couverture du risque.',
'Une campagne épargne 4 h humaines et tourne 20 fois. Création : 30 h ; maintenance : 20 h ; analyse : 15 h. Calculez le gain net simplifié et citez deux coûts absents.',
'Gain brut 4×20 = 80 h ; coût connu 30+20+15 = 65 h ; gain net simplifié 15 h. Il manque notamment infrastructure, licences ou formation. Si les 4 h représentent de la durée machine et non du temps humain évité, la comparaison n’est pas valide.',
'Une suite plus rapide peut toujours produire une preuve faible ; la performance n’est qu’une dimension.',[
q('72 réussis sur 80 exécutés et 100 prévus : taux parmi exécutés ?', ['72 %','80 %','90 %','100 %'],2,'72 divisé par 80 vaut 0,9. Il faut aussi signaler que 20 tests prévus n’ont pas été exécutés.'),
q('80 h économisées pour 65 h de coûts connus donnent quoi ?', ['15 h de gain net simplifié','145 h de gain net','Un gain garanti pour toujours','65 % de couverture'],0,'La différence vaut 15 h sur la période considérée, sous réserve des hypothèses et coûts omis.'),
q('Pourquoi comparer des périmètres constants ?', ['Pour empêcher toute évolution','Pour réduire les sources de variation trompeuses','Pour supprimer les tests lents','Pour ne jamais analyser les défauts'],1,'Une variation de nombre ou de nature des tests peut expliquer une métrique sans amélioration réelle de la solution.')]);
add('tae-13','istqb','7 · Vérifier la solution','Tester l’infrastructure de test elle-même',30,
'Établir la confiance dans l’installation et la chaîne de résultat.',[
['Vérifier ce qui produit la preuve','La solution de test inclut lanceur, adaptateurs, préparation, assertions, rapports et stockage des artefacts. Chacun peut défaillir. Un rapport vert ne vaut rien si les tests n’ont pas été découverts ou si le code de sortie est ignoré.'],
['Introduire des contrôles connus','Vérifiez un succès connu, un échec connu et une précondition indisponible. Vérifiez que chaque cas traverse toute la chaîne jusqu’au rapport et à la décision du pipeline. Faites ces contrôles après installation ou modification importante de l’infrastructure.'],
['Contrôler les interfaces','Testez les contrats des composants réutilisés avec des réponses simulées : réponse vide, délai dépassé, statut inattendu. Un adaptateur qui renvoie toujours une valeur par défaut peut rendre toutes les assertions artificiellement satisfaites.']],
'Le lanceur termine avec un code d’échec, mais un script de pipeline remplace le code par 0. Un test volontairement faux permet de constater que la chaîne annonce un succès alors qu’elle devrait bloquer.',
'Définissez trois essais de réception pour un nouveau générateur de rapports.',
'Un test réussi apparaît comme réussi avec son identifiant. Un échec volontaire conserve attendu/obtenu et fait échouer l’étape si telle est la règle. Une campagne sans test ou avec préparation impossible ne devient pas verte par défaut. Contrôler aussi la version, le nombre attendu et les liens vers les artefacts.',
'Valider seulement la présentation du rapport peut laisser un code de sortie ou un comptage incorrect.',[
q('Quel essai révèle une chaîne qui reste toujours verte ?', ['Un test connu comme faux','Une nouvelle couleur de rapport','Un test sans assertion','Une capture de la page d’accueil'],0,'L’échec volontaire doit être détecté et transmis jusqu’à la décision finale.'),
q('Une campagne découvre zéro test alors que dix sont attendus. Que faire ?', ['Annoncer 100 % de réussite','Ignorer le comptage','Signaler un problème de campagne','Supprimer la liste attendue'],2,'Zéro test exécuté ne prouve pas que les dix comportements sont corrects.'),
q('Que vérifier après la mise à jour d’un adaptateur ?', ['Uniquement son nom','Ses contrats de succès et d’erreur','Seulement le logo de l’outil','Rien si le code compile'],1,'La compilation ne garantit pas la bonne transformation des observations ni la propagation des erreurs.')]);
add('tae-14','istqb','7 · Vérifier la solution','Éprouver les tests et leurs oracles',35,
'Vérifier qu’un test détecte bien le défaut qu’il est censé révéler.',[
['Chercher les faux succès','Un test peut passer parce qu’il ne clique pas réellement, compare la mauvaise valeur ou réutilise un cache ancien. Inspectez les assertions et les points d’observation. Le résultat doit changer lorsque le comportement contrôlé devient incorrect.'],
['Injecter des défauts contrôlés','Sur une copie isolée ou un simulateur, modifiez une règle, supprimez un champ ou simulez une erreur. Vérifiez quels tests détectent le changement et pourquoi. Ce type d’épreuve complète la revue du code du test ; il ne démontre pas l’absence de tous les défauts possibles.'],
['Distinguer deux erreurs de signal','Un faux positif signale un défaut absent ; un faux négatif manque un défaut présent. Documentez cette convention, parfois exprimée différemment selon les outils. Les deux coûtent : temps d’enquête pour l’un, confiance injustifiée pour l’autre.']],
'Une remise doit commencer à 10 billets. Sur une copie de test, on décale le seuil à 11. Si aucun test ne rougit, il manque peut-être le cas 10 ou l’assertion lit le montant initial au lieu du montant final.',
'Le test d’annulation passe même lorsque le simulateur conserve la réservation. Proposez deux causes et une nouvelle assertion.',
'Causes possibles : seul le statut HTTP est vérifié ; la lecture utilise une ancienne réponse en cache. Après annulation, relire l’état courant via une observation pertinente et vérifier « annulée » ainsi que la libération de stock si le contrat le prévoit. Prouver que l’assertion échoue quand l’annulation ne se produit pas.',
'Une injection de défaut doit rester dans un environnement isolé et être retirée après l’essai.',[
q('Le produit est incorrect et le test passe. Selon la convention du cours ?', ['Vrai positif','Faux négatif','Faux positif','Preuve de correction'],1,'Le contrôle manque un défaut présent : c’est un faux négatif dans la convention explicitée ici.'),
q('Pourquoi décaler volontairement un seuil sur une copie de test ?', ['Pour livrer le défaut','Pour éviter la revue','Pour éprouver la sensibilité des tests','Pour remplacer tous les tests'],2,'La modification contrôlée permet de voir si les cas et assertions détectent une différence attendue.'),
q('Un test signale un défaut absent. Quel coût principal immédiat ?', ['Un gain garanti','Une couverture complète','Une suppression de tous les risques','Du temps d’analyse d’un faux signal'],3,'Les faux positifs mobilisent l’équipe et érodent la confiance dans les résultats.')]);
add('tae-15','istqb','8 · Amélioration continue','Améliorer à partir des causes, pas des symptômes',30,
'Choisir une amélioration à partir d’une mesure et vérifier son effet.',[
['Observer un problème précis','« Les tests sont mauvais » n’aide pas à agir. Décrivez plutôt « 40 % du temps d’analyse provient d’une attente de confirmation sans trace ». Segmentez les causes et identifiez une action dont le mécanisme est plausible.'],
['Expérimenter à petite échelle','Mesurez un état initial, appliquez un changement limité puis comparez sur un périmètre semblable. Une meilleure observation, des données isolées ou le déplacement d’un contrôle vers une portée plus ciblée peuvent réduire le coût tout en gardant la preuve.'],
['Vérifier les effets secondaires','Accélérer ne doit pas retirer la détection attendue. Comparez durée, stabilité, diagnostic et sensibilité aux défauts. Conservez ou révisez l’amélioration selon les résultats, puis partagez ce qui a été appris.']],
'Une équipe remplace une pause fixe par une attente de confirmation corrélée. Elle mesure durée médiane, valeurs lentes et échecs sur plusieurs campagnes comparables, puis injecte une confirmation manquante pour vérifier que le contrôle échoue encore.',
'Le temps d’analyse passe de 50 à 30 min par campagne après ajout de traces. Calculez la baisse et concevez un contrôle pour éviter une conclusion trop rapide.',
'Baisse de 20 min, soit 40 % du niveau initial. Comparer plusieurs campagnes à périmètre, environnement et types d’incident semblables. Vérifier que les traces ne masquent pas des erreurs, ne contiennent aucune donnée sensible et restent exploitables. Un seul résultat peut refléter une campagne plus simple.',
'Changer simultanément outil, données et périmètre rend l’effet de chaque amélioration difficile à isoler.',[
q('50 min d’analyse deviennent 30 min. Quelle baisse relative ?', ['20 %','60 %','40 %','80 %'],2,'La baisse est de 20/50 = 40 %. Trente minutes représentent 60 % du niveau initial.'),
q('Quel plan permet le mieux d’attribuer un effet ?', ['Tout changer sans mesure initiale','Changer un facteur ciblé et comparer des campagnes semblables','Supprimer les échecs du rapport','Compter uniquement les scripts'],1,'Une expérience limitée et une base comparable rendent la conclusion plus crédible.'),
q('Une optimisation divise la durée par deux. Quel autre contrôle faut-il ?', ['Aucun','Le nombre de couleurs','Le nom de la campagne','La conservation de la détection des défauts visés'],3,'Une suite plus rapide qui ne détecte plus son risque a perdu sa fonction.')]);
add('tae-16','istqb','8 · Amélioration continue','Atelier de synthèse : concevoir une solution soutenable',45,
'Assembler sélection, architecture, pipeline, reporting et vérification sur un cas complet.',[
['Le mandat fictif','Une billetterie livre chaque semaine. Le stock ne doit jamais devenir négatif ; l’annulation doit libérer une place. Les parcours UI sont lents et les tests partagent leurs données. Vous disposez de deux jours pour proposer un pilote, pas pour tout automatiser.'],
['Le dossier attendu','Produisez une matrice risques/preuves, un schéma d’adaptateurs, un contrat de données, un plan d’exécution et un exemple de rapport. Choisissez un risque prioritaire et donnez une raison explicite aux exclusions. La solution doit être compréhensible par une autre personne.'],
['La revue critique','Demandez comment un défaut réel ferait échouer la suite, comment distinguer une panne de préparation et comment revenir à la version précédente. Une proposition qui ne traite que le chemin heureux laisse l’essentiel de la confiance implicite.']],
'Le pilote peut vérifier le stock en API avec des événements isolés, conserver un parcours UI de réservation et tester un échec connu de stock négatif dans un simulateur. Un rapport relie chaque résultat au risque couvert.',
'Rédigez votre dossier en une page : deux risques, trois contrôles, un critère de succès du pilote et un indicateur d’amélioration. Expliquez ce que vous ne pouvez pas conclure après deux jours.',
'Risques : survente et place non libérée. Contrôles : limite de stock en API, annulation avec relecture du stock, parcours UI de confirmation. Données isolées et nettoyées. Succès : détection d’erreurs injectées, diagnostics exploitables et exécutions reproductibles selon un seuil convenu. Indicateur : temps d’analyse par cause. Deux jours ne prouvent ni la rentabilité à long terme ni la couverture complète de tous les canaux.',
'Un mini-bilan du portail n’est pas un examen blanc officiel ni une prédiction de réussite à la certification.',[
q('Quelle première action traite les échecs dus aux données partagées ?', ['Acheter un nouvel écran','Isoler la préparation des données par exécution','Supprimer les assertions de stock','Augmenter uniquement les délais'],1,'L’isolation traite l’interférence connue. Une autre cause peut subsister et doit être vérifiée.'),
q('Quelle preuve renforce la confiance dans le contrôle de survente ?', ['Une suite verte sans assertion','Un rapport sans dénominateur','La détection d’un défaut de stock injecté en environnement isolé','Un nombre élevé de fichiers'],2,'La détection d’un défaut ciblé vérifie la sensibilité de la preuve, dans les limites de cette injection.'),
q('Que doit reconnaître le bilan du pilote ?', ['Ses limites, risques restants et hypothèses de généralisation','Une rentabilité garantie','L’absence de tout défaut futur','Une équivalence avec l’examen officiel'],0,'Un pilote soutient une décision bornée ; il ne justifie pas des conclusions au-delà de son périmètre.')]);

add('vibe-01','vibe','1 · Cadrer','Transformer une idée en résultat observable',25,
'Définir un petit projet que vous pourrez vérifier sans service externe.',[
['Le fil rouge','Vous construirez un carnet de lecture fictif : afficher des livres de démonstration, filtrer par titre, marquer un livre lu et transférer cet état. Le projet ne contient ni nom de personne, ni compte, ni document d’entreprise. Il reste réalisable avec les fonctions du navigateur.'],
['Écrire le contrat avant le code','Décrivez utilisateur, action, résultat et limites. « Une application agréable » ne suffit pas. « Le filtre ignore la casse, affiche un état vide et ne modifie pas les données » se vérifie. Fixez un périmètre minimal avant de solliciter un outil IA.'],
['Garder le jugement humain','Le développement assisté par IA accélère la production de propositions. Vous restez responsable de comprendre les changements et d’en vérifier les effets. Un résultat plausible ne vaut pas une preuve ; demandez des explications et des exemples exécutables.']],
'Besoin vague : « gère mes lectures ». Contrat limité : « à partir de six livres fictifs, afficher ceux dont le titre contient la recherche, sans tenir compte des majuscules ; si aucun ne correspond, afficher Aucun livre ».',
'Écrivez quatre critères d’acceptation pour ce filtre, dont un cas vide et un cas sans correspondance. Excluez explicitement deux fonctionnalités.',
'Recherche vide : les six livres. Recherche « mer » : seuls les titres contenant cette suite de lettres. « MER » donne le même résultat. Une recherche sans correspondance affiche un message et zéro ligne. Hors périmètre : connexion et recommandations automatiques. Ces critères évitent que l’IA ajoute des services inutiles.',
'Une grande demande floue produit souvent beaucoup de code difficile à évaluer.',[
q('Quel critère est vérifiable ?', ['L’outil doit être magique','Le filtre doit être moderne','Une recherche vide affiche les six livres','Le code doit être impressionnant'],2,'Le résultat attendu est observable et peut être comparé à un jeu de données connu.'),
q('Qui valide le code proposé par l’IA ?', ['Personne','La personne qui construit et livre le projet','Uniquement le nom du modèle','Le hasard'],1,'L’outil propose ; la personne responsable vérifie le comportement et comprend les changements.'),
q('Quel périmètre convient au premier incrément ?', ['Authentification, paiement et réseau social','Une refonte sans critères','Un backend imposé sans besoin','Une liste fictive et un filtre local'],3,'Un incrément réduit facilite l’observation et l’apprentissage sans dépendances inutiles.')]);
add('vibe-02','vibe','1 · Cadrer','Demander une modification précise à l’IA',25,
'Rédiger une demande avec contexte, contraintes, sortie et vérifications.',[
['Donner le contexte nécessaire','Expliquez ce qui existe, le résultat voulu et le problème observé. Fournissez seulement les extraits publics ou fictifs utiles. Pour une erreur, donnez l’action qui la déclenche et le message exact dépourvu de secret.'],
['Borner la proposition','Précisez les fichiers autorisés, les contraintes de dépendances, l’accessibilité et le format de livraison. Demandez une petite modification puis une explication des risques et un scénario de vérification. Le nombre de lignes n’est pas une preuve de complétude.'],
['Faire émerger les hypothèses','Invitez l’outil à signaler les informations manquantes. Si la demande porte sur un filtre, décidez si accents, casse et espaces sont normalisés. Sans contrat, une implémentation et un test peuvent tous deux confirmer une hypothèse erronée.']],
'« Dans le carnet fictif, ajoute un filtre local par titre. Sans bibliothèque ni requête réseau. Ignore la casse et les espaces en début/fin ; respecte les accents. Livrer les fichiers modifiés, l’explication et quatre essais. Ne change pas la fonction de marquage lu. »',
'Réécrivez « corrige mon site » en une demande exploitable : le bouton Lu ne persiste pas après actualisation.',
'Décrire : ouvrir une fiche, cliquer Lu, actualiser, état perdu. Attendu : état conservé dans le même navigateur. Contrainte : stockage local, données fictives, message si stockage indisponible. Fournir l’extrait qui lit/écrit l’état, demander une correction ciblée, une explication et les essais actualisation, nouvel onglet et stockage bloqué.',
'Un message d’erreur copié peut contenir une URL interne ou une clé : remplacer par un exemple fictif avant partage.',[
q('Quelle précision réduit une hypothèse cachée dans un filtre ?', ['Le nom du clavier','La règle de traitement des accents','La couleur préférée de l’IA','Le nombre de fenêtres ouvertes'],1,'Le traitement des accents influence les correspondances et doit appartenir au contrat.'),
q('Quel contexte aide à corriger un défaut ?', ['Étapes de reproduction, attendu et obtenu','Seulement « ça ne marche pas »','Tout le disque de l’entreprise','Une promesse de rapidité'],0,'Ces éléments rendent le problème observable et limitent le besoin de deviner.'),
q('Quelle sortie demander pour faciliter la revue ?', ['Un gros fichier sans explication','Un nouveau service obligatoire','Une modification ciblée et ses vérifications','Uniquement un message de succès'],2,'Une petite modification liée à des essais explicites est plus facile à comprendre et à valider.')]);
add('vibe-03','vibe','2 · Construire','Lire les fichiers et construire un premier incrément',35,
'Reconnaître le rôle de HTML, CSS et JavaScript et conserver des chemins portables.',[
['Une responsabilité par support','HTML donne la structure et le sens : titre, champ, bouton, liste. CSS organise la présentation et l’adaptation à l’écran. JavaScript relie les actions à l’état. Cette séparation aide à localiser une erreur et à relire une petite modification.'],
['Rester portable','Utilisez des chemins relatifs comme ./assets/app.js pour un site publié sous un sous-dossier. Évitez les imports de bibliothèques distantes si le réseau cible les bloque. Pour ce fil rouge, des scripts classiques locaux suffisent : aucun outil de construction n’est requis.'],
['Construire une tranche complète','Affichez trois livres fictifs, puis un filtre fonctionnel et son état vide. Validez cette tranche avant d’ajouter la persistance. Relisez les éléments interactifs : un bouton doit être un bouton et le champ doit avoir une étiquette visible.']],
'Une page publiée sous /carnet/ charge ./assets/app.js sous /carnet/assets/. Le chemin /assets/app.js cherche à la racine du domaine et peut provoquer une erreur sur GitHub Pages.',
'Proposez une arborescence minimale et trois essais pour une liste filtrable. Indiquez quel fichier modifier si l’espacement est mauvais.',
'index.html, assets/style.css et assets/app.js. Essais : tous les livres au départ ; filtre insensible à la casse ; état vide sans erreur. L’espacement relève d’abord du CSS. Le filtrage relève du JavaScript. L’étiquette et la sémantique du champ relèvent du HTML.',
'Un site qui fonctionne à la racine d’un serveur peut échouer sous un sous-dossier si ses chemins commencent par /.',[
q('Quel chemin convient à un script voisin dans assets ?', ['./assets/app.js','/assets/app.js dans tous les contextes','https://service-inconnu/script.js','C:\\poste\\script.js'],0,'Le chemin relatif suit le dossier du site et convient à un projet GitHub Pages sous /carnet/.'),
q('Quel fichier porte normalement les règles d’espacement ?', ['Le fichier d’export JSON','La documentation seule','Le CSS','La liste des scores'],2,'CSS porte la présentation. La structure HTML et le comportement JavaScript restent des préoccupations distinctes.'),
q('Quelle tranche est la plus facile à valider ?', ['Dix fonctionnalités inachevées','Trois livres avec filtre et état vide fonctionnels','Un backend sans interface','Une animation sans données'],1,'Une tranche petite mais complète peut être vérifiée de bout en bout avant extension.')]);
add('vibe-04','vibe','2 · Construire','Comprendre le changement et garder un point de retour',30,
'Relire une différence et enregistrer une étape connue avant la suivante.',[
['Examiner la différence','Une revue compare le comportement avant/après, les fichiers touchés et les nouvelles dépendances. Demandez pourquoi chaque changement est nécessaire. Si une correction de filtre modifie aussi la sauvegarde, vérifiez cette extension ou réduisez-la.'],
['Garder une version connue','Avant un changement, conservez une copie complète ou un commit. Un commit enregistre un état suivi ; il ne stocke pas automatiquement les fichiers ignorés ni les données du navigateur. Un export de progression reste donc distinct de la sauvegarde du code.'],
['Revenir avec prudence','Sur un historique partagé, une annulation par un nouveau commit conserve la trace du changement. Pour un fichier non enregistré, une restauration peut détruire les modifications locales : inspectez et sauvegardez d’abord. Vous devez savoir ce que vous récupérez et ce que vous perdez.']],
'Après ajout du filtre, vous enregistrez « filtre et état vide validés ». Une proposition ultérieure remplace tous les fichiers. Vous comparez la différence, repérez une dépendance réseau inattendue et pouvez repartir de l’étape connue.',
'Une modification touche cinq fichiers pour changer une étiquette. Écrivez trois questions de revue et une stratégie de retour sans perdre votre travail.',
'Pourquoi ces cinq fichiers ? Une dépendance ou une configuration a-t-elle changé ? Les comportements existants sont-ils conservés ? Garder une copie ou un commit avant intervention, puis demander une correction réduite. Si le changement a déjà été partagé, préférer une annulation traçable ; sauvegarder les modifications non enregistrées avant toute restauration.',
'Sauvegarder le dossier du site ne sauvegarde pas la progression stockée dans le navigateur.',[
q('Un commit du code contient-il automatiquement le localStorage ?', ['Oui','Oui si le navigateur est ouvert','Non, il faut un export distinct','Seulement le dimanche'],2,'Le stockage du navigateur ne fait pas partie des fichiers suivis du projet.'),
q('Que faire face à une dépendance réseau imprévue ?', ['La conserver sans comprendre','En vérifier la nécessité et la compatibilité avec les contraintes','La cacher dans un autre fichier','Désactiver les tests'],1,'La dépendance peut rendre le projet inaccessible dans son environnement cible.'),
q('Avant de restaurer un fichier modifié localement ?', ['Effacer les copies','Fermer les yeux','Partager un secret','Examiner et sauvegarder ce qui serait perdu'],3,'Une restauration peut écraser des changements non enregistrés. Le point de retour doit être explicite.')]);
add('vibe-05','vibe','3 · Vérifier','Tester les règles avec des exemples indépendants',35,
'Vérifier les cas normaux, limites et invalides sans répéter l’implémentation.',[
['Partir du contrat','Déduisez les essais des critères d’acceptation. Pour un filtre : vide, casse, espaces, aucune correspondance et plusieurs correspondances. Une preuve utile possède une entrée et un résultat attendu déterminés avant de regarder le résultat obtenu.'],
['Séparer les niveaux','Une petite fonction pure de filtrage peut être vérifiée avec des tableaux fictifs. L’interface exige aussi un essai au clavier et une vérification de l’état affiché. Le bon résultat de la fonction ne prouve pas que le champ appelle cette fonction au bon moment.'],
['Ne pas se laisser convaincre par le vert','Un test qui calcule son attendu avec la fonction testée ne contrôle rien d’indépendant. Faites échouer volontairement un cas sur une copie pour vérifier que le dispositif détecte la différence. Une IA peut proposer des tests qui confortent sa propre erreur.']],
'Livres : « Mer calme », « Jardin ». Contrat : casse ignorée, accents respectés, espaces externes ignorés. La requête « MER » doit retourner uniquement « Mer calme » ; « désert » retourne une liste vide.',
'La fonction filtreTitres oublie de retirer les espaces externes. Écrivez un essai qui révèle ce défaut et expliquez pourquoi tester seulement « mer » ne suffit pas.',
'Avec les deux titres fictifs, rechercher «  mer  » doit retourner [« Mer calme »]. Une recherche sans espaces passe même si trim est absent et ne distingue donc pas les deux implémentations. Compléter avec vide et aucune correspondance, puis vérifier le branchement réel du champ à l’écran.',
'Demander à l’IA de déclarer que ses tests passent ne remplace pas leur exécution observée.',[
q('Quel attendu est indépendant ?', ['Le résultat renvoyé par la fonction elle-même','La liste exacte déduite du contrat et des données','Un message « OK » inconditionnel','Une copie de la variable obtenue'],1,'L’attendu doit pouvoir être fixé sans réutiliser l’algorithme que l’on cherche à vérifier.'),
q('Quel cas révèle l’absence de suppression des espaces externes ?', ['«  mer  » avec un titre « Mer calme »','« mer » uniquement','Un changement de couleur','Un livre sans titre jamais affiché'],0,'Le cas contient précisément la condition limite oubliée par la fonction.'),
q('La fonction passe tous ses tests. Que reste-t-il à vérifier ?', ['Rien','Uniquement son nom','Le fonctionnement dans l’interface et au clavier','Le prix d’un abonnement IA'],2,'Le branchement des événements et l’expérience d’interaction sont des preuves complémentaires.')]);
add('vibe-06','vibe','3 · Vérifier','Déboguer avec une hypothèse et une preuve',30,
'Reproduire un défaut, isoler sa cause et vérifier une correction ciblée.',[
['Réduire le problème','Notez les étapes minimales, les données fictives, l’attendu et l’obtenu. Une erreur qui apparaît après cinq actions peut dépendre de l’état accumulé. Essayez un état propre, puis réintroduisez les actions une à une.'],
['Suivre le flux','Pour un bouton Lu, vérifiez successivement l’événement, l’identifiant du livre, la modification d’état, l’écriture et la relecture. Observez un point à la fois. Évitez de changer à la fois stockage, rendu et événements sans comprendre lequel est fautif.'],
['Vérifier au-delà du symptôme','Après correction, rejouez la reproduction et un scénario voisin. Documentez la cause et le contrôle ajouté. Un message d’erreur disparu n’est pas une preuve suffisante si le bouton ne fait plus rien.']],
'L’état est écrit sous carnet-v2 mais relu sous carnet-v1. La console ne montre aucune exception. Comparer les clés de lecture et d’écriture révèle la cause ; rétablir une clé commune et actualiser confirme le comportement.',
'Après marquage Lu, le badge s’affiche mais disparaît à l’actualisation. Proposez trois hypothèses et une observation pour chacune.',
'Écriture absente : observer l’appel et la valeur enregistrée. Clé différente : comparer exactement les clés de lecture et d’écriture. Lecture ou analyse JSON en erreur : observer la valeur brute et le message de reprise. Puis corriger la cause démontrée, actualiser et vérifier aussi un deuxième livre. Ne pas effacer le stockage pour masquer le défaut.',
'Un journal de débogage doit utiliser des données fictives et être retiré s’il expose inutilement l’état.',[
q('Quelle première étape aide le plus au débogage ?', ['Réécrire tout le projet','Reproduire avec des étapes minimales','Changer toutes les clés','Effacer toute preuve'],1,'Une reproduction stable permet de vérifier chaque hypothèse et la correction.'),
q('Le badge apparaît mais ne persiste pas. Quelle piste est plausible ?', ['Une erreur entre écriture et relecture de l’état','La couleur de l’écran','Le nom commercial de l’outil','La taille du logo'],0,'Le rendu courant peut être correct alors que le stockage ou sa relecture ne l’est pas.'),
q('Après correction, quel contrôle est pertinent ?', ['Aucun','Seulement fermer la console','La reproduction et un cas voisin','Supprimer le scénario qui échouait'],2,'Le défaut initial doit être résolu sans casser un comportement proche.')]);
add('vibe-07','vibe','4 · Fiabiliser','Valider les entrées et garder les données locales',35,
'Concevoir un import sûr et rendre visible la portée des données enregistrées.',[
['Traiter le fichier comme une entrée non fiable','Le nom .json ne garantit rien. Limitez la taille, analysez le JSON, vérifiez format, version, types, identifiants et plages numériques. Refusez le fichier entier avant toute écriture si une condition est invalide ; un import partiel peut perdre des données discrètement.'],
['Séparer données et HTML','Un titre importé ne doit pas devenir du code. Pour afficher du texte fourni par une entrée, utilisez textContent ou un échappement adapté. Évitez d’exécuter des chaînes et n’ajoutez pas de champ libre dont vous n’avez pas besoin.'],
['Minimiser la sauvegarde','Pour un carnet, exporter seulement identifiants et statut lu suffit souvent. Une progression de cours peut se limiter aux identifiants de leçons et scores. Les téléchargements restent des fichiers locaux : ils ne sont pas envoyés à GitHub automatiquement.']],
'Un fichier annonce un score de −5 ou un identifiant de livre inconnu. L’import le refuse et garde l’état actuel. Un autre fichier valide montre un aperçu avant fusion ; l’état précédent est sauvegardé.',
'Définissez cinq règles de validation pour un export {version, livresLus}. Que doit-il se passer si le troisième identifiant est inconnu ?',
'Objet exact ; version prise en charge ; livresLus tableau ; chaque élément chaîne et identifiant connu ; taille maximale et absence de doublons. Un identifiant inconnu invalide tout l’import avant mutation. Afficher l’erreur, garder l’état existant et demander un export compatible, sans ignorer silencieusement l’élément.',
'Un fichier local n’est pas chiffré par le simple fait d’être du JSON : n’y mettez pas d’information sensible.',[
q('Quand écrire l’état importé ?', ['Après le premier champ valide','Avant de lire le fichier','Après validation complète et aperçu confirmé','Même si la version est inconnue'],2,'La validation complète prévient les mutations partielles et la confirmation rend la fusion explicite.'),
q('Quelle méthode affiche du texte sans l’interpréter comme HTML ?', ['eval','textContent','Une insertion HTML brute de la saisie','Un script construit depuis la saisie'],1,'textContent traite la valeur comme du texte. Une insertion HTML non maîtrisée peut interpréter du contenu actif.'),
q('Quel export minimise les données pour une liste de livres lus ?', ['Tous les documents du poste','Les mots de passe','L’historique du navigateur','Les seuls identifiants et statuts nécessaires'],3,'Le fichier doit contenir uniquement les données utiles à la restauration de la fonction.')]);
add('vibe-08','vibe','4 · Fiabiliser','Prévoir le clavier, le mobile et les erreurs',30,
'Ajouter des états compréhensibles et vérifier les interactions sans souris.',[
['Utiliser des éléments appropriés','Associez une étiquette au champ ; utilisez des boutons pour les actions et des liens pour la navigation. Un état visible ne doit pas dépendre uniquement de la couleur. L’ordre de tabulation doit permettre d’atteindre et de déclencher les commandes.'],
['Concevoir les états dégradés','Liste vide, aucune correspondance, stockage indisponible et fichier invalide font partie de l’expérience. Décrivez ce que l’utilisateur peut faire ensuite. Si la persistance est bloquée, gardez l’état en session et proposez un export au lieu d’annoncer une sauvegarde inexistante.'],
['Observer à plusieurs tailles','Un petit écran doit conserver le contenu et les commandes sans débordement horizontal gênant. Testez zoom, longs titres et boutons successifs. Un test automatisé d’accessibilité aide, mais ne remplace pas un parcours réel au clavier.']],
'Le filtre affiche « Aucun livre pour cette recherche » et propose d’effacer le champ. Le bouton reste identifiable avec un contour de focus. Quand l’écriture locale échoue, un message précise que l’état sera perdu à la fermeture sans export.',
'Créez une liste de cinq essais manuels d’accessibilité et d’erreur pour le carnet.',
'Tout atteindre avec Tab et activer les boutons au clavier ; voir le focus ; entendre ou comprendre l’étiquette du filtre ; utiliser une largeur mobile sans perte de commande ; provoquer un fichier invalide et vérifier que l’état demeure inchangé. Ajouter un essai de stockage bloqué et un zoom à 200 % complète la couverture.',
'Un bouton dessiné dans un div peut sembler fonctionner à la souris et rester inaccessible au clavier.',[
q('Quel contrôle révèle un bouton inaccessible à la souris seule ?', ['La taille du dossier','Un parcours avec Tab puis activation au clavier','Le nombre de commentaires','La date du fichier'],1,'Le parcours clavier vérifie l’accès réel aux commandes et la visibilité du focus.'),
q('L’écriture locale est bloquée. Quel message est honnête ?', ['Sauvegarde permanente garantie','Les données sont dans GitHub','Progression en session seulement ; exportez-la','Aucun message'],2,'Le message doit refléter la persistance réellement disponible et proposer une action utile.'),
q('Un état rouge/vert sans texte pose quel problème ?', ['Il dépend uniquement de la couleur','Il stocke forcément des secrets','Il empêche toute recherche','Il améliore toujours le clavier'],0,'La couleur seule ne rend pas l’information accessible à toutes les personnes et situations.')]);
add('vibe-09','vibe','5 · Livrer','Publier des fichiers statiques et contrôler le résultat',35,
'Préparer un lot complet et vérifier la version effectivement publiée.',[
['Livrer le bon dossier','Un site statique contient une entrée index.html et ses ressources locales. Le dossier téléversé doit correspondre à la source choisie dans Pages. Décompressez l’archive avant de transférer les fichiers ; publier seulement le ZIP ne remplace pas le site.'],
['Vérifier le déploiement','Après l’enregistrement des fichiers, contrôlez le résultat du déploiement puis ouvrez l’URL publiée. Une page en cache peut encore montrer la version précédente : vérifiez un numéro de version visible et actualisez complètement si nécessaire.'],
['Rejouer le parcours utile','Depuis le navigateur cible, vérifiez accès aux ressources, navigation, interaction, persistance et transfert. Conservez la version précédente ou son commit pour pouvoir revenir en arrière. Les fichiers de progression téléchargés restent hors du dépôt public.']],
'Pour un projet sous /carnet/, le dépôt contient index.html et assets/ au niveau attendu. Après publication, le pied de page indique la nouvelle version et le filtre fonctionne depuis le réseau cible.',
'Une page publiée affiche l’ancienne version. Donnez trois contrôles avant de modifier une nouvelle fois le code.',
'Vérifier que le commit contient bien les nouveaux fichiers au dossier choisi ; consulter le déploiement et son résultat ; actualiser complètement la page et confirmer l’URL et le numéro de version. Si le déploiement a échoué, lire son erreur au lieu de supposer un problème de cache.',
'Une réussite locale ne garantit pas l’accès sur un autre réseau : la validation doit inclure le navigateur cible.',[
q('Que faut-il téléverser pour mettre à jour le site ?', ['Seulement le ZIP fermé','Les fichiers décompressés au dossier de publication','Le fichier de progression personnel','Une capture d’écran'],1,'Pages doit pouvoir servir index.html et ses ressources, au bon niveau de dossier.'),
q('Quel indice confirme la version affichée ?', ['La couleur de la souris','Le nombre d’onglets','Un numéro de version visible correspondant au lot livré','Le nom de l’ordinateur'],2,'Un marqueur visible permet de distinguer la nouvelle livraison d’une page conservée en cache.'),
q('Quel fichier doit rester hors du dépôt public ?', ['index.html','Le CSS public','Le script public','Votre export de progression personnel'],3,'L’export sert au transfert entre appareils. Il n’est pas nécessaire à l’hébergement du site.')]);
add('vibe-10','vibe','5 · Livrer','Atelier final : livrer un carnet de lecture vérifié',50,
'Assembler un petit produit dont les fonctions et les limites sont démontrées.',[
['Le contrat final','Six livres fictifs, filtre par titre, état Lu persistant, export/import validé, usage mobile et clavier. Aucun compte, aucun backend, aucune ressource externe indispensable. Chaque ajout doit servir un critère explicite et disposer d’un essai observable.'],
['Le dossier de livraison','Fournissez les fichiers statiques, un mode d’emploi, le format de sauvegarde et une liste de vérifications avec résultats observés. Décrivez ce qui a été testé et ce qui reste à vérifier sur le réseau cible. Ne déclarez pas une publication sans preuve de déploiement.'],
['La démonstration de confiance','Marquez deux livres, exportez, ouvrez un navigateur distinct et importez. Vérifiez les mêmes identifiants ; importez à nouveau sans créer de doublons. Essayez un fichier invalide et contrôlez que l’état n’a pas changé. L’essai complet relie les fonctions entre elles.']],
'Une livraison solide montre : trois cas de filtre, une persistance après actualisation, un transfert vers un deuxième profil, un import refusé sans perte et un parcours clavier. Le code généré n’est qu’une partie du résultat.',
'Construisez votre carnet par incréments avec l’outil de votre choix, puis rédigez une preuve de livraison en huit lignes. Aucun service IA n’est nécessaire pour consulter ce cours.',
'Lignes attendues : version ; périmètre ; structure des fichiers ; essais de filtre ; persistance ; aller-retour export/import ; clavier/mobile ; limites et retour arrière. Une preuve valable indique les résultats réellement observés. Si le deuxième appareil n’est pas disponible, marquer ce test « à faire » au lieu de le déclarer réussi.',
'Un mini-bilan réussi mesure des connaissances ; il ne prouve pas à lui seul que votre propre application fonctionne.',[
q('Quel essai démontre le mieux le transfert ?', ['Ouvrir deux fois la même leçon','Exporter puis importer sur un autre navigateur et comparer','Lire uniquement le nom du fichier','Changer le fond d’écran'],1,'La comparaison dans un contexte de stockage distinct vérifie l’usage réellement recherché.'),
q('Le réseau cible est indisponible pour le test. Que livrer ?', ['Une affirmation d’accès garanti','Un résultat inventé','Le résultat local et la validation réseau encore à faire','Rien même si les fichiers sont prêts'],2,'Les limites de vérification font partie du livrable ; elles doivent être distinguées des résultats observés.'),
q('Après un second import du même fichier, que souhaite-t-on ?', ['La perte des livres déjà lus','Des doublons dans la progression','L’envoi des données au dépôt','Le même état, sans duplication des acquis'],3,'Une fusion idempotente permet de répéter le transfert sans multiplier artificiellement les données.')]);

// Petits exemples autonomes à lire ou à reproduire dans un environnement autorisé.
lessons.find(l=>l.id==='vibe-02').code=`Contexte : carnet de lecture fictif, sans compte.
Besoin : filtrer les titres pendant la saisie.
Contrat : ignorer casse et espaces externes ; respecter les accents.
Contraintes : fichiers locaux, sans bibliothèque ni requête réseau.
Livraison : petite modification, explication et quatre essais.
Avant de coder : explicite les hypothèses encore manquantes.`;
lessons.find(l=>l.id==='vibe-03').code=`<!-- Premier incrément : enregistrer dans un fichier index.html -->
<!doctype html>
<html lang="fr">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Carnet fictif</title>
<h1>Mon carnet de lecture</h1>
<label for="filtre">Filtrer par titre</label>
<input id="filtre" type="search">
<p id="bilan" role="status"></p>
<ul id="livres"></ul>
<script>
const titres = ['Mer calme', 'Jardin', 'Voyage'];
const champ = document.getElementById('filtre');
function afficher() {
  const recherche = champ.value.trim().toLocaleLowerCase('fr');
  const resultat = titres.filter(t =>
    t.toLocaleLowerCase('fr').includes(recherche));
  const liste = document.getElementById('livres');
  liste.replaceChildren();
  for (const titre of resultat) {
    const ligne = document.createElement('li');
    ligne.textContent = titre;
    liste.appendChild(ligne);
  }
  document.getElementById('bilan').textContent = resultat.length
    ? resultat.length + ' livre(s)' : 'Aucun livre';
}
champ.addEventListener('input', afficher);
afficher();
</script>
</html>`;
lessons.find(l=>l.id==='vibe-05').code=`// Fonction isolée et attendus fixés à partir du contrat.
function filtrer(titres, saisie) {
  const terme = saisie.trim().toLocaleLowerCase('fr');
  return titres.filter(t => t.toLocaleLowerCase('fr').includes(terme));
}
const titres = ['Mer calme', 'Jardin'];
function verifier(obtenu, attendu) {
  if (JSON.stringify(obtenu) !== JSON.stringify(attendu)) {
    throw new Error('Résultat inattendu : ' + JSON.stringify(obtenu));
  }
}
verifier(filtrer(titres, '  MER  '), ['Mer calme']);
verifier(filtrer(titres, ''), ['Mer calme', 'Jardin']);
verifier(filtrer(titres, 'désert'), []);
// Sur une copie, retirer trim() : le premier essai doit échouer.`;
lessons.find(l=>l.id==='vibe-07').code=`// Schéma minimal pour un carnet fictif ; pas celui du portail.
function validerCarnet(objet) {
  const connus = new Set(['livre-1', 'livre-2', 'livre-3']);
  if (!objet || typeof objet !== 'object' || Array.isArray(objet)) {
    throw new Error('Objet attendu');
  }
  const cles = Object.keys(objet);
  if (cles.length !== 2 || !cles.includes('version') ||
      !cles.includes('livresLus') || objet.version !== 1 ||
      !Array.isArray(objet.livresLus) ||
      objet.livresLus.length > connus.size ||
      new Set(objet.livresLus).size !== objet.livresLus.length ||
      objet.livresLus.some(id => typeof id !== 'string' || !connus.has(id))) {
    throw new Error('Sauvegarde de carnet invalide');
  }
  return {version: 1, livresLus: [...objet.livresLus]};
}
// Limiter aussi la taille du fichier avant JSON.parse,
// puis valider avant toute écriture ou fusion.`;
lessons.find(l=>l.id==='tae-07').code=`PRÉPARER : événement fictif, stock = 5, identifiant d’exécution unique
ESSAYER
  résultat = réserver(événement, quantité = 2)
  vérifier résultat.statut == "confirmée"
  vérifier lireStock(événement) == 3
TOUJOURS NETTOYER
  supprimer la réservation et l’événement de cette exécution
EN CAS D’ÉCHEC
  conserver étape, attendu/obtenu et identifiant de corrélation`;

// Les identifiants sont stables : ne pas les réutiliser pour un autre contenu.
root.PORTAL_CONTENT={version:'2.0.0',lessons,courses:[
{id:'istqb',title:'ISTQB CTAL-TAE v2.0',short:'ISTQB CTAL-TAE',tag:'AUTOMATISATION DES TESTS',description:'Des décisions d’automatisation à l’amélioration continue : un parcours de cas pratiques en huit chapitres.',prerequisite:'Bases du test logiciel de niveau CTFL et lecture de pseudocode conseillées. Ce support indépendant ne remplace pas le syllabus ni une formation accréditée.',color:'teal'},
{id:'vibe',title:'Vibe Coding',short:'Vibe Coding',tag:'DÉVELOPPEMENT ASSISTÉ PAR IA',description:'Transformer une idée en petit outil vérifié, par étapes : spécifier, construire, tester et livrer.',prerequisite:'Aucun outil IA payant requis. Les exercices se font sur un projet fictif ; les exemples de code utilisent JavaScript et les API du navigateur.',color:'orange'}]};
})(typeof window==='undefined'?globalThis:window);
