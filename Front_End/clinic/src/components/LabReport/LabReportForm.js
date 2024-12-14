import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadLabReport } from "./api";
import "./LabReportForm.css";

const LabReportForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    testName: "",
    file: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("patientName", formData.patientName);
    data.append("patientId", formData.patientId);
    data.append("testName", formData.testName);
    data.append("file", formData.file);

    try {
      await uploadLabReport(data);
      alert("Lab report uploaded successfully!");
      navigate(`/History/${formData.patientId}`);
    } catch (err) {
      console.error("Error uploading lab report:", err);
      setError("Failed to upload the lab report. Please try again.");
    }
  };

  // History button logic
  const handleHistoryClick = () => {
    if (formData.patientId) {
      navigate(`/History/${formData.patientId}`);
    } else {
      navigate("/History/unknown");
    }
  };

  return (
    <div className="lab-report-form-container">
      <h2>Upload Lab Report</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="lab-report-form">
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Patient ID:
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Test Name:
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Lab Report File:
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button type="submit">Upload Report</button>
      </form>
      <button className="history-button" onClick={handleHistoryClick}>
        View Patient History
      </button>
    </div>
  );
};

export default LabReportForm;
