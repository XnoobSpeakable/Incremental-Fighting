import player from "./data"
import { roomTable } from "./rooms"

export interface Enemy {
    health: number
    attackSpeed: number
    attackAccuracy: number
    baseStrength: number
    weaponMultiplier: number
}

export let currentEnemy: Enemy = {
    health: 1,
    attackSpeed: 0.5,
    attackAccuracy: 0.55,
    baseStrength: 0.1,
    weaponMultiplier: 1
}

export function enemyAttack() {
    const enemyDamage = currentEnemy.baseStrength * currentEnemy.weaponMultiplier

    const guaranteedHits = Math.floor(currentEnemy.attackAccuracy)
    player.health -= enemyDamage * guaranteedHits

    // chanced hits
    if (Math.random() < (currentEnemy.attackAccuracy-Math.floor(currentEnemy.attackAccuracy))) {
        player.health -= enemyDamage
    }

}

export let totalEnemyDamage = 0.1

let enemyAttackInterval = setInterval(
    enemyAttack,
    1000 * (1 / currentEnemy.attackSpeed)
);

export function initaliseEnemy() {
    totalEnemyDamage = currentEnemy.baseStrength * currentEnemy.weaponMultiplier
    clearInterval(enemyAttackInterval)
    enemyAttackInterval = setInterval(
        enemyAttack,
        1000 * (1 / currentEnemy.attackSpeed)
    );
}

export function unintialiseEnemy() {
    totalEnemyDamage = 0;
    clearInterval(enemyAttackInterval);
}

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function generateEnemyKillless() {
    const newHealth = roomTable[player.room][1] * rand(3/4, 4/3)
    const newAttackSpeed = Math.log10(roomTable[player.room][1] + 10) * rand(3/4, 4/3) * 0.5
    const newAttackAccuracy = Math.max(1, (Math.log10(roomTable[player.room][1] + 10))/2) * rand(3/4, 4/3) * 0.55
    const newBaseStrength = roomTable[player.room][1] * rand(3/4, 4/3) * 0.1

    currentEnemy = {
        health: newHealth,
        attackSpeed: newAttackSpeed,
        attackAccuracy: newAttackAccuracy,
        baseStrength: newBaseStrength,
        weaponMultiplier: 1 
    }
}

export function generateEnemy() {
    generateEnemyKillless()
    player.enemiesKilled++;
    initaliseEnemy()
}

export function resetKills() {
    player.enemiesKilled = 0
}