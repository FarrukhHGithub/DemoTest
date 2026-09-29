import React from 'react';
import { List, Card, Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const AttachmentList = ({ attachments, handleUpdate, handleDelete }) => {
  if (attachments.length === 0) return null;

  return (
    <div id="tour-attachment-list" style={{ marginTop: '2.5rem' }}>
      <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1.25rem', fontSize: '15px' }}>
        Uploaded Files ({attachments.length})
      </h5>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
        dataSource={attachments}
        renderItem={({ name, base64 }, index) => (
          <List.Item>
            <Card
              hoverable
              style={{ 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: '12px' }}
              cover={
                <div style={{ position: 'relative', height: '160px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <img
                    alt={name || `Attachment ${index}`}
                    src={base64} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              }
              actions={[
                <Upload
                  showUploadList={false}
                  customRequest={({ file }) => handleUpdate(index, file)}
                >
                  <Button 
                    type="text" 
                    icon={<UploadOutlined style={{ color: '#0284c7' }} />} 
                    style={{ width: '100%' }}
                  >
                    Replace
                  </Button>
                </Upload>,
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => handleDelete(index)}
                  style={{ width: '100%' }}
                >
                  Delete
                </Button>
              ]}
            >
              <Card.Meta 
                title={<span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{name || `Attachment ${index + 1}`}</span>} 
                description={<span style={{ fontSize: '11px', color: '#94a3b8' }}>File #{index + 1}</span>}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AttachmentList;
