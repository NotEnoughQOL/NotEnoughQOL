import { config } from "../index";


register("worldLoad", function() {
  if(String(FileLib.read("./config/ChatTriggers/modules/NotEnoughRacism/firstTime.txt")) === "true") {
    let File = Java.type("java.io.File");
    let dungeons = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "Dungeons").mkdirs();
    let slayers = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "Slayers").mkdirs();
    let general = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "General").mkdirs();
    let esp = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "ESP").mkdirs();
    let mapscanner = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "MapScanner").mkdirs();
    let macros = new File("./config/ChatTriggers/modules/NotEnoughRacismConfig", "Macros").mkdirs();


    FileLib.write("./config/ChatTriggers/modules/NotEnoughRacism/firstTime.txt", "false");
  }
})
