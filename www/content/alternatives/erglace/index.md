+++
title = "Erglace"
url = "/erglace"

[params]
cssSheets = ["/css/keebs.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/keebs.js"]
footer = "réfrigéré par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++

{{<x-keyboard name="Erglace"
              data="erglace" class="odk"
              href="https://github.com/Lysquid/Erglace">}}

## Comparaison à Ergo-L

Erglace abandonne l'accès facile aux raccourcis usuels (Ctrl+C, Ctrl+V...) pour atteindre des statistiques légèrement meilleures, en particulier un SFB plus bas, autour les 1%. Le [SFB][1] correspond aux enchaînements de deux caractères qui utilisent le même doigt, ce qui ralentit la vitesse de frappe.

La principale différence est qu'Erglace cherche à minimiser les [redirections][2], c'est-à-dire les enchaînements de trois caractères d'une même main avec un changement de direction, mouvement considéré comme inconfortable. Pour ce faire, toutes les voyelles se retrouvent d'un côté, comme en Bépo, ce qui favorise l'alternance des mains. Le désavantage est que la disposition a moins de [roulements][3], c'est-à-dire des enchaînements de trois lettres d'une main dans une même direction, qui sont appréciables.

Autre différence, Erglace est compatible nativement avec les hummingbirds. Ces claviers ont la particularité d’avoir 3 touches par doigt, sauf pour l’auriculaire et l’extension de l’index qui n’en ont que 2, afin de limiter les déplacements peu confortables. La conséquence est que certaines lettres (`Z`, `K`, `Q` et `J`) ne sont plus accessibles directement. C’est la touche morte qui permet d’accéder à ces lettres, avec en plus la lettre `Y` pour résoudre un [ciseau][4] inconfortable (`yo` et `oy`).

En dehors de ces points, Erglace garde les principes d'Ergo-L (1DFH, touche morte...), et reprend d'ailleurs la même couche de symboles.

## Comment choisir ?

Pour la majorité de gens, Ergo-L convient mieux, mais certains profils pourraient préférer Erglace :

- Les bépoètes et utilisateurs d'Optimot, habitués à avoir les voyelles d'un côté, qui sont déroutés par l'apprentissage d'Ergo-L
- Les personnes privilégiant l’alternance des mains plutôt que les roulements et surtout les longs enchaînements d’une même main. Aujourd'hui, la communauté Ergo-L préfère les roulements à la redirection
- Les rares personnes qui trouvent qu'Ergo-L a trop de redirections ou de SFB

La disposition a quelques défauts qu'il faut garder à l'esprit :

- Erglace ne conserve pas les raccourcis usuels, ce qui ne permet pas de les faire à une main, avec l'autre main sur la souris. Une solution est d'avoir un clavier programmable avec des touches dédiées à ces actions (copier, coller...)
- Erglace n'a pas encore atteint de version stable comme Ergo-L, et pourrait potentiellement voir des changements à l'avenir


## Conception

Les explications détaillées des choix fait lors de la conception sont disponibles sur le [GitHub de la disposition][5], et sont mises à jour au fur et à mesure des changements.

[1]: /ressources/glossaire#SFB
[2]: /ressources/glossaire#redirection
[3]: /ressources/glossaire#roulement
[4]: /ressources/glossaire#ciseau
[5]: https://github.com/Lysquid/Erglace/blob/main/NOTES.md
