//                                                                         Re-useable functions

/* eslint-disable import/group-exports */
/* eslint-disable import/group-exports */
/* eslint-disable */
export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

/* eslint-enable */
export const sampleOne = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const sample = (arr, len = 1) => {
  const output = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
};

export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const sum = (values) => values.reduce((sum, value) => sum + value, 0);

export const mean = (values) => sum(values) / values.length;

export const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));

export const roundTo = (number, places = 0) => Math.round(number * 10 ** places) / 10 ** places;

export const roundToNearest = (number, step) => Math.round(number / step) * step;

export const debounce =
  (callback, wait, timeoutId = null) =>
  (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };
};

export const throttleV2 = (func, limit) => {
  let timeoutId;
  let lastRan;
  const wrappedFunc = function (...args) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };

  function cleanUp() {
    clearTimeout(timeoutId);
  }

  return [wrappedFunc, cleanUp];
};

export const slugify = (str = "") => {
  let slug = str
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  return slug;
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const getInterpolatedValue = (y1, y2, ratio) => {
  // We're assuming that `ratio` is a value between 0 and 1.
  // If this were a graph, it'd be our `x`, and we're trying to solve for `y`.
  // First, find the slope of our line.
  const slope = y2 - y1;

  return slope * ratio + y1;
};

export const camelToDashCase = (str) => str.replace(/[A-Z0-9]/g, (letter) => `-${letter.toLowerCase()}`);

export const pick = (obj, keys) => {
  const o = {};
  let i = 0;
  let key;

  keys = Array.isArray(keys) ? keys : [keys];

  while ((key = keys[i++])) {
    if (typeof obj[key] !== "undefined") {
      o[key] = obj[key];
    }
  }
  return o;
};

export const omit = function (obj, key) {
  const newObj = {};

  for (const name in obj) {
    if (name !== key) {
      newObj[name] = obj[name];
    }
  }

  return newObj;
};

export const convertArrayToMap = (list) =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) => (arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) => arr1.concat(arr2.filter((item) => arr1.indexOf(item) === -1));

export const findRight = (arr, predicate) => arr.slice().reverse().find(predicate);

export function requestAnimationFramePromise() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export const capitalizeSentence = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const deleteCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const convertHexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hyphenate = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase();

export const delay = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

export const getTimeOfDay = () => {
  const now = new Date();
  const hourOfDay = now.getHours();

  if (hourOfDay <= 4) {
    return "night";
  } else if (hourOfDay <= 11) {
    return "morning";
  } else if (hourOfDay <= 17) {
    return "afternoon";
  } else if (hourOfDay <= 21) {
    return "evening";
  } else {
    return "night";
  }
};

export const generateId = (len = 4, { includeDigits = false } = {}) => {
  // prettier-ignore
  const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  if (includeDigits) {
    characters.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  }

  return sample(characters, len).join("");
};

