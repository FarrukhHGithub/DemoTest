import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { FaBirthdayCake } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import axios from "axios";
import BASE_URL from "../baseUrl.jsx";

function NotificationComp({ children }) {
  const [notificationsData, setNotificationsData] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] =
    useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${BASE_URL}/api/web/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNotificationsData(sortedNotifications);

        const unreadCount = sortedNotifications.filter(
          (item) => !item.read
        ).length;

        setUnreadNotificationsCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${BASE_URL}/api/web/notifications/mark-all-read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotificationsData([]);
      setUnreadNotificationsCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button>{children}</Menu.Button>

      <Menu.Items className="flex flex-col w-full sm:w-8/12 md:w-6/12 xl:w-2/6 top-20 right-0 gap-4 absolute bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none z-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            Notifications ({unreadNotificationsCount})
          </h3>

          <button
            onClick={handleMarkAllRead}
            className="text-subMain text-sm"
          >
            Mark all read
          </button>
        </div>

        {notificationsData.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No notifications available
          </div>
        ) : (
          notificationsData.map((item, index) => {
            const startDateTime =
              item?.selectedSlot?.startDateTime ||
              item?.appointments?.[0]?.selectedSlot?.startDateTime;

            return (
              <div
                key={item._id || index}
                className="flex gap-3 border-b pb-3"
              >
                <div
                  className={`${
                    item.action === 1
                      ? "bg-subMain text-white"
                      : "bg-text text-subMain"
                  } w-12 h-12 rounded-full text-md flex items-center justify-center border-[.5px] border-subMain`}
                >
                  {item.action === 1 ? (
                    <FaBirthdayCake />
                  ) : (
                    <BiCalendar />
                  )}
                </div>

                <div className="flex-1">
                  {item.action === 1 ? (
                    <p className="text-sm text-textGray">
                      It's{" "}
                      <span className="text-main font-medium">
                        {item?.patientInfo?.name || "Unknown Patient"}
                      </span>
                      's birthday today
                    </p>
                  ) : (
                    <p className="text-sm text-textGray">
                      Recent appointment with{" "}
                      <span className="text-main font-medium">
                        {item?.patientInfo?.name || "Unknown Patient"}
                      </span>
                      {startDateTime && (
                        <>
                          {" "}
                          at{" "}
                          {new Date(startDateTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      )}
                    </p>
                  )}

                  <div className="text-xs text-gray-500 mt-1">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>

                  {startDateTime && (
                    <div className="text-xs text-gray-500">
                      {new Date(startDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </Menu.Items>
    </Menu>
  );
}

export default NotificationComp;