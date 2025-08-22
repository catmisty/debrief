import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
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
      const response = await axios.post(
        "https://84c3-34-143-218-96.ngrok-free.app/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setMessage("✅ Upload successful!");
        setAnomalies(response.data.anomalies || []);
      } else {
        setMessage(`❌ Upload failed: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      setMessage("❌ Upload error! Check console.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Flight Data</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

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

export default UploadForm;
