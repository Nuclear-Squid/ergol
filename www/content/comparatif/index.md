+++
title = "Comparatif (WiP)"
+++

Ergo‑L est conçu pour n’avoir que des avantages sur Azerty, Qwerty, Dvorak et
Bépo ; mais il ne prétend pas être le plus optimisé partout. Nous pensons qu’il
conviendra au plus grand nombre mais il y a des alternatives intéressantes !

**Il n’y a pas de mauvaise disposition, seulement des mauvais choix.**


Tableau comparatif
--------------------------------------------------------------------------------

Changer de disposiiton de clavier est coûteux en temps, voire coûteux tout court
quand cela requiert un clavier particulier. Chaque disposition étant
généralement très prolixe quant à ses qualités, nous faisons le choix d’en
montrer les principaux défauts, qui, avec le temps, peuvent soit s’estomper,
soit devenir insupportables.

<style>
.cmp table,
.cmp td { border: 1px solid var(--fg-banner-border); padding:  0  0.5em; }
.cmp th { border: 1px solid var(--fg-banner-border); padding: 1em 0.5em; }
.cmp th { background-color: var(--bg-banner); font-weight: normal; }
.cmp tr:nth-child(3),
.cmp tr:nth-child(4) { background-color: var(--bg-accent); }
.cmp table { margin: 0 auto; border-collapse: collapse; }
.cmp ul { margin: 0.6em 0; }
</style>
:::{.cmp style="overflow: scroll;" }
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
|  disposition  | 1DFH  | ZXCV  |  fr   |  en   | code  |           principaux défauts                |
+===============+:=====:+:=====:+:=====:+:=====:+:=====:+=============================================+
| [Azerty][]    |   ·   |  oui  |   ·   |   ·   |   ·   | - (fr) mauvais support typographique        |
|               |       |       |       |       |       | - charge de l’auriculaire gauche > 10 %     |
|               |       |       |       |       |       | - digrammes de même doigt > 6%              |
|               |       |       |       |       |       | - chiffres en Shift                         |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Lafayette][] |  oui  |  oui  |   ·   |   ·   |  oui  | - charge déséquilibrée                      |
|               |       |       |       |       |       | - digrammes de même doigt > 6 %             |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Ergo‑L][]    |  oui  |  oui  |  oui  |  oui  |  oui  | - (fr) `tui`, `bo`                          |
|               |       |       |       |       |       | - (en) `eas`, `we`                          |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Erglace][]   |  oui  |   ·   |  oui  |  oui  |  oui  | - (fr) `aie`, `j’`                          |
|               |       |       |       |       |       | - (en) `ng`                                 |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Colemak FT][]|  oui  |  oui  |  oui  |  oui  |  oui  | - charge déséquilibrée                      |
|               |       |       |       |       |       | - (fr) `oui`/`uoi`                          |
|               |       |       |       |       |       | - (en) `you`, `was`, `ho`                   |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Bépolar][]   |  oui  |   ·   |  oui  |   ·   |  oui  | - charge de l’index gauche                  |
|               |       |       |       |       |       | - (fr) digrammes de même doigt > 2 %        |
|               |       |       |       |       |       | - (en) digrammes de même doigt > 4 %        |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Bépo][]      |   ·   |   ·   |  oui  |   ·   |   ·   | - déviations ulnaires                       |
|               |       |       |       |       |       | - charge de l’auriculaire droit > 10 %      |
|               |       |       |       |       |       | - charge de l’index gauche > 20 %           |
|               |       |       |       |       |       | - digrammes de même doigt > 2 %             |
|               |       |       |       |       |       | - (en) rédhibitoire (e.g. `wh`)             |
|               |       |       |       |       |       | - chiffres en Shift                         |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+
| [Optimot][]   |   ·   |   ·   |  oui  |[(?)][]|   ·   | - déviations ulnaires                       |
|               |       |       |       |       |       | - (fr) charge de l’auriculaire droit > 10 % |
|               |       |       |       |       |       | - (en) charge déséquilibrée                 |
|               |       |       |       |       |       | - chiffres en Shift                         |
|               |       |       |       |       |       | - licence non-libre                         |
+---------------+-------+-------+-------+-------+-------+---------------------------------------------+

<!-- do not remove the empty line above -->
:::

Nous considérons qu’**une disposition de clavier se mesure mieux à ses défauts
qu’à ses qualités**, et nous avons développé Ergo‑L en ce sens : non en visant
la meilleure moyenne sur tel ou tel analyseur, mais en cherchant à éliminer
chaque défaut.


[azerty]:     /stats/#/azerty//en+fr
[lafayette]:  /stats/#/lafayette//en+fr
[ergo‑l]:     /stats/#/ergol//en+fr
[erglace]:    /stats/#/erglace//en+fr
[colemak ft]: /stats/#/colemak-french-touch//en+fr
[bépolar]:    /stats/#/bepolar//en+fr
[bépo]:       /stats/#/bepo//en+fr


Comparaison par groupes
-------------------------------------------------------------------------------

### AZERTY / QWERTY / QWERTZ

Ces dispositions sont très proches, au moins pour le placement des lettres… qui
n’est absolument pas optimisé, ni même équilibré en charge. AZERTY, notamment, a
plus de 10 % de charge sur l’auriculaire gauche, et le placement du [A]{.kbd}
est particulièrement inconfortable — incompréhensible pour une lettre aussi
fréquente en français.

