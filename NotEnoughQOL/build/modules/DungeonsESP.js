import { esp, RenderLib, Creeper } from "../index";

Client.settings.getSettings().func_74300_a();

const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const GL11 = Java.type("org.lwjgl.opengl.GL11");

export let inCatacombs = false;

register("tick", () => {
    if (!esp.enabled) return;

    Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line.toString());
        if (line.includes("The Catac")) {
            inCatacombs = true;
        }
    });
})

const isMini = (entity) => {
    let mini = false
    mininames_formatted.forEach(name => {
        if (entity.name.includes(name)) {
            mini = true
        }
    })
    return mini
}

const mininames_formatted = [
    "Shadow Assassin",
    "§c§d§lLost Adventurer",
    "§c§d§lAngry Archeologist",
    "§c§d§lFrozen Adventurer",
    "§c§d§lKing Midas",
    "Bonzo",
    "Scarf"
]

function drawBoxAtEntity(entity, colorR, colorG, colorB, lineWidth, throughWalls) {

    let height = entity.getHeight()
    let width = entity.getWidth() / 2

    let x = entity.getRenderX()
    let y = entity.getRenderY()
    let z = entity.getRenderZ()


    if (height == 0) {
        y = entity.getRenderY() - 2.125
        height = 1.975
    }
    if (width == 0) {
        width = 0.3
    }


    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    if (throughWalls) {
        GL11.glDisable(GL11.GL_DEPTH_TEST);
    }


    GL11.glLineWidth(lineWidth);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GlStateManager.func_179094_E();


    Tessellator.begin(3).colorize(colorR, colorG, colorB);

    Tessellator.pos(x + width, y + height, z + width).tex(0, 0);
    Tessellator.pos(x + width, y + height, z - width).tex(0, 0);
    Tessellator.pos(x - width, y + height, z - width).tex(0, 0);
    Tessellator.pos(x - width, y + height, z + width).tex(0, 0);
    Tessellator.pos(x + width, y + height, z + width).tex(0, 0);
    Tessellator.pos(x + width, y, z + width).tex(0, 0);
    Tessellator.pos(x + width, y, z - width).tex(0, 0);
    Tessellator.pos(x - width, y, z - width).tex(0, 0);
    Tessellator.pos(x - width, y, z + width).tex(0, 0);
    Tessellator.pos(x - width, y, z - width).tex(0, 0);
    Tessellator.pos(x - width, y + height, z - width).tex(0, 0);
    Tessellator.pos(x - width, y, z - width).tex(0, 0);
    Tessellator.pos(x + width, y, z - width).tex(0, 0);
    Tessellator.pos(x + width, y + height, z - width).tex(0, 0);
    Tessellator.pos(x + width, y, z - width).tex(0, 0);
    Tessellator.pos(x + width, y, z + width).tex(0, 0);
    Tessellator.pos(x - width, y, z + width).tex(0, 0);
    Tessellator.pos(x - width, y + height, z + width).tex(0, 0);
    Tessellator.pos(x + width, y + height, z + width).tex(0, 0);

    Tessellator.draw();

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
}



let entities = []

register("tick", () => {
    if (!esp.enabled) return;
    if (!inCatacombs) return;

    entities = World.getAllEntities()
})


register("renderWorld", () => {
    if (!esp.enabled) return;
    if (!inCatacombs) return;


    entities.forEach(entity => {

        if (entity.getClassName() == 'EntityBat') {
            if (calcDistance(entity) < esp.maxStarDistance && entity.getHP() === 100) {
                if (esp.showBatHitboxes) {
                    drawBoxAtEntity(entity, esp.batHitboxColor.red, esp.batHitboxColor.green, esp.batHitboxColor.blue, 2, esp.showBatThroughWalls)
                }

                return
            }
            return
        }

        if (isMini(entity)) {
            if (calcDistance(entity) < esp.maxMiniDistance) {
                if (esp.showMiniHitboxes) {
                    drawBoxAtEntity(entity, esp.miniHitboxColor.red, esp.miniHitboxColor.green, esp.miniHitboxColor.blue, 2, esp.showMiniThroughWalls)
                }
                if (esp.showMiniNametags) {
                    drawName(entity)
                }

                return
            }
            return
        }

        if (entity.name.includes("✯")) {
            if (calcDistance(entity) < esp.maxStarDistance) {
                if (esp.showStarHitboxes) {
                    drawBoxAtEntity(entity, esp.starHitboxColor.red, esp.starHitboxColor.green, esp.starHitboxColor.blue, 2, esp.showStarThroughWalls)
                }
                if (esp.showStarNametags) {
                    drawName(entity)
                }
            }
        }


    })
})




const calcDistance = (entity) => {
    return Math.sqrt(Math.pow((Player.getX() - entity.getX()), 2) + Math.pow((Player.getY() - entity.getY()), 2) + Math.pow((Player.getZ() - entity.getZ()), 2));
}


const drawName = (entity) => {
    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(false);
    GlStateManager.func_179094_E();

    let counter = 0;

    Tessellator.drawString(entity.name,
        entity.getRenderX(),
        entity.getRenderY() + 0.5,
        entity.getRenderZ(),
        Renderer.color(255, 0, 0),
        true,
        0.0267,
        false
    );


    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
};

register("guiKey", (char, code, gui) => {
    if (gui.class == Java.type("net.minecraft.client.gui.GuiControls")) {
        try {
            Client.settings.getSettings().func_74303_b();
        } catch (e) {
            console.log(e);
        }
    }
});