+++
[params]
cssSheets = ["/css/keyboard.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/demo.js", "/js/svg.js"]
+++

{{< x-keyboard
    src="./layouts/ergol.json"
    name="Ergo‑L"
    download="lts"
    image="img/ergol.svg" >}}

- [Ergonomique avant tout !]
- [Plus optimisée que Bépo et Dvorak]
- [Impeccable en français]
- [Efficace en anglais]
- [Sans égal pour le code]

## Ergonomique avant tout !

Avec la généralisation de la bureautique, les raccourcis claviers usuels
([Ctrl]{.kbd}‑{[Q]{.kbd}, [A]{.kbd}, [S]{.kbd}, [Z]{.kbd}, [X]{.kbd},
[C]{.kbd}, [V]{.kbd}}) sont devenus indispensables, car ils peremettent
d’utiliser le clavier dans la main gauche pendant que la souris utilise la main
droite. Les approches façon [Dvorak][] renoncent à ces raccourcis clavier en
plaçant toutes les voyelles sous la main gauche, mais les approches modernes
(comme Colemak) permettent de conserver ces raccourcis tout en obtenant de
meilleurs métriques.

Ergo‑L suit cette approche [Colemak][], et comme [Colemak][] et [Workman][],
s’autorise un changement : le [C]{.kbd} est ainsi déplacé pour favoriser les
enchaînements, mais [Ctrl]{.kbd}‑[C]{.kbd} reste faisable d’une main à gauche.

Ergo-L intègre l’approche 1DFH, qui consiste à ne pas déplacer ses doigts de
plus d’une touche par rapport à la position de repos. Cela permet un gain de
confort important pour la saisie en méthode dactylo, évitant notamment les
extensions latérales de l’auriculaire droit qui sont typiques de Bépo pour les
lettres `MZWÇ`.

De plus : ergol réduit grandement le taux de <abbr title="La proportion totale
d’enchaînements effectués avec le même doigt, un type d’enchaînement très
inconfortable"> SFU (same finger usage) </abbr> et allège la charges des doigts
faibles (surtout l’auriculaire droit, responsable de [entrée]{.kbd} et
[backspace]{.kbd}). On optimise le confort : on peut taper vite avec
n’importe‑quel clavier.

![Ergo‑L sur un clavier compact (OLKB Plank)](img/ergol_1dfh.svg)

Les claviers ergonomiques modernes cherchent à limiter le nombre total de
touches, en utilisant différents *layers* pour ammener les touches excentrées
sous les doigts plutôt que l’inverse. Nous avons donc décidé de n’utiliser
aucune touche en dehors du pavé de 3×10 touches centrales pour les lettres et
symboles de programation. Ainsi, Ergo‑L est compatible avec les claviers les
plus compacts (minimum 33 touches) sans ajustements majeurs.

## Plus optimisée que Bépo et Dvorak

[Dvorak][] est la disposition de clavier optimisée la plus connue, elle fut
développée en 1932 pour les machines à écrire, qui ont d’importantes
contraintes physiques dont les claviers modernes sont exemptés : typiquement,
appuyer sur deux touches côtes‑à‑côtes est un excellent moyen de bloquer les
marteaux. Cela implique qu’il fallait privilégier les alternances de mains aux
<abbr title="Enchaînements de deux touches actionnées par deux doigts
différents d’une même main, comme 'df' en AZERTY">roulements</abbr>, alors que
ces derniers sont très confortables sur un clavier d’ordinateur.

[Dvorak][] était un grand pas en avant, mais se base sur une philosophie qui
n’est plus pertinante aujourd’hui. Malheureusement, [Bépo][] et ses nombreuses
variantes la reprend sans chercher à la mettre à jour.

[Dvorak][] et [Bépo][] ne sont optimisé que pour une seule langue (anglais et
français, respectivement), et sont très inconfortables dans l’autre. Pourtant,
à une exception près, les 9 lettres les plus fréquentes sont les mêmes en
français (ESANITRUO) et en anglais (ETAOHNISR) :

