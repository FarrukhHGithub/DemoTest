import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { Await, Link, useParams, useNavigate } from 'react-router-dom';
import { useUpdatePatientMutation } from '../../../redux/api/patientApi';
import ImageUpload from '../../UI/form/ImageUpload';
import pImage from '../../../images/avatar.jpg';
import axios from 'axios';
import BASE_URL from '../../../baseUrl.jsx';

const { Text } = Typography;

const PatientProfileSetting = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState();
    const [userId, setUserId] = useState('');
    const [selectBloodGroup, setSelectBloodGroup] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [value, setValue] = useState(undefined);
    const [showCalendar, setShowCalendar] = useState(false);
    const buttonRef = useRef(null);
    const [loading, setLoading] = useState(false); // Removed duplicate declaration
    const [updatePatient, { isSuccess, isError, error, isLoading }] = useUpdatePatientMutation();
    const [isConfirmDisable, setIsConfirmDisable] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [file, setFile] = useState(null);
    const handleDateChange = (date) => {
        setValue(date);
    };
    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };
    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };
    const fetchData = async (params) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the Authorization header
            }
        };
        await axios.get(`${BASE_URL}/api/userauth/${params.clientId}`, config)
            .then(response => {
    
                const imagePath = `${BASE_URL}/${response.data.image}`
                response.data.image = imagePath;
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

    }

    useEffect(() => {
        fetchData(params);
        if (data) {
            setUserId(data.id);
            setSelectBloodGroup(data?.bloodGroup);
            // Set selectValue for bloodGroup and gender based on fetched data
            setSelectValue({
                bloodGroup: data?.bloodGroup || '', // Ensure it's set to empty string if data not available
                gender: data?.gender || '' // Ensure it's set to empty string if data not available
            });
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Profile Updated')
        }
    }, [isLoading, isError, error, isSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
      
        const selectedFile = e.target.files[0];
     
        setSelectedImage(URL.createObjectURL(selectedFile)); // Update the preview of the selected image
        setFile(selectedFile); // Set the file state with the selected file
    };


    const handleSubmit = async () => {
         
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                // Do not set content type here, let FormData handle it automatically
            }
        };

        const formData = new FormData();

        // Append the image file to FormData only if it exists
        if (file) {
            formData.append('image', file);
        }

        // Append other data fields to FormData
        for (const key in data) {
            formData.append(key, data[key]);
        }

    

        try {
            // Send PUT request with FormData
            const response = await axios.put(`${BASE_URL}/api/userauth/${params.clientId}`, formData, config);
        
            message.success('Successfully Profile Updated');
            navigate(`/dashboard/${params.clientId}`);
            // Refetch data after successful update
            fetchData(params);
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error(error?.response?.data?.message || 'Failed to update profile');
        }finally {
      setLoading(false); // Set loading state to false once the request is completed
    }
    };





    return (
        <div style={{ padding: '1.25rem 1rem', maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
            <div 
                style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '1.5rem 1.75rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    border: '1px solid #f1f5f9'
                }}
            >
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                    <h5 style={{ color: '#0f172a', fontWeight: '700', margin: 0, fontSize: '18px' }}>Update Profile Information</h5>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0 0' }}>
                        Manage your account settings and personal details.
                    </p>
                </div>

                <div className="row">
                    {/* Avatar Upload Grid Section */}
                    <div className="col-md-12 d-flex justify-content-center">
                        <div 
                            id="tour-profile-avatar"
                            style={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                alignItems: "center",
                                gap: "6px", 
                                marginBottom: "1.5rem" 
                            }}
                        >
                            <div 
                                style={{ 
                                    position: "relative",
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                                    border: "2px solid #fff",
                                    outline: "2px solid #1890ff",
                                    cursor: "pointer",
                                }}
                                onClick={() => document.getElementById("patient-avatar-input").click()}
                            >
                                <img
                                    src={selectedImage ? selectedImage : (data?.image || pImage)}
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
                                    <CameraOutlined style={{ fontSize: "16px", marginBottom: "2px" }} />
                                    <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.5px" }}>Change</span>
                                </div>
                            </div>
                            <input 
                                id="patient-avatar-input" 
                                type="file" 
                                style={{ display: "none" }} 
                                onChange={handleFileChange} 
                            />
                            <Text type="secondary" style={{ fontSize: "11px", marginTop: "2px" }}>
                                Allowed JPG, GIF or PNG. Max size of 2MB
                            </Text>
                        </div>
                    </div>

                    <div id="tour-profile-fields" className="row w-100 m-0 p-0">
                        <div className="col-md-6 mb-3">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                                    Full Name <span className="text-danger">*</span>
                                </label>
                            <input 
                                defaultValue={data?.name} 
                                className="form-control" 
                                disabled 
                                style={{ 
                                    backgroundColor: '#f8fafc', 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '6px', 
                                    padding: '7px 10px',
                                    fontSize: '13.5px',
                                    color: '#64748b'
                                }} 
                            />
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                                Email <span className="text-danger">*</span>
                            </label>
                            <input 
                                defaultValue={data?.email} 
                                className="form-control" 
                                disabled 
                                style={{ 
                                    backgroundColor: '#f8fafc', 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '6px', 
                                    padding: '7px 10px',
                                    fontSize: '13.5px',
                                    color: '#64748b'
                                }} 
                            />
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                                Emergency Contact
                            </label>
                            <input 
                                defaultValue={data?.emergencyContact}
                                type='number'
                                name='emergencyContact'
                                value={data?.emergencyContact || ''}
                                onChange={handleChange}
                                className="form-control" 
                                style={{ 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '6px', 
                                    padding: '7px 10px',
                                    fontSize: '13.5px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Gender</label>
                            <select
                                className="form-control select"
                                onChange={handleChange}
                                name='gender'
                                value={data?.gender || ''}
                                style={{ 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '8px', 
                                    padding: '10px 12px',
                                    outline: 'none',
                                    height: '42px'
                                }}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Blood Group</label>
                            <select
                                className="form-control select"
                                onChange={handleChange}
                                name='bloodGroup'
                                value={data?.bloodGroup || ''}
                                style={{ 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '8px', 
                                    padding: '10px 12px',
                                    outline: 'none',
                                    height: '42px'
                                }}
                            >
                                <option value="">Select</option>
                                <option value="AB+ve">AB+ve</option>
                                <option value="AB-ve">AB-ve</option>
                                <option value="A+ve">A+ve</option>
                                <option value="A-ve">A-ve</option>
                                <option value="B+ve">B+ve</option>
                                <option value="B-ve">B-ve</option>
                                <option value="O+ve">O+ve</option>
                                <option value="O-ve">O-ve</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Address</label>
                            <input 
                                defaultValue={data?.address}
                                name='address'
                                value={data?.address || ''}
                                onChange={handleChange}
                                className="form-control" 
                                style={{ 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: '8px', 
                                    padding: '10px 12px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                    </div>

                    <div className='text-end mt-4'>
                        <Button
                            id="tour-profile-save"
                            type="primary"
                            size="large"
                            style={{ 
                                padding: '0 2rem', 
                                height: '44px', 
                                borderRadius: '8px', 
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)'
                            }}
                            onClick={() => handleSubmit()}
                        >
                            {loading ? (
                                <LoadingOutlined style={{ fontSize: '20px' }} />
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileSetting;