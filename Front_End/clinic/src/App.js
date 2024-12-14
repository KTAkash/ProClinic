import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './components/userRole/AdminDashboard';
import Home from './components/Home';
import Login from './components/authenticate/Login';
import Navbar from './components/Bar/Navbar';
import PatientDetails from './components/patient/Patient';
import PatientPortal from './components/patient/PatientPortal';
import Signup from './components/authenticate/Signup';
import PharmacistDashboard from './components/userRole/PharmacistDashboard';
import ReceptionDashboard from './components/userRole/Receptionist';
import InventoryList from './components/pharmacy/InventoryList';
import InventoryForm from './components/pharmacy/InventoryForm';
import StockCheck from './components/pharmacy/StockCheck';
import DispenceMedicine from './components/pharmacy/DispenceMedicine';
import BillManagement from './components/invoice/BillManagement';
import NewInvoice from './components/invoice/NewInvoice';
import TotalInvoices from './components/invoice/TotalInvoice';
import InvoiceBill from './components/invoice/InvoiceBill';
import UpdateInvoice from './components/invoice/UpdateBill';
import CreateAppointment from './components/appoinment/CreateAppointment'
import AllAppointmnets from './components/appoinment/AllAppoinments';
import UpdateAppointment from './components/appoinment/UpdateAppointment';
import SentAppointments from './components/appoinment/SentAppoinments';
import LabReportForm from './components/LabReport/LabReportForm';
import History from './components/LabReport/History';
import AdminLabReport from './components/LabReport/AdminLabReport';
import FeedbackForm from './components/FeedBack/feedbackform';
import FeedbackRecords from './components/FeedBack/FeedbackRecords';
import OfferCard from './components/Offer/OfferCard';  
import OfferForm from './components/Offer/OfferForm';
import OfferList from './components/Offer/OfferList'; 
import Newtherapy from './components/Therapy/Newtherapy';
import TherapyPage from './components/Therapy/TherapyPage';
import VoiceToText from './components/VoiceToText/VoiceToText';
import './App.css';
import UserDashboard from './components/userRole/UserDashboard';
import Patient from './components/patient/Patient';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8085/ht/Pharmacist/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error.response?.data || error.message);
        }
    };

    const refreshInventory = async () => {
        await fetchInventory();
    };

    const addItem = async (item) => {
        try {
            await axios.post('http://localhost:8085/ht/Pharmacist/inventory', item);
            fetchInventory();
        } catch (error) {
            console.error("Error adding item:", error.response?.data || error.message);
        }
    };

    const updateItem = async (id, item) => {
        try {
            await axios.put(`http://localhost:8085/ht/Pharmacist/inventory/${id}`, item);
            fetchInventory();
            setCurrentItem(null);
        } catch (error) {
            console.error("Error updating item:", error.response?.data || error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/ht/Pharmacist/inventory/${id}`);
            fetchInventory();
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
        }
    };

    const handleDispense = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8085/ht/Pharmacist/inventory/${itemId}/dispence`,
                null,
                {
                    params: { quantity },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert('Item dispensed successfully!');
                refreshInventory();
            } else {
                alert('Failed to dispense item. Please try again.');
            }
        } catch (error) {
            console.error("Error dispensing item:", error.response?.data || error.message);
            alert(error.response?.data?.message || 'Error dispensing item.');
        }
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div className="content">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/patients/:id" element={<PatientDetails />} />
                    <Route path="/patient-portal" element={<PatientPortal />} />
                    <Route path="/pharmacy" element={<PharmacistDashboard />} />
                    <Route path="/recep" element={<ReceptionDashboard />} />
                    <Route path="/inventory" element={<InventoryForm addItem={addItem} updateItem={updateItem} currentItem={currentItem} />} />
                    <Route path="/inventory/list" element={<InventoryList inventory={inventory} onEdit={setCurrentItem} onDelete={deleteItem} refreshInventory={refreshInventory} />} />
                    <Route path="/inventory/stock" element={<StockCheck inventory={inventory} />} />
                    <Route path="/inventory/dispence" element={<DispenceMedicine inventory={inventory} handleDispense={handleDispense} refreshInventory={refreshInventory} />} />
                    <Route path="/bill-management" element={<BillManagement refreshInventory={refreshInventory} />} />
                    <Route path="/new-invoice" element={<NewInvoice inventory={inventory}  refreshInventory={refreshInventory} />} />
                    <Route path="/total-invoices" element={<TotalInvoices />} />
                    <Route path="/invoice-bill" element={<InvoiceBill />} />
                    <Route path="/update-bill" element={<UpdateInvoice />} />
                    <Route path="/recep" element={<ReceptionDashboard />} />
                    <Route path="/Create" element={<CreateAppointment/>}/>
                    <Route path="/AllAppointments" element={<AllAppointmnets/>}/>
                    <Route path="/Update/:id" element={<UpdateAppointment/>}/>
                    <Route path="/send" element={<SentAppointments/>}/>
                    <Route path="/lab-report-form" element={<LabReportForm />} />
                    <Route path="/history/:patientId" element={<History />} />
                    <Route path="/adminlabreport" element={<AdminLabReport />} />
                    <Route path="/feed" element={<FeedbackForm />}/>
                    <Route path="/records" element={<FeedbackRecords/>}/>
                    <Route path="/offer-card" element={<OfferCard />} />  {/* Render OfferCard on the root route */}
                    <Route path="/offer-form" element={<OfferForm />} />
                    <Route path="/offer-list" element={<OfferList />} />
                    <Route path="/Newtherapy" element={<Newtherapy/>} />
                    <Route path="/therapypage" element={<TherapyPage />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route path="/voicetotext" element={<VoiceToText />} />
                    <Route path="/patient" element={<Patient />} />

                    
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
