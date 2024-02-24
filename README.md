[Ergo‑L](https://ergol.org/)
================================================================================

[**(in English hereinafter)**](#English)

Une disposition de clavier ergonomique optimisée pour le français, l’anglais et
le code.

- Disposition **optimisée pour le français _et_ l’anglais**;
- Couche AltGr optionnelle, optimisée pour l’enchaînement des symboles de
  programmation;
- **Conservation des raccourcis usuels** : <kbd>Ctrl-{Q,A,S,Z,X,V}</kbd>
  (<kbd>Ctrl-C</kbd> est décalé, mais reste faisable d’une main);
- Support de tous les caractères spéciaux utilisés en français (diacritiques,
  majuscules accentuées, lettres entrelacées, symboles de ponctuation…);
- **Chiffres en accès direct**.


English
--------------------------------------------------------------------------------

A Colemak-style layout for French-speaking users.


TL;DR:
--------------------------------------------------------------------------------

* a Colemak-style keyboard layout optimized for French and English;
* most common keyboard shortcuts are preserved (like in Colemak);
* use a dead key for the most frequent accented characters;
* use the AltGr layer for programming symbols.

This layout claims to be better than Bépo for French, better than Dvorak for
English and better than Qwerty for programming. [Check the stats !][1]

[1]: https://ergol.org/stats#/ergol/iso/en+fr


Layout
--------------------------------------------------------------------------------

![base layout](img/ergol_fr.svg)

The dead <kbd>★</kbd> key gives access to all acute accents, grave accents, cedillas, digraphs and quote signs you’ll need to write in proper French:

![dead key layout](img/ergol_1dk.svg)

… and the AltGr layer is fully dedicated to programming symbols.

![altgr layout](img/ergol_altgr.svg)

The default layout allows to write in English, French, German and Esperanto easily.

[More information on the website](https://ergol.org) (in French).


Install
--------------------------------------------------------------------------------

You’ll need the latest version of [Kalamine][2] to build your own layout. We
*highly* recommend using [pipx][5], once you have it installed (by following
their guide), you can just run the following command:

```bash
pipx install kalamine
```

Download the [layouts/ergol.toml][4] file in this repo and build the layout :

```bash
kalamine build ergol.toml
```

You’ll get a `dist` folder containing all of the drivers.

Then, to install Ergo‑L, follow the [install section of Kalamine’s repo][3],
and you should be good to go !

[2]: https://github.com/OneDeadKey/kalamine
[3]: https://github.com/OneDeadKey/kalamine#installing-distributable-layouts
[4]: https://github.com/Nuclear-Squid/ergol/blob/master/layouts/ergol.toml
[5]: https://github.com/pypa/pipx?tab=readme-ov-file#install-pipx


### Install (Linux only)

`xkalamine` is a linux‑specific tool (shipped with `kalamine`) to easily
install keyboard layouts on Linux. You can drop `sudo` if you use wayland, but
it’s required on Xorg.

```bash
sudo xkalamine install ergol.toml  # Install the layout
```

Then switch to Ergo‑L using the following command:

```bash
setxkbmap fr -variant ergol  # Switch your keyboard layout to ergol
```


Make Your Own !
--------------------------------------------------------------------------------

If you wish to modify the layout, the `layouts/*.{toml,yaml}` are human-readable
ASCII arts of the final layout. You can easily edit them, then run `make` (or
`make watch`) at the root of the repo to generate the `.json` files used to
benchmark layouts on the [stats page][1].

This repo contains all of the code for the [Ergo‑L website](https://ergol.org),
so you can run the page locally to try your prototypes !


License
--------------------------------------------------------------------------------

You are free to use, modifiy and redistribute the Ergo‑L keyboard layout.

There’s no such thing as “public domain” here in France, so we chose the
[WTFPL](http://wtfpl.net) because we could understand every word in it and we
can confirm it’s exactly what we have in mind:

>  0. You just DO WHAT THE FUCK YOU WANT TO.

Additionally, the tools that have been developed to create, optimize and build
this layout are available under the MIT license and maintained by the
[OneDeadKey](https://github.com/OneDeadKey) team.

The books we’ve used to evaluate this keyboard layout come from [Project
Gutenberg](https://www.gutenberg.org/).
