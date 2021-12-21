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

@Vigilant("NotEnoughRacismConfig/MapScanner")

class DungeonScanner {

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
        name: "Map Enabled",
        description: "Load the Map upon entering a Dungeon and draw it on the Screen.",
        category: "Map",
        subcategory: "Map"
    }) mapEnabled = false;

    @SwitchProperty({
        name: "Tab Info",
        description: "Add additional Info to the Tab List such as puzzles, Wither Doors and total Secret Count.",
        category: "Map",
        subcategory: "Map"
    }) tabInfo = false;

    @SwitchProperty({
        name: "Hide in Boss",
        description: "Don't draw the map in Boss Room.",
        category: "Map",
        subcategory: "Map"
    }) hideInBoss = false;

    @SliderProperty({
        name: "Map X Position",
        description: "Horizontal Position of the Map.",
        category: "Map",
        subcategory: "Map",
        min: 0,
        max: Renderer.screen.getWidth()
    }) mapX = 1;

    @SliderProperty({
        name: "Map Y Position",
        description: "Vertical Position of the Map.",
        category: "Map",
        subcategory: "Map",
        min: 0,
        max: Renderer.screen.getHeight()
    }) mapY = 1;

    @SliderProperty({
        name: "Map Size",
        description: "Size of the Map on Screen.",
        category: "Map",
        subcategory: "Map",
        min: 0,
        max: Math.min(Renderer.screen.getWidth(), Renderer.screen.getHeight())
    }) mapSize = 100;

    @SwitchProperty({
        name: "Playerheads",
        description: "Indicate where other Players are with their Heads.",
        category: "Map",
        subcategory: "Map"
    }) playerHeads = false;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Secret Details",
        description: "Show a detailed Breakdown of Secret Types in the Room Tooltip.",
        category: "Room Tooltip",
        subcategory: "Room Tooltip"
    }) secretDetails = false;

    @SwitchProperty({
        name: "Crypt Counter",
        description: "Show total Crypts for a Room in its Room Tooltip.",
        category: "Room Tooltip",
        subcategory: "Room Tooltip"
    }) crypts = false;

    @SwitchProperty({
        name: "Dungeon Journals",
        description: "Show how many Journals can be found in a Room in its Room Tooltip.",
        category: "Room Tooltip",
        subcategory: "Room Tooltip"
    }) journals = false;

    @SwitchProperty({
        name: "Cellar Spiders",
        description: "Show if a Room contains Cellar Spiders in its Room Tooltip. Wage wanted this",
        category: "Room Tooltip",
        subcategory: "Room Tooltip"
    }) spiders = false;

    @SwitchProperty({
        name: "Fairy Souls",
        description: "Show if a Room contains a Fairy Soul in its Room Tooltip.",
        category: "Room Tooltip",
        subcategory: "Room Tooltip"
    }) fairySouls = false;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Map Background",
        description: "Draw a transparent Background behind the Map.",
        category: "Map Appearance",
        subcategory: "Map Appearance",
    }) mapBackground = false;

    @SwitchProperty({
        name: "Playerhead Outline",
        description: "Draw a black border around Player Heads.",
        category: "Map Appearance",
        subcategory: "Map Appearance",
    }) playerHeadOutline = false;

    @SwitchProperty({
        name: "Show Mimic",
        description: "Draw an icon on the room that has the mimic.",
        category: "Map Appearance",
        subcategory: "Map Appearance",
    }) showMimic = false;

    //---------------------------------------------------------------------------------------------------

    @SwitchProperty({
        name: "Score on Blood Room",
        description: "Once Blood Room is opened, draw approximate Score on the Room.",
        category: "Score",
        subcategory: "Score"
    }) showScore = false;

    @SwitchProperty({
        name: "Exact Score",
        description: "Show the exact score on Blood Room. Requires Score on Blood Room to be enabled.",
        category: "Score",
        subcategory: "Score"

    }) exactScore = false;

    @SwitchProperty({
        name: "Assume Spirit Pet",
        description: "Assume that the first death in every run only reduces 1 score.",
        category: "Score",
        subcategory: "Score"

    }) assumeSpirit = false;


    @SwitchProperty({
        name: "10 Bonus Score",
        description: "Add 10 bonus score to the calculation for Pauls Score Perk.",
        category: "Score",
        subcategory: "Score"

    }) bonusScore = false;

    constructor() {
        this.initialize(this);
    }
}
export default new DungeonScanner;