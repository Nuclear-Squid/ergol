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


Outils logiciels
--------------------------------------------------------------------------------

### Windows

AHK

KLC

MSKLC


### macOS

keylayout

Karabiner


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
