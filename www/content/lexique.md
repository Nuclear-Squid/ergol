+++
title = "Lexique (WiP)"
+++

<style>
  dt { font-weight: bold; }
  dd p { margin: 0.2em 0; }
  code { font-family: monospace; }
</style>


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

Scan code

: Données envoyées par un clavier physique à un ordinateur pour lorsque l’on
appuie ou relâche une touche. Suite aux évolutions technologiques (PS/2, USB,
etc.), il existe plusieurs ensembles de scan codes.

: Souvent associé au seul code envoyé lors de la _pression_ d’une touche, en
particulier avec les scan codes « XT » ou « ensemble 1 ». Il permet alors
d’identifier la touche qui a été pressée dans un périphérique de saisie, au plus
bas niveau de l’OS.

Key code

: Code identifiant une touche sur un clavier. Ce code est propre à chaque
système d’exploitation. Ce dernier se charge de convertir les différentes
conventions de _scan codes_ en _key code_, permettant ainsi de faire abstraction
de la technologie du clavier et ainsi développer des dispositions de clavier.

Modificateur

: TODO

Couche (layer)

: TODO

Touche morte (dead key)

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

X11

Wayland

XKB

: Un protocole et une extension de X11.

: C'est aussi utilisé pour le format texte de configuration des dispositions.

: Par abus de langage c'est aussi la base de données des configurations clavier,
`xkeyboard-config`.

XCompose

: une IME, un format et les fichiers système correspondant. C’est notamment ce
qui permet aux touches mortes système (autres que `1dk`) de fonctionner.
