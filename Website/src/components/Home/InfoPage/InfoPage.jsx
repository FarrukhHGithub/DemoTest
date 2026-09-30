import React from "react";
import "./InfoPage.css";
import { FaClock, FaHeadset, FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <section id="why-us" className="why-us">
      <div className="container" style={{ marginTop: "5px" }}>
        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="content">
              <h3>About Us</h3>
              <div className="about-doctor-card mb-3">
                <h4 className="doc-name">Dr. James Miller</h4>
                <div className="doc-credentials">MD, FAAFP (Board Certified Family Medicine)</div>
                <div className="doc-tagline">Medical Director, MediCare Plus</div>
                <div className="doc-slogan">"Compassionate care for every stage of life."</div>
              </div>
              <div className="doc-expertise">
                <h5>Expertise</h5>
                <p>
                  I am a consultant in family health with distinct expertise and experience in providing whole-person medical care while managing the complexity, uncertainty, and risk associated with continuous care. I serve as your dedicated family doctor, caring for each member of your family across all stages of life.
                </p>
                <p className="mt-2">
                  I strive to provide comprehensive and equitable care for everyone, taking into account their healthcare needs, stage of life, and background. I work in, connect with, and lead multidisciplinary teams that care for people and their families, respecting the context in which they live, aiming to ensure all of their physical and mental health needs are met.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <FaHouseUser className="icon" />
                    <h4>Appointment</h4>
                    <small className="text-secondary">24 Hours Service</small>
                    <p>
                      Available round the clock, we're here whenever you need
                      us. Our services are accessible 24/7, ensuring assistance
                      is always at your fingertips.
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <FaHeadset className="icon" />
                    <h4>Emergency Cases</h4>
                    <h6 className="text-secondary">+1 (212) 555-0199</h6>
                    <p>
                      Reach out to our reliable emergency contact for immediate
                      assistance and reassurance.
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <FaClock className="icon" />
                    <h4>Working Hours</h4>
                    <small className="text-secondary">Timing schedule</small>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <p>Sun - Wed : </p> <p> 8:00 - 17:00</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <p>Thur - Fri : </p> <p> 9:00 - 17:00</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <p>Sat - Sun : </p> <p> 10:00 - 17:00</p>
                      </li>                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPage;