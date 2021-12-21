// import { BIND_PREFIX, config, containsItem, getCurrentSlot, openInventory, PREFIX, pressed, RightClick, setSlot } from "../index";
// const JerryBox = new KeyBind("Jerry Box Macro", Keyboard.KEY_NONE, BIND_PREFIX);
// let cooldown = false;
// let boxing = false;
// let replenishing = false;
// let inJerry = false;
// register("tick", () => {
//     if (pressed(JerryBox) && !cooldown && !boxing && !replenishing) {
//         cooldown = true;
//         setTimeout(() => {
//             cooldown = false;
//         }, 1250);
//         return new Thread(() => {
//             let jerryBoxFound = false;
//             for (let i = 0; i < 9; ++i) {
//                 if (containsItem(i, "Jerry Box")) {
//                     jerryBoxFound = true;
//                     setSlot(i);
//                     break;
//                 }
//             }
//             if (!jerryBoxFound) {
//                 if (config.debugMode)
//                     ChatLib.chat(PREFIX + "Jerry Box not found in hotbar.");
//                 return;
//             }
//             boxing = true;
//             if (config.debugMode)
//                 return ChatLib.chat(PREFIX + "Started Jerry Box script");
//         }).start();
//     } else if (pressed(JerryBox) && !cooldown && boxing) {
//         cooldown = true;
//         setTimeout(() => {
//             cooldown = false;
//         }, 1250);
//         if (config.debugMode)
//             ChatLib.chat(PREFIX + "Stopping Jerry Box script");
//         cooldown = false;
//     }
//     if (boxing && !inJerry && !replenishing) {
//         if (!containsItem(getCurrentSlot(), "Jerry Box")) {
//             return new Thread(() => {
//                 let jerryBoxFound = false;
//                 for (let i = 0; i < 9; ++i) {
//                     if (containsItem(i, "Jerry Box")) {
//                         jerryBoxFound = true;
//                         setSlot(i);
//                         return;
//                     }
//                 }
//                 if (!jerryBoxFound) {
//                     replenishing = true;
//                     let openSlots = [];
//                     for (let i = 0; i < 9; ++i) {
//                         if (containsItem(i, "air")) {
//                             openSlots.push(i);
//                         }
//                     }
//                     if (openSlots.length === 0) {
//                         if (config.debugMode)
//                             ChatLib.chat(PREFIX + "No empty hotbar slots, stopping script.");
//                         replenishing = false;
//                         return boxing = false;
//                     }
//                     new Thread(() => {
//                         openInventory();
//                         for (let i = 9; i < 36; ++i) {
//                             if (containsItem(i, "Jerry Box")) {
//                                 jerryBoxFound = true;
//                                 Player.getOpenedInventory().click(i, true);
//                                 openSlots.shift();
//                                 Thread.sleep(500);
//                             }
//                             if (openSlots.length === 0)
//                                 break;
//                         }
//                         replenishing = false;
//                         if (!jerryBoxFound) {
//                             if (config.debugMode)
//                                 ChatLib.chat(PREFIX + "Jerry Box not found in inventory, stopping script.");
//                             return boxing = false;
//                         }
//                     }).start();
//                 }
//             }).start();
//         }
//         if (!replenishing) {
//             new Thread(() => {
//                 try {
//                     inJerry = true;
//                     RightClick.invoke(Client.getMinecraft());
//                     Thread.sleep(600);
//                     if (Client.currentGui.getClassName().toLowerCase().includes("chest")) {
//                         Player.getOpenedInventory().click(22);
//                     }
//                     Thread.sleep(200);
//                     Client.currentGui.close();
//                     Thread.sleep(100);
//                     inJerry = false;
//                 } catch (e) {
//                     console.error(e.message);
//                     inJerry = false;
//                 }
//             }).start();
//         }
//     }
// });