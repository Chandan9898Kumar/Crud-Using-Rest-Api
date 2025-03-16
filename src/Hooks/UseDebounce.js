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




/**
 * The `UseDebounceInput` function in JavaScript is used to debounce input values with a specified
 * delay.
 * @param value - The `value` parameter represents the input value that you want to debounce. This is
 * the value that will be delayed before being updated in the `debounceValue` state.
 * @param [delay=500] - The `delay` parameter in the `UseDebounceInput` function represents the time in
 * milliseconds that the function will wait before updating the `debounceValue` with the latest
 * `value`. This delay is used to debounce the input value, meaning that the function will only update
 * the `debounceValue
 * @returns The `UseDebounceInput` custom hook returns the `debounceValue`, which is the debounced
 * value of the input passed to the hook.
 */
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