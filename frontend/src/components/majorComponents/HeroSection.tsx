import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import 'animate.css';

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [role, setRole] = useState(""); // Track the clicked role
  const [closing, setClosing] = useState(false); // New state for closing animation
  const navigate = useNavigate();

  const handleButtonClick = (role: React.SetStateAction<string>) => {
    setRole(role);
    setShowPopup(true); // Show the popup on button click
    setClosing(false); // Reset closing state when opening
  };

  const closePopup = () => {
    setClosing(true); // Set closing state to true to trigger closing animation
    setTimeout(() => {
      setShowPopup(false); // Actually hide the popup after the closing animation completes
      setRole(""); // Reset role when closing
    }, 500); // Adjust the time to match the animation duration
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="relative flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Guhuza: Gamifying Recruitment{" "}
        <span className="bg-gradient-to-r from-blue-500 to-red-800 text-transparent bg-clip-text">
          for the Future
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Our advanced technology matches job seeker's profile with jobs on our
        site and ranks them for our employers based on skills required for the
        position. Once the match has been made, live interviews can be conducted
        immediately right through our platform!
      </p>

      <div className="flex flex-col md:flex-row justify-center my-10 relative gap-5 md:gap-4 items-center">
        <Button
          variant={"myButton"}
          aria-label="job_seeker"
          onClick={() => handleButtonClick("recruiter")}
        >
          I am a Recruiter
        </Button>
        <Button
          variant={"myButton"}
          aria-label="Employer"
          onClick={() => handleButtonClick("employee")}
        >
          I am an Employee
        </Button>
      </div>

      {/* Popup with crazy animations */}
      {showPopup && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={closePopup} // Close the popup if clicked outside
        >
          <div
            className={`bg-gradient-to-r from-blue-500 to-blue-800 p-8 rounded-lg shadow-lg w-80 md:w-96 transform transition-all duration-500 ease-in-out ${
              closing
                ? "animate__animated animate__zoomOut" // Apply closing animation
                : "animate__animated animate__zoomIn" // Apply opening animation
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to close popup
          >
            <h2 className="text-2xl text-white font-semibold mb-4">
              {role === "recruiter" ? "Recruiter Experience" : "Employee Experience"}
            </h2>
            <p className="text-white">
  {role === "recruiter" ? (
    <ul className="list-disc pl-6">
      <li><strong>Efficient Candidate Matching</strong>: Access an intuitive platform that automatically matches the best candidates to your job postings based on their skills and qualifications.</li>
      <li><strong>Engaging Gamified Features</strong>: View how candidates perform in various skills tests, allowing you to make data-driven decisions in a fun, interactive way.</li>
      <li><strong>Real-Time Interviews</strong>: Conduct live interviews seamlessly within the platform, evaluating candidates on the spot without the need for external tools.</li>
      <li><strong>Data-Driven Insights</strong>: Make informed hiring decisions with gamified analytics that display each candidate’s strengths and weaknesses clearly.</li>
      <li><strong>Simplified Hiring Process</strong>: Enjoy an easy-to-navigate interface that reduces the complexity of recruitment and makes the hiring process more efficient.</li>
    </ul>
  ) : (
    <ul className="list-disc pl-6">
      <li><strong>Personalized Profile</strong>: Create a standout profile that highlights your skills and achievements, showcasing your potential to employers.</li>
      <li><strong>Gamified Job Matching</strong>: Get matched with job opportunities that align with your expertise and interests, making the search more exciting and rewarding.</li>
      <li><strong>Earn Rewards for Performance</strong>: Participate in skills tests and earn points and rewards based on your performance, helping you stay motivated throughout the process.</li>
      <li><strong>Interactive Job-Seeking</strong>: Transform your job search into an engaging experience where every step feels like a challenge to conquer.</li>
      <li><strong>Exclusive Opportunities</strong>: Gain access to unique job opportunities from top employers who value skill and performance over traditional resumes.</li>
    </ul>
  )}
</p>
            <div className="flex justify-between mt-4">
              <button
                className="text-white bg-blue-400 px-4 py-2 rounded-md hover:bg-red-500 transition"
                onClick={closePopup}
              >
                Close
              </button>
              <button
                className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={handleSignUpRedirect}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
