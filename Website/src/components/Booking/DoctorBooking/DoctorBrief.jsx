import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import { FaArchway } from "react-icons/fa";

const DoctorBrief = ({ isLoading, isError, data, img }) => {
  if (isLoading) return null;
  if (isError) return <div>Something Went Wrong!</div>;
  if (!data || data.id === undefined) return <Empty />;

  return (
    <div className="booking-doc-img my-3 mb-3 rounded">
      <Link to={`/doctors/${data.id}`}>
        <img src={img} alt="" />
      </Link>
      <div className='text-start'>
        <Link to={`/doctors/${data.id}`} style={{ textDecoration: 'none' }}>
          Dr. {data.firstName + ' ' + data.lastName}
        </Link>
        <p className="form-text mb-0">
          <FaArchway /> {data.specialization + ',' + data.experienceHospitalName}
        </p>
      </div>
    </div>
  );
};

export default DoctorBrief;
