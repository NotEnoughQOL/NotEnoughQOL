import { Settings } from "../index";
const guiCommand = {
    name: "neq",
    aliases: ["notenoughqol", "neqol"],
    run: function() {
        ChatLib.command("opennerconfig", true);
    }
};
export default guiCommand;