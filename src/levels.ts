import player from "./data"
import element from "./dom"
import { enemiesKilled } from "./enemies"

export const difficulty = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 10]

export const name = ['Tutorial', '', '']

let levelEnemies = Math.ceil(player.level/10) + 1

export function isLevelFinished(): boolean | undefined {
    if(enemiesKilled - levelEnemies === 0) {
        return true
    }
}

element("levelUp").onclick = () => {
    if(isLevelFinished()) {
        player.level++
        levelEnemies = Math.ceil(player.level/10) - 1
    }
}