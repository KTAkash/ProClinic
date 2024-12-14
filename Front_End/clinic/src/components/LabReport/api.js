import axios from "axios";

const API_BASE_URL = "http://localhost:8085/api/lab-reports";

export const uploadLabReport = async (formData) => {
    return await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getAllLabReports = async () => {
    return await axios.get(API_BASE_URL);
};

export const getLabReportsByPatientId = async (patientId) => {
    return await axios.get(`${API_BASE_URL}/patient/${patientId}`);
};

export const deleteLabReport = async (id) => {
    return await axios.delete(`${API_BASE_URL}/${id}`);
};
