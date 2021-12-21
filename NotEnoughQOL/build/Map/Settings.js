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
} from '../Vigilance/index';


@Vigilant("DungeonMap+")
class Settings {

    constructor() {
        this.initialize(this)
        this.setCategoryDescription("Map", "General Settings")
        this.setCategoryDescription("Room Tooltip", "Select what information is shown in Room Tooltips")
        this.setCategoryDescription("Map Appearance", "Customize the Appearance of the Map")
        this.setCategoryDescription("Score", "Configure the Score Calculation")
    }


    @SwitchProperty({
        name: "Map Enabled",
        description: "Load the Map upon entering a Dungeon and draw it on the Screen.",
        category: "Map",
    })
    mapEnabled = false;

    @SwitchProperty({
        name: "Tab Info",
        description: "Add additional Info to the Tab List such as puzzles, Wither Doors and total Secret Count.",
        category: "Map",
    })
    tabInfo = false;

    @SwitchProperty({
        name: "Hide in Boss",
        description: "Don't draw the map in Boss Room.",
        category: "Map",
    })
    hideInBoss = true;

    @SliderProperty({
        name: "Map X Position",
        description: "Horizontal Position of the Map.",
        category: "Map",
        min: 0,
        max: Renderer.screen.getWidth()
    })
    mapX = 1;

    @SliderProperty({
        name: "Map Y Position",
        description: "Vertical Position of the Map.",
        category: "Map",
        min: 0,
        max: Renderer.screen.getHeight()
    })
    mapY = 1;

    @SliderProperty({
        name: "Map Size",
        description: "Size of the Map on Screen.",
        category: "Map",
        min: 0,
        max: Math.min(Renderer.screen.getWidth(), Renderer.screen.getHeight())
    })
    mapSize = 100;

    @SwitchProperty({
        name: "Playerheads",
        description: "Indicate where other Players are with their Heads.",
        category: "Map",
    })
    playerHeads = true;

    @SwitchProperty({
        name: "Score on Blood Room",
        description: "Once Blood Room is opened, draw approximate Score on the Room.",
        category: "Score",
    })
    showScore = true;

    @SwitchProperty({
        name: "Secret Details",
        description: "Show a detailed Breakdown of Secret Types in the Room Tooltip.",
        category: "Room Tooltip",
    })
    secretDetails = true;

    @SwitchProperty({
        name: "Crypt Counter",
        description: "Show total Crypts for a Room in its Room Tooltip.",
        category: "Room Tooltip",
    })
    crypts = true;

    @SwitchProperty({
        name: "Dungeon Journals",
        description: "Show how many Journals can be found in a Room in its Room Tooltip.",
        category: "Room Tooltip",
    })
    journals = true;

    @SwitchProperty({
        name: "Cellar Spiders",
        description: "Show if a Room contains Cellar Spiders in its Room Tooltip. Wage wanted this",
        category: "Room Tooltip",
    })
    spiders = true;

    @SwitchProperty({
        name: "Fairy Souls",
        description: "Show if a Room contains a Fairy Soul in its Room Tooltip.",
        category: "Room Tooltip",
    })
    fairySouls = true;

    @SwitchProperty({
        name: "Map Background",
        description: "Draw a transparent Background behind the Map.",
        category: "Map Appearance",
    })
    mapBackground = true;

    @SwitchProperty({
        name: "Playerhead Outline",
        description: "Draw a black border around Player Heads.",
        category: "Map Appearance",
    })
    playerHeadOutline = true;

    @SwitchProperty({
        name: "Show Mimic",
        description: "Draw an icon on the room that has the mimic.",
        category: "Map Appearance",
    })
    showMimic = true;

    @SwitchProperty({
        name: "Exact Score",
        description: "Show the exact score on Blood Room. Requires Score on Blood Room to be enabled.",
        category: "Score",
    })
    exactScore = true;

    @SwitchProperty({
        name: "Assume Spirit Pet",
        description: "Assume that the first death in every run only reduces 1 score.",
        category: "Score",
    })
    assumeSpirit = true;


    @SwitchProperty({
        name: "10 Bonus Score",
        description: "Add 10 bonus score to the calculation for Pauls Score Perk.",
        category: "Score",
    })
    bonusScore = true;
}

export default new Settings