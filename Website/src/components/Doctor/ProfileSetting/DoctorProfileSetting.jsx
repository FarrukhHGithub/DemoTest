import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Button, Select, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions } from '../../../constant/global';
import ImageUpload from '../../UI/form/ImageUpload';
import dImage from '../../../images/avatar.jpg'

const DoctorProfileSetting = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [updateDoctor, { isLoading, isSuccess, isError, error }] = useUpdateDoctorMutation()
    const { data } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [userId, setUserId] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [value, setValue] = useState(undefined);
    const [showCalender, setShowCalender] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    const buttonRef = useRef(null);

    const handleDateChange = (date) => { setValue(date) }

    const handleButtonClick = () => { setShowCalender(!showCalender) }

    const handleClickOutSide = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowCalender(false);
        }
    }

    useEffect(() => {
        if (data) {
            const { id, services } = data;
            setUserId(id);
            setSelectedItems(services?.split(','))
        };
        document.addEventListener('click', handleClickOutSide);
        return () => {
            document.removeEventListener('click', handleClickOutSide);
        }
    }, [data]);

    const handleChange = (e) => {
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value })
    }

    const onSubmit = (data) => {
        const obj = data
        const newObj = { ...obj, ...selectValue };
        if (value) {
            const newDate = moment(value).format()
            newObj['dateOfBirth'] = newDate;
        }
        newObj["services"] = selectedItems.join(',');
        const changedValue = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== ''));
        
        const formData = new FormData();
        selectedImage && formData.append('file', file);
        const changeData = JSON.stringify(changedValue);
        formData.append('data', changeData)
        
        updateDoctor({ data: formData, id: userId })
    };

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Changed Saved !')
        }
    }, [isLoading, isError, error, isSuccess])

  const inputStyle = {
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '10px 12px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
    display: 'block'
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '950px', margin: '0 auto', marginBottom: '8rem' }}>
      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '16px', 
          padding: '2.5rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
          border: '1px solid #f1f5f9'
        }}
      >
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#0f172a', fontWeight: '700', margin: 0 }}>Update Doctor Profile</h4>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '6px 0 0 0' }}>
            Modify your professional information, clinics, services, and profile picture.
          </p>
        </div>

        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Avatar Upload block */}
          <div className="col-md-12 d-flex justify-content-center mb-5">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div 
                style={{ 
                  position: "relative",
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                  border: "3px solid #fff",
                  outline: "2px solid #1890ff",
                  cursor: "pointer",
                }}
                onClick={() => document.getElementById("doctor-avatar-input").click()}
              >
                <img
                  src={selectedImage ? selectedImage : (data?.img || dImage)}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <CameraOutlined style={{ fontSize: "22px", marginBottom: "4px" }} />
                  <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px" }}>Change Photo</span>
                </div>
              </div>
              <input 
                id="doctor-avatar-input" 
                type="file" 
                style={{ display: "none" }} 
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setSelectedImage(URL.createObjectURL(selectedFile));
                    setFile(selectedFile);
                  }
                }} 
              />
              <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
            </div>
          </div>

          {/* Basic Info Group */}
          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>First Name <span className="text-danger">*</span></label>
              <input defaultValue={data?.firstName} {...register("firstName")} className="form-control" style={inputStyle} />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Last Name <span className="text-danger">*</span></label>
              <input defaultValue={data?.lastName} {...register("lastName")} className="form-control" style={inputStyle} />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Email</label>
              <input defaultValue={data?.email} {...register("email")} className="form-control" style={inputStyle} />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Phone Number</label>
              <input defaultValue={data?.phone} {...register("phone")} className="form-control" style={inputStyle} />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Gender</label>
              <select className="form-control select" onChange={handleChange} name='gender' defaultValue={data?.gender || ''} style={{ ...inputStyle, height: '42px' }}>
                <option value={''}>Select</option>
                <option value='male' className='text-capitalize'>male</option>
                <option value='female' className='text-capitalize'>female</option>
                <option value='other' className='text-capitalize'>other</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Date of Birth {data?.dateOfBirth && `(${moment(data.dateOfBirth).format("MMM Do YY")})`}</label>
              <input value={value ? moment(value).format("MMM Do YY") : ""} type="text" className="form-control" name='dateOfBirth' onClick={handleButtonClick} ref={buttonRef} readOnly style={inputStyle} />
              {showCalender && (
                <div style={{ position: 'absolute', zIndex: 10, marginTop: '45px' }}>
                  <Calendar className="rounded shadow border-0" onChange={handleDateChange} value={value} />
                </div>
              )}
            </div>
          </div>

          {/* About Me Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1rem', fontSize: '15px' }}>About Me</h5>
              <div className="form-group mb-0">
                <label style={labelStyle}>Biography</label>
                <textarea defaultValue={data?.biography} {...register("biography")} className="form-control" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* Clinic Info Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Clinic Info</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Clinic Name</label>
                  <input defaultValue={data?.clinicName} {...register("clinicName")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Clinic Address</label>
                  <input type="text" defaultValue={data?.clinicAddress} {...register("clinicAddress")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Contact Details</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Address Line</label>
                  <input defaultValue={data?.address} {...register("address")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>City</label>
                  <input defaultValue={data?.city} {...register("city")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>State / Province</label>
                  <input defaultValue={data?.state} {...register("state")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Country</label>
                  <input defaultValue={data?.country} {...register("country")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Postal Code</label>
                  <input defaultValue={data?.postalCode} {...register("postalCode")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Pricing & Consultation Fee</h5>
              <div className="row">
                <div className="col-md-6">
                  <label style={labelStyle}>Fee ($)</label>
                  <input defaultValue={data?.price} {...register("price")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Services & Specialization */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Services and Specialization</h5>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label style={labelStyle}>Services</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Select services"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    options={doctorSpecialistOptions}
                  />
                  <small className="form-text text-muted" style={{ display: 'block', marginTop: '4px' }}>Note: Select services offered to your patients.</small>
                </div>
                <div className="col-md-12 mb-3">
                  <label style={labelStyle}>Specialization</label>
                  <input defaultValue={data?.specialization} {...register("specialization")} className="form-control" placeholder="Enter Specialization" style={inputStyle} />
                  <small className="form-text text-muted" style={{ display: 'block', marginTop: '4px' }}>Note: Separate specializations with commas.</small>
                </div>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Education & Qualifications</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label style={labelStyle}>Degree</label>
                  <input defaultValue={data?.degree} {...register("degree")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-4 mb-3">
                  <label style={labelStyle}>College/Institute</label>
                  <input defaultValue={data?.college} {...register("college")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-4 mb-3">
                  <label style={labelStyle}>Year of Completion</label>
                  <input defaultValue={data?.completionYear} {...register("completionYear")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Experience</h5>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label style={labelStyle}>Hospital Name</label>
                  <input defaultValue={data?.experienceHospitalName} {...register("experienceHospitalName")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-3 mb-3">
                  <label style={labelStyle}>From</label>
                  <input defaultValue={data?.expericenceStart} {...register("expericenceStart")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-3 mb-3">
                  <label style={labelStyle}>To</label>
                  <input defaultValue={data?.expericenceEnd} {...register("expericenceEnd")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-3 mb-3">
                  <label style={labelStyle}>Designation</label>
                  <input defaultValue={data?.designation} {...register("designation")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Awards Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Awards</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Awards</label>
                  <input defaultValue={data?.award} {...register("award")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Year</label>
                  <input defaultValue={data?.awardYear} {...register("awardYear")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Registrations Card */}
          <div className="col-md-12">
            <div style={cardStyle}>
              <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>Registrations</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Registrations</label>
                  <input defaultValue={data?.registration} {...register("registration")} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Year</label>
                  <input defaultValue={data?.year} {...register("year")} className="form-control" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='text-center my-4 col-md-12'>
            <Button 
              htmlType='submit' 
              type="primary" 
              size='large' 
              loading={isLoading} 
              disabled={isLoading}
              style={{
                height: '46px',
                padding: '0 3rem',
                borderRadius: '8px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.2)'
              }}
            >
              {isLoading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileSetting;