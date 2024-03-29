let ip = "localhost"
// let ip = "67.210.179.142";
const ws = new WebSocket("ws://" + ip + ":8083");
let id;

function onNameSubmit(event) {
    id = document.getElementById("login-txt").value;
    // ip = document.getElementById("ip-txt").value;

    if (ws.readyState == WebSocket.OPEN) {
        $("#login-modal").modal('hide');

        console.log(JSON.stringify({
            id: "Server",
            msg: id + " has connected."
        }));

        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " has connected.",
            client_id: id,
            code: 0
        }));
    }

    return false;
}

function onNameChange(event) {
    let input = document.getElementById("settings-txt").value;
    if (input != "" && input != id) {

        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " changed their name to " + input + ".",
            old_id: id,
            client_id: input,
            code: 2
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
        msg: id + " has disconnected.",
        client_id: id,
        code: 1
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
            msg: message,
            code: 3
        }));
    }

    document.getElementById("send-txt").value = "";
}

ws.addEventListener("message", data => {
    message = JSON.parse(data.data);

    // Message
    if (message.code == 4) {
        let user_list = document.querySelector("#wb-users-list");
        user_list.innerHTML = "";
        console.log(user_list);
        console.log(message);
        for (let user of message.id_list) {
            console.log(user);
            user_list.innerHTML += `<div>${user}</div>`;
        }

    } else {
        let newMessage = document.createElement("div");
        newMessage.textContent = message.id + ": " + message.msg;
        newMessage.setAttribute("title", new Date().toTimeString().split(" ")[0]);
        $("#app-messages").append(newMessage);
        console.log(message.msg);
        window.scrollTo(0,document.body.scrollHeight);
        var objDiv = document.getElementById("app-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
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
