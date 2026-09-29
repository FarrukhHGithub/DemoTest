import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { sortsDatas } from '../Datas';
import { Button, Checkbox, DatePickerComp, Input, Select, Selectt, Textarea, TimePickerComp } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import PatientList from '../../screens/Patients/PatientList';
import { servicesData } from '../Datas';
import BASE_URL from '../../baseUrl.jsx';

function AddAppointmentModal({ closeModal, isOpen, datas, handleNewAppointment, patientId }) {
  const [patientName, setPatientName] = useState('');
  const [services, setServices] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [status, setStatus] = useState(sortsDatas.status[0]);
  const [doctorName, setDoctorName] = useState('');
  const [doctors, setDoctors] = useState([]); // Define doctors state here
  const [shares, setShares] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setDoctors(response.data); // Set the doctors state with the fetched data
      } else {
        console.error('Fetch doctors response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };




  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  const handlePatientSelect = (selectedPatient) => {
    setPatientName(selectedPatient);
  };

  const saveAppointment = () => {
    // Ensure purposeOfVisit is set
    if (!services) {
      toast.error('Purpose of visit is required.');
      return;
    }

    // Format date and time values to strings
    const formattedStartDate = startDate.toISOString();
    const formattedStartTime = startTime.toISOString();
    const formattedEndTime = endTime.toISOString();
    const purposeOfVisit = services.name;
    const data = {
      patientName: patientName,
      purposeOfVisit: purposeOfVisit, // Set purposeOfVisit here
      dateOfVisit: formattedStartDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      doctor: doctors[0]?.fullName, // Assuming the first doctor is selected by default
      status: status.name,
      description: datas?.message,
      share: shares,
      patientId: patientId,
    };
    const apiUrl = `${BASE_URL}/api/appointments`;
    const token = localStorage.getItem('token');

    axios.post(apiUrl, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Appointment saved successfully:', response.data);
        toast.success('Appointment saved successfully');
        closeModal();
        handleNewAppointment(response.data);
      })
      .catch(error => {
        console.error('Error saving appointment:', error);
        toast.error('Error saving appointment. Please try again later.');
      });
  };


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Edit Appointment' : 'New Appointment'}
      width="max-w-3xl"
    >
      <div className="space-y-4 text-left">
        <div className="w-full">
          <PatientList onSelectPatient={handlePatientSelect} setSearchValue={setPatientName} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-1.5">
            <p className="text-slate-700 font-semibold text-xs">Purpose of Visit</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={servicesData.map(service => ({ id: service.id, name: service.name }))}
            >
              <div className="w-full flex justify-between items-center text-slate-700 text-xs sm:text-sm py-2.5 px-3 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <span>{services ? (typeof services === 'object' ? services.name : services) : "Select service.."}</span>
                <BiChevronDown className="text-lg text-slate-400" />
              </div>
            </Select>
          </div>

          <DatePickerComp
            label="Date of Visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Start Time"
            time={startTime}
            onChange={(time) => setStartTime(time)}
          />
          <TimePickerComp
            label="End Time"
            time={endTime}
            onChange={(time) => setEndTime(time)}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-1.5">
            <p className="text-slate-700 font-semibold text-xs">Doctor</p>
            {doctors && doctors.length > 0 ? (
              <Selectt
                selectedPerson={doctorName}
                setSelectedPerson={setDoctorName}
                datas={doctors.map(doctor => doctor.fullName)}
              >
                <div className="w-full flex justify-between items-center text-slate-700 text-xs sm:text-sm py-2.5 px-3 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <span>{doctorName ? doctorName : doctors[0]?.fullName}</span>
                  <BiChevronDown className="text-lg text-slate-400" />
                </div>
              </Selectt>
            ) : (
              <p className="text-xs text-slate-500">No doctors available</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <p className="text-slate-700 font-semibold text-xs">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.status}
            >
              <div className="w-full flex justify-between items-center text-slate-700 text-xs sm:text-sm py-2.5 px-3 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <span>{status ? status.name : "Select status.."}</span>
                <BiChevronDown className="text-lg text-slate-400" />
              </div>
            </Select>
          </div>
        </div>

        <Textarea
          label="Description"
          placeholder={
            datas?.message
              ? datas.message
              : 'She will be coming for a checkup.....'
          }
          color={true}
          rows={3}
        />

        <div className="flex flex-col gap-2 w-full border-t border-slate-100 pt-3">
          <p className="text-slate-700 font-semibold text-xs">Share with Patient Via</p>
          <div className="flex flex-wrap gap-4 mt-0.5">
            <Checkbox
              name="email"
              checked={shares.email}
              onChange={onChangeShare}
              label="Email"
            />
            <Checkbox
              name="sms"
              checked={shares.sms}
              onChange={onChangeShare}
              label="SMS"
            />
            <Checkbox
              checked={shares.whatsapp}
              name="whatsapp"
              onChange={onChangeShare}
              label="WhatsApp"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 w-full pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={saveAppointment}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-xs cursor-pointer"
          >
            Save <HiOutlineCheckCircle className="text-base" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddAppointmentModal;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from './Modal';
// import { sortsDatas } from '../Datas';
// import { Button, Checkbox, DatePickerComp, Input, Select, Selectt, Textarea, TimePickerCompe } from '../Form';
// import { BiChevronDown } from 'react-icons/bi';
// import { HiOutlineCheckCircle } from 'react-icons/hi';
// import { toast } from 'react-hot-toast';
// import PatientList from '../../screens/Patients/PatientList';
// import { servicesData } from '../Datas';

// function AddAppointmentModal({ closeModal, isOpen, datas, handleNewAppointment, patientId }) {
//   const [patientName, setPatientName] = useState('');
//   const [services, setServices] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());
//   const [status, setStatus] = useState(sortsDatas.status[0]);
//   const [doctorName, setDoctorName] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [shares, setShares] = useState({
//     email: false,
//     sms: false,
//     whatsapp: false,
//   });

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('https://server-yvzt.onrender.com/api/doctors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (Array.isArray(response.data)) {
//         setDoctors(response.data);
//       } else {
//         console.error('Fetch doctors response is not an array:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const onChangeShare = (e) => {
//     setShares({ ...shares, [e.target.name]: e.target.checked });
//   };

//   const handlePatientSelect = (selectedPatient) => {
//     setPatientName(selectedPatient);
//   };

//   const saveAppointment = () => {
//     // Ensure endTime is after startTime


//     // Convert dates to ISO strings
//     const formattedStartDate = startDate.toISOString();
//     const formattedStartTime = startTime.toISOString();
//     const formattedEndTime = endTime.toISOString();
//     console.log('Formatted Start Time:', formattedStartTime);
//     console.log('Formatted End Time:', formattedEndTime);
//     console.log('Formatted Start Date:', formattedStartDate);
//     if (endTime <= startTime) {
//       console.log('Start Time:', startTime);
//       console.log('End Time:', endTime);
//       toast.error('End time must be after start time.');
//       return;
//     }
//     const data = {
//       patientName: patientName,
//       purposeOfVisit: services,
//       dateOfVisit: formattedStartDate,
//       startTime: formattedStartTime,
//       endTime: formattedEndTime,
//       doctor: doctors[0]?.fullName,
//       status: status.name,
//       description: datas?.message,
//       share: shares,
//       patientId: patientId,
//     };

//     const apiUrl = 'https://server-yvzt.onrender.com/api/appointments';
//     const token = localStorage.getItem('token');

//     axios.post(apiUrl, data, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(response => {
//         toast.success('Appointment saved successfully');
//         closeModal();
//         handleNewAppointment(response.data);
//       })
//       .catch(error => {
//         console.error('Error saving appointment:', error);
//         toast.error('Error saving appointment. Please try again later.');
//       });
//   };

//   return (
//     <Modal
//       closeModal={closeModal}
//       isOpen={isOpen}
//       title={datas?.title ? 'Edit Appointment' : 'New Appointment'}
//       width={'max-w-3xl'}
//     >
//       <div className="flex-col gap-6">
//         <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
//           <div className="sm:col-span-10">
//             <PatientList onSelectPatient={handlePatientSelect} setSearchValue={setPatientName} />
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-2 gap-4 w-full">
//           <div className="flex w-full flex-col gap-3">
//             <p className="text-black text-sm">Purpose of visit</p>
//             <Select
//               selectedPerson={services}
//               setSelectedPerson={setServices}
//               datas={servicesData.map(service => ({ id: service.id, name: service.name }))}
//             >
//               <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
//                 {services ? services : "Select service.."} <BiChevronDown className="text-xl" />
//               </div>
//             </Select>
//           </div>

//           <DatePickerComp
//             label="Date of visit"
//             startDate={startDate}
//             onChange={(date) => setStartDate(date)}
//           />
//         </div>

//         <div className="grid sm:grid-cols-2 gap-4 w-full">
//           <TimePickerCompe
//             label="Start time"
//             time={startTime}
//             onChange={(time) => setStartTime(time)}
//           />
//           <TimePickerCompe
//             label="End time"
//             time={endTime}
//             onChange={(time) => setEndTime(time)}
//           />
//         </div>

//         <div className="grid sm:grid-cols-2 gap-4 w-full">
//           <div className="flex w-full flex-col gap-3">
//             <p className="text-black text-sm">Doctor</p>
//             {doctors && doctors.length > 0 ? (
//               <Selectt
//                 selectedPerson={doctorName}
//                 setSelectedPerson={setDoctorName}
//                 datas={doctors.map(doctor => doctor.fullName)}
//               >
//                 <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
//                   {doctors[0]?.fullName} <BiChevronDown className="text-xl" />
//                 </div>
//               </Selectt>
//             ) : (
//               <p>No doctors available</p>
//             )}
//           </div>

//           <div className="flex w-full flex-col gap-3">
//             <p className="text-black text-sm">Status</p>
//             <Select
//               selectedPerson={status}
//               setSelectedPerson={setStatus}
//               datas={sortsDatas.status}
//             >
//               <div
//                 className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
//                 {status.name} <BiChevronDown className="text-xl" />
//               </div>
//             </Select>
//           </div>
//         </div>

//         <Textarea
//           label="Description"
//           placeholder={
//             datas?.message
//               ? datas.message
//               : 'She will be coming for a checkup.....'
//           }
//           color={true}
//           rows={5}
//         />

//         <div className="flex-col flex gap-8 w-full">
//           <p className="text-black text-sm">Share with</p>
//           <div className="flex flex-wrap sm:flex-nowrap gap-4">
//             <Checkbox
//               name="email"
//               checked={shares.email}
//               onChange={onChangeShare}
//               label="Email"
//             />
//             <Checkbox
//               name="sms"
//               checked={shares.sms}
//               onChange={onChangeShare}
//               label="SMS"
//             />
//             <Checkbox
//               checked={shares.whatsapp}
//               name="whatsapp"
//               onChange={onChangeShare}
//               label="WhatsApp"
//             />
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-2 gap-4 w-full">
//           <button
//             onClick={closeModal}
//             className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
//             {datas?.title ? 'Discard' : 'Cancel'}
//           </button>
//           <Button
//             label="Save"
//             Icon={HiOutlineCheckCircle}
//             onClick={saveAppointment}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default AddAppointmentModal;

