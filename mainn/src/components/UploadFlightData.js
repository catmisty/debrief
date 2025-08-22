import React, { useState } from "react";

const UploadFlightData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [anomalies, setAnomalies] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://84c3-34-143-218-96.ngrok-free.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Upload successful!");

        // ✅ Fix: Ensure anomalies are properly displayed
        if (data.anomalies && data.anomalies.length > 0) {
          setAnomalies(data.anomalies);
        } else {
          setAnomalies([]);
          setMessage("✅ File uploaded, but no anomalies detected.");
        }
      } else {
        setMessage(`❌ Upload failed: ${data.message || "Unknown error"}`);
        console.error("Error:", data);
      }
    } catch (error) {
      setMessage("❌ Upload error! Check console.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h3>Upload Flight Data</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      {/* ✅ Fix: Show Anomalies Properly */}
      {anomalies.length > 0 && (
        <div>
          <h3>⚠️ Detected Anomalies</h3>
          <ul>
            {anomalies.map((idx) => (
              <li key={idx}>Anomaly detected at row {idx}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadFlightData;

