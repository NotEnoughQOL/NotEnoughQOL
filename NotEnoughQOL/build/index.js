import config from "./settings/config";
import Settings from "./settings/config";
import Dungeons from "./settings/dungeons";
import DungeonScanner from "./settings/dungeonsScanner"
import ESP from "./settings/esp";
import Macros from "./settings/macros";
import Slayer from "./settings/slayer";
import RenderLib from "../../RenderLib/index";
import dungeons from "./settings/dungeons";
import dungeonscanner from "./settings/dungeonsScanner"
import esp from "./settings/esp";
import macros from "./settings/macros";
import slayers from "./settings/slayer";


//import Player from "./Map/Player";
export { RenderLib, Settings, config, macros, dungeons, dungeonscanner, esp, slayers };
export { Dungeons, DungeonScanner, Macros, Slayer, ESP } // isn't actually used anywhere, i'm just lazy af to delete the imports from every file - tqxic
const LeftClick = Client.getMinecraft().class.getDeclaredMethod("func_147116_af");
const RightClick = Client.getMinecraft().class.getDeclaredMethod("func_147121_ag");
LeftClick.setAccessible(true);
RightClick.setAccessible(true);
export { LeftClick, RightClick };
let invKeybind = new KeyBind(Client.settings.getSettings().field_151445_Q);
let KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
export const drawName = (entity) => {
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

export const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
export const GL11 = Java.type("org.lwjgl.opengl.GL11");
export const mc = Client.getMinecraft()
export const PREFIX = "&7[&bNotEnoughQOL&7]&r ";
export const BIND_PREFIX = "⭍NotEnoughQOL";
export const SLAYER_PREFIX = "⭍NotEnoughQOL: Slayer Macros";
export const DUNGEONS_PREFIX = "⭍NotEnoughQOL: Dungeons Macros";
export const MISC_PREFIX = "⭍NotEnoughQOL: Misc Macros";
export const CHAT_PREFIX = "⭍NotEnoughQOL: Chat Macros";
export const GUI_PREFIX = "⭍NotEnoughQOL: GUI Macros";
export const ITEM_PREFIX = "⭍NotEnoughQOL: Item Macros";
export const ADVANCE_PREFIX = "⭍NotEnoughQOL: Advance Macros";
export const BlockPos = Java.type("net.minecraft.util.BlockPos");
export const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
export const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
export const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
export const Creeper = Java.type("net.minecraft.entity.monster.EntityCreeper");
export const archaneKeeper = Java.type("net.minecraft.entity.monster.EntityCaveSpider");
export const revMinis = Java.type("net.minecraft.entity.monster.EntityZombie");
export const svenMinis = Java.type("net.minecraft.entity.monster.EntityWolf");
export const taraMinis = Java.type("net.minecraft.entity.monster.EntitySpider");
export const voidgloomMinis = Java.type("net.minecraft.entity.monster.EntityEnderman3");
export const enderDragon = Java.type("net.minecraft.entity.boss.EntityDragonPartBody");
export const endCrystal = Java.type("net.minecraft.entity.item.EntityEnderCrystal");
export const ironGolem = Java.type("net.minecraft.entity.monster.EntityIronGolem");
export const slimes = Java.type("net.minecraft.entity.monster.EntitySlime");
export const islandWitch = Java.type("net.minecraft.entity.monster.EntityWitch");
export const playerESP = Java.type("net.minecraft.entity.player.EntityPlayerMP");
export const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC");
export const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers");
export const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence");
export const containsItem = (slotNum, itemName) => { return Player.getInventory().getStackInSlot(slotNum).getName().removeFormatting().toLowerCase().includes(itemName.toLowerCase()); };
export const getCurrentSlot = () => { return Player.getInventory().getInventory().field_70461_c; };
export const setSlot = (slotNumber) => { return Player.getInventory().getInventory().field_70461_c = slotNumber; };
export const openInventory = () => {
    Client.currentGui.close();
    KeyBinding.func_74507_a(invKeybind.getKeyCode());
};
export const pressed = (key) => {
    if (Keyboard.isKeyDown(key.getKeyCode()) && (Client.currentGui.getClassName().toLowerCase().includes("chest"))) {
        return true;
    }
    return key.isKeyDown();
};
(function() {
    const File = Java.type("java.io.File");
    const commandFiles = new File("./config/ChatTriggers/modules/NotEnoughQOL/build/commands").listFiles().filter(file => file.isFile() && file.getName().endsWith(".js"));
    commandFiles.forEach(file => {
        var _a;
        try {
            const command = require("./commands/" + file.getName()).default;
            register("command", command.run).setName(command.name);
            (_a = command.aliases) === null || _a === void 0 ? void 0 : _a.forEach(alias => {
                register("command", command.run).setName(alias);
            });
        } catch (e) {
            print("Error while loading command: " + e.message);
        }
    });
    const moduleFiles = new File("./config/ChatTriggers/modules/NotEnoughQOL/build/modules").listFiles().filter(file => file.isFile() && file.getName().endsWith(".js"));
    moduleFiles.forEach(file => require("./modules/" + file.getName()));
    require("./Map/index")
})();

class PaddyButton {
  constructor(color, x, y, width, height, text) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getText() {
    return this.text;
  }

  setColor(newcolor) {
    this.color = newcolor;
  }

  drawButton() {
    Renderer.drawRect(this.color, this.x,this.y,this.width,this.height);
    let buttontext = this.text;
    let buttonx = this.x + (this.width / 2 - Renderer.getStringWidth(this.text) / 2);
    let buttony = this.y + (this.height / 2 - 4);
    Renderer.drawString(buttontext, buttonx, buttony);
  }

  drawChromaButton() {
    Renderer.drawRect(this.color, this.x,this.y,this.width,this.height);
    let buttonx = this.x + (this.width / 2 - Renderer.getStringWidth(this.text) / 2);
    let buttony = this.y + (this.height / 2) - 4;
    let buttontext = new Text(this.text, buttonx, buttony).setColor(Renderer.getRainbow(myrainbowstep, myrainbowspeed)).draw();
  }

  isMouseOver() {
    let mx = Client.getMouseX();
    let my = Client.getMouseY();
    if(mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
      return true;
    }
  }

}





register("command", () => config.openGUI()).setName("neqgeneral")
register("command", () => Dungeons.openGUI()).setName("neqdungeons")
register("command", () => DungeonScanner.openGUI()).setName("neqmapscanner")
register("command", () => Slayer.openGUI()).setName("neqslayer")
register("command", () => ESP.openGUI()).setName("neqesp")
register("command", () => Macros.openGUI()).setName("neqmacros")
