import React, { useState } from "react";
import Timer from "./Timer";
import DefaultSettings from "./DefaultSettings";

function TimerWrapper({isUser}) {
  const [workTime, setWorkTime] = useState(0.5);
  const [breakTime, setBreakTime] = useState(1/6);

  return (
    <>
      <DefaultSettings.Provider
        value={{
          workTime,
          setWorkTime,
          breakTime,
          setBreakTime,
        }}
      >
        <Timer isUser={isUser} />
      </DefaultSettings.Provider>
    </>
  );
}

export default TimerWrapper;
