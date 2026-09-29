import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import Loader from '../components/Notifications/Loader';
import { Button } from '../components/Form';
import { ServiceTable } from '../components/Tables';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AddEditServiceModal from '../components/Modals/AddEditServiceModal';
import BASE_URL from '../baseUrl.jsx';

function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/services`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  const onEdit = (data) => {
    setIsOpen(true);
    setData(data);
  };

  const onDelete = async (item) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/services/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServicesData(prevServicesData => prevServicesData.filter(service => service._id !== item._id));
      toast.success('Service deleted successfully.');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const updatedItem = { ...item, status: !item.status };

      await axios.put(`${BASE_URL}/api/services/${item._id}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setServicesData(prevServicesData =>
        prevServicesData.map(service =>
          service._id === item._id ? { ...service, status: !service.status } : service
        )
      );

      toast.success('Service status updated successfully.');
    } catch (error) {
      console.error('Error updating service status:', error);
      toast.error('Failed to update service status. Please try again.');
    }
  };

  const saveService = async (serviceData) => {
    try {
      const token = localStorage.getItem('token');

      if (serviceData._id) {
        const response = await axios.put(`${BASE_URL}/api/services/${serviceData._id}`, serviceData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServicesData(prevData =>
          prevData.map(service => (service._id === serviceData._id ? response.data : service))
        );

        toast.success('Service updated successfully.');
      } else {
        const response = await axios.post(`${BASE_URL}/api/services`, serviceData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServicesData(prevData => [...prevData, response.data]);

        toast.success('Service created successfully.');
      }

      onCloseModal();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service. Please try again.');
    }
  };

  return (
    <Layout>
      {isOpen && (
        <AddEditServiceModal
          datas={data}
          isOpen={isOpen}
          closeModal={onCloseModal}
          onCreate={saveService} // Updated function name
          setServicesData={setServicesData}
        />
      )}

      <button
        onClick={() => setIsOpen(true)}
        id="tour-add-service"
        className="w-12 h-12 animate-bounce border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-6 right-8 button-fb shadow-md hover:bg-opacity-90 flex items-center justify-center"
      >
        <BiPlus className="text-xl" />
      </button>

      <h1 className="text-lg sm:text-xl font-bold text-main">Services</h1>
      <div id="tour-services-list" className="bg-white my-5 rounded-xl border border-border p-4 sm:p-5 shadow-xs">
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 w-full">
            <ServiceTable
              data={servicesData}
              onEdit={onEdit}
              onDelete={onDelete}
              handleStatusToggle={handleStatusToggle}
              setServicesData={setServicesData}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Services;
