// import video1 from "../../assets/video1.mp4";
// import video2 from "../../assets/video2.mp4";
import { Button } from "../ui/button";


const HeroSection = () => {

  return (
    <div className="relative flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Guhuza: Gamifying Recruitment{" "}
        <span className="bg-gradient-to-r from-blue-500 to-red-800 text-transparent bg-clip-text">
          for the Future
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Our advanced technology matches job seeker's profile with jobs on our site and ranks them for our employers based on skills required for the position. Once the match has been made, live interviews can be conducted immediately right through our platform!
      </p>

      <div className="flex flex-col md:flex-row justify-center my-10 relative gap-5 md:gap-4 items-center">
  <Button variant={"myButton"} aria-label="JOB_SEEKER">I am a Recruiter</Button>
  <Button variant={"myButton"} aria-label="Employer">I am an Employer</Button>
 
</div>
   

      {/* <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 shadow-sm shadow-blue-400 mx-2 my-4 hover:scale-105 transition-all duration-300"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 shadow-sm shadow-blue-400 mx-2 my-4 hover:scale-105 transition-all duration-300"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  );
};

export default HeroSection;
