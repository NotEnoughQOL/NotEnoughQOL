import {
    config,
    PREFIX,
    ADVANCE_PREFIX,
    RightClick,
    Macros,
    macros
} from "../index";


const autoKatana = new KeyBind("Auto Katana", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let autoUse = false;
register("tick", () => {
    if (autoKatana.isPressed()) {
        ChatLib.chat(`${(autoUse = !autoUse) ? PREFIX + '&rAuto Katana &aEnabled' : PREFIX + '&rAuto Katana &cDisabled'}`);
    }
});

function checkHotbarSlots() {
    new Thread(() => {
        Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
            if (item.getName().includes("Atomsplit Katana")) {
                katanaSlot = index;
            }
        });
    }).start();
}

let alreadyUsing = false;
let katanaSlot;

register("step", function() {
    if (alreadyUsing) return;
    new Thread(() => {
        if (autoUse) {
            alreadyUsing = true;
            checkHotbarSlots();
            try {
                Player.setHeldItemIndex(katanaSlot);
                RightClick.invoke(Client.getMinecraft());
                Thread.sleep(4100)
            } catch (e) {}
            alreadyUsing = false;
        }
    }).start();
}).setFps(2);

register("GuiOpened", () => {
    if (!macros.guiCheck)
        return;
    if (!autoUse)
        return;
    autoUse = false;
    ChatLib.chat(PREFIX + "&rAuto Katana &cDisabled&8")
})