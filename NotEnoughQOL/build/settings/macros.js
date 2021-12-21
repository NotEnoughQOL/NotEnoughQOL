/// <reference types="../CTObfuscatedAutocomplete/index" />
/// <reference lib="esnext" />

import esp from "./esp";
import {
    @ButtonProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @TextProperty,
    @SwitchProperty,
    @SliderProperty,
    @Vigilant,
    @CheckboxProperty,
    @ParagraphProperty
} from '../../../Vigilance';

@Vigilant("NotEnoughRacismConfig/Macros")

class Macros {

    @SwitchProperty({
        name: "Shortcuts",
        category: "Shortcuts"
    })
    shotcuts = true;

    @ButtonProperty({
        name: "Main GUI",
        description: "Shortcut to Main GUI",
        category: "Shortcuts"
    })
    mainGui() {
        Client.currentGui.close()
        ChatLib.command("ner", true)
    }
    @ButtonProperty({
        name: "General GUI",
        description: "Shortcut to General GUI",
        category: "Shortcuts"
    })
    generalGui() {
        Client.currentGui.close()
        ChatLib.command("nergeneral", true)
    }

    @ButtonProperty({
        name: "Dungeons GUI",
        description: "Shortcut to Dungeons GUI",
        category: "Shortcuts"
    })
    dungeonsGui() {
        Client.currentGui.close()
        ChatLib.command("nerdungeons", true)
    }

    @ButtonProperty({
        name: "Map Scanner GUI",
        description: "Shortcut to Map Scanner GUI",
        category: "Shortcuts"
    })
    mapScannerGui() {
        Client.currentGui.close()
        ChatLib.command("nermapscanner", true)
    }

    @ButtonProperty({
        name: "ESP GUI",
        description: "Shortcut to ESP GUI",
        category: "Shortcuts"
    })
    espGui() {
        Client.currentGui.close()
        ChatLib.command("neresp", true)
    }

    @ButtonProperty({
        name: "Macros GUI",
        description: "Shortcut to Macros GUI",
        category: "Shortcuts"
    })
    macrosGui() {
        Client.currentGui.close()
        ChatLib.command("nermacros", true)
    }

    @ButtonProperty({
        name: "Slayer GUI",
        description: "Shortcut to Slayer GUI",
        category: "Shortcuts"
    })
    slayerGui() {
        Client.currentGui.close()
        ChatLib.command("nerslayer", true)
    }

    @SwitchProperty({
        name: "Stop Macros in GUI",
        category: "General",
        subcategory: "Settings"
    })
    guiCheck = true;

    @SwitchProperty({
        name: "Toggle Sprint Overlay",
        description: "Renders a message saying ur sprinting",
        category: "General",
        subcategory: "Settings"
    })
    toggleSprintRender = true;

    @SliderProperty({
        name: "In Combat Macro Click Delay",
        description: "Set a Click Delay for In Combat Macros\n&8- Setting this lower than your ping will cause it to break, so ensure the delay is higher than your ping",
        category: "Misc",
        // subcategory: "Misc",
        min: "0",
        max: "1000"
    })
    wardrobeDelay = 500;

    @SwitchProperty({
        name: "Auto Salvage",
        description: "Automatically salvage non-starred dungeon items when inside of the salvage item menu.\n&8- You need to simply shift click the item in and it will salvage",
        category: "Misc",
        //subcategory: "Misc"
    })
    autoSalvage = false;

    @SwitchProperty({
        name: "Auto Combine",
        description: "Automatically combine enchanted books when inside of an anvil.",
        category: "Misc",
        // subcategory: "Misc"
    })
    autoCombine = false;

    @SwitchProperty({
        name: "Auto Harp",
        description: "Automatically completes harp songs.",
        category: "Misc",
        //  subcategory: "Misc"
    })
    autoHarp = false;

    @SwitchProperty({
        name: "Auto Mort",
        description: "Automatically starts dungeon and readies up.",
        category: "Misc",
        // subcategory: "Misc"
    })
    autoMort = false;

    @SwitchProperty({
        name: "Auto Party Transfer",
        description: "Automatically transfers the party to another player",
        category: "Misc",
        //subcategory: "Misc"
    })
    autoTransfer = false;

    //---------------------------------------------------------------------------------------------------

    @SelectorProperty({
        name: "Wardrobe Macro Type",
        description: "Choose In Combat or Normal Wardrobe Macro",
        category: "Misc",
        subcategory: "Wardrobe",
        options: ["Normal", "In Combat"]
    })
    wardrobeType = 0;

    // @SelectorProperty({
    //     name: "Wardrobe Macro 1",
    //     category: "Macros",
    //     subcategory: "Wardrobe",
    //     options: [
    //         "Wardrobe Slot 1",
    //         "Wardrobe Slot 2",
    //         "Wardrobe Slot 3",
    //         "Wardrobe Slot 4",
    //         "Wardrobe Slot 5",
    //         "Wardrobe Slot 6",
    //         "Wardrobe Slot 7",
    //         "Wardrobe Slot 8",
    //         "Wardrobe Slot 9"
    //     ]
    // }) wardrobeSlot1 = 0;

