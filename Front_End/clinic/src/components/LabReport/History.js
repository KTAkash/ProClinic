import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./History.css";

const History = () => {
  const { patientId } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!patientId || patientId === "unknown") {
        setError("Invalid Patient ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8085/api/lab-reports/patient/${patientId}`);
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching history:", err.response || err.message);
        setError("Failed to fetch history. Please check your connection or try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [patientId]);

  return (
    <div className="history-container">
      <h2>History for Patient ID: {patientId}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && reports.length === 0 && <p>No history available for this patient.</p>}
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <p><strong>Test Name:</strong> {report.testName}</p>
            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
              View Report
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
