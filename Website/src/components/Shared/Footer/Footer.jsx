import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="container footer-top">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-widget footer-about">
                            <h3 className="footer-brand">MediCare Plus</h3>
                            <p className="footer-desc">
                                Providing whole-person family medical care with distinct expertise, managing complexity, uncertainty, and continuous health needs for all stages of life.
                            </p>
                            <div className="footer-social-links">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaFacebookF /></a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaInstagram /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaLinkedinIn /></a>
                                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaYoutube /></a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaTwitter /></a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="footer-widget footer-menu-widget">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Home Page</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/login">Client Portal</Link></li>
                                <li><Link to="/appointment">Book Appointment</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="footer-widget footer-contact">
                            <h4>Contact Us</h4>
                            <ul className="contact-details">
                                <li>
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>123 Health Street, New York, NY 10001</span>
                                </li>
                                <li>
                                    <FaEnvelope className="contact-icon" />
                                    <a href="mailto:info@medicareplus.com">info@medicareplus.com</a>
                                </li>
                                <li>
                                    <FaPhoneAlt className="contact-icon" />
                                    <a href="tel:+12125550123">+1 (212) 555-0123</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center g-3">
                        <div className="col-md-6 text-center text-md-start">
                            <span className="copyright-text">
                                &copy; {new Date().getFullYear()} MediCare Plus. All rights reserved.
                            </span>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <span className="developer-credits">
                                Designed &amp; Developed by <a href="https://netbots.io/" target="_blank" rel="noreferrer">NetBots (SMC-Private Limited)</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}