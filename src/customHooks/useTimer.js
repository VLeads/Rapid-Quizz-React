import React, { useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [timerSec, setTimerSec] = useState(30);
  const [timerMin, setTimerMin] = useState(1);

  const sec = useRef(30);
  const min = useRef(1);

  useEffect(() => {
    const timerId = setInterval(() => {
      sec.current -= 1;
      if (sec.current === 0) {
        if (min.current === 0) {
          clearInterval(timerId);
        } else {
          setTimerSec(59);
          min.current -= 1;
          setTimerMin((prev) => prev - 1);
        }
      } else {
        setTimerSec((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { timerSec, timerMin, sec, min };
};
