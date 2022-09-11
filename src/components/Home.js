import React from "react";
import UserLogin from "./user/UserLogin";
import TimerWrapper from "./timer/TimerWrapper.js";

function Home() {
  return (
    <>
      <div className="md:h-[100vh] 2xl:container flex flex-col md:flex-row bg-dark p-5 md:p-0">
        <div className="md:basis-1/2 mt-16 md:m-auto">
          <UserLogin />
        </div>
        <div className="sm:basis-1/2 m-auto">
          <TimerWrapper isUser={false} />
        </div>
      </div>
    </>
  );
}

export default Home;
