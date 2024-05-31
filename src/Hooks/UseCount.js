import { useState, useCallback } from "react";

const UseCounter = (initialValue) => {
  const [counter, setCounter] = useState(initialValue ?? 0);

  const increment = useCallback(() => {
    setCounter((prevCount) => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((prevCount) => prevCount - 1);
  }, []);

  const reset = useCallback(() => {
    setCounter(initialValue ?? 0);
  }, [initialValue]);

  return [counter, setCounter, increment, decrement, reset];
};

export default UseCounter;
