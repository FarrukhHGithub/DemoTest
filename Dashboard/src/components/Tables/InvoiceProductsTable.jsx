import React from "react";

export function InvoiceProductsTable({
  data,
  functions,
  button,
  selectedCurrency,
  discount,
  tax,
}) {
  const thclass =
    "p-3 text-left font-medium text-gray-700 border-b border-gray-200";
  const tdclass = "p-3 text-left text-gray-700 border-b border-gray-200";

  const calculateAmount = (price, quantity, discount, tax) => {
    if (isNaN(price) || isNaN(quantity)) {
      console.error("Invalid price or quantity:", price, quantity);
      return 0;
    }

    let amount = price * quantity;

    if (!isNaN(discount)) {
      amount -= (amount * discount) / 100;
    } else {
      console.warn("Discount not provided or invalid:", discount);
    }

    if (!isNaN(tax)) {
      amount += (amount * tax) / 100;
    } else {
      console.warn("Tax not provided or invalid:", tax);
    }

    return amount;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Item</th>
            <th className={thclass}>
              Item Price
              <span className="text-xs font-light ml-1">(Tsh)</span>
            </th>
            <th className={thclass}>Quantity</th>
            <th className={thclass}>
              Amount
              <span className="text-xs font-light ml-1">(Tsh)</span>
            </th>
            {button && <th className={thclass}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={`${tdclass}  font-medium`}>{item.name}</td>
              <td className={`${tdclass} text-xs`}>{item.price}</td>
              <td className={tdclass}>{item.quantity}</td>
              <td className={tdclass}>
                {calculateAmount(item.price, item.quantity, discount, tax)}
              </td>
              {button && (
                <td className={tdclass}>
                  <button
                    onClick={() => functions.deleteItem(item._id)}
                    className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
