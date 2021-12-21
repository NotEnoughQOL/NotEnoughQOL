const Color = Java.type('java.awt.Color');
const ImageIO = Java.type('javax.imageio.ImageIO');
const BufferedImage = Java.type('java.awt.image.BufferedImage');
const Rect = Java.type('java.awt.Rectangle');
const EnumPlayerModelParts = Java.type('net.minecraft.entity.player.EnumPlayerModelParts');
const File = Java.type('java.io.File');


let color = (r, g, b) => {
    return new Color(r / 255, g / 255, b / 255);
}

class Player {

    constructor(name) {
        this.name = name;
    }

    setHead(image, bordered) {
        this.playerImage = image;
        this.borderImage = bordered;
        this.lastDecoration = null;
    }

    getHeadImages() {
        let mixColorsWithAlpha = (color1, color2) => {
            let alpha = ((color2 >> 24) & 0xFF) / 255;
            let red1 = (color1 >> 16) & 0xFF;
            let green1 = (color1 >> 8) & 0xFF;
            let blue1 = (color1) & 0xFF;
            let red2 = (color2 >> 16) & 0xFF;
            let green2 = (color2 >> 8) & 0xFF;
            let blue2 = (color2) & 0xFF;
            let red = ((red1 * (1 - alpha) + red2 * alpha));
            let green = (green1 * (1 - alpha) + green2 * alpha);
            let blue = (blue1 * (1 - alpha) + blue2 * alpha);
            return new Color(red / 255, green / 255, blue / 255);
        }
        let playerInfo = Client.getMinecraft().field_71439_g.field_71174_a.func_175104_a(this.name);
        if (!playerInfo) {
            ChatLib.chat('Couldnt find skin for player ' + this.name);
            return;
        }
        let fileLocation = playerInfo.func_178837_g().func_110623_a()
        var realImage;
        if (fileLocation.startsWith('skins')) {
            let fileLocationId = fileLocation.split('/')[1];
            fileLocation = './assets/skins/' + fileLocationId.substring(0, 2) + '/' + fileLocationId;
            let skinImage = new ImageIO.read(new File(fileLocation));
            realImage = new BufferedImage(8, 8, BufferedImage.TYPE_4BYTE_ABGR);
            for (let i = 8; i < 16; i++) for (let j = 8; j < 16; j++)
                realImage.setRGB(i - 8, j - 8, skinImage.getRGB(i, j));
            let player = World.getPlayerByName(this.name);
            if (!player || player.getPlayer().func_175148_a(EnumPlayerModelParts.HAT)) {
                for (let i = 40; i < 48; i++) for (let j = 8; j < 16; j++) {
                    let color1 = realImage.getRGB(i - 40, j - 8);
                    let color2 = skinImage.getRGB(i, j);
                    realImage.setRGB(i - 40, j - 8, mixColorsWithAlpha(color1, color2).getRGB());
                }
            }
        } else {
            //load from URL
            realImage = new Image('head-' + this.name + '.png', 'https://mc-heads.net/avatar/' + this.name).getImage();
            FileLib.deleteDirectory(new File('./config/ChatTriggers/images/head-' + this.name + '.png'));
        }
        let outlineImage = new BufferedImage(10, 10, BufferedImage.TYPE_4BYTE_ABGR)
        let graphics = outlineImage.createGraphics();
        graphics.setColor(color(0, 0, 0));
        graphics.fill(new Rect(0, 0, 10, 10));
        graphics.dispose();
        for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++)
            outlineImage.setRGB(i + 1, j + 1, realImage.getRGB(i, j));
        this.setHead(new Image(realImage), new Image(outlineImage));
    }
}

export default Player;