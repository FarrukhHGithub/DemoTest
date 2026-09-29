// AddEditMedicineModal component
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import BASE_URL from '../../baseUrl.jsx';

function AddEditMedicineModal({ closeModal, isOpen, onClose, selectedItem }) {
  const [formData, setFormData] = useState({
    name: '',
    measure: sortsDatas.measure[0]?.name || '',
    price: 0,
    stock: 0,
    description: '',
  });

  const [showMeasureOptions, setShowMeasureOptions] = useState(false);
  useEffect(() => {
    if (selectedItem) {
      const selectedMeasure = sortsDatas.measure.find(measure => measure.id === selectedItem.measure);
      setFormData({
        name: selectedItem.medicineName,
        measure: selectedMeasure ? selectedMeasure.name : '', // Use the unit name if found, otherwise an empty string
        price: selectedItem.price,
        stock: selectedItem.inStock,
        description: selectedItem.description,
      });
    }
  }, [selectedItem]);
  console.log(formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleMeasureChange = (selectedMeasureId) => {
    console.log('Selected Measure ID:', selectedMeasureId);
    const selectedMeasure = sortsDatas.measure.find(measure => measure.id === selectedMeasureId);
    console.log('Selected Measure:', selectedMeasure); // Debug log
    if (selectedMeasure) {
      setFormData((prevData) => ({
        ...prevData,
        measure: selectedMeasureId,
      }));
    }
    setShowMeasureOptions(false);
  };

  const handleSubmit = async () => {
    try {
      // If editing an existing medicine, delete the previous entry
      if (selectedItem) {
        const deleteResponse = await fetch(`${BASE_URL}/api/medicine/${selectedItem._id}`, {
          method: 'DELETE',
        });

        if (!deleteResponse.ok) {
          throw new Error('Failed to delete previous medicine entry');
        }
      }

      // Determine the value of the inStock field based on the stock value
      const inStock = formData.stock > 0;

      // Create a new medicine entry with the updated information
      const createResponse = await fetch(`${BASE_URL}/api/medicine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medicineName: formData.name,
          measure: formData.measure,
          price: formData.price,
          inStock: inStock, // Set the value of inStock
          description: formData.description,
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to save data');
      }

      const responseData = await createResponse.json();
      closeModal();
      toast.success('Medicine added successfully');
      onClose(responseData);

    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(error.message);
    }
  };



  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={selectedItem ? "Edit Medicine" : "New Medicine"}
      width="max-w-3xl"
    >
      <div className="space-y-6 text-left">
        <div className="grid sm:grid-cols-2 gap-5 w-full">
          <Input
            name="name"
            label="Medicine Name"
            color={true}
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="flex w-full flex-col gap-2">
            <p className="text-slate-700 font-medium text-sm">Measure</p>
            <div className="relative">
              <div
                className="w-full flex justify-between items-center text-slate-700 text-sm p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setShowMeasureOptions(!showMeasureOptions)}
              >
                <span>{sortsDatas.measure.find(measure => measure.id === formData.measure)?.name || "Select measure..."}</span>
                <BiChevronDown className="text-xl text-slate-400" />
              </div>
              {showMeasureOptions && (
                <div className="absolute z-20 top-full left-0 mt-1 w-full bg-white border border-slate-100 shadow-xl rounded-lg py-1.5 max-h-60 overflow-y-auto">
                  {sortsDatas.measure.map(measure => (
                    <div
                      key={measure.id}
                      className="px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-colors"
                      onClick={() => handleMeasureChange(measure.id)}
                    >
                      {measure.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 w-full">
          <Input
            name="price"
            label="Price (Tsh)"
            type="number"
            color={true}
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input
            name="stock"
            label="Instock"
            type="number"
            color={true}
            value={formData.stock}
            onChange={handleInputChange}
          />
        </div>

        <Textarea
          name="description"
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />

        <div className="grid sm:grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
          >
            Save <HiOutlineCheckCircle className="text-lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEditMedicineModal;