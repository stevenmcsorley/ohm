import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { Kafka } from "kafkajs";
import { Registry, collectDefaultMetrics, Counter } from "prom-client";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true, path: "/ws" });

// Kafka client setup
const kafka = new Kafka({
  clientId: "backend",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "websocket-group" });

// Prometheus metrics setup
const register = new Registry();
register.setDefaultLabels({
  app: "backend-server",
});
collectDefaultMetrics({ register });

const httpRequestCounter = new Counter({
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
    await consumer.subscribe({
      topic: "satellite-positions",
      fromBeginning: true,
    });
    console.log("Kafka consumer subscribed to topic: satellite-positions.");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data = message.value.toString();
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      },
    });
  } catch (error) {
    console.error("Error in Kafka consumer:", error);
    setTimeout(run, 5000); // Retry after 5 seconds
  }
};

run().catch(console.error);

server.listen(8081, () => {
  console.log("WebSocket server started on port 8081");
});

const shutdown = () => {
  console.log("Shutting down server...");
  consumer.disconnect();
  server.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
