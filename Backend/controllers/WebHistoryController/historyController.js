import WebHistory from "../../models/WebHistory/history.js";

export const getWebHistoryByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    console.log("=================================");
    console.log("Fetching Web History");
    console.log("Requested Email:", email);

    if (!email) {
      console.log("❌ Email is missing");

      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const history = await WebHistory.find({
      "patientInfo.email": email,
    }).sort({ createdAt: -1 });

    console.log("=================================");
    console.log(`Total Records Found: ${history.length}`);

    history.forEach((record, index) => {
      console.log(`\n========= Record ${index + 1} =========`);
      console.log("ID:", record._id);
      console.log("Patient ID:", record.patientId);
      console.log("Name:", record.patientInfo?.name);
      console.log("Email:", record.patientInfo?.email);
      console.log("Image:", record.patientInfo?.image);
      console.log("Attachments:", record.patientInfo?.attachment);
      console.log("Service:", record.appointment?.selectedService?.serviceName);
      console.log(
        "Start Time:",
        record.appointment?.selectedSlot?.startDateTime
      );
      console.log(
        "End Time:",
        record.appointment?.selectedSlot?.endDateTime
      );
      console.log("Created At:", record.createdAt);
    });

    console.log("=================================");
    console.log("Complete History Object:");
    console.dir(history, { depth: null });

    return res.status(200).json({
      success: true,
      total: history.length,
      data: history,
    });
  } catch (error) {
    console.error("=================================");
    console.error("Error Fetching Web History");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};