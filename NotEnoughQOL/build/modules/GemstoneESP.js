const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const GL11 = Java.type("org.lwjgl.opengl.GL11");
import { esp } from "../index";

let chest_esp_boxes = [];
let chest_esp_boxes_small = [];
let chest_esp_boxes_full = [];

function scanForGemstones() {
    new Thread(() => {
        if (!esp.gemstoneESPToggle) return;
        let boxesnew = [];
        let boxesnewsmall = [];
        let boxesnewfull = [];
        for (let x = 0; x < 34; x++) {
            for (let y = 0; y < 30; y++) {
                for (let z = 0; z < 34; z++) {
                    let block = World.getBlockAt(Player.getX() + x - 17, Player.getY() + y - 15, Player.getZ() + z - 17);
                    if (esp.gemstoneBoxStyle === 0) {
                        if (block.getRegistryName() === "minecraft:chest") {
                            boxesnew.push([block.getX(), block.getY(), block.getZ(), 0, 255, 0]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 14.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 255, 0, 0, 0.15, true]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 4.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 255, 255, 0, 0.15, true]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 3.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 0, 255, 255, 0.15, true]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 5.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 0, 255, 0, 0.15, true]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 10.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 255, 0, 255, 0.15, true]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 1.0) {
                            boxesnewfull.push([block.getX(), block.getY(), block.getZ(), 1, 1, 210, 105, 30, 0.15, true]);
                        }
                    } else if (esp.gemstoneBoxStyle === 1) {
                        if (block.getRegistryName() === "minecraft:chest") {
                            boxesnew.push([block.getX(), block.getY(), block.getZ(), 0, 255, 0]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 14.0) {
                            boxesnewsmall.push([block.getX(), block.getY(), block.getZ(), 255, 0, 0]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 4.0) {
                            boxesnewsmall.push([block.getX(), block.getY(), block.getZ(), 255, 255, 0]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 3.0) {
                            boxesnewsmall.push([block.getX(), block.getY(), block.getZ(), 0, 255, 255]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 5.0) {
                            boxesnewsmall.push([block.getX(), block.getY(), block.getZ(), 0, 255, 0]);
                        } else if (block.getRegistryName().includes("minecraft:stained_glass") && parseFloat(block.getMetadata()) === 10.0) {
                            boxesnewsmall.push([block.getX(), block.getY(), block.getZ(), 255, 0, 255]);
                        }
                    }
                }
            }
        }
        chest_esp_boxes = boxesnew;
        chest_esp_boxes_small = boxesnewsmall;
        chest_esp_boxes_full = boxesnewfull;
    }).start();
}

register("step", function() {
    scanForGemstones();
}).setFps(2);

register("renderWorld", function(ticks) {
    if (!esp.gemstoneESPToggle) return;
    chest_esp_boxes.forEach((render) => {
        drawBoxAtBlock(...render, ticks);
    })
    chest_esp_boxes_small.forEach((render) => {
        drawBoxAtBlockSmall(...render, ticks);
    })
    chest_esp_boxes_full.forEach((render) => {
        drawInnerEspBox(...render, ticks);
    })
})

//more methods

function drawBoxAtBlock(x, y, z, colorR, colorG, colorB) {

    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(3);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(false);
    GlStateManager.func_179094_E();


    Tessellator.begin(3).colorize(colorR, colorG, colorB);

    Tessellator.pos(x + 1, y + 1, z + 1).tex(0, 0);
    Tessellator.pos(x + 1, y + 1, z).tex(0, 0);
    Tessellator.pos(x, y + 1, z).tex(0, 0);
    Tessellator.pos(x, y + 1, z + 1).tex(0, 0);
    Tessellator.pos(x + 1, y + 1, z + 1).tex(0, 0);
    Tessellator.pos(x + 1, y, z + 1).tex(0, 0);
    Tessellator.pos(x + 1, y, z).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x, y, z + 1).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x, y + 1, z).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x + 1, y, z).tex(0, 0);
    Tessellator.pos(x + 1, y + 1, z).tex(0, 0);
    Tessellator.pos(x + 1, y, z).tex(0, 0);
    Tessellator.pos(x + 1, y, z + 1).tex(0, 0);
    Tessellator.pos(x, y, z + 1).tex(0, 0);
    Tessellator.pos(x, y + 1, z + 1).tex(0, 0);
    Tessellator.pos(x + 1, y + 1, z + 1).tex(0, 0);

    Tessellator.draw();

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
}

