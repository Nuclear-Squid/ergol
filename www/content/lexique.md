+++
title = "Lexique"
+++

<style>
  dt { font-weight: bold; }
  dd p { margin: 0.2em 0; }
  code { font-family: monospace; }
</style>

**🚧 en construction**


Ergonomie & Optimisation
--------------------------------------------------------------------------------

SFU (“Same Finger Usage”), SFB (“Same Finger Bigram”)

: ou « digramme de même doigt ». Quand deux lettres s’enchaînent avec un même
doigt, ce qui est source d’inconfort ou d’erreurs, notamment à haute vitesse.
 
SKU (“Same Key Usage”), SKB (“Same Key Bigram”)

: une répétition de même touche, e.g. pour produire `nn` avec n’importe quelle
disposition de clavier, ou `és` en Ergo‑L.

Extension

: quand un doigt doit atteindre une touche qui est soit sur une autre colonne
que la position de repos, soit à une distance supérieure à une touche.

Ciseau

: quand un bigramme nécessite un changement de rangée inconfortable

Roulement intérieur

: deux touches ou plus enchaînées sur une même main, dans le sens de
l’auriculaire vers l’index. C’est considéré comme l’enchaînement le plus
confortable qui soit.

Roulement extérieur

: deux touches ou plus enchaînées sur une même main, dans le sens de l’index
vers l’auriculaire.

Redirection

: trois touches enchaînées sur une même main avec un changement de direction,
e.g. [D]{.kbd}[S]{.kbd}[F]{.kbd} ou [K]{.kbd}[J]{.kbd}[L]{.kbd} en Azerty ou
Qwerty.

Mauvaise redirection

: une redirection où l’index n’intervient pas. L’un des pires enchaînements
faisables sur un clavier, sinon le pire.


Support logiciel
--------------------------------------------------------------------------------

<a name="scan-code-def">Scan code</a>

: Données envoyées par un clavier physique à un ordinateur lorsque l’on appuie
ou relâche une touche. Suite aux évolutions technologiques (PS/2, USB, etc.),
il existe plusieurs ensembles de scan codes.

: Souvent associé au seul code envoyé lors de la _pression_ d’une touche, en
particulier avec les scan codes « XT » ou « ensemble 1 ». Il permet alors
d’identifier la touche qui a été pressée dans un périphérique de saisie, au plus
bas niveau de l’OS.

<a name="key-code-def">Key code</a>

: Code identifiant une touche sur un clavier. Ce code est propre à chaque
système d’exploitation. Ce dernier se charge de convertir les différentes
conventions de _scan codes_ en _key code_, permettant ainsi de faire abstraction
de la technologie du clavier pour développer des dispositions de clavier.

<a name="point-de-code-def">Point de code</a> (<i lan="en">Code point</i>)

