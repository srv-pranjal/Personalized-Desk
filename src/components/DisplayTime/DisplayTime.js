import { useUserDetails } from "contexts";
import { useState, useEffect } from "react";
import { TbExchange } from "react-icons/tb";
import "./DisplayTime.css";

export const DisplayTime = () => {
  const { userDetails, setUserDetails } = useUserDetails();
  const { is12HourClockEnabled } = userDetails;
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  const changeTimeFormat = () => {
    setUserDetails((user) => ({
      ...user,
      is12HourClockEnabled: !user.is12HourClockEnabled,
    }));
    localStorage.setItem(
      "USER",
      JSON.stringify({
        ...userDetails,
        is12HourClockEnabled: !is12HourClockEnabled,
      })
    );
  };

  return (
    <div className="time-container">
      <span className="current-time">
        {currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hourCycle: is12HourClockEnabled ? "h12" : "h23",
        })}
      </span>
      <TbExchange className="switch-format" onClick={changeTimeFormat} />
    </div>
  );
};
