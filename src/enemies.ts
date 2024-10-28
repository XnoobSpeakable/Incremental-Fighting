import player from "./data"

export interface Enemy {
    health: number
    attackSpeed: number
    attackAccuracy: number
    baseStrength: number
    weaponMultiplier: number
}

export let currentEnemy: Enemy = {
    health: -1,
    attackSpeed: 0.5,
    attackAccuracy: 0.6,
    baseStrength: 0.1,
    weaponMultiplier: 1
}

export function enemyAttack() {
    const enemyDamage = currentEnemy.baseStrength * currentEnemy.weaponMultiplier
    player.health -= enemyDamage
}

export let enemiesKilled = -1

let enemyAttackInterval = setInterval(() => {
	enemyAttack();
}, 1000 * (1 / currentEnemy.attackSpeed));

export function generateEnemy() {
    currentEnemy = {
        health: 1,
        attackSpeed: 0.5,
        attackAccuracy: 0.6,
        baseStrength: 0.1,
        weaponMultiplier: 1 
    }
    enemiesKilled++;
    clearInterval(enemyAttackInterval)
    enemyAttackInterval = setInterval(() => {
        enemyAttack();
    }, 1000 * (1 / currentEnemy.attackSpeed));
}

export function resetKills() {
    enemiesKilled = 0
}