// controllers/doctorController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Doctor from "../../models/doctor/doctor.js";

import { uploadToCloudinary } from '../../../utils/cloudinary.js';

export const createDoctor = async (req, res) => {
    try {
        const { fullName, email, phone, address } = req.body;
        if (!email || !req.file) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await uploadToCloudinary(req.file.buffer, 'doctors');
        const profileImage = result.secure_url;

        const doctor = new Doctor({
            fullName,
            email,
            phone,
            address,
            profileImage
        });

        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ error: 'Failed to create doctor' });
    }
};
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
};
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        res.status(500).json({ error: 'Failed to fetch doctor' });
    }
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const updateDoctor = async (req, res) => {
    try {
        console.log('Request Params ID:', req.params.id);
        console.log('Request Body:', req.body);
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'doctors');
            req.body.profileImage = result.secure_url;  // Assign the new file url to the profileImage field
        }
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Updated doctor:', updatedDoctor);

        if (!updatedDoctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Send back the updated doctor information
        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ error: 'Failed to update doctor' });
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'Failed to delete doctor' });
    }
};
