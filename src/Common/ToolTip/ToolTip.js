import React, { useState, memo } from "react";
import "./Tooltip.css";

const ToolTip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 500);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      //  when to show tooltip

      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default memo(ToolTip);

/**                       Example to use tooltip



export default function App() {
  return (
    <div className="App">
      <h1>Hello, this is a React tooltip demo</h1>
      <p> Try hovering the emojis below </p>

      <div className="example-wrapper">
        <Tooltip content="Yee-haw!" direction="right">
          <span className="example-emoji" role="img" aria-label="cowboy emoji">
            🤠
          </span>
        </Tooltip>
      </div>

      <div className="example-wrapper">
        <Tooltip content="Quack!" direction="top">
          <span className="example-emoji" role="img" aria-label="duck emoji">
            🦆
          </span>
        </Tooltip>
      </div>

      <div className="example-wrapper">
        <Tooltip
          content="Ring-ding-ding-ding-dingeringeding!"
          direction="bottom"
        >
          <span className="example-emoji" role="img" aria-label="fox emoji">
            🦊
          </span>
        </Tooltip>
      </div>

      <div className="example-wrapper">
        <Tooltip
          content={
            <>
              Bring me
              <br />
              to your leader
            </>
          }
          direction="left"
          delay="0"
        >
          <span className="example-emoji" role="img" aria-label="alien emoji">
            👽
          </span>
        </Tooltip>
      </div>

      <div className="example-wrapper">
        <Tooltip
          content={
            <span role="img" aria-label="rabbit emoji">
              🐇
            </span>
          }
          direction="bottom"
        >
          <span className="example-emoji" role="img" aria-label="tophat emoji">
            🎩
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

 */
