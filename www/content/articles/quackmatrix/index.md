+++
title = "De TypeMatrix au QMx"
date = 2026-09-05T09:00:00+01:00
author = "kaze"
tags = ["communauté", "matériel"]
+++

Avec le [QMx 2040], je referme une boucle entamée il y a 20 ans, quand je contribuais activement à
Bépo tout en bossant pour TypeMatrix, afin d’adapter le [TMx 2030] pour l’USB et les dispositions
européennes. Qu’un clavier puisse avoir besoin d’une touche AltGr, ça dépassait complètement
l’entendement de Henry, le boss dvorakiste de TMx… :-)

Après les TMx 2020 et TMx 2030, le QMx 2040 poursuit l’idée d’un clavier matriciel full-alpha et
facile d’emploi, mais avec des contacts mécaniques, un firmware libre, et des clusters de pouce en
arc de cercle — comme ceux du [Quacken]. Un seul layer pour accéder aux flèches, au pavé numérique,
aux touches de fonctions. Aucune touche duale. Simple.

L’objectif était juste de proposer un clavier d’apprentissage et fournir une alternative aux
Bépoètes (dont la disposition ne fonctionne guère que sur le TMx, qui n’est plus fabriqué) ; mais
comme rien ne se passe jamais comme prévu, je crains d’avoir accidentellement conçu un bon clavier,
tout court.


Projet « Grand-Duc »
----------------------------------------------------------------------------------------------------

Le point de départ était de proposer une version du Quacken avec une rangée de chiffres, 6 colonnes
sous la main gauche et 7 colonnes sous la main droite. La géométrie du Quacken en configuration
« Chouette », au millimètre près, mais avec des touches en plus, pour avoir les 48 touches
alphanumériques du clavier ISO en accès direct.

Ça a été un échec cuisant.

Rien qu’en imprimant la maquette, on s’est rendu compte que ça ne fonctionnait absolument pas :
les touches de chiffres sont beaucoup trop loin, la 7e colonne est hors d’atteinte.
Impossible de taper du texte sans lever les mains de la table. Idée pourrie.

Après avoir cogité la question beaucoup trop longtemps, j’ai compris une chose simple :

- plus on a les mains à plat, plus on est confortable, mais plus les mouvements des doigts sont
  limités en amplitude. Il faut donc un <i lang="en">col stagger</i> important pour compenser la
  différence de longueur des doigts — et le <i lang="en">splay</i> aide beaucoup aussi.

- Sur un clavier à 4 rangées de touches (ANSI, ISO, TMx, 4×6…), les mains sont naturellement
  creusées pour permettre d’atteindre les touches non-[1DFH], et le <i lang="en">col stagger</i> ne
  sert à rien. Il ne fait que dégrader la prise en main, sans apporter de confort, ou si peu.

Pour le dire autrement : un clavier [1DFH], s’il a une géométrie adaptée, permet de taper bien à
plat ; mais dès qu’on sort du 1DFH, il faut creuser les mains — et une disposition matricielle est
un meilleur compromis pour limiter les mouvements de doigts, en contenant un grand nombre de touches
dans un petit espace.
Les claviers 3D comme les Kinesis et Glove80 fonctionnent parce que leurs cuvettes permettent de
creuser les mains encore plus, confortablement, et ainsi d’atteindre des touches éloignées — du
moins, sur 6 colonnes.


Par-delà la matrice
----------------------------------------------------------------------------------------------------

Parmi tous mes claviers 4×6, il y en a un que je trouve très au-dessus du lot : le [Preonic], avec
sa géométrie bêtement matricielle, et dont le compromis efficacité / facilité me surprend à chaque
fois. Un bon point de départ.

À cette matrice 4×10, il faut ajouter les 8 autres touches du clavier ISO : deux sur une colonne à
gauche, six sur deux colonnes à droite. Comme j’aime beaucoup la configuration « Chouette » du
Quacken, j’opte pour une approche similaire, avec un décalage vertical d’une demi-unité sur ces
colonnes.

