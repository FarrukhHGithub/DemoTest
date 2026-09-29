import express from 'express';
import * as patientController from '../controllers/PatientController/patients.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();

router.route('/')
    .post(upload.single('profilePicture'), patientController.createPatient)
    .get(patientController.getAllPatients);
router.get('/active', patientController.getAllActivePatients);
router.get('/total-count', patientController.getTotalPatientCount);
router.get('/recent', patientController.fetchRecentPatients);
router.get("/archived",patientController.getArchivedPatients);
router.get('/archived/search',patientController. searchArchivedPatients); // NEW - search with filters
router.get('/archived/email/:email',patientController.getArchivedPatientByEmail); // NEW - get by email
router.put('/restore-by-email', patientController.restorePatientByEmail); // NEW
router.put('/archive-by-email', patientController.archivePatientByEmail); // NEW
router.post('/bulk-restore', patientController.bulkRestorePatientsByEmail);
router.put("/restore/:id", patientController.restorePatient);


router.route('/:id')
    .get(patientController.getPatientById)
    .put(patientController.updatePatient)
    .delete(patientController.deletePatient);
router.put('/:userId/change-password', patientController.changePassword);

export default router;
