import { DiscordRPC, DiscordEventHandlers, DiscordRichPresence, config } from "../index";
DiscordRPC.discordShutdown();
const handler = new DiscordEventHandlers.Builder()
    .setReadyEventHandler((user) => {
        print("Welcome " + user.username + "#" + user.discriminator + "!");
    })
    .build();
DiscordRPC.discordInitialize("904062487308165180", handler, true);
const timestamp = Date.now();
let currentServer = "";
register("step", () => {
    if (!config.rpcEnabled)
        return;
    return void updateRPC();
});
register("worldUnload", () => {
    if (!config.rpcEnabled)
        return;
    return void updateRPC();
});
register("step", () => {
    if (!config.rpcEnabled && currentServer !== undefined) {
        DiscordRPC.discordClearPresence();
        currentServer = undefined;
    }
}).setFps(1);
if (config.rpcEnabled) {
    const presence = new DiscordRichPresence.Builder("")
        .setDetails("Main Menu")
        .setStartTimestamps(timestamp)
        .setBigImage("necron", null)
        .build();
    DiscordRPC.discordUpdatePresence(presence);
    register("gameUnload", () => {
        DiscordRPC.discordShutdown();
    });
}
const updateRPC = () => {
    return new Thread(() => {
        Thread.sleep(1000);
        if (currentServer !== Server.getIP()) {
            let presence;
            currentServer = Server.getIP();
            if (currentServer !== "") {
                if (currentServer === "localhost") {
                    presence = new DiscordRichPresence.Builder("")
                        .setDetails("Singleplayer")
                        .setStartTimestamps(timestamp)
                        .setBigImage("necron", null)
                        .build();
                } else {
                    presence = new DiscordRichPresence.Builder("")
                        .setDetails(currentServer)
                        .setStartTimestamps(timestamp)
                        .setBigImage("necron", null)
                        .build();
                }
            } else {
                presence = new DiscordRichPresence.Builder("")
                    .setDetails("Main Menu")
                    .setStartTimestamps(timestamp)
                    .setBigImage("necron", null)
                    .build();
            }
            DiscordRPC.discordUpdatePresence(presence);
        }
    }).start();
};