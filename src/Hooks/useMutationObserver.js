// Watches for any changes(window resize,click event, change event or any type of changes) made to the DOM tree, using a MutationObserver.

// 1.  Use a useEffect() hook that depends on the values of callback and options.
// 2. Check if the given ref is initialized. If it is, create a new MutationObserver and pass it the callback.
// 3. Call MutationObserver.observe() with the given options to watch the given ref for changes.
// 4. Use MutationObserver.disconnect() to remove the observer from the ref when the component unmounts.

import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};
function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const obs = new MutationObserver(cb);
    setObserver(obs);
  }, [cb, options, setObserver]);

  useEffect(() => {
    if (!observer) return;
    const { config } = options;
    observer.observe(targetEl, config);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options]);
}

export default useMutationObservable;

/*  Example to use it.

export default function App() {
  const listRef = useRef();
  const [count, setCount] = useState(2);
  const [fruits, setFruits] = useState(["apple", "peach"]);
  const onListMutation = useCallback((mutationList) => {
      setCount(mutationList[0].target.children.length);
    },
    [setCount]
  );

  useMutationObservable(listRef.current, onListMutation);

  return (
    <div>
      <span>{`Added ${count} fruits`}</span>
      <br />
      <button
        onClick={() => setFruits([...fruits, `random fruit ${fruits.length}`])}
      >
        Add random fruit
      </button>


    Any changes happens to this ul Element will triggers the mutationObserver.
      <ul ref={listRef}>
        {fruits.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

    </div>
  );
}

 */

//                                       2nd Example

/*

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
};

export default useMutationObserver;




/           How To Use it.


export default function App() {
  const mutationRef = React.useRef();
  const [mutationCount, setMutationCount] = React.useState(0);
  const incrementMutationCount = () => {
    return setMutationCount(mutationCount + 1);
  };
  useMutationObserver(mutationRef, incrementMutationCount);
  const [content, setContent] = React.useState('Hello world');

  return (
    <>
      <label for="content-input">Edit this to update the text:</label>
      <textarea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div
        style={{ width: '100%' }}
        ref={mutationRef}
      >
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
      </div>
      <div>
        <h3>Mutation count {mutationCount}</h3>
      </div>
    </>
  );
}





 */
