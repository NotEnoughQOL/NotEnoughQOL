/// <reference types="../CTObfuscatedAutocomplete/index" />
/// <reference lib="esnext" />

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

@Vigilant("NotEnoughRacismConfig/Dungeons")
class Dungeons {

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

    @SelectorProperty({
        name: "Ghost Block Mode",
        description: "The ghost blocking mode.\n&8- Legit requires a Stonk in your hotbar and only works on blocks that a Stonk can insta break",
        category: "Ghost Blocks",
        subcategory: "Ghost Blocks",
        options: ["Normal", "Legit"]
    })
    ghostBlockMode = 0;


    @SwitchProperty({
        name: "Coordinate Ghost Blocks",
        description: "Automatically creates Ghost Blocks in Floor 7 Boss Room",
        category: "Ghost Blocks",
        subcategory: "Ghost Blocks"
    }) coordGB = false;

    @SwitchProperty({
        name: "Stonk Ghost Blocks",
        description: "Creates Ghost Blocks when you right/left click with a Stonk/Golden Pickaxe\n&8- Might be a bit buggy",
        category: "Ghost Blocks",
        subcategory: "Ghost Blocks"
    }) stonkGB = false;

    @SelectorProperty({
        name: "Stonk Ghost Block Click",
        description: "Select on which click ghost blocks are created",
        category: "Ghost Blocks",
        subcategory: "Ghost Blocks",
        options: ["Right Click", "Left Click"]
    }) stonkGBType = 0;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Auto Spirit Leap",
        description: "Enable/Disable AutoSpirit",
        category: "Auto Spirit Leap",
        subcategory: "Auto Spirit Leap"
    }) autospiritToggle = false;

    @TextProperty({
        name: "Leap Name",
        description: "Enter the name you want to leap to",
        category: "Auto Spirit Leap",
        subcategory: "Auto Spirit Leap"
    }) spiritNAME = ""

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Block Sword Animation",
        description: "Blocks the right click animation for some swords",
        category: "Block Sword Animation",
        subcategory: "Block Sword Animation"
    }) blockSword = false;


    @ParagraphProperty({
        name: "Block Sword Animation Swords",
        description: 'Edit which swords animations are blocked\n&8- For swords like "End Stone Sword", you need to enter "end stone" (basically remove "sword")\n&8- Use a "," to split items',
        category: "Block Sword Animation",
        subcategory: "Block Sword Animation"

    })
    blockedSwords = "Hyperion, Scylla, Valkyrie, Astraea, Rogue, Aspect of the End"

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Show Hidden Fels",
        description: "Reveals Hidden Fels",
        category: "QOL",
        subcategory: "QOL"
    })
    hiddenFels = false;

    @SwitchProperty({
        name: "Revels Hidden Shadow Assassins",
        description: "Reveals Hidden Shadow Assassins",
        category: "QOL",
        subcategory: "QOL"
    })
    hiddenSA = false;

    @SwitchProperty({
        name: "Reveal Hidden Blood Mobs",
        description: "Reveals Stealthy Blood Mobs",
        category: "QOL",
        subcategory: "QOL"
    })
    hiddenBloodMobs = false;

    @SwitchProperty({
        name: "Auto Close Chests",
        description: "Auto closes the Chest GUI",
        category: "QOL",
        subcategory: "QOL"
    })
    autoCloseSecretChests = false;
    //---------------------------------------------------------------------------------------------------

    @SliderProperty({
        name: "Auto Sell Delay",
        description: "Set a Click Delay for Auto Sell Macros\n&8- Setting this lower than your ping may cause it to break or miss a few items",
        category: "Macros",
        subcategory: "Macros",
        min: "0",
        max: "500"
    })
    autoSell = 250;

    @ParagraphProperty({
        name: "Add Items to Dungeon Sell",
        description: "Add more items to the Sell List\n&8- Default List: https://pastebin.com/raw/geqbyyCh\n&8- Ensure to seperate each item with a ,",
        category: "Macros",
        subcategory: "Macros"
    })
    dungSellList = ""

    @ParagraphProperty({
        name: "Enchanted Books to Sell",
        description: "Set which enchanted books are sold\n&8- Seperate books with a ,",
        category: "Macros",
        subcategory: "Macros"
    })
    bookSellList = ""

    @ButtonProperty({
        name: "Default Items",
        description: "Click the button to import default Sell Items and Books",
        category: "Macros",
        subcategory: "Macros"
    })
    DefaultSellItems() {
        ChatLib.command("dungitems", true)
    }

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Toggle Secret Aura",
        description: "This is an alternative toggle to using the keybind found in your minecraft controls settings",
        category: "Secret Aura",
        subcategory: ""
    })
    secretAuraToggle = false;

    @SliderProperty({
        name: "Secret Aura Reach",
        description: "Set the maximum reach of the secret aura",
        category: "Secret Aura",
        subcategory: "",
        min: 1,
        max: 6
    })
    auraReach = 5;

    @TextProperty({
        name: "Secret Aura Item",
        description: "Choose which item you want to use to click the secret",
        category: "Secret Aura",
        subcategory: ""
    })
    auraHeldItem = "Rogue Sword";

    constructor() {
        this.initialize(this);
    }
}
export default new Dungeons;