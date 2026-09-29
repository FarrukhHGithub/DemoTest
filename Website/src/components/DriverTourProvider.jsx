import React, { createContext, useState, useMemo, useCallback } from 'react';

// Create a context for the walkthrough tours
export const TourContext = createContext(null);

/**
 * Provider component to manage active tour state and actions.
 */
export function TourProvider({ children }) {
  const [activeTourId, setActiveTourId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Starts or resumes a specified tour
  const startTour = useCallback((tourId) => {
    setActiveTourId(tourId);
  }, []);

  // Clears progress and restarts a specified tour from the first step
  const resetTour = useCallback((tourId) => {
    localStorage.removeItem(`${tourId}-tour-completed`);
    localStorage.removeItem(`${tourId}-tour-current-step`);
    setActiveTourId(tourId);
    setRefreshKey(prev => prev + 1);
  }, []);

  // Checks if a specified tour has been fully completed
  const isTourCompleted = useCallback((tourId) => {
    return localStorage.getItem(`${tourId}-tour-completed`) === 'true';
  }, []);

  // Manually trigger a refresh/re-run of the tour steps
  const refreshTour = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const tourValue = useMemo(() => ({
    activeTourId,
    setActiveTourId,
    startTour,
    resetTour,
    isTourCompleted,
    refreshKey,
    refreshTour
  }), [activeTourId, startTour, resetTour, isTourCompleted, refreshKey, refreshTour]);

  return (
    <TourContext.Provider value={tourValue}>
      {children}
    </TourContext.Provider>
  );
}
