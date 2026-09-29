import React from 'react';
import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Empty } from 'antd';

// Dummy data for doctors
const dummyDoctors = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    designation: 'Cardiologist',
    specialization: 'Heart Diseases',
    img: 'https://via.placeholder.com/150',
    social: {
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      linkedin: 'https://www.linkedin.com'
    }
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    designation: 'Pediatrician',
    specialization: 'Child Health',
    img: 'https://via.placeholder.com/150',
    social: {
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      linkedin: 'https://www.linkedin.com'
    }
  },
];

const OurDoctors = () => {
  const isLoading = false;
  const isError = false;

  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && dummyDoctors.length === 0) content = <div><Empty /></div>;
  if (!isLoading && !isError && dummyDoctors.length > 0) {
      content = (
          <>
              {dummyDoctors.map((item) => (
                  <div className="col-lg-6 mt-3" key={item.id}>
                      <div className="member d-flex align-items-start">
                          <div className="pic">
                              {item.img && <img src={item.img} className="img-fluid" alt="" />}
                          </div>
                          <div className="member-info">
                              <h4>{item.firstName + ' ' + item.lastName}</h4>
                              <span>{item.designation}</span>
                              <p>{item.specialization}</p>
                              <div className="social">
                                  <a href={item.social.facebook}><FaFacebookSquare className='icon' /></a>
                                  <a href={item.social.instagram}><FaInstagramSquare className='icon' /></a>
                                  <a href={item.social.linkedin}><FaLinkedin className='icon' /></a>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </>
      );
  }

  return (
      <section id="doctors" className="doctors">
          <div className="container">
              <div className="section-title text-center mb-3">
                  <h2>OUR DOCTORS</h2>
                  <p className='form-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, adipisci?</p>
              </div>

              <div className="row">
                  {content}
              </div>
          </div>
      </section>
  );
}

export default OurDoctors;
