import player from "./data"
import element from "./dom"
import { generateEnemy, resetKills } from "./enemies"

export const difficulty = 
    [1, 1.1, 1.2, 1.3, 1.4, //lvl 5
     1.5, 1.6, 1.7, 1.8, 1.9, //lvl 10
     2.5, 3, 3.5, 4, 4.5, 5, //lvl 15
     5.5, 6, 6.5, 7, 10, //lvl 20
     11, 12, 13, 14, 15, //lvl 25
     16, 17, 18, 19, 30  //lvl 30
    ]

export const name = 
    ['Tutorial', 'The beginning', '', '', '', //lvl 5
     '', '', '', '', '', //lvl 10
     'Slight jump in difficulty', '', '', '', '', //lvl 15
     '', '', '', '', '', //lvl 20
     '', '', '', '', '', //lvl 25
     '', '', '', '', '' //lvl 30
    ]

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