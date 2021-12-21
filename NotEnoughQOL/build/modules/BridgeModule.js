import { config } from "../index";


const onBridgeMessage = (chatAuthor, dcName, msg, event) => {

    if (!config.isEnabled) return;

    let cleanAuthor = ChatLib.removeFormatting(chatAuthor).toLowerCase()
    if (config.botName.toLowerCase() !== cleanAuthor) return;

    cancel(event);

    let channelColor = config.customChannelColor.toString(16)
    let channel = config.customChannel
    let userColor = config.userColor.toString(16)
    let userRankColor = config.customUserRankColor.toString(16)
    let userRank = config.customUserRank
    let guildRankColor = config.customGuildRankColor.toString(16)
    let guildRank = config.customGuildRank

    let displayChannel = channel ? `§${channelColor}${channel} > §r` : '§r';
    let displayUserRank = userRank ? `§${userRankColor}[${userRank}] §r` : '$r';
    let displayUser = `§${userColor}${dcName}`.trim();
    let displayGuildRank = guildRank ? ` §${guildRankColor}[${guildRank}]§r` : '§r';

    ChatLib.chat(`${displayChannel}${displayUserRank}${displayUser}${displayGuildRank}§f:§r ${msg}`)
}


register("chat", onBridgeMessage).setCriteria("&r&2Guild > ${chatAuthor}: &r${dcName}: ${msg}&r");
register("chat", onBridgeMessage).setCriteria("&r&2Guild > ${*} ${chatAuthor}: &r${dcName}: ${msg}&r");
register("chat", onBridgeMessage).setCriteria("&r&2Guild > ${chatAuthor} ${*}: &r${dcName}: ${msg}&r");
register("chat", onBridgeMessage).setCriteria("&r&2Guild > ${*} ${chatAuthor} ${*}: &r${dcName}: ${msg}&r");