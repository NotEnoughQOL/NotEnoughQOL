import { config, CHAT_PREFIX, PREFIX, mc, GUI_PREFIX } from "../index";

let first_slot_keybind = new KeyBind("Wardrobe Slot 1", Keyboard.KEY_NONE, GUI_PREFIX);
let second_slot_keybind = new KeyBind("Wardrobe Slot 2", Keyboard.KEY_NONE, GUI_PREFIX);
let third_slot_keybind = new KeyBind("Wardrobe Slot 3", Keyboard.KEY_NONE, GUI_PREFIX);
let fourth_slot_keybind = new KeyBind("Wardrobe Slot 4", Keyboard.KEY_NONE, GUI_PREFIX);
let fifth_slot_keybind = new KeyBind("Wardrobe Slot 5", Keyboard.KEY_NONE, GUI_PREFIX);
let sixth_slot_keybind = new KeyBind("Wardrobe Slot 6", Keyboard.KEY_NONE, GUI_PREFIX);
let seventh_slot_keybind = new KeyBind("Wardrobe Slot 7", Keyboard.KEY_NONE, GUI_PREFIX);
let eighth_slot_keybind = new KeyBind("Wardrobe Slot 8", Keyboard.KEY_NONE, GUI_PREFIX);
let nineth_slot_keybind = new KeyBind("Wardrobe Slot 9", Keyboard.KEY_NONE, GUI_PREFIX);

let attemptedToSwapArmor = false;
let hasOpenedSBMenu = false;
let hasOpenedWardrobeMenu = false;
let slotNumber = 69;

register("tick", function() {
    if (first_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 1;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (second_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 2;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (third_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 3;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (fourth_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 4;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (fifth_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 5;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (sixth_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 6;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (seventh_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 7;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (eighth_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 8;
            attemptedToSwapArmor = true;
        }).start();
    }
    if (nineth_slot_keybind.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Swapping Armor")
            ChatLib.command("pets");
            slotNumber = 9;
            attemptedToSwapArmor = true;
        }).start();
    }
})

register("postGuiRender", function() {
    new Thread(() => {
        if (attemptedToSwapArmor /*&& !hasOpenedSBMenu */ && Player.getOpenedInventory().getName().includes("Pets")) {
            let inv = Player.getOpenedInventory();
            for (let i = 0; i < 65; i++) {
                let item = inv.getStackInSlot(i);
                if (item.getName().includes("Go Back")) {
                    let action = Action.of(inv, i, "CLICK");
                    action.setClickString("MIDDLE");
                    action.complete();
                    hasOpenedSBMenu = true;
                }
            }
        }
        if (attemptedToSwapArmor && hasOpenedSBMenu && Player.getOpenedInventory().getName().includes("SkyBlock Menu")) {
            let inv2 = Player.getOpenedInventory();
            for (let i2 = 0; i2 < 45; i2++) {
                let item2 = inv2.getStackInSlot(i2);
                if (item2.getName().includes("Wardrobe")) {
                    let action = Action.of(inv2, i2, "CLICK");
                    action.setClickString("MIDDLE");
                    action.complete();
                    hasOpenedWardrobeMenu = true;
                }
            }
        }
        if (attemptedToSwapArmor && hasOpenedWardrobeMenu && Player.getOpenedInventory().getName().includes("Wardrobe")) {
            let inv3 = Player.getOpenedInventory();
            for (let i3 = 0; i3 < 45; i3++) {
                let item3 = inv3.getStackInSlot(i3);
                if (item3.getName().includes(`Slot ${slotNumber}:`)) {
                    let action = Action.of(inv3, i3, "CLICK");
                    action.setClickString("LEFT");
                    action.complete();
                    Client.currentGui.close();
                    hasOpenedSBMenu = false;
                    hasOpenedWardrobeMenu = false;
                    attemptedToSwapArmor = false;
                }
            }
        }
    }).start();
})


/*const wardrobeSlot1 = new KeyBind("Wardrobe Swap 1", Keyboard.KEY_NONE, GUI_PREFIX);
const wardrobeSlot2 = new KeyBind("Wardrobe Swap 2", Keyboard.KEY_NONE, GUI_PREFIX);
const wardrobeSlot3 = new KeyBind("Wardrobe Swap 3", Keyboard.KEY_NONE, GUI_PREFIX);
const wardrobeSlot4 = new KeyBind("Wardrobe Swap 4", Keyboard.KEY_NONE, GUI_PREFIX);
let inPet = false;
let inSBMenu = false;
let inWardrobe = false;
let armorSwapping = false;
let slotNumber;
register("tick", () => {
    if (wardrobeSlot1.isPressed()) {
        ChatLib.command("pets")
        ChatLib.chat(PREFIX + "Swapping Armor")
        inPet = true;
        armorSwapping = true;
        slotNumber = config.wardrobeSlot1
    }
    if (wardrobeSlot2.isPressed()) {
        ChatLib.command("pets")
        ChatLib.chat(PREFIX + "Swapping Armor")
        inPet = true;
        armorSwapping = true;
        slotNumber = config.wardrobeSlot2
    }
    if (wardrobeSlot3.isPressed()) {
        ChatLib.command("pets")
        ChatLib.chat(PREFIX + "Swapping Armor")
        inPet = true;
        armorSwapping = true;
        slotNumber = config.wardrobeSlot3
    }
    if (wardrobeSlot4.isPressed()) {
        ChatLib.command("pets")
        ChatLib.chat(PREFIX + "Swapping Armor")
        inPet = true;
        armorSwapping = true;
        slotNumber = config.wardrobeSlot4
    }
})

register("postGuiRender", () => {
    if (inPet === true && armorSwapping === true) {
        if (Player.getOpenedInventory().getName().includes("Pets")) {
            Player.getOpenedInventory().click(48, false, "MIDDLE");
            inPet = false;
            inSBMenu = true;
        }
    }
})

register("postGuiRender", () => {
    if (inSBMenu === true && armorSwapping === true) {
        if (Player.getOpenedInventory().getName().includes("SkyBlock Menu")) {
            Player.getOpenedInventory().click(32, false, "MIDDLE");
            inSBMenu = false;
            inWardrobe = true;
        }
    }
})

register("postGuiRender", () => {
    if (inWardrobe === true && armorSwapping === true) {
        if (Player.getOpenedInventory().getName().includes("Wardrobe")) {
            Player.getOpenedInventory().click(slotNumber + 36, false, "LEFT")
            Client.currentGui.close()
            inWardrobe = false;
            armorSwapping = false;
        }
    }
})*/
