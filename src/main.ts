import player from './data';
import element from './dom';
import { currentEnemy, generateEnemy } from './enemies';
import './style.css';
import { difficulty, isLevelFinished, name } from './levels'

element("attackButton").onclick = () => {
    currentEnemy.health -= 0.1 // will calculate actual damage soon:tm:
}

function renegeratePlayer() {
    if (player.health < player.maxHealth) player.health += 0.001
}

function updateTexts() {
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
}

let totalDamage = 0.1
const TPS = 20;

// game loop
setInterval(() => {
    if (currentEnemy.health <= 0.0001 && !isLevelFinished()) generateEnemy();
    renegeratePlayer()
    if(isLevelFinished()) {
        element("levelUp").removeAttribute("disabled");
        element("h").textContent = "enabled"
        currentEnemy.baseStrength = 0
    } else {
        element("levelUp").setAttribute("disabled", "disabled");
        element("h").textContent = "disabled"
    }
    totalDamage = player.baseStrength * player.weaponMultiplier
}, 1000 / TPS);

// update loop
function update(): void {
    updateTexts();
    setTimeout(update, 1000 / player.settings.ups);
}

update();