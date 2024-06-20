const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "data-simulator",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  setInterval(async () => {
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

    // console.log("Publishing batch data:", data);
    await producer.send({
      topic: "device-updates",
      messages: [{ value: JSON.stringify(data) }],
    });
  }, 1000); // Decreased interval to 100ms for higher frequency
};

run().catch(console.error);
