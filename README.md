Ergo‑L
================================================================================

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

You’ll need the latest version of [Kalamine][2] to build your own layout:

```bash
pip install kalamine
```

Download the [layouts/ergol.toml][4] file in this repo and build the layout :

```bash
kalamine ergol.toml
```

You’ll get a `dist` folder containing all of the drivers.

Then, to install Ergo‑L, follow the [install section of Kalamine’s repo][3],
and you should be good to go !

[2]: https://github.com/fabi1cazenave/kalamine
[3]: https://github.com/fabi1cazenave/kalamine#installing-distributable-layouts
[4]: https://github.com/Nuclear-Squid/ergol/blob/master/layouts/ergol.toml


Install ErgoL under Arch Linux X.Org(with pyenv)
--------------------------------------------------------------------------------

### Create pyenv

```bash
python -m venv /path/to/pyenv      # Create a pyenv if you don't already have one
cd /path/to/pyenv/bin
sudo su                            
./python -m pip install kalamine --break-system-packages  # Install kalamine in the acutal pyenv
exit                               # Sortir du mode administrateur # Get out of admin mode

cd ~/.local/bin                    
ln -s /path/to/pyenv/bin/kalamine  # Create a link to kalamine
ln -s /path/to/pyenv/bin/xkalamine # Create a link to xkalamine
```


### Install the layout

```bash
kalamine ergol.toml                # Build the layout
sudo xkalamine install ergol.toml  # Install the layout
```

### Set the layout

```bash
setxkbmap fr -variant ergol        # Set the layout
```

Make Your Own !
--------------------------------------------------------------------------------

If you wish to modify the layout, the `layouts/*.{toml,yaml}` are human-readable
ASCII arts of the final layout. You can easily edit them, then run `make` (or
`make watch`) at the root of the repo to generate the `.json` files used to
benchmark layouts on the [stats page][1].

This repo contains all of the code for the [Ergo‑L website](https://ergol.org),
so you can run the page locally to try your prototypes !