export const normalize = (number, currentScaleMin, currentScaleMax, newScaleMin = 0, newScaleMax = 1) => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization = (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clampedNormalize = (number, currentScaleMin, currentScaleMax, newScaleMin = 0, newScaleMax = 1) => {
  return clamp(normalize(number, currentScaleMin, currentScaleMax, newScaleMin, newScaleMax), newScaleMin, newScaleMax);
};

export const getDistanceBetweenPoints = (p1, p2) => {
  const deltaX = Math.abs(p2.x - p1.x);
  const deltaY = Math.abs(p2.y - p1.y);

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

export const convertRadiansToDegrees = (angle) => (angle * 180) / Math.PI;

export const convertCartesianToPolar = (point, centerPoint = [0, 0]) => {
  const pointRelativeToCenter = [point[0] - centerPoint[0], point[1] - centerPoint[1]];

  const [x, y] = pointRelativeToCenter;

  // When going from cartesian to polar, it struggles with negative numbers.
  // We need to take quadrants into account!
  const quadrant = getQuadrantForPoint(pointRelativeToCenter);

  let radiansOffset = 0;
  if (quadrant === 2 || quadrant === 3) {
    radiansOffset += Math.PI;
  } else if (quadrant === 4) {
    radiansOffset += 2 * Math.PI;
  }

  const radius = Math.sqrt(x ** 2 + y ** 2);
  const theta = Math.atan(y / x) + radiansOffset;

  return [theta, radius];
};

export const convertPolarToCartesian = ([θ, radius]) => {
  const x = radius * Math.cos(θ);
  const y = radius * Math.sin(θ);

  return [x, y];
};

export const getQuadrantForPoint = ([x, y]) => {
  if (x >= 0 && y >= 0) {
    return 1;
  } else if (x < 0 && y >= 0) {
    return 2;
  } else if (x < 0 && y < 0) {
    return 3;
  } else if (x >= 0 && y < 0) {
    return 4;
  } else {
    throw new Error(`Invalid coordinates: ${x} and ${y}`);
  }
};

/**
 * input:  "js,cat cat,  bee, dog"
 * output: ['js', 'cat cat', 'bee', 'dog']
 */
export const splitCommaSeparatedArray = (str) => {
  return str.replace(/,\s+/g, ",").split(",");
};

export function hash(val) {
  let hash = 0,
    i,
    chr;
  if (val.length === 0) return hash;
  for (i = 0; i < val.length; i++) {
    chr = val.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Given 3-4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
export const getValuesForBezierCurve = ({ startPoint, endPoint, controlPoint1, controlPoint2 }, t) => {
  let x, y;
  if (controlPoint2) {
    // Cubic Bezier curve
    x = (1 - t) ** 3 * startPoint[0] + 3 * (1 - t) ** 2 * t * controlPoint1[0] + 3 * (1 - t) * t ** 2 * controlPoint2[0] + t ** 3 * endPoint[0];

    y = (1 - t) ** 3 * startPoint[1] + 3 * (1 - t) ** 2 * t * controlPoint1[1] + 3 * (1 - t) * t ** 2 * controlPoint2[1] + t ** 3 * endPoint[1];
  } else {
    // Quadratic Bezier curve
    x = (1 - t) * (1 - t) * startPoint[0] + 2 * (1 - t) * t * controlPoint1[0] + t * t * endPoint[0];
    y = (1 - t) * (1 - t) * startPoint[1] + 2 * (1 - t) * t * controlPoint1[1] + t * t * endPoint[1];
  }

  return [x, y];
};

export const getYValueForBezier = function (xTarget, x1, y1, x2, y2) {
  const xTolerance = 0.0001;
  const myBezier = function (t) {
    return getValuesForBezierCurve(
      {
        startPoint: [0, 0],
        controlPoint1: [x1, y1],
        controlPoint2: [x2, y2],
        endPoint: [1, 1],
      },
      t
    );
  };

  // Binary search to find an approximation for `X`

  //establish bounds
  let lower = 0;
  let upper = 1;
  let percent = (upper + lower) / 2;

  let x = myBezier(percent)[0];

  while (Math.abs(xTarget - x) > xTolerance) {
    if (xTarget > x) lower = percent;
    else upper = percent;

    percent = (upper + lower) / 2;
    x = myBezier(percent)[0];
  }

  return myBezier(percent)[1];
};

export function moveCursorWithinInput(input, position) {
  // Super old browsers (like, IE?) don't support this.
  if (!input.setSelectionRange) {
    return;
  }

  input.focus();
  input.setSelectionRange(position, position);
}

export async function copyToClipboard(content) {
  try {
    await navigator.clipboard.writeText(content);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

/**
 * This method will call the callback for every value in the
 * object, and return a new object with transformed values.
 * This is useful if, eg., you need to capitalize every value in
 * a dictionary-style object with string values.
 */
export const transformValues = (obj, callback) => {
  if (typeof obj !== "object") {
    return obj;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: callback(key, value),
    };
  }, {});
};

// In a string, turn digits (1) into spelled words (one)
export const replaceDigit = (str) => {
  return str
    .replace(/1/g, "one")
    .replace(/2/g, "two")
    .replace(/3/g, "three")
    .replace(/4/g, "four")
    .replace(/5/g, "five")
    .replace(/6/g, "six")
    .replace(/7/g, "seven")
    .replace(/8/g, "eight")
    .replace(/9/g, "nine")
    .replace(/0/g, "zero");
};

// Generates a random unique session ID
// A function to return the replacement text:
export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getCurrentTimeFormatted = () => {
  const curDateTime = new Date().toISOString();

  return curDateTime;
};
