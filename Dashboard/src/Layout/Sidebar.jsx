import React from 'react';
import { MenuDatas } from '../components/Datas';
import { Link } from 'react-router-dom';
import pic from '../build/images/upLogo.jpg';

function Sidebar() {
  // active link
  const currentPath = (path) => {
    const currentPath =
      window.location.pathname.split('/')[1] === path.split('/')[1];
    if (currentPath) {
      return path;
    }
    return null;
  };

  return (
    <div id="tour-sidebar" className="bg-white py-4 px-3 h-full w-full border-r overflow-y-auto">
      <div className="mb-2">
        <Link to="/">
          <img
            src={pic}
            alt="logo"
            className="w-40 h-auto mx-auto rounded-lg"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-0.5">
        {MenuDatas.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`
              ${currentPath(item.path) === item.path ? 'bg-text' : ''}
              flex gap-3 items-center w-full py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-all`}
          >
            <item.icon
              className={`text-lg text-subMain shrink-0`}
            />
            <p
              className={`text-xs font-medium ${currentPath(item.path) === item.path
                ? 'text-subMain'
                : 'text-gray-600'
              } hover:text-blue-800`}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
