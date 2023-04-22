import React, { useEffect, useState } from "react";

const Clock = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let interval;

  const countDown = () => {
    const destination = new Date("May 29, 2023").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = destination - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    countDown();
  }, []);

  return (
    <React.Fragment>
      <div className="clock__wrapper d-flex align-items-center gap-5">
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h4 className="text-white">{days}</h4>
            <h6 className="text-white">Days</h6>
          </div>
          <span className="text-white fs-3">:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h4 className="text-white">{hours}</h4>
            <h6 className="text-white">Hours</h6>
          </div>
          <span className="text-white fs-3">:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h4 className="text-white">{minutes}</h4>
            <h6 className="text-white">Minutes</h6>
          </div>
          <span className="text-white fs-3">:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h4 className="text-white">{seconds}</h4>
            <h6 className="text-white">Seconds</h6>
          </div>
          {/* <span className="text-white fs-3">:</span> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Clock;
