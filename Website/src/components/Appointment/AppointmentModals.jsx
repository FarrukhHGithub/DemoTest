import React from "react";
import { Modal, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const AppointmentModals = ({
  showModal,
  setShowModal,
  showNextModal,
  setShowNextModal,
  selectValue,
  selectedService,
  isConfirmDisable,
  loading,
  makePayment,
  current,
  setCurrent,
  fetchData,
}) => {
  return (
    <>
      <Modal
        title="Appointment Details"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <div key="footer-div">
            <Button
              type="primary"
              size="large"
              style={{ marginRight: "8px" }}
              disabled={isConfirmDisable || loading}
              onClick={makePayment}
            >
              {loading ? (
                <LoadingOutlined style={{ fontSize: '24px' }} />
              ) : (
                <span>Checkout</span>
              )}
            </Button>
          </div>
        ]}
      >
        <p><b>Patient Name:</b> {selectValue.name} </p>
        <p><b>Service:</b> {selectedService ? selectedService.serviceName : "Loading..."}</p>
        <p>
          <b>Service Charge:</b> {" "}
          {selectedService ? selectedService.price : "Loading..."} USD
        </p>
        <p><b>Total Amount:</b> {selectedService.price} USD</p>
      </Modal>

      <Modal
        title="Note"
        open={showNextModal}
        onCancel={() => setShowNextModal(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => {
              setShowNextModal(false);
              setCurrent(current + 1);
              if (current === 0) {
                fetchData();
              }
            }}
          >
            Next
          </Button>,
        ]}
      >
        <p>You can attach any Previous Medical Records From Attachment Section. If Already Attached, Ignore This message.</p>
      </Modal>
    </>
  );
};

export default AppointmentModals;
