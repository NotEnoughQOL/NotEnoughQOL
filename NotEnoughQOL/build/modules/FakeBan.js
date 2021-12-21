import { BIND_PREFIX, config } from "../index";

const S40PacketDisconnect = Java.type("net.minecraft.network.play.server.S40PacketDisconnect");

const banScreen = new KeyBind("Smirk Cat", Keyboard.KEY_NONE, BIND_PREFIX);
// Ban Reason Variables
const Cheating = "Cheating through the use of unfair game advantages."
const accountBoosting = "Boosting your account to improve your stats."
const profileBoosting = "Boosting detected on one or multiple SkyBlock profiles."
const securityBan = "Your account has a security alert, please secure it and contact appeals."
const buildBattle = "Creating a build or drawing which is not appropriate on the server."
const innapCosmetics = "Inappropriate usage of cosmetics, items, or other content."
const innapSkin = "Using inappropriate skins or capes on the server."
const crossTeaming = "Cross teaming, you were found to be working with another team or player."
const teamMates = "You were found to be negatively affecting your fellow team members."
const disRespect = "Acting in a manner that is extremely disrespectful to members within the community"

// Ban Lengths 
const sevenDays = "§cYou are temporarily banned for §f6d 59h 59m 59s"
const thirtyDays = "§cYou are temporarily banned for §f29d 59h 59m 59s"
const ninetyDays = "§cYou are temporarily banned for §f89d 59h 59m 59s"
const oneEightyDays = "§cYou are temporarily banned for §f179d 59h 59m 59s"
const threeSixtyDays = "§cYou are temporarily banned for §f364d 59h 59m 59s"
const permBan = "§cYou are permanently banned"

register("tick", () => {
    if (!config.fakeBan)
        return;
    if (banScreen.isPressed()) {
        if (config.fakeBanReason === 0 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + Cheating + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 0 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + Cheating + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 0 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + Cheating + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 0 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + Cheating + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 0 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + Cheating + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 1 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + accountBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 1 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + accountBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 1 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + accountBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 1 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + accountBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 1 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + accountBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 2 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + profileBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 2 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + profileBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 2 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + profileBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 2 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + profileBoosting + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 3 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + securityBan + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 4 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + buildBattle + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 5 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + innapCosmetics + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 6 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + innapSkin + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 7 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + crossTeaming + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 8 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + teamMates + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 0) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(sevenDays + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 1) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(thirtyDays + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 2) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(ninetyDays + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 3) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(oneEightyDays + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 4) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(threeSixtyDays + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        } else if (config.fakeBanReason === 9 && config.fakeBanLength === 5) {
            new Thread(() => {
                Thread.sleep(5000)
                Client.getMinecraft().func_147114_u().func_147253_a(new net.minecraft.network.play.server.S40PacketDisconnect(new TextComponent(permBan + " §cfrom this server!\n\n§7Reason: §f" + disRespect + "\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §f" + config.fakeBanID + "\n§7Sharing your Ban ID may affect the processing of your appeal!").chatComponentText));
            }).start()
        }
    }
})