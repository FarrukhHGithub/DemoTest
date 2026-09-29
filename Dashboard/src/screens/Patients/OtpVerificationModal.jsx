import React from "react";
import Modal from "../../components/Modals/Modal";

export const OtpVerificationModal = ({
  isOpen,
  closeModal,
  otpCode,
  handleOtpInputChange,
  verifyOtp,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      width="max-w-md"
      title="Enter OTP Code"
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-subMain flex items-center justify-center text-xl mb-4">
          🔒
        </div>
        <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
          A verification code has been sent to the doctor's email address. Please enter the OTP below to access the Dental Chart.
        </p>
        <div className="w-full max-w-xs mb-4">
          <input
            type="text"
            value={otpCode}
            onChange={handleOtpInputChange}
            placeholder="••••••"
            className="w-full text-center text-lg tracking-widest border border-border bg-dry rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all font-semibold"
          />
        </div>
        <button
          onClick={() => verifyOtp("dental")}
          className="w-full max-w-xs bg-subMain text-white rounded-xl py-3 font-semibold hover:bg-opacity-90 transition duration-300 shadow-sm"
        >
          Verify OTP
        </button>
      </div>
    </Modal>
  );
};
