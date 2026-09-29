import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DriverTour from '../components/DriverTour';

function index({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="bg-dry flex flex-col min-h-screen w-full overflow-x-hidden">
      <div className="flex w-full 2xl:max-w-[2000px] mx-auto min-h-screen">
        {sidebarOpen && (
          <div className="hidden lg:block w-56 shrink-0 h-screen sticky top-0">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          <Header title={title} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className="px-4 sm:px-6 py-4 flex-1 w-full">{children}</main>
        </div>
      </div>
      <DriverTour />
    </div>
  );
}

export default index;
