import element from "./dom"
import { Item } from "./items"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inventory: Record<string, any> = {
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
    }
    catch {
        console.log("updateSlot error: Slot number or item object is messed up somehow, double check your inputs.")
    }
}