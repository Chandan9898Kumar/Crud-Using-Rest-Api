// Create a custom hook that takes a callback and a delay.
// Use the useRef() hook to create a ref for the callback function.
// Use the useEffect() hook to remember the latest callback.
// Use the useEffect() hook to set up the timeout and clean up.

import React from "react";

//  Implements setTimeout() in a declarative manner.
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;

//       Example to use this hook
// const OneSecondTimer = (props) => {
//   const [seconds, setSeconds] = React.useState(0);
//   useTimeout(() => {
//     setSeconds(seconds + 1);
//   }, 1000);

//   return <p>{seconds}</p>;
// };

// ReactDOM.createRoot(document.getElementById("root")).render(<OneSecondTimer />);
