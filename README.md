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

### Edit Corpora

The different corpora can be found in [`data/corpus/`](data/corpus/), mainly
`fr.txt` and `en.txt` which can be edited to change the type of text used (for
instance if you don’t write like translaters of Miguel de Cervantes, or if you
want to test with your own emails).

If you have multiple source files, you can thus merge them using the
[`merge.py`](data/corpus/merge.py) script, for instance:

```bash
python3 merge.py file-fr‑1.txt … file-fr-n.txt > fr.txt
```

Once this is done, the statistics file can be generated using the
[`chardict.py`](data/corpus/chardict.py) script.
Note that for this step, you don’t want to have parasitic `.txt` files in the
`data/corpus` directory, or their stats will be generated as well.

```bash
python3 chardict.py
```

For the sake of completeness, we add that specifying a **single file** after the
command generates the `json` stat file for this specific corpus.

### Run a Local Server

Now, for the pages to be generated correctly and the javascript to be found at
the right place, this git repository has to be served at the root of your
domain.

You can do it with a full-fledged web engine, such as
[nginx](https://nginx.org/):

```ngnix
server {
  listen       9000;
  server_name  localhost;

  location / {
    root       <PATH_TO_REPOSITORY>;
    index      stats.html stats.htm;
  }
}
```

But you may not want to do that if you don’t already have a web engine installed
in your machine.

Fortunately, if you followed us so far, you have `python` installed, and
probably [`http.server`](https://docs.python.org/3.12/library/http.server.html)
as well.

You can thus use it to run your local instance of the Ergo‑L website:
```
python3 -m http.server --bind localhost 9000
```

And you can now access the stat page at
<http://localhost:9000/stats.html#/ergol/ol60/fr>!

You can now run `make watch` to have your edits on `toml` files live-updated… or
almost.
This solution doesn’t include live-reload.
You thus have to refresh the stat page after each change, but it’s quite usable
as is.
