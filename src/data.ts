import Decimal from "break_eternity.js";

const player = {
    maxHealth: 1,
    health: 1,
    attackSpeed: 0.6,
    attackAccuracy: 0.6,
    baseStrength: 0.1,
    weaponMultiplier: 1,
    settings: {
        ups: 20
    },
    room: 0,
    xp: 0,
    enemiesKilled: 0,
    playerLevel: 1,
    hitxp: 0,
    speedxp: 0,
    defensexp: 0,
    punchingBag: 0
};

const gameId = "incrementalfighting_savefile";

/**
 * Recursively merge two objects.
 * @param source The object to which copy the property values from the
 * other object.
 * @param data The object from which to copy property values.
 */
export function deepMerge<T extends object>(source: T, data: T): void {
    for (const key in data) {
        const value = data[key];
        if (
            typeof value === "object" &&
            value !== null &&
            !(value instanceof Decimal)
        ) {
            const newSource = source[key];
            if (!(key in source)) {
                // @ts-expect-error I know this is fine
                source[key] = Array.isArray(value) ? [] : {};
            }
            if (typeof newSource === "object" && newSource !== null) {
                deepMerge(newSource, value);
            }
        } else source[key] = value;
    }
}

export function save(): void {
    localStorage.setItem(gameId, JSON.stringify(player));
}

export function load(): void {
    const save = localStorage.getItem(gameId);
    if (save === null) return;
    const parsed = JSON.parse(save);
    deepMerge(player, parsed);
}

export default player;