const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

const server = express().listen(8083);
const wss = new SocketServer({ server });

// const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    // console.log('[Server] A client was connected.');

    ws.on("message", data => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    // ws.on('close', () => console.log('[Server] Client disconnected.'));
});