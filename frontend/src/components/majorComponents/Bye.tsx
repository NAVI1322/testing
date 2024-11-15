"use client";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Take",
    },
    {
      text: "and",
    },
    {
      text: "attend",
    },
    {
      text: "fast",
    },
    {
      text: "Interviews.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Connecting Talent, Powering Growth.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
<Button variant={"myButton"}>Join Now!</Button>

      </div>
    </div>
  );
}
