// Create a custom hook that takes a ref and a callback to handle the click event.
// Use the useEffect() hook to append and clean up the click event.
// Use the useRef() hook to create a ref for your click component and pass it to the useClickOutside hook.

import React, { useEffect, useRef } from "react";

//  Handles the event of clicking outside of the wrapped component.
const useClickOutside = (ref, callback) => {
  React.useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;

//                    Example to use this hook
// const ClickBox = ({ onClickOutside }) => {
//   const clickRef = React.useRef();
//   useClickOutside(clickRef, onClickOutside);
//   return (
//     <div
//       className="click-box"
//       ref={clickRef}
//       style={{
//         border: "2px dashed orangered",
//         height: 200,
//         width: 400,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <p>Click out of this element</p>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div>
//       <ClickBox onClickOutside={() => alert("click outside")} />
//     </div>
//   );
// }

//                                      Other Example Of useOnClickOutside() hook.

//  NOTE :
// 1. There are times when we want to detect if the user has clicked outside the component or not. Let us see how can we create the useOnClickOutside() hook in React that will help us to detect it.

// 2. useOnClickOutside(ref, callback) will accept the component/element reference and the callback function and will invoke the callback function if clicked outside the reference.

// 3. All we have to do is listen to the mouse and touch event like mousedown, touchstart and on the event fire check if the event.target is not the descendant of the reference then invoke the callback.

// 4. Wrap this logic inside the useEffect() hook so that we can assign and remove listeners.

// function useOnClickOutside(ref, callback) {
//   useEffect(
//     () => {
//       const listener = (event) => {
// if the reference is not present or the target is descendant of the reference
// return
//         if (!ref.current || ref.current.contains(event.target)) {
//           return;
//         }

// invoke the callback
//         callback(event);
//       };

//       document.addEventListener("mousedown", listener);
//       document.addEventListener("touchstart", listener);

//       return () => {
//         document.removeEventListener("mousedown", listener);
//         document.removeEventListener("touchstart", listener);
//       };
//     },

// add ref and callback to effect dependencies
//     [ref, callback]
//   );
// }

// function Example() {
//   const ref = useRef();
//   useOnClickOutside(ref, () => {
//     console.log("Clicked");
//   });

//   return (
//     <div>
//       <p>Outside Click me!</p>
//       <p ref={ref}>Click me!</p>
//     </div>
//   );
// }
