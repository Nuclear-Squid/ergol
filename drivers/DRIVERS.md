# Génération des pilotes Ergo‑L

Cette documentation est à destination des maintainers du repository Git
d’Ergo‑L.


## Versionning

En tout 1er lieu, il faut déterminer quelle sera la nouvelle version des
pilotes.

Les pilotes Ergo‑L suivent le principe de [semver] par rapport à la disposition
clavier Ergo‑L. C’est-à-dire :

- La version *major* va incrémenter s’il y a un changement qui casse la couche
  alpha d’Ergo‑L (par exemple si on intervertit les lettres `A` et `B`) ou la
  couche 1DK pour les caractères accentués. Ce genre de changement nécessite un
  réapprentissage conséquent pour l’ergonaute. À priori on ne devrait jamais
  être dans ce cas-ci pour Ergo‑L, la disposition étant finie.
- La version *minor* va incrémenter s’il y a un changement léger du placement
  de touches dans les couches secondaires (Altgr, Shift+Altgr, 1DK sur les
  caractères non accentués) ou un ajout ne changeant pas la façon de faire les
  caractères existants.
- La version *patch* va incrémenter pour toute correction des pilotes, mais non
  liée au changement de la disposition Ergo‑L.

Par exemple : si les pilotes sont en 1.0.2 et que l’on décide de déplacer le
point médian, on passera donc en 1.1.0 selon le principe énoncé ci-dessus.

Autre information importante : même si rien n’a changé sur un des pilotes (par
exemple, il y a une correction sur le pilote Windows mais pas Linux ou macOS),
on reprend pour chaque nouvelle release tous les pilotes précédents. Avec ou
sans correction, on garde une release « complète » pour ne pas forcer
l’utilisateurice à chercher dans les versions précédentes le binaire qui
l’intéresse.


## Génération avec Kalamine

Pour créer une nouvelle release des pilotes Ergo‑L, il faut utiliser
[Kalamine].

Le TOML d’Ergo‑L est versionné dans [keymaps/fr/ergol.toml](./keymaps/fr/ergol.toml).

- Aller dans le repertoire `keymaps/fr/` de ce repository, et lancer la
  commande suivante :
  ```sh
  kalamine build ergol.toml
  ```
- On obtient un répertoire `dist/` contenant les fichiers suivants :
  - ergol.ahk
  - ergol.json
  - ergol.keylayout
  - ergol.klc
  - ergol.svg
  - ergol.xkb_keymap
  - ergol.xkb_symbols
- Les fichiers suivants ne sont pas utilisés, on peut les supprimer :
  - ergol.json
  - ergol.svg
  ```sh
  rm dist/ergol.json dist/ergol.svg
  ```
- Renommer le répertoire `dist/` en `ergol/` (ce sera notre répertoire de
  travail)
  ```sh
  mv dist ergol
  ```
- Générer les pilotes angle-mod avec la commande suivante :
  ```sh
  kalamine build ergol.toml --angle-mod
  ```
- De même, dans le répertoire `dist/` créé, les fichiers suivants ne sont pas
  utilisés, on peut les supprimer :
  - ergol.json
  - ergol.svg
  ```sh
  rm dist/ergol.json dist/ergol.svg
  ```
- Dans `ergol/`, créer les répertoires suivants, ils contiendront le nécessaire
  pour faire les 2 archives nomades :
  - `ergol_angle_mod_nomade/`
  - `ergol_nomade/`
  ```sh
  mkdir ergol/ergol_angle_mod_nomade ergol/ergol_nomade
  ```
- Copier le TOML dans les archives nomades :
  ```sh
  cp ergol.toml ergol/ergol_angle_mod_nomade/
  cp ergol.toml ergol/ergol_nomade/
  ```
- Déplacer les fichiers suivants :
  ```sh
  mv dist/ergol.keylayout ergol/ergol_angle_mod.keylayout
  mv dist/ergol.xkb_symbols ergol/ergol_angle_mod.xkb_symbols
  mv dist/ergol.ahk ergol/ergol_angle_mod_nomade/ergol_angle_mod.ahk
  mv dist/ergol.xkb_keymap ergol/ergol_angle_mod_nomade/ergol_angle_mod.xkb_keymap
  mv ergol/ergol.ahk ergol/ergol_nomade/
  mv ergol/ergol.xkb_keymap ergol/ergol_nomade/
  ```
- Copier le fichier suivant :
  ```sh
  cp ergol/ergol.keylayout ergol/ergol_nomade/
  ```


## Finitions

Avant de publier les pilotes, il est nécessaire d’en retoucher et finaliser
certains.


### AHK

- Éditer `ergol/ergol_angle_mod_nomade/ergol_angle_mod.ahk` pour rajouter
  Backspace sur la touche `B` et Delete en Shift+`B` :
  ```sh
  git apply ../../drivers/ergol_angle_mod.ahk.patch
  ```

Les étapes qui suivent nécessitent d’être sur Windows pour être réalisée.

- Les exécutables sont faits à partir de [Ahk2Exe] et de l’[icône Ergo‑L] :
  - TODO : expliquer en détail les étapes
  - `ergol/ergol_angle_mod_nomade/ergol_angle_mod.ahk` =>
    `ergol/ergol_angle_mod_nomade/ergol_angle_mod.exe`
  - `ergol/ergol_nomade/ergol.ahk` => `ergol/ergol_nomade/ergol.exe`

Ne pas utiliser AHK 2.0 car plante si on tape trop vite (à voir si ça a été
corrigé depuis ?). La version AHK 1.1 (version précise : 1.1.37.01 à confirmer)
est annoncée comme dépréciée mais c’est ce qu’utilise Ahk2Exe et est
recommandée pour Ergo‑L.


