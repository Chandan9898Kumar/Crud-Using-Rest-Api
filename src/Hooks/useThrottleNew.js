import { useEffect, useCallback, useRef } from "react";

const useThrottle = (callback, delay = 300) => {
  // Use refs to persist values between renders
  const conditionRef = useRef(true);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (event) => {
      // Handle both direct values and event objects
      const value = event?.target?.value ?? event;

      if (conditionRef.current) {
        conditionRef.current = false;

        // Execute callback with value
        callbackRef.current(value);

        // Reset throttle after delay
        setTimeout(() => {
          conditionRef.current = true;
        }, delay);
      }
    },
    [delay]
  );
};

export default useThrottle;
