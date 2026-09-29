import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import BASE_URL from "../../baseUrl.jsx";
import { TransactionRow } from "./TransactionRow";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";

const thclass =
  "text-start text-[11px] font-semibold uppercase tracking-wider text-textGray py-2.5 px-3 border-b border-border bg-gray-50/70 whitespace-nowrap";

export function Transactiontable({
  data,
  action,
  updatedData,
  setUpdatedData,
}) {
  const handleStatusChange = useCallback((e, itemId) => {
    const updatedItems = data.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          status: e.target.value,
        };
      }
      return item;
    });
    setUpdatedData(updatedItems);
  }, [data, setUpdatedData]);

  const handleUpdate = useCallback((itemId) => {
    const itemToUpdate = updatedData.find((item) => item._id === itemId._id);
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/web/${itemToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: itemToUpdate.status,
        method: itemToUpdate.method,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status or method");
        }
        toast.success("Transaction updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating status or method:", error.message);
        toast.error("Failed to update transaction.");
      });
  }, [updatedData]);

  const handleDelete = useCallback((itemId) => {
    const id = itemId._id.toString();
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/web/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete payment");
        }
        const updatedItems = data.filter((item) => item._id !== itemId._id);
        setUpdatedData(updatedItems);
        toast.success("Payment deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting payment:", error.message);
        toast.error("Failed to delete payment.");
      });
  }, [data, setUpdatedData]);

  const DropDown1 = useMemo(() => [
    {
      title: "Update",
      icon: FiEdit,
      onClick: handleUpdate,
    },
    {
      title: "Delete",
      icon: BiTrash,
      onClick: handleDelete,
    },
  ], [handleUpdate, handleDelete]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>Patient</th>
            <th className={thclass}>Date</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>
              Amount <span className="text-xs font-light">(Tsh)</span>
            </th>
            <th className={thclass}>Method</th>
            {action && <th className={thclass}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TransactionRow
              key={item._id || item.id}
              item={item}
              index={index}
              action={action}
              dropDownOptions={DropDown1}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
