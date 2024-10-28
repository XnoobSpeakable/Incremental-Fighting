import player, { load, save } from './data';
import element from './dom';
import { currentEnemy, generateEnemy, initaliseEnemy, totalEnemyDamage } from './enemies';
import './style.css';
import { difficulty, isLevelFinished, levelEnemies, name, die, initaliseLevel } from './levels'

element("attackButton").onclick = () => {
    element("attackButton").setAttribute("disabled", "disabled");

    const guaranteedHits = Math.floor(player.attackAccuracy)
    currentEnemy.health -= totalDamage * guaranteedHits

    // chanced hits
    if (Math.random() < player.attackAccuracy) {
        currentEnemy.health -= totalDamage
    }

    setTimeout(() => {
        element("attackButton").removeAttribute("disabled");
    }, 1000 / player.attackSpeed);
}

function renegeratePlayer(): void {
    if (player.health < player.maxHealth) player.health += 0.001 // will calculate actual regen soon
}

function updateTexts(): void {
    element("levelDisplay").textContent = `Level ${player.level}`
    element("levelNameDisplay").textContent = name[player.level]
    element("levelDifficultyDisplay").textContent = `Level difficulty: ${difficulty[player.level]}`

    element("healthDisplay").textContent = `Health: ${player.health.toFixed(2)}`;
    element("attackSpeedDisplay").textContent = `Attack Speed: ${player.attackSpeed.toFixed(2)}`;
    element("attackAccuracyDisplay").textContent = `Attack Accuracy: ${(100*player.attackAccuracy).toFixed(2)}%`;
    element("baseStrengthDisplay").textContent = `Base Strength: ${player.baseStrength.toFixed(2)}`;
    element("weaponMultiplierDisplay").textContent = `Weapon Multiplier: ${player.weaponMultiplier.toFixed(2)}`;
    element("totalDamageDisplay").textContent = `Base Strength: ${totalDamage.toFixed(2)}`;

	element("enemyHealthDisplay").textContent = `Enemy Health: ${currentEnemy.health.toFixed(2)}`;
    element("enemyAttackSpeedDisplay").textContent = `Enemy Attack Speed: ${currentEnemy.attackSpeed.toFixed(2)}`;
    element("enemyAttackAccuracyDisplay").textContent = `Enemy Attack Accuracy: ${(100*currentEnemy.attackAccuracy).toFixed(2)}%`;
    element("enemyBaseStrengthDisplay").textContent = `Enemy Base Strength: ${currentEnemy.baseStrength.toFixed(2)}`;
    element("enemyWeaponMultiplierDisplay").textContent = `Enemy Weapon Multiplier: ${currentEnemy.weaponMultiplier.toFixed(2)}`;
    element("enemyTotalDamageDisplay").textContent = `Enemy Base Strength: ${totalEnemyDamage.toFixed(2)}`;

    element("killToll").textContent = `${player.enemiesKilled}/${levelEnemies} enemies killed`

    if(isLevelFinished()) {
        element("enemyHealthDisplay").textContent = `All enemies killed`;
        element("enemyAttackSpeedDisplay").textContent = `All enemies killed`;
        element("enemyAttackAccuracyDisplay").textContent = `All enemies killed`;
        element("enemyBaseStrengthDisplay").textContent = `All enemies killed`;
        element("enemyWeaponMultiplierDisplay").textContent = `All enemies killed`;
        element("enemyTotalDamageDisplay").textContent = `All enemies killed`;
    }
}

let totalDamage = 0.1
const TPS = 20;

// game loop
setInterval(() => {
    if (currentEnemy.health <= 0.0001 && !isLevelFinished()) generateEnemy();
    renegeratePlayer()
    if(isLevelFinished()) {
        element("levelUp").removeAttribute("disabled");
        currentEnemy.baseStrength = 0
        element("attackButton").setAttribute("disabled", "disabled");
    } else {
        element("levelUp").setAttribute("disabled", "disabled");
    }
    totalDamage = player.baseStrength * player.weaponMultiplier
    if(player.health <= 0) {
        die()
    }
}, 1000 / TPS);

// update loop
function update(): void {
    updateTexts();
    setTimeout(update, 1000 / player.settings.ups);
}

update();

load();
initaliseLevel();
initaliseEnemy();

setInterval(save, 1000);