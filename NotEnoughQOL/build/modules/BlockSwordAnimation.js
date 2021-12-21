import { config, Dungeons, dungeons } from "../index";

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const BlockPos = net.minecraft.util.BlockPos;
const mc = Client.getMinecraft();

let isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()
register("tick", () => {
    isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()
})

let enabledSwords = [];

register("playerInteract", (action, vector3d, event) => {
    enabledSwords = dungeons.blockedSwords.split(", ")
    if (action.toString() !== "RIGHT_CLICK_EMPTY" || !dungeons.blockSword) { return; }
    let item = Player.getHeldItem()
    let isEnabledSword = false

    enabledSwords.forEach((sword) => {
        if (item.getName().removeFormatting().toLowerCase().includes(sword.toLowerCase())) {
            isEnabledSword = true
        }
    })
    if (isEnabledSword) {
        cancel(event)
        if (!isRightClickKeyDown) {
            Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player.getHeldItem().getItemStack(), 0, 0, 0))
        }
    }
})