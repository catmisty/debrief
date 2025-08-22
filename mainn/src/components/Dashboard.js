import React from "react";
import UploadFlightData from "./UploadFlightData";

function Dashboard() {
  return (
    <div className="text-center">
      {/* Background Image */}
      <div 
        style={{
          backgroundImage: "url('/images/dashboard/bgimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "bold"
        }}
      >
        Welcome to HAL Intelligent Debrief System
      </div>
      <h2> Dashboard</h2>
      <p>Upload flight data and analyze anomalies in real-time.</p>

      {/* Upload Component */}
      <UploadFlightData />
      <img src="https://source.unsplash.com/800x400/?airplane" alt="Flight Data" className="img-fluid rounded mt-3" />
    </div>
  );
}

export default Dashboard;