: TODO (cf. [point de code](https://fr.wikipedia.org/wiki/Point_de_code) sur Wikipedia)

<a name="modificateur-def">Modificateur</a>

: TODO

<a name="couche-def">Couche</a> (<i lang="en">layer</i>)

: TODO

Touche morte (<i lang="en">dead key</i>)

: TODO

### Windows

AHK

: TODO

KLC

: TODO

MSKLC

: TODO

Virtual Key (VK, touche virtuelle)

: Code de touche spécifique à Windows, de plus haut niveau que le key code.
Il est utilisé pour définir le placement des touches spéciales ainsi que le
comportement d’une touche lorsqu’elle est utilisée dans un raccourci clavier.


### macOS

keylayout

: TODO

Karabiner

: TODO


### Linux

#### Explication simplifée du processus : appui sur une touche → production de caractère

1. Le clavier produit un [scan code].
2. L’<abbr title="Operating System">OS</abbr> transforme le [scan code] en [keycode].
3. Le [keycode] est transformé en [keysym] selon le [groupe] les
   [modificateurs] actifs, ces derniers déterminant la [couche] active.
4. La [keysym] est transformée en caractère(s) par la méthode de saisie
   ([Compose] par défaut) si active, sinon en utilisant la table de
   conversion standard de XKB.

[scan code]: #scan-code-def
[keycode]: #keycode-xkb-def
[Compose]: #compose-def
[modificateurs]: #modificateur-def
[couche]: #couche-def
[groupe]: #group-xkb-def

#### Environnement

[X11]

: X est un protocole de système de fenêtrage. [X11] en est la onzième version
majeure.

[X11]: https://fr.wikipedia.org/wiki/X_Window_System

[X.Org]

: Le principal [serveur X][X11] utilisé sur Linux.

[X.Org]: https://fr.wikipedia.org/wiki/X.Org

Wayland

: Un protocole de système de fenêtrage, destiné à remplacer X11 qui n’est plus
maintenu. Bien qu’en développement depuis 2008, son implémentation dans les
environnements de bureau majeurs n’a commencé à être suffisante que dans les
années 2020.

[Wayland]: https://fr.wikipedia.org/wiki/Wayland

XKB (_X_ <em>K</em>eyboard <em>E</em>xtension)

: Un __[protocole][XKB protocol]__ défini comme extension de X11 et dédié à la gestion des
claviers.

: C’est aussi utilisé pour le [__format__ texte de configuration][XKB text format]
des dispositions clavier.

: Par abus de langage c'est aussi la __base de données__ des configurations clavier,
[`xkeyboard-config`][xkeyboard-config].

[XKB protocol]: https://www.x.org/releases/current/doc/kbproto/xkbproto.html
[XKB text format]: https://xkbcommon.org/doc/current/keymap-text-format-v1.html
[xkeyboard-config]: https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config

<a name="compose-def">Compose</a>

: Une __méthode de saisie__ (<i lang="en">input method</i> ou IM). C’est notamment
ce qui permet aux touches mortes système (autres que `1dk`) de fonctionner.
Elle porte ce nom car elle _compose_ – entendre : combine – plusieurs [keysyms]
en un[^composed-keysym] nouvel keysym.
Exemples : la séquence `◌́e` est transformée en `é`, `n~` en `ñ`, `+-` en `±` et
`<3` en `♥`.

: Une __[touche][touche Compose]__ qui active la _méthode de saisie_ Compose pour
les touches pressées à la suite. Cette touche n’est pas présente sur les claviers
physiques modernes, mais elle est peut être configurée dans l’OS avec les options
de clavier.

: La __[keysym]__ `<Multi_key>`, qui est placée sur la _touche_ Compose.

[keysym]: #keysym-def
[keysyms]: #keysym-def
[touche Compose]: https://fr.wikipedia.org/wiki/Touche_de_composition
[^composed-keysym]: Le cas le plus fréquent est _un_ keysym, mais il est possible
d’en produire plusieurs. C’est indispensable pour certains caractères qui
nécessitent plusieurs [points de code], comme « ė̄ » (`U+0117 + U+0304`), mais aussi
👩🏿‍🚀👩🏾‍🚀👩🏽‍🚀👩🏼‍🚀👩🏻‍🚀👩‍🚀, qui requiert au moins deux [points de code] pour chaque emoji.

[points de code]: #point-de-code-def

XCompose

: Une __[spécification][XCompose]__ de Compose pour les systèmes basés sur X11 et
Wayland. Il existe plusieurs implémentations: `XIM` (référence), `xkbcommon`,
`Gtk`, `Qt`, `ibus`, etc. Noter qu’il existe des différences entre ces
implémentations.

: Un __format__ pour configuer la méthode de saisie XCompose.

: Les __fichiers__ de configuration correspondants. En particulier :
  - `/usr/share/X11/locale/**/Compose` : les fichiers système, organisés par
    locale.
  - `~/.XCompose` : le fichier utilisateur par défaut.

[XCompose]: https://linux.die.net/man/3/xcompose

#### XKB

<a name="keycode-xkb-def">Keycode</a>

: Code identifiant une touche physique sur un clavier. Le code _brut_ (raw
keycode) est le code numérique issu du traitement bas niveau par le noyau, alors
que le code _symbolique_ est le nom donné dans les fichiers XKB pour faciliter
la configuration haut-niveau du clavier. On distinguera le code brut du _noyau_
de celui de XKB, ce dernier étant obtenu en ajoutant 8 au premier.<br/>
Exemple : sur un clavier QWERTY, le code brut noyau de la touche `Q` est
`16`[^code-brut-noyau], le code brut sur XKB est `16 + 8 = 24` et son code
symbolique est `AD01`[^code-symbolique-iso-9995].<br/>
Noter qu’un clavier QWERTY et un clavier AZERTY produisent habituellement des
keycodes identiques pour les touches situées au même emplacement : ainsi la
touche imprimée `Q` sur le clavier QWERTY produira le même keycode que la touche
imprimée `A` sur un clavier imprimé AZERTY. En effet, c’est la configuration du
clavier dans XKB et non le clavier lui-même qui définit la correspondance touche/
[keysym].

[ISO/IEC 9995-2]: https://en.wikipedia.org/wiki/ISO/IEC_9995#ISO/IEC_9995-2
[input-event-codes.h]: https://github.com/torvalds/linux/blob/90d35da658da8cff0d4ecbb5113f5fac9d00eb72/include/uapi/linux/input-event-codes.h#L91
[^code-brut-noyau]: Correspond à `KEY_Q` dans le fichier d’en-tête [`input-event-code.h`][input-event-codes.h].
[^code-symbolique-iso-9995]: Les codes symboliques sont suivent la norme [ISO/IEC 9995-2] pour les touches alpha-numériques.

<a name="keysym-def">Keysym</a>

: Code numérique identifiant un symbole sur le _capuchon_ d’une touche. Ce mot
vient de l’anglais « <i lang="en">key symbol</i> ». Les keysyms sont également
associées à des noms anglais pour faciliter leur utilisation. Exemples : `a`,
`agrave` pour « à », `Shift_L` pour la touche majuscule à gauche, etc.<br/>
À la différence des keycodes, les keysyms ne sont pas utilisés pour _identifier_
les touches physiques mais pour configurer le _résultat_ obtenu en pressant une
touche. Ainsi, la _touche_ `<Q>` d’un clavier imprimé QWERTY peut être configurée
pour produire le[^keysym-genre] keysym `q` ou `a` sur la couche de base, et les
keysyms `Q` ou `A` sur la couche masjcule, etc.

: Il existe différents types de keysyms :
  - _caractère :_ `a` et `A` pour les scripts latins, `gamma` « γ » et `GAMMA`
    « Γ » pour le grec, etc.
  - _touche morte :_ `dead_grave` et `dead_diaeresis`, qui correspondent respectivement
    à l’accent grave et au tréma. Une touche morte est une touche spéciale car elle ne
    génère pas de caractère, mais modifie le caractère de la touche qui est utilisée
    directement après elle. Ce comportement nécessite la fonctionnalité « Compose ».
  - _modificateur :_ une touche qui modifie l’effet des autres touches : par exemple
    `Shift_L`, `Control_R`, `Caps_Lock`. Les modificateurs utilisent un mécanisme
    différent des touches mortes et servent à accéder aux différentes couches d’une
    disposition, ainsi qu’à définir des raccourcis clavier.
  - _système :_ actions spéciales non comprises ci-dessus : flèche `Left`,
    `Pause`, `Escape`, `F1`, etc.

[^keysym-genre]: On devrait dire _un_ keysym car c’est un _symbole_ de touche,
mais _une_ keysym sonne peut-être mieux.

Key type

: TODO

Key Action

: TODO

<a name="group-xkb-def">Groupe</a>

: TODO

: Également appelé abusivement _disposition_ (<i lang="en">layout</i>).
TODO: développer.

Keymap

: TODO