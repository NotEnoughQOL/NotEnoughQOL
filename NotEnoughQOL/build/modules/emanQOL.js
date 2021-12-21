const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const GL11 = Java.type("org.lwjgl.opengl.GL11");
import { slayers } from "../index";

let blockstomark = []
let entities = []
let entitiestomark = []
let bossspawned = false


let detectionradius = 25


let isSearching = false

const checkForBeacon = (radius) => {
    isSearching = true
    blockstomark = []
    new Thread(() => {

        minx = Math.floor(Player.getX() - (radius / 2)) //- 0.5
        miny = Math.floor(Player.getY() - 4)
        minz = Math.floor(Player.getZ() - (radius / 2))

        maxx = Math.floor(Player.getX() + (radius / 2)) //- 0.5
        maxy = Math.floor(Player.getY() + 4)
        maxz = Math.floor(Player.getZ() + (radius / 2))

        currenzx = minx
        currenty = miny
        currentz = minz

        namelist = ["minecraft:beacon"]

        for (var x = minx; x <= maxx; x++) {
            for (var y = miny; y <= maxy; y++) {
                for (var z = minz; z <= maxz; z++) {
                    namelist.forEach(name => {
                        let block = World.getBlockAt(x, y, z)
                        if (block.registryName == name) {
                            blockstomark.push([x, y, z])
                        }
                    })

                }
            }
        }
        isSearching = false
    }).start()

}


register("tick", () => {
    if (!slayers.emanEnabled) return;
    bossspawned = false
    Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line.toString());
        if (line.includes("Slay the boss!")) {
            bossspawned = true;
        }
    });

    if (!bossspawned) {
        entitiestomark = []
        blockstomark = []
        return;
    }
})

register("renderOverlay", () => {
    if (!slayers.emanEnabled) return;
    if (!slayers.emanBnotifenabled) return;
    if (!bossspawned) return;
    if (blockstomark.length >= 1) {
        customDrawString("BEACON", true, false, slayers.emanBnotifx, slayers.emanBnotify, slayers.emanBnotifscale)
    }
})





register("tick", () => {
    if (!slayers.emanEnabled) return;
    if (!bossspawned) return;
    checkForBeacon(detectionradius)
})


register("tick", () => {
    entitiestomark = []
    if (!slayers.emanEnabled) return;
    if (!bossspawned) return;

    //if (testBind.isPressed()){
    entities = World.getAllEntities()

    entities.forEach(entity => {
            try {
                if (calcDistance(entity) <= detectionradius) {
                    if (entity.getClassName() == "EntityArmorStand") {
                        items = getArmorStandItems(entity)
                        if (items.head != null) {
                            item = getArmorStandItems(entity).head.rawNBT.toString()
                                //console.log(item)
                            if (item == null) return;


                            texture = 'eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZWIwNzU5NGUyZGYyNzM5MjFhNzdjMTAxZDBiZmRmYTExMTVhYmVkNWI5YjIwMjllYjQ5NmNlYmE5YmRiYjRiMyJ9fX0='


                            if (item.includes(texture)) {
                                entitiestomark.push(entity)
                            }

                        }
                    }
                }

            } catch (e) {
                //console.dir(e)
                return
            }
        })
        //}
})


const getArmorStandItems = (entity) => {
    let array = entity.getEntity().func_70035_c().map(item => item == null ? null : new Item(item));
    return { hand: array[0], feet: array[1], legs: array[2], chest: array[3], head: array[4] }
}

const calcDistance = (entity) => {
    return Math.sqrt(Math.pow((Player.getX() - entity.getX()), 2) + Math.pow((Player.getY() - entity.getY()), 2) + Math.pow((Player.getZ() - entity.getZ()), 2));
}


register("renderWorld", () => {
    if (!slayers.emanEnabled) return;

    entitiestomark.forEach(entity => {
        if (slayers.emanHtracersenabled) {
            drawTracerLine(entity.getX(), entity.getY() + 1.5, entity.getZ(), 0, 255, 0, 0.3, 25)
        }
        if (slayers.emanHespenabled) {
            drawHeadEspBox(entity, 0, 255, 0)
        }

    })


    blockstomark.forEach(block => {
        if (slayers.emanBtracersenabled) {
            drawTracerLine(block[0] + 0.5, block[1] + 0.5, block[2] + 0.5, 255, 0, 0, 0.3, 20)
        }
        if (slayers.emanBespenabled) {
            drawBlockEspBox(block[0], block[1], block[2], 255, 0, 0)
        }
    })

})


const drawTracerLine = (x, y, z, red, green, blue, alpha, lineWdith) => {
    x = -(Player.getPlayer().field_70142_S - x)
    y = -(Player.getPlayer().field_70137_T - y)
    z = -(Player.getPlayer().field_70136_U - z)

    GL11.glPushMatrix();
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(lineWdith);
    GL11.glColor4f(red, green, blue, alpha);
    GL11.glBegin(2);
    GL11.glVertex3d(x, y, z);
    GL11.glVertex3d(0.0, 0.0 + Player.getPlayer().func_70047_e(), 0.0);
    GL11.glEnd();
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glPopMatrix();
}



