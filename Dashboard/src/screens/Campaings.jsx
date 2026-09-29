import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
import { toast } from 'react-hot-toast';
import Layout from "../Layout";
import Loader from "../components/Notifications/Loader";
import { Button, MenuSelect } from "../components/Form";
import { BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaShare, FaEdit } from "react-icons/fa";
import axios from "axios";
import ContactSelectionDialog from "./ContactSelectionDialog";
import CampaignModal from "../components/Modals/AddCampagnModal";
import { FiTrash } from "react-icons/fi";
import BASE_URL from "../baseUrl.jsx";

function Campaigns() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [shareMode, setShareMode] = useState(null); 
  const [loading, setLoading] = useState(true);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setShowShareOptions(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData({});
  };

  const updateCampaignsState = (newCampaign) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
  };

  const editCampaign = (campaign) => {
    setIsOpen(true);
    setData(campaign);
  };

  const shareViaWhatsApp = async (campaign) => {
    const { title, description, link, message, image } = campaign;
    let whatsappMessage = `Title: ${title}\nDescription: ${description}\nLink: ${link}\nMessage: ${message}`;
  
    if (image) {
      const fullImageUrl = `${BASE_URL}/${image.replace("\\", "/")}`;
      whatsappMessage += `\nImage: ${fullImageUrl}`;
    }
  
    setMessage(whatsappMessage);

    try {
      const token = localStorage.getItem("token");
      const [patientsResponse, webResponse] = await Promise.all([
        axios.get(`${BASE_URL}/api/patients/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/api/web/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const combinedPatients = [
        ...patientsResponse.data
          .filter((patient) => patient.isArchived !== true)
          .map((patient) => ({
            name: patient.fullName,
            phoneNumber: patient.emergencyContact,
          })),
        ...webResponse.data.map((patient) => ({
          name: patient.patientInfo.name,
          phoneNumber: patient.patientInfo.emergencyContact,
        })),
      ];

      combinedPatients.forEach((patient) => {
        if (
          !contacts.some(
            (contact) => contact.phoneNumber === patient.phoneNumber
          )
        ) {
          setContacts((prevContacts) => [...prevContacts, { ...patient }]);
        }
      });

      setShowShareOptions(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const shareViaEmail = async (campaign) => {
    const { title, description, link, message, image } = campaign;
    let emailMessage = `Title: ${title}\nDescription: ${description}\nLink: ${link}\nMessage: ${message}`;
  
    if (image) {
      const fullImageUrl = `${BASE_URL}/${image.replace("\\", "/")}`;
      emailMessage += `\nImage: ${fullImageUrl}`;
    }
  
    setMessage(emailMessage);

    try {
      const token = localStorage.getItem("token");
      const [patientsResponse, webResponse] = await Promise.all([
        axios.get(`${BASE_URL}/api/patients/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/api/web/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const combinedPatients = [
        ...patientsResponse.data
          .filter((patient) => patient.isArchived !== true)
          .map((patient) => ({
            name: patient.fullName,
            email: patient.email,
          })),
        ...webResponse.data.map((patient) => ({
          name: patient.patientInfo.name,
          email: patient.patientInfo.email,
        })),
      ];

      combinedPatients.forEach((patient) => {
        if (!contacts.some((contact) => contact.email === patient.email)) {
          setContacts((prevContacts) => [...prevContacts, { ...patient }]);
        }
      });

      setShowShareOptions(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const actions = [
    {
      title: "Edit",
      icon: FaEdit,
      onClick: (campaign) => editCampaign(campaign),
    },
    {
      title: "Delete",
      icon: FiTrash,
      onClick: (campaign) => deleteCampaign(campaign._id),
    },
  ];

  useEffect(() => {
    const fetchEmailCampaigns = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/email-campaigns`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching email campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCampaigns();
  }, []);

  const deleteCampaign = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/email-campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign._id !== id)
      );
      toast.success('Campaign deleted successfully.');

      // toast.success("Campaign deleted successfully");
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <Layout>
      {isOpen && (
        <CampaignModal
          isOpen={isOpen}
          closeModal={closeModal}
          data={data}
          updateCampaignsState={updateCampaignsState}
        />
      )}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-2 pb-4 border-b border-border">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-main tracking-tight">Campaign Library</h1>
          <p className="text-xs text-textGray mt-0.5">Create, manage and distribute target email and WhatsApp campaigns to patients.</p>
        </div>
        <div id="tour-add-campaign" className="w-full md:w-auto xs:w-48">
          <Button
            label="Add New"
            Icon={BiPlus}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div id="tour-campaigns-list" className="grid lg:grid-cols-3 sm:grid-cols-2 my-5 gap-4">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Campaign Image or Type Banner */}
                {campaign.image ? (
                  <div className="relative w-full h-36 overflow-hidden bg-slate-50 border-b border-slate-100">
                    <img
                      src={`${BASE_URL}/${campaign.image}`}
                      alt="Campaign"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm shadow-xs px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 text-slate-700">
                      <HiOutlineMail className="text-subMain" size={13} />
                      <span className="capitalize">{campaign.type || 'email'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 pb-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-subMain border border-blue-100">
                      <HiOutlineMail size={13} />
                      <span className="capitalize">{campaign.type || 'email'}</span>
                    </span>
                  </div>
                )}

                {/* Title & Actions */}
                <div className="p-3.5 sm:p-4 pb-2">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 leading-snug">
                      {campaign.title}
                    </h3>
                    <div className="flex-shrink-0">
                      <MenuSelect datas={actions} item={campaign}>
                        <div className="w-7 h-7 text-base rounded-md border border-slate-100 text-slate-500 hover:text-subMain hover:bg-subMain hover:bg-opacity-10 hover:border-subMain/20 transition-all flex items-center justify-center cursor-pointer">
                          <BiDotsVerticalRounded size={16} />
                        </div>
                      </MenuSelect>
                    </div>
                  </div>

                  {/* Message */}
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Message</h4>
                  <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {campaign.message}
                  </p>
                </div>
              </div>

              {/* Footer with date and direct sharing options */}
              <div className="p-3.5 sm:p-4 pt-0">
                <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-3 mt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-100 rounded-md px-2 py-0.5">
                      {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'Date N/A'}
                    </span>
                    
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Quick Share
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="tour-campaign-share-email"
                      onClick={() => {
                        setShareMode("email");
                        shareViaEmail(campaign);
                        setIsDialogOpen(true);
                      }}
                      className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 rounded-lg transition-colors border border-orange-100 cursor-pointer"
                      title="Share via Email"
                    >
                      <HiOutlineMail size={14} />
                      <span>Email</span>
                    </button>
                    
                    <button
                      id="tour-campaign-share-whatsapp"
                      onClick={() => {
                        setShareMode("whatsapp");
                        shareViaWhatsApp(campaign);
                        setIsDialogOpen(true);
                      }}
                      className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-lg transition-colors border border-emerald-100 cursor-pointer"
                      title="Share via WhatsApp"
                    >
                      <FaShare size={10} />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ContactSelectionDialog
        contacts={contacts}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        message={message}
        shareMode={shareMode}
      />
    </Layout>
  );
}

export default Campaigns;
