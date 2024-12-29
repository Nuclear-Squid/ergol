+++
title = "Faire un caractère spécial avec Ergo‑L"
date = 2024-12-29T16:16:16+01:00
author = "Cætera"
tags = ["communauté", "tutoriel", "compose"]
+++

« Comment faire le caractère 🔠 (lire un caractère ésotérique qui n’est utilisé que 3 fois dans sa vie) en [Ergo‑L](./articles/ergol_1_0_0/) ?! » est une question qui revient fréquemment sur les internets. 

Ce n’est pas toujours simple de répondre, étant donné la multitude de caractères présents dans Unicode. Cela dépend fortement du caractère en question. ~~Pour tenter d’apporter une réponse simple et générale à la question: les altcodes~~
![les AltCodes Windows qui font transpirer](./remember_windows_altcodes.png)



Voici la façon dont les Ergonautes voient les choses :

Les caractères utiles pour écrire une langue parlée en Europe
-------------------------------------------------------------
Bonne nouvelle : si vous écrivez en français, anglais ou toute autre langue européenne courante, il y a fort a parier que vous besoins sont couverts ! Il faut simplement savoir où le trouver… Si le caractère n’est pas visible sur l’image présente sur la [page d’accueil](./) du site d’Ergo‑L, il est peut-être quand même disponible.

<object type="image/svg+xml" class="odk" data="/img/ergol.svg" style="width:100%"></object>

