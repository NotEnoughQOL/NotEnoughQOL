import { macros, MISC_PREFIX, mc, ADVANCE_PREFIX } from "../index";
const boneMacro = new KeyBind("Bonemerang Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);
let isInCurrentMacro = false
    // register("tick", () => {
    //     if (boneMacro.isKeyDown()) {
    //         if (!isInCurrentMacro) {
    //             new Thread(() => {
    //                 isInCurrentMacro = true
    //                 for (let i = 0; i < 9; i++) {
    //                     if (Player.getInventory().getStackInSlot(i).getName().toUpperCase().includes("BONEMERANG")) {
    //                         Player.getPlayer().field_71071_by.field_70461_c = i
    //                         let method = mc.getClass().getDeclaredMethod("func_147121_ag");
    //                         method.setAccessible(true);
    //                         method.invoke(mc);
    //                         Thread.sleep(macros.boneDelay)
    //                     }
    //                 }
    //                 let noGiants = true
    //                 for (let i = 0; i < 9; i++) {
    //                     if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot1)) {
    //                         Player.getPlayer().field_71071_by.field_70461_c = i
    //                         noGiants = false
    //                         Thread.sleep(macros.swapDelay)
    //                         break;
    //                     }
    //                 }
    //                 for (let i = 0; i < 9; i++) {
    //                     if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot2)) {
    //                         Player.getPlayer().field_71071_by.field_70461_c = i
    //                         Thread.sleep(macros.swapDelay)
    //                         break;
    //                     }
    //                 }

//                 for (let i = 0; i < 9; i++) {
//                     if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot3)) {
//                         Player.getPlayer().field_71071_by.field_70461_c = i
//                         Thread.sleep(macros.swapDelay)
//                         break;
//                     }
//                 }
//                 isInCurrentMacro = false
//             }).start()
//         }
//     }
// })

let isPlaying = true;

register("gameLoad", () => {
    isPlaying = true;
})

register("gameUnload", () => {
    isPlaying = false;
})

new Thread(() => {
    while (isPlaying) {
        if (boneMacro.isKeyDown()) {
            if (!isInCurrentMacro) {
                isInCurrentMacro = true
                for (let i = 0; i < 9; i++) {
                    if (Player.getInventory().getStackInSlot(i).getName().toUpperCase().includes("BONEMERANG")) {
                        Player.getPlayer().field_71071_by.field_70461_c = i
                        let method = mc.getClass().getDeclaredMethod("func_147121_ag");
                        method.setAccessible(true);
                        method.invoke(mc);
                        Thread.sleep(macros.boneDelay)
                    }
                }
                let noGiants = true
                for (let i = 0; i < 9; i++) {
                    if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot1)) {
                        Player.getPlayer().field_71071_by.field_70461_c = i
                        noGiants = false
                        Thread.sleep(macros.swapDelay)
                        break;
                    }
                }
                for (let i = 0; i < 9; i++) {
                    if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot2)) {
                        Player.getPlayer().field_71071_by.field_70461_c = i
                        Thread.sleep(macros.swapDelay)
                        break;
                    }
                }

                for (let i = 0; i < 9; i++) {
                    if (Player.getInventory().getStackInSlot(i).getName().includes(macros.swapSlot3)) {
                        Player.getPlayer().field_71071_by.field_70461_c = i
                        Thread.sleep(macros.swapDelay)
                        break;
                    }
                }
                isInCurrentMacro = false
            }
        }
    }
}).start()