import { PREFIX } from "../index";
let cooldown = false;
const sniping = {
    active: false,
    username: "",
    warp: "",
    atIsland: false
};
const SnipeCommand = {
    name: "snipe",
    aliases: ["findsarite"],
    usage: "",
    run: function (...args) {
        if (args.length === 0) {
            if (sniping.active) {
                sniping.active = false;
                sniping.warp = "";
                sniping.username = "";
                sniping.atIsland = false;
                return void ChatLib.chat(PREFIX + "Sniping stopped!");
            }
        }
        if (args.length !== 2)
            return void ChatLib.chat(PREFIX + "Invalid Usage! /snipe [username] [warp name]");
        sniping.active = true;
        sniping.warp = args[1].toLowerCase();
        sniping.username = args[0].toLowerCase();
        return void ChatLib.chat(`${PREFIX}You are now sniping ${sniping.username} in the warp ${sniping.warp}. Use /snipe again to stop sniping.`);
    }
};
register("step", () => {
    if (sniping.active) {
        if (!sniping.atIsland) {
            ChatLib.say("/is");
            sniping.atIsland = true;
        }
        else {
            ChatLib.say(`/warp ${sniping.warp}`);
            sniping.atIsland = false;
        }
    }
}).setDelay(2);
register("tick", () => {
    if (sniping.active && !cooldown) {
        cooldown = true;
        setTimeout(() => {
            cooldown = false;
        }, 500);
        new Thread(() => {
            const players = TabList.getNames().map(name => name.toLowerCase().removeFormatting());
            if (players.includes(sniping.username)) {
                ChatLib.chat(PREFIX + sniping.username + " found!");
                sniping.active = false;
                sniping.warp = "";
                sniping.username = "";
                sniping.atIsland = false;
                return;
            }
        }).start();
    }
});
export default SnipeCommand;