Pour les touches non-alpha comme Entrée, Backspace, Delete, Esc, on reprend l’idée qui a fait le
succès du TypeMatrix : une colonne de trois touches au centre, sous l’index en (double) extension.
Et même *deux* colonnes, comme sur le QMx 2020, parce que je me souviens que beaucoup de clients de
TypeMatrix avaient regretté le passage à une seule colonne, quand le TMx 2020 a été remplacé par le TMx 2030 — pas tant pour les trois touches en moins, mais surtout parce que ça diminuait la séparation des mains.

En posant mon Quacken sur la maquette du QMx, je constate que les colonnes d’auriculaires sont
exactement à la même position. La position est étrangement similaire sur ces deux claviers. Les
touches tombent bien sous les doigts, un peu trop bien même, pourquoi ?

Je crois avoir enfin compris pourquoi les géométries type TypeMatrix fonctionnent aussi bien :

- on garde la même position que sur le Quacken : même angle de 30° entre les bras, même écart latéral
- les auriculaires et annulaires se plient et se déplient sur un axe vertical, quasiment comme sur
  le Quacken ;
- les majeurs et index font des mouvements plus complexes, mais comme ce sont les doigts les plus
  forts et les plus agiles, ça n’est pas un problème.

On a essayé d’ajouter un peu de stagger, pour voir si on pouvait améliorer le confort. Le gain m’a
semblé tellement marginal que j’ai préféré rester sur cette forme matricielle, plus simple, plus
élégante, plus polyvalente (on peut se déplacer avec WASD sans risquer une entorse).


<i lang="en">I don’t believe in smart thumbs</i>
----------------------------------------------------------------------------------------------------

C’était la phrase de Heny Webber, le boss de TMx, quand je lui disais qu’il fallait proposer des
modifieurs sous les pouces, sur une évolution du TMx 2030. Il me disait que TypeMatrix avait fait
des études UX sur la question, et que les utilisateurs n’arrivaient pas à utiliser autre chose que
la barre d’espace. Le fait qu’on ait besoin d’une touche comme AltGr en Europe, ça lui semblait
inutilement compliqué.

Je suis d’un avis opposé. Je crois *beaucoup* aux clusters de pouces, mais encore faut-il qu’ils
soient bien conçus. Je déteste ceux de ZSA, trop excentrés, mal alignés ; pour moi, c’est KeyboardIO
qui a montré la voie, avec les clusters en arc de cercle du Model01, puis le Model100, qui ont
inspiré ceux du Quacken.

On a passé un temps fou pour caler précisément les clusters du Quacken, pour que l’arc de cercle
corresponde pile à la trajectoire naturelle du pouce. On n’a pas eu grand-chose à faire pour
les adapter au QMx : on garde les trois bonnes touches du Quacken, on en rajoute deux en positions
plus repliées (similaires à Command/Option sur un MacBook), et ça a fonctionné quasiment de suite.


Configuration par switches
----------------------------------------------------------------------------------------------------

De mon passage à TypeMatrix, j’avais gardé le souvenir d’un proto où les options se configuraient
par des switches sur la carte électronique, et je trouvais ça pratique. C’est totalement old-school
mais on décide de faire ça pour le QMx. On a immédiatement adoré.

Le gros intérêt d’une configuration full-alpha c’est que le clavier peut être totalement indifférent
à la configuration clavier configurée sur l’hôte (PC ou téléphone) ; on n’a donc pas ou peu de
raison de vouloir reflasher son clavier.

Avec ces switches, on peut activer ou désactiver :

- les thumb-taps, pour remplacer les touches centrales par des appuis brefs sur les touches de pouce
- les homerow-mods, pour retrouver le niveau d’efficacité d’Arsenik
- le mode Mac, pour avoir Command à la place de Ctrl


Mise au point
----------------------------------------------------------------------------------------------------

