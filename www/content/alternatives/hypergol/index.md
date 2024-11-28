+++
title = "Hypergol"
url = "/hypergol"

[params]
footer = "outillé par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++

Une disposition et configuration de clavier aussi efficace qu’expérimentale !

![](hypergol.svg)

:::{.highlight style="max-width: 32em;"}
- [Principe de la disposition]
- [La géométrie « Hummingbird »]
- [Le [E]{.kbd} et « touche magique » sous un pouce]
- [Les auto-fills]
- [Les combos étendus]
- [« C’est où qu’on signe ? »]
:::

Principe de la disposition
--------------------------------------------------------------------------------

Hypergol est un projet de disposition de clavier qui cherche à incorporer les
fonctionalités des claviers mécaniques programmables au sein de la disposition.
À l’heure actuelle, aucune de ses fonctionnalités n’est inderdite : si c’est
*techniquement faisable* et que ça fait progresser l’ergonomie ou
l’optimisation de la disposition, alors on y a droit.

La disposition est implémentée gràce a un pilote Kanata / QMK prévu pour être
utilisé sur un ordinateur en Ergo‑L.

Pour accélérer le développement de la dispo, nous utilisons un [brute-forceur]
maison, qui ne cherche pas à concevoir la meilleur disposition possible sur la
base d’une note globale hasardeuse, mais liste toutes les dispositions
possibles qui addhèrent a des critères simples (pas moins de 12% de charge sur
un anulaire, pas plus de 0.2% de SFU sur un auriculaire…). On reste sur la
méthode d’optimisation classique des ergonautes, mais ça accélère le travail de
recherche (surtout avec les features d’hypergol qui rendent la concetion encore
plus compliqué)

Attention : ce brute-forceur est un projet personnel inachevé du concepteur
d’Hypergol (Nuclear-Squid). La qualité du code est affreuse, et nous sommes en
train de le réécrire pour pouvoir implémenter de nouvelles features.


La géométrie "Hummingbird"
--------------------------------------------------------------------------------

Chez les "ergonautes", nous sommes convaincu des apports de la philosophie 1DFH
en terme de confort et d’ergonomie. Cependant, il reste des touches assez
inconfortables dans le pavé de 3x10 central, comme les touches [Z]{.kbd},
[B]{.kbd}, [N]{.kbd} et [/]{.kbd} (sur un clavier ergonomique avec un gros
stagger, comme le Ferris).

:::{style="display: flex; justify-content: center"}
![Un exemple de clavier « hummingbird »](hummingbird.jpg){width="25em"}
:::

<!-- Bien que le clavier présenté utilise 4 touches de pouces, on cherche aussi a -->
<!-- prévoir une disposition utilisable sur un clavier avec seulement 3 touches de -->
<!-- pouces (comme avec Arsenik). -->

Retirer 4 touches sur le clavier nous force donc à trouver des nouvelles places
pour les 4 lettres les moins fréquentes en français et anglais (`z`, `x`, `k`
et `j`), et pour ça, nous avons décidé de les placer sur la touche typo. On
considère que l’effort nécessaire pour taper ces lettres en deux touches est
négligeable par rapport à l’emplacement où ces lettres peuvent être placés, et
les cisaux qui peuvent exister.

Il reste encore à savoir comment gérer proprement les touches manquantent en
[AltGr]{.kbd}, on travaille sur la question.


Le [E]{.kbd} et « touche magique » sous un pouce
--------------------------------------------------------------------------------

Puisque nous avons prévu la disposition pour des claviers programables, alors
on peut se permettre de mettre des lettres sous les pouces. Le `e` étant la
lettre la plus fréquente en français et anglais, c’est donc celle-ci que nous
avons choisi . Nous avons cependant remarqué que d’avoir le `e` sous le pouce
transforme beaucoup de roulements en alternances (avec un pouce), ce qui baisse
drastiquement le taux de roulements de la disposition. On compte faire des
recherches pour trouver la lettre optimale a cette position.

Passer une lettre sous un pouce permet donc de réqupérer une place dans le pavé
de 3x10 pour le `é`, et puisuqe nous avons plus besoin mettre le tiret sous le
`e` (comme en Ergo‑L), on l’a donc échangé avec l’apostrophe typographique sur
la touche typo, ce qui permet de drastiquement réduire l’usage de cette touche
typo (~4% -> ~1%).

