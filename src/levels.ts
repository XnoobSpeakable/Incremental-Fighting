import player from "./data"
import element from "./dom"
import { generateEnemy, resetKills } from "./enemies"

export const difficulty = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 10]

export const name = ['Tutorial', '', '']

export let levelEnemies = Math.ceil(player.level/10) + 1

// returns true if all enemies in level have been killed
export const isLevelFinished = () => levelEnemies - player.enemiesKilled <= 0

element("levelUp").onclick = () => {
    if (isLevelFinished()) {
        player.level++
        levelEnemies = Math.ceil(player.level/10) + 1
        generateEnemy()
        resetKills()
        element("attackButton").removeAttribute("disabled");
    }
}

export function die() {
    if (player.level >= 1) player.level--;
    levelEnemies = Math.ceil(player.level / 10) + 1;
    generateEnemy();
    resetKills();
    player.health = player.maxHealth;
}

export function initaliseLevel() {
    levelEnemies = Math.ceil(player.level / 10) + 1;
}