On garde le même type de conception électronique que sur le Quacken : contrôleur RP2040, clavier splittable, communication I²C entre les deux parties. En restant sur les mêmes principes, on s’est
dit que la mise au point du QMx serait triviale. On s’est évidemment trompés.

- Un souci de communication I²C fait perdre la connexion avec la moitié droite du clavier. Après des
  dizaines d’heures à traquer le problème à l’oscillo, Nuke découvre que c’est un bug de Zephyr,
  l’OS temps réel utilisé par ZMK. Un contournement est trouvé.

- C’est notre premier clavier hotswap. En respectant scrupuleusement les recommandations de Kailh,
  les touches sont insuffisamment maintenues, le <i lang="en">wobbling</i> est trop gênant. On
  expérimente, on corrige, on ajuste.

Premiers protos
----------------------------------------------------------------------------------------------------

### Neo

On fait réaliser un lot de 5 protos. Les clusters fonctionnent, les colonnes extérieures sont bien,
mais je ne retrouve pas l’effet « waouh, trop simple » de mon Preonic. Je fais des fautes de frappe.
Beaucoup. Surtout avec les index. Mes doigts sont collés les uns aux autres, sensation bizarre.

Pour ne pas avoir à gérer deux types de switches, on est restés fidèles aux Choc, avec leur
empreinte réduite (18×17 mm, au lieu de 19.05×19.05 mm sur les MX et les claviers standard).
Peut-être que la matrice a besoin d’un espacement MX ?

C’est aussi notre premier proto avec des sockets hotswap. On a utilisé les empreintes disponibles
dans KiCad, mais c’est trop lâche. On va corriger ça en prenant les perçages recommandés par Kailh.

### Morpheus

Deuxième lot de protos : on garde les Choc, mais on ajoute 1.05 mm entre les doigts pour avoir un
espacement MX entre les doigts, tout en conservant l’espacement Choc plus compact pour faciliter
l’accès aux touches excentrées.

Et ça marche ! Les touches tombent sous les doigts. En une heure d’utilisation, le clavier devient
une évidence. C’est la géométrie qu’on veut, aucun doute possible.

Suite à un problème de disponibilité sur des composants, JLC n’a pu nous fournir que deux PCB. On
les emporte aux [JdLL 2026], ils plaisent à celles et ceux qui mettent les mains dessus. Beaucoup.
Une centaine de modèles sont commandés.

On découvre un bug pénible : de temps en temps, la partie droite du clavier cesse de fonctionner,
il faut débrancher/rebrancher pour que ça retombe en marche. Avec un MTBF d’une heure, pas simple
de mettre le doigt sur le problème…
On suspecte évidemment la communication I²C. On voit des points perfectibles sur le routage, mais
rien qui puisse expliquer le bug. Dans le doute, Nuke reprend tout le routage…
Dans le doute, re-route…

Oh, et les sockets hotswap ne tiennent toujours pas bien. On fait réaliser une plaque pour
expérimenter nous-mêmes divers diamètres de perçage.

### Trinity

Troisième lot de protos. On en a profité pour faire une petite modif sur la touche la plus rentrée
des clusters de pouce, on adore ! Le hotswap fonctionne enfin comme on le voulait, les touches sont
bien en place, sans <i lang="en">wobbling</i>. On a proposé de faire des protos violets, et l’idée a
bien plu, on en fera dix au lieu de cinq.

Après des dizaines d’heures à traquer le bug d’I²C à l’oscillo, Nuke comprend que le bug vient de
Zephyr, l’OS temps réel utilisé par ZMK. Il trouve un contournement.

Tout fonctionne enfin comme on le souhaite. La prod’ peut partir, 100 claviers à assembler.


des maquettes, on s’est vite rendu compte que ça ne fonctionnait pas.

### Par-delà la matrice

