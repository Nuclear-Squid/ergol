+++
[params]
extraCss  = ['/css/demo.css']
jsModules = ['js/x-keyboard.js']
jsScripts = ['js/demo.js', 'js/svg.js']
+++

{{< x-keyboard
    src="ergol"
    name="Ergo‑L"
    download="lts"
    image="img/ergol.svg" >}}

## Objectifs

- disposition **optimisée pour le français et l’anglais**
- couche AltGr optionnelle, optimisée pour l’enchaînement des symboles de
  programmation
- **conservation des raccourcis usuels** : [Ctrl]{.kbd}‑{[Q]{.kbd}, [A]{.kbd},
  [S]{.kbd}, [Z]{.kbd}, [X]{.kbd}, [V]{.kbd}} ([Ctrl]{.kbd}‑[C]{.kbd} est
  décalé, mais reste faisable d’une main).
- support de tous les caractères spéciaux utilisés en français (diacritiques,
  majuscules accentuées, lettres entrelacées, symboles de ponctuation…)
- **chiffres en accès direct**


## Optimisation

L’optimisation d’une disposition de clavier francophone comprend deux difficultés :

- le placement des lettres, selon une méthode de type Dvorak ou Colemak ;
- la gestion des caractères accentués — accès direct, [AltGr]{.kbd}, touche morte ?

<abbr title="trop long ; pas lu :">TL;PL</abbr>: Ergo‑L est une disposition
optimisée façon [Colemak][1] / [Workman][2], utilisant une touch morte de type
[Lafayette][3] pour les caractères accentués.

Ergo‑L est meilleur que Bépo pour le Français, meilleur que Dvorak pour
l’Anglais et meilleur que Qwerty pour la programmation !


<a href="stats/#/ergol/iso/fr">

![fréquence des touches en français](img/ergol_fr.svg)

</a>
<a href="stats/#/ergol/iso/en">

![fréquence des touches en anglais](img/ergol_en.svg)

</a>


### Placement des lettres

Il y a eu plusieurs projets anglo-saxons d’optimisation du clavier, tous
basés sur un réarrangement des touches du Qwerty visant à :

- maximiser l’alternance des mains lors de la frappe ;
- répartir les touches de façon équitable sur les deux mains ;
- utiliser en priorité la rangée centrale, puis haute, puis inférieure ;
- en cas de non-alternance des mains sur un digramme, diriger la frappe vers le
  centre du clavier ce qui sollicite davantage les doigts les plus habiles à
  savoir l’index et le majeur.

Le plus connu et le plus ancien (finalisé en 1932) est [Dvorak][6].
Particularité : toutes les voyelles sont sous la main gauche. Mais avec la
généralisation de la bureautique, les raccourcis claviers
[Ctrl]{.kbd}‑{[Q]{.kbd}, [A]{.kbd}, [S]{.kbd}, [Z]{.kbd}, [X]{.kbd}, [C]{.kbd},
[V]{.kbd}} sont devenus indispensables et les projets récents d’optimisation de
disposition clavier ont cherché à les préserver.

- C’est notamment le cas de [Colemak][1], qui revendique une meilleure
  efficacité que Dvorak tout en préservant les raccourcis usuels — sauf
  [Ctrl]{.kbd}‑[S]{.kbd}, décalé d’une colonne.
- La disposition [Workman][2] vise à améliorer Colemak, notamment en limitant
  les mouvements horizontaux des doigts. Là encore, les raccourcis sont
  préservés — sauf [Ctrl]{.kbd}-{[C]{.kbd}, [V]{.kbd}}, décalés d’une colonne.

Ergo‑L reprend les principes de Colemak et Workman et concerve la plupart des
raccourcis usuels. [Ctrl]{.kbd}‑[C]{.kbd} est déplacé mais reste accessible
d’une main. Nous pensons que le gain en ergonomie justifie ce décalage.


### Polyvalence français / anglais

Les dispositions Dvorak, Colemak et Workman sont optimisées pour l’anglais
exclusivement. Les dispositions francophones [Dvorak-fr][5] et [Bépo][4]
appliquent au français le principe de Dvorak (donc sans support des raccourcis
claviers usuels), quitte à devenir pénalisantes pour l’anglais.

Pourtant, à une exception près, les 9 lettres les plus fréquentes sont les mêmes
en français (ESANITRUO) et en anglais (ETAOHNISR) :

<!-- Le nombre de `-` détermine la largeure de la colonne dans le rendu final -->
<!-- (Parce que Pandoc est ultra putain de classe) -->
:::{ style="font-size: small; margin: 0 3em" }
|      |       E |       S |       A |       N |       I |       T |       R |       U |       O |       H |
|    -:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|**fr**| 14.44 % |  7.25 % |  7.14 % |  6.78 % |  6.74 % |  6.74 % |  6.52 % |  6.16 % |  5.29 % |  1.06 % |
|**en**| 11.72 % |  6.15 % |  7.97 % |  6.63 % |  6.50 % |  9.04 % |  5.33 % |  2.68 % |  7.85 % |  6.71 % |
:::

