import { macros, PREFIX, LeftClick, RightClick } from "../index";

let autofishTimer = new Date().getTime();

register("soundPlay", function() {
    if (!macros.autoFishToggle) return;
    if (arguments[3] == 0.25) {
        var fishhooks = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.projectile.EntityFishHook").class);
        var pos = arguments[0];
        for (var i = 0; i < fishhooks.length; i++) {
            var hook = fishhooks[i];
            var dist = Math.sqrt(Math.pow(hook.getX() - pos.x, 2) + Math.pow(hook.getY() - pos.y, 2) + Math.pow(hook.getZ() - pos.z, 2))
            if (Number(dist) < 0.5 && Player.getPlayer().field_71104_cf == hook.getEntity()) {
                new Thread(function() {
                    for (var j = 0; j < 2; j++) {
                        Thread.sleep(Math.floor(Math.random() * 50) + 150);
                        RightClick.invoke(Client.getMinecraft());
                    }
                    if (new Date().getTime() - autofishTimer > 10000 && macros.autoFishRandomMotion) {
                        Thread.sleep(2500);
                        doRandomMotion();
                        autofishTimer = new Date().getTime();
                    }
                }).start();
            }
        }
    }
}).setCriteria("game.player.swim.splash");


function doRandomMotion() {
    new Thread(() => {
        let result = randomNumber(4);
        let int_result = parseInt(result);
        let currentyaw = Player.getYaw();
        let currentpitch = Player.getPitch();
        if (int_result === 0) {
            leftBind.setState(true);
            Thread.sleep(200);
            leftBind.setState(false);
            Thread.sleep(200);
            rightBind.setState(true);
            Thread.sleep(200);
            rightBind.setState(false);
            Thread.sleep(200);
            smoothLook(currentyaw + 5, currentpitch, 250);
            Thread.sleep(500);
            smoothLook(currentyaw, currentpitch, 250);
        } else if (int_result === 1) {
            rightBind.setState(true);
            Thread.sleep(200);
            rightBind.setState(false);
            Thread.sleep(200);
            leftBind.setState(true);
            Thread.sleep(200);
            leftBind.setState(false);
            Thread.sleep(200);
            smoothLook(currentyaw - 5, currentpitch, 250);
            Thread.sleep(500);
            smoothLook(currentyaw, currentpitch, 250);
        } else if (int_result === 2) {
            backwardBind.setState(true);
            Thread.sleep(200);
            backwardBind.setState(false);
            Thread.sleep(200);
            forwardBind.setState(true);
            Thread.sleep(200);
            forwardBind.setState(false);
            Thread.sleep(200);
            smoothLook(currentyaw + 5, currentpitch, 250);
            Thread.sleep(500);
            smoothLook(currentyaw, currentpitch, 250);
        } else if (int_result === 3) {
            forwardBind.setState(true);
            Thread.sleep(200);
            forwardBind.setState(false);
            Thread.sleep(200);
            backwardBind.setState(true);
            Thread.sleep(200);
            backwardBind.setState(false);
            Thread.sleep(200);
            smoothLook(currentyaw - 5, currentpitch, 250);
            Thread.sleep(500);
            smoothLook(currentyaw, currentpitch, 250);
        }
    }).start();
}

//methods to do things

const forwardBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w);
const backwardBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y);
const leftBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x);
const rightBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z);

let canLook = true

let fromYaw
let fromPitch
let destYaw
let destPitch
let startTime
let time
let pingToHypixel = undefined;


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
    ChatLib.command(time);
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


function convertYawToInternal(destinationYaw) {
    let currentYaw = Player.getPlayer().field_70177_z //internal rotationYaw
    let mcYaw = ((currentYaw + 180) % 360) - 180 //converted to [-180/180] range

    //get smallest angle
    let deltaYaw = mcYaw - destinationYaw
    deltaYaw += (deltaYaw > 180) ? -360 : (deltaYaw < -180) ? 360 : 0

    return currentYaw - deltaYaw
}

function interpolate(f, t, start, dur) {
    let x = Date.now() - start
    let u = (f - t) / 2
    return u * Math.cos(((x * Math.PI) / dur)) - u + f
}

function getAngle(x, y, z) {
    let dx = x - Player.getX()
    let dy = y - Player.getY() - Player.getPlayer().func_70047_e()
    let dz = z - Player.getZ()

    let toYaw = toDegrees(Math.atan2(dz, dx)) - 90
    if (toYaw <= -180) {
        toYaw += 360
    }
    let h = Math.sqrt(dx * dx + dz * dz)
    let toPitch = -(toDegrees(Math.atan2(dy, h)))

    return {
        yaw: toYaw,
        pitch: toPitch
    }
}

function toDegrees(rad) {
    return rad * (180 / Math.PI)
}

function smoothLook(dYaw, dPitch, dTime) {
    if (!canLook) return
    time = dTime
    canLook = false
    shouldLook = true

    fromYaw = Player.getPlayer().field_70177_z
    fromPitch = Player.getPlayer().field_70125_A

    destYaw = dYaw
    destPitch = dPitch

    startTime = Date.now()
}

let shouldLook = false


register("renderWorld", () => {
    if (!shouldLook) return

    if (Date.now() <= (startTime + time)) {
        let newYaw = interpolate(fromYaw, convertYawToInternal(destYaw), startTime, time)
        let newPitch = interpolate(fromPitch, destPitch, startTime, time)

        Player.getPlayer().field_70177_z = newYaw //rotationYaw
        Player.getPlayer().field_70125_A = newPitch //rotationPitch
    } else {
        shouldLook = false
        canLook = true
    }
})