Les claviers à 4 rangées s’utilisent avec les mains assez creusées, afin de pouvoir atteindre les touches éloignées. Avec cette position, le *stagger* ne sert à rien, ou si peu ; une géométrie purement ortholinéaire est tout aussi efficace et bien plus polyvalente, la facilité de prise en main des claviers matriciels étant tout simplement imbattable.

Autour de cette matrice principale, le QMx conserve deux héritages du Quacken : des colonnes externes décalées d’une demi-hauteur de touche, et des clusters de pouce en arc de cercle. Les trois touches les plus sorties sont quasiment identiques à celles du Quacken, la 4e touche correspond au Alt/AltGr/Cmd d’un clavier de laptop, la 5e touche à Meta/Windows/Option.

Le QMx hérite aussi du TypeMatrix non pas une, mais deux colonnes centrales, comme sur le TMx 2020. Beaucoup d’utilisateurs TypeMatrix avaient regretté le passage à une colonne centrale sur le TMx 2030, et de fait : avec deux colonnes centrales, on retombe *exactement* sur l’écartement des mains du Quacken. L’écart de confort est net.

### Réellement full-alpha

Dans un domaine très américano-centré, le QMx 2040 est peut-être **le premier clavier ergonomique à être 100 % compatible avec *toutes* les dispositions européennes**, AZERTY et Bépo inclus, sans aucune adaptation : la touche `<>` d’AZERTY et les `MZWÇ` de Bépo sont au même emplacement que sur un clavier ISO. Le QMx fonctionne *« out of the box »*, sans aucune configuration préalable, quelle que soit la disposition de clavier.

### Réellement ergonomique

Malgré sa ressemblance avec les TypeMatrix, c’est un clavier résolument ergonomique, plus proche d’un 4x6 moderne que d’un full-alpha classique.

- Shift n’est accessible qu’au pouce — ça peut être perturbant au début, mais le *thumb-shifting* est de loin le plus gros gain qu’on puisse espérer d’un clavier ergonomique.
- Ni les flèches, ni les touches de fonction ne sont accessibles en direct : il faut passer par le layer [NumNav]. Ça permet d’avoir le pavé de flèches et le pavé numérique en position de repos, et d’atteindre les touches de fonctions en position dactylo.

Comme le Quacken, le QMx est splittable. On recommande de le garder en monobloc, mais *votre clavier, vos règles !*

### Facile à configurer

Le QMx dispose de 5 switches pour activer les options les plus courantes :

- thumb-taps
- homerow-mods
- ?
- ?
- custom
Présentation au Capitole du Libre
----------------------------------------------------------------------------------------------------

On part au CdL avec nos 5 protos avec une idée bien précise en tête : trouver des gens qui veulent
aussi un Quacken. Plus on sera nombreux, plus le prix unitaire sera bas.

Le clavier plait. Beaucoup ! On n’a quasiment que des retours enthousiastes. Les commandes
s’enchainent. Un visiteur insiste pour acheter mon proto perso, il fera des jaloux. On arrête les
prises de commandes à la fin novembre : c’est acté, il va falloir fabriquer 75 poticlaviers.

Bien sûr, ça reste un clavier compact, donc il faut savoir taper dans une disposition [1DFH], les
Bépoètes sont déçus ; et sans méthode dactylo stricte, le clavier est tout bonnement inutilisable.
Pourtant, le fait qu’il soit monobloc par défaut le rend plus accessible qu’on l’aurait cru. On voit
des débutants passer commande, on s’inquiète… peur de décevoir…

On n’a pas eu le temps de mettre au point une version <i lang="en">hotswap</i>. On propose donc aux
personnes intéressées de faire le montage nous-mêmes, à prix libre évidemment. La majorité saisiront
l’option.

Petite déception : tout le monde ou presque a commandé son Quacken en configuration 42 touches. On
pensait que les positions médianes feraient fureur, ça a été un énorme flop. 😅


Pour qui ?
----------------------------------------------------------------------------------------------------

### Pour les dactylographes expérimenté’es

