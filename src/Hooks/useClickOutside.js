// Create a custom hook that takes a ref and a callback to handle the click event.
// Use the useEffect() hook to append and clean up the click event.
// Use the useRef() hook to create a ref for your click component and pass it to the useClickOutside hook.

import React from "react";

//  Handles the event of clicking outside of the wrapped component.
const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;

//       Example to use this hook
const ClickBox = ({ onClickOutside }) => {
  const clickRef = React.useRef();
  useClickOutside(clickRef, onClickOutside);
  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: "2px dashed orangered",
        height: 200,
        width: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Click out of this element</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ClickBox onClickOutside={() => alert("click outside")} />);
