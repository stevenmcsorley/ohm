import React, { useEffect, useState, useRef } from "react";

interface SatelliteInfo {
  satname: string;
  satid: number;
  transactionscount: number;
}

interface SatellitePosition {
  satlatitude: number;
  satlongitude: number;
  sataltitude: number;
  timestamp: number;
  eclipsed: boolean;
}

interface SatelliteData {
  info: SatelliteInfo;
  positions: SatellitePosition[];
}

interface SatelliteDataMap {
  [key: string]: SatelliteData;
}

const SatelliteTracker: React.FC = () => {
  const [satelliteData, setSatelliteData] = useState<SatelliteDataMap>({});
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const socket = new WebSocket(`ws://websocket.localhost:8080/ws`);

    socket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data); // Add this line to debug
      try {
        const message = JSON.parse(event.data);

        // Check if the message has the expected structure
        if (message.info && message.positions) {
          setSatelliteData((prevData) => {
            const newData = { ...prevData };
            newData[message.info.satid] = message;
            return newData;
          });
        } else {
          console.warn("Received message with unexpected structure:", message);
        }
      } catch (error) {
        console.error("Failed to parse JSON", error);
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
      <h1>Live Satellite Tracker</h1>
      {Object.keys(satelliteData).length > 0 ? (
        <ul>
          {Object.keys(satelliteData).map((key) => {
            const data = satelliteData[key];
            const lastPosition = data.positions[data.positions.length - 1];

            return (
              <li key={key}>
                Satellite: {data.info.satname} <br />
                Latitude: {lastPosition.satlatitude} <br />
                Longitude: {lastPosition.satlongitude} <br />
                Altitude: {lastPosition.sataltitude} km <br />
                Timestamp:{" "}
                {new Date(lastPosition.timestamp * 1000).toLocaleString()}{" "}
                <br />
                Eclipsed: {lastPosition.eclipsed ? "Yes" : "No"}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default SatelliteTracker;
