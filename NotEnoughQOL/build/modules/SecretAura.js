import { dungeons, PREFIX, ADVANCE_PREFIX } from "../index";
let EnumFacing = Java.type("net.minecraft.util.EnumFacing");
let BlockPos = Java.type("net.minecraft.util.BlockPos");
let BlockChest = Java.type("net.minecraft.block.BlockChest");
let BlockLever = Java.type("net.minecraft.block.BlockLever");
let TileEntitySkull = Java.type("net.minecraft.tileentity.TileEntitySkull")
let Vec3 = Java.type("net.minecraft.util.Vec3");
let ArrayList = Java.type("java.util.ArrayList");
let secretauraSwitchSettingsKeybind = new KeyBind("Secret Aura", Keyboard.KEY_NONE, ADVANCE_PREFIX);

let alreadyClicked = new ArrayList;
let timeSinceLastEssenceCheck = new Date().getTime();

function setAuraItem() {
    Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
        if (item.getName().includes(dungeons.auraHeldItem)) {
            Player.setHeldItemIndex(index);
        }
    })
}

let inDungeon = false;

register("tick", function() {
  Scoreboard.getLines().forEach((x) => {
    let unformatted = ChatLib.removeFormatting(x);
    if(/ ⏣ The Catac.+ombs \(.+\)/.test(unformatted)) {
      inDungeon = true;
    }
  })
})

register("worldLoad", function() {
  inDungeon = false;
})


register("tick", function() {
    if (secretauraSwitchSettingsKeybind.isPressed()) {
        if (dungeons.secretAuraToggle) {
            ChatLib.chat(PREFIX + "&rSecret Aura &cDisabled");
            dungeons.secretAuraToggle = false;
        } else if (!dungeons.secretAuraToggle) {
            ChatLib.chat(PREFIX + "&rSecret Aura &aEnabled");
            dungeons.secretAuraToggle = true;
        }
    }
})


let gameRunning = true;

register("gameUnload", function() {
    gameRunning = false;
})

register("gameLoad", function() {
    gameRunning = true;
})

new Thread(() => {
    while (gameRunning) {
        Thread.sleep(100);
        if (dungeons.secretAuraToggle && inDungeon) {
            for (let x = Player.getX() - 10; x < Player.getX() + 10; x++) {
                for (let y = Player.getY() - 10; y < Player.getY() + 10; y++) {
                    for (let z = Player.getZ() - 10; z < Player.getZ() + 10; z++) {
                        let position = new BlockPos(x, y, z);
                        let block = Client.getMinecraft().field_71441_e.func_180495_p(position).func_177230_c();
                        if (!alreadyClicked.contains(position) && Client.getMinecraft().field_71439_g.func_70011_f(position.func_177958_n(), position.func_177956_o() - Client.getMinecraft().field_71439_g.func_70047_e(), position.func_177952_p()) < dungeons.auraReach) {
                            if (block instanceof BlockChest) {
                                for (let i = 0; i < 9; i++) {
                                    if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes(String(dungeons.auraHeldItem))) {
                                        let holding = Player.getHeldItemIndex();
                                        setAuraItem();
                                        Client.getMinecraft().field_71442_b.func_178890_a(Player.getPlayer(), World.getWorld(), Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(), position, EnumFacing.func_176733_a(Client.getMinecraft().field_71439_g.field_70177_z), new Vec3(0.0, 0.0, 0.0));
                                        Player.setHeldItemIndex(holding);
                                        alreadyClicked.add(position);
                                        //return;
                                    }
                                }
                            } else if (block instanceof BlockLever) {
                                for (let i = 0; i < 9; i++) {
                                    if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes(String(dungeons.auraHeldItem))) {
                                        let holding = Player.getHeldItemIndex();
                                        setAuraItem();
                                        Client.getMinecraft().field_71442_b.func_178890_a(Player.getPlayer(), World.getWorld(), Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(), position, EnumFacing.func_176733_a(Client.getMinecraft().field_71439_g.field_70177_z), new Vec3(0.0, 0.0, 0.0));
                                        Client.getMinecraft().field_71442_b.func_178890_a(Player.getPlayer(), World.getWorld(), Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(), position, EnumFacing.func_176733_a(Client.getMinecraft().field_71439_g.field_70177_z), new Vec3(0.0, 0.0, 0.0));
                                        Player.setHeldItemIndex(holding);
                                        alreadyClicked.add(position);
                                        //return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            World.getWorld().field_147482_g.forEach((entity) => {
                if (entity instanceof TileEntitySkull) {
                    let position = new BlockPos(entity.func_174877_v().func_177958_n(), entity.func_174877_v().func_177956_o(), entity.func_174877_v().func_177952_p());
                    if (!alreadyClicked.contains(position) && Client.getMinecraft().field_71439_g.func_70011_f(position.func_177958_n(), position.func_177956_o() - Client.getMinecraft().field_71439_g.func_70047_e(), position.func_177952_p()) < dungeons.auraReach) {
                        let property = entity?.func_152108_a()?.getProperties()?.get("textures");
                        if (property && property[0] && property[0].value === "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzRkYjRhZGZhOWJmNDhmZjVkNDE3MDdhZTM0ZWE3OGJkMjM3MTY1OWZjZDhjZDg5MzQ3NDlhZjRjY2U5YiJ9fX0=") {
                            for (let i = 0; i < 9; i++) {
                                if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes(String(dungeons.auraHeldItem))) {
                                    let holding = Player.getHeldItemIndex();
                                    setAuraItem();
                                    Client.getMinecraft().field_71442_b.func_178890_a(Player.getPlayer(), World.getWorld(), Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(), position, EnumFacing.func_176733_a(Client.getMinecraft().field_71439_g.field_70177_z), new Vec3(0.0, 0.0, 0.0));
                                    Player.setHeldItemIndex(holding);
                                    alreadyClicked.add(position);
                                    //return;
                                }
                            }
                        }
                    }
                }
            })
        }
    }
}).start();
