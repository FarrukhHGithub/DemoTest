// Steps configuration for Driver.js tours across components
export const TOUR_STEPS = {
  dashboard: [
    {
      element: '#tour-sidebar',
      popover: {
        title: 'Sidebar Navigation',
        description: 'Navigate through all key modules: Patients, Appointments, Invoices, Services, and Settings.',
        side: 'right',
        align: 'start'
      }
    },
    {
      element: '#tour-dashboard-cards',
      popover: {
        title: 'Dashboard Metrics',
        description: 'Monitor key indicators like Total Patients, Today\'s Appointments, and Total Earnings at a glance.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-earning-report',
      popover: {
        title: 'Earning Reports',
        description: 'Track your monthly clinic earnings, growth percentages, and trends visually in this chart.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-patient-transactions',
      popover: {
        title: 'Patient Transactions',
        description: 'Review recent online patient payments, source indicators, and billing transactions.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-recent-patients',
      popover: {
        title: 'Recent Patients',
        description: 'Monitor newly registered or recently checked-in patient profiles at a glance.',
        side: 'left',
        align: 'start'
      }
    },
    {
      element: '#tour-today-appointments',
      popover: {
        title: "Today's Appointments",
        description: "Quickly view and manage scheduled slots, patient info, and appointment statuses for today.",
        side: 'left',
        align: 'start'
      }
    },
    {
      element: '#tour-notifications',
      popover: {
        title: 'System Notifications',
        description: 'Access updates, notifications, and pending web-patient requests here.',
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#tour-user-profile',
      popover: {
        title: 'User Profile & Settings',
        description: 'Update profile details, manage security, sign out, or restart the tour.',
        side: 'bottom',
        align: 'end'
      }
    }
  ],
  patients: [
    {
      element: '#tour-patient-management',
      popover: {
        title: 'Patient Registry',
        description: 'Access the list of all registered patients, search profiles, and filter by gender or date.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-patient-actions',
      popover: {
        title: 'Patient Actions',
        description: 'Click this actions menu (three dots) to edit patient details, delete their profile, or view their medical record history.',
        side: 'left',
        align: 'center'
      }
    },
    {
      element: '#tour-add-patient',
      popover: {
        title: 'Register New Patient',
        description: 'Click here to fill out the form and create a new patient profile.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  appointments: [
    {
      element: '#tour-appointments',
      popover: {
        title: 'Appointments Overview',
        description: 'Track patient visits, appointment status, and configure booking entries.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-calendar',
      popover: {
        title: 'Interactive Scheduler',
        description: 'View clinical slots on a daily, weekly, or monthly calendar layout. To view or manage an appointment, click directly on any colored card inside the scheduler.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '.custom-event',
      popover: {
        title: 'Select an Appointment',
        description: 'Click on any scheduled event block (colored card) in the calendar. This will open the detailed appointment popup.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-appointment-details-modal',
      popover: {
        title: 'Appointment Details & Next Features',
        description: 'Here you can view Schedule Info (service name, pricing) and Patient Info (emergency contact, blood group, gender). It allows you to quickly manage and review individual appointments.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  invoices: [
    {
      element: '#tour-invoices',
      popover: {
        title: 'Billing & Invoices',
        description: 'Access patient bill details, check payment statuses, and print receipts.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-invoice-actions',
      popover: {
        title: 'Invoice Actions',
        description: 'Click this actions menu (three dots) to view the invoice details, mark it as paid, or delete it from the system.',
        side: 'left',
        align: 'center'
      }
    },
    {
      element: '#tour-add-invoice',
      popover: {
        title: 'Create Invoice',
        description: 'Click this button to launch the invoice creation form for patient billing.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  records: [
    {
      element: '#tour-records',
      popover: {
        title: 'Medical Records',
        description: 'Review diagnostics, visit summaries, clinical progress notes, and medication histories.',
        side: 'top',
        align: 'start'
      }
    }
  ],
  services: [
    {
      element: '#tour-services-list',
      popover: {
        title: 'Clinical Services',
        description: 'Configure active medical treatments, clinical departments, and pricing options.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-service-actions',
      popover: {
        title: 'Service Actions',
        description: 'Click this actions menu (three dots) to view, edit, or delete the clinical service details.',
        side: 'left',
        align: 'center'
      }
    },
    {
      element: '#tour-add-service',
      popover: {
        title: 'Add Treatment/Service',
        description: 'Add new clinical treatments or pricing packages directly into the directory.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  medicine: [
    {
      element: '#tour-medicine-list',
      popover: {
        title: 'Pharmacy Stock',
        description: 'Search, review, and adjust details of available medicinal products and stock counts.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-add-medicine',
      popover: {
        title: 'Add Medicine',
        description: 'Log new medicinal formulations, brand names, and dosage information.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  campaigns: [
    {
      element: '#tour-campaigns-list',
      popover: {
        title: 'Outreach Campaigns',
        description: 'View active newsletters and patient updates. Monitor target audience size and types.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-campaign-share-email',
      popover: {
        title: 'Share via Email',
        description: 'Distribute this outreach campaign to your patients via email.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-campaign-share-whatsapp',
      popover: {
        title: 'Share via WhatsApp',
        description: 'Send this outreach campaign directly to patients using WhatsApp.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-add-campaign',
      popover: {
        title: 'Design New Campaign',
        description: 'Click here to construct layout, messages, and dispatch campaigns via email or WhatsApp.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  receptions: [
    {
      element: '#tour-receptions-list',
      popover: {
        title: 'Frontdesk Accounts',
        description: 'Manage details, access permissions, and status of reception/frontdesk staff.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-add-reception',
      popover: {
        title: 'Create Frontdesk User',
        description: 'Add a new receptionist profile to grant them clinic dashboard access.',
        side: 'left',
        align: 'end'
      }
    }
  ],
  settings: [
    {
      element: '#tour-settings-tabs',
      popover: {
        title: 'Settings Category',
        description: 'Switch between personal profile settings, clinic configurations, and password updates.',
        side: 'right',
        align: 'start'
      }
    },
    {
      element: '#tour-settings-content',
      popover: {
        title: 'Preferences Panel',
        description: 'Edit fields, upload profile graphics, and save updates to your dashboard account.',
        side: 'left',
        align: 'start'
      }
    }
  ],
  users: [
    {
      element: '#tour-users-list',
      popover: {
        title: 'User Accounts Directory',
        description: 'View register system users, roles, email accounts, and overall activity status.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-user-appointment',
      popover: {
        title: 'Book Appointment',
        description: 'Click here to quickly configure a clinic appointment for this user.',
        side: 'top',
        align: 'center'
      }
    },
    {
      element: '#tour-user-delete',
      popover: {
        title: 'Delete User Account',
        description: 'Use this button to permanently delete the user account from the system registry.',
        side: 'left',
        align: 'center'
      }
    }
  ],
  payments: [
    {
      element: '#tour-payments-list',
      popover: {
        title: 'Transaction Logs',
        description: 'Monitor recent payment receipts, online payment provider transactions, and check logs.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-online-transactions-table',
      popover: {
        title: 'Online Transactions',
        description: 'Review payments completed online via mobile money or bank cards.',
        side: 'top',
        align: 'start'
      }
    },
    {
      element: '#tour-paid-invoices-table',
      popover: {
        title: 'Paid Invoices',
        description: 'Review historical payments generated from clinic invoicing.',
        side: 'top',
        align: 'start'
      }
    }
  ],
  archived: [
    {
      element: '#tour-archived-search-panel',
      popover: {
        title: 'Search Archived Patients',
        description: 'Find patient records that have been archived by searching their exact email address.',
        side: 'bottom',
        align: 'start'
      }
    },
    {
      element: '#tour-archived-restore-btn',
      popover: {
        title: 'Restore Patient Profile',
        description: 'Click this button to restore the archived patient record back to the active directory.',
        side: 'left',
        align: 'center'
      }
    }
  ]
};
