import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../baseUrl';
import './index.css';
import TopHeader from '../TopHeader/TopHeader';
import { Link, NavLink } from 'react-router-dom';
import { message } from 'antd';
import { FaBars } from 'react-icons/fa';
import { useDriverTour } from '../../../hooks/useDriverTour';

const Header = ({ appointmentSelected }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { resetTour } = useDriverTour();

    const clientId = localStorage.getItem('clientId');
    const pathname = location.pathname;

    const getTourIdForPath = (path) => {
        if (path === '/appointment') return 'appointment';
        if (path.includes('/dashboard/prescription/')) return 'prescription';
        if (path.includes('/dashboard/profile-setting/')) return 'profile-settings';
        if (path.includes('/dashboard/attachments/')) return 'attachments';
        if (path.includes('/dashboard/change-password/')) return 'change-password';
        if (path.startsWith('/dashboard/')) return 'appointment';
        return null;
    };

    const currentTourId = getTourIdForPath(pathname);

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        setIsLoggedIn(!!authToken);

        if (authToken && clientId && clientId !== "undefined") {
            axios.get(`${BASE_URL}/api/userauth/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }).catch(error => {
                // Will be handled globally by the axios interceptor
            });
        }
    }, [clientId]);

    const handleMakeAppointment = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        // console.log("ClientId from storage:", clientId);

        // ✅ Safety check
        if (!clientId || clientId === "undefined") {
            message.error("Profile not completed. Please update your profile first.");
            navigate('/dashboard/profile-setting');
            return;
        }

        navigate(`/dashboard/${clientId}`);
    };

    return (
        <>
            <div className="navbar navbar-expand-lg navbar-light">
                <TopHeader />
            </div>

            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">

                    <Link to="/" className="logo me-auto">
                        <img src="/logo.jpg" alt="logo" className="img-fluid" style={{ maxHeight: '42px', borderRadius: '6px' }} loading="lazy" />
                    </Link>

                    <nav className="navbar order-last order-lg-0">
                        <ul className="d-none d-lg-flex">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                        </ul>
                    </nav>

                    {!appointmentSelected && (
                        <button
                            className="appointment-btn d-none d-lg-block"
                            onClick={handleMakeAppointment}
                        >
                            Make an Appointment
                        </button>
                    )}

                    {currentTourId && (
                        <button
                            className="tour-btn d-none d-lg-block"
                            onClick={() => resetTour(currentTourId)}
                            style={{
                                background: '#e6f7ff',
                                color: '#1890ff',
                                border: '1px solid #91d5ff',
                                borderRadius: '50px',
                                padding: '6px 20px',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginLeft: '12px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#bae7ff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#e6f7ff';
                            }}
                        >
                            Help Tour
                        </button>
                    )}

                    {/* Mobile menu */}
                    <div className="dropdown d-lg-none ms-auto ml-auto">
                        <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', padding: '5px' }}>
                            <FaBars />
                        </div>

                        <div 
                            className={`dropdown-menu dropdown-menu-end ${menuOpen ? 'show' : ''}`}
                            style={{ right: 0, left: 'auto', position: 'absolute' }}
                        >
                            <NavLink to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/contact" className="dropdown-item" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                            {currentTourId && (
                                <span 
                                    className="dropdown-item"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        resetTour(currentTourId);
                                    }}
                                    style={{ 
                                        cursor: 'pointer', 
                                        color: '#1890ff', 
                                        fontWeight: '500' 
                                    }}
                                >
                                    Help Tour
                                </span>
                            )}
                            {!isLoggedIn && <Link to="/login" className="dropdown-item" onClick={() => setMenuOpen(false)}>Login</Link>}
                        </div>
                    </div>

                </div>
            </header>
        </>
    );
};

export default Header;