import player from "./data"
import { enemiesKilled } from "./enemies"

export const difficulty = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 10]

export const name = ['Tutorial', '', '']

// make this update sth
//i will make this value update when you go to the next level
// ony this file can update it
//well this is the level file
let levelEnemies = Math.ceil(player.level/10) - 1

//i might change the implementation later, dont judge me for now
export function isLevelFinished(): boolean | undefined {
    if(enemiesKilled - levelEnemies === 0) {
        return true
    }
}
