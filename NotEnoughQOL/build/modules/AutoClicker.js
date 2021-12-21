import { config, RightClick, PREFIX, ADVANCE_PREFIX, Macros, macros } from "../index";

const autoClicker = new KeyBind("Terminator AC", Keyboard.KEY_NONE, ADVANCE_PREFIX)
let toggled = false

register("tick", () => {
    if (autoClicker.isPressed()) {
        ChatLib.chat(`${(toggled = !toggled) ? PREFIX + '&rTerminator AC &aEnabled' : PREFIX + '&rTerminator AC &cDisabled'}`);
    }
});


// register("tick", () => {
//     if (Player.getHeldItem().getName().includes("Terminator")) {
//         if (!toggled)
//             return;
//         new Thread(() => {
//             RightClick.invoke(Client.getMinecraft())
//             Thread.sleep(30)
//         }).start()
//     }
// })
register("GuiOpened", () => {
    if (!toggled)
        return;
    if (!macros.guiCheck)
        return;
    toggled = false;
    ChatLib.chat(PREFIX + '&rTerminator AC &cDisabled&8')
})

let isPlaying = true;

register("gameLoad", () => {
    isPlaying = true;
})

register("gameUnload", () => {
    isPlaying = false;
})

new Thread(() => {
    while (isPlaying) {
        Thread.sleep(30)
        if (toggled) {
            if (Player.getHeldItem().getName().includes("Terminator")) {
                RightClick.invoke(Client.getMinecraft())
                Thread.sleep(30)
            }
        }
    }
}).start()