const drawBlockEspBox = (x, y, z, red, green, blue) => {
    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(2.0);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(false);
    GlStateManager.func_179094_E();

    const partialTicks = Tessellator.getPartialTicks();

    const locations = [
        //    x, y, z    x, y, z
        [
            [0, 0, 0],
            [1, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 0, 1]
        ],
        [
            [1, 0, 1],
            [1, 0, 0]
        ],
        [
            [1, 0, 1],
            [0, 0, 1]
        ],

        [
            [0, 1, 0],
            [1, 1, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [1, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 1],
            [0, 1, 1]
        ],

        [
            [0, 0, 0],
            [0, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1]
        ],
        [
            [1, 0, 1],
            [1, 1, 1]
        ]
    ];

    locations.forEach(loc => {
        Tessellator.begin(3).colorize(red, green, blue);

        Tessellator.pos(
            x + loc[0][0],
            y + loc[0][1],
            z + loc[0][2]
        ).tex(0, 0);

        Tessellator.pos(
            x + loc[1][0],
            y + loc[1][1],
            z + loc[1][2]
        ).tex(0, 0);

        Tessellator.draw();
    });

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
}


const drawHeadEspBox = (entity, red, green, blue) => {
    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(2.0);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(false);
    GlStateManager.func_179094_E();

    const partialTicks = Tessellator.getPartialTicks();



    const locations = [
        //    x, y, z    x, y, z
        [
            [0, 0, 0],
            [0.6, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 0, 0.6]
        ],
        [
            [0.6, 0, 0.6],
            [0.6, 0, 0]
        ],
        [
            [0.6, 0, 0.6],
            [0, 0, 0.6]
        ],

        [
            [0, 0.6, 0],
            [0.6, 0.6, 0]
        ],
        [
            [0, 0.6, 0],
            [0, 0.6, 0.6]
        ],
        [
            [0.6, 0.6, 0.6],
            [0.6, 0.6, 0]
        ],
        [
            [0.6, 0.6, 0.6],
            [0, 0.6, 0.6]
        ],

        [
            [0, 0, 0],
            [0, 0.6, 0]
        ],
        [
            [0.6, 0, 0],
            [0.6, 0.6, 0]
        ],
        [
            [0, 0, 0.6],
            [0, 0.6, 0.6]
        ],
        [
            [0.6, 0, 0.6],
            [0.6, 0.6, 0.6]
        ]
    ];

    locations.forEach(loc => {
        Tessellator.begin(3).colorize(red, green, blue);

        X = entity.getX() + (entity.getX() - entity.getLastX()) * partialTicks;
        Y = entity.getY() + (entity.getY() - entity.getLastY()) * partialTicks + 0.90
        Z = entity.getZ() + (entity.getZ() - entity.getLastZ()) * partialTicks;

        const centererVal = locations[0][1][0] / 2;

        Tessellator.pos(
            X + loc[0][0] - centererVal,
            Y + loc[0][1],
            Z + loc[0][2] - centererVal
        ).tex(0, 0);

        Tessellator.pos(
            X + loc[1][0] - centererVal,
            Y + loc[1][1],
            Z + loc[1][2] - centererVal
        ).tex(0, 0);

        Tessellator.draw();
    });

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
};

function customDrawString(text, outline, shadow, x, y, scale) {
    x = x / scale
    y = y / scale

    if (outline) {
        let colorCodes = ["&1", "&2", "&3", "&4", "&5", "&6", "&7", "&8", "&9", "&a", "&b", "&c", "&d", "&e", "&f"]

        let outlineString = text
        for (var i = 0; i < colorCodes.length; i++) {
            outlineString = outlineString.split(colorCodes[i]).join("")
                //outlineString = outlineString.replace(regex,"")
        }

        outlineString = "&0" + outlineString




        x2 = x
        y2 = y

        Renderer.scale(scale, scale)
        Renderer.drawString(outlineString, x2 + 1, y2)
        Renderer.scale(scale, scale)
        Renderer.drawString(outlineString, x2 - 1, y2)
        Renderer.scale(scale, scale)
        Renderer.drawString(outlineString, x2, y2 + 1)
        Renderer.scale(scale, scale)
        Renderer.drawString(outlineString, x2, y2 - 1)
        Renderer.scale(scale, scale)
        Renderer.drawString(text, x2, y2)

        //Renderer.scale(1,1)
    } else {
        if (shadow) {
            Renderer.scale(scale, scale)
            Renderer.drawStringWithShadow(text, x, y)
        } else {
            Renderer.scale(scale, scale)
            Renderer.drawString(text, x, y)
        }
    }

}