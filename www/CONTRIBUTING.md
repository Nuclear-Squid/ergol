# Contributing to the Ergo‑L website

## Setup

### For Windows

* Open a terminal, for example Windows PowerShell
* Install [Hugo](https://gohugo.io/installation/windows/) :
  ```powershell
  winget install Hugo.Hugo.Extended
  ```
* Optional if you run Hugo in a Linux terminal such as WSL or Git Bash ; install [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4) (Hugo can’t run in preinstalled Windows PowerShell) :
  ```powershell
  winget install --id Microsoft.Powershell --source winget
  ```
  Note : PowerShell is not [the same application](https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell?view=powershell-7.3) as _Windows_ PowerShell even if the name is almost the same and they are both maintained by Microsoft
* Install [Pandoc](https://pandoc.org/installing.html#windows) :
  ```powershell
  winget install --source winget --exact --id JohnMacFarlane.Pandoc
  ```
* Launch the newly installed PowerShell (or restart it if you already had it) and go to the `www` folder :
  ```powershell
  cd www
  ```
* Run the development server :
  ```powershell
  hugo server
  ```
* And go to http://localhost:1313/ to see the effect of your changes in livereload