import { useContext } from 'react';
import { TourContext } from '../components/DriverTourProvider';

/**
 * Custom hook to consume the TourContext.
 * Offers access to activeTourId, startTour, resetTour, and isTourCompleted.
 */
export function useDriverTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useDriverTour must be used within a TourProvider');
  }
  return context;
}
