+++
title = "Adaptations type « Lafayette »"
url = "/lafayette"

[params]
cssSheets = ["/css/keebs.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/keebs.js"]
footer = "outillé par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++

Une série de dispositions de clavier adaptées au français et/ou aux claviers
ergonomiques via une touche « Typo ».

:::{.highlight style="max-width: 32em;"}
- [QWERTY-Lafayette]
  <br/>Là où tout a commencé.
- [Colemak French Touch]
  <br/>Colemak avec l’accent français.
- [Bépolar]
  <br/>Bépo en 1DFH.
:::


QWERTY-Lafayette
--------------------------------------------------------------------------------

{{<x-keyboard name="QWERTY-Lafayette"
              data="lafayette" class="odk"
              href="https://qwerty-lafayette.org">}}

La disposition de clavier par laquelle tout a commencé ! Publiée en 2010,
Lafayette est une simple adaptation du QWERTY ANSI au français. Aucune
optimisation : on a [H]{.kbd}[J]{.kbd}[K]{.kbd}[L]{.kbd} sur la rangée de repos
(<i lang="en">home row</i>) et c’est très bien ainsi !

C’est cette disposition qui a introduit l’idée d’une [touche morte][2] « à tout
faire » et d’une [couche [AltGr]{.kbd}][3] entièrement dédiée aux symboles de
programmation. Cette couche de symboles a longtemps été présentée comme « à
personnaliser » : chaque utilisateur·ice était invité·e à se l’approprier et à
l’adapter à son langage de programmation de prédilection.

[Kalamine][] a alors été développé dans le but de faciliter la personnalisation
de Lafayette. Puis [x‑keyboard][] a suivi, afin de pouvoir tester ces
dispositions sans avoir à les installer. Et, de fil en aiguille, c’est ainsi que
les outils utilisés pour la mise au point d’Ergo‑L ont été développés.


Colemak French Touch
--------------------------------------------------------------------------------

{{<x-keyboard name="Colemak French Touch"
              data="colemak-french-touch" class="odk"
              href="https://codeberg.org/cedricr/colemak-french-touch">}}

Inspiré de QWERTY-[Lafayette][], Colemak French Touch applique le même principe
d’adaptation au français grâce à une [touche morte][2]. On obtient ainsi très
facilement l’intégralité des caractères accentués et typographiques nécessaires
à l’écriture d’un français soigné.

Par ailleurs, le Colemak original est assez mal adapté à l’écriture en français
à cause de l’empilement des voyelles [E]{.kbd} et [U]{.kbd} sur la même colonne.
En français, et contrairement à l’anglais, ces deux voyelles se suivent très
fréquemment, et leur usage sur le même doigt rend la frappe désagréable.

Par ailleurs, le [Y]{.kbd} a été déplacé d’une colonne pour libérer une touche
confortable comme touche morte.

Le reste des modifications sont des déplacements mineurs de symboles et signes
de ponctuation, pour optimiser les statistiques de la disposition.

Dans le monde Colemak, la disposition qui est sans doute la plus populaire
actuellement est la variante « DH », qui permet de limiter les
extensions des index vers la colonne intérieure. Colemak French Touch a fait le
choix de déplacer le [H]{.kbd}, mais de ne pas déplacer le [D]{.kbd}, afin de
préserver le raccourci [Ctrl]{.kbd}‑[V]{.kbd}. Il s’agit donc d’une variante
« HUY ».

Au final, on obtient une distribution avec d’excellentes statistiques, parfaite
pour les personnes qui tapent actuellement en Colemak mais qui ont un besoin
régulier d’écrire en français. Comme toutes les autres dispositions de la
famille, on conserve également la [couche facultative [AltGr]{.kbd}][3], parfaite
pour la programmation.


Bépolar
--------------------------------------------------------------------------------

{{<x-keyboard name="Bépolar"
              data="bepolar" class="odk"
              href="https://github.com/Ced-C/Bepolar">}}

Dérivé de Bépo, Bépolar s’adapte aux claviers compacts. C’est une disposition
s’appuyant sur des mécanismes modernes ([1DFH][1], [touche typographique][2])
afin d’améliorer le confort de frappe.

La disposition est _plus confortable_ que Bépo en français, et _meilleure_ que
Bépo pour l’anglais et la programmation avec sa [couche [AltGr]{.kbd}][3]
commune à Ergo-L.

C’est un bon moyen, pour un ou une bépoète, de tester l’approche 1DFH avec un temps
d’apprentissage record.


[1]: /presentation#dfh-1u-distance-from-home
[2]: /presentation#impeccable-en-français
[3]: /presentation#couche-symboles

[kalamine]:   https://github.com/OneDeadKey/kalamine
[x‑keyboard]: https://github.com/OneDeadKey/x-keyboard
[lafayette]:  https://qwerty-lafayette.org
