// 1. The sessionStorage object stores data for only one session.
// 2. The data is deleted when the browser is closed
// 3. Creates a stateful value that is persisted to sessionStorage, and a function to update it.

import { useState, useCallback } from "react";

const useSessionStorage = (key, init = null) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  const item = JSON.parse(sessionStorage.getItem(key)) || init;

  const setItemStorage = (cb) => {
    const value = typeof cb === "function" ? JSON.stringify(cb(item)) : JSON.stringify(cb);
    sessionStorage.setItem(key, value);
    forceUpdate && setForceUpdate(false); // Reset forced update. to re-render ui
  };
  const setItem = useCallback(setItemStorage, [forceUpdate, item, key]);

  const resetStorage = () => {
    sessionStorage.removeItem(key);
    !forceUpdate && setForceUpdate(true); // forced state update to re-render ui
  };
  const reset = useCallback(resetStorage, [forceUpdate, key]);
  return [item, setItem, reset];
};

export default useSessionStorage;

//                                     Example to use This hook

// export default function App() {
//   const key = "userDetails";
//   const [inputValue, setInputValue] = useState("");
//   const [item, setItem, reset] = useSessionStorage(key, []);

//   const changeHandler = ({ target: { value } }) => setInputValue(value);

//   const clickHandler = () => {
//     if (!inputValue.trim()) return;

//     setItem((prev) => {
//       return [...prev, inputValue];
//     });
//     setInputValue("");
//   };

//   const resetHandler = () => {
//     reset();
//   };

//   return (
//     <div>
//       <h1>Hello StackBlitz! Item :</h1>
//       <input type="text" value={inputValue} onChange={changeHandler} />

//       <button onClick={clickHandler}>Submit</button>
//       <button onClick={resetHandler}>Reset</button>

//       {item.map((items) => {
//         return <li key={items}>{items}</li>;
//       })}
//     </div>
//   );
// }

// ======================================================= 2nd Example =============================================

// 1. Use the useState() hook with a function to initialize its value lazily.
// 2. Use a try...catch block and Storage.getItem() to try and get the value from Window.sessionStorage. If no value is found, use Storage.setItem() to store the defaultValue and use it as the initial state. If an error occurs, use defaultValue as the initial state.
// 3. Define a function that will update the state variable with the passed value and use Storage.setItem() to store it.

// const useSessionStorage = (keyName, defaultValue) => {
//   const [storedValue, setStoredValue] = React.useState(() => {
//     try {
//       const value = window.sessionStorage.getItem(keyName);

//       if (value) {
//         return JSON.parse(value);
//       } else {
//         window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (err) {
//       return defaultValue;
//     }
//   });

//   const setValue = newValue => {
//     try {
//       window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
//     } catch (err) {}
//     setStoredValue(newValue);
//   };

//   return [storedValue, setValue];
// };

//                                                        Example to use this hook.
// const MyApp = () => {
//   const [name, setName] = useSessionStorage('name', 'John');

//   return <input value={name} onChange={e => setName(e.target.value)} />;
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <MyApp />
// );
