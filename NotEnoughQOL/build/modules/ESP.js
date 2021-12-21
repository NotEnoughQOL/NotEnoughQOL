 import {
     esp,
     drawName,
     slayers,
     Creeper,
     RenderLib,
     BIND_PREFIX,
     islandWitch,
     ironGolem
 } from "../index";
 const playerESPKey = new KeyBind("Toggle Player ESP", Keyboard.KEY_NONE, BIND_PREFIX)
 let inHowl = false;
 let inSpidersDen = false;
 let inEnd = false;
 let inCrypt = false;
 let inGunpowderMines = false;
 let inIsland = false;

 register("step", () => {
     inHowl = false;
     inSpidersDen = false;
     inEnd = false;
     inCrypt = false;
     inGunpowderMines = false;
     inIsland = false;
     // -------------------------------
     let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
     scoreboardLines.forEach(line => {
         if (line.includes("howl") || line.includes("castle")) {
             inHowl = true;
         }
         if (line.includes("spider")) {
             inSpidersDen = true;
         }
         if (line.includes("coal") || line.includes("graveyard")) {
             inCrypt = true;
         }
         if (line.includes("end") || line.includes("drag") || line.includes("void")) {
             inEnd = true;
         }
         if (line.includes("gunpowder")) {
             inGunpowderMines = true;
         }
         if (line.includes("your")) {
             inIsland = true;
         }
     })
 }).setFps(2)

 register("worldLoad", () => {
     inHowl = false;
     inSpidersDen = false;
     inEnd = false;
     inCrypt = false;
     inGunpowderMines = false;
     inIsland = false;
 })
 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (slayers.voidgloomMinis && inEnd) {
         World.getAllEntities().forEach((entity) => {
             if (ChatLib.removeFormatting(entity.getName()).includes("Voidling Devotee") || ChatLib.removeFormatting(entity.getName()).includes("Voidling Radical")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 3, entity.getZ(), 1, 3, slayers.voidlingRadi.getRed(), slayers.voidlingRadi.getGreen(), slayers.voidlingRadi.getBlue(), slayers.voidlingRadi.getAlpha(), true);
                 drawName(entity)
             } else if (slayers.voidgloomMinis && inEnd) {
                 if (ChatLib.removeFormatting(entity.getName()).includes("Voidcrazed")) {
                     RenderLib.drawEspBox(entity.getX(), entity.getY() - 3, entity.getZ(), 1, 3, slayers.voidcrazedManiac.getRed(), slayers.voidcrazedManiac.getGreen(), slayers.voidcrazedManiac.getBlue(), slayers.voidcrazedManiac.getAlpha(), true);
                     drawName(entity)
                 }
             }
         });
     }
 });

 // -------------------------------

 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (slayers.taraMinis && inSpidersDen) {
         World.getAllEntities().forEach((entity) => {
             if (ChatLib.removeFormatting(entity.getName()).includes("Tarantula Beast") || ChatLib.removeFormatting(entity.getName()).includes("Tarantula Vermin")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.taraBeast.getRed(), slayers.taraBeast.getGreen(), slayers.taraBeast.getBlue(), slayers.taraBeast.getAlpha(), true);
                 drawName(entity)
             } else if (ChatLib.removeFormatting(entity.getName()).includes("Mutant")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.mutantTara.getRed(), slayers.mutantTara.getGreen(), slayers.mutantTara.getBlue(), slayers.mutantTara.getAlpha(), true);
                 drawName(entity)
             }

             if (esp.taraBoss && inSpidersDen) {
                 if (ChatLib.removeFormatting(entity.getName()).includes("Tarantula Broodfather")) {
                     RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.taraBossColor.getRed(), slayers.taraBossColor.getGreen(), slayers.taraBossColor.getBlue(), slayers.taraBossColor.getAlpha(), true);
                     drawName(entity)
                 }
             }
         });
     }
 });

 // -------------------------------

 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (slayers.svenMinis && inHowl) {
         World.getAllEntities().forEach((entity) => {
             if (ChatLib.removeFormatting(entity.getName()).includes("Pack Enforcer") || ChatLib.removeFormatting(entity.getName()).includes("Sven Follower")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.svenFollower.getRed(), slayers.svenFollower.getGreen(), slayers.svenFollower.getBlue(), .30, true);
                 drawName(entity)
             } else if (ChatLib.removeFormatting(entity.getName()).includes("Sven Packmaster")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.svenAlpha.getRed(), slayers.svenAlpha.getGreen(), slayers.svenAlpha.getBlue(), .30, true);
                 drawName(entity)
             }
             if (slayers.svenBoss && inHowl) {
                 if (ChatLib.removeFormatting(entity.getName()).includes("Sven Packmaster")) {
                     RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, slayers.svenBossColor.getRed(), slayers.svenBossColor.getGreen(), slayers.svenBossColor.getBlue(), .30, true);
                     drawName(entity)
                 }
             }
         });
     }
 });

 // -------------------------------

 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (slayers.revMinis && inCrypt) {
         World.getAllEntities().forEach((entity) => {
             if (ChatLib.removeFormatting(entity.getName()).includes("Revenant Sycophant") || ChatLib.removeFormatting(entity.getName()).includes("Revenant Champion") || ChatLib.removeFormatting(entity.getName()).includes("Deformed Revenant")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 2, entity.getZ(), 1, 2, slayers.revMiniColor.getRed(), slayers.revMiniColor.getGreen(), slayers.revMiniColor.getBlue(), slayers.revMiniColor.getAlpha(), true);
                 drawName(entity)
             } else if (ChatLib.removeFormatting(entity.getName()).includes("Atoned Champion") || ChatLib.removeFormatting(entity.getName()).includes("Atoned Revenant")) {
                 RenderLib.drawEspBox(entity.getX(), entity.getY() - 2, entity.getZ(), 1, 2, slayers.atonedMini.getRed(), slayers.atonedMini.getGreen(), slayers.atonedMini.getBlue(), slayers.atonedMini.getAlpha(), true);
                 drawName(entity)
             }
             if (slayers.revBoss && inCrypt) {
                 if (ChatLib.removeFormatting(entity.getName()).includes("Revenant Horror") || ChatLib.removeFormatting(entity.getName()).includes("Atoned Horror")) {
                     RenderLib.drawEspBox(entity.getX(), entity.getY() - 2, entity.getZ(), 1, 2, slayers.revBossColor.getRed(), slayers.revBossColor.getGreen(), slayers.revBossColor.getBlue(), slayers.revBossColor.getAlpha(), true);
                     drawName(entity)
                 }
             }
         });
     }
 });

 // -------------------------------

 let espON = false;
 register("tick", () => {
     if (playerESPKey.isPressed()) {
         ChatLib.chat(`${(espON = !espON) ? PREFIX + 'Player ESP &aEnabled' : PREFIX + 'Player ESP &cDisabled'}`);
     }
 });

 register('renderWorld', () => {
     if (espON) {
         World.getAllEntities().forEach((player) => {
             if (ChatLib.removeFormatting(player.getName()) === slayers.playerESPName) {
                 RenderLib.drawInnerEspBox(player.getX(), player.getY() + 0, player.getZ(), 1, 2, slayers.playerColor.getRed(), slayers.playerColor.getGreen(), slayers.playerColor.getBlue(), 0.30, true);
                 drawName(player)
             }
         });
     }
 })

 // -------------------------------

 let entities = [];
 register("step", () => {
     let localEntities = [];
     if (inGunpowderMines) {
         World.getAllEntitiesOfType(Creeper)
             .forEach(entity => {
                 localEntities.push(entity);
             });
     }
     entities = localEntities;
 }).setFps(2);
 register("renderWorld", () => {
     if (!esp.enabled) return;
     if (!esp.creeperEsp)
         return;
     entities.forEach(entity => {
         RenderLib.drawInnerEspBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), entity.getWidth(), entity.getHeight(), esp.creeperespColor.getRed(), esp.creeperespColor.getGreen(), esp.creeperespColor.getBlue(), .30, true);
         entity.getEntity().func_82142_c(false)
             //drawName(entity)
     });
 });

 // -------------------------------

 let entities2 = [];
 register("step", () => {
     let localEntities = [];
     let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
     let inIsland = false;
     scoreboardLines.forEach(line => {
         if (line.includes("your"))
             inIsland = true;
     });
     if (inIsland) {
         World.getAllEntitiesOfType(islandWitch)
             .forEach(entity => {
                 localEntities.push(entity);
             });
     }
     entities2 = localEntities;
 }).setFps(2);

 register("renderWorld", () => {
     if (!esp.enabled) return;
     if (!esp.islandWitchESP)
         return;
     entities2.forEach(entity => {
         RenderLib.drawInnerEspBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), entity.getWidth(), entity.getHeight(), esp.islandWitchespColor.getRed(), esp.islandWitchespColor.getGreen(), esp.islandWitchespColor.getBlue(), .30, true);
     });
 });

 // -------------------------------

 let entities1 = [];
 register("step", () => {
     if (!esp.arachneKeeperESP) return;
     let localEntities = [];
     let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
     let inSpidersDen = false;
     scoreboardLines.forEach(line => {
         if (line.includes("spider"))
             inSpidersDen = true;
     });
     if (inSpidersDen) {
         World.getAllEntities()
             .forEach(entity => {
                 if (ChatLib.removeFormatting(entity.getName()).includes("Arachne's Keeper"))
                     localEntities.push(entity);
             });
     }
     entities1 = localEntities;
 }).setFps(2);

 register("renderWorld", () => {
     if (!esp.enabled) return;
     if (!esp.arachneKeeperESP)
         return;
     entities1.forEach(entity => {
         RenderLib.drawInnerEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, esp.arachneKeeperespColor.getRed(), esp.arachneKeeperespColor.getGreen(), esp.arachneKeeperespColor.getBlue(), 0.30, true);
         drawName(entity)
     });
 });

 // -------------------------------

 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (!esp.witherKey) return;
     // if (!inCatacombs) return;
     World.getAllEntities().forEach((entity) => {
         if (ChatLib.removeFormatting(entity.getName()).includes("Wither Key")) {
             RenderLib.drawEspBox(entity.getX(), entity.getY() + 1, entity.getZ(), 1, 1, esp.witherKeyColor.getRed(), esp.witherKeyColor.getGreen(), esp.witherKeyColor.getBlue(), esp.witherKeyColor.getAlpha(), true);
             drawName(entity)
         } else if (ChatLib.removeFormatting(entity.getName()).includes("Blood Key")) {
             RenderLib.drawEspBox(entity.getX(), entity.getY() + 1, entity.getZ(), 1, 1, esp.bloodKeyColor.getRed(), esp.bloodKeyColor.getGreen(), esp.bloodKeyColor.getBlue(), esp.bloodKeyColor.getAlpha(), true);
             drawName(entity)
         }
     });
 });

 // -------------------------------

 register('renderWorld', () => {
     if (!esp.enabled) return;
     if (!esp.peltESP) return;
     World.getAllEntities().forEach((entity) => {
         if (ChatLib.removeFormatting(entity.getName()).includes("Trackable") || ChatLib.removeFormatting(entity.getName()).includes("Untrackable") || ChatLib.removeFormatting(entity.getName()).includes("Undetected") || ChatLib.removeFormatting(entity.getName()).includes("Endangered") || ChatLib.removeFormatting(entity.getName()).includes("Elusive")) {
             RenderLib.drawEspBox(entity.getX(), entity.getY() - 1, entity.getZ(), 1, 1, esp.peltESPColor.getRed(), esp.peltESPColor.getGreen(), esp.peltESPColor.getBlue(), esp.peltESPColor.getAlpha(), true);
             drawName(entity)
                 //       entity.getEntity().func_82142_c(false)
         }
     });
 });

 // -------------------------------

 let entities7 = [];
 register("step", () => {
     new Thread(() => {
         let localEntities = [];
         let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
         let inDragonsNest = false;
         scoreboardLines.forEach(line => {
             if (line.includes("dragon"))
                 inDragonsNest = true;
         });
         if (inDragonsNest) {
             World.getAllEntitiesOfType(ironGolem)
                 .forEach(entity => {
                     localEntities.push(entity);
                 });
         }
         entities7 = localEntities;
     }).start()
 }).setFps(2);

 register("renderWorld", () => {
     if (!esp.enabled) return;
     if (!esp.ironGolemESP)
         return;
     //  new Thread(() => {
     entities7.forEach(entity => {
         RenderLib.drawInnerEspBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), entity.getWidth(), entity.getHeight(), esp.ironGolemESPColor.getRed(), esp.ironGolemESPColor.getGreen(), esp.ironGolemESPColor.getBlue(), .30, true);
     });
     //}).start()
 });