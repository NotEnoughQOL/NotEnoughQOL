import { config } from "../index";

let doIGoBack = false;
register("worldLoad", () => {
    if (!config.autoIsland)
        return;
    if (config.autoIslandType === 0) {
        if (doIGoBack) {
            new Thread(() => {
                Thread.sleep(5000)
                ChatLib.chat("&cIsland restart detected while afk. Sending back to island")
                ChatLib.command("is")
                doIGoBack = false
            }).start()
        }
    } else if (config.autoIslandType === 1) {
        if (doIGoBack) {
            new Thread(() => {
                Thread.sleep(5000)
                ChatLib.chat("&cThe Private Island you were on is restarting, sending you back to " + config.autoIslandIGN + "'s Private Island")
                ChatLib.command("visit " + config.autoIslandIGN)
                Thread.sleep(500)
                if (Player.getOpenedInventory().getName() === "Visit " + config.autoIslandIGN) {
                    Player.getOpenedInventory().click(11, false, "MIDDLE");
                    doIGoBack = false
                }
            }).start()
        }
    }
})


register("chat", () => {
    if (new Date().getTime() - lastMessageSent > 3000) {
        doIGoBack = true
    }
}).setChatCriteria("&r&7Evacuating to Hub...&r")


let lastMessageSent = 0
register("messageSent", () => {
    lastMessageSent = new Date().getTime()
})

let commandsQueue = []
let commandsQueueLast = new Date().getTime();

register("Tick", function() {
    if (new Date().getTime() - commandsQueueLast > 500) {
        commandsQueueLast = new Date().getTime()
        if (commandsQueue.length > 0) {
            let thing = commandsQueue.shift()
            if (thing !== "") {
                ChatLib.say(thing)
            }
        }
    }
})