function drawBoxAtBlockSmall(x, y, z, colorR, colorG, colorB) {

    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(1.5);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST); //comment this out for not esp
    GL11.glDepthMask(false); //false for esp / true for not esp
    GlStateManager.func_179094_E();

    y = y + 0.5;
    x = x + 0.5;
    z = z + 0.5;

    Tessellator.begin(3).colorize(colorR, colorG, colorB);

    Tessellator.pos(x + 0.1, y + 0.1, z + 0.1).tex(0, 0);
    Tessellator.pos(x + 0.1, y + 0.1, z).tex(0, 0);
    Tessellator.pos(x, y + 0.1, z).tex(0, 0);
    Tessellator.pos(x, y + 0.1, z + 0.1).tex(0, 0);
    Tessellator.pos(x + 0.1, y + 0.1, z + 0.1).tex(0, 0);
    Tessellator.pos(x + 0.1, y, z + 0.1).tex(0, 0);
    Tessellator.pos(x + 0.1, y, z).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x, y, z + 0.1).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x, y + 0.1, z).tex(0, 0);
    Tessellator.pos(x, y, z).tex(0, 0);
    Tessellator.pos(x + 0.1, y, z).tex(0, 0);
    Tessellator.pos(x + 0.1, y + 0.1, z).tex(0, 0);
    Tessellator.pos(x + 0.1, y, z).tex(0, 0);
    Tessellator.pos(x + 0.1, y, z + 0.1).tex(0, 0);
    Tessellator.pos(x, y, z + 0.1).tex(0, 0);
    Tessellator.pos(x, y + 0.1, z + 0.1).tex(0, 0);
    Tessellator.pos(x + 0.1, y + 0.1, z + 0.1).tex(0, 0);

    Tessellator.draw();

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
}

const drawInnerEspBox = (x, y, z, w, h, red, green, blue, alpha, phase) => {
    GL11.glDisable(GL11.GL_CULL_FACE);
    if (phase) {
        GL11.glBlendFunc(770, 771);
        GL11.glEnable(GL11.GL_BLEND);
        GL11.glLineWidth(2.0);
        GL11.glDisable(GL11.GL_TEXTURE_2D);
        GL11.glDisable(GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(false);
        GlStateManager.func_179094_E();
    } else {
        GL11.glDisable(GL11.GL_TEXTURE_2D);
        GL11.glBlendFunc(770, 771);
        GL11.glEnable(GL11.GL_BLEND);
        GL11.glLineWidth(2.0);
        GL11.glDepthMask(false);
        GlStateManager.func_179094_E();
    }

    w /= 2;
    x = x + 0.5;
    z = z + 0.5;

    Tessellator.begin(GL11.GL_QUADS, false);
    Tessellator.colorize(red, green, blue, alpha);

    Tessellator.translate(x, y, z)
        .pos(w, 0, w)
        .pos(w, 0, -w)
        .pos(-w, 0, -w)
        .pos(-w, 0, w)

    .pos(w, h, w)
        .pos(w, h, -w)
        .pos(-w, h, -w)
        .pos(-w, h, w)

    .pos(-w, h, w)
        .pos(-w, h, -w)
        .pos(-w, 0, -w)
        .pos(-w, 0, w)

    .pos(w, h, w)
        .pos(w, h, -w)
        .pos(w, 0, -w)
        .pos(w, 0, w)

    .pos(w, h, -w)
        .pos(-w, h, -w)
        .pos(-w, 0, -w)
        .pos(w, 0, -w)

    .pos(-w, h, w)
        .pos(w, h, w)
        .pos(w, 0, w)
        .pos(-w, 0, w)
        .draw();

    GL11.glEnable(GL11.GL_CULL_FACE);
    if (phase) {
        GlStateManager.func_179121_F();
        GL11.glEnable(GL11.GL_TEXTURE_2D);
        GL11.glEnable(GL11.GL_DEPTH_TEST);
        GL11.glDepthMask(true);
        GL11.glDisable(GL11.GL_BLEND);
    } else {
        GL11.glEnable(GL11.GL_TEXTURE_2D);
        GlStateManager.func_179121_F();
        GL11.glDepthMask(true);
        GL11.glDisable(GL11.GL_BLEND);
    }
};