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

Erglace abandonne l'accès facile aux raccourcis usuels ([Ctrl]{.kbd}‑[C], [Ctrl]{.kbd}‑[V]…) pour atteindre des statistiques légèrement meilleures, en particulier un SFB plus bas, autour les 1 %. Le [SFB][1] correspond aux enchaînements de deux caractères qui utilisent le même doigt, ce qui ralentit la vitesse de frappe.

L'autre différence est qu'Erglace cherche à minimiser les [redirections][2], c'est-à-dire les enchaînements de trois caractères d'une même main avec un changement de direction, mouvement considéré comme inconfortable. Pour ce faire, toutes les voyelles se retrouvent d'un côté, comme en Bépo, ce qui favorise l'alternance des mains. Le désavantage est que la disposition a moins de [roulements][3], c'est-à-dire des enchaînements de trois lettres d'une main dans une même direction, qui sont appréciables.

En dehors de ces points, Erglace garde les principes d'Ergo-L (1DFH, touche morte…), et reprend d'ailleurs la même couche de symboles.

## Comment choisir ?

Pour la majorité de gens, Ergo-L convient mieux, mais certains profils pourraient préférer Erglace :

- Les bépoètes et personnes utilisatrices d'Optimot, habituées à avoir les voyelles d'un côté ou qui sont déroutées par l'apprentissage d'Ergo-L.
- Les personnes qui pensent que l’alternance des mains est plus désirable que les roulements (aujourd'hui, l'avis inverse est largement partagé au sein de la communauté).
- Les rares personnes qui trouvent qu'Ergo-L a trop de redirections ou de SFB.

La disposition a quelques défauts qu'il faut garder à l'esprit :

- Erglace ne conserve pas les raccourcis usuels, ce qui ne permet pas de les faire à une main avec l'autre main sur la souris. Une solution est d'avoir un clavier programmable avec des touches dédiées à ces actions (copier, coller…).
- Erglace n'a pas encore atteint de version stable comme Ergo-L, et pourrait potentiellement voir des changements à l'avenir.
- Malgré de bonnes statistiques générales, certains enchaînements précis sont actuellement inconfortables en Erglace, là où Ergo-L a moins d'aspérités.

## Conception

Les explications détaillées des choix fait lors de la conception sont disponibles sur le [GitHub de la disposition][4], et sont mises à jour au fur et à mesure des changements.

[1]: /ressources/glossaire#SFB
[2]: /ressources/glossaire#redirection
[3]: /ressources/glossaire#roulement
[4]: https://github.com/Lysquid/Erglace/blob/main/NOTES.md
