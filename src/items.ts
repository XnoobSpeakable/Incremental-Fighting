export interface Item {
    displayName: string
    texture: string
    damageMulti?: number
    speedMulti?: number
    baseDurability?: number
    cursability?: number
    lootTier: number
    rarity: number
}

export interface ItemsObject {
    [key: string]: Item;
}

/* Loot tier explanation:
tier 0 is called "common" or "basic"
tier 1 is called "uncommon" or "advanced"
tier 2 is called "rare" or "highly advanced"
tier 3 is called "epic" or "elite"
tier 4 is called "legendary" or "superior elite" */
export const weapons: ItemsObject = {
    woodenSword: {
        displayName: "Wooden Sword",
        texture: "/src/textures/woodenSword.png",
        damageMulti: 1.5,
        speedMulti: 0.95,
        baseDurability: 100,
        cursability: 5,
        lootTier: 1,
        rarity: 4
    },
    copperSword: {
        displayName: "Copper Sword",
        texture: "/src/textures/copperSword.png",
        damageMulti: 2.5,
        speedMulti: 0.7,
        baseDurability: 200,
        cursability: 16.7752462597,
        lootTier: 1,
        rarity: 9
    },
    ironSword: {
        displayName: "Iron Sword",
        texture: "/src/textures/ironSword.png",
        damageMulti: 3,
        speedMulti: 0.8,
        baseDurability: 300,
        cursability: 16.0128372247,
        lootTier: 2,
        rarity: 25
    },
    stainlessSteelSword: {
        displayName: "Stainless Steel Sword",
        texture: "/src/textures/stainlessSteelSword.png",
        damageMulti: 3.5,
        speedMulti: 0.82,
        baseDurability: 400,
        cursability: 15.8444771757,
        lootTier: 2,
        rarity: 45
    },
    titaniumSword: {
        displayName: "Titanium Sword",
        texture: "/src/textures/titaniumSword.png",
        damageMulti: 8,
        speedMulti: 0.9,
        baseDurability: 800,
        cursability: 15.3765769571,
        lootTier: 3,
        rarity: 100
    },
    obsidianSword: {
        displayName: "Obsidian Sword",
        texture: "/src/textures/obsidianSword.png",
        damageMulti: 50,
        speedMulti: 0.92,
        baseDurability: 12,
        cursability: -2,
        lootTier: 3,
        rarity: 90
    },
    neutroniumSword: {
        displayName: "Neutronium Sword",
        texture: "/src/textures/neutroniumSword.png",
        damageMulti: 16000,
        speedMulti: 0.45,
        baseDurability: 2500,
        cursability: 50,
        lootTier: 4,
        rarity: 2500
    },
    CCFSword: { //compressed curse flux
        displayName: "Compressed Curse Flux Sword",
        texture: "/src/textures/CCFSword.png",
        damageMulti: 1.5,
        speedMulti: 2,
        baseDurability: 500,
        cursability: 500,
        lootTier: 4,
        rarity: 2500
    },
}

export const otherItems: ItemsObject = {
    coin: {
        displayName: "Coin",
        texture: "/src/textures/coin.png",
        lootTier: 0,
        rarity: 2
    }
}