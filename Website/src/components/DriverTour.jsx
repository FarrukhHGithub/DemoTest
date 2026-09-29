import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useDriverTour } from '../hooks/useDriverTour';
import { TOUR_STEPS } from '../constant/tourSteps';

// Helper function to handle step transition clicks outside the component body
const handleTourNextClick = (
  step, 
  options, 
  availableSteps, 
  allSteps, 
  activeTourId, 
  isFinishedRef, 
  isProgrammaticDestroyRef, 
  setActiveTourId
) => {
  if (step.element === '#tour-appointment-next-slots') {
    const nextBtn = document.querySelector('#tour-appointment-next-slots');
    if (nextBtn) {
      if (nextBtn.disabled) return;
      isProgrammaticDestroyRef.current = true;
      nextBtn.click();
      options.driver.destroy();
      return;
    }
  }
  if (step.element === '#tour-appointment-next-details') {
    const nextBtn = document.querySelector('#tour-appointment-next-details');
    if (nextBtn) {
      if (nextBtn.disabled) return;
      isProgrammaticDestroyRef.current = true;
      nextBtn.click();
      options.driver.destroy();
      return;
    }
  }

  if (options.index === availableSteps.length - 1) {
    const isLastStepOverall = step.originalIndex === allSteps.length - 1;
    if (isLastStepOverall) {
      isFinishedRef.current = true;
      localStorage.setItem(`${activeTourId}-tour-completed`, 'true');
      localStorage.removeItem(`${activeTourId}-tour-current-step`);
      options.driver.destroy();
      setActiveTourId(null);
    } else {
      isProgrammaticDestroyRef.current = true;
      options.driver.destroy();
    }
  } else {
    options.driver.moveNext();
  }
};

/**
 * Renders the Driver.js tour runner. It synchronizes with route changes,
 * filters steps dynamically depending on DOM presence, and handles persistence.
 */
export default function DriverTour() {
  const { activeTourId, setActiveTourId, refreshKey } = useDriverTour();
  const location = useLocation();
  const driverInstanceRef = useRef(null);
  const isFinishedRef = useRef(false);
  const isProgrammaticDestroyRef = useRef(false);

  // Clean up driver on location, activeTourId or refreshKey change
  useEffect(() => {
    return () => {
      if (driverInstanceRef.current) {
        isProgrammaticDestroyRef.current = true;
        driverInstanceRef.current.destroy();
        driverInstanceRef.current = null;
      }
    };
  }, [location.pathname, activeTourId, refreshKey]);

  useEffect(() => {
    if (!activeTourId) return;

    const timer = setTimeout(() => {
      const allSteps = TOUR_STEPS[activeTourId];
      if (!allSteps) {
        console.warn(`Tour steps not configured for: ${activeTourId}`);
        setActiveTourId(null);
        return;
      }

      // Filter steps dynamically based on elements present in the DOM
      const stepsWithOriginalIndex = allSteps.map((step, idx) => ({
        ...step,
        originalIndex: idx
      }));

      const availableSteps = stepsWithOriginalIndex.filter(step => {
        try {
          return document.querySelector(step.element) !== null;
        } catch (err) {
          return false;
        }
      });

      if (availableSteps.length === 0) return;

      const savedStepStr = localStorage.getItem(`${activeTourId}-tour-current-step`);
      const savedStepIndex = savedStepStr ? parseInt(savedStepStr, 10) : 0;

      let startIdxInAvailable = availableSteps.findIndex(
        step => step.originalIndex >= savedStepIndex
      );

      if (startIdxInAvailable === -1) {
        startIdxInAvailable = 0;
      }

      // Construct Driver.js steps
      const driverSteps = availableSteps.map(step => ({
        element: step.element,
        popover: {
          ...step.popover,
          onNextClick: (element, driveStep, options) => {
            handleTourNextClick(
              step, 
              options, 
              availableSteps, 
              allSteps, 
              activeTourId, 
              isFinishedRef, 
              isProgrammaticDestroyRef, 
              setActiveTourId
            );
          }
        }
      }));

      isFinishedRef.current = false;
      isProgrammaticDestroyRef.current = false;

      // Initialize Driver.js v1.x instance
      const d = driver({
        steps: driverSteps,
        animate: true,
        overlayColor: 'rgba(5, 51, 92, 0.65)',
        allowClose: true,
        allowKeyboardControl: true,
        popoverClass: 'medical-dashboard-tour',
        showProgress: true,
        progressText: 'Step {{current}} of {{total}}',
        onHighlightStarted: (element, step, options) => {
          const currentAvailStep = availableSteps[options.index];
          if (currentAvailStep) {
            localStorage.setItem(`${activeTourId}-tour-current-step`, currentAvailStep.originalIndex.toString());
          }
        },
        onDestroyStarted: (element, step, options) => {
          if (!isProgrammaticDestroyRef.current) {
            if (!isFinishedRef.current) {
              const currentAvailStep = availableSteps[options.index];
              if (currentAvailStep) {
                localStorage.setItem(`${activeTourId}-tour-current-step`, currentAvailStep.originalIndex.toString());
              }
            } else {
              localStorage.removeItem(`${activeTourId}-tour-current-step`);
            }
            setActiveTourId(null);
          } else {
            const currentAvailStep = availableSteps[options.index];
            if (currentAvailStep) {
              localStorage.setItem(`${activeTourId}-tour-current-step`, currentAvailStep.originalIndex.toString());
            }
          }
        }
      });

      driverInstanceRef.current = d;

      try {
        d.drive(startIdxInAvailable);
      } catch (err) {
        console.error("Driver.js error on starting:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, activeTourId, refreshKey, setActiveTourId]);

  return null;
}
