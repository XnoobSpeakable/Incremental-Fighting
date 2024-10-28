import player from "./data"
import element from "./dom"
import { enemiesKilled, resetKills } from "./enemies"

export const difficulty = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 10]

export const name = ['Tutorial', '', '']

export let levelEnemies = Math.ceil(player.level/10) + 1

export function isLevelFinished(): boolean {
    if(levelEnemies - enemiesKilled <= 0) {
        return true
    } else {
        return false
    }
}

element("levelUp").onclick = () => {
    if(isLevelFinished()) {
        player.level++
        levelEnemies = Math.ceil(player.level/10) + 1
        resetKills()
    }
}