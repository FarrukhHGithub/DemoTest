import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { BiUserPlus } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePassword from "../components/UsedComp/ChangePassword";
import Header from "../Layout/Header";
import { useLocation } from "react-router-dom";
import BASE_URL from "../baseUrl.jsx";
import { Button, Input } from "../components/Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from 'react-hot-toast';
import { useAuth } from "../AuthContext";
function Settings() {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuth();
  const id = user?.id;
  console.log("Auth ID:", id);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
  
      if (!id) {
        console.log("❌ No ID found, skipping fetch");
        return;
      }
  
      try {
        const response = await fetch(`${BASE_URL}/api/auth/get/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
  
          setName(data.name || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
  
          const cleanPath = data.profileImage
            .replace(/^api\//, "")
            .replace(/^uploads\/uploads/, "uploads");
  
          setProfileImage(`${BASE_URL}/${cleanPath}`);
        } else {
          console.error("Failed to fetch user details");
          toast.error('Fail to get data check internet Connections.');
        }
  
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserData();
  }, [id]);

  const tabs = [
    { id: 1, name: "Personal Information", icon: BiUserPlus },
    { id: 2, name: "Change Password", icon: RiLockPasswordLine },
  ];
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {

    // 🔥 ADD THIS HERE (FIRST THING)
    if (!id) {
      toast.error("User not logged in");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
  
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }
  
    const apiEndpoint = `${BASE_URL}/api/auth/user/${id}`;
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Profile updated successfully.");
        console.log("User updated successfully:", data);
        setSelectedFile(null);
      } else {
        console.error("Error updating user:", data);
        toast.error("Failed to update Profile");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const renderProfilePicture = () => {
    return (
      <div className="flex justify-center items-center flex-col">
        {profileImage ? (
        <img
        src={profileImage}
         alt="Profile"
         className="w-28 h-28 rounded-full object-cover border border-dashed border-subMain"
      />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center border border-dashed border-subMain">
            <span className="text-2xl text-gray-600"></span>
          </div>
        )}
        <div className="gap-1 flex-col text-center mt-3">
          <h2 className="text-xs font-bold text-main">{name}</h2>
          <p className="text-[11px] text-textGray">{email}</p>
          <p className="text-[11px] text-textGray">{phone}</p>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="flex flex-col gap-3">
        <Input
          label="Full Name"
          type="text"
          value={name}
          color="true"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Phone Number"
          type="text"
          color="true"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          color="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Address"
          type="text"
          color="true"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div>
          <p className="text-xs font-semibold text-main mb-1">Profile Image</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
          <Button
            label={"Save Changes"}
            Icon={HiOutlineCheckCircle}
            onClick={handleSave}
          />
        </div>
      </div>
    );
  };

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return "Personal Information";
      case 2:
        return "Change Password";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <h1 className="text-lg sm:text-xl font-bold text-main">Settings</h1>

      <div className="grid grid-cols-12 gap-4 sm:gap-5 my-5 items-start">
        <div id="tour-settings-tabs" className="col-span-12 flex flex-col gap-4 lg:col-span-4 bg-white rounded-xl border border-border p-4 sm:p-5 lg:sticky top-20 shadow-xs">
          {renderProfilePicture()}
          <h2 className="text-center text-sm font-bold text-main mt-2">{tabPanel()}</h2>

          {/* Tab Navigation */}
          <div className="flex flex-col gap-2 w-full">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`${
                  activeTab === tab.id
                    ? "bg-subMain/10 text-subMain border-l-4 border-subMain font-semibold shadow-xs"
                    : "bg-dry text-main hover:bg-gray-100 hover:text-subMain"
                } text-xs gap-3 flex items-center w-full py-2.5 px-3 rounded-lg transition-colors`}
              >
                <tab.icon className="text-base" /> {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Actual Form Content) */}
        <div id="tour-settings-content" className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-border p-4 sm:p-5 shadow-xs">
          {activeTab === 1 && renderForm()}
          {activeTab === 2 && <ChangePassword />}
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
