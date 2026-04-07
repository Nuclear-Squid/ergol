+++
title = "Installation"
aliases = ["lts"]

[params]
cssSheets = ["/css/keebs.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/keebs.js"]
footer = "propulsé par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++

{{<x-keyboard name="Ergo‑L" data="ergol" class="odk">}}


Téléchargement
--------------------------------------------------------------------------------

### Note pour les utilisateurices de claviers programmables

Il est très fortement recommandé d’installer le driver sur l’ordinateur et de
laisser le clavier en QWERTY dans QMK/ZMK/Vial. C’est le driver qui s’occupe de
la disposition, Ergo‑L ou autre, pas le clavier programmable. La seule
modification quasi indispensable est d’avoir AltGr sur une touche de pouce
accessible pour accéder aux symboles.

### Pilotes nomades : [ergol_nomade.zip][]

Une archive ZIP contenant les pilotes ne nécessitant pas de droits
d’administration, qui peuvent fonctionner depuis une clé USB. (Pour tous les
systèmes.)

### Windows : [ergol_kbd.exe][]

Exécuter l’installeur et relancer la session. La disposition de clavier
apparait dans la barre de langues (indicateur de la barre des tâches).

<details>

<summary>Ajouter la disposition installée dans la liste (Windows 10)</summary>

Note : il n’est normalement pas nécessaire de faire ces étapes avec le pilote
installé ci-dessus.

1. Dans le menu Démarrer, rechercher « Modifier les paramètres de langue et de
   clavier »

   ![](windows10/windows10_1.webp)
  
2. Cliquer sur « Options » sur « Français »

   ![](windows10/windows10_2.webp)

3. « Ajouter un clavier »
  
   ![](windows10/windows10_3.webp)

4. Il devrait y avoir Ergo‑L dans la liste, cliquer dessus
  
   ![](windows10/windows10_4.webp)

5. Ergo‑L est maintenant ajouté. On devrait voir en bas à droite une icône
   « FRA » ou « FRA FR » pour choisir le clavier s’il y en a plusieurs dans la
   liste

   ![](windows10/windows10_5.webp)

</details>

### macOS : [ergol.keylayout][]

Télécharger et enregistrer le fichier keylayout en lien ci-dessus dans
`/Library/Keyboard Layouts` et relancer la session. La disposition de clavier
est disponible dans les préférences système sous « Clavier », « Méthodes de
saisie », `+` (ajouter une nouvelle disposition), et enfin « Autres ».

On peut aussi l’enregistrer dans `~/Library/Keyboard Layouts`
(pour le seul utilisateur courant), mais la disposition ne sera pas
active au login.

Il est possible (et recommandé) d’utiliser [Karabiner][]
pour [inverser les touches](karabiner_settings.png) [⌘ Command]{.kbd}
et [⌥ Option]{.kbd} à droite, afin d’accéder plus facilement à la couche
de symboles.

### Linux : [ergol.xkb_symbols][]