    // @SelectorProperty({
    //     name: "Wardrobe Macro 2",
    //     category: "Macros",
    //     subcategory: "Wardrobe",
    //     options: [
    //         "Wardrobe Slot 1",
    //         "Wardrobe Slot 2",
    //         "Wardrobe Slot 3",
    //         "Wardrobe Slot 4",
    //         "Wardrobe Slot 5",
    //         "Wardrobe Slot 6",
    //         "Wardrobe Slot 7",
    //         "Wardrobe Slot 8",
    //         "Wardrobe Slot 9"
    //     ]
    // }) wardrobeSlot2 = 0;

    // @SelectorProperty({
    //     name: "Wardrobe Macro 3",
    //     category: "Macros",
    //     subcategory: "Wardrobe",
    //     options: [
    //         "Wardrobe Slot 1",
    //         "Wardrobe Slot 2",
    //         "Wardrobe Slot 3",
    //         "Wardrobe Slot 4",
    //         "Wardrobe Slot 5",
    //         "Wardrobe Slot 6",
    //         "Wardrobe Slot 7",
    //         "Wardrobe Slot 8",
    //         "Wardrobe Slot 9"
    //     ]
    // }) wardrobeSlot3 = 0;

    // @SelectorProperty({
    //     name: "Wardrobe Macro 4",
    //     category: "Macros",
    //     subcategory: "Wardrobe",
    //     options: [
    //         "Wardrobe Slot 1",
    //         "Wardrobe Slot 2",
    //         "Wardrobe Slot 3",
    //         "Wardrobe Slot 4",
    //         "Wardrobe Slot 5",
    //         "Wardrobe Slot 6",
    //         "Wardrobe Slot 7",
    //         "Wardrobe Slot 8",
    //         "Wardrobe Slot 9"
    //     ]
    // }) wardrobeSlot4 = 0;

    @SelectorProperty({
        name: "Storage Macro Type",
        description: "Choose In Combat or Normal Storage Macro",
        category: "Storage",
        subcategory: "Type",
        options: ["Normal", "In Combat"]
    })
    storageType = 0;

    @SelectorProperty({
        name: "Storage Macro 1",
        category: "Storage",
        subcategory: "Slots",
        options: [
            "Backpack 1",
            "Backpack 2",
            "Backpack 3",
            "Backpack 4",
            "Backpack 5",
            "Backpack 6",
            "Backpack 7",
            "Backpack 8",
            "Backpack 9",
            "Backpack 10",
            "Backpack 11",
            "Backpack 12",
            "Backpack 13",
            "Backpack 14",
            "Backpack 15",
            "Backpack 16",
            "Backpack 17",
            "Backpack 18"
        ]
    })
    storage1 = 0;

    @SelectorProperty({
        name: "Storage Macro 2",
        category: "Storage",
        subcategory: "Slots",
        options: [
            "Backpack 1",
            "Backpack 2",
            "Backpack 3",
            "Backpack 4",
            "Backpack 5",
            "Backpack 6",
            "Backpack 7",
            "Backpack 8",
            "Backpack 9",
            "Backpack 10",
            "Backpack 11",
            "Backpack 12",
            "Backpack 13",
            "Backpack 14",
            "Backpack 15",
            "Backpack 16",
            "Backpack 17",
            "Backpack 18"
        ]
    })
    storage2 = 0;

    @SelectorProperty({
        name: "Storage Macro 3",
        category: "Storage",
        subcategory: "Slots",
        options: [
            "Backpack 1",
            "Backpack 2",
            "Backpack 3",
            "Backpack 4",
            "Backpack 5",
            "Backpack 6",
            "Backpack 7",
            "Backpack 8",
            "Backpack 9",
            "Backpack 10",
            "Backpack 11",
            "Backpack 12",
            "Backpack 13",
            "Backpack 14",
            "Backpack 15",
            "Backpack 16",
            "Backpack 17",
            "Backpack 18"
        ]
    })
    storage3 = 0;

    @SelectorProperty({
        name: "Storage Macro 4",
        category: "Storage",
        subcategory: "Slots",
        options: [
            "Backpack 1",
            "Backpack 2",
            "Backpack 3",
            "Backpack 4",
            "Backpack 5",
            "Backpack 6",
            "Backpack 7",
            "Backpack 8",
            "Backpack 9",
            "Backpack 10",
            "Backpack 11",
            "Backpack 12",
            "Backpack 13",
            "Backpack 14",
            "Backpack 15",
            "Backpack 16",
            "Backpack 17",
            "Backpack 18"
        ]
    })
    storage4 = 0;

    @SelectorProperty({
        name: "Ender Chest Macro",
        category: "Ender Chest",
        // subcategory: "Storage",
        options: [
            "Page 1",
            "Page 2",
            "Page 3",
            "Page 4",
            "Page 5",
            "Page 6",
            "Page 7",
            "Page 8",
            "Page 9"
        ]
    })
    echestPage = 0;

    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------

