import { Macros, CHAT_PREFIX, PREFIX, GUI_PREFIX, macros } from "../index";


const tradeMacro = new KeyBind("Trade Menu", Keyboard.KEY_NONE, CHAT_PREFIX);
const wardrobeMacro = new KeyBind("Wardrobe Macro", Keyboard.KEY_NONE, CHAT_PREFIX);
let inPets = false;
let inSbMenu = false;
let openTrade = false;

register("tick", () => {
    if (tradeMacro.isPressed()) {
        ChatLib.command("pets");
        inPets = true;
        openTrade = true;
    }
})

register("postGuiRender", () => {
    if (inPets === true && openTrade === true) {
        if (Player.getOpenedInventory().getName().includes("Pets")) {
            Player.getOpenedInventory().click(48, false, "MIDDLE") // Goes to SB Menu
            inSbMenu = true;
        }
    }
})

register("postGuiRender", () => {
    if (inSbMenu === true && openTrade === true) {
        if (Player.getOpenedInventory().getName().includes("SkyBlock Menu")) {
            Player.getOpenedInventory().click(22, false, "MIDDLE") // Enters Trade Menu
            inPets = false;
            inSbMenu = false;
            openTrade = false;
        }
    }
})

let pets = false;
let sbMenu = false;
let openWardrobe = false;

register("tick", () => {
    if (macros.wardrobeType === 1) {
        if (wardrobeMacro.isPressed()) {
            ChatLib.command("pets");
            ChatLib.chat(PREFIX + "Opening Wardrobe")
            pets = true;
            openWardrobe = true;
        }
    } else if (macros.wardrobeType === 0) {
        if (wardrobeMacro.isPressed()) {
            ChatLib.command("wardrobe")
            ChatLib.chat(PREFIX + "Opening Wardrobe")
        }
    }
})

register("postGuiRender", () => {
    if (pets === true && openWardrobe === true) {
        if (Player.getOpenedInventory().getName().includes("Pets")) {
            Player.getOpenedInventory().click(48, false, "MIDDLE") // Goes to SB Menu
            sbMenu = true;
        }
    }
})

register("postGuiRender", () => {
    if (sbMenu === true && openWardrobe === true) {
        if (Player.getOpenedInventory().getName().includes("SkyBlock Menu")) {
            Player.getOpenedInventory().click(32, false, "MIDDLE") // Enters Wardrobe Menu
            pets = false;
            sbMenu = false;
            openWardrobe = false;
        }
    }
})