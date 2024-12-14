import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home">
            <header className="header1">
                <h1>Pro Clinic</h1>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#services">Services</a></li>
                        <li><a href="/login">Appointments</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </nav>
            </header>
            
            <div className="advertisements">
                <div className="ad">
                    <img src="https://th.bing.com/th/id/R.fbffef76aad61da453f723fe4d7641ed?rik=%2bTfSzqOUwxpDxg&pid=ImgRaw&r=0" alt="Health Checkup" />
                    <p>HEALTH IS WEALTH</p>
                </div>
                <div className="ad">
                    <img src="https://th.bing.com/th/id/OIP.xko0DsCJAC_P733OZilN_QHaEJ?w=1200&h=673&rs=1&pid=ImgDetMain" alt="Vaccination" />
                    <p>YOU ARE IN GOOD HANDS</p>
                </div>
                <div className="ad">
                    <img src="https://treatingscoliosis.com/wp-content/uploads/2023/12/Genetic-Factors-leading-to-Rotoscoliosis-01.jpg" alt="Specialist Consultations" />
                    <p>WE WILL BE THERE FOR YOU</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
