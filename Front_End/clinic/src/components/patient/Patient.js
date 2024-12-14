import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './PatientDetails.css'; 

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [treatments, setTreatments] = useState([]);
    const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();
    const [newTreatment, setNewTreatment] = useState({
        doctorName: '',
        treatmentDate: '',
        nextTreatmentDate: '',
        description: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8085/ht/patients/${id}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the patient details!', error);
            });

        axios.get(`http://localhost:8085/ht/patients/${id}/treatments`)
            .then(response => {
                setTreatments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the treatments!', error);
            });
    }, [id]);

    const handleViewTreatment = (treatmentId) => {
        setSelectedTreatmentId(selectedTreatmentId === treatmentId ? null : treatmentId);
    };

    const handleAddTreatment = () => {
        setShowAddForm(true);
    };
    const handlevoice=()=>{
        navigate("/voicetotext")
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewTreatment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8085/ht/patients/${id}/treatments`, newTreatment)
            .then(response => {
                setTreatments([...treatments, response.data]);
                setShowAddForm(false);
                setNewTreatment({
                    doctorName: '',
                    treatmentDate: '',
                    nextTreatmentDate: '',
                    description: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the treatment!', error);
            });
    };

    const handleUpdateTreatment = (treatment) => {
        setNewTreatment({
            doctorName: treatment.doctorName,
            treatmentDate: treatment.treatmentDate.split('T')[0], // Ensure date format is correct
            nextTreatmentDate: treatment.nextTreatmentDate.split('T')[0], // Ensure date format is correct
            description: treatment.description
        });
        setSelectedTreatmentId(treatment.id);
        setShowUpdateForm(true);
    };

    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8085/ht/treatments/${selectedTreatmentId}`, newTreatment)
            .then(response => {
                setTreatments(treatments.map(treatment => 
                    treatment.id === selectedTreatmentId ? response.data : treatment
                ));
                setShowUpdateForm(false);
                setNewTreatment({
                    doctorName: '',
                    treatmentDate: '',
                    nextTreatmentDate: '',
                    description: ''
                });
                setSelectedTreatmentId(null);
            })
            .catch(error => {
                console.error('There was an error updating the treatment!', error);
            });
    };

    const handleDeleteTreatment = (treatmentId) => {
        axios.delete(`http://localhost:8085/ht/treatments/${treatmentId}`)
            .then(() => {
                setTreatments(treatments.filter(treatment => treatment.id !== treatmentId));
                if (selectedTreatmentId === treatmentId) {
                    setSelectedTreatmentId(null);
                }
            })
            .catch(error => {
                console.error('There was an error deleting the treatment!', error);
            });
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-details-container">
        <h2 className="patient-details-heading">Patient Details</h2>
        <p className="patient-details-item"><strong>Name:</strong> {patient.name}</p>
        <p className="patient-details-item"><strong>Email:</strong> {patient.email}</p>
        <p className="patient-details-item"><strong>NIC:</strong> {patient.nic}</p>
        <p className="patient-details-item">
          <strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}
        </p>
        <h3 className="treatments-heading">Treatments</h3>
        <button className="add-treatment-button" onClick={handleAddTreatment}>Add Treatment</button>
  
        {showAddForm && (
          <form className="add-treatment-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Doctor Name:</label>
              <input
                className="form-input"
                type="text"
                name="doctorName"
                value={newTreatment.doctorName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Treatment Date:</label>
              <input
                className="form-input"
                type="date"
                name="treatmentDate"
                value={newTreatment.treatmentDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Next Treatment Date:</label>
              <input
                className="form-input"
                type="date"
                name="nextTreatmentDate"
                value={newTreatment.nextTreatmentDate}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                className="form-textarea"
                name="description"
                value={newTreatment.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <button className="submit-button" type="submit">Submit</button>
            <button className="cancel-button" type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        )}
  
        {showUpdateForm && (
          <form className="update-treatment-form" onSubmit={handleUpdateFormSubmit}>
            <div className="form-group">
              <label className="form-label">Doctor Name:</label>
              <input
                className="form-input"
                type="text"
                name="doctorName"
                value={newTreatment.doctorName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Treatment Date:</label>
              <input
                className="form-input"
                type="date"
                name="treatmentDate"
                value={newTreatment.treatmentDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Next Treatment Date:</label>
              <input
                className="form-input"
                type="date"
                name="nextTreatmentDate"
                value={newTreatment.nextTreatmentDate}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                className="form-textarea"
                name="description"
                value={newTreatment.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <button className="submit-button" type="submit">Update</button>
            <button className="cancel-button" type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
          </form>
        )}
  
        <ul className="treatments-list">
          {treatments.map((treatment) => (
            <li className="treatment-item" key={treatment.id}>
              <button className="view-treatment-button" onClick={() => handleViewTreatment(treatment.id)}>
                {new Date(treatment.treatmentDate).toLocaleDateString()}
              </button>
              {selectedTreatmentId === treatment.id && (
                <div className="treatment-details">
                  <h4 className="treatment-details-heading">Treatment Details</h4>
                  <p className="treatment-detail"><strong>Doctor:</strong> {treatment.doctorName}</p>
                  <p className="treatment-detail"><strong>Date:</strong> {new Date(treatment.treatmentDate).toLocaleDateString()}</p>
                  <p className="treatment-detail"><strong>Next Treatment Date:</strong> {new Date(treatment.nextTreatmentDate).toLocaleDateString()}</p>
                  <p className="treatment-detail"><strong>Description:</strong> {treatment.description}</p>
                </div>
              )}
              <button className="update-treatment-button" onClick={() => handleUpdateTreatment(treatment)}>Update</button>
              <button className="delete-treatment-button" onClick={() => handleDeleteTreatment(treatment.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="voice-button" onClick={handlevoice}>Voice</button>
      </div>
    );
};

export default PatientDetails;
