import player, { load, save } from './data';
import element from './dom';
import { currentEnemy, generateEnemy, generateEnemyKillless, initaliseEnemy, totalEnemyDamage, unintialiseEnemy } from './enemies';
import './style.css';
import { isroomFinished, roomEnemies, die, initaliseroom, roomTable } from './rooms'

function preTabDisplay() {
    element("fightingTab").style.display  = "none";
    element("trainingTab").style.display  = "none";
    element("inventoryTab").style.display = "none";
}

function openTab(tab: string) {
    preTabDisplay();
    element(tab + "Tab").style.display = "block";
    if (tab === "fighting") initaliseEnemy();
    else unintialiseEnemy();
}


element("fightingButton").onclick = () => {openTab("fighting")};
element("trainingButton").onclick = () => {openTab("training")};
element("inventoryButton").onclick = () => {openTab("inventory")};

element("attackButton").onclick = () => {
    element("attackButton").setAttribute("disabled", "disabled");

    const guaranteedHits = Math.floor(player.attackAccuracy);
    currentEnemy.health -= totalDamage * guaranteedHits;

    // chanced hits
    if (Math.random() < (player.attackAccuracy-Math.floor(player.attackAccuracy)))
        currentEnemy.health -= totalDamage;

    player.xp += currentEnemy.baseStrength * currentEnemy.attackSpeed;

    setTimeout(() => {
        element("attackButton").removeAttribute("disabled");
    }, 1000 / player.attackSpeed);
}

function renegeratePlayer() {
    if (player.health < player.maxHealth) player.health += 0.001; // will calculate actual regen soon
}

function updateTexts() {
    element("roomDisplay").textContent = `Room ${player.room}`;
    element("roomNameDisplay").textContent = roomTable[player.room][2];
    element("roomDifficultyDisplay").textContent = `Room difficulty: ${roomTable[player.room][1]}`;

    element("healthDisplay").textContent = `HP: ${player.health.toFixed(2)}`;
    element("xpDisplay").textContent = `XP: ${player.xp.toFixed(2)}`;
    element("lvlDisplay").textContent = `LVL: ${player.playerLevel.toFixed(2)}`;
    element("attackSpeedDisplay").textContent = `ATK Speed: ${player.attackSpeed.toFixed(2)}`;
    element("attackAccuracyDisplay").textContent = `ATK Accuracy: ${(100*player.attackAccuracy).toFixed(2)}%`;
    element("baseStrengthDisplay").textContent = `ATK Strength: ${player.baseStrength.toFixed(2)}`;
    element("weaponMultiplierDisplay").textContent = `Weapon Multiplier: ${player.weaponMultiplier.toFixed(2)}`;
    element("totalDamageDisplay").textContent = `Damage: ${totalDamage.toFixed(2)}`;

	element("enemyHealthDisplay").textContent = `Enemy HP: ${currentEnemy.health.toFixed(2)}`;
    element("enemyAttackSpeedDisplay").textContent = `Enemy ATK Speed: ${currentEnemy.attackSpeed.toFixed(2)}`;
    element("enemyAttackAccuracyDisplay").textContent = `Enemy ATK Accuracy: ${(100*currentEnemy.attackAccuracy).toFixed(2)}%`;
    element("enemyBaseStrengthDisplay").textContent = `Enemy ATK Strength: ${currentEnemy.baseStrength.toFixed(2)}`;
    element("enemyWeaponMultiplierDisplay").textContent = `Enemy Weapon Multiplier: ${currentEnemy.weaponMultiplier.toFixed(2)}`;
    element("enemyTotalDamageDisplay").textContent = `Enemy Damage: ${totalEnemyDamage.toFixed(2)}`;

    element("killToll").textContent = `${player.enemiesKilled}/${roomEnemies} enemies killed`;

    if (isroomFinished()) {
        element("enemyHealthDisplay").textContent = `All enemies killed`;
        element("enemyAttackSpeedDisplay").textContent = `All enemies killed`;
        element("enemyAttackAccuracyDisplay").textContent = `All enemies killed`;
        element("enemyBaseStrengthDisplay").textContent = `All enemies killed`;
        element("enemyWeaponMultiplierDisplay").textContent = `All enemies killed`;
        element("enemyTotalDamageDisplay").textContent = `All enemies killed`;
    }
}

let totalDamage = 0.1;

function levelUpPlayer() {
    player.playerLevel = (player.xp / 20) + 1;
    player.maxHealth = Math.sqrt(player.playerLevel);
    player.attackSpeed = Math.log10(Math.log10(player.playerLevel + 2)) + 1 //need feature to boost thing
    player.attackAccuracy = Math.max(1, (Math.log10(player.playerLevel * 10))/2) * 0.6
    player.baseStrength = Math.log10(player.playerLevel + 9) * (player.playerLevel**0.75) * 0.1
} // hewwo uwu :3

const TPS = 20;

// game loop
setInterval(() => {
    if (currentEnemy.health <= 0.0001 && !isroomFinished()) generateEnemy();
    renegeratePlayer();
    totalDamage = player.baseStrength * player.weaponMultiplier;
    levelUpPlayer()
    if (player.health <= 0)
        die();
}, 1000 / TPS);

// update loop
function update() {
    updateTexts();
    if (isroomFinished()) {
        element("roomUp").removeAttribute("disabled");
        unintialiseEnemy()
        element("attackButton").setAttribute("disabled", "disabled");
    } else {
        element("roomUp").setAttribute("disabled", "disabled");
    }
    setTimeout(update, 1000 / player.settings.ups);
}

update();

load();
initaliseroom();
generateEnemyKillless();
initaliseEnemy();
preTabDisplay();
openTab("fighting");

setInterval(save, 1000);