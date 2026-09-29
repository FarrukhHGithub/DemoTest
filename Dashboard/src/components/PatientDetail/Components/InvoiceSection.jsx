import React from "react";
import { Table } from "antd";
import { invoiceColumns } from "./columns";

const InvoiceSection = ({ InvoiceData }) => {
  const invoices = Array.isArray(InvoiceData) ? InvoiceData : (InvoiceData?.data || []);

  return (
    <div className="patient-details-section invoice">
      <h2 className="section-title">Invoices</h2>
      {invoices.length > 0 ? (
        <div className="overflow-x-auto">
          <Table
            dataSource={invoices}
            columns={invoiceColumns}
            pagination={false}
            bordered
            size="middle"
            scroll={{ x: "max-content" }}
            rowKey={(record) => record._id || record.id || "invoice"}
          />
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="m-0">No invoices found.</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceSection;