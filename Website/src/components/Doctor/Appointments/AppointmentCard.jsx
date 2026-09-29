import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaBriefcaseMedical, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import moment from 'moment';

const AppointmentCard = ({ item, img, clickToCopyClipboard, updatedAppointmentStatus }) => {
  return (
    <div className="w-100 mb-3 rounded p-3" style={{ background: '#f8f9fa' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Link to={`/`} className="patient-img">
            <img src={img} alt="" />
          </Link>
          <div className="patients-info">
            <h5>{item.patient.firstName + ' ' + item.patient.lastName}</h5>
            <Tooltip title="Copy Tracking Id">
              <Button>
                <h6>Tracking
                  <Tag 
                    color="#87d068" 
                    className='ms-2 text-uppercase' 
                    onClick={() => clickToCopyClipboard(item.trackingId)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.trackingId}
                  </Tag>
                </h6>
              </Button>
            </Tooltip>
            <div className="info">
              <p><FaClock className='icon' /> {moment(item.appointmentTime).format("MMM Do YY")} </p>
              <p><FaLocationArrow className='icon' /> {item.patient.address}</p>
              <p><FaEnvelope className='icon' /> {item.patient.email}</p>
              <p><FaPhoneAlt className='icon' /> {item.patient.mobile}</p>
            </div>
          </div>
          <div className='appointment-status card p-3 border-primary'>
            <p className="m-0 mb-1">Current Status - <Tag color="#f50" className='text-uppercase'>{item.status}</Tag></p>
            <p className="m-0 mb-1">Patient Status - <Tag color="#2db7f5" className='text-uppercase'>{item.patientType}</Tag></p>
            <p className="m-0 mb-1">Is Follow Up - <Tag color="#f50" className='text-uppercase'>{item.isFollowUp ? "Yes" : "No"}</Tag></p>
            <p className="m-0 mb-1">Is Paid - <Tag color="#87d068" className='text-uppercase'>{item.paymentStatus}</Tag></p>
            <p className="m-0">Prescribed - <Tag color="#2db7f5" className='text-uppercase'>{item.prescriptionStatus}</Tag></p>
          </div>
        </div>
        <div className='d-flex gap-2'>
          {item.prescriptionStatus === 'notIssued' ? (
            <Link to={`/dashboard/appointment/treatment/${item.id}`}>
              <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Treatment</Button>
            </Link>
          ) : (
            <Link to={`/dashboard/prescription/${item.prescription[0].id}`}>
              <Button type="primary" shape="circle" icon={<FaEye />} size="small" />
            </Link>
          )}
          {item.isFollowUp && (
            <Link to={`/dashboard/appointment/treatment/edit/${item.prescription[0].id}`}>
              <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Follow Up</Button>
            </Link>
          )}
          {item.status === 'pending' && (
            <>
              <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedAppointmentStatus(item.id, 'scheduled')}>Accept</Button>
              <Button type='primary' icon={<FaTimes />} size="small" danger onClick={() => updatedAppointmentStatus(item.id, 'cancel')}>Cancel</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
