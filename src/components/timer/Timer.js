import React, { useState, useEffect, useRef, useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DefaultSettings from "./DefaultSettings";

function Timer({ isUser }) {
  console.log(isUser);
  const settings = useContext(DefaultSettings);
  const isUserRef = useRef(isUser);

  const [isPaused, setIsPaused] = useState(isUserRef.current ? true : false);
  const [mode, setMode] = useState("workTime");
  const [leftTime, setLeftTime] = useState(0);
  const [reset, setReset] = useState(false);

  const leftTimeRef = useRef(leftTime);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const tick = () => {
    leftTimeRef.current--;
    setLeftTime(leftTimeRef.current);
  };

  const resetHandler = () => {
    // console.log("lr", leftTimeRef.current, "lt", leftTime, "mr", modeRef.current, "m", mode, "pr", isPausedRef.current, "p", isPaused);
    setReset(true);
  };

  useEffect(() => {
    const checkReset = () => {
      if (!reset) return;
      leftTimeRef.current =
        (modeRef.current === "workTime"
          ? settings.workTime
          : settings.breakTime) * 60;
      setReset(false);
    };

    const switchMode = () => {
      const nextMode =
        modeRef.current === "workTime" ? "breakTime" : "workTime";
      const currentTime =
        (nextMode === "workTime" ? settings.workTime : settings.breakTime) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setLeftTime(currentTime);
      leftTimeRef.current = currentTime;
    };

    console.log(isUser, isUserRef.current, isUserRef);
    if (isUserRef.current) {
      console.log(mode, modeRef.current, isPaused, isPausedRef.current);
      settings.setWorkTime(25);
      settings.setBreakTime(5);
      if (!isPausedRef.current) {
        setIsPaused(isPausedRef.current);
        isPausedRef.current = isPaused;
      }
      console.log(settings.workTime, settings.breakTime, isPaused);
    }
    // For the first time rendering
    leftTimeRef.current =
      (modeRef.current === "workTime"
        ? settings.workTime
        : settings.breakTime) * 60;
    setLeftTime(leftTimeRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (leftTimeRef.current === 0) return switchMode();

      checkReset();
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settings, reset]);

  const totalTime =
    (mode === "workTime" ? settings.workTime : settings.breakTime) * 60;
  const percent = Math.round((leftTime / totalTime) * 100);

  const minutes = Math.floor(leftTime / 60);
  let seconds = leftTime % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border rounded-md border-[rgba(229,231,235,0.2)] mt-6 p-5 w-full sm:w-[70%] lg:w-[50%]">
          <CircularProgressbar
            value={percent}
            text={minutes + ":" + seconds}
            background
            backgroundPadding={5}
            strokeWidth={5}
            styles={buildStyles({
              backgroundColor: "#2563eb",
              textColor: modeRef.current === "workTime" ? "#3fd18b" : "#f3f4f6",
              pathColor:
                modeRef.current === "workTime"
                  ? `rgb(63, 209, 139, ${percent / 100})`
                  : `rgb(243, 244, 246, ${percent / 100})`,
              trailColor: "#00153c",
            })}
          />
        </div>
        {!isUser ? (
          <></>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {isPaused ? (
              <button
                className="p-2 border rounded-md border-[rgba(229,231,235,0.2)] hover:text-hover hover:bg-textSecondary transition-all"
                onClick={() => {
                  setIsPaused(false);
                  isPausedRef.current = false;
                }}
              >
                <PlayArrowIcon />
              </button>
            ) : (
              <button
                className="p-2 border rounded-md border-[rgba(229,231,235,0.2)] hover:text-hover hover:bg-textSecondary transition-all"
                onClick={() => {
                  setIsPaused(true);
                  isPausedRef.current = true;
                }}
              >
                <PauseIcon />
              </button>
            )}
            <button
              className="ml-3 p-2 border rounded-md border-[rgba(229,231,235,0.2)] hover:text-hover hover:bg-textSecondary transition-all"
              onClick={resetHandler}
            >
              <ReplayIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Timer;
