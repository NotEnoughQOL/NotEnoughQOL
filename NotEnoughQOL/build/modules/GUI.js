import { PREFIX, config } from "../index";
let GuiButton = Java.type("net.minecraft.client.gui.GuiButton");

let nerImage = new Image("NER", "https://cdn.discordapp.com/attachments/909729021795897396/914209168569823263/ner_nobg_00000.png");
let backgroundColor = Renderer.color(0, 0, 0, 50);
let bigChromaStep = 0;
let bigChromaSpeed = 10;
let smallChromaStep = 0;
let smallChromaSpeed = 10;

register("step", function() {
  bigChromaSpeed = config.guiButtonChromaSpeed;
  smallChromaSpeed = config.guiButtonChromaSpeed;
}).setDelay(2);

let configGui = new Gui();
let dungeonsButton = new GuiButton(0, Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 - 10, 200, 20, "Dungeons");
let generalButton = new GuiButton(0, Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 + 20, 200, 20, "General");
let slayerButton = new GuiButton(0, Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 - 10, 200, 20, "Slayers");
let espButton = new GuiButton(0, Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 + 20, 200, 20, "ESP");
let dungeonScannerButton = new GuiButton(0, Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 + 50, 200, 20, "Dungeon Scanner");
let macrosButton = new GuiButton(0, Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 + 50, 200, 20, "Macros");


register("command", function() {
    configGui.open();
}).setName("opennerconfig");


register("renderOverlay", function() {
    if (configGui.isOpen()) {
        let nerText = new Text("Not Enough QOL", Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(nerText) * 4.25, Renderer.screen.getHeight() / 4).setColor(Renderer.getRainbow(bigChromaStep, bigChromaSpeed)).setScale(5).setShadow(true);
        nerText.draw();
        bigChromaStep++;
        smallChromaStep--;
    }
})

register("renderOverlay", function() {
    if(configGui.isOpen()) {
      Renderer.drawRect(backgroundColor, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
      dungeonsButton = new PaddyButton(Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 - 10, 200, 20, "Dungeons");
      dungeonsButton.drawChromaButton();
      generalButton = new PaddyButton(Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 + 20, 200, 20, "General");
      generalButton.drawChromaButton();
      slayerButton = new PaddyButton(Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 - 10, 200, 20, "Slayers");
      slayerButton.drawChromaButton();
      espButton = new PaddyButton(Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 + 20, 200, 20, "ESP");
      espButton.drawChromaButton();
      dungeonScannerButton = new PaddyButton(Renderer.screen.getWidth() / 2 - 220, Renderer.screen.getHeight() / 2 + 50, 200, 20, "Dungeon Scanner");
      dungeonScannerButton.drawChromaButton();
      macrosButton = new PaddyButton(Renderer.screen.getWidth() / 2 + 20, Renderer.screen.getHeight() / 2 + 50, 200, 20, "Macros");
      macrosButton.drawChromaButton();
      contributionsButton = new PaddyButton(5, Renderer.screen.getHeight() - 25, 100, 20, "Contributions");
      contributionsButton.drawButton();
    }
})

register("guiMouseClick", function(x, y, button, state) {
    if (button !== 0) return;
    if(configGui.isOpen()) {
      if (dungeonsButton.isMouseOver()) {
          ChatLib.command("neqdungeons", true)
      }
      if (generalButton.isMouseOver()) {
          ChatLib.command("neqgeneral", true)
      }
      if (slayerButton.isMouseOver()) {
          ChatLib.command("neqslayer", true)
      }
      if (espButton.isMouseOver()) {
          ChatLib.command("neqesp", true)
      }
      if (dungeonScannerButton.isMouseOver()) {
          ChatLib.command("neqmapscanner", true)
      }
      if (macrosButton.isMouseOver()) {
          ChatLib.command("neqmacros", true)
      }
      if (contributionsButton.isMouseOver()) {
          ChatLib.chat("&b----------------------------------------------------")
          ChatLib.chat(PREFIX + "&bCreator&r: not u")
          ChatLib.chat("&b----------------------------------------------------")
          ChatLib.chat("")
          ChatLib.chat("&b----------------------------------------------------")
          ChatLib.chat(PREFIX + "&bDungeon Extras&r: Dungeons ESP")
          ChatLib.chat(PREFIX + "&bAlon&r: Block Sword Animations")
          ChatLib.chat(PREFIX + "&bAnonymous&r: Dungeon Map Scanner")
          ChatLib.chat("&b----------------------------------------------------")
      }
    }
})

register("renderHotbar", function() {
  if(configGui.isOpen()) {
    if(contributionsButton.isMouseOver()) {
      configGui.drawCreativeTabHoveringString("Learn about all of the contributions of NotEnoughQOL", Client.getMouseX(), Client.getMouseY());
    }
  }
})



//==============================================================================


class PaddyButton {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  drawButton() {
    let buttontext = this.text;
    let buttonx = this.x + (this.width / 2 - Renderer.getStringWidth(this.text) / 2);
    let buttony = this.y + (this.height / 2 - 4);
    let mx = Client.getMouseX();
    let my = Client.getMouseY();
    if(mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
      Renderer.drawRect(Renderer.color(180,180,180,80), this.x,this.y,this.width,this.height);
    } else {
      Renderer.drawRect(Renderer.color(0,0,0,80), this.x,this.y,this.width,this.height);
    }
    Renderer.drawString(buttontext, buttonx, buttony);
  }

  drawChromaButton() {
    let buttonx = this.x + (this.width / 2 - Renderer.getStringWidth(this.text) / 2);
    let buttony = this.y + (this.height / 2) - 4;
    let mx = Client.getMouseX();
    let my = Client.getMouseY();
    let buttontext = new Text(this.text, buttonx, buttony).setColor(Renderer.getRainbow(smallChromaStep, smallChromaSpeed)).draw();
    if(mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
      Renderer.drawRect(Renderer.color(180,180,180,80), this.x,this.y,this.width,this.height);
    } else {
      Renderer.drawRect(Renderer.color(0,0,0,80), this.x,this.y,this.width,this.height);
    }
  }

  isMouseOver() {
    let mx = Client.getMouseX();
    let my = Client.getMouseY();
    if(mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
      return true;
    }
  }
}

let contributionsButton = new PaddyButton(5, Renderer.screen.getHeight() - 25, 100, 20, "Contributions"); //needed to move this down because else its breaking
