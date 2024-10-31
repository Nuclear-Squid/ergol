Contribution au site web Ergo‑L
================================================================================


Pré-requis : Hugo + Pandoc
--------------------------------------------------------------------------------

### Windows

Installer [Hugo][] et [Pandoc][] depuis un émulateur de terminal, par exemple
Windows PowerShell :

```powershell
winget install Hugo.Hugo.Extended
winget install --source winget --exact --id JohnMacFarlane.Pandoc
```

Attention : Hugo ne fonctionne pas depuis le terminal Windows PowerShell qui est
pré-installé.

Hugo requiert un terminal WSL, Git Bash ou [PowerShell][] tout court, [qui n’est
pas la même application que Windows PowerShell][WindowsPS], bien que le nom soit
qussiment le même et que les deux applications sont maintenues par Microsoft.
PowerShell peut s’installer depuis Windows PowerShell :

```powershell
winget install --id Microsoft.Powershell --source winget
```

[Hugo]:       https://gohugo.io/installation/windows/
[Pandoc]:     https://pandoc.org/installing.html#windows
[PowerShell]: https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4
[WindowsPS]:  https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell?view=powershell-7.3


Serveur de développement
--------------------------------------------------------------------------------

On lance le serveur de développement via un émulateur de terminal depuis ce
répertoire `www` :

```bash
cd www
hugo serve
```

Le site est alors visible sur http://localhost:1313/

Le site est mis à jour à chaque modification de fichier (live-reload).



Rédaction
--------------------------------------------------------------------------------

### Markdown

Les pages sont écrites en Pandoc Markdown chaque fois que c’est possible.

Les lignes sont limitées à 80 caractères. Des exceptions peuvent être admises
au cas par cas.

Les titres de niveau 1 et 2 sont marqués par un soulignement de 80 signes `=` et
`-` respectivement. Les titres de niveau supérieur sont indiqués par des `#`,
mais on évitera d’utiliser les niveaux supérieurs à 3.

Pour les liens, on privilégie les URLs dans une référence de bas de page plutôt
que dans le corps de texte, afin de faciliter la lecture.

### Orthographe

On suit l’orthographe de la réforme de 1990.

Par souci d’inclusivité, on privilégie les formules épicènes. Les formes
condensées avec le point médian sont tolérées mais gagnent à être évitées.
L’accord de proximité est encouragé.

### Typographie

On utilise l’insécable fine avant toutes les ponctuations hautes (`?!:;`) et
entre les guillemets (`« »`).

Les incises sont délimitées par des tirets cadratins.

### Nombres

Les nombres utilisent l’insécable fine comme séparateur de milliers et d’unité.
Le séparateur décimal est la virgule.

### Anglicismes

On évite les anglicismes dans le texte, et quand on y a recours on veillera à
les inclure dans une balise `<i lang="en">` pour l’accessibilité (lecteurs
d’écran).

Les termes techniques courants en anglais sont tolérés – notamment tous ceux qui
sont définis dans le glossaire.

### Désignation des touches

Les touches physiques du clavier sont désignées suivant les normes techniques en
vigueur (ANSI, USB Keyboard API, JavaScript Keyboard API)… qui découlent des
claviers Qwerty.

On ne traduit pas les touches spéciales. On parle donc de <kbd>Shift</kbd>,
<kbd>Enter</kbd>, <kbd>Backspace</kbd>, etc.

Les touches physiques sont incluses dans des balises `<kbo>`, les caractères
produits dans des balises `<code>`. On parle donc de la touche <kbd>F</kbd> pour
désigner celle qui produit un `N` en Ergo‑L.
