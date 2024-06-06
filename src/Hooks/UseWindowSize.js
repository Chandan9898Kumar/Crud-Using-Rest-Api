import { useEffect, useState } from "react";
import useThrottle from "./UseThrottle";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  const throttledHandleResize = useThrottle(handleResize, 1000, { leading: true, trailing: false });

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);
    return () => window.removeEventListener("resize", throttledHandleResize);
  }, [throttledHandleResize]);

  return windowSize;
};

export default useWindowSize;

//                   Above Example is more optimized because we used throttling when page size changes

// import { useEffect, useState } from "react";
// const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return windowSize;
// };

// export default useWindowSize;
