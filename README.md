# SimonGame
A project that recreates the Simon game, where players have to match a sequence of colors shown to them. If they fail to do so, the game ends. Otherwise, the game continues to increase in difficulty
![alt text](https://i.imgur.com/KyhtEv7.png)
# How to install (with Salesforce Extension Pack installed)
1. Clone repo with: `https://github.com/kfincher/SimonGame`
2. Open SimonGame/Simon in VisualStudio and wait for extensions to load
      - If no orgs are connected, then press Ctrl+Shift+p and click SFDX: Authorize an Org
3. Open the manifest folder, right click package.xml, and click SFDX: Deploy Source in Manifest to Org

# How to play
1. After cloning repo and deploying package, open SimonHarnessApp in the DevConsole and click Preview
2. Click Start Game and wait for the countdown and sequence to be shown
3. Click the buttons matching the appropriate colors in the sequence in the order they were shown
      - if correct, wait for the next sequence and repeat
      - if incorrect, the game ends and resets
