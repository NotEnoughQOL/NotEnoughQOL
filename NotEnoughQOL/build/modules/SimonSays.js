// import { mc, RightClick } from "../index";

// let autoClicking = false;

// register("playerInteract", (events, action) => {
//     if (action.toString() === "RIGHT_CLICK_BLOCK") {
//         cancel(events)
//     }
//     if (World.getBlockAt(309, 121, 293) === "minecraft:stone_button") {
//         // let x = Player.getX()
//         // let y = Player.getY()
//         // let z = Player.getZ()
//         // if (x === 309 && y >= 120 && y <= 123 && z >= 291 && z <= 294) {
//         autoClicking = true;
//         if (autoClicking) {
//             new Thread(() => {
//                 RightClick
//                 Thread.sleep(10)
//                 ChatLib.chat("clicked")
//             }).start()
//         }
//         // }
//     }
// })