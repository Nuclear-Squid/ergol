+++
title = "Arsenik"
+++

Une <i lang="en">keymap</i> sur 33 touches, pour les claviers de <i
lang="en">laptop</i> et les claviers compacts.

{{% keymap src="arsenik_hrm" alt="Arsenik, saveur HRM" /%}}

<!--more-->


Fonctionnement
-------------------------------------------------------------------------------

[Arsenik] conserve la base de l’approche [Miryoku], en utilisant deux types de
touches duales :

- des [layer-taps](#layer-taps) sous les pouces,
- des [homerow-mods](#homerow-mods) sous les positions de repos des doigts.

La particularité d’Arsenik est de pouvoir fonctionner sur n’importe quel clavier
ANSI ou ISO, et de permettre un [apprentissage pas-à-pas](#claviers-de-laptop).

### Layer-taps

Chaque touche de pouce assure deux fonctions :

- émettre [Backspace]{.kbd}, [Espace]{.kbd}, [Entrée]{.kbd} quand elle est
  pressée et relâchée rapidement (*tap*) ;
- activer [Shift]{.kbd}, [NavNum]{.kbd}, [AltGr]{.kbd} quand elle est maintenue
  (*hold*).

La couche [NavNum][] est la même que celle qui est proposée pour les claviers
compacts. Elle se déclenche après avoir maintenu la barre d’espace pendant
300 ms (par défaut), ce qui est suffisant pour éviter les déclenchements
intempestifs : lors d’une saisie rapide de texte, c’est bien [Espace]{.kbd} qui
est émis par défaut — mais uniquement au relâchement de la touche, ce qui peut
perturber au début.

[Shift]{.kbd} et [AltGr]{.kbd} sont considérés comme des layers au même titre
que [NavNum]{.kbd}, mais avec une différence de synchronisation importante :
pour produire le *tap*, elles doivent être pressées et relâchées sans qu’aucune
autre touche n’ait été activée, sans quoi c’est le *hold* qui est retenu.

On parle alors de comportement « **Space Cadet** » ou « <i lang="en">permissive
hold </i> » : **cela permet à [Shift]{.kbd} et [AltGr]{.kbd} d’être déclenchées
sans aucun délai susceptible de ralentir la saisie**, et les touches associées
en *tap* sont beaucoup moins susceptibles d’être actionnées par erreur.

Ces détails de synchronisation sont importants. En particulier, la durée de
temporisation est sensible : 300 ms est une bonne valeur pour débuter. On pourra
la réduire doucement au fil de la progression.

### Homerow-mods

De même que la couche NavNum est associée à [Espace]{.kbd}, les modifieurs
[Alt]{.kbd} [Ctrl]{.kbd} [Cmd]{.kbd} sont associés aux touches de repos des
deux mains : [N]{.kbd} [E]{.kbd} [S]{.kbd} pour la main gauche, [R]{.kbd}
[T]{.kbd} [I]{.kbd} pour la main droite.

![](hrm_pc.svg)

Sur macOS on effectue une permutation circulaire, pour garder les raccourcis
usuels [⌘Command]{.kbd}-[Z]{.kbd}[X]{.kbd}[C]{.kbd}[V]{.kbd} faisables à une
main comme sur PC :

![](hrm_mac.svg)

Là encore, la touche se comporte comme un *tap* tant qu’elle n’est pas maintenue
au moins 300 ms ; on accepte donc un délai avant d’activer un modifieur.

Plus ce délai est long et moins on est susceptible de déclencher des modifieurs
par erreur quand on ne relève pas les doigts suffisamment vite. [Shift]{.kbd} et
[AltGr]{.kbd} n’étant pas affectées par ce délai, on peut le rallonger sans que
ça ne gêne la vitesse ou le confort de saisie.

On se fait assez rapidement aux layer-taps sous les pouces, mais les
homerow-mods sont plus longs à acquérir : on a tendance à ne pas lever les
doigts assez vite, ce qui risque de déclencher des modifieurs par erreur.

Certain·e·s ne s’y font jamais ; d’autres contournent le problème avec des
[combo-mods][] ou des [callum-mods][]. Mais le jeu en vaut vraiment la
chandelle : le gain de confort est phénoménal ! En étant patient et en utilisant
des temporisations assez longues au début (300 ms voire 400 ms), on finit par
s’y faire et ça devient une évidence.

Pour creuser le sujet, [ce billet][precondition] fait référence de nos jours.


Claviers de <i lang="en">laptop</i>
--------------------------------------------------------------------------------

### Kanata

[Kanata][] est un logiciel libre et multiplateforme permettant de redéfinir le
comportement des touches du clavier. Il permet notamment l’application de
l’angle mod, la définition de layers, la configuration de layer-taps et
homerow-mods — et, plus généralement, de faire une grande partie de ce que font
les <i lang="en">firmwares</i> de claviers programmables comme QMK et ZMK.

Une configuration Kanata personnalisable est proposée ici : [arsenik.zip][]

Cette configuration a pour but de faire découvrir Arsenik étape par étape :

1. <i lang="en">Angle mod</i>
2. <i lang="en">Layer-taps</i>
3. <i lang="en">Homerow-mods</i>

Par défaut, seul l’angle mod est appliqué ; à vous d’activer les layer-taps et
les homerow-mods à votre rythme.

### 1. <i lang="en">Angle-mod</i>

On applique un [angle mod][], c’est-à-dire une permutation circulaire sur les six
touches de gauche de la rangée inférieure, afin de mieux respecter l’angle des
poignets et de se rapprocher d’une disposition ortholinéaire :

![Ergo‑L sur un clavier ISO](./ergol_iso.svg)

![Ergo‑L avec l’angle mod](./ergol_isoa.svg)

Les barres d’espace des laptops ayant généralement une largeur de 5u, cet
angle mod symétrise aussi le placement des deux autres touches de pouce, qui se
retrouvent dans l’alignement des majeurs.

### 2. <i lang="en">Layer-taps</i>

Une fois l'habitude prise de l’angle mod, il est temps d’activer les layer-taps :

- [AltGr]{.kbd} fait [Entrée]{.kbd} en tap ;
- [Alt]{.kbd} fait [Backspace]{.kbd} en tap ;
- un appui long sur [Espace]{.kbd} donne accès à la couche de navigation.

![Ergo‑L avec les layer-taps](./ergol_isoa_lt.svg)

On supprime ainsi les deux pires extensions ([Entrée]{.kbd} et [Backspace]{.kbd})
et on profite de la couche [NavNum][] à tout moment. Les mouvements
des mains sont ainsi fortement réduits.

### 3. <i lang="en">Homerow-mods</i>

Quand les layer-taps sont maitrisés, on peut activer les homerow-mods en
associant les modifieurs [Alt]{.kbd} [Ctrl]{.kbd} [Cmd]{.kbd} (ou [⌥]{.kbd}
[⌘]{.kbd} [\^]{.kbd} sous macOS) aux touches de repos des deux mains : [N]{.kbd}
[E]{.kbd} [S]{.kbd} pour la main gauche, [R]{.kbd} [T]{.kbd} [I]{.kbd} pour la
main droite.

![Arsenik sur un clavier ISO](./arsenik_iso.svg)

Cela permet d’avoir [Shift]{.kbd} sous le pouce gauche, supprimant ainsi le
dernier cas d’extension des auriculaires.


Claviers compacts programmables
--------------------------------------------------------------------------------

Arsenik est très naturel sur des claviers à barre d’espace centrale comme le
[Planck][], le [Preonic][], le [Reviung][]…

![Arsenik sur un Planck](arsenik_planck.svg)

Sur les claviers splittés, ou même les claviers monoblocs sans barre d’espace
centrale, [Selenium] est plus approprié. Les deux <i lang="en">keymaps</i>
sont quasi-identiques, seuls les <i lang="en">clusters</i> de pouces diffèrent.


Pour qui ?
--------------------------------------------------------------------------------

Pour les utilisateurs et utilisatrices avancées qui maitrisent ou souhaitent
apprendre les layer-taps et homerow-mods, Arsenik apporte l’essentiel de
l’ergonomie des claviers compacts aux claviers de laptop :

- pour s’habituer aux layer-taps et homerow-mods avant d’acheter un clavier
  ergonomique — ce faisant, on pourra directement choisir un clavier très
  compact, bien moins onéreux qu’un full-size et moins susceptible d’être
  remplacé au fil de la progression ;
- pour adopter une technique de saisie quasi identique entre son clavier de
  laptop et son clavier ergonomique.

Arsenik n’est pas réservé aux Ergonautes : il complète très bien Ergo‑L et les
autres dispositions de la famille Lafayette, mais il peut s’appliquer à d’autres
dispositions comme Azerty, Qwerty et tous les arrangements du Qwerty ANSI
(Dvorak, Colemak, Workman, MTGAP, ISRT, Sturdy…), en associant la touche
[AltGr]{.kbd} à une couche de symboles dédiée.


[NavNum]:        {{< relref "claviers/compacts/#layer-navnum" >}}
[Selenium]:      {{< relref "claviers/selenium" >}}
[arsenik.zip]:   https://github.com/OneDeadKey/arsenik/releases/download/0.2.0/arsenik-0.2.0.zip

[Preonic]:       https://olkb.com/collections/preonic
[Planck]:        https://olkb.com/collections/planck
[Reviung]:       https://github.com/gtips/reviung
[Ferris]:        https://github.com/pierrechevalier83/ferris

[Arsenik]:       https://github.com/OneDeadKey/arsenik
[Miryoku]:       https://github.com/manna-harbour/miryoku
[kanata]:        https://github.com/jtroo/kanata
[angle mod]:     https://colemakmods.github.io/ergonomic-mods/angle.html
[precondition]:  https://precondition.github.io/home-row-mods
[combo-mods]:    https://jasoncarloscox.com/writing/combo-mods/
[Callum-mods]:   https://github.com/qmk/qmk_firmware/blob/user-keymaps-still-present/users/callum/readme.md
