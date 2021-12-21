import { macros, GUI_PREFIX, CHAT_PREFIX, PREFIX } from "../index";

const storageSlot1 = new KeyBind("Storage Macro 1", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot2 = new KeyBind("Storage Macro 2", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot3 = new KeyBind("Storage Macro 3", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot4 = new KeyBind("Storage Macro 4", Keyboard.KEY_NONE, GUI_PREFIX);
const storageMacro = new KeyBind("Storage Macro", Keyboard.KEY_NONE, CHAT_PREFIX);

let inPets = false;
let inSBMenu = false;
let openStorage = false;

register("tick", () => {
    if (storageMacro.isPressed()) {
        if (macros.storageType === 0) {
            ChatLib.chat(PREFIX + "Opening Storage")
            ChatLib.command("storage")
        } else if (macros.storageType === 1) {
            ChatLib.chat(PREFIX + "Opening In Combat Storage")
            ChatLib.command("pets")
            inPets = true;
            openStorage = true;
        }
    }
})

register("postGuiRender", () => {
    if (inPets && openStorage) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("Pets")) {
            inv.click(48, false, "MIDDLE")
            inPets = false;
            inSBMenu = true;
        }
    }
})

register("postGuiRender", () => {
    if (inSBMenu && openStorage) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("SkyBlock Menu")) {
            inv.click(25, false, "MIDDLE")
            inSBMenu = false;
            openStorage = false;
        }
    }
})

// --------------------------------------------------------------------------------------------------------

let inPet = false;
let inSB = false;
let inStorage = false;
let storageOpen = false;
let slot = 0;

register("tick", () => {
    if (storageSlot1.isPressed()) {
        ChatLib.chat(PREFIX + "Opening Backpack")
        ChatLib.command("pets")
        inPet = true;
        storageOpen = true;
        slot = macros.storage1
    }
    if (storageSlot2.isPressed()) {
        ChatLib.chat(PREFIX + "Opening Backpack")
        ChatLib.command("pets")
        inPet = true;
        storageOpen = true;
        slot = macros.storage2
    }
    if (storageSlot3.isPressed()) {
        ChatLib.chat(PREFIX + "Opening Backpack")
        ChatLib.command("pets")
        inPet = true;
        storageOpen = true;
        slot = macros.storage3
    }
    if (storageSlot4.isPressed()) {
        ChatLib.chat(PREFIX + "Opening Backpack")
        ChatLib.command("pets")
        inPet = true;
        storageOpen = true;
        slot = macros.storage4
    }
})

register("postGuiRender", () => {
    if (inPet && storageOpen) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("Pets")) {
            inv.click(48, false, "MIDDLE")
            inPet = false;
            inSB = true;
        }
    }
})

register("postGuiRender", () => {
    if (inSB && storageOpen) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("SkyBlock Menu")) {
            inv.click(25, false, "MIDDLE")
            inSB = false;
            inStorage = true;
        }
    }
})

register("postGuiRender", () => {
    if (inStorage && storageOpen) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("Storage")) {
            inv.click(slot + 27, false, "LEFT")
            inStorage = false;
            storageOpen = false;
        }
    }
})

// --------------------------------------------------------------------------------------------------------

const echestMacro = new KeyBind("Ender Chest Macro", Keyboard.KEY_NONE, GUI_PREFIX);
let pet = false;
let sb = false;
let st = false;
let tried = false;
let page = 0

register("tick", () => {
    if (echestMacro.isPressed()) {
        ChatLib.chat(PREFIX + "Opening Ender Chest Page")
        ChatLib.command("pets")
        pet = true;
        tried = true;
        page = macros.echestPage
    }
})

register("postGuiRender", () => {
    if (pet && tried) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("Pets")) {
            inv.click(48, false, "MIDDLE")
            pet = false;
            sb = true;
        }
    }
})

register("postGuiRender", () => {
    if (sb && tried) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("SkyBlock Menu")) {
            inv.click(25, false, "MIDDLE")
            sb = false;
            st = true;
        }
    }
})

register("postGuiRender", () => {
    if (st && tried) {
        let inv = Player.getOpenedInventory()
        if (inv.getName().includes("Storage")) {
            inv.click(page + 9, false, "LEFT")
            st = false;
            tried = false;
        }
    }
})