+++
[params]
cssSheets = ["/css/keyboard.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/demo.js", "/js/svg.js"]
+++

{{< x-keyboard
    name="Ergo‑L"
    download="/lts"
    src="/layouts/ergol.json"
    image="/img/ergol.svg" >}}

<!-- ## Objectifs -->

- [Ergonomique avant tout !]
- [Plus optimisée que Bépo et Dvorak]
- [Impeccable en français]
- [Efficace en anglais]
- [Sans égal pour le code]


Ergonomique avant tout !
--------------------------------------------------------------------------------

<!-- ### Les raccourcis claviers (+ vim) -->

On peut distinguer les dispositions *opitmisées* (= la dispo a le meilleur score
global possible) aux dispositions *ergonomiques* (= on limite le plus possible
les cas problématiques). Ergo‑L cherche à être *ergonomique*, car on peut taper
vite sur n’importe quel clavier.

En français comme en anglais, Ergo‑L limite la charge des auriculaires —
notamment l’auriculaire droit, qui est responsable de [Entrée]{.kbd} et
[Backspace]{.kbd}) sur la plupart des claviers.

élimine les extensions de doigts et réduit grandement le
taux de <abbr title="La proportion totale d’enchaînements effectués avec le même
doigt, un type d’enchaînement très inconfortable"> SFU (same finger usage)
</abbr>

Avec la généralisation de la bureautique, les raccourcis claviers usuels
([Ctrl]{.kbd}‑[Q]{.kbd}[A]{.kbd}[S]{.kbd}[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd})
sont devenus indispensables, et beaucoup de projets récents de disposition de
clavier ont cherché à les préserver. Ergo‑L conserve la plupart de ces
raccourcis usuels, à l’exception de [Ctrl]{.kbd}-[C]{.kbd}, qui est déplacé mais
reste accessible d’une main. Nous pensons que le gain en ergonomie justifie ce
décalage.

Nous considérons que les symboles [+-]{.kbd} sont importants quand on utilise
une application TUI, car ils sont utilisés pour monter / déscendre d’une ligne
dans de nombreuses applications POSIX (y compris `vim`). Nous les avons donc
placés en [AltGr]{.kbd} + (les positions en Qwerty de) [JK]{.kbd}.

<!-- ### Les stats les plus importantes -->

<!-- ### Les claviers compacts -->

Les claviers ergonomiques modernes cherchent à limiter le nombre total de
touches, en utilisant différents *layers* pour ammener les touches excentrées
sous les doigts plutôt que l’inverse. Nous avons donc décidé de n’utiliser
aucune touche en dehors du pavé de 3×10 touches centrales pour les lettres et
symboles de programations. Ainsi, Ergo‑L est compatible avec les claviers les
plus compacts (minimum 33 touches) sans ajustements majeurs.

<!-- PlaceHolder, y’a sûrement mieux mais je vais voir ça plus tard -->
![La couche AltGr d’Ergo‑L.](img/ergol_altgr.svg)


Plus optimisée que Bépo et Dvorak
--------------------------------------------------------------------------------

<!-- ### Dvorak est conçu pour les machines à écrire -->

Beaucoup considèrent [Dvorak][] comme l’apogée de l’optimisation clavier, alors
que la disposition fut développée il y a presque 100 ans pour les machines à
écrire. Elles ont d’importantes contraintes physiques que les claviers modernes
n’ont plus : Typiquement, appuyer sur deux touches côtes‑à‑côtes est un
excellent moyen de bloquer les marteaux. Cela implique qu’il fallait privilégier
les alternances de mains aux roulements, alors que ces derniers sont très
confortables sur un clavier d’ordinateur.

[Dvorak][] était un grand pas en avant, mais se base sur une philosophie qui
n’es plus pertinante aujourd’hui. Malheureusement, [Bépo][] et ses nombreuses
variantes la reprend sans chercher à la mettre à jour.

<!-- ### Aucun ne chercher à accomoder l’autre langue (-> tableau des lettres fr/en fréquentes) -->

[Dvorak][] et [Bépo][] ne sont optimisé que pour une seule langue (anglais et
français, respectivement), et sont très inconfortables dans l’autre. Pourtant, à
une exception près, les 9 lettres les plus fréquentes sont les mêmes en français
(ESANITRUO) et en anglais (ETAOHNISR) :

:::{ style="font-size: small; margin: 0 3em" }
|      |       E |       S |       A |       N |       I |       T |       R |       U |       O |       H |
|    -:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|**fr**| 14.44 % |  7.25 % |  7.14 % |  6.78 % |  6.74 % |  6.74 % |  6.52 % |  6.16 % |  5.29 % |  1.06 % |
|**en**| 11.72 % |  6.15 % |  7.97 % |  6.63 % |  6.50 % |  9.04 % |  5.33 % |  2.68 % |  7.85 % |  6.71 % |
:::

<!-- ### Ergo-L est optimisé façon Colemak / Workman et est plus efficace que Bépo et Dvorak en même temps -->

Ergo‑L place donc ces lettres aux emplacements les plus confortables (au sens de
[Workman][]) et fait en sorte qu’aucun enchaînement fréquent en français ou en
anglais ne soit rédhibitoire. Comme [Colemak][], on cherche à limiter le plus
possible le taux de <abbr title="La proportion totale d’enchaînements effectués
avec le même doigt, un type d’enchaînement très inconfortable"> SFU (same finger
usage) </abbr>, en conservant les raccourcis clavier, et favorisant les
roulements au même titre que les alternances de mains.

Ergo‑L en possède environ deux fois moins de SFU que Dvorak en anglais, et Bépo
en français, tout en éliminant certains des problèmes majeurs de ces
dispositions (comme la perte des raccourcis claviers usuels, et dans le cas de
Bépo, l’auriculaire droit trop chargé avec des lettres fréquemment doublées
et/ou en extension, et les chiffres en shift)

Ergo‑L est donc *meilleur que [Dvorak][] en anglais, et meilleur que [Bépo][] en
français en même temps*.


Impeccable en français
--------------------------------------------------------------------------------

### Position de repos parfaitement chargée
### Touche morte !
### Presque aucun enchaînement courant rédhibitoire
### Aucun effort supplémentaire pour avoir une typographie soignée


Efficace en anglais
--------------------------------------------------------------------------------

### Quelques compromis en français pour gagner gros en anglais
### La touche morte fait perdre qu’une bonne place au lieu de *beaucoup* avec Bépo
### => Pratiquement aussi efficace qu’en français


Sans égal pour le code
--------------------------------------------------------------------------------

### altgr est conçu exclusivement pour le code (mais optionnelle)
### altgr est intuitif (-> surligner les blocs)
### altgr est efficace (-> très peu d’enchaînements rédhibitoire)
### altgr est amour    (-> déplacements + mappings vim)


Licence
--------------------------------------------------------------------------------

[WTFPL][] – Do What The Fuck You Want To Public License. Bien qu’il existe des
licences mieux réputées, nous avons choisi d’en utiliser une dont on comprend
tous les mots.


<!-- Balises pour les liens : -->
[WTFPL]:   http://wtfpl.net
[dvorak]:  https://fr.wikipedia.org/wiki/Disposition_Dvorak
[bépo]:    https://bepo.fr
[workman]: https://workmanlayout.org
[colemak]: https://colemak.com
