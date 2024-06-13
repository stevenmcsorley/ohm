const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { createClient } = require("redis");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const subscriber = createClient({
  url: "redis://redis-server:6379",
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket.");

  ws.on("message", (message) => {
    console.log("Received: %s", message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

subscriber.on("error", (err) => {
  console.error("Redis client error:", err);
});

subscriber
  .connect()
  .then(() => {
    console.log("Connected to Redis successfully.");

    const devices = ["device1", "device2", "device3"];
    devices.forEach((device) => {
      subscriber.subscribe(device, (message) => {
        console.log(`Message from ${device}: ${message}`);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                channel: device,
                data: message,
              })
            );
          }
        });
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});

const shutdown = () => {
  console.log("Shutting down server...");
  subscriber.quit();
  server.close(() => {
    console.log("Server shut down.");
  });
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
