+++
title = "Selenium"
+++

Une extension d’[Arsenik] pour les claviers ergonomiques.

{{% keymap src="selenium_hrm" alt="Selenium, saveur HRM" /%}}

:::{style="text-align: center;" }
🚧 en construction 🚧
:::

<!--more-->


Fonctionnement
-------------------------------------------------------------------------------

[Selenium] reprend l’essentiel d’Arsenik :

- le <i lang="en">layer</i> de navigation [NavNum]
- le <i lang="en">layer</i> de symboles, identique à la couche AltGr d’Ergo‑L
- les touches duales : [layer-taps] sous les pouces, [homerow-mods] sous les
  doigts

La différence est que Selenium tire partie des <i lang="en">clusters</i> de
pouces des claviers ergonomiques : là où un modèle ANSI ou ISO n’a que trois
touches de pouce utilisables, un modèle ergonomique en a au moins quatre,
souvent six (voire plus).

Le gain de confort et d’efficacité est flagrant, mais on conserve les mêmes
principes d’action sous les pouces, de sorte à pouvoir passer du laptop au
clavier ergonomique de façon transparente.

Tout comme Arsenik, Selenium est prévu pour être accessible aux néophytes. Un
soin particulier a été accordé à la gestion des <i lang="en">timings</i>, qui
sont cruciaux autant pour débuter que pour taper à haute vitesse sans
déclencher de raccourcis intempestifs.


Configurable
-------------------------------------------------------------------------------

[Plus d’infos sur la page Selenium.][Selenium]

(TODO)


Ækeynox
-------------------------------------------------------------------------------

Ækeynox est l’implémentation QMK / ZMK des <i lang="en">keymaps</i> Arsenik et
Selenium. Plus d’infos sur les pages GitHub :

- [Ækeynox ZMK](https://github.com/OneDeadKey/zmk-config-aekeynox)
- [Ækeynox QMK](https://github.com/OneDeadKey/qmk-config-aekeynox)

(TODO)


[Arsenik]:       {{< relref "claviers/arsenik" >}}
[layer-taps]:    {{< relref "claviers/arsenik#layer-taps" >}}
[homerow-mods]:  {{< relref "claviers/arsenik#homerow-mods" >}}
[NavNum]:        {{< relref "claviers/compacts/#layer-navnum" >}}

[Selenium]:  https://onedeadkey.github.io/selenium
