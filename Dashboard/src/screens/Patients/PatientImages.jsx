import React, { useEffect } from "react";
import axios from "axios";
import { Image } from "antd";
import { FiDownload, FiFile } from "react-icons/fi";
import BASE_URL from "../../baseUrl.jsx";

function PatientImages({ medicalRecords, webPatientAttachments, token }) {
  useEffect(() => {
    const fetchImages = async () => {
      try {
        medicalRecords?.data?.forEach((record) => {
          record.attachments?.forEach((attachment) => {
            const imageUrl = `${BASE_URL}/${attachment.filename}`;
            axios
              .get(imageUrl)
              .then((response) => {
                // console.log("Image loaded successfully:", response);
              })
              .catch((error) => {
                console.error("Error fetching image:", error);
              });
          });
        });
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [medicalRecords]);

  // ✅ Download handler (FORCE DOWNLOAD)
  const handleDownload = async (url, fileName) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName || "image");

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const hasMedicalAttachments = medicalRecords?.data?.some(record => record.attachments?.length > 0);
  const hasWebAttachments = webPatientAttachments?.length > 0;
  const hasAnyAttachments = hasMedicalAttachments || hasWebAttachments;

  if (!hasAnyAttachments) {
    return (
      <div className="w-full py-16 bg-dry rounded-2xl border border-dashed border-border text-center">
        <FiFile className="text-4xl text-gray-400 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-main">No Attachments Found</h3>
        <p className="text-xs text-textGray mt-1">There are no images or file attachments uploaded for this patient.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm w-full">
      <h2 className="text-base font-bold text-main mb-6 pb-4 border-b border-border">Patient Images & Attachments</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {/* Medical Records Images */}
        {medicalRecords?.data?.map((record) => 
          record.attachments?.map((attachment, attachmentIndex) => {
            const imageUrl = `${BASE_URL}/uploads/${attachment.filename}`;
            return (
              <div
                key={`med-${attachmentIndex}`}
                className="group bg-dry border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col shadow-sm"
              >
                {/* Preview */}
                <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gray-100 border-b border-border">
                  <Image
                    src={imageUrl}
                    alt={attachment.originalname}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectFit: 'cover' }}
                    fallback="https://via.placeholder.com/200?text=Attachment"
                    onError={(e) => {
                      console.error("Error loading image:", e.target.src);
                    }}
                  />
                </div>

                {/* Info & Download Button */}
                <div className="p-3 flex flex-col gap-2 mt-auto">
                  <p className="text-[11px] font-medium text-main truncate w-full" title={attachment.originalname}>
                    {attachment.originalname}
                  </p>
                  <button
                    onClick={() => handleDownload(imageUrl, attachment.originalname)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-subMain text-white py-2 rounded-xl text-xs font-semibold hover:bg-opacity-95 transition-all duration-200 shadow-sm"
                  >
                    <FiDownload className="text-sm" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Web Patient Attachments */}
        {webPatientAttachments?.map((attachment, index) => {
          const imageUrl = `${BASE_URL}/${attachment}`;
          const fileName = attachment.split('/').pop() || `Attachment-${index}`;
          return (
            <div 
              key={`web-${index}`} 
              className="group bg-dry border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col shadow-sm"
            >
              {/* Preview */}
              <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gray-100 border-b border-border">
                <Image
                  src={imageUrl}
                  alt={`Attachment ${index}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ objectFit: 'cover' }}
                  fallback="https://via.placeholder.com/200?text=Attachment"
                  onError={(e) => {
                    console.error("Error loading image:", e.target.src);
                  }}
                />
              </div>

              {/* Info & Download Button */}
              <div className="p-3 flex flex-col gap-2 mt-auto">
                <p className="text-[11px] font-medium text-main truncate w-full" title={fileName}>
                  {fileName}
                </p>
                <button
                  onClick={() => handleDownload(imageUrl, fileName)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-subMain text-white py-2 rounded-xl text-xs font-semibold hover:bg-opacity-95 transition-all duration-200 shadow-sm"
                >
                  <FiDownload className="text-sm" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientImages;
