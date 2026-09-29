// healthInfoController.js

import HealthInformation from '../../models/HealthInfo/healthInfo.js';
import PatientHistory from "../../models/History/historyModel.js";

export const createHealthInformation = async (req, res) => {
    try {
    const {
    patientId,
    bloodType,
    weight,
    height,
    allergies,
    habits,
    medicalHistory
    } = req.body;
    
    
    const newHealthInformation = new HealthInformation({
    patientId,
    bloodType,
    weight,
    height,
    allergies,
    habits,
    medicalHistory
    });
    
    const savedHealthInformation = await newHealthInformation.save();
    
    // await PatientHistory.updateOne(
    //     { patientId: savedHealthInformation.patientId },
    //     {
    //       $set: {
    //         patientId: savedHealthInformation.patientId
    //       },
    //       $push: {
    //         healthInformation: savedHealthInformation.toObject()
    //       }
    //     },
    //     { upsert: true }
    //   );
    
    res.status(201).json(savedHealthInformation);
    
    
    } catch (error) {
    res.status(400).json({
    message: error.message
    });
    }
    };

export const getAllHealthInformation = async (req, res) => {
    try {
        const healthInformation = await HealthInformation.find();
        res.status(200).json(healthInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHealthInformationByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const healthInformation = await HealthInformation.find({ patientId });
        if (!healthInformation) {
            return res.status(404).json({ message: "Health information not found for the specified patient ID" });
        }
        res.status(200).json(healthInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHealthInformationByPatientId = async (req, res) => {
  try {
      const { patientId } = req.params;

      const {
          bloodType,
          weight,
          height,
          allergies,
          habits,
          medicalHistory
      } = req.body;

      const updatedHealthInformation =
          await HealthInformation.findOneAndUpdate(
              { patientId },
              {
                  bloodType,
                  weight,
                  height,
                  allergies,
                  habits,
                  medicalHistory
              },
              { new: true }
          );

      if (!updatedHealthInformation) {
          return res.status(404).json({
              message: "Health information not found for the specified patient ID"
          });
      }

      console.log("========== UPDATED HEALTH INFORMATION ==========");
      console.log(updatedHealthInformation);
      console.log("Patient ID:", updatedHealthInformation.patientId);

    //   const historyResult = await PatientHistory.updateOne(
    //       { patientId: updatedHealthInformation.patientId },
    //       {
    //           $set: {
    //               patientId: updatedHealthInformation.patientId
    //           },
    //           $push: {
    //               healthInformation: {
    //                   ...updatedHealthInformation.toObject(),
    //                   action: "updated",
    //                   historyCreatedAt: new Date()
    //               }
    //           }
    //       },
    //       { upsert: true }
    //   );

    //   console.log("========== HISTORY RESULT ==========");
    //   console.log(historyResult);

      const historyDoc = await PatientHistory.findOne({
          patientId: updatedHealthInformation.patientId
      });

    //   console.log("========== HISTORY DOCUMENT ==========");
    //   console.log(JSON.stringify(historyDoc, null, 2));

      res.status(200).json(updatedHealthInformation);

  } catch (error) {
      console.error("UPDATE ERROR:", error);

      res.status(500).json({
          message: error.message
      });
  }
};

export const deleteHealthInformationByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const deletedHealthInformation = await HealthInformation.findOneAndDelete({ patientId });
        if (!deletedHealthInformation) {
            return res.status(404).json({ message: "Health information not found for the specified patient ID" });
        }
        res.status(200).json({ message: "Health information deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
