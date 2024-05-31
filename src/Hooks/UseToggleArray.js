import { useCallback, useState } from "react";

const useToggleArray = (values, startIndex = 0) => {
  // to track the indexes
  const [index, setIndex] = useState(startIndex);

  // define and memorize the toggler function in case we pass down the component,
  // this will move the index to the next level and reset it if it goes beyond the limit.
  const toggle = useCallback(() => setIndex((prevIndex) => (prevIndex >= values.length - 1 ? 0 : prevIndex + 1)), [values]);

  // return value and toggle function
  return [values[index], toggle];
};

export default useToggleArray;

//  NOTE :

/**
 * the useToggle() hook in React that accepts an array of values and the start index and toggles the next value in the array.
 *  If the index reaches to the last index of the array, reset the index.

This hook will return the current value and the toggle() method using which we can toggle the values.

To create this hook all we need to do is track the indexes and
 we can use the index to return the value from the array thus use the useState() hook to persist and track indexes and then use the useCallback() hook to create the toggle function.

By using the useCallback() hook, we can memorize the toggle method so that it can be passed down through components.
 */

//        Implementation Example

/**
  function Example() {
  // call the hook which returns, the current value and the toggled function
  const [currentValue, toggleValue] = useToggle(["a", "b", "c", "d"], 2);
  return <button onClick={toggleValue}> "currentValue" : {currentValue}</button>;
}

export default Example;

Output:
currentValue: c // initially
currentValue: d // onClick
currentValue: a // onClick
currentValue: b // onClick
currentValue: c // onClick
 */
