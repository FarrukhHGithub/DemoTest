// Fetch total patient count
import BASE_URL from '../baseUrl.jsx';

export const fetchTotalPatientCount = async () => {
    try {
        // console.log("🔍 Fetching total patient count...");

        const token = localStorage.getItem("token");
        // console.log("🔑 Token available:", token ? "Yes" : "No");

        const response = await fetch(`${BASE_URL}/api/patients/active`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log("📡 Response status:", response.status);
        // console.log("📡 Response OK:", response.ok);

        if (!response.ok) {
            console.error("❌ Response not OK:", response.status, response.statusText);
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("📊 API Response Data in dashboard charts:", data);
        // console.log("📊 Data type:", typeof data);
        // console.log("📊 Is array:", Array.isArray(data));
        // console.log("📊 Data length:", data?.length || 0);

        // 🔥 FIX: Handle both array and object responses
        let patients = [];

        if (Array.isArray(data)) {
            patients = data;
        } else if (data && typeof data === 'object') {
            // If response has a 'data' property that is an array
            if (data.data && Array.isArray(data.data)) {
                patients = data.data;
            }
            // If response has a 'patients' property that is an array
            else if (data.patients && Array.isArray(data.patients)) {
                patients = data.patients;
            }
            // If response has a 'results' property that is an array
            else if (data.results && Array.isArray(data.results)) {
                patients = data.results;
            }
            // If it's a single object, wrap it in an array
            else if (data._id) {
                patients = [data];
            }
        }

        // console.log("📊 Processed patients array:", patients);
        // console.log("📊 Patients array length:", patients.length);
        // console.log("📊 First patient:", patients[0]);

        // Count only non-archived patients
        const activePatients = patients.filter(p => p.isArchived === false);
        // console.log("📊 Active patients (isArchived: false):", activePatients.length);

        const archivedPatients = patients.filter(p => p.isArchived === true);
        // console.log("📊 Archived patients (isArchived: true):", archivedPatients.length);

        // ✅ Get total patients count (only active/non-archived)
        const totalPatients = activePatients.length;
        // console.log("📈 Total active patients count:", totalPatients);

        const totalPatientsTarget = 100;
        const totalPatientsPercentage = totalPatients > 0
            ? ((totalPatients / totalPatientsTarget) * 100).toFixed(2)
            : "0.00";

        // console.log("🎯 Target:", totalPatientsTarget);
        // console.log("📊 Percentage:", totalPatientsPercentage + "%");

        const result = {
            totalCount: totalPatients,
            percentage: totalPatientsPercentage,
        };

        // console.log("✅ Returning result:", result);
        return result;

    } catch (error) {
        console.error("🔥 Error in fetchTotalPatientCount:", error);
        console.error("🔥 Error message:", error.message);
        console.error("🔥 Error stack:", error.stack);
        throw new Error(`Error fetching total patient count: ${error.message}`);
    }
};


export const fetchwebsitePatient = async () => {
    try {

        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/api/web/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('❌ [fetchwebsitePatient] Failed response');
            throw new Error('Failed to fetch recent transactions');
        }

        const data = await response.json();
        // console.log('📊 [fetchwebsitePatient] API Data:', data);

        return data;

    } catch (error) {
        console.error('🔥 [fetchwebsitePatient] Error:', error);
        throw new Error('Error fetching recent transactions');
    }
};

// api.js

export const fetchRecentPatients = async () => {
    try {
        // console.log("🔍 Fetching recent patients...");

        const token = localStorage.getItem('token');
        // console.log("🔑 Token available:", token ? "Yes" : "No");

        const response = await fetch(`${BASE_URL}/api/patients/recent`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log("📡 Response status:", response.status);

        if (!response.ok) {
            console.error("❌ Response not OK:", response.status, response.statusText);
            throw new Error('Failed to fetch recent patients');
        }

        const data = await response.json();
        // console.log("📊 Recent patients API response:", data);
        // console.log("📊 Data type:", typeof data);
        // console.log("📊 Is array:", Array.isArray(data));

        // Handle different response structures
        let patients = [];

        if (Array.isArray(data)) {
            patients = data;
        } else if (data.data && Array.isArray(data.data)) {
            patients = data.data;
        } else if (data.patients && Array.isArray(data.patients)) {
            patients = data.patients;
        } else if (data.results && Array.isArray(data.results)) {
            patients = data.results;
        }

        // console.log("📊 Total patients fetched:", patients.length);

        // 🔥 FILTER: Only keep non-archived patients (isArchived === false)
        const activePatients = patients.filter(patient => patient.isArchived === false);
        // console.log("📊 Active patients (non-archived):", activePatients.length);

        // Log archived patients count for debugging
        const archivedPatients = patients.filter(patient => patient.isArchived === true);
        // console.log("📊 Archived patients (excluded):", archivedPatients.length);

        // Log sample of active patients
        if (activePatients.length > 0) {
            console.log("📊 Sample active patient:",
                {
                    id: activePatients[0]._id,
                    name: activePatients[0].fullName,
                    email: activePatients[0].email,
                    isArchived: activePatients[0].isArchived
                });
        }

        // Return only active patients
        return activePatients;

    } catch (error) {
        console.error("🔥 Error in fetchRecentPatients:", error);
        console.error("🔥 Error message:", error.message);
        throw new Error(`Error fetching recent patients: ${error.message}`);
    }
};
export const fetchWebPatientTodayAppointments = async () => {
    try {
        // console.log("🔍 Fetching today's appointments...");

        const token = localStorage.getItem('token');
        // console.log("🔑 Token available:", token ? "Yes" : "No");

        const response = await fetch(`${BASE_URL}/api/web/today-appointments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log("📡 Response status:", response.status);

        if (!response.ok) {
            console.error("❌ Response not OK:", response.status, response.statusText);
            throw new Error('Failed to fetch today\'s web appointments');
        }

        const data = await response.json();
        // console.log("📊 Today's appointments API response:", data);

        // 🔥 Handle different response structures
        let appointments = [];
        let stats = {
            web: 0,
            patient: 0,
            total: 0
        };

        // If response has data wrapper with stats
        if (data.data && Array.isArray(data.data)) {
            appointments = data.data;
            if (data.stats) {
                stats = data.stats;
            }
        }
        // If response has data property but not stats
        else if (data.data && Array.isArray(data.data)) {
            appointments = data.data;
        }
        // If response is directly an array
        else if (Array.isArray(data)) {
            appointments = data;
        }
        // If response has appointments property
        else if (data.appointments && Array.isArray(data.appointments)) {
            appointments = data.appointments;
        }
        // If response has webAppointments and patientAppointments
        else if (data.webAppointments && data.patientAppointments) {
            appointments = [...data.webAppointments, ...data.patientAppointments];
            stats = {
                web: data.webAppointments.length,
                patient: data.patientAppointments.length,
                total: appointments.length
            };
        }

        // console.log("📊 Total appointments found:", appointments.length);
        console.log("📊 Appointments breakdown:", {
            web: stats.web || appointments.filter(a => a.source === 'web').length,
            patient: stats.patient || appointments.filter(a => a.source === 'patient').length,
            total: appointments.length
        });

        // Sort appointments by time
        const sortedAppointments = appointments.sort((a, b) => {
            const dateA = a.selectedSlot?.startDateTime || a.appointmentStartDateTime || a.createdAt;
            const dateB = b.selectedSlot?.startDateTime || b.appointmentStartDateTime || b.createdAt;
            return new Date(dateA) - new Date(dateB);
        });

        console.log("📊 Sorted appointments:", sortedAppointments.length);

        // Return with consistent structure
        return {
            success: true,
            count: sortedAppointments.length,
            data: sortedAppointments,
            stats: {
                web: stats.web || sortedAppointments.filter(a => a.source === 'web').length,
                patient: stats.patient || sortedAppointments.filter(a => a.source === 'patient').length,
                total: sortedAppointments.length
            }
        };

    } catch (error) {
        console.error("🔥 Error in fetchWebPatientTodayAppointments:", error);
        console.error("🔥 Error message:", error.message);
        throw new Error(`Error fetching today's appointments: ${error.message}`);
    }
};
// api.js

export const fetchTotalWebPatientCount = async () => {
    try {
        const token = localStorage.getItem('token');
        // console.log('Fetching total web patient count...');
        const response = await fetch(`${BASE_URL}/api/web/total-count`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch total web patient count');
        }
        const data = await response.json();
        // console.log('Total web patient count data:', data);
        const totalCount = data.totalCount;
        const percentage = data.percentage;
        // console.log('Total Count:', totalCount);
        // console.log('Percentage:', percentage);
        return { totalCount, percentage };
    } catch (error) {
        console.error('Error fetching total web patient count:', error);
        throw new Error('Error fetching total web patient count:', error);
    }
};

export const fetchTotalEarnings = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/web/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch web patients');
        }
        const data = await response.json();
        // Calculate total earnings by summing up the prices of all services
        const totalEarnings = data.reduce((total, patient) => {
            return total + parseFloat(patient.selectedService.price);
        }, 0);

        // Assuming totalEarningsTarget is a fixed value
        const totalEarningsTarget = 10000; // Update this with your target value

        // Calculate the percentage
        const percent = (totalEarnings / totalEarningsTarget) * 100;

        return { totalEarnings, percent };
    } catch (error) {
        throw new Error('Error fetching total earnings:', error);
    }
};
export const fetchMonthlyEarnings = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/api/web/monthly-earnings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        //   console.log("Monthly Data:", data); // ✅ correct place

        return data;
    } catch (error) {
        console.error("Error fetching monthly earnings:", error);
        return null;
    }
};











