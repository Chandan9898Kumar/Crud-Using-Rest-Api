import { useState, useEffect } from "react";

const UseDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, [delay]);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default UseDebounce;
