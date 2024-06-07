//   Creates a stateful value that is persisted to localStorage, and a function to update it.

import { useState, useCallback } from "react";
const useLocalStorage = (key, initialValue = null) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  const item = JSON.parse(localStorage.getItem(key)) || initialValue;

  const setItemStorage = (cb) => {
    const value = typeof cb === "function" ? JSON.stringify(cb(item)) : JSON.stringify(cb);
    localStorage.setItem(key, value);
    forceUpdate && setForceUpdate(false); // Reset forced update. to re-render ui
  };

  const setItem = useCallback(setItemStorage, [forceUpdate, item, key]);

  const resetStorage = () => {
    localStorage.removeItem(key);
    !forceUpdate && setForceUpdate(true); // forced state update to re-render ui. other while resting ui will not update, because it inside parent.
  };

  const reset = useCallback(resetStorage, [forceUpdate, key]);

  return [item, setItem, reset];
};

export default useLocalStorage;

//                                                                  Example to use this hook.

/**
 export default function App() {
  let key = 'userDetails';
  let initialValue=[]
  const [inputValue, setInputValue] = useState('');
  const [item, setItem, reset] = useLocalStorage(key, initialValue);

  const changeHandler = ({ target: { value } }) => setInputValue(value);

  const clickHandler = () => {
    if (!inputValue.trim()) return;

    setItem((prev) => {
      return [...prev, inputValue];
    });
    setInputValue('');
  };

  const resetHandler = () => {
    reset();
  };

  return (
    <div>
      <h1>Hello StackBlitz! Item :</h1>
      <input type="text" value={inputValue} onChange={changeHandler} />

      <button onClick={clickHandler}>Submit</button>
      <button onClick={resetHandler}>Reset</button>

      {item.map((items) => {
        return <li key={items}>{items}</li>;
      })}
    </div>
  );
}
 */
// ========================================================================================================================================


//                      2nd  example

// 1. Use the useState() hook with a function to initialize its value lazily.
// 2. Use a try...catch block and Storage.getItem() to try and get the value from Window.localStorage. If no value is found, use Storage.setItem() to store the defaultValue and use it as the initial state. If an error occurs, use defaultValue as the initial state.
// 3. Define a function that will update the state variable with the passed value and use Storage.setItem() to store it.

// const useLocalStorage = (keyName, defaultValue) => {
//   const [storedValue, setStoredValue] = React.useState(() => {
//     try {
//       const value = window.localStorage.getItem(keyName);

//       if (value) {
//         return JSON.parse(value);
//       } else {
//         window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (err) {
//       return defaultValue;
//     }
//   });

//   const setValue = newValue => {
//     try {
//       window.localStorage.setItem(keyName, JSON.stringify(newValue));
//     } catch (err) {}
//     setStoredValue(newValue);
//   };

//   return [storedValue, setValue];
// };

// export default useLocalStorage

// ====================================================================================================================================
//                                 Example to use above hook
// const MyApp = () => {
//   const [name, setName] = useLocalStorage('name', 'John');

//   return <input value={name} onChange={e => setName(e.target.value)} />;
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <MyApp />
// );
