import React, { createContext, useState, useEffect } from 'react';

// Create a context for the walkthrough tours
export const TourContext = createContext(null);

/**
 * Provider component to manage active tour state and actions.
 */
export function TourProvider({ children }) {
  const [activeTourId, setActiveTourId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-start dashboard tour for first-time users upon loading the app
  useEffect(() => {
    const isCompleted = localStorage.getItem('dashboard-tour-completed') === 'true';
    if (!isCompleted) {
      setActiveTourId('dashboard');
    }
  }, []);

  // Starts or resumes a specified tour
  const startTour = (tourId) => {
    setActiveTourId(tourId);
  };

  // Clears progress and restarts a specified tour from the first step
  const resetTour = (tourId) => {
    localStorage.removeItem(`${tourId}-tour-completed`);
    localStorage.removeItem(`${tourId}-tour-current-step`);
    setActiveTourId(tourId);
    setRefreshKey(prev => prev + 1);
  };

  // Checks if a specified tour has been fully completed
  const isTourCompleted = (tourId) => {
    return localStorage.getItem(`${tourId}-tour-completed`) === 'true';
  };

  // Manually trigger a refresh/re-run of the tour steps
  const refreshTour = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <TourContext.Provider
      value={{
        activeTourId,
        setActiveTourId,
        startTour,
        resetTour,
        isTourCompleted,
        refreshKey,
        refreshTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

