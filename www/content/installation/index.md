+++
title = "Ergo‑L 1.0"
aliases = ["lts"]

[params]
cssSheets = ["/css/keebs.css"]
jsModules = ["/js/x-keyboard.js"]
jsScripts = ["/js/keebs.js"]
footer = "propulsé par [x-keyboard](https://onedeadkey.github.io/x-keyboard)"
+++


<style>
  dt { font-weight: bold; }
  dd p { margin: 0.2em 0; }
  code { font-family: monospace; }
  pre { background-color: #6684; padding: 0.5em 2em; }
</style>

{{<x-keyboard name="Ergo‑L" data="ergol" class="odk">}}


Téléchargement
--------------------------------------------------------------------------------

[Pilotes nomades][]
: Une archive zip contenant les pilotes ne nécessitant pas de droits
d’administrations, peuvent fonctionner depuis une clé USB. (pour tous les
systèmes)

[Windows][]
: Exécuter l’installeur et relancer la session. La disposition de clavier
apparaît dans la barre de langues (indicateur de la barre des tâches).

[macOS][]
: Enregistrer dans `/Library/Keyboard Layouts` et relancer la session. La
disposition de clavier est disponible dans les préférences « Langue et Texte »,
onglet « Méthodes de saisie ».
: On peut aussi l’enregistrer dans `~/Library/Keyboard Layouts` (pour le seul
utilisateur courant), mais la disposition ne sera pas active au login.
: Il est possible (et recommandé) d’utiliser [Karabiner][] pour [inverser les
touches](karabiner_settings.png) [⌘ Command]{.kbd} et [⌥ Option]{.kbd} à droite,
afin d’accéder plus facilement à la couche de symboles.

[GNU/Linux][]
: Copier ce pilote dans `xkb/symbols/custom` : <pre>
    sudo wget -O ${XKB_CONFIG_ROOT:-/usr/share/X11/xkb}/symbols/custom \
    https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.xkb_symbols </pre>
: La disposition de clavier est disponible dans le gestionnaire de préférences du
bureau sous un nom générique (« custom layout », « disposition personnalisée »,
etc.). Sous XOrg on peut aussi l’activer directement en ligne de commande : <pre>
    setxkbmap custom </pre>
: D’autres méthodes d’installation sont possibles, en passant le [fichier
source][] à [XKalamine][].
: Remarque : avec certains bureaux (Gnome notamment), la touche morte [★]{.odk}
ne fonctionne que si Ergo‑L est défini comme disposition par défaut, i.e. en
haut de la liste dans les préférences clavier.


Licence
--------------------------------------------------------------------------------

[WTFPL](http://wtfpl.net/) – Do What the Fuck You Want to Public License.


[fichier source]:  /layouts/ergol.toml
[Pilotes nomades]: https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_nomade.zip
[Windows]:         https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol_kbd.exe
[macOS]:           https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.keylayout
[GNU/Linux]:       https://github.com/Nuclear-Squid/ergol/releases/download/ergol-v1.0.0/ergol.xkb_symbols
[XKalamine]:       https://github.com/OneDeadKey/kalamine#xkalamine
[Karabiner]:       https://karabiner-elements.pqrs.org
