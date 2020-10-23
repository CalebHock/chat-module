// for production, use 'wss' instead of 'ws'
const ws = new WebSocket("ws://localhost:8082");

ws.addEventListener("open", () => {
    console.log("We are connected!");

    ws.send("Hey, how's it going?");
})

function sendHi() {
    ws.send("Hi");
}

ws.addEventListener("message", ({ data }) => {
    console.log(data);
});