Ergo‑L place donc ces lettres aux emplacements les plus confortables (au sens de
Workman) et fait en sorte qu’aucun enchaînement fréquent en français ou en
anglais ne soit rédhibitoire. On obtient donc une efficacité supérieure à Bépo
ou Dvorak-fr, sans sacrifier le code ni l’anglais.


### Gestion des accents

Azerty, [Dvorak-fr][5] et [Bépo][4] gèrent les caractères accentués de façon
assez similaire :

- certaines lettres comme [ÉÈÀÇ]{.kbd} sont accessibles directement ;
- l’accent circonflexe et le tréma sont faits avec une touche morte (le tréma
  nécessitant *en plus* [AltGr]{.kbd} avec Bépo) ;
- certains caractères nécessitent la touche [AltGr]{.kbd}, ce qui complique les
  enchaînements : [Œ]{.kbd}, [Æ]{.kbd}, points de suspension… et même [Ù]{.kbd}
  pour Bépo.

C’est la source de deux défauts majeurs dont Qwerty est exempt :

- les chiffres nécessitent [Shift]{.kbd}, ce qui rend fastidieuse la saisie de
  nombres ;
- certaines lettres ne sont pas accessibles dans la zone confortable des 3×10
  touches sous les chiffres, ce qui impose des extensions de doigt :
  [ÉÈÀÇ]{.kbd}  pour Azerty, [ÈZW]{.kbd}   pour Dvorak-fr, [MZWÇÊ]{.kbd} pour
  Bépo.

Pour éviter cela, Ergo‑L utilise une touche morte de type [Qwerty-Lafayette][3]
pour tous les caractères accentués et ponctuations spéciales. Cela occasionne
environ 4 % de frappes supplémentaires pour un texte francophone, ce qui est
négligeable comparé au gain de confort que cela apporte. La touche [AltGr]{.kbd}
peut ainsi être dédiée aux seuls symboles de programmation.


## Principes d’ergonomie

### Une approche moderne de la saisie de texte

Il n’y a pas de lettres à l’extérieur des 3×10 touches du centre pour éviter le
manque de confort et de précision causé par les extensions. Cela implique que :

- Les lettres accentuées et ponctuations spéciales soient obtenues avec une
  touche morte :
    - c’est moins intuitif qu’une couche [AltGr]{.kbd}, mais favorise les
      enchaînements et l’apprentissage en mémoire musculaire.
    - La touche morte ajoute aux voyelles qui suivent un accent grave (ou les
      transforme en leur diacritique principal si elles n’ont pas d’accent
      grave).
    - Les accents circonflexes se font avec une touche à côté de la touche de la
      voyelle, et les trémas avec double touche morte, puis la voyelle. Ce n’est
      pas du tout intuitif, mais ça permet de garder tous les accents courants
      en accès rapide.
    - Faire shift + voyelle **après** la touche morte permet d’avoir les lettres
      accentuées en majuscule. Oubliez vos alt codes !
    - Une exception : le `é` se fait en touche morte → `s` pour garder
      l’enchaînement `ée` efficace.
- La couche AltGr (voir ci-dessous) est réservée aux symboles de programmation :
    - tous les symboles de programmation sont en AltGr. Accolades, chevrons et
      parenthèses sont sur les 6 touches les plus accessibles.
    - La disposition est optimisée pour les enchaînements fréquents en
      programmation : `-> >= </> != (); ~/ ['']` …

La touche morte et la couche AltGr rendent la disposition **compatible avec les
claviers ultra compacts** (33 touches minimum).

![La touche morte d’Ergo‑L.](img/ergol_1dk.svg)

![La couche AltGr d’Ergo‑L.](img/ergol_altgr.svg)

Les chiffres sont en accès direct, sans [Shift]{.kbd}, pour faciliter leur
enchaînement (= la saisie de nombres). Oubliez votre pavé numérique !

Les raccourcis usuels [Ctrl]{.kbd}‑{[Q]{.kbd}, [A]{.kbd}, [S]{.kbd}, [Z]{.kbd},
[X]{.kbd}, [V]{.kbd}} ont été conservés car le gain marginal d’ergonomie en
mettant une autre lettre à la place n’est pas suffisant pour compenser la perte
de ces raccourcis — loin s’en faut (une exception : [Ctrl]{.kbd}‑[C]{.kbd} qui a
permis un gain important d’ergonomie, et a été modifié de sorte à gêner le moins
possible).

Beaucoup d’attention a été portée sur les enchaînements de lettres, avec la
plupart des enchaînements fréquents qui se font soit avec une alternance main
gauche / main droite, soit avec un roulement intérieur (se terminant sur le
majeur ou l’index). Les lettres fréquemment doublées (e.g. [L]{.kbd}, [N]{.kbd}
et [M]{.kbd}) sont placées sous les index. **On privilégie le confort sur la
vitesse** : il est possible de taper vite avec n’importe quelle disposition de
clavier.


