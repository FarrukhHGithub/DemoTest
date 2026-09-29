import React from "react";
import { Image } from "antd";
import { FiDownload, FiFile } from "react-icons/fi";
import axios from "axios";
import BASE_URL from "../../../baseUrl.jsx";

const AttachmentsSection = ({ medicalRecords }) => {
  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('accessToken') || sessionStorage.getItem('token');
  };

  const handleDownload = async (fileUrl, originalName) => {
    try {
      const token = getAuthToken();
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await axios.get(fileUrl, {
        responseType: "blob",
        headers
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", originalName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const hasAttachments = medicalRecords && 
    medicalRecords.data && 
    medicalRecords.data.some(record => 
      record.attachments && record.attachments.length > 0
    );

  return (
    <div className="patient-details-section attachment-section">
      <h2 className="section-title">Attachments</h2>
      {hasAttachments ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {medicalRecords.data.map((record) =>
            record.attachments &&
            record.attachments.length > 0 &&
            record.attachments.map((attachment, index) => {
              const imageUrl = `${BASE_URL}/uploads/${attachment.filename}`;
              return (
                <div
                  key={`${record._id || index}-${index}`}
                  className="group bg-dry border border-border rounded-xl overflow-hidden hover:shadow-sm transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gray-50 border-b border-border">
                    <Image
                      src={imageUrl}
                      alt={attachment.originalname}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      style={{ objectFit: 'cover' }}
                      fallback="https://via.placeholder.com/200?text=Attachment"
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-2 mt-auto">
                    <p className="text-[10px] font-medium text-main truncate w-full" title={attachment.originalname}>
                      {attachment.originalname}
                    </p>
                    <button
                      onClick={() => handleDownload(imageUrl, attachment.originalname)}
                      className="w-full inline-flex items-center justify-center gap-1 bg-subMain text-white py-1.5 rounded-lg text-[10px] font-semibold hover:bg-opacity-95 transition-all duration-200"
                    >
                      <FiDownload className="text-xs" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="m-0">No attachments found.</p>
        </div>
      )}
    </div>
  );
};

export default AttachmentsSection;