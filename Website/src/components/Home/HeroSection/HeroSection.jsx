import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const HeroSection = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate();
    const clientId = localStorage.getItem('clientId');

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        setIsLoggedIn(!!authToken); // Convert authToken to a boolean
    }, []);

    const handleMakeAppointment = () => {
        if (!isLoggedIn) {
            Navigate('/login');
            return;
        }

        console.log("ClientId from storage in HeroSection:", clientId);

        // ✅ Safety check
        if (!clientId || clientId === "undefined") {
            message.error("Profile not completed. Please update your profile first.");
            Navigate('/dashboard/profile-setting');
            return;
        }

        Navigate(`/dashboard/${clientId}`);
    };

    return (
        <section id="hero">
            <div className="container">
                <div className="hero-card">
                    <span className="hero-sub">TOTAL HEALTH CARE SOLUTION</span>
                    <h1>Your Most Trusted <br /><span>Health Partner</span></h1>
                    <p className="hero-desc">Take care of your health by staying connected with us. Professional, personal, and continuous care for your entire family.</p>
                    <div className="d-flex flex-wrap gap-3 mt-4">
                        <button onClick={handleMakeAppointment} className="btn-hero-primary">Book Appointment</button>
                        <Link to={'/contact'} className="btn-hero-secondary">Contact Us</Link>
                    </div>
                </div>
                {/* Clean centered button for small screens */}
                <button className="appointment-btn d-lg-none mt-4 w-100" style={{ maxWidth: '320px', margin: '0 auto', display: 'block', borderRadius: '50px', padding: '12px 24px', fontWeight: '600' }}
                        onClick={handleMakeAppointment}>
                    Make an Appointment
                </button>
            </div>
        </section>
    )
}
export default HeroSection;