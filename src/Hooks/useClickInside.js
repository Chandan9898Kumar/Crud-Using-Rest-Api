// reate a custom hook that takes a ref and a callback to handle the 'click' event.
// Use the useEffect() hook to append and clean up the click event.
// Use the useRef() hook to create a ref for your click component and pass it to the useClickInside hook.

import def from "ajv/dist/vocabularies/applicator/additionalItems";
import React from "react";

//  Handles the event of clicking inside the wrapped component.
const useClickInside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
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

export default useClickInside;

//       Example to use this hook

const ClickBox = ({ onClickInside }) => {
  const clickRef = React.useRef();
  useClickInside(clickRef, onClickInside);
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
      <p>Click inside this element</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ClickBox onClickInside={() => alert("click inside")} />);
