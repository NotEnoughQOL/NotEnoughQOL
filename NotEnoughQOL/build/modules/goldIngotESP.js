/*import { RenderLib } from "../index";
const DroppedItemClass = Java.type('net.minecraft.entity.item.EntityItem').class
let inMM = false;

register("step", () => {
    let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
    scoreboardLines.forEach(line => {
        if (line.includes("role"))
            inMM = true;
    });
}).setFps(2)
const EntityItem = Java.type('net.minecraft.entity.item.EntityItem');
register('renderWorld', () => {
    if (inMM === true) {
        World.getAllEntities().forEach((entity) => {
            if (entity.getEntity() instanceof EntityItem) {
                RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), 1, 1, 1, 0, 0, 1, true);
            }
        });
    }
});
*/