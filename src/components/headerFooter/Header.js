import React from "react";

export default function Header() {
  return (
    <div className="fixed top-0 w-full py-2 md:py-4 text-center bg-dark z-10">
      <h1 className="inline-block text-transparent leading-relaxed text-3xl sm:text-4xl bg-gradient-to-r from-[#10b981_40px] via-[#3b82f6] to-[#8b5cf6] bg-clip-text font-medium md:text-[2rem]">
        Pomodro App
      </h1>
    </div>
  );
}
