import { useContext } from 'react';
import { TourContext } from '../components/DriverTourProvider';

export function useDriverTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useDriverTour must be used within a TourProvider');
  }
  return context;
}
