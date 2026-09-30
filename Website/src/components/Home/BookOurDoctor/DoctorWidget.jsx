import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaRegHeart, FaLocationArrow, FaClock, FaStar } from "react-icons/fa";

const DoctorWidget = ({ item, handleAddFavourite }) => {
  return (
    <div className="profile-widget">
      <div className="doc-img">
        <img className="img-fluid" alt="" src={item.img} />
        <button className="fav-btn" onClick={() => handleAddFavourite(item.id)}>
          <FaRegHeart />
        </button>
        <span className="badge-speciality">Verified</span>
      </div>
      <div className="pro-content">
        <h3 className="title">
          <span>{item.firstName + ' ' + item.lastName}</span>
          <FaCheckCircle className='verified' />
        </h3>
        <span className="designation">{item.designation}</span>
        <p className="speciality">{item.specialization}</p>
        
        <div className="rating-info">
          <div className="stars">
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
          </div>
          <span className="reviews-count">({item.reviewsCount} Reviews)</span>
        </div>

        <ul className="available-info">
          <li>
            <FaLocationArrow className='icon' /> {item.location}
          </li>
          <li>
            <FaClock className='icon' /> {item.availability}
          </li>

        </ul>
        <div className="d-flex gap-2">
          <Link to={`/appointment`} className="btn btn-outline-info btn-sm view-profile-btn flex-grow-1">View Profile</Link>
          <Link to={`/appointment`} className="btn btn-sm book-btn flex-grow-1">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorWidget;
