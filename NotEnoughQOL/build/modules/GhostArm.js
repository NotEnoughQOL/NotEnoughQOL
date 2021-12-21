import { Slayer, config, drawName, RenderLib, slayers } from "../index";

const zombieClass = Java.type("net.minecraft.entity.monster.EntityZombie")


function getDistanceFromPlayerEfficent(posX, posY, posZ) {
    let deltaX = posX - Player.getX();
    let deltaY = posY - Player.getY();
    let deltaZ = posZ - Player.getZ();

    return (deltaX * deltaX) + (deltaY * deltaY) + (deltaZ * deltaZ)
}

function FullLeather(entity) {
    for (let i = 1; i < 5; i++) {
        if (entity.getEntity().func_71124_b(i) === null) return false
        if (!entity.getEntity().func_71124_b(i).func_77977_a().toLowerCase().includes("cloth")) return false
    }
    return true
}

register("tick", () => {
    if (!slayers.ghostArm) return;
    let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
    let inEnd = false;
    scoreboardLines.forEach(line => {
        if (line.includes("the end") || line.includes("dragon's") || line.includes("void"))
            inEnd = true;
    });
    if (!inEnd) return;
    World.getAllEntitiesOfType(zombieClass).forEach(entity => {
        if (FullLeather(entity)) {
            if (getDistanceFromPlayerEfficent(entity.getX(), entity.getY(), entity.getZ()) < 20 * 20) {
                entity.getEntity().func_70106_y()
            }
        }
    })
})

register("tick", () => {
    if (config.playerGhostArm) {
        World.getAllEntities().forEach(entity => {
            if (entity.getClassName() === "EntityOtherPlayerMP") {
                if (getDistanceFromPlayerEfficent(entity.getX(), entity.getY(), entity.getZ()) < 20 * 20) {
                    entity.getEntity().func_70106_y()
                }
            }
        })
    }
})

// register("renderEntity", (entity, vec3d, ticks, event) => {
//     if (config.playerGhostArm) {
//         if (config.ghostArmESP) {
//             if (entity.getClassName() === "EntityOtherPlayerMP") {
//                 RenderLib.drawInnerEspBox(entity.getX(), entity.getY() + 0, entity.getZ(), 1, 2, 0, 1, 0, 0.30, true);
//                 drawName(entity)
//             }
//         }
//     }
// })