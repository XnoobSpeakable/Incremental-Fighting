import player from "./data"
import { difficulty } from "./levels"

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

function RNG(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function generateEnemyKillless(): void {
    const newHealth = difficulty[player.level] * RNG(3/4, 4/3)
    const newAttackSpeed = Math.log10(difficulty[player.level] + 10) * RNG(3/4, 4/3) * 0.45
    const newAttackAccuracy = Math.max(1, (Math.log10(difficulty[player.level] + 10))/2) * RNG(3/4, 4/3) * 0.55
    const newBaseStrength = difficulty[player.level] * RNG(3/4, 4/3) * 0.1

    currentEnemy = {
        health: newHealth,
        attackSpeed: newAttackSpeed,
        attackAccuracy: newAttackAccuracy,
        baseStrength: newBaseStrength,
        weaponMultiplier: 1 
    }
}

export function generateEnemy(): void {
    generateEnemyKillless()
    player.enemiesKilled++;
    initaliseEnemy()
}

export function resetKills(): void {
    player.enemiesKilled = 0
}