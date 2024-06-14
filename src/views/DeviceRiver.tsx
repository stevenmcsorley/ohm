import React, { useEffect, useState, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./DeviceRiver.css";

Chart.register(ArcElement, Tooltip, Legend);

// Custom plugin to draw needle
const drawNeedle = (chart) => {
  const {
    ctx,
    chartArea: { width, height },
  } = chart;
  const angle = (Math.PI * chart.data.datasets[0].data[0]) / 100 + Math.PI;
  const r = Math.min(width, height) / 2;
  const x = width / 2;
  const y = height / 2 + 48; // Adjust this value to move the needle down

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.lineTo(r - 10, 0);
  ctx.lineTo(0, 5);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();
};

const needlePlugin = {
  id: "needle",
  afterDatasetDraw: (chart) => {
    drawNeedle(chart);
  },
};

Chart.register(needlePlugin);

interface DeviceData {
  deviceId: string;
  timestamp: number;
  value: number;
}

interface DeviceDataMap {
  [key: string]: DeviceData;
}

function DeviceRiver() {
  const [deviceData, setDeviceData] = useState<DeviceDataMap>({});
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const socket = new WebSocket(`wss://backend.stevenmcsorley.co.uk/ws`);

    socket.addEventListener("open", () => {
      console.log("Connected to WS Server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      try {
        const messages: DeviceData[] = JSON.parse(event.data);

        setDeviceData((prevData) => {
          const newData = { ...prevData };
          messages.forEach((msg) => {
            console.log(`Processing device: ${msg.deviceId}`, msg);
            newData[msg.deviceId] = msg;
          });
          console.log("Updated Device Data: ", newData); // Log to check all devices
          return newData;
        });
      } catch (error) {
        console.error("Failed to parse JSON", error);
        console.error("Received message:", event.data);
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

  const createChartData = (value: number) => {
    return {
      labels: ["Current Value", ""],
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: ["darkred", "lightblue"],
          borderWidth: 0,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      needle: {
        radiusPercentage: 2,
        widthPercentage: 2,
        lengthPercentage: 80,
        color: "black",
      },
    },
  };

  return (
    <div className="DeviceRiver">
      <header className="DeviceRiver-header">
        <h1>Device Data Stream</h1>
        <div className="grid-container">
          {Object.entries(deviceData).map(([deviceId, data]) => {
            return (
              <div className="device-card" key={deviceId}>
                <div className="device-info">
                  <Doughnut
                    className="doughnut-chart"
                    data={createChartData(data.value)}
                    options={options}
                  />
                  <div>
                    <span className="guage_value">{data.value} kWh</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default DeviceRiver;
