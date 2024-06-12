import { useState } from "react";

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState(null);

  const handleCopyResult = (value) => {
    window.clearTimeout(copyTimeout);
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = (valueToCopy) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    window.clearTimeout(copyTimeout);
  };

  return { copy, reset, error, copied };
}

/**
 *                                                              Let’s break down the code:

    1. Importing Dependencies: The hook imports the useState hook from the React library.
    2. Hook Definition: The useClipboard function is defined, taking an optional timeout parameter (default: 2000ms) that determines how long the “copied” state should remain true after a successful copy operation.
    3. State Management: The hook uses React’s useState hook to manage three pieces of state: error (to store any errors that occur during the copy operation), copied (a boolean indicating whether the content has been successfully copied to the clipboard), and copyTimeout (a reference to a timeout used to reset the copied state after the specified timeout duration).

    4. Utility Functions:
     A. handleCopyResult: This function handles the result of the copy operation. It clears any existing timeout, sets a new timeout to reset the copied state after the specified timeout duration, and updates the copied state with the provided value.
     B. copy: This function performs the actual copy operation. It first checks if the navigator.clipboard API is supported in the current browser. If supported, it calls navigator.clipboard.writeText with the valueToCopy and handles the promise resolution and rejection. If the API is not supported, it sets an appropriate error.
     C. reset: This function resets the copied state to false, clears any existing error, and clears the copyTimeout.

    5. Return Value: The hook returns an object containing the copy, reset, error, and copied values, allowing the consumer to access and use these functionalities.
 */

//    Usage  :

/**
 * import React, { useState } from 'react';
    import './style.css';

export default function App() {
  const [input, setInput] = useState('');
  const { copy, reset, error, copied } = useClipboard({ timeout: 3000 });

  const handleCopy = () => {
    copy(input);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleCopy}>Copy Text</button>
      {copied && <p>Text copied to clipboard!</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={reset}>Reset</button>
    </div>
  );
}

 */

//  NOTE :

/**
 * In this example, we import the useClipboard hook and destructure its returned values (copy, reset, error, and copied). We pass a timeout value of 3000ms (3 seconds) to the hook.

The handleCopy function is called when the “Copy Text” button is clicked, invoking the copy function with the value 'Hello, World!'. If the copy operation is successful, the copied state will be set to true, and a message will be displayed indicating that the text has been copied to the clipboard.

If an error occurs during the copy operation, the error state will be set with the corresponding error message, which can be displayed to the user.

The “Reset” button calls the reset function, resetting the copied and error states to their initial values.
 */
