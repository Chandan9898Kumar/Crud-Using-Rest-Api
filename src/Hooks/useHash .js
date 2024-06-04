// Use the useState() hook to lazily get the hash property of the Location object.
// Use the useCallback() hook to create a handler that updates the state.
// Use the useEffect() hook to add a listener for the 'hashchange' event when mounting and clean it up when unmounting.
// Use the useCallback() hook to create a function that updates the hash property of the Location object with the given value.

import React from "react";


// NOTE: useHash Tracks the browser's location hash value, and allows changing it.

const useHash = () => {
  const [hash, setHash] = React.useState(() => window.location.hash);

  const hashChangeHandler = React.useCallback(() => {
    setHash(window.location.hash);
  }, []);

  React.useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const updateHash = React.useCallback(
    (newHash) => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;

//             Example to use this hook.

const MyApp = () => {
  const [hash, setHash] = useHash();

  React.useEffect(() => {
    setHash("#list");
  }, []);

  return (
    <React.Fragment>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash: </p>
      <input value={hash} onChange={(e) => setHash(e.target.value)} />
    </React.Fragment>
  );
};
