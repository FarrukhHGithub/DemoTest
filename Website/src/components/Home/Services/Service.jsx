import React from 'react';
import './index.css';
import img from '../../../images/features/15.jpeg';
import img2 from '../../../images/features/11.jpeg';
import img3 from '../../../images/features/12.jpeg';

const Service = () => {
    return (
        <section className="section-services">
            <div className="container">
                <div className='mb-5 section-title text-center service-title'>
                    <h2>Services</h2>
                    <p className='m-0'>24 Hours Service. Available round the clock, we're here whenever you need us. Our services are accessible 24/7, ensuring assistance is always at your fingertips.</p>
                </div>
                <div className="row align-items-center g-4 mt-5">
                    <div className="col-lg-4 col-sm-6">
                        <div className="d-flex flex-column gap-4">
                            <div className="service-img-wrapper">
                                <img src={img} alt="Services" className="img-fluid" loading="lazy" />
                            </div>
                            <div className="service-img-wrapper">
                                <img src={img2} alt="Services" className="img-fluid" loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img-wrapper">
                            <img src={img3} alt="Services" className="img-fluid" loading="lazy" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-content ps-lg-4 mt-4 mt-lg-0 text-center text-lg-start">
                            <h2>Holistic Care <br className="d-none d-lg-block" />of the <span>Whole Family</span></h2>
                            <p className="mt-4 mb-4 text-secondary">Providing top-tier healthcare services tailored to meet your needs, ensuring your well-being and peace of mind. We focus on continuous health support at every stage of life.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Service;