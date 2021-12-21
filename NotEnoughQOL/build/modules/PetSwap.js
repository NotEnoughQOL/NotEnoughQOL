// import { config, GUI_PREFIX, PREFIX } from "../index";

// const petSwap = new KeyBind("Pet Swap", Keyboard.KEY_NONE, GUI_PREFIX);
// let inPets = false;
// let tried = false;
// let petFound = false;
// let swappedPage = false;

// register("tick", () => {
//     if (petSwap.isPressed()) {
//         ChatLib.chat(PREFIX + "Swapping to " + config.petName)
//         ChatLib.command("pets")
//         inPets = true;
//         tried = true;
//     }
// })

// register("postGuiRender", () => {
//     if (inPets && tried) {
//         let inv = Player.getOpenedInventory()
//         if (inv.getName().includes("Pets")) {
//             for (let i = 0; i < 53; i++) {
//                 let item = Player.getOpenedInventory().getStackInSlot(i)
//                 if (!petFound) {
//                     if (config.petPage === 0) {
//                         if (item.getName().includes(config.petName)) {
//                             inv.click(i, false, "MIDDLE")
//                             petFound = true;
//                             inPets = false;
//                             tried = false;
//                         }
//                     } else if (config.petPage === 1) {
//                         if (!swappedPage) {
//                             if (item.getName().includes("Next Page")) {
//                                 inv.click(i, false, "MIDDLE")
//                                 swappedPage = true;
//                                 if (item.getName().includes(config.petName)) {
//                                     inv.click(i, false, "MIDDLE")
//                                 }
//                                 petFound = true;
//                                 inPets = false;
//                                 tried = false;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// })


// // } else if (!petFound) {
// //     inv.click(53, false, "MIDDLE")
// //     if (item.getName().includes(config.petName)) {
// //         inv.click(i, false, "MIDDLE")
// //         petFound = true;
// //         inPets = false;
// //         tried = false;
// //         Client.currentGui.close()
// //     }
// // } else if (!petFound) {
// //     inv.click(53, false, "MIDDLE")
// //     if (item.getName().includes(config.petName)) {
// //         inv.click(i, false, "MIDDLE")
// //         petFound = true;
// //         inPets = false;
// //         tried = false;
// //         Client.currentGui.close()
// //     }
// // } else if (!petFound) {
// //     inv.click(53, false, "MIDDLE")
// //     if (item.getName().includes(config.petName)) {
// //         inv.click(i, false, "MIDDLE")
// //         petFound = true;
// //         inPets = false;
// //         tried = false;
// //         Client.currentGui.close()
// //     }