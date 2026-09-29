// PersonalInfo.jsx
import React, { useState, useEffect } from "react";
import { sortsDatas } from "../Datas";
import { Button, Select, Input } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseUrl.jsx";
import {
  getServices,
  getAppointmentData,
} from "../../screens/Patients/FetchService/api.js";

function PersonalInfo({ titles }) {
  const [profilePicture, setImageUrl] = useState("");
  const [title, setTitle] = useState(sortsDatas.title[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // State for appointment and service data
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const navigate = useNavigate();

  // Fetch services and appointment data on component mount
  useEffect(() => {
    fetchAppointmentData();
  }, []);

  const fetchAppointmentData = async () => {
    try {
      setIsLoadingData(true);
      const { services, timeSlots } = await getAppointmentData();

      // console.log("Fetched services:", services);
      // console.log("Fetched time slots:", timeSlots);

      // Format services for the Select component
      const formattedServices = services.map((service) => ({
        ...service,
        name: service.name || "Unnamed Service",
        displayPrice: service.price || 0,
      }));

      // Format time slots for the Select component
      const formattedTimeSlots = timeSlots.map((slot) => {
        const start = new Date(slot.startDateTime);
        const end = new Date(slot.endDateTime);
        const timeString = `${start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        return {
          ...slot,
          name: timeString,
          displayTime: timeString,
        };
      });

      setServices(formattedServices);
      setTimeSlots(formattedTimeSlots);

      // IMPORTANT: Keep selections as null (empty by default)
      setSelectedService(null);
      setSelectedTimeSlot(null);
      
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      toast.error("Failed to load services and time slots");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setImageUrl(file);
  };

  const saveChanges = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const data = new FormData();

      // Basic patient info
      data.append("profilePicture", profilePicture);
      data.append("firstName", firstName);
      data.append("email", email);
      data.append("gender", gender?.name?.toLowerCase() || "");
      data.append("emergencyContact", emergencyContact);
      data.append("address", address);
      data.append("bloodGroup", bloodGroup);

      // Appointment and service info - only append if selected
      if (selectedService) {
        data.append("serviceId", selectedService._id);
        data.append("serviceName", selectedService.name);
        data.append("servicePrice", selectedService.price || 0);
      }

      if (selectedTimeSlot) {
        data.append("appointmentSlotId", selectedTimeSlot._id);
        data.append("appointmentStartDateTime", selectedTimeSlot.startDateTime);
        data.append("appointmentEndDateTime", selectedTimeSlot.endDateTime);
      }

      // Add appointment method (default to 'Online')
      data.append("method", "Online");

      await axios.post(`${BASE_URL}/api/patients/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient created and updated successfully");

      // Reset form
      setImageUrl("");
      setTitle(sortsDatas.title[0]);
      setGender(sortsDatas.genderFilter[0]);
      setBloodGroup("");
      setFirstName("");
      setEmail("");
      setEmergencyContact("");
      setAddress("");
      
      // Reset selections to null (empty) after successful save
      setSelectedService(null);
      setSelectedTimeSlot(null);

      navigate("/patients");
    } catch (error) {
      console.error("Error creating patient:", error);
      toast.error("Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Profile Image */}
      <div className="flex flex-col gap-2 sm:gap-3 w-full">
        <p className="text-sm sm:text-base font-medium text-gray-700">
          Profile Image
        </p>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
      </div>

      {/* Title */}
      {titles && (
        <div className="flex flex-col gap-1.5 w-full">
          <p className="text-xs font-semibold text-slate-700">
            Title
          </p>
          <Select
            selectedPerson={title}
            setSelectedPerson={setTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex items-center justify-between text-textGray text-xs sm:text-sm py-2.5 px-3 border border-border font-normal rounded-lg focus-within:border-subMain hover:border-gray-400 transition-colors">
              <span className="truncate">{title?.name}</span>
              <BiChevronDown className="text-lg flex-shrink-0 ml-2" />
            </div>
          </Select>
        </div>
      )}

      {/* Inputs Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        <Input
          label="Full Name"
          color={true}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full"
        />

        <Input
          label="Email"
          color={true}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />

        <Input
          label="Emergency Contact"
          color={true}
          type="text"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          className="w-full"
        />

        <Input
          label="Blood Group"
          color={true}
          type="text"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          placeholder="Enter your blood group"
          className="w-full"
        />

        <Input
          label="Address"
          color={true}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full sm:col-span-2"
        />
      </div>

      {/* Gender */}
      {!titles && (
        <div className="flex flex-col gap-1.5 w-full">
          <p className="text-xs font-semibold text-slate-700">
            Gender
          </p>
          <Select
            selectedPerson={gender}
            setSelectedPerson={setGender}
            datas={sortsDatas.genderFilter}
          >
            <div className="w-full flex items-center justify-between text-textGray text-xs sm:text-sm py-2.5 px-3 border border-border font-normal rounded-lg focus-within:border-subMain hover:border-gray-400 transition-colors">
              <span className="truncate">{gender?.name}</span>
              <BiChevronDown className="text-lg flex-shrink-0 ml-2" />
            </div>
          </Select>
        </div>
      )}

      {/* Service and Time Slot - Responsive Grid */}
      <div className="flex flex-col gap-3 w-full">
        {/* Appointment Section Header */}
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-sm font-bold text-gray-800">
            Appointment Details
          </h3>
          <p className="text-xs text-gray-500">
            If you want to add an appointment to this Patient, please select a
            service and time slot below
          </p>
          <div className="w-full h-px bg-gray-200 my-1"></div>
        </div>

        {/* Service and Time Slot - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
          {/* Service Selection */}
          <div className="flex flex-col gap-1.5 w-full">
            <p className="text-xs font-semibold text-slate-700">
              Select Service
            </p>
            {isLoadingData ? (
              <div className="text-xs text-gray-500 p-2.5 bg-gray-50 rounded-lg animate-pulse">
                Loading services...
              </div>
            ) : services.length > 0 ? (
              <Select
                selectedPerson={selectedService}
                setSelectedPerson={setSelectedService}
                datas={services}
                placeholder="Select a service"
              >
                <div className="w-full flex items-center justify-between text-textGray text-xs sm:text-sm py-2.5 px-3 border border-border font-normal rounded-lg focus-within:border-subMain hover:border-gray-400 transition-colors">
                  <span
                    className={`truncate ${
                      !selectedService ? "text-gray-400" : ""
                    }`}
                  >
                    {selectedService
                      ? `${selectedService.name} ${
                          selectedService.price
                            ? `($${selectedService.price})`
                            : ""
                        }`
                      : "Select a service"}
                  </span>
                  <BiChevronDown className="text-lg flex-shrink-0 ml-2" />
                </div>
              </Select>
            ) : (
              <p className="text-xs text-gray-500 p-2.5 bg-gray-50 rounded-lg">
                No services available
              </p>
            )}
          </div>

          {/* Time Slot Selection */}
          <div className="flex flex-col gap-1.5 w-full">
            <p className="text-xs font-semibold text-slate-700">
              Select Time Slot
            </p>
            {isLoadingData ? (
              <div className="text-xs text-gray-500 p-2.5 bg-gray-50 rounded-lg animate-pulse">
                Loading time slots...
              </div>
            ) : timeSlots.length > 0 ? (
              <Select
                selectedPerson={selectedTimeSlot}
                setSelectedPerson={setSelectedTimeSlot}
                datas={timeSlots}
                placeholder="Select a time slot"
              >
                <div className="w-full flex items-center justify-between text-textGray text-xs sm:text-sm py-2.5 px-3 border border-border font-normal rounded-lg focus-within:border-subMain hover:border-gray-400 transition-colors">
                  <span
                    className={`truncate ${
                      !selectedTimeSlot ? "text-gray-400" : ""
                    }`}
                  >
                    {selectedTimeSlot?.displayTime || "Select a time slot"}
                  </span>
                  <BiChevronDown className="text-lg flex-shrink-0 ml-2" />
                </div>
              </Select>
            ) : (
              <p className="text-xs text-gray-500 p-2.5 bg-gray-50 rounded-lg">
                No time slots available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-3">
        <div className="sm:col-span-2">
          <Button
            label={loading ? "Saving..." : "Save Changes"}
            Icon={HiOutlineCheckCircle}
            onClick={saveChanges}
            disabled={loading || isLoadingData}
          />
        </div>
      </div>

      {/* Optional: Cancel/Back button for mobile */}
      <div className="sm:hidden w-full mt-2">
        <button
          onClick={() => navigate("/patients")}
          className="w-full py-3 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;