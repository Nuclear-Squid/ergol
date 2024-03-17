+++
title = "Ergo‑L ou Bépo ?"

[params]
cssSheets = ["/css/keebs.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/keebs.js"]
footer = "objectivé par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++

{{<x-keyboard name="Bépo" data="bepo" href="https://bepo.fr">}}

:::{.highlight style="max-width: 32em;"}
- [Ergonomie]
  <br> une priorité pour Ergo‑L bien plus que pour Bépo
- [Optimisation]
  <br> Dvorak pour Bépo, Colemak/Workman pour Ergo‑L
- [Typographie]
  <br> deux approches différentes
- [Programmation]
  <br> la spécialité d’Ergo‑L
- [Variantes de Bépo]
:::


Ergonomie
--------------------------------------------------------------------------------

### Bépo {id="ergonomie-bépo"}

Conservant l’approche AZERTY d’avoir certaines lettres accentuées en direct
(`é`, `è`, `à`, `ç`), [Bépo][] a manqué de place pour placer toutes les lettres
et a choisi d’occuper les colonnes excentrées pour des lettres jugées moins
fréquentes (`m`, `z`, `w`, `ç`, « les quatre cavaliers de l’auriculaire »). Cela
le rend quasi incompatible avec la plupart des claviers ergonomiques du marché,
qui ne proposent que 6 colonnes de touches par main pour respecter le principe
[1DFH][].

Par ailleurs, la charge des doigts est mal répartie :