En effet, cette image n’est qu’une vue simplifiée de la disposition, ne montrant que les caractères les plus courants. Si pour avoir la liste complète de tous les caractères présents, la façon la plus simple est de se reporter au fichier source qui a servi à créer le pilote clavier —le fichier `ergol.toml`.
```toml
base = '''
╭╌╌╌╌╌┰─────┬─────┬─────┬─────┬─────┰─────┬─────┬─────┬─────┬─────┰╌╌╌╌╌┬╌╌╌╌╌╮
┆ ~   ┃ € ‚ │ « ‘ │ » ’ │ $   │ %   ┃ ^   │ &   │ *   │ #   │ @   ┃ _ – ┆ + ± ┆
┆ `   ┃ 1 „ │ 2 “ │ 3 ” │ 4 ¢ │ 5 ‰ ┃ 6   │ 7   │ 8 § │ 9 ¶ │ 0 ° ┃ / ÷ ┆ = ≠ ┆
╰╌╌╌╌╌╂─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┼╌╌╌╌╌┤
·     ┃ Q   │ C   │ O   │ P   │ W   ┃ J   │ M   │ D _ │ ! ¡ │ Y   ┃ {   ┆ }   ┆
·     ┃   â │   ç │   œ │   ô │     ┃     │   µ │   _ │***¨ │   û ┃ [   ┆ ]   ┆
·     ┠─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┼╌╌╌╌╌┤
·     ┃ A   │ S   │ E   │ N   │ F   ┃ L   │ R   │ T   │ I   │ U   ┃ "   ┆ |   ┆
·     ┃   à │   é │   è │   ê │   ñ ┃   ( │   ) │   î │   ï │   ù ┃ '   ┆ \   ┆
╭╌╌╌╌╌╂─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┴╌╌╌╌╌╯
┆ >   ┃ Z   │ X   │ ? ¿ │ V   │ B   ┃ :   │ H   │ G   │ ; • │ K   ┃           ·
┆ <   ┃   æ │   ß │ - ‑ │   – │   — ┃ . … │     │  *µ │ , · │     ┃           ·
╰╌╌╌╌╌┸─────┴─────┴─────┴─────┴─────┸─────┴─────┴─────┴─────┴─────┚ · · · · · ·
'''

altgr = '''
╭╌╌╌╌╌┰─────┬─────┬─────┬─────┬─────┰─────┬─────┬─────┬─────┬─────┰╌╌╌╌╌┬╌╌╌╌╌╮
┆     ┃   ¹ │   ² │   ³ │   ⁴ │   ⁵ ┃   ⁶ │   ⁷ │   ⁸ │   ⁹ │   ⁰ ┃     ┆     ┆
┆     ┃   ₁ │   ₂ │   ₃ │   ₄ │   ₅ ┃   ₆ │   ₇ │   ₈ │   ₉ │   ₀ ┃     ┆     ┆
╰╌╌╌╌╌╂─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┼╌╌╌╌╌┤
·     ┃  *^ │   ≤ │   ≥ │  *¤ │   ‰ ┃  *˚ │     │   × │  *´ │  *` ┃     ┆     ┆
·     ┃   ^ │   < │   > │   $ │   % ┃   @ │   & │   * │   ' │   ` ┃     ┆     ┆
·     ┠─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┼╌╌╌╌╌┤
·     ┃  *ˇ │     │     │  *˙ │   ≠ ┃  */ │   ± │  *¯ │   ÷ │  *” ┃     ┆     ┆
·     ┃   { │   ( │   ) │   } │   = ┃   \ │   + │   - │   / │   " ┃     ┆     ┆
╭╌╌╌╌╌╂─────┼─────┼─────┼─────┼─────╂─────┼─────┼─────┼─────┼─────╂╌╌╌╌╌┴╌╌╌╌╌╯
┆     ┃  *~ │  *, │  *˛ │   – │     ┃   ¦ │   ¬ │  *¸ │   : │  *˘ ┃           ·
┆     ┃   ~ │   [ │   ] │   _ │   # ┃   | │   ! │   ; │   : │   ? ┃           ·
╰╌╌╌╌╌┸─────┴─────┴─────┴─────┴─────┸─────┴─────┴─────┴─────┴─────┚ · · · · · ·
'''

[spacebar]
shift       = "\u202f"  # NARROW NO-BREAK SPACE
altgr       = "\u0020"  # SPACE
altgr_shift = "\u00a0"  # NO-BREAK SPACE
1dk         = "\u2019"  # RIGHT SINGLE QUOTATION MARK
1dk_shift   = "\u2019"  # RIGHT SINGLE QUOTATION MARK{{% include "layout/ergol.toml" %}}
```

Le fichier se décompose en trois parties :

- **Les caractères courants** : qui sont délimités par la partie `base='''…'''`. On y retrouve les symboles accessibles en couche alpha (accessible directement) et en couche typographique (accessible suite à un appui sur la touche <kbd>★</kbd>). On y retrouve notamment tous les symboles nécessaires pour taper un français et un anglais correct, y compris les caractères peu courants comme `«» „“” ‘’ ¢ ‰ § ¶ ° ÷≠±` pour ne citer que ceux présents en couche typo(graphique) sur la rangée des chiffres.
- **Les caractères « AltGr »** : délimité par la partie `altgr='''…'''`. On y retrouve les symboles utilisés pour la programmation, mais aussi, souvent en <kbd>AltGr</kbd>-<kbd>Shift</kbd>, les touches mortes pour faire les diacritiques nécessaires à l’écriture de langues européennes. Ainsi `*'` signifie la touche morte pour faire les accents aigus (voir [le glossaire](./ressources/glossaire/#touche-morte-def) pour la définition de touche morte). Pour trouver la nomenclature des touches mortes, il est possible de se référer à [ce fichier sur github](https://github.com/OneDeadKey/kalamine/blob/main/kalamine/data/dead_keys.yaml).
- Les différentes types d’espaces. Oui, en typographie, on dit « une espace ». Cette espace peut être normale, insécable (une espace dont les caractères de part et d’autres ne peuvent pas se retrouver séparés sur deux lignes), et l’insécable fine (_idem_, mais avec une séparation plus mince —elle est utilisée principalement avant les ponctuations doubles et les guillemets en français.

Une simple recherche (ou <kbd>Ctrl</kbd>-F) permet de vérifier si un caractère, ou une touche morte, est disponible en Ergo‑L. Comme toute disposition clavier qui se respecte, vous y trouverez les caractères indispensables à tout bon typo-nazi aguerris (oui, même le <kbd>æ</kbd>).


Quand le besoin sort des sentiers battus
----------------------------------------

Ergo‑L est conçu pour écrire et coder, mais il y aura des cas où un caractère spécifique manque.

Pour ces moments-là, entre en scène la touche Compose (<kbd>⎄</kbd>).

Sous Linux (et parfois ailleurs avec des astuces), la touche Compose vous permet de créer des caractères à la volée. Une fois configurée, elle transforme des séquences simples en caractères magiques :

- <kbd>⎄</kbd>-<kbd>ae</kbd> pour <kbd>æ</kbd>.
- <kbd>⎄</kbd>-<kbd>-></kbd> pour <kbd>→</kbd>.

Et ce n’est que le début ! Il existe des séquences de base qui vont dépendre de vos paramètres régionaux (ou _locale_), mais il est également possible d’ajouter des séquences personnalisées. [Le Wikipedia de la touche compose](https://en.wikipedia.org/wiki/Compose_key#Common_compose_combinations) donne des exemple de séquences courantes. Vous pouvez personnaliser ces séquences dans votre fichier `~/.XCompose` pour les adapter à vos besoins.

> **NB :** On peut pour se simplifier la vie en ajoutant des préfixes pour les séquences de mêmes types. Par exemple, dans mon fichier compose, tous les émojis commencent par le symbole <kbd>:</kbd>. Cela permet d’éviter les collisions avec d’autres symboles tout en étant plus simple à mémoriser.

L’avantage de la touche compose pour des caractères _peu fréquents_, c'est qu’il est souvent plus facile de mémoriser une séquence de caractère (utilisant des symboles proches comme <kbd>-></kbd> pour <kbd>→</kbd>) plutôt qu’une touche définie de façon arbitraire dans un pilote.

## Installer compose
Compose est disponible nativement sous Linux dans la majorité des distributions. Il convient simplement de définir une touche qui sera interprétée comme la touche compose ; ainsi GNOME, par exemple, propose les touches suivantes :

![Paramétrer la touche compose avec GNOME](./gnome_compose_setting.png)

Sous Windows et MacOS, il faut installer un programme supplémentaire.

[WinCompose](https://github.com/SamHocevar/wincompose) semble s’être imposé comme un standard pour Windows, mais je n’ai pas en tête d’équivalent pour MacOS qui fasse consensus. 


Avec Ergo‑L et compose, plus aucun caractère ne vous résistera ! Que vous soyez un typo-enthousiaste ou juste quelqu'un qui veut briller en société avec un parfait 🔠, vous avez tout ce qu'il faut !