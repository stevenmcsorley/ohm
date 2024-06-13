import { useEffect, useState } from "react";
import "./DeviceRiver.css";

interface DeviceData {
  [key: string]: {
    deviceId: string;
    timestamp: number;
    value: number;
  };
}

function DeviceRiver() {
  const [deviceData, setDeviceData] = useState<DeviceData>({});
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectWebSocket = () => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host =
      window.location.hostname === "localhost"
        ? "backend.localhost"
        : "backend.stevenmcsorley.co.uk";
    const socket = new WebSocket(`${protocol}://${host}/ws`);

    socket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      try {
        const message = JSON.parse(event.data);
        const newMessage = JSON.parse(message.data);
        console.log("Parsed message: ", newMessage);

        setDeviceData((prevData) => ({
          ...prevData,
          [newMessage.deviceId]: newMessage, // Update or add new device data
        }));
      } catch (error) {
        console.error("Failed to parse JSON", error);
        console.error("Received message:", event.data);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected from WS Server", event);
      // Attempt to reconnect after a delay if not closed cleanly
      if (!event.wasClean) {
        setTimeout(connectWebSocket, 5000);
      }
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    });

    setWs(socket);
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="DeviceRiver">
      <header className="DeviceRiver-header">
        <h1>Device Data Stream</h1>
        <div className="grid-container">
          {Object.entries(deviceData).map(([deviceId, data]) => (
            <div className="device-card" key={deviceId}>
              <h2>{deviceId}</h2>
              <p
                className="device-info"
                style={{ backgroundColor: `rgb(1, 2, ${data.value})` }}
              >
                Timestamp: {new Date(data.timestamp).toLocaleString()}
                <br />
                Value: {data.value}
              </p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default DeviceRiver;
