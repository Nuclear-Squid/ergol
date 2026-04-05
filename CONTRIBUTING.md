# Contribution

Les contributions sont accessibles à toutes et tous. Nos projets portent sur l’ergonomie clavier, et beaucoup de sujets ne requièrent pas ou peu de compétences logicielles : documentation, contenu web, dispositions et configurations de claviers…

Toute contribution est bienvenue : vous ne pouvez rien casser, et nos mainteneur·euses sont là pour vous aider !


## Contributeurs et contributrices

La contribution s’articule essentiellement autour de deux types de tickets GitHub : les [issues](issues) et les [pull-requests (PR)](pulls).

- Ouvrez des [issues](issues) :
  - pour signaler un problème, sous la forme d’un rapport de bug (étapes pour reproduire, résultat
  attendu, résultat obtenu) ;
  - pour exprimer un souhait de fonctionnalité, sous la forme d’un [récit utilisateur] ;
  - pour une demande d’assistance, merci d’utiliser [Mastodon] ou [Discord].

- Proposez des [pull requests (PR)](pulls) :
  - beaucoup de corrections peuvent être proposées directement depuis l’interface web de GitHub ;
  - faites des commits incrémentaux, mieux vaut trop que pas assez ;
  - si votre PR devient complexe, merci de regrouper vos commits de façon logique *avant* de solliciter une revue — ou mieux, scindez-la en plusieurs PR ;
  - une fois que la revue de code a commencé, ne faites plus aucun *rebase* ni *force-push* ;
  - suivez les demandes de la personne qui fait la revue de code.

- Veillez à garder les discussions aussi claires que possible :
  - évitez les hors-sujets et tout ce qui peut générer du bruit de fond ;
  - répondez directement aux questions qu’on vous pose — si vous tenez à faire une réponse longue, commencez par un `TL;DR:` ;
  - les tickets GitHub sont là pour proposer des solutions. On ne commente un ticket que pour contribuer
  à sa résolution, en non pour donner son opinion.

[récit utilisateur]: https://fr.wikipedia.org/wiki/Récit_utilisateur
[Mastodon]: https://piaille.fr/@ergol
[Discord]: https://discord.gg/5xR5K3nAFX


## Mainteneurs et mainteneuses

Si vous êtes en charge de la maintenance du projet, vous avez des tâches supplémentaires.

- Mettre de l’ordre dans les tickets : triage, étiquetage, détection des doublons…

- Effectuer des revues de code :
  - adaptez vos exigences à l’enjeu de la PR, les tickets simples sont l’occasion de mentorer des personnes moins expérimentées ;
  - si vous validez une PR simple, squashez tous les commits en un seul (bouton « squash & merge ») — rédigez vous-même un message de commit adéquat si besoin est ;
  - si vous validez une PR complexe, assurez-vous que la branche contient bien une suite de commits logiques, et ajoutez-les à `main` avec « rebase & merge » ;
  - sachez accepter les améliorations incrémentales : si une PR résout une partie d’un problème sans dégrader le reste du projet, c’est bon à prendre, et ça encourage à faire un *follow-up* ;
  - soyez souples : *in fine*, ce qui compte c’est la contribution, pas comment elle a été faite ;
  - ne fusionnez *aucune* PR sans avoir testé vous-même le résultat. Les tests de CI sont
  nécessaires mais non suffisants.

- Aider les contributeur·ices à monter en compétence :
  - dans les revues de code, privilégiez les suggestions de code aux demandes abstraites ;
  - dans vos PR, écrivez le code que vous aimeriez avoir en revue, et demandez une revue à un·e
  camarade (avoir des droits de merge ne dispense pas d’une revue tierce) ;
  - dans vos tickets, faites preuve de précision et de concision. Votre communication doit servir d’exemple.


## Pas d’IA générative

- ni pour contribuer du contenu
- ni pour aider à la revue de PR
- ni pour communiquer sur les tickets

On valorise l’intelligence collective pour créer des outils et transmettre des connaissances liées à l’ergonomie clavier. Merci de respecter le temps de nos contributeur·ices en ne leur soumettant que du contenu généré par vous-mêmes — sans aide de l’IA.
