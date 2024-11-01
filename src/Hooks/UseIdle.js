import { useState, useEffect, useRef } from "react";

const useIdle = (delay) => {
  const [isIdle, setIsIdle] = useState(false);

  // create a new reference to track timer
  const timeoutId = useRef();

  // assign and remove the listeners
  useEffect(() => {
    setup();

    return () => {
      cleanUp();
    };
  });

  const startTimer = () => {
    // wait till delay time before calling goInactive
    timeoutId.current = setTimeout(goInactive, delay);
  };

  const resetTimer = () => {
    //reset the timer and make user active
    clearTimeout(timeoutId.current);
    goActive();
  };

  const goInactive = () => {
    setIsIdle(true);
  };

  const goActive = () => {
    setIsIdle(false);

    // start the timer to track Inactiveness
    startTimer();
  };

  const setup = () => {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("DOMMouseScroll", resetTimer, false);
    document.addEventListener("mousewheel", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("MSPointerMove", resetTimer, false);

    //edge case
    //if tab is changed or is out of focus
    window.addEventListener("blur", startTimer, false);
    window.addEventListener("focus", resetTimer, false);
  };

  const cleanUp = () => {
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("mousedown", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("DOMMouseScroll", resetTimer);
    document.removeEventListener("mousewheel", resetTimer);
    document.removeEventListener("touchmove", resetTimer);
    document.removeEventListener("MSPointerMove", resetTimer);

    //edge case
    //if tab is changed or is out of focus
    window.removeEventListener("blur", startTimer);
    window.removeEventListener("focus", resetTimer);

    // memory leak
    clearTimeout(timeoutId.current);
  };

  // return previous value (happens before update in useEffect above)
  return isIdle;
};

export default useIdle;

/**  Example : 
export default function App() {
  const isIdle = useIdle(2000);

  return (
    <div>
      <h1>IsIdle: {isIdle ? "true" : "false"}</h1>
    </div>
  );
}

 */

/**
 * 
 A user is considered to be inactive or idle if he is not performing any sort of action using interaction hardware like a mouse,
or keyboard for desktops and laptops and touch on mobile and tablets.

For this, there are a set of events that we can listen to like mousemove, mousedown, keypress, DOMMouseScroll, mousewheel, touchmove, MSPointerMove.

Also, we need to handle edge cases where the window or tab is out of focus, for which we will listen to the focus and blur events.

If any of these events are triggered then set the user to be Active else if none of them have happened for a given amount of time then set the user to be Idle or Inactive.
 */
