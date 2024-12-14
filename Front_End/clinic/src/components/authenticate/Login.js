import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8085/ht/login', formData);
            const { userRole, token, userId } = response.data; // Ensure userId is included in the response
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId); // Store userId in local storage
            setIsAuthenticated(true);
            toast.success('Login successful!');
            if (userRole === 'ROLE_Admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'ROLE_Pharmacist') {
                navigate('/pharmacy');
            } else if (userRole === 'ROLE_Receptionist') {
                navigate('/recep');
            } else {
                navigate('/patient-portal');
            }
        } catch (error) {
            toast.error('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        className="login-input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <ToastContainer className="toast-container" />
            </div>
        </div>
    );
}    
export default Login;