### Ergo‑L vs Bépo

Ergo‑L poursuit les mêmes objectifs que [Bépo][4] pour le français, mais d’une
façon différente.

- *Heatmap* :
    - Bépo est typé « Dvorak », i.e. les touches fréquentes sont étalées sur
      toute la *home row* ;
    - Ergo‑L est typé « Workman », i.e. on évite les deux colonnes du centre
      pour limiter les extensions de l’index.
- Charge des doigts :
    - Bépo charge surtout les index et les auriculaires (notamment l’auriculaire
      droit) ;
    - Ergo‑L répartit la charge sur tous les doigts, en mettant plus de charge
      sur les doigts forts (index, majeur) et en allégeant les auriculaires —
      surtout l’auriculaire droit, déjà très sollicité par [Shift]{.kbd} /
      [Entrée]{.kbd} / [Backspace]{.kbd}.
- Enchaînements :
    - Bépo privilégie les accès directs et étale les lettres sur tout le
      clavier, quitte à requérir des extensions de doigts ([MZWÇÊ]{.kbd}) ou
      l’utilisation de [AltGr]{.kbd} (`ù`, tréma, ponctuation…) ;
    - Ergo‑L privilégie la fluidité et ne place aucune lettre hors de la zone
      principale de 3×10 touches ou dans la couche [AltGr]{.kbd}.
- Typographie :
    - Bépo permet une typographie soignée à condition de s’en donner la peine
      (beaucoup de symboles en [AltGr]{.kbd}) ;
    - Ergo‑L hérite du Qwerty-Lafayette la facilité de soigner la typo — les
      ponctuations spéciales sont toutes derrière la touche morte, comme
      l’apostrophe typographique en touche morte + espace, le point médian en
      touche morte + virgule, le point de suspension en touche morte + point,
      etc.
- <abbr title="La proportion totale d’enchaînements effectués avec le même
  doigt, un type d’enchaînement très inconfortable"> SFU (same finger usage)
  </abbr> :
    - Bépo a environ 2.55% de SFU en Français, dont la moitié sont retrouvés sur
      l’index gauche, qui est déjà trop chargé (23% de la charge totale), et
      0.3% se trouvent sur l’auriculaire gauche, trop pour un doigt aussi
      faible. De plus, une grande partie des touches doublées se trouvent sur
      l’auriculaire droit (et souvent en extension !)
    - Ergo‑L n’a que 1.36% de SFU en Français, et aucun doigt ne fait trop
      d’effort. Les auriculaires n’ont pratiquement pas de touches doublées.

<!-- Bon, j’ai beau adorer pandoc-md, ce tableau il *reste en HTML* -->
<table>
  <caption style="caption-side: bottom">
    Comparaison des charges des doigts entre Ergo‑L et Bépo<br>
    <small> (cliquer sur l’image pour plus d’infos) </small>
  </caption>
  <tr>
    <th></th>
    <th> Ergo‑L </th>
    <th> Bépo </th>
  </tr>
  <tr>
    <th> fr </th>
    <td> <a href="stats/#/ergol/iso/fr"><img src="img/charge_ergol_fr.png"/></a> </td>
    <td> <a href="stats/#/bepo/iso/fr"> <img src="img/charge_bepo_fr.png" /></a> </td>
  </tr>
  <tr>
    <th> fr<br>en </th>
    <td> <a href="stats/#/ergol/iso/en+fr"><img src="img/charge_ergol_en_fr.png"/></a> </td>
    <td> <a href="stats/#/bepo/iso/en+fr"> <img src="img/charge_bepo_en_fr.png"/></a>
    </td>
  </tr>
  <tr>
    <th> en </th>
    <td> <a href="stats/#/ergol/iso/en"><img src="img/charge_ergol_en.png"/></a> </td>
    <td> <a href="stats/#/bepo/iso/en"> <img src="img/charge_bepo_en.png" /></a> </td>
  </tr>
</table>


### Expériences rejetées et évolutions possibles

Le layout est encore en cours de développement, notamment pour corriger certains
enchaînements inconfortables, comme `if` et `my`. Vous pouvez participer aux
travaux en rejoignant le [serveur Discord](https://discord.gg/5xR5K3nAFX) dédié.

On a envisagé par le passé de placer le [E]{.kbd} sous l’index, comme en Bépo,
parce que c’est la lettre la plus fréquente en français ; mais cela ruine
l’équilibre de la charge des doigts et complique beaucoup d’enchaînements. De
même, on a essayé de mettre toutes les voyelles d’un côté (comme Dvorak ou Bépo)
mais cela engendrait plus de problèmes que cela n’en résolvait.


## Licence

[WTFPL](http://wtfpl.net) – Do What the Fuck You Want to Public License.

[1]: https://colemak.com
[2]: https://workmanlayout.org
[3]: https://qwerty-lafayette.org
[4]: https://bepo.fr
[5]: https://www.algo.be/ergo/dvorak-fr.html
[6]: https://fr.wikipedia.org/wiki/Disposition_Dvorak
