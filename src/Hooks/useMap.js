// Use the useState() hook and the Map constructor to create a new Map from the initialValue.
// Use the useMemo() hook to create a set of non-mutating actions that manipulate the map state variable, using the state setter to create a new Map every time.
// Return the map state variable and the created actions.

import React from "react";

const useMap = (initialValue) => {
  const [map, setMap] = React.useState(new Map(initialValue));

  const actions = React.useMemo(
    () => ({
      set: (key, value) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key, value) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key, value);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap]
  );

  return [map, actions];
};

export default useMap;



//   Example to use this hook.
const MyApp = () => {
  const [map, { set, remove, clear }] = useMap([["apples", 10]]);

  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove("apples")} disabled={!map.has("apples")}>
        Remove apples
      </button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
          null,
          2
        )}
      </pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<MyApp />);
