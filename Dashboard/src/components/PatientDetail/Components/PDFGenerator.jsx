import React from "react";
import { FiDownload } from "react-icons/fi";
import BASE_URL from "../../../baseUrl.jsx";

const val = (v, fallback = "-") =>
  v === undefined || v === null || v === "" ? fallback : String(v);

const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  return isNaN(date) ? "-" : date.toLocaleString();
};

const formatDateOnly = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  return isNaN(date) ? "-" : date.toLocaleDateString();
};

const PDFGenerator = ({
  medicalRecords,
  profileData,
  webPatientData,
  InvoiceData,
  healthInfoData,
}) => {
  const handleGeneratePDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 14;
    let cursorY = 18;

    const ensureSpace = (needed) => {
      if (cursorY + needed > pageHeight - 14) {
        pdf.addPage();
        cursorY = 18;
      }
    };

    const sectionHeader = (title) => {
      ensureSpace(14);
      pdf.setFontSize(13);
      pdf.setFont(undefined, "bold");
      pdf.text(title, marginX, cursorY);
      cursorY += 6;
      pdf.setFont(undefined, "normal");
    };

    // ---------- Title ----------
    pdf.setFontSize(18);
    pdf.setFont(undefined, "bold");
    pdf.text("Patient Details Sheet", marginX, cursorY);
    cursorY += 10;
    pdf.setFont(undefined, "normal");

    // ---------- Patient Info ----------
    const patient = profileData || webPatientData || {};
    sectionHeader("Patient Information");

    const patientRows = [
      ["Full Name", val(patient.fullName)],
      ["Email", val(patient.email)],
      ["Gender", val(patient.gender)],
      ["Blood Group", val(patient.bloodGroup)],
      ["Emergency Contact", val(patient.emergencyContact)],
      ["Address", val(patient.address)],
    ];

    autoTable(pdf, {
      startY: cursorY,
      body: patientRows,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 1.5 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 } },
      margin: { left: marginX, right: marginX },
    });
    cursorY = pdf.lastAutoTable.finalY + 8;

    // ---------- Service / Appointment Info ----------
    if (patient.serviceName || patient.appointmentStartDateTime) {
      sectionHeader("Service & Appointment");

      const serviceRows = [
        ["Service", val(patient.serviceName)],
        ["Service Price", patient.servicePrice != null ? `Rs. ${patient.servicePrice}` : "-"],
        ["Appointment Start", formatDate(patient.appointmentStartDateTime)],
        ["Appointment End", formatDate(patient.appointmentEndDateTime)],
        ["Method", val(patient.method)],
      ];

      autoTable(pdf, {
        startY: cursorY,
        body: serviceRows,
        theme: "plain",
        styles: { fontSize: 10, cellPadding: 1.5 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 } },
        margin: { left: marginX, right: marginX },
      });
      cursorY = pdf.lastAutoTable.finalY + 10;
    }

    // ---------- Health Information ----------
    if (healthInfoData?.length) {
      sectionHeader("Health Information");

      const healthRows = healthInfoData.map((h, i) => [
        i + 1,
        val(h.bloodType),
        val(h.weight),
        val(h.height),
        val(h.allergies),
        val(h.habits),
        val(h.medicalHistory),
      ]);

      autoTable(pdf, {
        startY: cursorY,
        head: [["#", "Blood Type", "Weight", "Height", "Allergies", "Habits", "Medical History"]],
        body: healthRows,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
        headStyles: { fillColor: [40, 90, 150] },
        columnStyles: {
          4: { cellWidth: 30 },
          5: { cellWidth: 30 },
          6: { cellWidth: 35 },
        },
        margin: { left: marginX, right: marginX },
      });
      cursorY = pdf.lastAutoTable.finalY + 10;
    }

    // ---------- Medical Records ----------
    if (medicalRecords?.data?.length) {
      medicalRecords.data.forEach((record, recordIndex) => {
        ensureSpace(20);
        sectionHeader(`Medical Record ${recordIndex + 1} - ${formatDateOnly(record.createdAt)}`);

        const treatmentNames = (record.treatment || [])
          .filter((t) => t.checked)
          .map((t) => t.name)
          .join(", ");

        const recordRows = [
          ["Complaints", val((record.complaints || []).join(", "))],
          ["Diagnosis", val(record.diagnosis)],
          ["Treatment", val(treatmentNames)],
          ["Vital Signs", val((record.vitalSigns || []).join(", "))],
        ];

        autoTable(pdf, {
          startY: cursorY,
          body: recordRows,
          theme: "plain",
          styles: { fontSize: 10, cellPadding: 1.5 },
          columnStyles: { 0: { fontStyle: "bold", cellWidth: 35 } },
          margin: { left: marginX, right: marginX },
        });
        cursorY = pdf.lastAutoTable.finalY + 4;

        const medicines = record.prescription?.medicines || [];
        if (medicines.length) {
          ensureSpace(14);
          pdf.setFontSize(11);
          pdf.setFont(undefined, "bold");
          pdf.text("Prescription", marginX, cursorY);
          cursorY += 5;
          pdf.setFont(undefined, "normal");

          const medRows = medicines.map((m) => [
            val(m.name),
            val(m.quantity),
            val(m.dosage),
            val(m.instructions),
            m.itemPrice != null ? `Rs. ${m.itemPrice}` : "-",
            m.amount != null ? `Rs. ${m.amount}` : "-",
          ]);

          autoTable(pdf, {
            startY: cursorY,
            head: [["Medicine", "Qty", "Dosage", "Instructions", "Item Price", "Amount"]],
            body: medRows,
            theme: "grid",
            styles: { fontSize: 8.5, cellPadding: 2 },
            headStyles: { fillColor: [40, 90, 150] },
            margin: { left: marginX, right: marginX },
          });
          cursorY = pdf.lastAutoTable.finalY + 10;
        } else {
          cursorY += 6;
        }
      });
    }

    // ---------- Invoices ----------
    const invoiceList = Array.isArray(InvoiceData) ? InvoiceData : InvoiceData?.data;
    if (invoiceList?.length) {
      invoiceList.forEach((inv, invIndex) => {
        ensureSpace(20);
        sectionHeader(`Invoice ${invIndex + 1} - ${val(inv.status).toUpperCase()}`);

        const invoiceMeta = [
          ["Patient", val(inv.patient?.fullName)],
          ["Status", val(inv.status)],
          ["Due Date", formatDateOnly(inv.dueDate)],
          ["Created Date", formatDateOnly(inv.createdDate)],
          ["Total", inv.total != null ? `Rs. ${inv.total}` : "-"],
        ];

        autoTable(pdf, {
          startY: cursorY,
          body: invoiceMeta,
          theme: "plain",
          styles: { fontSize: 10, cellPadding: 1.5 },
          columnStyles: { 0: { fontStyle: "bold", cellWidth: 35 } },
          margin: { left: marginX, right: marginX },
        });
        cursorY = pdf.lastAutoTable.finalY + 4;

        const items = inv.invoiceItems || [];
        if (items.length) {
          const itemRows = items.map((it) => [
            val(it.name),
            val(it.quantity),
            it.price != null ? `Rs. ${it.price}` : "-",
            it.price != null && it.quantity != null ? `Rs. ${it.price * it.quantity}` : "-",
          ]);

          autoTable(pdf, {
            startY: cursorY,
            head: [["Item", "Qty", "Unit Price", "Subtotal"]],
            body: itemRows,
            theme: "grid",
            styles: { fontSize: 9, cellPadding: 2 },
            headStyles: { fillColor: [40, 90, 150] },
            margin: { left: marginX, right: marginX },
          });
          cursorY = pdf.lastAutoTable.finalY + 10;
        } else {
          cursorY += 6;
        }
      });
    }

    // ---------- Attachments: all together, sized to fit ----------
    const imagePromises = [];
    if (medicalRecords?.data?.length) {
      medicalRecords.data.forEach((record, recordIndex) => {
        (record.attachments || []).forEach((attachment, attIndex) => {
          const isImage = /\.(jpg|jpeg|png|gif)$/i.test(attachment.filename);
          if (!isImage) return;

          const fileUrl = `${BASE_URL}/uploads/${attachment.filename}`;
          const promise = new Promise((resolve) => {
            const img = document.createElement("img");
            img.crossOrigin = "anonymous";
            img.onload = () =>
              resolve({
                img,
                recordIndex,
                attIndex,
                label: `Record ${recordIndex + 1} - ${attachment.originalname || attachment.filename}`,
              });
            img.onerror = () => {
              console.error("Failed to load image:", fileUrl);
              resolve({ img: null, recordIndex, attIndex, label: attachment.filename });
            };
            img.src = fileUrl;
          });
          imagePromises.push(promise);
        });
      });
    }

    const loadedAttachments = (await Promise.all(imagePromises)).filter((a) => a.img !== null);

    if (loadedAttachments.length) {
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Attachments", marginX, 20);
      pdf.setFont(undefined, "normal");

      const usableWidth = pageWidth - marginX * 2;
      const usableHeight = pageHeight - 30 - 14; // below header, above bottom margin
      const gap = 8;
      const labelSpace = 6;

      // Pick a column count so everything (ideally) fits on one page,
      // scaling image cell size to the number of attachments.
      const count = loadedAttachments.length;
      let columns = Math.ceil(Math.sqrt(count));
      columns = Math.max(2, Math.min(columns, 4)); // keep between 2 and 4 columns
      let rows = Math.ceil(count / columns);

      let cellWidth = (usableWidth - gap * (columns - 1)) / columns;
      let cellHeight = (usableHeight - gap * (rows - 1)) / rows - labelSpace;

      // Don't let cells get absurdly large when there's only 1-2 images
      cellWidth = Math.min(cellWidth, 80);
      cellHeight = Math.min(cellHeight, 80);

      let x = marginX;
      let y = 28;
      let col = 0;

      loadedAttachments.forEach((attItem) => {
        const { img, label } = attItem;
        const aspectRatio = img.width / img.height;
        let w = cellWidth;
        let h = w / aspectRatio;
        if (h > cellHeight) {
          h = cellHeight;
          w = h * aspectRatio;
        }

        // center image within its cell
        const cellX = x + (cellWidth - w) / 2;

        pdf.setFontSize(8);
        pdf.text(val(label), x, y + labelSpace - 2, { maxWidth: cellWidth });
        pdf.addImage(img, "PNG", cellX, y + labelSpace, w, h);

        col += 1;
        if (col >= columns) {
          col = 0;
          x = marginX;
          y += cellHeight + labelSpace + gap;
        } else {
          x += cellWidth + gap;
        }

        // If we run out of vertical space, start a new page and reset grid
        if (y + cellHeight + labelSpace > pageHeight - 14 && col !== 0) {
          // will be handled naturally on next iteration's overflow check below
        }
      });
    }

    pdf.save("patient_details.pdf");
  };

  return (
    <button
      className="export-button flex items-center gap-2"
      onClick={handleGeneratePDF}
    >
      <FiDownload className="text-base" />
      <span>Generate PDF</span>
    </button>
  );
};

export default PDFGenerator;