- la charge de l’index gauche est très élevée (> 23 % en français), et c’est
  d’autant plus gênant que ce doigt gère à lui seul la moitié des [digrammes de
  même doigt](#optimisation) ;
- plus grave, la charge de l’auriculaire droit (> 11 % en français) est bien
  plus élevée que dans toutes les dispositions de clavier francophones,
  optimisées ou non ;
- une grande partie des touches doublées se trouvent sous l’auriculaire droit —
  et souvent en extension !

C’est notamment le cas du `m` : 13e lettre la plus fréquente en français (2.7 %
de fréquence, soit plus que tous les caractères accentués cumulés), fréquemment
doublé et en extension latérale sur l’auriculaire droit. Cela favorise
grandement les déviations ulnaires, qui sont la principale cause de
développement de troubles musculo-squelettiques associés à la saisie au clavier.

Beaucoup de Bépoètes ont recours à des claviers spécifiques, souvent très
onéreux, pour réduire l’inconfort de ces touches placées sous l’auriculaire en
extension.

Enfin, par inspiration [Dvorak][], Bépo a renoncé aux raccourcis clavier
positionnels [Ctrl]{.kbd}‑[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd}.


### Ergo‑L {id="ergonomie-ergol"}

Ergo‑L se veut [ergonomique avant tout][]. À ce titre, il suit une approche
[1DFH][] stricte, plaçant les 26 lettres et les 4 principales ponctuations dans
le pavé central de 3×10 touches, garantissant une compatibilité parfaite avec
tous les claviers de 33 à 105 touches, ergonomiques ou non.

Cette approche permet aussi de garder les chiffres en direct, rendant le pavé
numérique inutile. On peut ainsi utiliser des claviers compacts qui favorisent
une meilleure posture de travail, notamment quand on utilise la souris de la
main droite.

Les auriculaires sont préservés, en particulier le droit qui est en charge des
touches [Entrée]{.kbd} et [Backspace]{.kbd} sur la plupart des claviers (et qui
ne sont pas comptées dans ces métriques).

Les lettres fréquemment doublées (e.g. [L]{.kbd}, [N]{.kbd}, [M]{.kbd}) sont
placées sous les index.

Les raccourcis clavier positionnels [Ctrl]{.kbd}‑[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd}
ainsi que [Ctrl]{.kbd}‑[Q]{.kbd}[A]{.kbd}[S]{.kbd} sont préservés, mais le
[C]{.kbd} a été déplacé pour permettre un gain d’optimisation très sensible.

:::{ style="overflow: scroll;" }
<!-- Bon, j’ai beau adorer pandoc-md, ce tableau il *reste en HTML* -->
<table>
  <caption>
    Comparaison des charges des doigts entre Bépo et Ergo‑L.<br>
    <small> (cliquer sur l’histogramme pour plus d’infos) </small>
  </caption>

  <tr>
    <th> Bépo </th>
    <th></th>
    <th> Ergo‑L </th>
  </tr>
  <tr>
    <td> <a href="/stats/#/bepo//fr"><img src="./charge_bepo_fr.png" /></a> </td>
    <th> fr </th>
    <td> <a href="/stats/#/ergol//fr"><img src="./charge_ergol_fr.png"/></a> </td>
  </tr>
  <tr>
    <td> <a href="/stats/#/bepo//en+fr"><img src="./charge_bepo_en_fr.png"/></a> </td>
    <th> fr‑en </th>
    <td> <a href="/stats/#/ergol//en+fr"><img src="./charge_ergol_en_fr.png"/></a> </td>
  </tr>
  <tr>
    <td> <a href="/stats/#/bepo//en"><img src="./charge_bepo_en.png" /></a> </td>
    <th> en </th>
    <td> <a href="/stats/#/ergol//en"><img src="./charge_ergol_en.png"/></a> </td>
  </tr>

  <tr style="text-align: right; font-size: 10px;">
    <td>
      <table><tr>
        <td width="9%"> </td>
        <td width="9%"> 9.6 %</td>
        <td width="9%"> 8.0 %</td>
        <td width="9%"> 9.7 %</td>
        <td width="9%">23.0 %</td>
        <td width="9%"> </td>
        <td width="9%">15.2 %</td>
        <td width="9%">12.3 %</td>
        <td width="9%">15.6 %</td>
        <td width="9%">13.7 %</td>
        <td width="9%"> </td>
      </tr></table>
    </td>
    <td style="text-align: center; font-size: 12px;"> max. </td>
    <td>
      <table><tr>
        <td width="9%"> </td>
        <td width="9%"> 9.2 %</td>
        <td width="9%">12.0 %</td>
        <td width="9%">19.5 %</td>
        <td width="9%">14.8 %</td>
        <td width="9%"> </td>
        <td width="9%">18.6 %</td>
        <td width="9%">15.2 %</td>
        <td width="9%">11.1 %</td>
        <td width="9%"> 6.9 %</td>
        <td width="9%"> </td>
      </tr></table>
    </td>
  </tr>
</table>
:::

**De notre point de vue** : Bépo a été optimisée au détriment de l’ergonomie,
notamment en surchargeant beaucoup trop l’auriculaire droit et en s’aliénant la
plupart des claviers ergonomiques.


Optimisation
--------------------------------------------------------------------------------

### Bépo {id="optimisation-bépo"}

[Bépo][] applique une optimisation de type [Dvorak][] au français :

- maximiser l’alternance des mains lors de la frappe ;
- répartir les touches de façon équitable sur les deux mains ;
- utiliser en priorité la rangée centrale, puis haute, puis inférieure ;
- en cas de non-alternance des mains sur un digramme, diriger la frappe vers le
  centre du clavier ce qui sollicite davantage les doigts les plus habiles à
  savoir l’index et le majeur.

Bépo cherche également à minimiser le taux de digrammes de même doigt, que nous
mesurons à 2.6 % en français contre 8.0 % pour l’AZERTY. C’est un score très
proche de celui obtenu par Dvorak en anglais, là où QWERTY est à 7.2 %.

Cette optimisation est faite au détriment de l’anglais :

- la charge de l’auriculaire droit grimpe à 13.7 % ;
- certains digrammes, notamment `wh`, sont rédhibitoires.


### Ergo‑L {id="optimisation-ergol"}

Ergo‑L reprend les principes ci-dessus mais intègre les inspirations [Colemak][]
et [Workman][] :

- on privilégie les roulements aux alternances de main :
    - les alternances de main étaient nécessaires à l’époque des machines à
      écrire mécaniques pour éviter de coincer les marteaux, mais ne le sont
      plus aujourd’hui ;
    - les roulements permettent de faire moins d’erreurs de saisie à haute
      vitesse, tout en restant très confortables ;
- on évite les colonnes centrales qui requièrent une extension de l’index ;
- faute de pouvoir utiliser les positions de repos, on privilégie les touches :
    - de la rangée supérieure pour l’annulaire et le majeur ;
    - de la rangée inférieure pour l’index ;
- on fait le choix de conserver les raccourcis clavier positionnels, l’impact
  sur les métriques d’optimisation étant négligeable en regard des gains déjà
  effectués sur Bépo et Dvorak.

Malgré ces compromis et le fait qu’il soit optimisé pour les **deux** langues,
français **et** anglais, Ergo‑L affiche de meilleures métriques d’optimisation,
tant sur la charge des doigts (voir § précédent) que sur le taux de digrammes de
même doigt :

<style>
.sfu table th,
.sfu table td { padding: 0.2em 0; }
.sfu table tr td:nth-child(4) { background-color: var(--bg-accent); }
.sfu table caption { caption-side: bottom; margin-top: 0.5em; font-size: smaller; }
.sfu table { margin: 1em auto; max-width: 50em; border-collapse: collapse; }
.sfu a:hover { text-decoration: underline; }
.sfu a       { text-decoration: none; }
</style>
:::{.sfu style="overflow: scroll;" }
|      |  AZERTY                       |  Bépo                       |  Ergo‑L                      |  Dvorak                       |  QWERTY                       |
|    -:|:-----------------------------:|:---------------------------:|:----------------------------:|:-----------------------------:|:-----------------------------:|
|**fr**| [7.97 %](/stats/#/azerty//fr) | [2.55 %](/stats/#/bepo//fr) | [1.23 %](/stats/#/ergol//fr) | [3.31 %](/stats/#/dvorak//fr) | [7.16 %](/stats/#/qwerty//fr) |
|**en**| [6.31 %](/stats/#/azerty//en) | [3.01 %](/stats/#/bepo//en) | [1.40 %](/stats/#/ergol//en) | [2.62 %](/stats/#/dvorak//en) | [5.76 %](/stats/#/qwerty//en) |
: Taux de digrammes de même doigt en français et anglais.
:::

**De notre point de vue** : l’optimisation de Bépo est faite au détriment de
l’anglais et de l’ergonomie, et elle est (très) inférieure à celle que propose
Ergo‑L dans les deux langues.


Typographie
--------------------------------------------------------------------------------

### Bépo {id="typographie-bépo"}

[Bépo][] gère les caractères accentués de façon similaire à AZERTY :

- certaines lettres comme `é` `è` `à` `ç` sont accessibles directement ;
- l’accent circonflexe et le tréma sont faits avec une touche morte (le tréma
  nécessitant *en plus* [AltGr]{.kbd} avec Bépo) ;
- certains caractères nécessitent la touche [AltGr]{.kbd}, ce qui complique les
  enchaînements : `ù`, `œ`, `æ`, points de suspension…

De plus, Bépo propose beaucoup de caractères spéciaux (i.e. non liés à la langue
français ou au code informatique) via la couche AltGr ou des touches mortes, au
prix d’une certaine complexité des pilotes de clavier :

- les pilotes Windows existent en deux versions, l’une « tronquée » et stable,
  l’autre « complète » mais dont le comportement est présenté comme moins
  fiable ;
- le pilote Linux, théoriquement inclus à XKB, se base sur des définitions de
  touches mortes qu’il faut ajouter manuellement coté utilisateur.


### Ergo‑L {id="typographie-ergol"}

Ergo‑L utilise une touche morte de type [Lafayette][] pour tous les caractères
accentués et ponctuations spéciales : la fluditié des enchaînements est
préservée, et la touche [AltGr]{.kbd} peut être dédiée aux seuls symboles de
programmation.

Cette touche morte occasionne des frappes supplémentaires sur un texte francophone :

- 1.0 % pour `è`, `à`, `ç`, `œ`, `æ`
- 1.5 % pour le seul `é`
- 1.5 % si on utilise l’apostrophe typographique (`’`) plutôt que l’apostrophe
  droite (`'`)

… soit environ 4 % de frappes supplémentaires. Pour une vitesse de saisie de 60
mots/minutes, on perd ainsi 2 mots/minute en Ergo‑L.

Le support typographique du français est tout aussi complet que celui de Bépo,
mais pour les autres caractères spéciaux Ergo‑L se contente des touches mortes
standard définies dans XKB afin de proposer des pilotes plus robustes.
Les autres caractères spéciaux sont laissés à la touche Compose.

![La couche Typo d’Ergo‑L.](/img/ergol_1dk.svg)

**De notre point de vue** : la saisie de la plupart des caractères accentués
est plus intuitive avec Bépo. L’approche d’Ergo‑L permet d’éviter les extensions
de doigts mais nécessite un apprentissage.


Programmation
--------------------------------------------------------------------------------

Avec son optimisation pour l’anglais et sa couche dédiée aux symboles de
programmation en [AltGr]{.kbd}, Ergo‑L est de loin la disposition la plus
adaptée à la programmation. Comme pour les lettres en français et en anglais,
les symboles sont placés de façon à faciliter les enchaînements et éviter les
touches répétées sous les auriculaires.

![La couche Symboles d’Ergo‑L.](/img/ergol_altgr.svg)

La touche [AltGr]{.kbd} reste facultative, les symboles étant également
disponibles [aux emplacements du QWERTY ANSI](/#héritage-qwerty-us), une
disposition de clavier perçue comme efficace pour cet usage.


Variantes de Bépo
--------------------------------------------------------------------------------

De par son ancienneté, [Bépo][] a vu naître [de nombreuses variantes
libres](https://bepo.fr/wiki/Variantes_du_b%C3%A9po) qui ont repris la
philosophie initiale :

- toutes les voyelles à gauche (approche Dvorak) ;
- les lettres sont étalées sur toutes les colonnes du clavier ;
- les chiffres restent en Shift.

Et très logiquement, ces variantes présentent les mêmes défauts d’ergonomie :

- compatibilité délicate avec la quasi-totalité des claviers ergonomiques ;
- surcharge importante de l’auriculaire droit ;
- perte des raccourcis claviers positionnels.

[Optimot][] est une variante non-libre de Bépo qui l’optimise très nettement :
le taux de digrammes de même doigt est divisé par deux en anglais et par trois
en français ! Mais les défauts d’ergonomie restent les mêmes, ou ne sont
atténués que très marginalement :

- les lettres excentrées posent toujours le même problème de compatibilité avec
  les claviers ergonomiques ;
- la charge de l’auriculaire droit est diminuée en anglais mais reste
  strictement identique pour le français littéraire (11.2 %) et s’accroît dès
  que l’on utilise des symboles de programmation, dont l’accès recommandé par
  l’auteur se fait via une touche morte placée sous l’auriculaire en extension.

<!-- https://canary.discord.com/channels/794732334879473684/1202877504822579240/1212864335181906011 -->
*[EDIT] :* l’auteur d’Optimot précise qu’il mesure 10.3 % de charge sur
l’auriculaire droit et non 11.2 % comme vu par notre analyseur, mais fait valoir
son droit au secret concernant le corpus et la méthode utilisés. Cela reste
beaucoup trop élevé à notre avis — à comparer aux 6.9 % pour Ergo‑L. *[/EDIT]*

**De notre point de vue**, les deux dispositions portent bien leur nom :

- Optimot est une **opti**misation de Bépo qui apportera un gain de confort aux
  utilisateurs satisfaits de Bépo ;
- Ergo‑L est **ergo**nomique avant tout, et apportera une solution radicale aux
  personnes qui ont des difficultés avec Bépo.


[1DFH]: /#dfh-1u-distance-from-home.
[ergonomique avant tout]: /#ergonomique-avant-tout)

[bépo]:      https://bepo.fr
[dvorak]:    https://fr.wikipedia.org/wiki/Disposition_Dvorak
[workman]:   https://workmanlayout.org
[colemak]:   https://colemak.com
[optimot]:   https://optimot.fr
[lafayette]: https://qwerty-lafayette.org
