import player from "./data"

export interface Enemy {
    health: number
    attackSpeed: number
    attackAccuracy: number
    baseStrength: number
    weaponMultiplier: number
}

//starts at -1 because on tutorial level an extra phantom enemy is killed to initialize some code
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

//starts at -1 because on tutorial level an extra phantom enemy is killed to initialize some code
export let enemiesKilled = -1

export let totalEnemyDamage = 0.1

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
    totalEnemyDamage = currentEnemy.baseStrength * currentEnemy.weaponMultiplier
    clearInterval(enemyAttackInterval)
    enemyAttackInterval = setInterval(() => {
        enemyAttack();
    }, 1000 * (1 / currentEnemy.attackSpeed));
}

export function resetKills() {
    enemiesKilled = 0
}