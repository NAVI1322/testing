import { BorderBeam } from "../ui/border-beam";
interface BorderBeamDemoProps {
  image: string; // Define the type for the image prop
}
export function BorderBeamDemo({ image }: BorderBeamDemoProps) {
  return (
    <div className="shadow-2xl relative flex h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] m-auto flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl sm:text-6xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        <img
          className="w-[190px] h-[190px] sm:w-[290px] sm:h-[290px] md:w-[340px] md:h-[340px] rounded-sm"
          src={image}
          alt="Illustration"
        />
      </span>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