Ergo‑L est disponible de base dans toutes les distributions Linux dotées
de `xkeyboard-config` en [version 2.42 ou
ultérieure](https://repology.org/project/xkeyboard-config/versions), notamment
Arch, Debian 13, Fedora 41, Gentoo, Manjaro, OpenMandriva 6.0, OpenSUSE
Tumbleweed, Slackware Current, Ubuntu 24.10.
<!-- Il a aussi été inclus dans Ubuntu 24.04 LTS (rétro-portage). -->

:::{.highlight}
⚠️ Ne choisissez la variante ISO qu’après avoir pris connaissance de ce que ça
implique dans la [section « angle mod »](#variante-en-a-angle-mod).
:::

Pour les autres distributions, copier ce pilote dans `xkb/symbols/custom` :

```bash
sudo wget -O ${XKB_CONFIG_ROOT:-/usr/share/X11/xkb}/symbols/custom \
https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.xkb_symbols
```

La disposition de clavier ainsi installée est disponible dans le gestionnaire de
préférences du bureau sous un nom générique (« A user-defined custom Layout »,
« Une disposition définie par l'utilisateur », etc.).

Si votre environnement de bureau utilise encore XOrg (X11) et pas Wayland,
Ergo‑L peut aussi être activé directement en ligne de commande :

```bash
setxkbmap custom
```

D’autres méthodes d’installation sont possibles, en passant le [fichier
source][] à [XKalamine][].

### Claviers personnalisés / ergonomiques

La bonne façon d’utiliser un clavier ergonomique est d’appliquer la disposition
côté PC (comme vu plus haut) et de ne configurer que les touches spéciales de
son clavier (Entrée, Backspace, Shift, AltGr, Alt, Ctrl…).

Par opposition, on appelle « émuler » un layout — par exemple « émuler Ergo‑L »
— le fait d’avoir le layout dans le clavier et l’ordinateur configuré
dans une autre dispostion qu’Ergo‑L, déjà disponible de base dans l’OS comme
QWERTY ou Azerty.

Programmer son clavier pour qu’il émule Ergo‑L sur un PC configuré en Azerty (ou
autre disposition) est **beaucoup** plus compliqué.

Il vaut mieux n’avoir recours à l’émulation qu’en cas de **dernier ressort** :
ordinateur totalement verrouillé (même pour le pilote nomade), administration
de nombreuses machines, ou autres besoins spécifiques.

Ceci étant dit, une version basique de l’émulation d’Ergo‑L au-dessus d’Azerty
ou Qwerty Intl est faite ici sur [ZMK pour le Quacken][émulation ZMK] et peut
servir de base pour être adaptée à d’autres claviers.

### Aide-mémoire : [cavalier.pdf][]

Une aide pour apprendre la dispo. À imprimer, plier et placer sur son bureau !


Variante en A (« <i lang="en">angle mod</i> »)
--------------------------------------------------------------------------------
### Principe

L’[angle mod][] est une permutation de touches sur les claviers **ISO
uniquement** (clavier ayant la touche [<]{.kbd} en bas à gauche sur Azerty).

L’assignation doigt/touche reste la même : 

- [Z]{.kbd} se fait toujours avec l’auriculaire gauche,
- [X]{.kbd} avec l’annulaire,
- [-]{.kbd} avec le majeur
- et [V]{.kbd} et [B]{.kbd} avec l’index.

L’idée est uniquement de gagner en confort : le poignet gauche s’aligne
avec le mouvement des doigts, il forme un A avec le poignet droit,
et les touches de la rangée du bas s’atteignent en repliant les doigts —
comme on le fait déjà avec la main droite.

![](angle_mod.svg)

Cela permet aussi d’avoir une touche [Backspace]{.kbd}au centre du clavier,
permettant d’effacer du texte sans quitter la position dactylo.

Si vous avez bien pris connaissance du fonctionnement de l’angle mod, voici les
pilotes pour :

- Windows : [ergol_kbd_angle_mod.exe][]
- Linux :
  - Si présente de base dans l’OS, utiliser la « variante ISO » ou
    « <i lang="en">ISO variant</i> ».
  - Sinon suivre les instructions de la [section d’installation
    Linux](#linux-ergol.xkb_symbols) avec [ergol_angle_mod.xkb_symbols][]
- macOS : [ergol_angle_mod.keylayout][]
- pilotes nomades : [ergol_nomade_angle_mod.zip][]

Il est aussi possible d’appliquer cet angle mod et bien d’autres
fonctionnalités via [kanata][] et la configuration [Arsenik][].


Résolution de problèmes
--------------------------------------------------------------------------------

Vous avez des questions ou des problèmes avec les pilotes ? Consultez notre
[FAQ] !


Astuces
--------------------------------------------------------------------------------

### Disposition clavier par défaut sur Windows

1. Rechercher dans le menu Démarrer « Paramètres avancés de clavier »
2. Dans « Remplacer la méthode d’entrée par défaut » : choisir sa dispo préférée
  dans le menu déroulant


Licence
--------------------------------------------------------------------------------

[WTFPL](http://wtfpl.net/) – Do What the Fuck You Want to Public License.


[fichier source]:              /keymaps/fr/ergol.toml
[cavalier.pdf]:                cavalier.pdf
[ergol_nomade.zip]:            https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_nomade.zip
[ergol_kbd.exe]:               https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_kbd.exe
[ergol.keylayout]:             https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.keylayout
[ergol.xkb_symbols]:           https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.xkb_symbols
[ergol_nomade_angle_mod.zip]:  https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_nomade_angle_mod.zip
[ergol_kbd_angle_mod.exe]:     https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_kbd_angle_mod.exe
[ergol_angle_mod.xkb_symbols]: https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_angle_mod.xkb_symbols
[ergol_angle_mod.keylayout]:   https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_angle_mod.keylayout
[XKalamine]:                   https://github.com/OneDeadKey/kalamine#xkalamine
[Karabiner]:                   https://karabiner-elements.pqrs.org
[émulation ZMK]:               https://github.com/Nuclear-Squid/zmk-keyboard-quacken/pull/54

[Arsenik]:                     /claviers/arsenik/
[kanata]:                      https://github.com/jtroo/kanata
[angle mod]:                   https://colemakmods.github.io/ergonomic-mods/angle.html
[FAQ]:                         /ressources/faq
