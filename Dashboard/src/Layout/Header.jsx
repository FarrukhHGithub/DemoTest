import React, { useState, useEffect } from "react";
import { TbUser, TbCompass, TbRefresh } from "react-icons/tb";
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import NotificationComp from "../components/NotificationComp";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "../components/Drawer/MenuDrawer";
import { BiMenu } from "react-icons/bi";
import { useAuth } from "../AuthContext";
import { useDriverTour } from "../hooks/useDriverTour";
import axios from "axios";
import BASE_URL from "../baseUrl.jsx";
import { UserMenu } from "./UserMenu";
import { PageGuideButton } from "./PageGuideButton";

function Header({ toggleSidebar, sidebarOpen }) {
  const [notificationsData, setNotificationsData] = useState([]);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { startTour, resetTour } = useDriverTour();

  const userId = user?.id;
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      toggleDrawer();
    } else if (toggleSidebar) {
      toggleSidebar();
    }
  };
  const hasSavedStep = localStorage.getItem("dashboard-tour-current-step");

  const DropDown1 = [
    {
      title: "Profile",
      icon: TbUser,
      onClick: () => navigate("/settings"),
    },
    {
      title: hasSavedStep ? "Resume Tour" : "Start Tour",
      icon: TbCompass,
      onClick: () => startTour("dashboard"),
    },
    {
      title: "Restart Tour",
      icon: TbRefresh,
      onClick: () => resetTour("dashboard"),
    },
    {
      title: "Logout",
      icon: AiOutlinePoweroff,
      onClick: () => {
        localStorage.removeItem("token");
        logout();
        navigate("/login");
      },
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${BASE_URL}/api/auth/get/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data;
        setUserName(data.name || "");

        let img = data.profileImage || "";
        if (img.startsWith("http")) {
          setProfileImage(img);
        } else if (img) {
          setProfileImage(`${BASE_URL}/${img.replace(/^\/+/, "")}`);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${BASE_URL}/api/web/notifications`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotificationsData(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const unreadNotificationsCount = notificationsData.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <>
      {isOpen && (
        <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      )}

      <div className="w-full bg-dry flex items-center justify-between bg-opacity-95 sticky top-0 z-40 px-4 sm:px-6 py-2 border-b border-border shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={handleMenuClick}
            title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            className="border text-xl bg-white w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-main hover:bg-subMain hover:text-white transition-all shadow-xs"
          >
            <BiMenu />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <PageGuideButton />

          <NotificationComp>
            <div id="tour-notifications" className="relative cursor-pointer">
              <MdOutlineNotificationsNone className="text-2xl hover:text-subMain" />
              <span className="absolute -top-2.5 -right-2.5 font-semibold bg-subMain rounded-full px-1.5 py-0.5 text-xs text-white">
                {unreadNotificationsCount}
              </span>
            </div>
          </NotificationComp>

          <UserMenu
            profileImage={profileImage}
            userName={userName}
            menuOptions={DropDown1}
          />
        </div>
      </div>
    </>
  );
}

export default Header;