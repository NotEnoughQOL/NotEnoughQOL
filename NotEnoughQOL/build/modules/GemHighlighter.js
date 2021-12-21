import { config, GlStateManager } from "../index";

let thingsToHighlight = [];
let highlightColor = Renderer.color(0, 255, 0, 150);
let lastPushedTime = new Date().getTime();
let pingToHypixel = undefined;

register("postGuiRender", function(gui, mouseX, mouseY) {
    if (new Date().getTime() - lastPushedTime > 500) {
        checkLoreforPerfectGems();
        lastPushedTime = new Date().getTime();
    }
})

register("tick", function() {
    if (!Player.getOpenedInventory().getName().includes("Auction") || Player.getOpenedInventory() == undefined || Player.getOpenedInventory() == null) {
        thingsToHighlight.length = 0;
    }
})

let gemstoneUpdateTimer = new Date().getTime();

register("tick", function() {
    if (new Date().getTime() - gemstoneUpdateTimer > 10000) {
        getPing();
        gemstoneUpdateTimer = new Date().getTime();
    }
})

register("guiMouseClick", function() {
    if (config.perfectGemstoneHighlightToggle && pingToHypixel !== undefined) {
        setTimeout(function() {
            thingsToHighlight.length = 0;
        }, parseInt(pingToHypixel + 50))
        setTimeout(function() {
            thingsToHighlight.length = 0;
        }, parseInt(pingToHypixel * 2 + 50))
    }
})


function checkLoreforPerfectGems() {
    new Thread(() => {
        try {
            if (!config.perfectGemstoneHighlightToggle) return;
            let inv = Player.getOpenedInventory();
            let i = 0;
            inv.getItems().forEach((item) => {
                item.getLore().forEach((line) => {
                    if (line.includes("§6[§e✧") || line.includes("§6[§a☘") || line.includes("§6[§6⸕") || line.includes("§6[§c❤") || line.includes("§6[§b✎") || line.includes("§6[§d❁") || line.includes("§6[§d⚔") || line.includes("§6[§5❈")) {
                        thingsToHighlight.push(i);
                    }
                })
                thingsToHighlight = getUnique(thingsToHighlight);
                i++;
            })
        } catch (e) {}
    }).start();
}

//methods

function onPixel() {
    if (Server.getIP().toLowerCase().includes("hypixel")) {
        return true
    }
    return false
}


function getPing() {
    if (!onPixel()) return
    let trigger;
    let newtime;
    newtime = Date.now();
    ChatLib.command(newtime);
    trigger = true;
    let onChat = register("chat", function(event) {
        if (!trigger) return;
        pingToHypixel = Date.now() - newtime;
        cancel(event);
        trigger = false;
    }).setChatCriteria('&rUnknown command. Type "' && 'help" for help.&r').setContains();
}

function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

register("postGuiRender", function(gui, mouseX, mouseY) {
    if (gui == undefined || String(gui).toLowerCase().includes("optifine") || String(gui).toLowerCase().includes("menu")) return;
    currentgui = String(gui).toLowerCase();
    let inventory;
    try {
        inventory = Player.getOpenedInventory();
    } catch (e) {
        return;
    }
    if (String(gui).toLowerCase().includes("chest")) {
        GlStateManager.func_179094_E(); // push
        thingsToHighlight.forEach((slot) => {
            if (typeof slot == 'object') {
                let i = 1;
                Object.keys(slot).forEach((subslot) => {
                    const x = slot[subslot] % 9;
                    const y = Math.floor(slot[subslot] / 9);
                    const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                    const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                    Renderer.translate(0, 0, 260);
                    Renderer.drawRect(highlightColor, renderX - 8, renderY - 8, 16, 16);
                    i = i + 0.85;
                })
            } else {
                const x = slot % 9;
                const y = Math.floor(slot / 9);
                const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                if (slot < 54) {
                    Renderer.translate(0, -1, 260);
                } else if (slot > 80) {
                    Renderer.translate(0, 17, 260);
                } else {
                    Renderer.translate(0, 12, 260);
                }
                Renderer.drawRect(highlightColor, renderX - 8, renderY - 8, 16, 16);
            }
        })
        GlStateManager.func_179121_F(); // pop
    } else if (String(gui).toLowerCase().includes("inventory")) {
        GlStateManager.func_179094_E(); // push
        thingsToHighlight.forEach((slot) => {
            if (typeof slot == 'object') {
                let i = 1;
                Object.keys(slot).forEach((subslot) => {
                    const x = slot[subslot] % 9;
                    const y = Math.floor(slot[subslot] / 9);
                    const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                    const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                    Renderer.translate(0, 0, 260);
                    Renderer.drawRect(highlightColor, renderX - 8, renderY - 8, 16, 16);
                    i = i + 0.85;
                })
            } else {
                const x = slot % 9;
                const y = Math.floor(slot / 9);
                const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                if (slot > 4 && slot < 9) {
                    Renderer.translate(623, -311, 260);
                    Renderer.rotate(90);
                } else if (slot > 8 && slot < 36) {
                    Renderer.translate(0, 30, 260);
                } else if (slot > 35) {
                    Renderer.translate(0, 35, 260);
                }
                Renderer.drawRect(highlightColor, renderX - 8, renderY - 8, 16, 16);
            }
        })
        GlStateManager.func_179121_F(); // pop
    }
})