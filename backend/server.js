const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { Kafka } = require("kafkajs");
const client = require("prom-client");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true, path: "/ws" });

// Kafka client setup
const kafka = new Kafka({
  clientId: "backend",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "websocket-group" });

// Prometheus metrics setup
const register = new client.Registry();
register.setDefaultLabels({
  app: "backend-server",
});
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path"],
});
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  httpRequestCounter.inc({ method: req.method, path: req.path });
  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket.");
  ws.send(
    JSON.stringify([{ deviceId: "test", timestamp: Date.now(), value: 123 }])
  );
  ws.on("close", () => console.log("Client disconnected"));
});

const run = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected.");
    await consumer.subscribe({ topic: "device-updates", fromBeginning: true });
    console.log("Kafka consumer subscribed to topic: device-updates.");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data = message.value.toString();
        // console.log(`Received message: ${data}`);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            // console.log(`Sending data to WebSocket client: ${data}`);
            client.send(data);
          }
        });
      },
    });
  } catch (error) {
    console.error("Error in Kafka consumer:", error);
  }
};

run().catch(console.error);

server.listen(8080, () => {
  console.log("WebSocket server started on port 8080");
});

const shutdown = () => {
  console.log("Shutting down server...");
  consumer.disconnect();
  server.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
