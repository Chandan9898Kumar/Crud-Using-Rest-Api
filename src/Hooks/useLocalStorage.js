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
