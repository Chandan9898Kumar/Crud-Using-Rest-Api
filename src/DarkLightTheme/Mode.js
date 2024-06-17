import React  from "react";

import useDarkMode from "use-dark-mode";
import "./Theme.scss";

const DarkModeToggleModified = () => {
  const darkMode = useDarkMode(false);

  const handleDarkMode = () => {
    if (darkMode.value) {
      darkMode.disable();
    } else {
      darkMode.enable();
    }
  };
  return (
    <div className="centerElem">
      <div className="dark-mode-toggle">
        <button type="button" onClick={handleDarkMode}>
          {!darkMode.value ? `☀` : `☾`}
        </button>
      </div>
    </div>
  );
};

export default DarkModeToggleModified;
