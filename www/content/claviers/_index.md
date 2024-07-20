+++
title = "Claviers ergonomiques"

[params]
hideSummaryOfChildPages = true
+++

<style>
.toc ul { margin: 0; }
.toc ul ul { display: flex; flex-direction: row; padding: 0; }
.toc li li { flex: 1; list-style-type: none; margin: 1em 1em 0 0; text-align: center; }
@media (max-width: 480px) {
  .toc ul ul { flex-direction: column; }
  .toc li li img { width: 240px; }
}
</style>
:::{.toc .highlight}
- [full-size][] : les claviers historiques
- [compacts][] : les géométries ergonomiques par excellence !
  - [![](compacts/4x6.svg)][4×6] <br> [4×6][]
  - [![](compacts/3x6.svg)][3×6] <br> [3×6][]
  - [![](compacts/3x5.svg)][3×5] <br> [3×5][]
<!-- - [Arsenik][] : pour utiliser un clavier standard comme un 3×5 -->
:::


Contraintes matérielles
-------------------------------------------------------------------------------

Les claviers ergonomiques ont été pensés pour QWERTY ; Ergo‑L a été conçu en
tenant compte des contraintes de ces claviers, mais ça n’est pas le cas d’AZERTY
et encore moins de Bépo.

### Les limitations d’AZERTY

La quasi-totalité des claviers ergonomiques, par recherche de symétrie et pour
limiter les extensions de doigts, n’ont que deux colonnes de touches par
auriculaire — voire une seule.

Pour AZERTY, le passage à 2 colonnes sous l’auriculaire droit se fait sans trop
de problème : il suffit de déplacer trois touches de symboles ([*]{.kbd}
[$]{.kbd} [=]{.kbd}), [Entrée]{.kbd}, [Backspace]{.kbd}. Un effort d’adaptation
est requis mais tous les mots continuent à être écrits de la même façon.

Les symboles présents sur les touches [*]{.kbd} [$]{.kbd} [=]{.kbd} doivent être
placés sur un <i lang="en">layer</i>. AZERTY étant particulièrement malcommode
pour les symboles de programmation, on en profitera pour créer un layer dédié en
remplacement de la touche AltGr.

### Les limitations de Bépo <small>(Béopy, Optimot…)</small>

Pour Bépo et ses variantes c’est plus délicat car il faut déplacer des
**lettres**, ce qui oblige à changer de technique de saisie quand on passe d’un
clavier standard à un clavier ergonomique. Pour minimiser la gêne et conserver
[W]{.kbd} sous l’auriculaire droit, il faut passer [Shift]{.kbd} sous un pouce —
ce qui n’est pas un changement anodin non plus.

Les variantes de Bépo ont toutes le même problème, lié à la présence de deux
lettres sur la 7<sup>e</sup> colonne du clavier ISO. Optimot se targue d’être
conçu « pour tous les claviers » mais a les mêmes limitations — et détaille même
sur son site quelles adaptations effectuer pour chaque type de clavier.

Par ailleurs, on ne pourra pas fusionner les symboles déplacés avec la couche
AltGr, dont les meilleurs emplacements sont déjà pris pour des besoins
typographiques : `Œ`, `Æ`, `Ù`, `€`, le tréma mort, tous sont sur les touches
confortables en main gauche. Il faut donc définir un layer supplémentaire.

### L’approche Ergonaute <small>(Ergo‑L, Erglace, Lafayette, Bépolar…)</small>

Ergo‑L a été pensé dès le début pour tous les claviers, ergonomiques ou non.
L’approche [1DFH][] permet de saisir **toutes** les lettres utilisées en
français sans recourir à [AltGr]{.kbd}, ni à aucune touche qui ne soit pas
disponible sur un clavier [3×5][].

Pour fonctionner sur un clavier compact ([4×6][], [3×6][], [3×5][]), Ergo‑L n’a
donc besoin que de deux touches de pouce :

- une touche [AltGr]{.kbd}, pour accéder à la couche de symboles ;
- une touche [NavNum]{.kbd}, pour accéder à une couche contenant les touches de
  navigation (flèches, page up/down, home/end…) et un pavé numérique.

Et c’est tout.

### Adaptations typiques

<style>
.cmp table { margin: 0 auto; border-collapse: collapse; text-align: center; }
.cmp table,
.cmp td { border: 1px solid var(--fg-banner-border); padding:  0  0.5em; }
.cmp th { border: 1px solid var(--fg-banner-border); padding: 1em 0.5em; }
.cmp th { background-color: var(--bg-banner); font-weight: normal; }
.cmp ul { margin: 0.6em 0; padding-left: 1em; text-align: left; }
</style>
:::{.cmp style="overflow: scroll;" }
<table>
  <tr>
    <th></th>
    <th> AZERTY </th>
    <th> Bépo   </th>
    <th> Ergo‑L </th>
  </tr>
  <tr>
    <td style="padding: 1em 0;"> [full-size][] </td>
    <td> selon modèle </td>
    <td> selon modèle </td>
    <td> aucune adaptation </td>
  </tr>
  <tr>
    <td> [4×6][] </td>
    <td><ul>
      <li> `*`, `$`, `=` </li>
      <li> [Entrée]{.kbd}, [Backspace]{.kbd} </li>
    </ul></td>
    <td><ul>
      <li> `W`, `Ç`, `%` </li>
      <li> [Entrée]{.kbd}, [Backspace]{.kbd} </li>
      <li> [Shift]{.kbd} sous chaque pouce </li>
      <li> [layer-taps][LT] </li>
    </ul></td>
    <td> aucune adaptation </td>
  </tr>
  <tr>
    <td> [3×6][] </td>
    <td> non compatible ⁽¹⁾ </td>
    <td><ul>
      <li> `W`, `Ç`, `%` </li>
      <li> tiret sur un layer </li>
      <li> symboles sur un layer à définir </li>
      <li> [Entrée]{.kbd}, [Backspace]{.kbd} </li>
      <li> [Shift]{.kbd} sous un pouce </li>
      <li> [layer-taps][LT] </li>
    </ul></td>
    <td> aucune adaptation </td>
  </tr>
  <tr>
    <td> [3×5][] </td>
    <td> non compatible ⁽¹⁾ </td>
    <td> non compatible ⁽¹⁾ </td>
    <td><ul>
      <li> [layer-taps][LT] </li>
      <li> [homerow-mods][HRM] </li>
    </ul></td>
  </tr>
