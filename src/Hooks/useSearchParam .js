// Use the useCallback() hook to create a callback that uses the URLSearchParams constructor to get the current value of param.
// Use the useState() hook to create a state variable that holds the current value of the param.
// Use the useEffect() hook to set appropriate event listeners to update the state variable when mounting and clean them up when unmounting.

import React from "react";

// NOTE : useSearchParam  Tracks the browser's location search param.
const useSearchParam = (param) => {
  const getValue = React.useCallback(() => new URLSearchParams(window.location.search).get(param), [param]);

  const [value, setValue] = React.useState(getValue);

  React.useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    window.addEventListener("popstate", onChange);
    window.addEventListener("pushstate", onChange);
    window.addEventListener("replacestate", onChange);

    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("pushstate", onChange);
      window.removeEventListener("replacestate", onChange);
    };
  }, []);

  return value;
};

export default useSearchParam;

//                          Example to use this hook

const MyApp = () => {
  const post = useSearchParam("post");

  return (
    <React.Fragment>
      <p>Post param value: {post || "null"}</p>
      <button onClick={() => window.history.pushState({}, "", window.location.pathname + "?post=42")}>View post 42</button>
      <button onClick={() => window.history.pushState({}, "", window.location.pathname)}>Exit</button>
    </React.Fragment>
  );
};

export { MyApp };
