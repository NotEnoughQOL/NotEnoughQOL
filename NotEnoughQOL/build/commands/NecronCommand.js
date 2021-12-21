import { Settings } from "../index";
const NecronCommand = {
    name: "necron",
    aliases: ["necronclient"],
    run: function () {
        Settings.openGUI();
    }
};
export default NecronCommand;
