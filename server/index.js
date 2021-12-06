const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

const server = express().listen(8083);
const wss = new SocketServer({ server });

// const wss = new WebSocket.Server({ port: 8083 });

let ids = []

wss.on("connection", ws => {
    // console.log('[Server] A client was connected.');

    ws.on("message", data => {

        message = JSON.parse(data);
        if (message.id == "Server") {
            // Connect
            if (message.code == 0) {
                console.log("Connecting");
                ids.push(message.client_id);
            }

            // Disconnect
            if (message.code == 1) {
                console.log("Disconnecting");
                let index = ids.indexOf(message.client_id);
                ids.splice(index, 1);
            }

            // Name Change
            if (message.code == 2) {
                console.log("Name changing");
                let index = ids.indexOf(message.old_id);
                ids[index] = message.client_id;
            }

            
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    console.log("Sending IDs")
                    client.send(JSON.stringify({
                        id_list: ids,
                        code: 4
                    }));
                }
            });
        }

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    // ws.on('close', () => console.log('[Server] Client disconnected.'));
});