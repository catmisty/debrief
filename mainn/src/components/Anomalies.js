import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function Anomalies() {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch("https://84c3-34-143-218-96.ngrok-free.app/get_anomalies")  // Update with your latest ngrok URL
      .then((response) => response.json())
      .then((data) => {
        if (data.anomalies) {
          setAnomalies(data.anomalies.map((index, i) => ({ id: i + 1, row: index })));
        }
      })
      .catch((error) => console.error("Error fetching anomalies:", error));
  }, []);

  return (
    <div className="text-center">
      <h2>⚠️ Flight Anomalies</h2>
      <p>Review detected anomalies in flight data.</p>

      {anomalies.length > 0 ? (
        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={anomalies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" label={{ value: "Anomaly ID", position: "insideBottom", dy: 10 }} />
            <YAxis label={{ value: "Row Index", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="row" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No anomalies detected.</p>
      )}
    </div>
  );
}

export default Anomalies;

