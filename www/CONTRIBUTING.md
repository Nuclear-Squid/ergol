Contribuer au site Web Ergo‑L
================================================================================


Prérequis : Hugo + Pandoc
--------------------------------------------------------------------------------

### Windows

Installer [Hugo] et [Pandoc] depuis un émulateur de terminal, par exemple
Windows PowerShell :

```powershell
winget install Hugo.Hugo.Extended
winget install --source winget --exact --id JohnMacFarlane.Pandoc
```

Attention : Hugo ne fonctionne pas depuis le terminal Windows PowerShell qui est
préinstallé.

Hugo requiert un terminal WSL, Git Bash ou [PowerShell] tout court, [qui n’est
pas la même application que Windows PowerShell][WindowsPS], bien que le nom soit
quasiment le même et que les deux applications soient maintenues par Microsoft.
PowerShell peut s’installer depuis Windows PowerShell :

```powershell
winget install --id Microsoft.Powershell --source winget
```

[Hugo]:       https://gohugo.io/installation/windows/
[Pandoc]:     https://pandoc.org/installing.html#windows
[PowerShell]: https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows
[WindowsPS]:  https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell


Serveur de développement
--------------------------------------------------------------------------------

On lance le serveur de développement via un émulateur de terminal depuis ce
répertoire `www` :

```bash
cd www
hugo serve
```

Le site est alors visible sur <http://localhost:1313/>.

Le site est mis à jour à chaque modification de fichier
(<i lang="en">live-reload</i>).



Rédaction
--------------------------------------------------------------------------------

### Markdown

Les pages sont écrites en [Pandoc Markdown] plutôt qu’en HTML chaque fois que
c’est possible.

Les lignes sont limitées à 80 caractères.

Les titres de niveau 1 et 2 sont marqués par un soulignement de 80 signes `=` et
`-` respectivement (en-tête Setext). Les titres de niveau supérieur sont
indiqués par des `#` (en-tête ATX), mais on évitera d’utiliser les niveaux
supérieurs à 3.

Pour les liens, on privilégie les URL dans une référence de bas de page plutôt
que dans le corps du texte, afin de faciliter la lecture.

### Orthographe

On suit l’orthographe de la [réforme de 1990]. Il existe des dictionnaires
dédiés, et des outils comme Wiktionnaire indiquent les variantes.

Par souci d’inclusivité, on privilégie les formules [épicènes]. Les formes
condensées avec le point médian sont tolérées mais gagnent à être évitées.
L’[accord de proximité] est encouragé.

### Typographie

On utilise l’insécable fine avant toutes les ponctuations hautes (`?!:;`) et
à l’intérieur des guillemets (`« »`).

Les incises sont délimitées par des tirets cadratins (—), sans insécables.

### Nombres

Les nombres utilisent l’insécable fine comme séparateur de milliers et d’unité.
Le séparateur décimal est la virgule.

### Termes anglophones

On évite les mots anglais dans le texte, et quand on y a recours on veillera à
les inclure dans une balise `<i lang="en">` pour l’accessibilité (lecteurs
d’écran).

Les termes techniques courants en anglais sont tolérés — notamment tous ceux qui
sont définis dans le glossaire.

### Blocs de citation

Les blocs de citation (`>` en Markdown) doivent être suivis d’un paragraphe
donnant la source de la citation. Ce paragraphe est affiché de façon spécifique
par notre feuille de style. L’usage est d’introduire la source de la citation
avec un tiret cadratin en début de ligne.

Pour les citations qui ne requièrent pas de source, on remplace le paragraphe de
source par une ligne horizontale (`---` en Markdown), qui est masquée par la
feuille de style.

### Désignation des touches

Les touches physiques sont incluses dans des balises `<kbd>`, et les caractères
produits dans des balises `<code>`. On parle donc de la touche <kbd>F</kbd> pour
désigner celle qui produit un `N` en Ergo‑L.

Comme on n’a pas encore de règle pour désigner les touches spéciales, l’usage
actuel mélange les termes anglais et français : <kbd>Shift</kbd>,
<kbd>Entrée</kbd>, <kbd>Backspace</kbd>, <kbd>Esc</kbd>, etc. Une possibilité
serait de s’appuyer sur des normes existantes telles que [w3c] ou [USB HID].


[épicènes]:            https://fr.wiktionary.org/wiki/épicène
[accord de proximité]: https://fr.wikipedia.org/wiki/Règle_de_proximité
[réforme de 1990]:     https://fr.wikipedia.org/wiki/Rectifications_orthographiques_du_français_en_1990

[Pandoc Markdown]:     https://pandoc.org/MANUAL.html#pandocs-markdown
[USB HID]:             https://www.usb.org/sites/default/files/hut1_5.pdf
[w3c]:                 https://w3c.github.io/uievents-code/#key-alphanumeric-writing-system
