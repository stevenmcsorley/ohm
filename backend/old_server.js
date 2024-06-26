const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { createClient } = require("redis");
const client = require("prom-client");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true, path: "/ws" });
const subscriber = createClient({
  url: "redis://redis-server:6379",
});

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: "backend-server",
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create a custom counter metric
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path"],
});

// Register the custom metric
register.registerMetric(httpRequestCounter);

// Middleware to count all HTTP requests
app.use((req, res, next) => {
  httpRequestCounter.inc({ method: req.method, path: req.path });
  next();
});

// Expose metrics at the /metrics endpoint
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

  ws.on("message", (message) => {
    console.log("Received: %s", message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

wss.on("error", (error) => {
  console.error("WebSocket error:", error);
});

subscriber.on("error", (err) => {
  console.error("Redis client error:", err);
});

subscriber
  .connect()
  .then(() => {
    console.log("Connected to Redis successfully.");

    subscriber.subscribe("device-updates", (message) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
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
