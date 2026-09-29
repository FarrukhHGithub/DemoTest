import React, { useState, useEffect } from 'react';

const FilePreviews = ({ files }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Generate object URLs
    const urls = files.map(file => {
      if (file.type.startsWith("image/")) {
        return {
          name: file.name,
          url: URL.createObjectURL(file),
          isImage: true
        };
      }
      return {
        name: file.name,
        url: null,
        isImage: false
      };
    });

    setPreviews(urls);

    // Cleanup generated object URLs on unmount or when files change
    return () => {
      urls.forEach(item => {
        if (item.url) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [files]);

  if (files.length === 0) {
    return (
      <div style={{ color: "#94a3b8", fontSize: "13.5px", fontStyle: "italic", padding: "12px 0" }}>
        No medical records or files attached.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px", marginTop: "10px" }}>
      {previews.map((preview, index) => (
        <div 
          key={index} 
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "8px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
          }}
        >
          {preview.isImage && preview.url ? (
            <img
              src={preview.url}
              alt={preview.name}
              style={{ width: "100%", height: "70px", objectFit: "cover", borderRadius: "6px" }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: "70px",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              fontSize: "24px"
            }}>
              📄
            </div>
          )}
          <span style={{
            fontSize: "11px",
            color: "#475569",
            fontWeight: "600",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            padding: "0 4px"
          }}>
            {preview.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FilePreviews;
