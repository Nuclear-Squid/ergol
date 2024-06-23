+++
title = "Foire aux questions"
+++

**🚧 En construction 🚧**

<style>
h4 {
    font-size: 1.1rem;
}
</style>

Cette page apporte des réponses aux questions les plus fréquentes. N’hésitez pas
à nous rejoindre sur [le serveur Discord Ergo‑L](https://discord.gg/5xR5K3nAFX)
pour en savoir davantage !


Projet et site web
--------------------------------------------------------------------------------

#### Que veut dire \[…\] ?

Certains termes sont spécifiques à la création de dispositions clavier ou à la
typographie. Notre [glossaire] permet d’y voir plus clair.


#### D’où vient le nom « Ergo‑L » ?

Ergo‑L signifie « **Ergo**nomic **L**afayette », le projet ayant démarré comme
un fork de [QWERTY-Lafayette] visant à lui apporter une optimisation de type
Colemak/Workman. Il se prononce « ergol », comme le nom générique des carburants
de moteurs-fusées.

#### Pourquoi tous ces 🦆 ?

::: {.dialog}
- Coin coin ?
- Ook, ook. Ook !
:::

Pilotes
--------------------------------------------------------------------------------

### Linux

#### Ma disposition clavier ne fonctionne plus. Que faire ?

Cela peut arriver après une mise à jour. Il vous suffit de la réinstaller avec
[XKalamine]. Notez qu’il existe d’[autres méthodes][xkb-custom] plus robustes.

#### Pourquoi la touche [★]{.odk} fonctionne-t-elle en la maintenant pressée, alors que c’est une [touche morte] ?

Bien que la touche [★]{.odk} soit qualifiée de [touche morte], elle est
implémentée en utilisant un modificateur dit « _latch_ », qui s’utilise de deux
façons :

- soit en _relachant_ [★]{.odk} avant de taper la touche correspondant au
  caractère composé ;
- soit en _maintenant_ [★]{.odk} enfoncée en tapant cette touche.

Exemple pour Ergo‑L :

- [★]{.kbd} [A]{.kbd} → `à`
- [★]{.kbd} (maintien) [A]{.kbd} [★]{.kbd} (relâche) → `à`

[glossaire]:        /glossaire
[touche morte]:     /glossaire#touche-morte-def
[QWERTY-Lafayette]: /lafayette/#qwerty-lafayette
[XKalamine]:        https://github.com/OneDeadKey/kalamine#xkalamine
[xkb-custom]:       https://github.com/OneDeadKey/kalamine#linux-root-xkb_symbols
