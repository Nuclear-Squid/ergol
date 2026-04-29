+++
title = "Configurer un clavier en Ergo-L sous SwayWM"
date = 2024-06-01T13:54:48+01:00
author = "steeve"
tags = ["communauté"]
+++

Vous utilisez SwayWM et vous voulez passer à Ergo-L ? C’est par ici !\

Cet article vous guide étape par étape pour configurer Ergo-L sur votre système, que ce soit pour tous vos claviers ou pour un clavier spécifique. Avec quelques lignes de configuration, vous pourrez profiter pleinement de cette disposition optimisée.


<!--more-->


## Prérequis

Afin de pouvoir configurer Ergo-L avec SwayWM, le pilote doit être installé sur votre machine.
Veuillez vous référer à la partie [Installation][1] du site pour cela.

## Trouver vos fichiers de configuration

La configuration de SwayWM est généralement située dans le fichier `~/.config/sway/config`.\
Si vous ne possédez pas le dossier `~/.config/sway`, vous pouvez normalement copier la configuration par défaut située dans le dossier `/etc/sway/` sur votre système.

## Configurer Ergo-L pour tous les claviers connectés à la machine

C’est la solution la plus simple. Il suffit d’ajouter le code suivant à votre fichier de configuration :

```text
input "type:keyboard" {
    xkb_layout fr
    xkb_variant ergol
}
```

> ⚠ Si un bloc de configuration similaire est déjà présent, il vous suffira de l’adapter.

## Utiliser Ergo-L sur un clavier particulier

### Trouver l’identifiant de votre clavier

Pour configurer différemment un clavier spécifique, il est nécessaire de trouver son identifiant. Vous pouvez le faire en exécutant la commande `swaymsg -t get_inputs` dans un terminal. Cette commande listera tous les périphériques d’entrée de votre machine. Recherchez, dans cette liste, le bloc correspondant à votre clavier.

La ligne indiquant son identifiant est celle commençant par `Identifier:`. Notez que les parties correspondant à des claviers possèdent une ligne `Type: Keyboard`.

Voici un exemple de données retournées par la commande :

```text
Input device: ZMK Project Cradio Keyboard
Type: Keyboard
Identifier: 7504:24926:ZMK_Project_Cradio_Keyboard
Product ID: 24926
Vendor ID: 7504
Active Keyboard Layout: French (Ergo-L)
Libinput Send Events: enabled
```

Dans cet exemple, l’identifiant est `7504:24926:ZMK_Project_Cradio_Keyboard`.

### Configurer Ergo-L sur le clavier souhaité

Une fois l’identifiant de votre clavier obtenu, il suffit d’ajouter ce bloc à votre configuration, en prenant soin de remplacer `7504:24926:ZMK_Project_Cradio_Keyboard` par l’identifiant obtenu à l’étape précédente.

```text
input "7504:24926:ZMK_Project_Cradio_Keyboard" {
    xkb_layout fr
    xkb_variant ergol
}
```

## Appliquer les modifications

Pour appliquer les modifications effectuées, il suffit de recharger la configuration de SwayWM ou de vous reconnecter.




[1]: https://ergol.org/installation
