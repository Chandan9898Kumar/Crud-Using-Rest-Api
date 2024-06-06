import { useRef, useEffect } from "react";

const areEqual = (prevDeps, nextDeps) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) {
      return false;
    }
  }

  return true;
};

const useCustomMemo = (cb, deps) => {
  // variable or state -> cached Value
  const memoizedRef = useRef(null);

  // Changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }

  // cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the memoised value (if any)
  return memoizedRef.current.value;
};

export default useCustomMemo;

//                              Example to use

/**
 import { useState } from "react";
import "./styles.css";
import useCustomMemo from "./hooks/use-custom-memo";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const squaredValue = () => {
    console.log("Expensive Calculation..");
    return counter * counter;
  };

  const memoisedSquaredValue = useCustomMemo(squaredValue, [counter]);

  return (
    <div className="App">
      <h2>Counter: {counter}</h2>
      <h2>Squared Counter: {memoisedSquaredValue}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <h2>Counter 2: {counter2}</h2>
      <button onClick={() => setCounter2(counter2 - 1)}>Decrement</button>
    </div>
  );
}
 */

//                            useMemo custom hooks  new type
// import React, { useState } from "react";
// import "./styles.css";

// const useMyMemo = (func, dependencies) => {
//   const [values, setValues] = useState([]);
//   const [memoizedValue, setMemoizedValue] = useState(null);

//   const hasChanged = (dependencies) => {
//     return values.length === 0 ? true : values.some((value, i) => value !== dependencies[i]);
//   };

//   if (Array.isArray(dependencies) && hasChanged(dependencies)) {
//     setValues(dependencies);
//     setMemoizedValue(func.call(this));
//     console.log("called");
//   }
//   return memoizedValue;
// };

// export default useMyMemo;

//                                                Example to use

// const Memo = () => {
//   const [number, setNumber] = useState(5);
//   function summation(n) {
//     return n < 1 ? n : n + summation(n - 1);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setNumber(Number(e.target.form[0].value));
//   };

//   const memoizedValue = useMyMemo(() => summation(number), [number]);

//   console.log(memoizedValue);

//   return (
//     <div>
//       <h2>{memoizedValue}</h2>
//       <form>
//         <input name="number-input" type="number" placeholder="Enter number here" />
//         <button type="submit" onClick={handleSubmit}>
//           Change Number
//         </button>
//       </form>
//     </div>
//   );
// };

// export default function App() {
//   return <Memo />;
// }
