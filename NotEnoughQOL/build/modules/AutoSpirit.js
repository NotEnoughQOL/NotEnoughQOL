import { config, Dungeons, dungeons } from "../index";


const rightClickMethod = Java.type("net.minecraft.client.Minecraft").class.getDeclaredMethod("func_147121_ag");
rightClickMethod.setAccessible(true);

let isTimeBeforeBloodOpen = true;

register("postGuiRender", function() {
    new Thread(() => {
        if (dungeons.autospiritToggle && isTimeBeforeBloodOpen && ChatLib.removeFormatting(Player.getOpenedInventory().getName()).includes("Spirit Leap")) {
            let inv = Player.getOpenedInventory();
            for (let i = 0; i < 45; i++) {
                let item = inv.getStackInSlot(i);
                if (item.getName().includes(String(dungeons.spiritNAME))) {
                    let action = Action.of(inv, i, "CLICK");
                    action.setClickString("MIDDLE");
                    action.complete();
                    Thread.sleep(1000);
                }
            }
        }
    }).start();
});

register("chat", function() {
    isTimeBeforeBloodOpen = true;
}).setChatCriteria("&e[NPC] &bMort&f: &rHere, I found this map when I first entered the dungeon.&r").setContains();

register("chat", function() {
    isTimeBeforeBloodOpen = false;
}).setChatCriteria("&r&cThe &r&c&lBLOOD DOOR&r&c has been opened!&r").setContains();