La « touche magique » (inspiré de [magic sturdy]) est une touche dont le
comportement dépend de la touche précédente (un peu comme l’inverse d’une
touche morte). Elle se comporte comme une touche « [alt repeat] » de QMK : elle
répette les symbols fréquemment doublés et fait un autre symbole sur le même
doigt pour les autres. L’objectif de cette touche est de totalement (ou
presque) éliminer les SKB et SFB.

Par exemple, `ui` est un SFB qui a 0.7% de fréquence en français, donc après un
`u`, la touche magique insère un `i`. De nombreux SFB sont *intentionnellement*
inséré dans la disposition pour qu’ils soient corrigés par cette touche
magique. Cela permet d’avoir à la fois un score de SFU très bas (estimé à 0.3%
en fraçais et 0.4% en anglais) tout en se laissant assez de marge de manœuvre
pour limiter les ciseaux, LSB et mauvaises redirections.

La touche magique agit comme une touche repeat par défaut, sauf pour ces
lettres suivantes :

|       |     |     |     |               |     |     |     |      |     |     |     |     |     |               |
| ----- | --- | --- | --- | ---           | --- | --- | --- | ---  | --- | --- | --- | --- | --- | ---           |
| Prev  | `A` | `C` | `D` | `E`           | `G` | `H` | `I` | `Q`  | `U` | `V` | `É` | `’` | `Y` | `E`           |
| Magic | `O` | `★` | `Y` | [Space]{.kbd} | `T` | `.` | `,` | `U’` | `I` | `R` | `A` | `T` | `D` | [Space]{.kbd} |


### Les configurations de pouces recommandés

Bien que la dispo soit avec une configuration de pouces précises, vous êtes
libre d’adapter cette configuration comme bon vous semble, cependant, il reste
quelques pièges dans lesquels il ne faut pas tomber :

Nous recommandont d’utiliser la configuration d’[Arsenik] ou [Selenium]
(suivant le nombre de touches de pouce) pour les actions en hold. En tap, nous
recommandont de placer la touche magique sur le pouce opposé du `e` (car il est
fréquemment doublé en anglais) et sur le même pouce que l’espace (pour éviter
les SFB `e` -> `espace`). Idéalement, l’espace devrait être accessible par les
deux pouces pour pouvoir faire un enchaînement `magic` -> `espace` sans avoir
un SFB ou SKB.

Si vous avez 4 touches sous les pouces, une bonne option sur la nouvelle touche
est de rajouter un « one-time-shift » (l’équivalent touche morte d’un shift),
afin de ne plus avoir d’erreurs de timing avec les lettres en majuscules.

Malheureusement, avoir une lettre fréquemment doublée sous un pouce peut rendre
la configuration des pouces compliqué : Devoir mettre la touche magique sous le
même pouce que l’espace nous force à avoir des configurations complexes et peu
fiable pour totalement éliminer les SKB et SFK de pouce (qu’on a remarqué être
particulièrement inconfortables) et profiter pleinement des touches de pouces
disponibles (par exemple, temporairement transformer le one-time-shift en
espace après une pression de la touche magique).

Avoir espace et one-time-shift d’un côté et une lettre (non doublée) et magic
de l’autre permetterai d’éliminer ces soucis de configuration. Nous travaillons
sur cette question, mais la solution peut prendre encore du temps.


Les auto-fills
--------------------------------------------------------------------------------

Les auto-fills sont une feature exclusive à Hypergol, leur objectif est
d’éliminer les mauvaises redirections et économiser quelques touches.


### Un exemple concret

Une façon de comprendre le concept de cette feature est de regardé le
fonctionnement de la touche `Qu` :

En français comme en anglais, le `Q` n’est pratiquement *que* suivi par un `u`,
donc une façon d’économiser les touches est d’utiliser une touche qui écrit
directement `qu`. Cependant, cela peut causer des problèmes, si on veut écrire
`Qatar`, `cinq` ou commencer une phrase par un `q` (puisque shift + `qu` donne
`QU` au lieu de `Qu`). Les auto-fills sont une façon beaucoup plus fiable
d’implémenter une touche `Qu` :

Une pression sur la touche `q` va immédiatement écrire un `q` et va surveiller
la touche suivante. Si la touche suivante est fait partie de `aeio’é`, alors on
rajoute un `u` juste avant d’écrire la lettre voulue (et si la touche ne fait
pas partie de la liste, alors on sontinue comme si de rien était). On peut donc
facilement écrire `Que` ou `cinq` sans problèmes. Ça reste plus compliqué
d’écrire `Qatar` mais pour l’instant, on considère que faire typo -> `q` insère
un `q` sans l’auto-fill.


### Une définition plus formelle

