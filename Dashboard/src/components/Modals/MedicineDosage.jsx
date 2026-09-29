import React, { useState } from "react";
import Modal from "./Modal";
import { BiPlus } from "react-icons/bi";
import { Button, Checkbox, Input } from "../Form";
import { sortsDatas } from "../Datas";

function MedicineDosageModal({ closeModal, isOpen, addMedicineDosage }) {
  const [dosage, setDosage] = useState(
    sortsDatas.dosage
      ? sortsDatas.dosage.map((item) => ({
          name: item.name,
          checked: false, // Initialize checked property to false
        }))
      : []
  );

  const [quantity, setQuantity] = useState("");
  const [dosageQuantity, setDosageQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [item, setItem] = useState(""); // New state for item
  const [instructionText, setInstructionText] = useState(""); // New state for instruction

  const handleAddButtonClick = () => {
    const medicineDosage = {
      instructions: instructionText, // Include instruction
      quantity: parseInt(quantity),
      dosageQuantity: parseInt(dosageQuantity),
      itemPrice: parseFloat(itemPrice),
      item: item,
      dosage: dosage.filter((item) => item.checked).map((item) => item.name),
      name: item, // Include name
    };

    // Calculate the amount
    const amount =
      parseFloat(itemPrice) * parseInt(quantity) * parseInt(dosageQuantity);

    // Add itemPrice and amount to medicine dosage object
    medicineDosage.amount = amount;

    addMedicineDosage(medicineDosage);
    closeModal();
  };

  const onChangeDosage = (name, checked) => {
    const newDosage = dosage.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setDosage(newDosage);
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Add Medicine Dosage"
      width="max-w-xl"
    >
      <div className="space-y-6 text-left">
        <div className="grid sm:grid-cols-2 gap-5 w-full">
          <Input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            label="Item Name / Medicine"
            color={true}
          />
          <Input
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            label="Item Price (Tsh)"
            color={true}
            type="number"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 w-full">
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            label="Quantity"
            color={true}
            type="number"
          />
          <Input
            value={dosageQuantity}
            onChange={(e) => setDosageQuantity(e.target.value)}
            label="Dosage Quantity (Days)"
            color={true}
            type="number"
          />
        </div>

        <Input
          value={instructionText}
          onChange={(e) => setInstructionText(e.target.value)}
          label="Instruction"
          color={true}
          placeholder="e.g. 1x3 after meals"
        />

        <div className="flex w-full flex-col gap-2 border-t border-slate-100 pt-4">
          <p className="text-slate-700 font-medium text-sm">Dosage Timings</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {dosage.map((item, idx) => (
              <Checkbox
                label={item.name}
                checked={item.checked}
                onChange={(checked) => onChangeDosage(item.name, checked)}
                key={idx}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="w-full px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all duration-200 shadow-sm"
          >
            Add Dosage <BiPlus className="text-lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MedicineDosageModal;