### KbdEdit

Cette étape nécessite d’être sur Windows pour être réalisée.

Il faut aussi la version premium de [KbdEdit], celle-ci a été achetée par
l’association Ergonautes, voir avec l’un de ses membres pour la suite des
étapes.

La version minimale de KbdEdit nécessaire pour ne pas avoir de bug sur les
pilotes Windows est la 26.02.0 (releasée le 28/02/2026).

On va utiliser le fichier `ergol/ergol.klc` en sortie de Kalamine pour le
pilote standard, et `dist/ergol.klc` pour le pilotes angle-mod, mais ils ne
seront pas inclus dans la release finale. À supprimer dès que les .exe sont
générés.

TODO Ash :
- documenter les étapes de la sortie de Kalamine jusqu’au .exe kbd
- touche Kana à la place de Altgr
  ([source](https://www.kbdedit.com/manual/ex13_replacing_altgr_with_kana.html))
- Backspace à la place de `B` et Delete sur Shift+`B` en angle-mod
- Créer les fichiers suivants dans `ergol/` :
  - `ergol_angle_mod_kbd.exe`
  - `ergol_kbd.exe`


### Angle-mod Linux

- Éditer `ergol/ergol_angle_mod.xkb_symbols` et
  `ergol/ergol_angle_mod_nomade/ergol_angle_mod.xkb_keymap` pour rajouter
  Backspace sur la touche `B` et Delete en Shift+`B` :
  ```sh
  git apply ../../drivers/ergol_angle_mod.xkb.patch
  ```


### Angle-mod macOS

- Éditer `ergol/ergol_angle_mod.keylayout` pour rajouter Backspace sur la
  touche `B` et Delete en Shift+`B`, ainsi que corriger l’inversion des touches
  ISO/numrow :
  ```sh
  git apply ../../drivers/ergol_angle_mod.keylayout.patch
  ```
- Copier le fichier corrigé dans l’archive nomade :
  ```sh
  cp ergol/ergol_angle_mod.keylayout ergol/ergol_angle_mod_nomade/
  ```

Note : il ne sera plus nécessaire de faire l’inversion des touches ISO/numrow
lorsque [cette issue Kalamine](https://github.com/OneDeadKey/kalamine/issues/229)
sera corrigée.


### Archives nomades

Une fois toutes les manipulations faites, il faut :
- Créer les archives nomades :
  ```sh
  zip -r -j ergol/ergol_angle_mod_nomade.zip ergol/ergol_angle_mod_nomade/
  zip -r -j ergol/ergol_nomade.zip ergol/ergol_nomade/
  ```
- Supprimer les répertoires qui ne sont plus utiles :
  ```sh
  rm -rf ergol/ergol_angle_mod_nomade/ ergol/ergol_nomade/
  ```

### Liste de tous les pilotes

À la fin des manipulations décrites ci-dessus, on obtient donc les pilotes
suivants :

```
ergol.keylayout
ergol.xkb_symbols
ergol_angle_mod.keylayout
ergol_angle_mod.xkb_symbols
ergol_angle_mod_kbd.exe
ergol_angle_mod_nomade.zip
├── ergol.toml
├── ergol_angle_mod.ahk
├── ergol_angle_mod.exe
├── ergol_angle_mod.keylayout
└── ergol_angle_mod.xkb_keymap
ergol_kbd.exe
ergol_nomade.zip
├── ergol.ahk
├── ergol.exe
├── ergol.keylayout
├── ergol.toml
└── ergol.xkb_keymap
```


## Release Github

- Aller dans les [releases Github d’Ergo‑L]
- Cliquer sur « Draft a new release »
- Entrer le « Release title » sur le modèle suivant (version à adapter) :
  Drivers Ergo‑L v1.0.2
- Dans « Release notes », préciser toute ce qui a changé, quels bugs ont été
  corrigé (tout détail permettra de plus facilement retrouver d’où vient le
  problème s’il y a un nouveau bug remonté). Il faut à mimima que ce soit écrit
  en français, et potentiellement traduit en anglais.
- Glisser-déposer tous les pilotes générés ci-dessus
- Si l’on souhaite sauvegarder la release sans la publier, cliquer sur « Save
  draft ». Elle reste visible et éditable par les maintainers mais non visible
  pour les autres utilisateurices.
- Si l’on veut publier la release, retourner tout en haut sur « Select tag » et
  créer le tag `ergol-v1.0.2` (version à adapter)
- Puis cliquer sur « Publish release »


## Site web

Éditer [www/content/installation/index.md](./www/content/installation/index.md)
pour y changer la version dans les liens (en bas du fichier).

Commiter le changement et ouvrir une PR sur Github en détaillant ce qui va
changer dans les pilotes (on peut s’inspirer de la release note ci-dessus).

Ne pas commiter le dossier de pilotes `ergol/`, si besoin on peut le déplacer
ailleurs.

Par contre, s’il y a eu des changements dans la disposition, il faudra que le
TOML soit lui aussi commité dans cette même PR, et selon les changements, il
faudra peut-être aussi un article pour prévenir les ergonautes.

Il faut que la release Github soit publiée avant de merger la PR qui change les
liens vers les pilotes pour ne pas casser le site web.


[Ahk2Exe]:                  https://github.com/AutoHotkey/Ahk2Exe
[Kalamine]:                 https://github.com/OneDeadKey/kalamine
[KbdEdit]:                  https://www.kbdedit.com/
[icône Ergo‑L]:             https://ergol.org/favicon.ico
[releases Github d’Ergo‑L]: https://github.com/Nuclear-Squid/ergol/releases
[semver]:                   https://semver.org/
