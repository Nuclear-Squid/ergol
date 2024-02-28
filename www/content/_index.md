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

:::{.highlight}
- [Ergonomique avant tout !]
  <br> – réduit les extensions de doigt, les déviations ulnaires, l’effort de saisie
  <br> – compatible avec **tous** les claviers ergonomiques, de 33 à 105 touches
  <br> – préserve les raccourcis clavier et les chiffres en direct
- [Plus optimisé que Dvorak et Bépo]
  <br> deux fois moins de SFU que Bépo en français **et** que Dvorak en anglais
- [Impeccable en français]
  <br> une seule touche morte pour produire tous les caractères spéciaux
- [Efficace en anglais]
  <br> la première disposition francophone **réellement** optimisée pour l’anglais
- [Redoutable pour le code]
  <br> une couche de symboles optionnelle et optimisée pour le code
:::


Ergonomique avant tout !
--------------------------------------------------------------------------------

### 1DFH, <i lang="en">“1u Distance From Home”</i>

Ergo-L intègre l’approche 1DFH, qui consiste à ne pas déplacer ses doigts de
plus d’une touche par rapport à la position de repos. Cela permet un gain de
confort important pour la saisie en méthode dactylo, évitant notamment les
extensions latérales de l’auriculaire droit qui sont typiques de Bépo pour les
lettres `MZWÇ` (« les quatre cavaliers de l’auriculaire »).

![Ergo‑L sur un clavier compact (OLKB Plank)](img/ergol_1dfh.svg)

C’est pour suivre cette approche que l’immense majorité des claviers
ergonomiques actuels ne proposent que 6 colonnes de touches par main, ce qui est :

- compliqué avec AZERTY, qui a les touches [ù]{.kbd} et [`^`]{.kbd} en 6e
  colonne, obligeant à déplacer [Entrée]{.kbd} et [Backspace]{.kbd} ;
- **très** compliqué avec Bépo, qui a des lettres en 7e colonne à déplacer
  également ;
- trivial avec Ergo‑L, qui a été conçu pour ça.

Les claviers ergonomiques modernes cherchent à limiter le nombre total de
touches, en utilisant différents *layers* pour amener les touches excentrées
sous les doigts plutôt que l’inverse. Nous avons donc décidé de n’utiliser
aucune touche en dehors du pavé de 3×10 touches centrales pour les lettres et
symboles de programation. Ergo‑L est ainsi compatible avec les claviers les
plus compacts (minimum 33 touches) sans ajustement majeur.

### Adapté à la bureautique

Les raccourcis claviers usuels
[Ctrl]{.kbd}‑[Q]{.kbd}[A]{.kbd}[S]{.kbd}[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd}
sont devenus indispensables, car ils sont accessibles de la main gauche pendant
que la main droite utilise la souris. Les approches de type [Dvorak][], très
antérieures à la généralisation de la bureautique (Dvorak a été finalisé en
1932), ignorent ces raccourcis clavier en plaçant toutes les voyelles sous la
main gauche ; mais les approches modernes comme Colemak et Workman permettent de
conserver ces raccourcis tout en obtenant de meilleures métriques que Dvorak.

Ergo‑L suit cette approche [Colemak][] / [Workman][] et comme eux, s’autorise un
changement : le [C]{.kbd} est ainsi déplacé pour favoriser les enchaînements,
mais [Ctrl]{.kbd}‑[C]{.kbd} reste faisable d’une main à gauche.

### Réduction de la fatigue de saisie

Ergo‑L veille à réduire autant que possible :

- **les déviations ulnaires**, en proposant une alternative en [AltGr]{.kbd} à
  tous les symboles placés sur des touches excentrées ;
- **la charge des doigts faibles**, surtout celle de l’auriculaire droit,
  responsable de [Entrée]{.kbd} et [Backspace]{.kbd} sur la plupart des
  claviers ;
- **le taux de digrammes de même doigt**, un type d’enchaînement très
  inconfortable, notamment à haute vitesse de saisie.

Ergo‑L privilégie le confort à la vitesse : on peut taper vite avec n’importe
quel clavier. Mais il est conçu pour que son confort et son ergonomie ne se
dégradent pas au fur et à mesure que la vitesse de saisie augmente.


Plus optimisé que Dvorak et Bépo
--------------------------------------------------------------------------------

