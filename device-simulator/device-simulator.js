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

function publishData() {
  const data = [
    "device1",
    "device2",
    "device3",
    "device4",
    "device5",
    "device6",
  ].map((deviceId) => ({
    deviceId,
    timestamp: Date.now(),
    value: Math.floor(Math.random() * 100),
  }));

  console.log("Publishing batch data:", data);
  publisher.publish("device-updates", JSON.stringify(data));
}

setInterval(publishData, 7000);