    @TextProperty({
        name: "Swap Delay",
        description: "Set a Swap Delay for Bone Macro",
        category: "Bone Macros",
        subcategory: "Delays"
    })
    swapDelay = ""

    @TextProperty({
        name: "Bone Delay",
        description: "Set a Bone Delay for Bone Macro",
        category: "Bone Macros",
        subcategory: "Delays"
    })
    boneDelay = ""

    @TextProperty({
        name: "Bone Macro Swap Slot 1",
        description: "Set Swap Slot 1 for Bone Macro",
        category: "Bone Macros",
        subcategory: "Item Slots"
    })
    swapSlot1 = ""

    @TextProperty({
        name: "Bone Macro Swap Slot 2",
        description: "Set Swap Slot 2 for Bone Macro",
        category: "Bone Macros",
        subcategory: "Item Slots"
    })
    swapSlot2 = ""

    @TextProperty({
        name: "Bone Macro Swap Slot 3",
        description: "Set Swap Slot 3 for Bone Macro",
        category: "Bone Macros",
        subcategory: "Item Slots"
    })
    swapSlot3 = ""

    @SelectorProperty({
        name: "Terminator Swap Type",
        description: "Swap between Toggle o Holding a key down",
        category: "Misc",
        subcategory: "Terminator",
        options: ["Toggle", "Hold"]
    })
    termSwap = 0;

    @SelectorProperty({
        name: "AOTS Macro Type",
        description: "Change AOTS Macro bewteen Toggle and Hold",
        category: "Misc",
        subcategory: "Axe of the Shredded",
        options: ["Toggle", "Hold"]
    })
    axeSwap = 0;

    @TextProperty({
        name: "Left Click Soul Whip Item",
        description: "Set the item you want Left Click Soul Whip to work with",
        category: "Misc",
        subcategory: "Soul Whip"
    })
    leftClickWhip = "Atomsplit Katana"

    //---------------------------------------------------------------------------------------------------

    @SelectorProperty({
        name: "Swap Type",
        description: "Set the swap type for Double Swap Macro",
        category: "Double Swap Macros",
        subcategory: "Swap Type",
        options: ["Swap", "Left Click"]
    })
    swapType = 0;

    @TextProperty({
        name: "Item to Left Click/Swap Back to",
        description: "/ct reload for the change to take effect",
        category: "Double Swap Macros",
        subcategory: "Item Slots"
    })
    swapMacroName = ""

    @TextProperty({
        name: "Swap Slot 1",
        category: "Double Swap Macros",
        subcategory: "Item Slots"
    })
    doubleSwapSlot1 = ""

    @TextProperty({
        name: "Swap Slot 2",
        category: "Double Swap Macros",
        subcategory: "Item Slots"
    })
    doubleSwapSlot2 = ""

    //---------------------------------------------------------------------------------------------------

    @SelectorProperty({
        name: "Swap Type",
        description: "Set the swap type for Triple Swap Macro",
        category: "Triple Swap Macros",
        subcategory: "Type",
        options: ["Swap", "Left Click"]
    })
    typeOfSwap = 0;

    @TextProperty({
        name: "Item to Left Click/Swap Back to",
        description: "/ct reload for the change to take effect",
        category: "Triple Swap Macro",
        subcategory: "Item Slots"
    })
    macroSwapName = ""

    @TextProperty({
        name: "Swap Slot 1",
        category: "Triple Swap Macros",
        subcategory: "Item Slots"
    })
    tripleSwapSlot1 = ""

    @TextProperty({
        name: "Swap Slot 2",
        category: "Triple Swap Macros",
        subcategory: "Item Slots"
    })
    tripleSwapSlot2 = ""

    @TextProperty({
        name: "Swap Slot 3",
        category: "Triple Swap Macros",
        subcategory: "Item Slots"
    })
    tripleSwapSlot3 = ""

    @SwitchProperty({
        name: "Auto Fish Toggle",
        description: "Click the switch to the right to toggle the Auto Fish module",
        category: "Auto Fish",
        subcategory: ""
    })
    autoFishToggle = false;

    @SwitchProperty({
        name: "Invoke Random Motion",
        description: "Choose whether or not you want Auto Fish to press some random key (W,A,S,D) + small head rotation to ensure that you gain fishing xp\n&c&lWarning:&r&c This feature is &lUSE AT YOUR OWN RISK&r&c, because I don't know if Hypixel can detect my &r&cslowly repeating system behind the motion!\n&dNote: &rIf you have this setting enabled, you need to have at least 1, preferably 2 to 3 blocks of space to each direction\n\nUnfortunately, it does not fully work when pulling out mobs that you don't oneshot, because I currently have not made a way to kill them past rod cast. :(",
        category: "Auto Fish",
        subcategory: ""
    })
    autoFishRandomMotion = false;

    constructor() {
        this.initialize(this);
    }
}
export default new Macros;