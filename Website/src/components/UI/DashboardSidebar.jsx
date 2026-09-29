import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { FaTable, FaUserInjured, FaUserCog, FaLock, FaHouseUser, FaSignOutAlt, FaPaperclip } from "react-icons/fa";
import img from '../../images/avatar.jpg';
import './DashboardSidebar.css';
import BASE_URL from '../../baseUrl.jsx';

const DashboardSidebar = () => {
    const { data, role } = useAuthCheck();
    const [userData, setUserData] = useState({});
    const clientId = localStorage.getItem('clientId');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(`${BASE_URL}/api/userauth/${clientId}`, config)
            .then(response => {
                const imagePath = `${BASE_URL}/${response.data.image}`
                response.data.image = imagePath;
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

    }, [clientId]);

    const handleLogout = () => {
        localStorage.removeItem('clientId');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="profile-sidebar">
            <div className="profile-info text-center">
                <img src={userData ? userData.image || img : img} alt="Profile" className="profile-image" />
                <div className='profile-details'>
                    <h5 className='mb-0'>{userData ? userData.name : 'Loading...'}</h5>
                    <span style={{ 
                        backgroundColor: "#e6f7ff", 
                        color: "#1890ff", 
                        fontSize: "10px", 
                        padding: "2px 8px", 
                        borderRadius: "10px", 
                        fontWeight: "600", 
                        marginTop: "4px", 
                        display: "inline-block", 
                        textTransform: "capitalize" 
                    }}>
                        {role || 'user'}
                    </span>
                    <div className='mt-1'>
                        {userData?.address && <p className='form-text m-0'>{userData.address}</p>}
                        {userData?.email && <p className='form-text m-0'>{userData.email}</p>}
                    </div>
                </div>
            </div>
            
            <nav className="dashboard-menu">
                <ul>
                    <li>
                        <NavLink id="tour-sidebar-dashboard" to={`/dashboard/${clientId}`} end>
                            <FaTable className="icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="tour-sidebar-appointments" to={`/dashboard/prescription/${clientId}`}>
                            <FaHouseUser className="icon" />
                            <span>Appointments History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="tour-sidebar-profile" to={`/dashboard/profile-setting/${clientId}`}>
                            <FaUserCog className="icon" />
                            <span>Profile Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="tour-sidebar-attachments" to={`/dashboard/attachments/${clientId}`}>
                            <FaPaperclip className="icon" />
                            <span>Attachments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="tour-sidebar-password" to={`/dashboard/change-password/${clientId}`}>
                            <FaLock className="icon" />
                            <span>Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="tour-sidebar-logout" to={'/'} onClick={handleLogout}>
                            <FaSignOutAlt className="icon" />
                            <span>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default DashboardSidebar;