Si un roulement sur les lettres quelconques `a` et `c` a une fréquence
d’apparition négligeable, alors on peut s’en servir pour taper un auto-fill
`abc`. Cela permet à la fois d’économiser une touche mais aussi de limiter les
mauvaises redirecitons.

Par exemple, dans la version actuelle d’Hypergol, on a une mauvaise redirection
sur `you` (en anglais). Cependant, le bigramme `yu` n’existe pratiquement pas,
donc on peut utiliser un auto-fill pour écrire `you` en tapant `yu`, ce qui
transforme une mauvaise redirection en un roulement intérieur.

Les auto-fills sont nés en cherchant une meilleur implémentation de la touche
`qu`, et ce n’est que plus tard que nous avons trouvé cet usage, donc Hypergol
ne profite pas encore pleinement des posibilités que cela ouvre.


Les « combos étendus »
--------------------------------------------------------------------------------

Les « combos étendus » sont une autre feature qui est exclusive a Hypergol, et
est probablement la partie la plus complexe de la disposition. Cette feature
permet de transformer la dispo en un hybride entre un clavier standard et un
clavier de sténotypie.

L’idée est qu’on peut taper un combo (appuyer sur deux touches spécifiques en
même temps) pour écrire un mot (ou morceau de mot). Comme pour les auto-fills,
la touche suivante va être surveillé, or cette fois au lieu de rajouter une
seule lettre : on rentre dans une machine a états, qui va écrire le reste du
mot et potentiellement continuer la séquence.

Par exemple, appuyer sur [S]{.kbd} et [F]{.kbd} (de Qwerty) en même temps, va
écrire `the`, et donne accès a ces extensions suivantes :

|         |        |         |         |           |           |        |
|   ---   | ---    | ---     | ---     | ---       | ---       | ---    |
| lettre  | `F`    | `N`     | `S`     | `R`       | `L`       | `M`    |
| mot     | `they` | `there` | `their` | `they’re` | `they’ll` | `them` |

(Comme pour les auto-fills, écrire n’importe quelle autre lettre va sortir de
la machine a états et écrire la touche comme si de rien n’était)

À l’heure actuelle, c’est le seul combo étendu de la dispo, il sert surtout de
« proof of concept » et bien que l’expérience soit satisfaisante, nous en avons
pas encore rajouté d’autres : il reste des parties plus critiques à régler
avant ça.


« C’est où qu’on signe ? »
--------------------------------------------------------------------------------

Certains d’entre vous doivent probablement beaucoup aimer le concept, et
voudront utiliser la disposition le plus tôt possible. Cependant, comme cela a
été mentionné quelques fois déjà, c’est encore un travail en cours : Il y a des
bugs dans les pilotes, notre analyseur ne sait pas gérer ce type de
dispositions, il manque des features dans beaucoup d’applis / frameworks pour
claviers programmables qu’on doit implémenter nous mêmes, il faut travailler
sur le [brute-forceur custom] pour qu’il puisse repérer les mauvaises
redirections (et proposer des auto-fills), la disposition peut encore
radicalement bouger et nous ne sommes pas a l’abris de découvrir une nouvelle
feature, ou remettre en cause une feature existante.

Pour le dire autrement, nous ne vous recommandont ***PAS*** Hypergol pour
l’instant, car :

- La disposition n’est pas stable ;
- La disposition est très compliqué à apprendre ;
- Les pilotes ne fonctionnent pas ;
- Les pilotes sont compliqué à installer ;
- La keymap QMK ne passe pas sur un clavier avec un micro-controlleur AVR (la
  keymap est *trop lourde* pour ce type de claviers…)
- On a pas de keymaps ZMK, Kmonad, Keyd, Keyberon…

En revanche, si aucun des points précédemment cités ne vous font peur et que
vous voulez faire partie des alpha-testers, hésitez pas à venir sur le [serveur
Discord d’Ergo‑L], où on développe la disposition. On serait ravi d’avoir des
nouvelles idées de choses à rajouter à la disposition ou de l’aide avec les
parties techniques !


[Arsenik]:                 https://github.com/OneDeadKey/arsenik
[Selenium]:
[serveur Discord d’Ergo‑L]: https://discord.gg/5xR5K3nAFX
[brute-forceur]:            https://github.com/nuclear-Squid/klayopt
[magic sturdy]:             https://github.com/Ikcelaks/keyboard_layouts/blob/main/magic_sturdy/magic_sturdy.md
[alt repeat]:               https://docs.qmk.fm/features/repeat_key#alternate-repeating
