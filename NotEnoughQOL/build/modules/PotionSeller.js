import { Macros, GUI_PREFIX, MISC_PREFIX, PREFIX, macros } from "../index";




const sellPots = new KeyBind("Sell Speed 6 Pots", Keyboard.KEY_NONE, GUI_PREFIX)

register("tick", () => {
    if (sellPots.isPressed()) {
        new Thread(() => {
            ChatLib.chat(PREFIX + "Opening Trade Menu");
            ChatLib.command("sbmenu");
            Thread.sleep(macros.wardrobeDelay)
            if (Player.getOpenedInventory().getName().includes("SkyBlock Menu")) {
                Player.getOpenedInventory().click(22, false, "MIDDLE");
            }
            Thread.sleep(500)
            if (Player.getOpenedInventory().getName() === "Trades") {
                for (let i = 53; 53 < i < 89; i++) {
                    let item = Player.getOpenedInventory().getStackInSlot(i);
                    if (item.getName().includes("Speed VI Potion") || item.getName().includes("Speed 6 Potion") || item.getName().includes("Water Bottle")) {
                        Thread.sleep(macros.autoSell)
                        Player.getOpenedInventory().drop(i, false)
                    }
                }
            }
        }).start()
    }
})