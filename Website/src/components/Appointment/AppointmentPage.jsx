import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from "axios";
import { Button, Steps, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import Header from "../Shared/Header/Header";
import SelectAppointment from "./SelectApppointment";
import PersonalInformation from "../Booking/PersonalInformation";
import { useCreateAppointmentByUnauthenticateUserMutation } from "../../redux/api/appointmentApi";
import { addInvoice } from "../../redux/feature/invoiceSlice";
import BASE_URL from '../../baseUrl.jsx';
import { useDriverTour } from "../../hooks/useDriverTour";
import ServiceSelector from "./ServiceSelector";
import AppointmentModals from "./AppointmentModals";
import "./AppointmentPage.css";

const initialValue = {
  name: "",
  email: "",
  attachments: [],
  emergencyContact: 0,
  reasonForVisit: "",
  description: "",
  address: "",
};

const AppointmentPage = ({ hideHeader }) => {
  const { refreshTour } = useDriverTour();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showNextModal, setShowNextModal] = useState(false);
  const params = useParams();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isCheck] = useState(false);
  const [selectValue, setSelectValue] = useState(initialValue);
  const [isDisable, setIsDisable] = useState(true);
  const [isConfirmDisable, setIsConfirmDisable] = useState(true);
  const [appointmentSlots] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState({
    serviceName: "",
    price: 0,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointmentSelected, setAppointmentSelected] = useState(false);
  const navigation = useNavigate();

  const [
    createAppointmentByUnauthenticateUser,
    { data: appointmentData, isError, isSuccess, isLoading, error },
  ] = useCreateAppointmentByUnauthenticateUserMutation();

  const handleChange = useCallback((e) => {
    setSelectValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = useCallback((files) => {
    setSelectValue(prev => ({ ...prev, attachments: files }));
  }, []);

  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BASE_URL}/api/userauth/${params.clientId}`,
        config
      );
      if (response) {
        setUserId(response.data._id);
        setSelectValue(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [params.clientId]);

  const handleSelectAppointment = useCallback((slots, patientId, profileSettingId) => {
    if (!slots || slots.length === 0) {
      console.error("No appointment slots available");
      return;
    }
    setSelectValue(prev => ({ ...prev, slotId: slots._id }));
    setSelectedStartDate(slots.startDateTime);
    setSelectedEndDate(slots.endDateTime);
    setSelectedSlot(slots);
    fetchData();
    setAppointmentSelected(true);
  }, [fetchData]);

  const next = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowNextModal(true);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prevCurrent => prevCurrent - 1);
  }, []);

  useEffect(() => {
    const { name, reasonForVisit } = selectValue;
    const isInputEmpty = !name || !reasonForVisit;
    setIsDisable(isInputEmpty);
  }, [selectValue, isCheck, selectedEndDate]);

  const makePayment = useCallback(async () => {
    setLoading(true);
    try {
      const stripe = await loadStripe(
        "pk_live_51OtqzOL2n4fvLXRVpz777ghjhgjgjgzxczxrtrjljk"
      );
      const body = {
        products: [{ ...selectedService }],
      };
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `${BASE_URL}/api/stripe/checkout`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
    setLoading(false);
  }, [selectedService]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully Appointment Scheduled");
      setSelectValue(initialValue);
      dispatch(addInvoice({ ...appointmentData }));
      navigation(`/booking/success/${appointmentData?.id}`);
    }
    if (isError) {
      message.error(error?.data?.message || "An error occurred");
    }
  }, [isSuccess, isError, appointmentData, error, dispatch, navigation]);

  const fetchServiceDetails = useCallback(async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BASE_URL}/api/services`,
        config
      );
      const activeServices = response.data.filter(
        (service) => service.status === true
      );
      setServiceDetails(activeServices);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  }, []);

  useEffect(() => {
    fetchServiceDetails();
  }, [fetchServiceDetails]);

  useEffect(() => {
    if (serviceDetails) {
      const { serviceAmount, serviceCharge } = serviceDetails;
      const total = (serviceAmount || 0) + (serviceCharge || 0);
      setTotalAmount(total);
    }
  }, [serviceDetails]);

  useEffect(() => {
    refreshTour();
  }, [current, refreshTour]);

  const handleConfirmAppointment = useCallback(async () => {
    setLoading(true);
    setSelectValue(prev => ({ ...prev, id: userId }));
    const {
      name, email, emergencyContact, reasonForVisit,
      gender, address, bloodGroup, image
    } = selectValue;
    const { endDateTime, startDateTime } = selectedSlot;
    const { serviceName, price } = selectedService;
    const appointmentData = new FormData();
    appointmentData.append('id', userId);
    appointmentData.append('name', name);
    appointmentData.append('email', email);
    appointmentData.append('emergencyContact', emergencyContact);
    appointmentData.append('reasonForVisit', reasonForVisit);
    appointmentData.append('image', image);
    appointmentData.append('gender', gender);
    appointmentData.append('address', address);
    appointmentData.append('bloodGroup', bloodGroup);
    appointmentData.append("endDateTime", endDateTime);
    appointmentData.append("startDateTime", startDateTime);
    appointmentData.append("serviceName", serviceName);
    appointmentData.append("price", price);

    const savedAttachments = JSON.parse(localStorage.getItem("attachments")) || [];
    if (Array.isArray(savedAttachments) && savedAttachments.length > 0) {
      savedAttachments.forEach((attachment, index) => {
        if (attachment.base64 && typeof attachment.base64 === 'string' && attachment.base64.includes(',')) {
          const [header, data] = attachment.base64.split(',');
          const mimeMatch = header.match(/:(.*?);/);
          if (mimeMatch) {
            const mime = mimeMatch[1];
            const blob = new Blob([new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))], { type: mime });
            const file = new File([blob], attachment.name || `file${index}`, { type: mime });
            appointmentData.append("files", file);
          }
        }
      });
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${BASE_URL}/api/web/`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      await axios.post(`${BASE_URL}/api/send-confirmation-email`, { email, name, bloodGroup, emergencyContact, gender }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment scheduled successfully!");
      await axios.delete(`${BASE_URL}/api/schedule/${selectedSlot._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setShowModal(true);
      setShowAppointmentDetails(true);
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, selectValue, selectedSlot, selectedService]);

  const steps = [
    {
      title: "Select Appointment Date & Time",
      content: (
        <SelectAppointment
          handleSelectAppointment={handleSelectAppointment}
          patientId={userId}
        />
      ),
    },
    {
      title: "Patient Information",
      content: (
        <PersonalInformation
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          selectValue={selectValue}
          handleConfirmAppointment={handleConfirmAppointment}
          selectedSlot={selectedSlot}
        />
      ),
    },
    {
      title: "Services",
      content: (
        <ServiceSelector
          serviceDetails={serviceDetails}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          setIsConfirmDisable={setIsConfirmDisable}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      {!hideHeader && <Header appointmentSelected={appointmentSelected} />}
      <div className={hideHeader ? "" : "container"} style={hideHeader ? { marginTop: "0px" } : { paddingTop: "80px" }}>
        <div
          className={hideHeader ? "" : "container"}
          style={hideHeader ? { marginBottom: "1rem", marginTop: "0px" } : { marginBottom: "1.5rem", marginTop: "0px" }}
        >
          <div id="tour-appointment-steps">
            <Steps current={current} items={items} />
          </div>
          <div className="mb-2 mt-2 mx-1">{steps[current].content}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", padding: "0 0.5rem" }}>
            <div>
              {current > 0 && (
                <Button
                  size="large"
                  onClick={prev}
                  icon={<ArrowLeftOutlined />}
                  style={{ borderRadius: "8px", fontWeight: "600", color: "#64748b", border: "1px solid #cbd5e1" }}
                >
                  Previous
                </Button>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {current < steps.length - 1 ? (
                <Button
                  id={current === 0 ? "tour-appointment-next-slots" : "tour-appointment-next-details"}
                  type="primary"
                  size="large"
                  disabled={current === 0 ? !(selectedStartDate && selectedEndDate) : isDisable}
                  onClick={next}
                  style={{
                    borderRadius: "8px",
                    fontWeight: "600",
                    padding: "0 24px",
                    boxShadow: !(current === 0 ? !(selectedStartDate && selectedEndDate) : isDisable) ? "0 4px 12px rgba(24, 144, 255, 0.2)" : "none"
                  }}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  id="tour-appointment-confirm"
                  type="primary"
                  size="large"
                  disabled={isConfirmDisable || loading}
                  onClick={handleConfirmAppointment}
                  style={{
                    borderRadius: "8px",
                    fontWeight: "600",
                    padding: "0 28px",
                    boxShadow: !(isConfirmDisable || loading) ? "0 4px 12px rgba(24, 144, 255, 0.2)" : "none"
                  }}
                >
                  {loading ? <LoadingOutlined style={{ fontSize: '18px' }} /> : "Confirm Appointment"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AppointmentModals
        showModal={showModal}
        setShowModal={setShowModal}
        showNextModal={showNextModal}
        setShowNextModal={setShowNextModal}
        selectValue={selectValue}
        selectedService={selectedService}
        isConfirmDisable={isConfirmDisable}
        loading={loading}
        makePayment={makePayment}
        current={current}
        setCurrent={setCurrent}
        fetchData={fetchData}
      />
    </>
  );
};

export default AppointmentPage;