</table>

<!-- do not remove the empty line above -->
:::

⁽¹⁾ On considère qu’une disposition est « non compatible » avec une géométrie de
clavier quand les lettres courantes du français ne peuvent plus tenir dans le
seul layer principal. C’est le cas d’AZERTY dès qu’on n’a plus de rangée de
chiffres, et de Bépo (et ses variantes) dès qu’on a moins de 2 colonnes sous
l’auriculaire droit.


Conseils d’achat
-------------------------------------------------------------------------------

### Vous n’avez pas *besoin* d’un clavier

Pour apprendre Ergo‑L ou n’importe quelle disposition de clavier, votre clavier
actuel suffit. Même s’il est imprimé en AZERTY ! L’ergonomie clavier débute avec
l’[apprentissage de la dactylographie][dactylo] : si vous ne savez pas taper à
10 doigts sans regarder, aucun clavier ergonomique ne vous sera utile.

<!--
Avec des logiciels libres comme [Kanata][] et en utilisant [Arsenik][] comme
base, vous pouvez aussi obtenir un gain d’ergonomie très proche du meilleur
clavier qui soit.
-->

### Vous avez *envie* d’un clavier ?

C’est bien normal. :-) De notre point de vue, un clavier est ergonomique si :

- **ses touches sont en colonnes**, pour faciliter la dactylographie et limiter
  les fautes de frappe ;
- il est équipé de contacts mécaniques, que l’on peut remplacer selon ses goûts
  et ses besoins ;
- il est programmable.

Il peut être splitté ou monobloc, c’est affaire de goûts : les versions
splittées permettent une plus grande variété de positions, les versions monobloc
sont plus faciles à prendre en main.

Les colonnes peuvent être alignées (géométrie ortholinéaire) ou décalées
verticalement (<i lang="en">col stagger</i>) pour compenser les différences de
longueur des doigts. Un stagger prononcé donnera du confort, notamment quand on
tape assez à plat, mais nécessite un temps d’adaptation.

Plus le clavier est compact, plus il est efficace et moins il est cher, au
détriment du temps d’adaptation.

### Quel <i lang="en">thumb cluster</i> ?

Pour qu’un clavier soit utilisable facilement, il faut **au moins trois touches
par pouce** qui soient bien accessibles ; quatre c’est mieux, cinq c’est large.

Les claviers avec seulement deux touches par pouce sont parfaits quand les
[layer-taps][LT] et [homerow-mods][HRM] sont maitrisés.

### Pour débuter : le [4×6][]

![[Sofle][], 58 touches (4×6+5)](compacts/4x6_ergol.svg)

C’est de loin le type de clavier ergonomique le plus vendu. Cette géométrie
fonctionne avec tous les layouts francophones :

- **triviale en Ergo‑L** et Lafayette — aucune adaptation requise, chiffres en
  direct ;
- facile en AZERTY, surtout avec une colonne centrale supplémentaire pour
  [Entrée]{.kbd} et [Backspace]{.kbd} ;
- possible en Bépo (et variantes), moyennant des adaptations plus conséquentes.

C’est déjà un clavier compact, il faudra donc passer par un [layer de
navigation][NavNum] pour accéder aux flèches par exemple. Et ce n’est pas un
défaut, bien au contraire : l’ergonomie clavier consiste à faire venir les
touches sous les doigts, plutôt que de déplacer ses doigts.

### Valeur sûre : le [42 touches][3×6]

![[Corne][], 42 touches (3×6+3)](compacts/3x6_ergol.svg)

Cette géométrie, avec [3×6][] touches par main et 3 touches par pouce,
correspond au plus grand clavier possible qui respecte l’approche [1DFH][] :
aucune touche n’est à plus d’une position d’écart de la position de repos des
doigts et des pouces.

**On peut tout à fait débuter en Ergo‑L avec ce type de clavier** : à peine
moins facile qu’un [4×6][] et *beaucoup* plus facile qu’un [3×5][], c’est un
clavier dont vous aurez l’usage très longtemps.

Attention, il sera nettement plus difficile d’accès en Bépo (Béopy, Optimot…) et
quasi inutilisable en AZERTY.


[full-size]: ./full-size
[compacts]:  ./compacts
[NavNum]:    ./compacts/#layer-navnum
[4×6]:       ./compacts/#kbd_4x6
[3×6]:       ./compacts/#kbd_3x6
[3×5]:       ./compacts/#kbd_3x5
[HRM]:       ./compacts/#homerow-mods
[LT]:        ./compacts/#layer-taps
[Arsenik]:   ./arsenik
[1DFH]:      /presentation/#dfh-1u-distance-from-home
[dactylo]:   /articles/apprendre_a_taper/

[Sofle]:     https://github.com/josefadamcik/SofleKeyboard
[Corne]:     https://github.com/foostan/crkbd
