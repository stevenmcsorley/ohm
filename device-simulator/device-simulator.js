const redis = require("redis");
const publisher = redis.createClient({ url: "redis://redis-server:6379" });

publisher
  .connect()
  .then(() => {
    console.log("Connected to Redis!");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

function publishData(deviceId) {
  const data = {
    deviceId,
    timestamp: Date.now(),
    value: Math.floor(Math.random() * 100),
  };

  console.log(`Publishing data for ${deviceId}:`, data);
  publisher.publish(deviceId, JSON.stringify(data));
}

setInterval(() => {
  publishData("device1");
  publishData("device2");
  publishData("device3");
}, 5000); // Send data every second