:::{ style="font-size: small; margin: 0 3em" }
|      |       E |       S |       A |       N |       I |       T |       R |       U |       O |       H |
|    -:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|**fr**| 14.44 % |  7.25 % |  7.14 % |  6.78 % |  6.74 % |  6.74 % |  6.52 % |  6.16 % |  5.29 % |  1.06 % |
|**en**| 11.72 % |  6.15 % |  7.97 % |  6.63 % |  6.50 % |  9.04 % |  5.33 % |  2.68 % |  7.85 % |  6.71 % |
:::

Ergo‑L place donc ces lettres aux emplacements les plus confortables (au sens
de [Workman][]) et fait en sorte qu’aucun enchaînement fréquent en français ou
en anglais ne soit rédhibitoire. Comme [Colemak][], on cherche à limiter le
plus possible le taux de SFU, en favorisant les roulements au même titre que
les alternances de mains.

Malgré le fait qu’il soit optimisé pour les **deux** langues, français **et**
anglais, Ergo‑L affiche de meilleures métriques d’optimisation, tant sur la
charge des doigts que sur le taux de digrammes de même doigt :

:::{ style="margin: 0 6em; text-align: center" }
|      |  AZERTY                            |  Bépo                            |  Ergo‑L                           |  Dvorak                            |  QWERTY                            |
|    -:|:----------------------------------:|:--------------------------------:|:---------------------------------:|:----------------------------------:|:----------------------------------:|
|**fr**| [7.97 %](../stats/#/azerty/iso/fr) | [2.55 %](../stats/#/bepo/iso/fr) | [1.23 %](../stats/#/ergol/iso/fr) | [3.31 %](../stats/#/dvorak/iso/fr) | [7.16 %](../stats/#/qwerty/iso/fr) |
|**en**| [6.31 %](../stats/#/azerty/iso/en) | [3.01 %](../stats/#/bepo/iso/en) | [1.40 %](../stats/#/ergol/iso/en) | [2.62 %](../stats/#/dvorak/iso/en) | [5.76 %](../stats/#/qwerty/iso/en) |

<small> Comparaison des scores de SFU, extrait de la [page de comparaison avec
Bépo](bepo) </small>
:::

## Impeccable en français

La gestion des accents, diacritiques et symboles typographiques français
nécessite traditionnellement l’usage de touches excentrées (ce qui irait à
l’encontre de la philosophie 1DFH d’ergol) ou de [AltGr]{.kbd} (qui est prone à
l’erreur à haute vitesse car il faut relâcher la touche au bon moment)

Ergo‑L utilise une touche morte de type [Qwerty-Lafayette][] (noté ★) pour tous les
caractères accentués, diacritiques et ponctuations spéciales. Actionner cette
« touche typo » donne accès à **tous** ces symboles dans le pavé de 3×10
touches **sans** utiliser [AltGr]{.kbd}. Cela occasionne environ 4 % de frappes
supplémentaires pour un texte francophone, ce qui est négligeable comparé au
gain de confort que cela apporte.

Maintenir shift après avoir actionné la touche typo permet de saisir des
lettres accentuées en majuscule (★ → [Shift]{.kbd} + `a` = `À`). Oubliez vos
alt codes !

![La touche morte d’Ergo‑L.](img/ergol_1dk.svg)

En français, les huit lettres les plus fréquentes (`esanitru`) sont toutes
réparties sur la position de repos des doigts, et le reste des lettres
fréquentes sont réparties sur les autres touches faciles d’accès.

<!-- ptn ce paragraphe est à chier -->
Une grande attention à été portée sur les enchaînements de lettres. Les
digrammes `OE` / `EO` étant très rares en français et anglais, les lettres `E`
et `O` sont sur la même colonne. La touche morte est placée sur la main opposée de `EAC`, qui sont les lettres les plus souvent diacritées en français. Pratiquement aucun enchaînement courant en français ne demande trop d’effort.


<a href="stats/#/ergol/iso/fr">

![fréquence des touches en français](img/ergol_fr.svg)

</a>

Soigner la typographie demande souvent un effort (physique et mental)
supplémentaire non négligeable. Beaucoup l’ignore, ou laisse leur éditeur de
texte la gérer pour eux. Ergo‑L permet de soigner la typographie sans aucun
effort supplémentaire :

- [Shift]{.kbd} + [Espace]{.kbd} = espace insécable fine, et ★ → [Espace]{.kbd}
  = apostrophe typographique
- les guillemets typographiques et ponctuations doublées (`:;?!`) en
  [Shift]{.kbd} pour faciliter leur enchaînement avec l’insécable fine.

## Efficace en anglais

Ergo‑L porte la même attention au confort de la saisie de texte en anglais
qu’en français, mais doit faire quelques compromis pour faire cohabiter les
deux langues. Typiquement, le `u` et la touche typo sont relativement peu
fréquents en anglais, mais le `h` est très important.

Ces compromis ne causent pas de problèmes majeurs, tous les enchaînements
fréquents avec le `h` sont confortable, et il occupe une place dont on peut
facilement se passer en français.

Ergo‑L a donc une ergonomie comparable en français et en anglais. Bien que de
nombreuses dispositions dédiés exclusivement à l’anglais soient plus efficace
qu’ergol dans cette langue. Ergo‑L reste la première disposition *reéellement
optimisé pour le français **et** l’anglais*.


<a href="stats/#/ergol/iso/en">

![fréquence des touches en anglais](img/ergol_en.svg)

</a>

## Sans égal pour le code

La grande majorité des touches en dehors du pavé de 3×10 sont identiques à
celles de Qwerty‑US. Cela implique que les chiffres sont en accès direct (sans
[Shift]{.kbd}), ce qui facilite grandement la saisie de nombres.

Qwerty‑US est réputé pour son efficacité dans la saisie de symboles de
programation, mais on pense qu’elle a de gros défauts. **Tous** les symboles de
prog nécessitent au moins un auriculaire et une extension, car ils sont tous en
direct sur l’auriculaire droit, ou en [Shift]{.kbd}. Ergo‑L propose donc une
couche [AltGr]{.kbd} optionelle optimisée pour le placement et les
enchaînements de symboles de programmation.

![La couche AltGr d’Ergo‑L.](img/ergol_altgr.svg)

Cette couche [AltGr]{.kbd} est plutôt simple à mémoriser, car les symboles sont regroupés par « blocs ». On y retrouve :

- les délimiteurs `(){}[]<>`
- les délimiteurs de chaîne de caractères ``'`"``
- les symboles arithmétiques `+-/*`
- les ponctuations `!;:?`
- les symboles de (dé)référencement `&*`
- `$%^&*` sont à leurs position en [Shift]{.kbd} + chiffres, mais une rangée plus bas.

Comme pour l’emplacement des lettres de la disposition, une grande attention à
été portée au placement des symboles de prog et aux enchaînements courrants. Les
symboles peu courrants (``~@#%^`|``) sont loins des positions de repos, et la
grande majorité des enchaînements de symboles de prog se fait soit avec une
alternance de main (`~/`, `);`, `</>`, `+=`, `['']`, …) soit avec un roulement
(`>=`, `/*`, `";`, `()`, `\"`, …).

Comme pour la saisie de texte en français, la couche [AltGr]{.kbd} d’Ergo‑L ne
contient pratiquement aucun enchaînement inconfortable.

Pour une utilisation technique, Vim apporte une ergonomie reconnue et de
nombreux éditeurs de code implémentent un mode de navigation Vim. La couche
[AltGr]{.kbd} d’Ergo‑L lui permet de conserver les principales commandes de
déplacement :

- [AltGr]{.kbd} + `jk` donne `+-`, qui est une action très proche de `jk`
- les sauts verticaux `{}`, `()` et `[]` sont en AltGr + main gauche

À ce jour, nous n’avons pas trouvé de meilleur couche prog que celle que nous
avons développé.

## Licence

[WTFPL][] – Do What The Fuck You Want To Public License. Bien qu’il existe des
licences mieux réputées, nous avons choisi d’en utiliser une dont on comprend
tous les mots.


<!--
 !   ╭───────────────────────────────────────────────────────╮
 !   │               Balises pour les liens :                │
 !   ╰───────────────────────────────────────────────────────╯
-->
[WTFPL]:   http://wtfpl.net
[dvorak]:  https://fr.wikipedia.org/wiki/Disposition_Dvorak
[bépo]:    https://bepo.fr
[workman]: https://workmanlayout.org
[colemak]: https://colemak.com
[qwerty-lafayette]: https://qwerty-lafayette.org/
