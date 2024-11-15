import Globe from "@/components/ui/globe";
import { TypewriterEffectSmoothDemo } from "./Bye";

export function GlobeDemo() {
  return (
    <>
    <div className="mt-10">

        <TypewriterEffectSmoothDemo/>
    <div className=" relative -mt-52 flex size-full items-center justify-center overflow-hidden rounded-lg px-20 pb-40  md:pb-60 m-auto ">
      <span className="pt-20 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl sm:text-7xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Guhuza
      </span>
      {/* <Globe className="top-40" /> */}

    </div>
    </div>
    </>
  );
}
