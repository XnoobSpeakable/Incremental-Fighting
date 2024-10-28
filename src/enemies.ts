import player from "./data"

export interface Enemy {
    health: number
    attackSpeed: number
    attackAccuracy: number
    baseStrength: number
    weaponMultiplier: number
}

export let currentEnemy: Enemy = {
    health: 1,
    attackSpeed: 0.4,
    attackAccuracy: 0.55,
    baseStrength: 0.1,
    weaponMultiplier: 1
}

export function enemyAttack(): void {
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

export function generateEnemy(): void {
    currentEnemy = {
        health: 1,
        attackSpeed: 0.4,
        attackAccuracy: 0.55,
        baseStrength: 0.1,
        weaponMultiplier: 1 
    }
    player.enemiesKilled++;
    initaliseEnemy()
}

export function resetKills(): void {
    player.enemiesKilled = 0
}