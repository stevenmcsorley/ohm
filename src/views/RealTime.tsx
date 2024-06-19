import React, { useEffect, useState, useRef } from "react";

interface DeviceData {
  deviceId: string;
  timestamp: number;
  value: number;
}

interface DeviceDataMap {
  [key: string]: DeviceData;
}

const RealTimeDataDisplay: React.FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceDataMap>({});
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const socket = new WebSocket(`wss://backend.stevenmcsorley.co.uk/ws`);

    socket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    socket.addEventListener("message", (event) => {
      // console.log("Message from server ", event.data);
      try {
        const messages: DeviceData[] = JSON.parse(event.data);

        setDeviceData((prevData) => {
          const newData = { ...prevData };

          // Check if messages is an array, if not wrap it in an array
          const messagesArray = Array.isArray(messages) ? messages : [messages];

          messagesArray.forEach((msg) => {
            // console.log(`Processing device: ${msg.deviceId}`, msg);
            newData[msg.deviceId] = msg;
          });

          return newData;
        });
      } catch (error) {
        console.error("Failed to parse JSON", error);
        // console.error("Received message:", event.data);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected from WS Server", event);
      if (!event.wasClean) {
        setTimeout(connectWebSocket, 5000);
      }
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    });

    ws.current = socket;
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Data Feed</h1>
      {Object.keys(deviceData).length > 0 ? (
        <ul>
          {Object.keys(deviceData).map((data, index) => (
            <li key={index}>
              Device ID: {deviceData[data].deviceId} - Value:{" "}
              {deviceData[data].value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default RealTimeDataDisplay;