Nota : si, contrairement à ce qui est habituellement recommandé sur les claviers
ISO, on tape la touche [2]{.kbd} où se trouve le `é` avec l’annulaire et non
l’auriculaire, la charge totale de l’auriculaire devient plus supportable. Un
clavier ortholinéaire apportera donc au moins ce confort-là en AZERTY.

Des alternatives telles que le QWERTY québécois ou le QWERTZ suisse peuvent être
intéressantes, tant pour profiter d’un meilleur placement du [A]{.kbd} que pour
avoir les chiffres en direct. Néanmoins, il restera le problème des touches
excentrées sous l’auriculaire droit, qui causent des déviations ulnaires.

**De notre point de vue,** [Lafayette][] peut apporter une solution ergonomique
intéressante ([1DFH][], [couche AltGr optimisée][]) moyennant un temps
d’apprentissage minime.


### Les « Ergonautes »

[Ergo‑L][], [Erglace][], [Colemak FT][], [Bépolar][], [Lafayette][], toutes ces
dispositions partagent une même approche ergonomique : [1DFH][] et [couche AltGr
optimisée][], garantissant ainsi l’absence d’extensions de doigts (donc de
déviations ulnaires) et une compatibilité exemplaire avec tous les claviers,
ergonomiques ou non, de 33 à 105 touches.

- Ergo‑L est le projet le plus abouti, destiné au plus grand nombre, bien plus
  optimisé que Bépo en français et que Dvorak en anglais, tout en gardant un
  confort impeccable quel que soit l’usage ;
- Erglace est un projet encore jeune mais qui pousse l’optimisation plus loin
  qu’Ergo‑L, notamment en français, mais abandonne les raccourcis clavier
  [Ctrl]{.kbd}‑[Q]{.kbd}[A]{.kbd}[S]{.kbd}[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd}.

Colemak FT, Bépolar et Lafayette se destinent à des utilisateurs de Colemak,
Bépo et Qwerty respectivement, qui souhaitent profiter de l’approche 1DFH avec
le minimum d’effort. Leur ergonomie est très satisfaisante mais leur confort
n’est pas au niveau d’Ergo‑L, ces dispositions ayant cherché à rester aussi
proches que possibles de leurs ainées.

La contrepartie c’est la [touche morte][] qu’il faut apprendre, et qui ajoute
entre 2.5 et 4.0 % de frappes supplémentaires en français — soit une perte de 2
mots/minute pour une personne tapant à 60 mpm.

**De notre point de vue,** [Ergo‑L][] et [Erglace][] sont les seules
dispositions à la fois ergonomiques **et** optimisées pour le français. Elles
sont aussi les seules dispositions francophones réellement optimisées pour
l’anglais. Ergo‑L a la palme du confort.


### Bépo & variantes

Bépo et ses variantes présentent toutes les mêmes [défauts d’ergonomie][] :

- placement de lettres excentrées sur les 6e et 7e colonnes :
  - compatibilité délicate avec la plupart des claviers ergonomiques
  - déviations ulnaires pouvant devenir doulereuses
- charge importante de l’auriculaire droit (> 11 % en français)

Néanmoins, pour qui n’est pas sensible à ces points-là, ces dispositions sont
efficaces et très intuitives en français littéraire.

Bépo est inadapté pour l’anglais, notamment à cause du placement de [W]{.kbd},
et l’assume très bien ! Certaines variantes ont cherché à réduire le problème du
[W]{.kbd}, d’autres à pousser l’optimisation pour le français, mais toutes
restent centrées sur une utilisation francophone.

<!--
Une solution possible pour Optimot (et proposée par @NuclearSquid à Pyjam)
serait une permutation `h,’`, pour faire passer le `h` de [>] à [O].
- 2024-02-03
  https://discord.com/channels/794732334879473684/1202877504822579240/1203391939009847357
  On s’en branle du H.
- 2024-01-27
  https://discord.com/channels/794732334879473684/794734985122152478/1200680341363494972
  Moi aussi, je peux modifier légèrement Optimot pour optimiser un peu plus pour
  l’anglais (mais au détriment du français). Mais ce n’est pas mon choix parce
  que nous sommes en France et que je m’adresse à des personnes qui écrivent
  d’abord en français
-->

[Nota]{id="optimot_en"} : l’auteur d’Optimot considère que sa disposition est
optimisée pour l’anglais au motif qu’elle obtiendrait une bonne note globale sur
KLAnext ; mais pour nous, [la heatmap est inadaptée][1] (lettres fréquentes sur
la rangée inférieure) et trop de digrammes courants sont inconfortables pour
parler d’optimisation (`th`, `yo`, `ay`, `by`, `ok`, `ak`, `ki`/`ik`/`ike`) :
elle est *utilisable*, mais pas *optimisée* pour ça.

[(?)]:     #optimot_en
[optimot]: ./optimot_fr.png
[1]:       ./optimot_en.png

**De notre point de vue :**

- Bépo est intéressant pour du français littéraire sur un clavier full-size,
  mais attention aux douleurs (auriculaire notamment) ;
- pour les Bépoètes qui n’ont pas de douleurs, Optimot apporte une optimisation
  *très* supérieure en français et est bien plus utilisable en anglais ;
- pour les Bépoètes qui ont des douleurs ou qui souhaitent tenter l’expérience
  [1DFH][], [Bépolar][] sera une alternative intéressante et très vite apprise.


[1DFH]:                   /#dfh-1u-distance-from-home
[touche morte]:           /#caractères-accentués
[couche altgr optimisée]: /#couche-symboles
[défauts d’ergonomie]:    /bepo/#ergonomie
