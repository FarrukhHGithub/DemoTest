import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");

    if (seconds === 0) {
      if (clientId) {
        navigate(`/dashboard/${clientId}`);
      } else {
        navigate("/login");
      }
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="w-full min-h-screen flex items-start justify-center bg-gradient-to-b from-gray-50 to-gray-100 pt-24">
      <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">

        <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-green-100 overflow-hidden">
          <img
            src="/logo.jpg"
            alt="Logo"
            style={{ width: "250px", height: "250px", objectFit: "contain" }}
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Failed ❌
        </h1>

        <p className="text-base text-gray-600 mb-6">
          Your payment was not completed. Please try again.
        </p>

        <p className="text-lg font-medium text-gray-700">
          Redirecting  in{" "}
          <span className="inline-flex items-center justify-center px-3 py-1 mx-1 bg-black text-white font-bold text-xl rounded-full">
            {seconds}
          </span>{" "}
          seconds...
        </p>

      </div>
    </div>
  );
};

export default Cancel;