Ça fait six mois que j’ai un Quacken Flex au boulot. Tous les lundis, j’arrive au taf, je
m’installe, je commence à répondre aux courriels sur mon Poticlavier.

Et *à chaque fois* : je suis surpris par l’efficacité. *Littéralement* surpris. Au sens de : « ah
ouais, quand même ! ». À chaque fois.

Ça fait 20 ans que j’ai commencé cet intérêt spécifique sur les claviers ergonomiques, et je suis
*surpris* tous les lundi par l’efficacité du Quacken. C’est à ce niveau-là.

Bien sûr, quand on fait soi-même son clavier, on manque d’objectivité. Je trouve que c’est de loin
le meilleur clavier que je connaisse, mais j’ai un penchant pour la simplicité ; pour [Ash], à
l’inverse, ça n’est que le meilleur clavier 2D : c’est son clavier de vadrouille préféré, mais iel
reste fidèle à son Glove80 pour le bureau.

De façon plus objective : la grande majorité des retours ont été extrêmement positifs. C’est un
clavier atypique, qui peut nécessiter un temps d’adaptation ; mais on voit déjà des adeptes acheter
leur deuxième voire troisième Quacken. 😊

### Pour Ergo‑L et QWERTY-Lafayette

Ce clavier, comme tous les claviers compacts, se prête particulièrement bien aux dispositions [1DFH]
comme Ergo‑L ou QWERTY-Lafayette. On l’a conçu pour être le <i lang="en">flagship</i> de ces
dispositions de clavier.

L’implémentation [Ækeynox-ZMK] permet même d’**émuler** Ergo‑L ou QWERTY-Lafayette sur un ordinateur
configuré en AZERTY ou QWERTY-intl. J’utilise cette émulation au quotidien en clientèle, et, à part
pour quelques caractères exotiques, l’utilisation est quasiment transparente.

### Pour AZERTY et Bépo

Pour ces dispositions de clavier, nos proposons des *adaptations* avec le firmware [Ækeynox-ZMK].

- Pour un ordinateur configuré en Bépo, le Quacken émule [Bépolar], ce qui permet de l’utiliser en
  3×5 et de résoudre le principal problème de Bépo : la surcharge de l’auriculaire droit.
- Pour un ordinateur configuré en AZERTY, le Quacken émule AZERTY-1dk (a.k.a. « Kazerty »), une
  adaptation type Lafayette d’AZERTY avec une seule touche morte sur la 6e colonne.

![AZERTY-1dk](azerty-1dk.svg)

C’est une solution qu’on recommande aux personnes sachant déjà taper en dactylo stricte ; dans le
cas contraire, mieux vaut apprendre directement Ergo‑L ou QWERTY-Lafayette.

### Pas pour le grand public

Le Quacken n’est pas un clavier grand public.

Parmi les retours négatifs qu’on a eus au Capitole du Libre, beaucoup d’adeptes du TypeMatrix n’ont
pas su l’utiliser, parfois à cause de l’absence de marquage, parfois par manque de rigueur en
dactylo. Notamment, on a vu quelques personnes utiliser l’annulaire sur la 5e colonne : ça *passe*
sur un TypeMatrix ou un Planck, mais c’est rédhibitoire sur le Quacken.

Ça n’est pas un clavier de <i lang="en">gaming</i> non plus. L’absence de rangée de chiffres
pourrait être un problème pour certains usages.

Malgré tout, on le croit accessible à toutes celles et ceux qui tapent en dactylo stricte, ou qui
sont prêts à apprendre. On a vu des gens l’acheter pour apprendre Ergo‑L et en être très contents —
même si on préfère recommander d’apprendre la dactylo *avant* d’acheter un clavier ergonomique. Le
fait que le Quacken soit monobloc par défaut simplifie beaucoup de choses.

Bref. Essayez-le, et dites-nous. 😊



<i lang="en">Happy typing !</i>
