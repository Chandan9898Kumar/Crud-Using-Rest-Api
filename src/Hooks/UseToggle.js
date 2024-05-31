// Custom hook that manages a boolean toggle state in React components.

import { useState, useCallback } from "react";

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggleFunction = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, setValue, toggleFunction];
};

export default useToggle;
