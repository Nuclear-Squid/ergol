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

Erglace abandonne l'accès facile aux raccourcis usuels ([Ctrl]{.kbd}‑[C], [Ctrl]{.kbd}‑[V]…) pour atteindre des statistiques légèrement meilleures, en particulier un SFB plus bas, autour de 1 %. Le [SFB][1] correspond aux enchaînements de deux caractères qui utilisent le même doigt, ce qui ralentit la vitesse de frappe.

L'autre différence est qu'Erglace cherche à minimiser les [redirections][2], c'est-à-dire les enchaînements de trois caractères d'une même main avec un changement de direction, mouvement considéré comme inconfortable. Pour ce faire, toutes les voyelles se retrouvent d'un côté, comme en Bépo, ce qui favorise l'alternance des mains. Le désavantage est que la disposition a moins de [roulements][3], c'est-à-dire des enchaînements de trois lettres d'une main dans une même direction, qui sont appréciables.

En dehors de ces points, Erglace garde les principes d'Ergo-L (1DFH, touche morte…), et reprend d'ailleurs la même couche de symboles.

## Comment choisir ?

Pour la majorité de gens, Ergo-L convient mieux, mais certains profils pourraient préférer Erglace :

- Les Bépoètes et personnes utilisatrices d'Optimot, habituées à avoir les voyelles d'un côté ou qui sont déroutées par l'apprentissage d'Ergo-L.
- Les personnes qui pensent que l’alternance des mains est plus désirable que les roulements (aujourd'hui, l'avis inverse est largement partagé au sein de la communauté).
- Les rares personnes qui trouvent qu'Ergo-L a trop de redirections ou de SFB.

La disposition a quelques défauts qu'il faut garder à l'esprit :

- Erglace ne conserve pas les raccourcis usuels, ce qui ne permet pas de les faire à une main avec l'autre main sur la souris. Une solution est d'avoir un clavier programmable avec des touches dédiées à ces actions (copier, coller…).
- Erglace n'a pas encore atteint de version stable comme Ergo-L, et pourrait voir des changements à l'avenir.
- Malgré de bonnes statistiques générales, certains enchaînements précis sont actuellement inconfortables en Erglace, notamment le trigramme `AIE`, là où Ergo-L a moins d'aspérités.

## Conception et évolution

Erglace est essentiellement le travail de [Lysquid], qui a détaillé ses choix de conception sur le [GitHub de la disposition][4]. Il considère son travail achevé, et la disposition a déjà ses adeptes.

Quelques Ergonautes ont cherché à résoudre le principal défaut de cette disposition, qui est la redirection `AIE` (annulaire, auriculaire, majeur).

- [Nuclear-Squid] a développé une [variante <kbd>A</kbd><kbd>I</kbd><kbd>E</kbd>][erglace_nuke]. La redirection est résolue, mais fait apparaître un ciseau sur le digramme `YO`, qui est rédhibitoire en anglais (Optimot souffre du même problème). Pour contourner le problème, il a expérimenté un `Y` en touche morte comme sur ses projets Hummingbird, tout en reconnaissant que ça n’était pas une solution. Un autre souci concerne le digramme `WR`, fréquent en anglais et en programmation, qui devient un SFB d’auriculaire.

- [MacDamien] a poursuivi avec [Ergaie]. Il n’a pas cherché à corriger le ciseau `YO`, considérant que l’anglais n’était pas un objectif central de son travail. Il a aussi fait un miroir de la disposition : les voyelles sont toutes à droite, ce qui permet d’avoir les raccourcis <kbd>Ctrl</kbd>-<kbd>X</kbd><kbd>C</kbd><kbd>V</kbd> en main gauche. Le digramme `WR` devient plus confortable.

- [JF] a continué avec sa [variante][erglace_jf] aussi. Il n’a pas cherché à corriger le digramme `YO` non plus, considérant que le `Y` en touche morte de Nuclear-Squid était une solution acceptable. Le digramme `WR` reste un SFB d’auriculaire, mais d’autres améliorations mineures ont été apportées à la disposition. C’est la variante la plus activement développée aujourd’hui, bien que la version de Lysquid reste la plus utilisée.

D’autres utilisateurs ont adopté des solutions plus radicales, comme [Wismill] qui a déplacé la touche morte sous un pouce. Ce n’est donc pas utilisable sur tous les OS, mais il y a des solutions pour l’implémenter, soit avec un clavier programmable, soit avec des fonctionnalités xkb récentes.

**Erglace est une alternative prometteuse**, qui mérite qu’on travaille à résoudre les quelques petits problèmes restants. Il est déjà bien meilleur que Bépo ou Optimot en l’état, et peut donc convenir à beaucoup d’utilisateurs et utilisatrices.

[1]: /ressources/glossaire#SFB
[2]: /ressources/glossaire#redirection
[3]: /ressources/glossaire#roulement
[4]: https://github.com/Lysquid/Erglace/blob/main/NOTES.md

[Lysquid]:       https://github.com/Lysquid
[Nuclear-Squid]: https://github.com/Nuclear-Squid
[MacDamien]:     https://github.com/MacDamien
[JF]:            https://github.com/cmoinard
[Wismill]:       https://github.com/wismill

[erglace_nuke]:  /stats/#/erglace_nuke//en+fr
[erglace_jf]:    /stats/#/erglace_jf//en+fr
[ergaie]:        /stats/#/ergaie//en+fr
