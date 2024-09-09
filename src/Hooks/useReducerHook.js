import { useState, useCallback } from "react";

const useReducerHook = (reducerFunction = () => {}, initialValue = "") => {
  const [state, setState] = useState(initialValue);

  const dispatch = useCallback(
    (action) => {
      const response = reducerFunction(state, action);

      setState(response);
    },
    [state, reducerFunction]
  );

  return [state, dispatch];
};

export default useReducerHook;
