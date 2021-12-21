import { dungeons, ESP, PREFIX, config, esp } from "../index";
const bloodMobs = [
    "Revoker",
    "Psycho",
    "Reaper",
    "Cannibal",
    "Mute",
    "Ooze",
    "Putrid",
    "Freak",
    "Leech",
    "Tear",
    "Parasite",
    "Flamer",
    "Skull",
    "Mr. Dead",
    "Vader",
    "Frost",
    "Walker",
    "Wandering Soul",
    "Bonzo",
    "Scarf",
    "Livid"
];
let inMist = false;
register("step", () => {
    let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
    scoreboardLines.forEach(line => {
        if (line.includes("mist"))
            inMist = true;
    });
}).setFps(2);

register("renderWorld", () => {
    World.getAllEntities().forEach((entity) => {
        if (entity.getEntity().func_82150_aj()) {
            if (dungeons.hiddenFels === true) {
                if (entity.getClassName() === "EntityEnderman") {
                    entity.getEntity().func_82142_c(false)
                }
            }
            if (dungeons.hiddenBloodMobs === true) {
                if (entity.getClassName() === "EntityOtherPlayerMP") {
                    for (let i = 0; i < bloodMobs.length; i++) {
                        if (ChatLib.removeFormatting(entity.getName()).includes(bloodMobs[i])) {
                            entity.getEntity().func_82142_c(false)
                        }
                    }
                }
            }
            if (dungeons.hiddenSA === true) {
                if (entity.getClassName() === "EntityOtherPlayerMP") {
                    if (ChatLib.removeFormatting(entity.getName()).removeFormatting().includes("Shadow Assassin")) {
                        entity.getEntity().func_82142_c(false)
                    }
                }
            }
            if (entity.getClassName() === "EntityCreeper") {
                if (inMist === true && config.hiddenGhosts === true) {
                    entity.getEntity().func_82142_c(false)
                }
            }
            if (entity.getClassName() === "EntityCow" || entity.getClassName() === "EntityRabbit" || entity.getClassName() === "EntitySheep" || entity.getClassName() === "EntityPig" || entity.getClassName() === "EntityChicken") {
                if (esp.peltESP) {
                    entity.getEntity().func_82142_c(false)
                }
            }
            // if (config.antiVanish) {
            //     if (entity.getClassName() === "EntityOtherPlayerMP") {
            //         entity.getEntity().func_82142_c(false)
            //         if (config.antiVanishAlert) {
            //             ChatLib.chat(PREFIX + entity.getName() + " is invisible")
            //         }
            //     }
            // }
        }
    })
})

register("command", () => {
    World.getAllEntities().forEach((entity) => {
        console.log(entity.getName() + ":")
        console.log(entity.getClassName())
        console.log("")
    })
}).setName("getentitydata")