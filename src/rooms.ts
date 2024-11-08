import player from "./data"
import element from "./dom"
import { generateEnemy, resetKills } from "./enemies"
import { Item, weapons } from "./items"

/*export const difficulty = [
    1   , 1.1 , 1.2 , 1.3 , 1.4    , // lvl 5
    1.5 , 1.6 , 1.7 , 1.8 , 1.9    , // lvl 10
    2.5 , 3   , 3.5 , 4   , 4.5, 5 , // lvl 15
    5.5 , 6   , 6.5 , 7   , 10     , // lvl 20
    11  , 12  , 13  , 14  , 15     , // lvl 25
    16  , 17  , 18  , 19  , 30       // lvl 30
]

export const name = [
    'Tutorial', 'The beginning', '', '', '',       // lvl 5
    '', '', '', '', 'Slight jump in difficulty',   // lvl 10
    '', '', '', '', '',                            // lvl 15
    '', '', '', '', '',                            // lvl 20
    '', '', '', '', '',                            // lvl 25
    '', '', '', '', ''                             // lvl 30
]*/

export const roomTable: Array<[number, number, string]> = [
    [0, 1, 'Tutorial'], [1, 1.1, 'The Beginning'], [2, 1.2, ''], [3, 1.3, ''], [4, 1.4, ''], [5, 1.5, ''],
    [6, 1.6, ''], [7, 1.7, ''], [8, 1.8, ''], [9, 1.9, ''], [10, 2.5, 'Slight jump in difficulty'],
    [11, 3, ''], [12, 3.5, ''], [13, 4, 'A deadly room'], [14, 4.5, ''], [15, 5, 'The Pentagon'], 
    [16, 5.5, ''], [17, 6, ''], [18, 6.5, ''], [19, 7, ''], [20, 10, 'Larger jump in difficulty'], 
    [21, 11, ''], [22, 12, ''], [23, 13, ''], [24, 14, ''], [25, 15, 'The Pentadecagon'], 
    [26, 16, ''], [27, 17, ''], [28, 18, ''], [29, 19, ''], [30, 30, 'Now that\'s a jump'], 
    [31, 33, ''], [32, 36, ''], [33, 39, ''], [34, 42, ''], [35, 45, ''], 
    [36, 48, ''], [37, 51, ''], [38, 54, ''], [39, 57, ''], [40, 60, 'Hours...'], 
    [41, 63, ''], [42, 66, ''], [43, 69, 'winking face emoji'], [44, 72, ''], [45, 75, ''], 
    [46, 78, ''], [47, 81, ''], [48, 84, ''], [49, 87, ''], [50, 100, ''], 
]

export let roomEnemies = Math.ceil(player.room / 10) + 1

function chancedFind(item: Item) {
    if(Math.random()<(1/item.rarity)) return true
    return false
}
//error for now, will fix later, also incomplete logic cuz no inventory management functions yet
function findLoot() {
    for(let item in weapons) chancedFind(item)
}

// returns true if all enemies in room have been killed
export const isroomFinished = () => roomEnemies - player.enemiesKilled <= 0

element("roomUp").onclick = () => {
    if (!isroomFinished) return;
    player.room++
    roomEnemies = Math.ceil(player.room/10) + 1
    generateEnemy()
    resetKills()
    element("attackButton").removeAttribute("disabled");
    findLoot()
}

export function die() {
    if (player.room >= 1) player.room--;
    roomEnemies = Math.ceil(player.room / 10) + 1;
    generateEnemy();
    resetKills();
    player.health = player.maxHealth;
}

export const initaliseroom = () => roomEnemies = Math.ceil(player.room / 10) + 1;
//test from phone