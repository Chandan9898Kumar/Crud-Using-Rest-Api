// Create a custom hook that takes a callback and a delay.
// Use the useRef() hook to create a ref for the callback function.
// Use a useEffect() hook to remember the latest callback whenever it changes.
// Use a useEffect() hook dependent on delay to set up the interval and clean up.

import React from "react";

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;

//       Example to use this hook

const Timer = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<Timer />);

/**                                                                       Explanation

Wrapping your mind around React hooks can be daunting at first, especially if you stumble into anything remotely related to timing, such as setInterval(). In order to solve such issues, you have to get used to the way hooks work, their limitations and potential workarounds.

First, it should be clear that setInterval() is a side effect. After all, it's not directly tied to a component's render method. Therefore we should call it inside a useEffect() hook and use its return to call clearInterval() when unmounting. To avoid creating multiple intervals, we can use the hook's second argument to pass an empty dependency array ([]). This results in running the side effect only when the component mounts.

React.useEffect(() => {
  let id = setInterval(callback, delay);
  return () => clearInterval(id);
}, []);
The closure inside setInterval() will only ever have access to whatever variables and values were available when it got instantiated. This means we have to be extra careful about its first argument to make sure that fresh values will be available every time the interval runs. The easiest solution to this issue is to create a variable that's considered mutable by React, using the useRef() hook. This will allow us to have access to new values when we need them.

const savedCallback = React.useRef(callback);

React.useEffect(() => {
  let id = setInterval(savedCallback.current, delay);
  return () => clearInterval(id);
}, []);
Using the useRef() hook might have just shifted the problem. The value of the created ref now needs to be refreshed inside setInterval(). Luckily, this is an easy problem to solve. We could create a wrapper function that passes the function to setInterval() instead. This way the function passed to setInterval() will never change, but the value of the enclosed ref will always be up to date when it's called.

const savedCallback = React.useRef(callback);

React.useEffect(() => {
  function tick() {
    savedCallback.current();
  }
  let id = setInterval(tick, delay);
  return () => clearInterval(id);
}, []);
Finally, let's extract all of this into a custom hook to make it reusable. We can extract callback as an argument for the custom hook and use it as the sole dependency of an additional useEffect() hook that will update the ref for the callback.

const useInterval = callback => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
};
 */
