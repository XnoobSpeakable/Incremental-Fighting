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
    //we need to all all the other player and enemy stats to this
    element("healthDisplay").textContent = `Health: ${player.health.toFixed(2)}`;
	element("enemyHealthDisplay").textContent = `Enemy Health: ${currentEnemy.health.toFixed(2)}`;
}

const TPS = 20;

// game loop
setInterval(() => {
    if (currentEnemy.health <= 0.0001 && !isLevelFinished()) generateEnemy();
    renegeratePlayer()
    if(isLevelFinished()) {
        element("levelUp").removeAttribute("disabled");
    } else {
        element("levelUp").setAttribute("disabled", "disabled");
    }
}, 1000 / TPS);

// update loop
function update(): void {
    updateTexts();
    setTimeout(update, 1000 / player.settings.ups);
}

update();