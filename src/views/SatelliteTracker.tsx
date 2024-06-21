import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./SatelliteTracker.css";

// Import the satellite icon image
import satelliteIconUrl from "/public/satellite-icon.png"; // Adjust the path as needed

// Fix the icon issue with Leaflet in React
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let SatelliteIcon = L.icon({
  iconUrl: satelliteIconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 25], // Adjust the size as needed
  shadowSize: [41, 41],
});

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
  const [updatedKey, setUpdatedKey] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const socket = new WebSocket(`wss://websocket.stevenmcsorley.co.uk/ws`);

    socket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);

        // Check if the message has the expected structure
        if (message.info && message.positions) {
          setSatelliteData((prevData) => {
            const newData = { ...prevData };
            newData[message.info.satid] = message;
            return newData;
          });
          setUpdatedKey(message.info.satid.toString());
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

  useEffect(() => {
    if (updatedKey) {
      // console.log(`Updated key: ${updatedKey}`);
      const timeout = setTimeout(() => setUpdatedKey(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [updatedKey]);

  return (
    <div className="container">
      <h1 className="title">Live Satellite Tracker</h1>
      {Object.keys(satelliteData).length > 0 ? (
        <div className="content">
          <MapContainer center={[0, 0]} zoom={2} className="map-container">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {Object.keys(satelliteData).map((key) => {
              const data = satelliteData[key];
              const lastPosition = data.positions[data.positions.length - 1];

              return (
                <Marker
                  key={key}
                  position={[
                    lastPosition.satlatitude,
                    lastPosition.satlongitude,
                  ]}
                  icon={SatelliteIcon}
                >
                  <Popup>
                    <div>
                      <h2>{data.info.satname}</h2>
                      <p>
                        <strong>Latitude:</strong> {lastPosition.satlatitude}
                      </p>
                      <p>
                        <strong>Longitude:</strong> {lastPosition.satlongitude}
                      </p>
                      <p>
                        <strong>Altitude:</strong> {lastPosition.sataltitude} km
                      </p>
                      <p>
                        <strong>Timestamp:</strong>{" "}
                        {new Date(
                          lastPosition.timestamp * 1000
                        ).toLocaleString()}
                      </p>
                      <p>
                        <strong>Eclipsed:</strong>{" "}
                        {lastPosition.eclipsed ? "Yes" : "No"}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <div className="list-container">
            {Object.keys(satelliteData).map((key) => {
              const data = satelliteData[key];
              const lastPosition = data.positions[data.positions.length - 1];

              return (
                <div
                  className={`card ${updatedKey === key ? "updated" : ""}`}
                  key={key}
                >
                  <h2>{data.info.satname}</h2>
                  <div className="info">
                    <p>
                      <strong>Lat:</strong> {lastPosition.satlatitude}
                    </p>
                    <p>
                      <strong>Long:</strong> {lastPosition.satlongitude}
                    </p>
                    <p>
                      <strong>Alt:</strong> {lastPosition.sataltitude} km
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="no-data">No data available.</p>
      )}
    </div>
  );
};

export default SatelliteTracker;
