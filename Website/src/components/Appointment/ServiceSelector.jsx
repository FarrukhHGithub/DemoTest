import React from "react";
import { MedicineBoxOutlined, HeartOutlined, ExperimentOutlined, CheckCircleFilled } from '@ant-design/icons';

const ServiceSelector = ({ serviceDetails, selectedService, setSelectedService, setIsConfirmDisable }) => {
  if (!serviceDetails) return null;

  return (
    <div 
      id="tour-services-grid" 
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.75rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '2rem 0'
      }}
    >
      {serviceDetails.map((service, index) => {
        const isSelected = selectedService && selectedService.serviceName === service.name;
        
        let serviceIcon = <MedicineBoxOutlined />;
        if (service.name.toLowerCase().includes("check")) {
          serviceIcon = <HeartOutlined />;
        } else if (service.name.toLowerCase().includes("test")) {
          serviceIcon = <ExperimentOutlined />;
        }

        return (
          <div
            id={index === 0 ? "tour-first-service-card" : undefined}
            key={index}
            onClick={() => {
              setSelectedService({
                serviceName: service.name,
                price: service.price,
              });
              setIsConfirmDisable(false);
            }}
            className={isSelected ? "service-card-selected" : "service-card"}
          >
            {isSelected && (
              <div style={{ position: "absolute", top: 8, right: 8, color: "#1890ff" }}>
                <CheckCircleFilled style={{ fontSize: "14px" }} />
              </div>
            )}
            <div 
              className="service-icon-wrapper" 
              style={{
                backgroundColor: isSelected ? "#e6f7ff" : "#f8fafc",
                color: isSelected ? "#1890ff" : "#94a3b8",
                border: isSelected ? "1px solid #bae7ff" : "1px solid #e2e8f0"
              }}
            >
              {serviceIcon}
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: "700", fontSize: "14px", color: isSelected ? "#0050b3" : "#0f172a" }}>
                {service.name}
              </p>
              <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748b" }}>
                Professional Consultation
              </p>
            </div>
            <div className="service-price-tag">
              ${service.price}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceSelector;
