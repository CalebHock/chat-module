// for production, use 'wss' instead of 'ws'
// let ip = "67.210.179.142:8082"
let ip = "localhost:8082"
const ws = new WebSocket("ws://" + ip);

let id;
// let ip = null;
// var ws = null;

function onNameSubmit(event) {
    id = document.getElementById("login-txt").value;
    // ip = document.getElementById("ip-txt").value;
    
    if (ws.readyState == WebSocket.OPEN) {
        $("#login-modal").modal('hide');
        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " has connected."
        }));
    }

    return false;
}

function onNameChange(event) {
    let input = document.getElementById("settings-txt").value;
    if (input != "" && input != id) {

        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " changed their name to " + input + "."
        }));

        id = input;
        let nameChange = document.getElementById("alert-name-change");
        if (nameChange != undefined) {
            nameChange.parentNode.removeChild(nameChange);
        }
        nameChange = document.createElement("div");
        nameChange.id = "alert-name-change";
        nameChange.setAttribute('class', 'alert');
        nameChange.setAttribute('class', 'alert-primary');
        nameChange.textContent = "Name changed to " + id;
        
        $("#settings-modal-body").append(nameChange);
        document.getElementById("settings-txt").value = "";
    }
    return false;
}

function disconnect(event) {
    ws.send(JSON.stringify({
        id: "Server",
        msg: id + " has disconnected."
    }));
    ws.close();
}

// Send message
function onFormSubmit(event) {
    sendMessage();
    return false;
}

function sendMessage() {
    let message = document.getElementById("send-txt").value;
    if (message != "") {
        ws.send(JSON.stringify({
            id: id,
            msg: message
        }));
    }

    document.getElementById("send-txt").value = "";
}

ws.addEventListener("message", data => {
    message = JSON.parse(data.data);
    let newMessage = document.createElement("div");
    newMessage.textContent = message.id + ": " + message.msg;
    newMessage.setAttribute("title", new Date().toISOString());
    $("#app-messages").append(newMessage);
    console.log(message.msg);
});

function openSettings() {
    $("#settings-modal").modal('show');
}

function resetSettings() {
    let nameChange = document.getElementById("alert-name-change");
    if (nameChange != undefined) {
        nameChange.parentNode.removeChild(nameChange);
    }
}
