import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminLabReport.css";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get("http://localhost:8085/api/lab-reports");
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching reports:", err.response || err.message);
        setError("Failed to fetch reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchReports();
  }, []);
  
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8085/api/lab-reports/${id}`);
        setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
        console.error(error);
        alert("Failed to delete report.");
    }
};


  return (
    <div className="admin-dashboard">
            <h2 className="dashboard-heading">Admin Dashboard</h2>
            {loading && <p className="loading-message">Loading reports...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && reports.length === 0 && <p className="no-reports-message">No reports found.</p>}
            <table className="reports-table">
                <thead className="table-head">
                    <tr>
                        <th className="table-heading">Patient Name</th>
                        <th className="table-heading">Test Name</th>
                        <th className="table-heading">File</th>
                        <th className="table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {reports.map((report) => (
                        <tr key={report.id} className="report-row">
                            <td className="report-cell">{report.patientName}</td>
                            <td className="report-cell">{report.testName}</td>
                            <td className="report-cell">
                                <a
                                    href={report.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="file-link"
                                >
                                    View
                                </a>
                            </td>
                            <td className="report-cell">
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(report.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default AdminDashboard;
