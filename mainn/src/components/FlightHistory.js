import React, { useEffect, useState } from "react";

function FlightHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("https://84c3-34-143-218-96.ngrok-free.app/get_flight_history") // Update with your latest ngrok URL
      .then((response) => response.json())
      .then((data) => {
        if (data.history) {
          setHistory(data.history);
        }
      })
      .catch((error) => console.error("Error fetching flight history:", error));
  }, []);

  return (
    <div className="text-center">
      <h2>🛫 Flight History</h2>
      <p>View past flight records and analysis.</p>

      {history.length > 0 ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>Upload Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.fileName}</td>
                <td>{new Date(entry.uploadTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No flight history available.</p>
      )}
    </div>
  );
}

export default FlightHistory;

