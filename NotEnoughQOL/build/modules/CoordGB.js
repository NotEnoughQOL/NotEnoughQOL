import { dungeons, Dungeons } from "../index";

const BlockPos = Java.type("net.minecraft.util.BlockPos")
const blockCoords = [
    [275, 220, 231],
    [275, 220, 232],
    [299, 168, 243],
    [299, 168, 244],
    [299, 168, 246],
    [299, 168, 247],
    [299, 168, 247],
    [300, 168, 247],
    [300, 168, 246],
    [300, 168, 244],
    [300, 168, 243],
    [298, 168, 247],
    [298, 168, 246],
    [298, 168, 244],
    [298, 168, 243],
    [287, 167, 240],
    [288, 167, 240],
    [289, 167, 240],
    [290, 167, 240],
    [291, 167, 240],
    [292, 167, 240],
    [293, 167, 240],
    [294, 167, 240],
    [295, 167, 240],
    [290, 167, 239],
    [291, 167, 239],
    [292, 167, 239],
    [293, 167, 239],
    [294, 167, 239],
    [295, 167, 239],
    [290, 166, 239],
    [291, 166, 239],
    [292, 166, 239],
    [293, 166, 239],
    [294, 166, 239],
    [295, 166, 239],
    [290, 166, 240],
    [291, 166, 240],
    [292, 166, 240],
    [293, 166, 240],
    [294, 166, 240],
    [295, 166, 240]
]
register("tick", () => {
    if (!dungeons.coordGB)
        return;
    blockCoords.forEach(coord => {
        World.getWorld().func_175698_g(new BlockPos(coord[0], coord[1], coord[2]))
    })
})