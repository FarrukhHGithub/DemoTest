import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDriverTour } from '../hooks/useDriverTour';
import { FaCompass, FaTimes } from 'react-icons/fa';

/**
 * A floating widget that appears in the bottom right corner of pages supporting a tour.
 * It allows the user to manually trigger the interactive guide and can be dismissed (canceled).
 */
export default function FloatingGuideButton() {
  const { resetTour } = useDriverTour();
  const location = useLocation();
  const [isDismissed, setIsDismissed] = useState(false);

  const pathname = location.pathname;

  const getTourIdForPath = (path) => {
    if (path === '/appointment') return 'appointment';
    if (path.includes('/dashboard/prescription/')) return 'prescription';
    if (path.includes('/dashboard/profile-setting/')) return 'profile-settings';
    if (path.includes('/dashboard/attachments/')) return 'attachments';
    if (path.includes('/dashboard/change-password/')) return 'change-password';
    if (path.startsWith('/dashboard/')) return 'appointment';
    return null;
  };

  const tourId = getTourIdForPath(pathname);

  // Reset the dismissal state when the path changes, so the button is available on other pages
  useEffect(() => {
    setIsDismissed(false);
  }, [pathname]);

  if (!tourId || isDismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '130px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#ffffff',
        padding: '10px 18px',
        borderRadius: '50px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
        border: '1px solid #e2e8f0',
        animation: 'slideDownFloating 0.4s ease-out',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <button
        onClick={() => resetTour(tourId)}
        style={{
          border: 'none',
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#1890ff',
          fontWeight: '600',
          fontSize: '13.5px',
          cursor: 'pointer',
          padding: 0,
          outline: 'none',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#40a9ff'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#1890ff'}
      >
        <FaCompass size={18} />
        <span>Start Page Guide</span>
      </button>
      
      <div style={{ width: '1px', height: '16px', backgroundColor: '#cbd5e1' }} />
      
      <button
        onClick={() => setIsDismissed(true)}
        title="Dismiss Guide Button"
        style={{
          border: 'none',
          background: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
      >
        <FaTimes size={13} />
      </button>

      <style jsx="true">{`
        @keyframes slideDownFloating {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
