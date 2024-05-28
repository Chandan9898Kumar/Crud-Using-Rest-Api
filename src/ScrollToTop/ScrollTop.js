import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./index.module.css";

/**
 * For our help we will using few external packages.

1. prop-types: To validate the props.
2. classnames: This helps to use CSS classes as javascript objects, we just need to name our CSS file as filename.module.css
 */

class ScrollTop extends Component {
  state = {
    scrolled: 0,
  };

  /**
   * Validate the props at the start, this helps to get a good idea about the way in which we have to build this component and how its behavior will be.
     Also if the required props are missing then set the default.
   */

  static propTypes = {
    scrollStepInPx: PropTypes.number.isRequired,
    delayInMs: PropTypes.number.isRequired,
    placement: PropTypes.oneOf(["left", "right"]).isRequired,
    showAfterInPx: PropTypes.number.isRequired,
  };

  /**
   * These are the props that we are expecting.
      1.showAfterInPx for when to show the back to top button.
      2.placement of the button at the bottom of the screen.
      3.scrollStepInPx to decide the no of px should scroll to top at one instance.
      4.delayInMs speed at which it should scroll back.
   */
  static defaultProps = {
    scrollStepInPx: 50,
    delayInMs: 16.66,
    placement: "right",
    showAfterInPx: 100,
  };

  /**
   * No one likes the jerking effect on their website, if you clicked on the button and it goes to the top instantly that is not a good user experience.
    So the last two props helps to scroll back smoothly.
    We have created the stateful component because we need to maintain the state of how much user has scrolled in order to show the back to top button.
    To get the scroll distance we will have to listen to the scroll event and then store it. The best place to assign the event listeners is in the lifecycle methods.
   */

  componentDidMount() {
    window.addEventListener("scroll", this.trackScrollPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => {});
  }

  /**
   * If user has not scrolled till the distance at which we have to show the back to top button then return null. Falsey values render nothing in react.
    Else generate the button. On the click of this button the window will scroll to top.
   */
  //How much page is scrolled
  trackScrollPosition = () => {
    this.setState({
      scrolled: window.pageYOffset,
    });
  };

  //Scroll step by step.

  scrollStep = () => {
    const { scrollStepInPx } = this.props;
    if (window.pageYOffset === 0) {
      clearInterval(this.timer);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  //Start scrolling to top
  scrollToTop = () => {
    const { delayInMs } = this.props;

    this.timer = setInterval(() => {
      this.scrollStep();
    }, delayInMs);
  };
  /** We are basically calling the function at an interval which will scroll at given distance with given speed.
      Once it has reached to top clear the interval.
      If component is about unmount in then also clear the interval. */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { scrolled } = this.state;
    const { placement, showAfterInPx } = this.props;

    //If not in visibility the return null
    if (scrolled < showAfterInPx) {
      return null;
    }

    //Render the button
    return (
      <span title="Back to top" className={cx(styles.scroll, styles[placement])} onClick={this.scrollToTop}>
        Top
      </span>
    );
  }
}

export default ScrollTop;

//                  OR we can use below.

// const ScrollTop = () => {
//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <span title="Back to top" className={styles.scroll} onClick={handleScrollToTop}>
//       Top
//     </span>
//   );
// };
// export default ScrollTop;
