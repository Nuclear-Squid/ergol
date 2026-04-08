# Contribution

Les contributions sont accessibles à toutes et tous. Nos projets portent sur l’ergonomie clavier, et beaucoup de sujets ne requièrent pas ou peu de compétences logicielles : documentation, contenu web, dispositions et configurations de claviers…

Toute contribution est bienvenue : vous ne pouvez rien casser, et nos mainteneur·euses sont là pour vous aider !


## Contributeurs et contributrices

La contribution s’articule essentiellement autour de deux types de tickets GitHub : les [issues] et les [pull requests] (PR).

### Ouvrir des [issues]

- Signalez un problème sous la forme d’un rapport de bug :
  1. étapes pour reproduire
  2. résultat attendu
  3. résultat obtenu
- Exprimez un souhait de fonctionnalité sous la forme d’un [récit utilisateur].
- Merci d’utiliser plutôt [Mastodon] ou [Discord] pour une demande d’assistance.

### Proposer des [pull requests] (PR)

- Beaucoup de corrections peuvent être proposées directement depuis l’interface web de GitHub.
- Faites des commits incrémentaux, mieux vaut trop que pas assez.
- Si votre PR devient complexe, squashez vos commits par unités logiques [et décrivez-les][conventional commits] *avant* de solliciter une revue — ou mieux, scindez-la en plusieurs PR.
- Une fois que la revue de code a commencé, ne faites plus aucun *rebase* ni *force-push*.
- Suivez les demandes de la personne qui fait la revue de code.

### Garder les discussions aussi claires que possible

- Évitez les hors-sujets et tout ce qui peut générer du bruit de fond.
- Répondez directement aux questions qu’on vous pose — si vous tenez à faire une réponse longue, commencez par un `TL;DR:`.
- Les tickets GitHub sont là pour proposer des solutions. On ne commente un ticket que pour contribuer à sa résolution, et non pour donner son opinion.


## Mainteneurs et mainteneuses

Si vous êtes en charge de la maintenance du projet, vous avez des tâches supplémentaires.

### Mettre de l’ordre dans les tickets

Triage, étiquetage, détection des doublons…

### Effectuer des revues de code

- Adaptez vos exigences à l’enjeu de la PR : les tickets simples sont l’occasion de mentorer des personnes moins expérimentées.
- Si vous validez une PR simple :
  - résolvez vous-même les éventuels conflits de merge ;
  - squashez tous les commits (bouton « squash & merge ») ;
  - rédigez vous-même le [message de commit][conventional commits] si besoin est.
- Si vous validez une PR complexe :
  - assurez-vous que la branche contient bien une suite de commits logiques ;
  - ajoutez-les à `main` avec « rebase & merge ».
- Sachez accepter les améliorations incrémentales : si une PR résout une partie d’un problème sans dégrader le reste du projet, c’est bon à prendre, et ça encourage à faire un *follow-up*.
- Soyez souples : *in fine*, ce qui compte c’est la contribution, pas comment elle a été faite.
- Ne fusionnez *aucune* PR sans avoir testé vous-même le résultat. Les tests de CI sont
nécessaires mais non suffisants.

### Aider les contributeur·ices à monter en compétence

- Dans les revues de code, privilégiez les suggestions de code aux demandes abstraites.
- Dans vos PR, écrivez le code que vous aimeriez avoir en revue, et demandez une revue à un·e
camarade : avoir des droits de merge ne dispense pas d’une revue tierce.
- Dans vos tickets, faites preuve de précision et de concision. Votre communication doit servir d’exemple.


## Pas d’IA générative

- ni pour contribuer du contenu
- ni pour aider à la revue de PR
- ni pour communiquer sur les tickets

On valorise l’intelligence collective pour créer des outils et transmettre des connaissances liées à l’ergonomie clavier. Merci de respecter le temps de nos contributeur·ices en ne leur soumettant que du contenu créé par vous-mêmes — sans aide de l’IA.

[issues]:        https://github.com/Nuclear-Squid/ergol/issues
[pull requests]: https://github.com/Nuclear-Squid/ergol/pulls

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[récit utilisateur]:    https://fr.wikipedia.org/wiki/Récit_utilisateur
[Mastodon]:             https://piaille.fr/@ergol
[Discord]:              https://discord.gg/5xR5K3nAFX
