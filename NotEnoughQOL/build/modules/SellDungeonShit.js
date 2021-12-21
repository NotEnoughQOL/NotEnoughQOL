import { dungeons, DUNGEONS_PREFIX, MISC_PREFIX, PREFIX, GUI_PREFIX } from "../index";

const sellDungeonBS = new KeyBind("Sell Dungeons Garbage", Keyboard.KEY_NONE, GUI_PREFIX);

let dungItems = [];

// const enchBooks = [
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9Feather Falling',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9Infinite Quiver',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9§d§lNo Pain No Gain',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9§d§lCombo',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9§d§lBank',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9§d§lUltimate Jerry',
//     '{id:"minecraft:enchanted_book",Count:1b,tag:{ench:[],HideFlags:254,display:{Lore:[0:"§9Rejuvenate'
// ];
let enchBooks = [];

let inPets = false;
let inSbMenu = false;
let inTrade = false;
let triedToSell = false;

register("tick", () => {
    if (sellDungeonBS.isPressed()) {
        ChatLib.command("pets");
        inPets = true;
        triedToSell = true;
        dungItems = dungeons.dungSellList.split(", ")
        enchBooks = dungeons.bookSellList.split(", ")
    }
})

register("postGuiRender", () => {
    try {
        let inv = Player.getOpenedInventory()
        if (inPets && triedToSell) {
            if (inv.getName().includes("Pets")) {
                inv.click(48, false, "MIDDLE")
                inSbMenu = true;
                inPets = false
            }
        } else if (inSbMenu && triedToSell) {
            if (inv.getName().includes("SkyBlock Menu")) {
                inv.click(22, false, "MIDDLE")
                inSbMenu = false;
                inTrade = true;
            }
        } else if (inTrade && triedToSell) {
            if (inv.getName().includes("Trades")) {
                dungsell()
                booksell()
                inTrade = false;
                triedToSell = false;
            }
        }
    } catch (e) {}
})

function dungsell() {
    dungItems = dungeons.dungSellList.split(", ")
        // enchBooks = dungeons.bookSellList.split(", ")
    new Thread(() => {
        for (let i = 53; i < 81; i++) {
            //  console.log("in trade")
            let item = Player.getOpenedInventory().getStackInSlot(i)
            dungItems.forEach((thing) => {
                if (item.getName().toLowerCase().includes(String(thing).toLowerCase())) {
                    Thread.sleep(dungeons.autoSell)
                    Player.getOpenedInventory().drop(i, true)
                        // ChatLib.chat("drop")
                }
            })
        }
    }).start()
}

function booksell() {
    enchBooks = dungeons.bookSellList.split(", ")
    new Thread(() => {
        for (let i = 53; i < 81; i++) {
            let item = Player.getOpenedInventory().getStackInSlot(i)
            enchBooks.forEach((thing) => {
                if (ChatLib.removeFormatting(item.getLore()[1]).includes(ChatLib.removeFormatting(String(thing)))) {
                    Thread.sleep(dungeons.autoSell)
                    Player.getOpenedInventory().drop(i, false)
                        // ChatLib.chat("drop")
                }
            })
        }
    }).start()
}

register("command", () => {
    dungeons.bookSellList = "No Pain No Gain, Rejuvenate, Feather Falling, Infinite Quiver, Combo, Bank, Ultimate Jerry"
    dungeons.dungSellList = "Rotten, Skeleton Master, Skeleton Grunt, Skeleton Lord, Zombie Soldier, Skeleton Soldier, Zombie Knight, Zombie Commander, Zombie Lord, Skeletor, Super Heavy, Heavy, Sniper Helmet, Dreadlord, Earth Shard, Zombie Commander Whip, Machine Gun, Sniper Bow, Soulstealer Bow, Cutlass, Silent Death, Training Weight, Health Potion VIII, Health Potion 8, Beating Heart, Premium Flesh, Mimic Fragment, Enchanted Rotten Flesh, Enchanted Bone, Defuse Kit, Enchanted Ice, Optic Lens, Tripwire Hook, Button, Carpet, Lever, Sign, Diamond Atom, Snow Rune, Blood Rune, Zap Rune, Gem Rune, Lava Rune, Hot Rune, White Spiral Rune, Hearts Rune, Ice Rune, Redstone Rune, Sparkling Rune, Clouds Rune, Golden Rune"
    ChatLib.chat(PREFIX + "Imported Default Items")
    ChatLib.command("ner", true)
}).setName("dungitems")

register("command", () => {
    console.log("Raw NBT:")
    console.log(Player.getHeldItem().getRawNBT())
    console.log("")
    console.log("")
    ChatLib.chat("Data sent to console")
}).setName("getlore")