[Dvorak][] est la disposition de clavier optimisée la plus connue. Elle fut
développée pendant l’entre-deux guerres pour les machines à écrire, qui ont
d’importantes contraintes physiques dont les claviers modernes sont exemptés :
typiquement, appuyer sur deux touches côte‑à‑côte est un excellent moyen de
coincer les marteaux. Cela implique qu’il fallait privilégier les alternances de
mains aux <abbr title="Enchaînements de deux touches actionnées par deux doigts
différents d’une même main, comme 'df' en AZERTY">roulements</abbr>, alors que
ces derniers sont très confortables sur un clavier d’ordinateur.

Dvorak était un grand pas en avant, mais se base sur une philosophie qui
n’est plus pertinente aujourd’hui. Malheureusement, [Bépo][] et ses nombreuses
variantes la reprend sans chercher à la mettre à jour.

Dvorak et Bépo ne sont optimisés que pour une seule langue (anglais et français,
respectivement), et sont très inconfortables dans l’autre. Pourtant, à une
exception près, les 9 lettres les plus fréquentes sont les mêmes en français
(ESANITRUO) et en anglais (ETAOHNISR) :

:::{}
|      |      E |      S |      A |      N |      I |      T |      R |      U |      O |      H |
|    -:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
|**fr**| 14.4 % |  7.2 % |  7.1 % |  6.8 % |  6.7 % |  6.7 % |  6.5 % |  6.1 % |  5.3 % |  1.0 % |
|**en**| 11.7 % |  6.1 % |  8.0 % |  6.6 % |  6.5 % |  9.0 % |  5.3 % |  2.7 % |  7.8 % |  6.7 % |
: Fréquence des lettres les plus utilisées en français et en anglais.
:::

Ergo‑L place donc ces lettres aux emplacements les plus confortables (au sens
de [Workman][]) et fait en sorte qu’aucun enchaînement fréquent en français ou
en anglais ne soit rédhibitoire. Comme [Colemak][], on cherche à limiter le
plus possible le taux de SFU, en favorisant les roulements au même titre que
les alternances de mains.

Malgré le fait qu’il soit optimisé pour les **deux** langues, français **et**
anglais, Ergo‑L affiche de meilleures métriques d’optimisation, tant sur la
charge des doigts que sur le taux de digrammes de même doigt :

