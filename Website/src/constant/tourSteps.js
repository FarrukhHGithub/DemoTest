// Steps configuration for Driver.js tours across client Website components
export const TOUR_STEPS = {
  appointment: [
    {
      element: '#tour-dashboard-header',
      popover: {
        title: 'Dashboard Overview',
        description: 'Welcome to your patient panel! From here, you can view your scheduled consultations and medical status.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-dashboard-upcoming',
      popover: {
        title: 'Upcoming Consultations',
        description: 'Review and manage your scheduled doctor consultations here. If you select a slot in the booking stepper, it will appear in this section.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-steps',
      popover: {
        title: 'Booking Progress Tracker',
        description: 'Track your path through the booking process. We guide you step-by-step through Slot Selection, Patient Details, and Service Confirmation.',
        side: 'bottom',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-days',
      popover: {
        title: 'Select Day Filter',
        description: 'Toggle between Today and Tomorrow to filter the list of available doctor time slots.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-appointment-timezone',
      popover: {
        title: 'Display Timezone Preference',
        description: 'Choose your local timezone here. The appointment hours will automatically translate to your local time.',
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#tour-appointment-slots',
      popover: {
        title: 'Available Time Slots',
        description: 'This section displays the available doctor consultation timings grouped by date.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-first-slot-card',
      popover: {
        title: 'How to Select Slot',
        description: 'Choose a timing block by clicking the "Select" button on any card. The selected card will highlight in blue and display a check icon.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-next-slots',
      popover: {
        title: 'Go to Next Step',
        description: 'Once you select a slot, click "Next" to proceed. Next, you will fill in your personal details (Name, Email, emergency contacts) and reason for consultation.',
        side: 'left',
        align: 'center'
      }
    },
    {
      element: '#tour-booking-form',
      popover: {
        title: 'Patient Details (Step 2)',
        description: 'Verify your personal details here: your Name, Email, Gender, Blood Group, and emergency contact details. These details are automatically loaded from your profile.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-reason-input',
      popover: {
        title: 'Reason for Consultation',
        description: 'Describe your symptoms, medical concerns, or reasons for visit. This helps your doctor prepare for the session.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-attachments-area',
      popover: {
        title: 'Upload/Preview Attachments',
        description: 'Any clinical documents or files you uploaded previously in the attachments module will be previewed here automatically.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-next-details',
      popover: {
        title: 'Proceed to Service Selection',
        description: 'After completing your details, click "Next" to choose your clinical service and finalize your appointment.',
        side: 'left',
        align: 'center'
      }
    },
    {
      element: '#tour-services-grid',
      popover: {
        title: 'Clinical Services Selection',
        description: 'Browse the available clinical service options and their corresponding consultation pricing fees.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-first-service-card',
      popover: {
        title: 'How to Select Service',
        description: 'Click on any service package card to choose it. It will highlight in blue and activate the final Confirm button.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-confirm',
      popover: {
        title: 'Choose Service & Confirm (Step 3)',
        description: 'Select your clinical service package, review pricing, and click Confirm to initiate checkout and book your session securely.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  attachments: [
    {
      element: '#tour-attachment-header',
      popover: {
        title: 'Documents Management',
        description: 'Manage and view your uploaded reports, diagnostics records, and previous clinic files.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-attachment-dropzone',
      popover: {
        title: 'Drag and Drop Uploader',
        description: 'Drag and drop clinical files or click to browse. Supports uploading documents up to 2MB in size.',
        side: 'bottom',
        align: 'center'
      }
    },
    {
      element: '#tour-attachment-list',
      popover: {
        title: 'Uploaded Attachments List',
        description: 'Check the status, replace existing files, or delete attachments from this visual registry card list.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-attachment-save',
      popover: {
        title: 'Done & Save Files',
        description: 'Click Done to finalize, apply changes, and save the documents to your account database.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  'change-password': [
    {
      element: '#tour-password-old',
      popover: {
        title: 'Current Password',
        description: 'Type in your old/existing password to authenticate your security identity request.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-password-new',
      popover: {
        title: 'New Secure Password',
        description: 'Enter a strong new password containing at least 8 characters, numbers, uppercase/lowercase letters, and a special character.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-password-save',
      popover: {
        title: 'Save New Password',
        description: 'Click the Save button to update your security credentials in our system records.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  'profile-settings': [
    {
      element: '#tour-profile-avatar',
      popover: {
        title: 'Change Profile Picture',
        description: 'Click here to upload your profile avatar graphics. Max size allowed is 2MB.',
        side: 'bottom',
        align: 'center'
      }
    },
    {
      element: '#tour-profile-fields',
      popover: {
        title: 'Profile Details Form',
        description: 'Edit your contact details, emergency phone number, gender, blood group, or home address.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-profile-save',
      popover: {
        title: 'Apply and Save Changes',
        description: 'Click Save Changes to push and persist updates to your profile database directory.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  prescription: [
    {
      element: '#tour-patient-card',
      popover: {
        title: 'Patient Information Card',
        description: 'Quick view of your gender, blood group, email address, and verified account status.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-patient-stats',
      popover: {
        title: 'Consultation Metrics',
        description: 'Overview statistics: Total appointments booked, total spending revenue, and distinct medical services used.',
        side: 'bottom',
        align: 'center'
      }
    },
    {
      element: '#tour-prescription-table',
      popover: {
        title: 'Consultation Logs Table',
        description: 'Check dates, booked service name details, prices, scheduled hours, and status (e.g. Pending, Completed).',
        side: 'top',
        align: 'center'
      }
    }
  ]
};
