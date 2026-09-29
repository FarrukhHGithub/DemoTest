import React, { useEffect, useState } from 'react';
import FilePreviews from './FilePreviews';

const PersonalInformation = ({ handleFileChange, handleChange, selectValue }) => {
  const { name, reasonForVisit, bloodGroup, gender, emergencyContact, email, address } = selectValue;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Retrieve base64 files from local storage and convert them to File objects
    const fetchFilesFromLocalStorage = () => {
      const savedAttachments = JSON.parse(localStorage.getItem('attachments')) || [];
      console.log('Files retrieved from local storage:', savedAttachments);
    
      if (Array.isArray(savedAttachments) && savedAttachments.length > 0) {
        try {
          const filesFromBase64 = savedAttachments.map(attachment => {
            if (attachment.base64 && typeof attachment.base64 === 'string' && attachment.base64.includes(',')) {
              const [header, data] = attachment.base64.split(',');
              const mimeMatch = header.match(/:(.*?);/);
    
              if (!mimeMatch) {
                throw new Error('Invalid MIME type');
              }
    
              const mime = mimeMatch[1];
              const blob = new Blob([new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))], { type: mime });
              return new File([blob], attachment.name || 'filename', { type: mime });
            } else {
              throw new Error('Invalid base64 format');
            }
          });
          setFiles(filesFromBase64);
        } catch (error) {
          console.error('Error converting base64 to files:', error);
        }
      } else {
        console.log('No files found in local storage.');
      }
    };
  
    fetchFilesFromLocalStorage();
  }, []);

  return (
    <form 
      id="tour-booking-form" 
      className="p-4 mt-4" 
      style={{ 
        background: "#ffffff",
        border: "1px solid #f1f5f9",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)"
      }}
    >
      <style>{`
        .custom-form-group {
          margin-bottom: 1.5rem;
        }
        .custom-form-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          display: block;
        }
        .custom-form-input {
          border-radius: 10px !important;
          border: 1px solid #cbd5e1 !important;
          padding: 10px 14px !important;
          font-size: 14.5px !important;
          color: #1e293b !important;
          background-color: #ffffff !important;
          transition: all 0.2s ease;
        }
        .custom-form-input:disabled {
          background-color: #f8fafc !important;
          border-color: #e2e8f0 !important;
          color: #64748b !important;
          cursor: not-allowed;
          font-weight: 500;
        }
        .custom-form-textarea {
          border-radius: 10px !important;
          border: 1px solid #cbd5e1 !important;
          padding: 12px 14px !important;
          font-size: 14.5px !important;
          color: #1e293b !important;
          transition: all 0.2s ease;
        }
        .custom-form-textarea:focus {
          border-color: #1890ff !important;
          box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1) !important;
          outline: none;
        }
      `}</style>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Full Name</span>
            <input disabled name='name' value={name || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Email Address</span>
            <input disabled name='email' value={email || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Blood Group</span>
            <input disabled name='bloodGroup' value={bloodGroup || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Gender</span>
            <input disabled name='gender' value={gender || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Contact Number</span>
            <input disabled name='emergencyContact' value={emergencyContact || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Home Address</span>
            <input disabled name='address' value={address || ''} className="form-control custom-form-input" type="text" />
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          <div className="custom-form-group">
            <span className="custom-form-label">Reason For Visit</span>
            <textarea 
              id="tour-reason-input" 
              rows={4} 
              onChange={(e) => handleChange(e)} 
              name='reasonForVisit' 
              value={reasonForVisit || ''} 
              className="form-control custom-form-textarea" 
              placeholder="Please describe the primary reason for your visit..."
            />
          </div>
        </div>
        <div id="tour-attachments-area" className="col-md-12 col-sm-12">
          <div style={{ 
            borderTop: "1px dashed #e2e8f0", 
            paddingTop: "1.25rem", 
            marginTop: "0.5rem" 
          }}>
            <span className="custom-form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              📎 Attached Medical Records
            </span>
            <div className="attachments-preview">
              <FilePreviews files={files} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
