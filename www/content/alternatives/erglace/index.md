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
              href="https://github.com/cmoinard/Erglace">}}

## Comparaison à Ergo-L

Erglace abandonne l'accès facile aux raccourcis usuels (Ctrl+C, Ctrl+V...) pour atteindre des statistiques légèrement meilleures, en particulier un SFB plus bas, autour de 0.8% en français et 1.1% en anglais. Le [SFB][1] correspond aux enchaînements de deux caractères qui utilisent le même doigt, ce qui ralentit la vitesse de frappe.

La principale différence, c’est qu’Erglace favorise les alternances, alors qu’Ergo-L favorise les [roulements][2], c'est-à-dire des enchaînements de trois lettres d'une main dans une même direction, considérés comme appréciables. Là où Ergo-L peut avoir de longs enchaînements avec une même main, Erglace va chercher à alterner des séquences d’une ou deux lettres, pour équilibrer la frappe.

Une des conséquences de l’alternance, c’est qu'Erglace cherche à minimiser les [redirections][3], c'est-à-dire les enchaînements de trois caractères d'une même main avec un changement de direction, mouvement considéré comme inconfortable. Pour ce faire, toutes les voyelles se retrouvent d'un côté, comme en Bépo ou Dvorak.

Dernière spécificité, comme toutes les dispositions, Erglace a des [ciseaux][4], donc un bigramme nécessitant un changement de rangée inconfortable. Le positionnement de `Y` d’Erglace augmente malheureusement le nombre de ciseaux, en anglais notamment. Malheureusement, il est très difficile de le mettre à une autre place sans impacter fortement les avantages de la disposition. Pour combler ce point, la lettre est présente aussi sur la touche morte, normalement dédiée aux accents. Cette astuce permet de transformer des ciseaux en enchaînements confortables.

En dehors de ces points, Erglace garde les principes d'Ergo-L (1DFH, touche morte...), et reprend d'ailleurs la même couche de symboles.

## Comment choisir ?

Ergo-L est une excellente disposition, mais certains profils pourraient préférer Erglace :

- Les personnes privilégiant l’alternance des mains plutôt que les roulements et surtout les longs enchaînements d’une même main
- Les bépoètes et utilisateurs d'Optimot, habitués à avoir les voyelles d'un côté, qui sont déroutés par l'apprentissage d'Ergo-L


La disposition a quelques défauts qu'il faut garder à l'esprit :
- Erglace ne conserve pas les raccourcis usuels, ce qui ne permet pas de les faire à une main, avec l'autre main sur la souris. Une solution est d'avoir un clavier programmable avec des touches dédiées à ces actions (copier, coller...)
- Conséquence de favoriser l’alternance, certains mots alternent une lettre par main, ce qui nécessite un timing précis


## Conception

Point important avant de se lancer sur Erglace, la disposition n'a pas encore atteint de version stable comme Ergo-L, et pourrait potentiellement donc voir des changements à l'avenir. Une des conséquences est qu’actuellement plusieurs variantes existent pour essayer d’optimiser.

À l’origine du projet, on trouvera la version de son auteur [Lysquid][5] ([analyseur][6]), dont on peut consulter l’historique des choix de conception [ici][7].

S’en est suivi une variante de [Nuclear_Squid][8] qui apporte quelques modifications, dont un changement d’ordre sur les voyelles ([analyseur][9]).

Ergaie est une variante proposée par [MacDamien][10], qui apporte plusieurs modifications, dont l’une des plus notable est que toute la disposition est en miroir de la version d’origine. Les voyelles passent à droite, afin de pouvoir garder les raccourcis usuels à gauche ([analyseur][11]).

Des versions continuent de voir le jour pour essayer de corriger les derniers problèmes et pouvoir aboutir à un consensus pour une version finale. La version la plus à jour est proposée par [cmoinard][12] ([analyseur][13]).

Pour aider à contribuer à Erglace, vous pouvez rejoindre le channel `#erglace` du [Discord].



[1]: /ressources/glossaire#SFB
[2]: /ressources/glossaire#roulement
[3]: /ressources/glossaire#redirection
[4]: /ressources/glossaire#ciseau

[5]: https://github.com/Lysquid/Erglace
[6]: https://ergol.org/stats/#/erglace_lysquid//en+fr
[7]: https://github.com/Lysquid/Erglace/blob/main/NOTES.md

[8]: https://github.com/Nuclear_Squid
[9]: https://ergol.org/stats/#/erglace_nuke//en+fr

[10]: https://github.com/MacDamien/Ergaie
[11]: https://ergol.org/stats/#/ergaie//en+fr

[12]: https://github.com/cmoinard/Erglace
[13]: https://ergol.org/stats/#/erglace//en+fr
 
[Discord]:    https://discord.gg/5xR5K3nAFX 