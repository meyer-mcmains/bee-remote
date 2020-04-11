import { useState, useEffect, useRef } from 'react';

function useDoublePress(singlePress, doublePress, callBoth = false) {
  const [timesPressed, setTimesPressed] = useState(0);
  const timer = useRef();
  const singlePressCallback = useRef();
  const doublePressCallback = useRef();

  useEffect(() => {
    singlePressCallback.current = singlePress;
  }, [singlePress]);

  useEffect(() => {
    doublePressCallback.current = doublePress;
  }, [doublePress]);

  useEffect(() => {
    if (timesPressed > 0) {
      timer.current = setTimeout(() => {
        if (timesPressed === 2) {
          doublePressCallback.current();
          callBoth && singlePressCallback.current(true);
        } else if (timesPressed === 1) {
          singlePressCallback.current(false);
        }
        setTimesPressed(0);
      }, 250);
    }
    return () => clearTimeout(timer.current);
  }, [callBoth, timesPressed]);

  return () => setTimesPressed(timesPressed => ++timesPressed);
}

export default useDoublePress;
