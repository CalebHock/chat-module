// for production, use 'wss' instead of 'ws'
const ws = new WebSocket("ws://localhost:8082");

// Set display name
let name;
function onNameSubmit(event) {
    setName();
    return false;
}
function setName() {
    name = document.getElementById("login-txt").value;
    if (name != "") {
        $("#login-modal").modal('hide');
    }
}

// Send message
function onFormSubmit(event) {
    sendMessage();
    return false;
}
function sendMessage() {
    let message = document.getElementById("send-txt").value;
    ws.send(JSON.stringify({
        id: name,
        msg: message
    }));

    document.getElementById("send-txt").value = "";
}

// Receive messge
ws.addEventListener("message", data => {
    message = JSON.parse(data.data);
    var newMessage = document.createElement("div");
    newMessage.textContent = message.id + ": " + message.msg;
    newMessage.setAttribute("title", new Date().toISOString());
    $("#app-messages").append(newMessage);
    console.log(message.msg);
});
