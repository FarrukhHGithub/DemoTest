import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useDriverTour } from '../hooks/useDriverTour';
import { TOUR_STEPS } from '../constants/tourSteps';

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

    // Small delay to ensure the page has finished rendering/transitions before querying DOM elements
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

      if (availableSteps.length === 0) {
        // If none of the tour elements are on the current page, we keep the tour active
        // but do not initialize Driver.js (allowing it to continue when the user navigates)
        return;
      }

      // Read the saved step index, default to first step (0)
      const savedStepStr = localStorage.getItem(`${activeTourId}-tour-current-step`);
      const savedStepIndex = savedStepStr ? parseInt(savedStepStr, 10) : 0;

      // Find the first available step that is at or after the saved index
      let startIdxInAvailable = availableSteps.findIndex(
        step => step.originalIndex >= savedStepIndex
      );

      if (startIdxInAvailable === -1) {
        // If all remaining steps are completed or invalid, default back to first available
        startIdxInAvailable = 0;
      }

      // Construct Driver.js steps
      const driverSteps = availableSteps.map(step => ({
        element: step.element,
        popover: {
          ...step.popover,
          onNextClick: (element, driveStep, options) => {
            // If we are on the last step of the currently available steps
            if (options.index === availableSteps.length - 1) {
              // If this is also the last step of the entire tour
              const isLastStepOverall = step.originalIndex === allSteps.length - 1;
              if (isLastStepOverall) {
                isFinishedRef.current = true;
                localStorage.setItem(`${activeTourId}-tour-completed`, 'true');
                localStorage.removeItem(`${activeTourId}-tour-current-step`);
                options.driver.destroy();
                setActiveTourId(null);
              } else {
                // Otherwise, we reached the end of this page's steps, but there are more overall.
                // Just destroy the current instance without setting completed.
                isProgrammaticDestroyRef.current = true;
                options.driver.destroy();
              }
            } else {
              options.driver.moveNext();
            }
          }
        }
      }));

      isFinishedRef.current = false;
      isProgrammaticDestroyRef.current = false;

      // Initialize Driver.js v1.x instance
      const d = driver({
        steps: driverSteps,
        animate: true,
        overlayColor: 'rgba(5, 51, 92, 0.65)', // Modern dark blue overlay matching theme
        allowClose: true,
        allowKeyboardControl: true, // Esc to close
        popoverClass: 'medical-dashboard-tour',
        showProgress: true,
        progressText: 'Step {{current}} of {{total}}',
        onHighlightStarted: (element, step, options) => {
          // Update the current step in localStorage as we progress
          const currentAvailStep = availableSteps[options.index];
          if (currentAvailStep) {
            localStorage.setItem(`${activeTourId}-tour-current-step`, currentAvailStep.originalIndex.toString());
          }
        },
        onDestroyStarted: (element, step, options) => {
          // If not programmatically closed (e.g. user manually exited via Close or Esc)
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
            // If programmatic destroy (e.g. route change), we keep activeTourId set so it resumes on the next route.
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
  }, [location.pathname, activeTourId, refreshKey]);

  return null;
}
