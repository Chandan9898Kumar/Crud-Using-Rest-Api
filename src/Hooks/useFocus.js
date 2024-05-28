import { useEffect, useState } from "react";

const useHasFocus = () => {
  //  get the initial state.
  const [focus, setFocus] = useState(document.hasFocus());
  // Use the document.hasFocus() to get the initial state.

  useEffect(() => {
    //  Helper functions to update the status
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);

    //  Assign the listener
    // Update the status on the event
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // return the focus
  return focus;
};

export default useHasFocus;

// NOTE: a hook in react that helps to determine if the application is in focus or not. This will help stop the background processing when the user is not focused or on the tab.
// Whenever the window is blurred set the focus state to false, else whenever the window is focused, update the state to true.

/**
 * const Example = () => {
  const focus = useHasFocus();
  console.log(focus);
  return <></>;
};

Output:
true
false // change the tab
true // back to the tab
 */

/**
 *                                                                      Document: hasFocus() method
The hasFocus(): method of the Document interface returns a boolean value indicating whether the document or any element inside the document has focus. 
This method can be used to determine whether the active element in a document has focus.
 */
