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

Erglace abandonne l'accès facile aux raccourcis usuels (Ctrl+C, Ctrl+V...) pour atteindre des statistiques légèrement meilleures, en particulier un SFB plus bas, autour de 0.8% en français et 1.1% en anglais. Le [SFB][1] correspond aux enchaînements de deux caractères qui utilisent le même doigt, ce qui ralentit la vitesse de frappe.

La principale différence, c’est qu’Erglace favorise les alternances, alors qu’Ergo-L favorise les [roulements][2], c'est-à-dire des enchaînements de trois lettres d'une main dans une même direction, considérés comme appréciables. Là où Ergo-L peut avoir de longs enchaînements avec une même main, Erglace va chercher à alterner des séquences de une ou deux lettres, pour équilibrer la frappe.

Une des conséquences de l’alternance, c’est qu'Erglace cherche à minimiser les [redirections][3], c'est-à-dire les enchaînements de trois caractères d'une même main avec un changement de direction, mouvement considéré comme inconfortable. Pour ce faire, toutes les voyelles se retrouvent d'un côté, comme en Bépo.

Dernière spécificité, comme toutes les dispositions, Erglace a des [ciseaux][4], donc un bigramme nécessitant un changement de rangée inconfortable. Le positionnement de `Y` d’Erglace augmente malheureusement le nombre de ciseaux, en anglais notamment. Malheureusement, il est très difficile de le mettre à une autre place sans impacter fortement les avantages de la disposition. Pour combler ce point, la lettre est présente aussi sur la touche morte, normalement dédiée aux accents. Cette astuce permet de transformer des ciseaux en enchaînements confortables.

En dehors de ces points, Erglace garde les principes d'Ergo-L (1DFH, touche morte...), et reprend d'ailleurs la même couche de symboles.

## Comment choisir ?

Ergo-L est une excellente disposition, mais certains profils pourraient préférer Erglace :

- Les personnes privilégiant l’alternance des mains plutôt que les roulements et surtout les longs enchaînements d’une même main
- Les bépoètes et utilisateurs d'Optimot, habitués à avoir les voyelles d'un côté, qui sont déroutés par l'apprentissage d'Ergo-L


La disposition a quelques défauts qu'il faut garder à l'esprit :

- Erglace ne conserve pas les raccourcis usuels, ce qui ne permet pas de les faire à une main, avec l'autre main sur la souris. Une solution est d'avoir un clavier programmable avec des touches dédiées à ces actions (copier, coller...)
- Erglace n'a pas encore atteint de version stable comme Ergo-L, et pourrait potentiellement voir des changements à l'avenir


## Conception

Les explications détaillées des choix faits lors de la conception sont disponibles sur le [GitHub de la disposition][5], et sont mises à jour au fur et à mesure des changements.


[1]: /ressources/glossaire#SFB
[2]: /ressources/glossaire#roulement
[3]: /ressources/glossaire#redirection
[4]: /ressources/glossaire#ciseau
[5]: https://github.com/cmoinard/Erglace
