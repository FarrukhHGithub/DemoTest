import React from 'react';
import img1 from '../../../images/specialities/specialities-01.png';
import img2 from '../../../images/specialities/specialities-02.png';
import img3 from '../../../images/specialities/specialities-03.png';
import img4 from '../../../images/specialities/specialities-04.png';
import img5 from '../../../images/specialities/specialities-05.png';
import './index.css';

const ClinicAndSpecialities = () => {
    const specialties = [
        { img: img1, text: "Children's Health", desc: "Expert medical care for newborns, children, and teens." },
        { img: img2, text: "Neurology Care", desc: "Advanced diagnostics and treatments for brain & nervous system." },
        { img: img3, text: "Orthopedics", desc: "Comprehensive muscle, joint, and bone healthcare." },
        { img: img4, text: "Cardiology", desc: "Heart health assessments, preventions, and treatments." },
        { img: img5, text: "Men's Health", desc: "Specialized screenings and therapies for men of all ages." }
    ];

    return (
        <section className="section-specialties-custom">
            <div className="container">
                <div className='mb-5 section-title text-center specialties-header'>
                    <span className="section-subtitle">OUR CLINICS</span>
                    <h2>Clinic and Specialties</h2>
                    <p className='m-0 text-secondary'>Providing expert care and specialized services to meet all your healthcare needs under one roof.</p>
                </div>

                <div className="row g-4 justify-content-center mt-4">
                    {specialties.map((item, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <div className="specialty-card-custom">
                                <div className="specialty-icon-container">
                                    <img src={item.img} alt={item.text} className="specialty-icon-img" loading="lazy" />
                                </div>
                                <div className="specialty-info-container">
                                    <h4>{item.text}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClinicAndSpecialities;