import player from "./data";
import element from "./dom";

export const punchingBags = [0.03, 0.1, 0.33, 1]

element("hitTrainingButton").onclick = () => {
    element("hitTrainingButton").setAttribute("disabled", "disabled");
    player.hitxp += punchingBags[player.punchingBag]
    player.health -= punchingBags[player.punchingBag] * 4
    setTimeout(() => {
        element("hitTrainingButton").removeAttribute("disabled");
    }, 1000 / player.attackSpeed);
}


element("speedTrainingButton").onclick = () => {
    element("speedTrainingButton").setAttribute("disabled", "disabled");
    player.speedxp += punchingBags[player.punchingBag] * 9
    player.health -= punchingBags[player.punchingBag] * 4
    setTimeout(() => {
        element("speedTrainingButton").removeAttribute("disabled");
    }, 1000 / player.attackSpeed);
}

element("defenseTrainingButton").onclick = () => {
    element("defenseTrainingButton").setAttribute("disabled", "disabled");
    player.defensexp += punchingBags[player.punchingBag] * 3
    player.health -= punchingBags[player.punchingBag] * 35
    setTimeout(() => {
        element("defenseTrainingButton").removeAttribute("disabled");
    }, 1000 / player.attackSpeed);
}
