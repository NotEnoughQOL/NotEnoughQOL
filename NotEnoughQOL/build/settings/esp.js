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

@Vigilant("NotEnoughRacismConfig/ESP")

class ESP {

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
        name: "Enable",
        description: "Global toggle",
        category: "General"
    }) enabled = false;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Show nametag",
        description: "Shows nametags through walls",
        category: "Miniboss ESP",
        //  subcategory: "Miniboss ESP"
    }) showMiniNametags = false;

    @SwitchProperty({
        name: "Show hitbox",
        description: "Shows hitboxes",
        category: "Miniboss ESP",
        //    subcategory: "Miniboss ESP"
    }) showMiniHitboxes = false;

    @SwitchProperty({
        name: "Through walls",
        description: "Shows hitboxes through walls",
        category: "Miniboss ESP",
        //   subcategory: "Miniboss ESP"
    }) showMiniThroughWalls = false;

    @ColorProperty({
        name: "Hitbox Color",
        description: "",
        category: "Miniboss ESP",
        //  subcategory: "Miniboss ESP"
    }) miniHitboxColor = Color.RED;

    @SliderProperty({
        name: 'Max distance',
        description: 'Max distance to draw hitboxes/names',
        category: 'Miniboss ESP',
        // subcategory: "Miniboss ESP",
        min: 1,
        max: 50
    }) maxMiniDistance = 50;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Show nametag",
        description: "Shows nametags through walls",
        category: "Star Mob ESP",
        //  subcategory: "ESP"
    }) showStarNametags = false;

    @SwitchProperty({
        name: "Show hitbox",
        description: "Shows hitboxes",
        category: "Star Mob ESP",
        // subcategory: "ESP"
    }) showStarHitboxes = false;

    @SwitchProperty({
        name: "Through walls",
        description: "Shows hitboxes through walls",
        category: "Star Mob ESP",
        //  subcategory: "ESP"
    }) showStarThroughWalls = false;

    @ColorProperty({
        name: "Hitbox Color",
        description: "",
        category: "Star Mob ESP",
        // subcategory: "ESP"
    }) starHitboxColor = Color.RED;

    @SliderProperty({
        name: 'Max distance',
        description: 'Max distance to draw hitboxes/names',
        category: 'Star Mob ESP',
        //subcategory: "ESP",
        min: 1,
        max: 50
    }) maxStarDistance = 50;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Show hitbox",
        description: "Shows hitboxes",
        category: "Bat ESP",
        // subcategory: "ESP"
    }) showBatHitboxes = false;

    @SwitchProperty({
        name: "Through walls",
        description: "Shows hitboxes through walls",
        category: "Bat ESP",
        // subcategory: "ESP"
    }) showBatThroughWalls = false;

    @ColorProperty({
        name: "Hitbox Color",
        description: "",
        category: "Bat ESP",
        // subcategory: "ESP"
    }) batHitboxColor = Color.RED;

    @SliderProperty({
        name: 'Max distance',
        description: 'Max distance to draw hitboxes',
        category: 'Bat ESP',
        //subcategory: "ESP",
        min: 1,
        max: 50
    }) maxBatDistance = 50;

    @SwitchProperty({
        name: "Wither Key ESP",
        description: "Enables Wither Key ESP",
        category: "Key ESP",
        subcategory: "Wither Key ESP"
    }) witherKey = false;

    @ColorProperty({
        name: "Wither Key ESP Color",
        description: "Changes the color for Wither Key ESP",
        category: "Key ESP",
        subcategory: "Wither Key ESP"
    }) witherKeyColor = Color.RED

    @SwitchProperty({
        name: "Blood Key ESP",
        description: "Enables Blood Key ESP",
        category: "Key ESP",
        subcategory: "Blood Key ESP"
    }) bloodKey = false;

    @ColorProperty({
        name: "Blood Key ESP Color",
        description: "Changes the color for Blood Key ESP",
        category: "Key ESP",
        subcategory: "Blood Key ESP"
    }) bloodKeyColor = Color.RED

    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Sneaky Creeper ESP",
        description: "Enables Sneaky Creeper ESP",
        category: "Bestiary ESP",
        subcategory: "Sneaky Creeper ESP"
    }) creeperEsp = false;



    @ColorProperty({
        name: "Sneaky Creeper ESP Color",
        description: "Changes the Highlight Color for Sneaky Creepers",
        category: "Bestiary ESP",
        subcategory: "Sneaky Creeper ESP"
    }) creeperESPColor = Color.GREEN;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Arachne Keeper ESP",
        description: "Enables Arachne Keeper ESP",
        category: "Bestiary ESP",
        subcategory: "Arachne Keeper ESP"
    }) arachneKeeperESP = false;

    @ColorProperty({
        name: "Arachne Keeper ESP Color",
        description: "Changes the Highlight Color for Arachne Keepers",
        category: "Bestiary ESP",
        subcategory: "Arachne Keeper ESP"
    }) arachneKeeperESPColor = Color.GREEN;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Endstone Protector ESP",
        description: "Enables Endstone Protector ESP",
        category: "Endstone Protector ESP",
        // subcategory: "ESP"
    }) ironGolemESP = false;



    @ColorProperty({
        name: "Endstone Protector ESP Color",
        description: "Changes the Highlight Color for Endstone Protectors",
        category: "Endstone Protector ESP",
        // subcategory: "End Island ESP"
    }) ironGolemESPColor = Color.RED

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Pelt Animal ESP",
        description: "Enables Pelt Animal ESP",
        category: "Misc ESP",
        subcategory: "Pelt ESP"
    }) peltESP = false;

    @ColorProperty({
        name: "Pelt Animal ESP Color",
        description: "Changes the Highlight color for Pelt Animals",
        category: "Misc ESP",
        subcategory: "Pelt ESP"
    }) peltESPColor = Color.RED

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Island Witch ESP",
        description: "Enables Island Witch ESP",
        category: "Misc ESP",
        subcategory: "Island Witch ESP"
    }) islandWitchESP = false;

    @ColorProperty({
        name: "Island Witch ESP Color",
        description: "Changes the Highlight Color for Island Witches",
        category: "Misc ESP",
        subcategory: "Island Witch ESP"
    }) islandWitchESPColor = Color.RED


    @SwitchProperty({
        name: "Gemstone ESP Toggle",
        description: "Click the switch to the right to toggle the Gemstone ESP module.\nGemstone ESP highlights most types of gemstones, as well as chests",
        category: "Gemstone ESP",
        subcategory: "Toggle"
    })
    gemstoneESPToggle = false;

    @SelectorProperty({
        name: "Gemstone ESP box style",
        description: "Click the arrow to select the style you want the esp boxes to have.",
        category: "Gemstone ESP",
        subcategory: "Type",
        options: ['Full boxes', 'Small boxes']
    })
    gemstoneBoxStyle = 0;

    constructor() {
        this.initialize(this);
    }
}
export default new ESP;