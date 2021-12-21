import { C08PacketPlayerBlockPlacement, setSlot, C09PacketHeldItemChange, C0APacketAnimation, containsItem, config, getCurrentSlot, PREFIX, LeftClick, RightClick } from "../index";
export class ClickMacro {
    constructor(type, clickType, bind, delay, pressType, ...items) {
        this.macroing = false;
        this.type = type;
        this.clickType = clickType;
        this.bind = bind;
        this.items = items;
        this.delay = delay;
        this.pressType = pressType;
        register("tick", () => {
            if (this.pressed() && !this.macroing) {
                this.macroing = true;
                return new Thread(() => {
                    HotbarLoop: for (let i = 0; i < 9; ++i) {
                        for (let j = 0; j < this.items.length; ++j) {
                            if (containsItem(i, this.items[j])) {
                                if (config.debugMode)
                                    ChatLib.chat(PREFIX + "Found " + this.items[j]);
                                break;
                            }
                            else {
                                if (j === this.items.length - 1) {
                                    if (config.debugMode)
                                        ChatLib.chat(PREFIX + "Could not find " + this.items[j]);
                                    continue HotbarLoop;
                                }
                            }
                        }
                        let slot = getCurrentSlot();
                        this.changeSlot(i);
                        Thread.sleep(this.delay);
                        this.click(i);
                        Thread.sleep(this.delay);
                        this.changeSlot(slot);
                        this.macroing = false;
                        break;
                    }
                }).start();
            }
        });
    }
    pressed() {
        if (this.pressType === "isPressed") {
            return this.bind.isPressed();
        }
        else if (this.pressType === "isKeyDown") {
            return this.bind.isKeyDown();
        }
    }
    click(slot) {
        if (this.clickType === "right") {
            this.rightClick(slot);
        }
        else if (this.clickType === "left") {
            this.leftClick();
        }
    }
    rightClick(slot) {
        if (this.type === "legit") {
            RightClick.invoke(Client.getMinecraft());
        }
        else if (this.type === "packet") {
            Client.sendPacket(new C08PacketPlayerBlockPlacement(Player.getInventory().getStackInSlot(slot).getItemStack()));
        }
    }
    leftClick() {
        if (this.type === "legit") {
            LeftClick.invoke(Client.getMinecraft());
        }
        else if (this.type === "packet") {
            Client.sendPacket(new C0APacketAnimation());
        }
    }
    changeSlot(slot) {
        if (this.type === "legit") {
            setSlot(slot);
        }
        else if (this.type === "packet") {
            Client.sendPacket(new C09PacketHeldItemChange(slot));
        }
    }
}