<style>
.sfu table th,
.sfu table td { padding: 0.2em 0; }
.sfu table tr td:nth-child(4) { background-color: #f884; }
.sfu table caption { margin-top: 0.5em; font-size: smaller; }
.sfu table { margin: 1em auto; max-width: 50em; border-collapse: collapse; }
.sfu a:hover { text-decoration: underline; }
.sfu a       { text-decoration: none; }
</style>
:::{.sfu}
|      |  AZERTY                          |  Bépo                          |  Ergo‑L                         |  Dvorak                          |  QWERTY                          |
|    -:|:--------------------------------:|:------------------------------:|:-------------------------------:|:--------------------------------:|:--------------------------------:|
|**fr**| [7.97 %](/stats/#/azerty/iso/fr) | [2.55 %](/stats/#/bepo/iso/fr) | [1.23 %](/stats/#/Ergo‑L/iso/fr) | [3.31 %](/stats/#/dvorak/iso/fr) | [7.16 %](/stats/#/qwerty/iso/fr) |
|**en**| [6.31 %](/stats/#/azerty/iso/en) | [3.01 %](/stats/#/bepo/iso/en) | [1.40 %](/stats/#/Ergo‑L/iso/en) | [2.62 %](/stats/#/dvorak/iso/en) | [5.76 %](/stats/#/qwerty/iso/en) |
: Taux de digrammes de même doigts en français et anglais, extrait de la [page de comparaison avec Bépo](bepo).
:::


Impeccable en français
--------------------------------------------------------------------------------

### La gestion des accents

La gestion des accents, diacritiques et symboles typographiques français
nécessite traditionnellement l’usage de touches excentrées (ce qui irait à
l’encontre de la philosophie 1DFH d’Ergo‑L) ou de [AltGr]{.kbd} (qui est prone à
l’erreur à haute vitesse car il faut relâcher la touche au bon moment)

Ergo‑L utilise une touche morte de type [Lafayette][] (notée ★) pour tous les
caractères accentués, diacritiques et ponctuations spéciales. Actionner cette
« touche typo » donne accès à **tous** ces symboles dans le pavé de 3×10
touches **sans** utiliser [AltGr]{.kbd}. Cela occasionne environ 4 % de frappes
supplémentaires pour un texte francophone, ce qui est négligeable comparé au
gain de confort que cela apporte.

Maintenir shift après avoir actionné la touche typo permet de saisir des
lettres accentuées en majuscule (★ → [Shift]{.kbd} + `a` = `À`). Oubliez vos
alt codes ! Cette touche typo peut *parfois* donner l’accès à une autre touche
morte, comme le tréma mort, accessible en double‑cliquant la touche typo (donc
★ → ★ → `E` = `Ë`)

![La touche morte d’Ergo‑L.](img/ergol_1dk.svg)

### Placement des lettres

En français, les huit lettres les plus fréquentes (`esanitru`) sont toutes
réparties sur la position de repos des doigts, et le reste des lettres
fréquentes sont réparties sur les autres touches faciles d’accès.

Une grande attention à été portée sur les enchaînements de lettres :

- Les voyelles s’enchaînent fréquemment avec toutes les consonnes importantes,
  donc elles sont soit :
    - placées sur les auriculaires, avec des consonnes peu fréquentes autour
      (comme `QAZ` et `FUK`)
    - empilées sur des doigts forts pour celles qui ne s’enchaînent pas
      ensemble (comme `EO` et ★`IY`).
- Le placement des lettres sur les positions de repos maximise les roulements
  vers l’intérieur et minimise les redirections, qui sont source d’erreur à
  haute vitesse.
- Le reste des lettres fréquentes sont placées de sorte à minimiser les SFU
  (par exemple, `D` et `G` s’enchaînent très souvent avec `N` ou `R`, mais très
  peu avec `T`)
- La touche morte est placée sur la main opposée à `EAC`, qui sont les lettres
  les plus souvent diacritées en français.

Pratiquement aucun enchaînement courant en français ne demande trop d’effort.

:::{ style="text-align: center;" }
<a href="stats/#/Ergo‑L/iso/fr">

![fréquence d’utilisation des touches en français](img/ergol_fr.svg)

</a>
:::

### Typographie

Soigner la typographie demande souvent un effort (physique et mental)
supplémentaire non négligeable. Beaucoup l’ignore, ou laisse leur éditeur de
texte la gérer pour eux. Ergo‑L permet de soigner la typographie sans aucun
effort supplémentaire :

- [Shift]{.kbd} + [Espace]{.kbd} = espace insécable fine
- ★ → [Espace]{.kbd} = apostrophe typographique
- les guillemets typographiques et ponctuations doublées (`:;?!`) en
  [Shift]{.kbd} pour faciliter leur enchaînement avec l’insécable fine.


Efficace en anglais
--------------------------------------------------------------------------------

### Quelques compromis

Ergo‑L porte la même attention au confort de la saisie de texte en anglais qu’en
français, mais doit faire quelques compromis pour faire cohabiter les deux
langues. Certaines lettres sont beaucoup plus fréquentes dans une langue que
l’autre, (comme le [U]{.kbd} et la touche typo en français et le [H]{.kbd} en
anglais) et les enchaînements courrant peuvent être très différents.

Ergo‑L optimise le plus possible la saisie de texte anglais et français sans
causer de problèmes rédhibitoires dans une de ces deux langues. Par exemple,
l’enchaînement `TH` (*le* digramme le plus fréquent en anglais, avec 3.2%
d’occurences) est très confortable, mais le `H` occupe une place dont on peut
se dispenser en français. De même, `U` et ★ sont très fréquent en français,
mais peu fréquent en anglais, ce qui a été pris en compte pour leur placement.

:::{ style="text-align: center;" }
<a href="stats/#/Ergo‑L/iso/en">

![fréquence d’utilisation des touches en anglais](img/ergol_en.svg)

</a>
:::

Ergo‑L a donc une ergonomie comparable en français et en anglais. Bien que de
nombreuses dispositions dédiés exclusivement à l’anglais soient plus efficace
qu’Ergo‑L dans cette langue, Ergo‑L est *la première disposition **reéellement**
optimisée pour le français **et** l’anglais*.

### Les autres lagues européennes

Ergo‑L est capable de saisir du texte dans presque toutes le langues
européennes, mais ne cherche pas a optimiser la saisie de texte dans d’autres
langues que le français et l’anglais. Certains caractères sont disponible en
touche typo, comme `ß` ou `ñ` (placés sous ★ → {`X`, `V`}, respectivement), et
il existe de nombreuses touches mortes en [AltGr-Shift]{.kbd} (par exemple
[Shift]{.kbd} + `^` en [AltGr]{.kbd} donc un accent circonflexe mort).

C’est loin d’être idéal, mais la disposition est conçue pour être *simple à
modifier*. Le répo github d’Ergo‑L contient le fichier source de la disposition
(un fichier `.toml` facile à lire et modifier), ainsi que des instructions pour
builder votre dispo custom, ou évaluer la qualité des enchaînements de votre
variante. Remplacer les caractères de la touche morte par ceux dont vous avez
besoin devrait être relativement simple.

Si vous voulez adapter Ergo‑L à une langue étrangère, nous vous recommandons de
consevoir la couche typo uniquement pour cette langue, et d’installer votre
adaptation en même temps qu’ergol (en lui donnant un autre nom, comme
« ergol-de » pour l’allemand, par exemple), afin de pouvoir rapidement changer
de disposition dans vos paramètres clavier.

![Un exemple d’adaptation d’ergol pour l’allemand](img/ergol_1dk_de.svg)

Redoutable pour le code
--------------------------------------------------------------------------------

### Héritage QWERTY-US

La grande majorité des touches en dehors du pavé de 3×10 sont identiques à
celles de Qwerty‑US. Cela implique que les chiffres sont en accès direct (sans
[Shift]{.kbd}), ce qui facilite grandement la saisie de nombres.

QWERTY‑US est réputé pour son efficacité dans la saisie de symboles de
programation, mais elle est perfectible : **tous** les symboles de programmation
nécessitent au moins un auriculaire et une extension, car ils sont tous sous un
auriculaire, ou en [Shift]{.kbd}, ou les deux. Ergo‑L a donc à cœur de proposer
une meilleure alternative.


### Couche symboles

Ergo‑L propose une couche [AltGr]{.kbd} optionelle optimisée pour le placement
et les enchaînements de symboles de programmation.

![La couche AltGr d’Ergo‑L.](img/ergol_altgr.svg)

Cette couche [AltGr]{.kbd} est plutôt simple à mémoriser, car les symboles sont
regroupés par « blocs ». On y retrouve :

- les délimiteurs `(){}[]<>`
- les délimiteurs de chaîne de caractères ``'`"``
- les symboles arithmétiques `+-/*`
- les ponctuations `!;:?` (de plus, `;:` sont à leur emplacement en Qwerty Européen)
- `$%^&*` sont à leur position en [Shift]{.kbd} + chiffres, mais une rangée plus bas.

Comme pour l’emplacement des lettres de la disposition, une grande attention à
été portée au placement des symboles de prog et aux enchaînements courrants. Les
symboles peu courrants (``~@#%^`|``) sont loins des positions de repos, et la
grande majorité des enchaînements de symboles de prog se fait soit avec une
alternance de main (`~/`, `);`, `</>`, `+=`, `['']`, …) soit avec un roulement
(`>=`, `/*`, `";`, `()`, `\"`, …).

Comme pour la saisie de texte en français ou anglais, la couche [AltGr]{.kbd}
d’Ergo‑L ne contient pratiquement aucun enchaînement inconfortable.

### Compatibilité Vim

Pour une utilisation technique, Vim apporte une ergonomie reconnue et de
nombreux éditeurs de code implémentent un mode de navigation Vim. La couche
[AltGr]{.kbd} d’Ergo‑L lui permet de conserver les principales commandes de
déplacement :

- [AltGr]{.kbd} + `jk` donne `+-`, qui est une action très proche de `jk`
- les sauts verticaux `{}`, `()` et `[]` sont en AltGr + main gauche

À ce jour, nous n’avons pas trouvé de meilleure couche de symboles que celle que
nous avons développée. Elle a été reprise dans d’autres projets, notamment
[Lafayette].


Licence
--------------------------------------------------------------------------------

[WTFPL][] – Do What The Fuck You Want To Public License. Bien qu’il existe des
licences mieux réputées, nous avons choisi d’en utiliser une dont on comprend
tous les mots.


<!--
 !   ╭───────────────────────────────────────────────────────╮
 !   │               Balises pour les liens :                │
 !   ╰───────────────────────────────────────────────────────╯
-->
[WTFPL]:     http://wtfpl.net
[dvorak]:    https://fr.wikipedia.org/wiki/Disposition_Dvorak
[bépo]:      https://bepo.fr
[workman]:   https://workmanlayout.org
[colemak]:   https://colemak.com
[lafayette]: https://qwerty-lafayette.org/
