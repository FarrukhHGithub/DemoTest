import React from "react";
import { MenuSelect } from "../components/Form";
import { FaUserCircle } from "react-icons/fa";

export function UserMenu({ profileImage, userName, menuOptions }) {
  return (
    <div id="tour-user-profile" className="items-center flex">
      <MenuSelect datas={menuOptions}>
        <div className="flex gap-2 sm:gap-4 items-center p-1.5 sm:p-2 rounded-lg cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center border border-dashed border-subMain overflow-hidden shrink-0">
            {profileImage ? (
              <img
                src={profileImage}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-2xl sm:text-3xl text-gray-600" />
            )}
          </div>
          <p className="text-xs sm:text-sm text-textGray font-medium hidden md:block">
            {userName || "NOT SET"}
          </p>
        </div>
      </MenuSelect>
    </div>
  );
}
