import { useState, useEffect, useRef, useCallback } from "react";

//   It will works for input and callback functions.
const useDebounce = (callback, delay = 300, options = {}) => {
  // Use ref to persist timer between renders
  const timerRef = useRef(null);

  // Use ref to always have latest callback
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useRef(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Return memoized debounced function
  return useCallback(
    (event) => {
      // Handle both direct values and event objects
      const value = event?.target?.value ?? event;

      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        callbackRef.current(value);
      }, delay);
    },
    [delay]
  ); // Only recreate if delay changes
};



//  It will works only for input fields.
const UseDebounceInput = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, [delay]);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;