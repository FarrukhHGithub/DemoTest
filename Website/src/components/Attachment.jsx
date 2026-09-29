import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Dropzone from './Drpozone2';
import { Button, notification, Modal } from 'antd';
import DashboardLayout from './Doctor/DashboardLayout/DashboardLayout';
import AttachmentList from './AttachmentList';

const Attachment = ({ onFileChange = () => {}, onDone = () => {} }) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const savedAttachments = JSON.parse(localStorage.getItem('attachments')) || [];
    console.log('Files retrieved from local storage:', savedAttachments);
    if (savedAttachments.length > 0) {
      setAttachments(savedAttachments);
    } else {
      console.log('No files found in local storage.');
    }
  }, []);

  const fileToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ name: file.name, base64: reader.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileChange = useCallback(async (files) => {
    const fileArray = Array.from(files);
    const base64Files = await Promise.all(fileArray.map(fileToBase64));
    setAttachments(prev => {
      const updated = [...prev, ...base64Files];
      localStorage.setItem('attachments', JSON.stringify(updated));
      return updated;
    });
    onFileChange(fileArray);
  }, [fileToBase64, onFileChange]);

  const handleUpdate = useCallback((index, newFile) => {
    fileToBase64(newFile).then(({ base64 }) => {
      setAttachments(prev => {
        const updated = prev.map((item, i) => i === index ? { ...item, base64 } : item);
        localStorage.setItem('attachments', JSON.stringify(updated));
        return updated;
      });
    });
  }, [fileToBase64]);

  const handleDelete = useCallback((index) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this attachment?',
      onOk: () => {
        setAttachments(prev => {
          const updated = prev.filter((_, i) => i !== index);
          localStorage.setItem('attachments', JSON.stringify(updated));
          return updated;
        });
      }
    });
  }, []);

  const handleDone = useCallback(() => {
    notification.success({
      message: 'Success',
      description: 'Attachments have been saved successfully!',
    });
    onDone(attachments);
  }, [attachments, onDone]);

  // Memoize mapped attachments for Dropzone to prevent recreating array on every render
  const dropzoneFiles = useMemo(() => attachments.map(({ name }) => ({
    name, 
    size: 0,
    type: 'application/octet-stream',
  })), [attachments]);

  return (
    <DashboardLayout>
      <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            padding: '2.5rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9'
          }}
        >
          {/* Header section */}
          <div id="tour-attachment-header" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <h4 style={{ color: '#0f172a', fontWeight: '700', margin: 0 }}>Medical Documents & Attachments</h4>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '6px 0 0 0' }}>
              Upload and manage your clinical reports, prescriptions, or other documents securely.
            </p>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div id="tour-attachment-dropzone" style={{ marginBottom: '2rem' }}>
                <Dropzone
                  handleChange={handleFileChange}
                  files={dropzoneFiles}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <Button 
                    id="tour-attachment-save"
                    onClick={handleDone} 
                    type="primary" 
                    size="large"
                    style={{ 
                      borderRadius: '8px', 
                      fontWeight: '600',
                      padding: '0 2.5rem',
                      height: '42px',
                      boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)'
                    }}
                  >
                    Done / Save Files
                  </Button>
                </div>
              </div>

              <AttachmentList
                attachments={attachments}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attachment;
