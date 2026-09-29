import React from 'react';
import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaPhoneAlt, FaEnvelope  } from "react-icons/fa";

const TopHeader = () => {
    return (
        <div id="topbar" className="d-flex align-items-center fixed-top px-3">
            <div className="container d-flex justify-content-between align-items-center flex-wrap">
                <div className="contact-info d-flex flex-wrap align-items-center justify-content-center">
                    <div className="contact-item d-flex align-items-center">
                        <FaEnvelope className='contact-icon'/> 
                        <a href="mailto:appointment@avicenahealthcare.com">appointment@avicenahealthcare.com</a>
                    </div>
                    <div className="contact-item d-flex align-items-center">
                        <FaPhoneAlt className='contact-icon'/> 
                        <a href="tel:+447579389649">+44 7579 389649</a> 
                    </div>
                </div>
                <div className="d-none d-lg-flex social-links align-items-center">
                    <a href="https://linkedin.com" target='_blank' rel="noreferrer" className="linkedin"><FaLinkedin /></a>
                    <a href="https://facebook.com" target='_blank' rel="noreferrer" className="facebook"><FaFacebookSquare /></a>
                    <a href="https://instagram.com" target='_blank' rel="noreferrer" className="instagram"><FaInstagramSquare /></a>
                </div>
            </div>
        </div>
    );
};
export default TopHeader;