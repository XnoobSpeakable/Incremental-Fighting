import element from "./dom"
import { Item } from "./items"

const inventory: Record<string, object> = {
    slot1: {},
    slot2: {},
    slot3: {},
    slot4: {},
    slot5: {},
    slot6: {},
    slot7: {},
    slot8: {},
    slot9: {},
    slot10: {},
    slot11: {},
    slot12: {},
    slot13: {},
    slot14: {},
    slot15: {},
    slot16: {},
    slot17: {},
    slot18: {},
    slot19: {},
    slot21: {},
    slot22: {},
    slot23: {},
    slot24: {},
}

export function updateSlot(slot: number, item: Item) {
    try {
        const slotName = "slot" + slot
        inventory[slotName] = item
        element(slotName).setAttribute("style", `background-image: url(${item.texture}); background-repeat: no-repeat; background-size: 100% 100%; image-rendering: pixelated;`)  
        element(slotName).textContent = item.displayName  
    }
    catch {
        console.log("updateSlot error: Slot number or item object is messed up somehow, double check your inputs.")
    }
}

export function updateSlotByName(slot: keyof typeof inventory, item: Item) {
    try {
        inventory[slot] = item
        element(slot).setAttribute("style", `background-image: url(${item.texture}); background-repeat: no-repeat; background-size: 100% 100%; image-rendering: pixelated;`)  
        element(slot).textContent = item.displayName  
    }
    catch {
        console.log("updateSlot error: Slot number or item object is messed up somehow, double check your inputs.")
    }
}


export function gainItem(item: Item) {
    for(const slotKey in inventory) {
        if(JSON.stringify(inventory[slotKey]) === '{}') {
            updateSlotByName(slotKey, item) 
            return
        }
    }
}