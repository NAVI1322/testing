import { Toast } from "@/components/majorComponents/toast";
import { handleQuizSubmit } from "@/hooks/HandleQuizSubmit";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Nav";


const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Location State:", location.state); 

  const {
    jobDetails = { jobDescription: {} },
    employeeDetails = {},
    answers = [],
    questions = [],
    score = 0,
  } = location.state || {};

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100 text-red-800">
        <h1 className="text-2xl font-bold">
          Error: Quiz details are not available!
        </h1>
      </div>
    );
  }

  const handleSubmit = async () => {
    const payload = {
      jobDetails,
      employeeDetails,
      answers,
      questions,
      score,
    };

    try {
      const response = await handleQuizSubmit(payload);
      console.log("Quiz data submitted successfully:", response);

      Toast("Success", "Application Submitted Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during quiz submission:", error);
      Toast("Error", "Application Already submitted");
    }
  };

  const passPercentage = 0.6; // Passing percentage (60%)

  return (
   <div className="h-screen">
    <div className="bg-transparent">
      <Navbar />
    </div>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black ">
      
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Quiz Summary
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Your Details Section */}
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Your Details</h2>
          <p>
            <strong>Job Name:</strong>{" "}
            {jobDetails.jobData.jobDescription?.jobName || "N/A"}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {jobDetails.jobData.jobDescription?.location || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {jobDetails.jobData.jobDescription?.description || "N/A"}
          </p>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <p>
            <strong>Name:</strong> {employeeDetails.firstName || "N/A"}{" "}
            {employeeDetails.lastName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {employeeDetails.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {employeeDetails.phoneNumber || "N/A"}
          </p>
          <p>
            <strong>Cover Letter:</strong>{" "}
            {employeeDetails.coverLetter || "N/A"}
          </p>
        </div>

        {/* Your Attempt Section */}
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Your Attempt</h2>
          <div className="max-h-72 overflow-y-scroll space-y-4">
            {questions.map((question: any, index: any) => (
              <div
                key={question.id}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md"
              >
                <p className="font-semibold">
                  {index + 1}. {question.content}
                </p>
                <p>
                  <strong>Your Answer:</strong>{" "}
                  {answers[index]?.join(", ") || "No answer selected"}
                </p>
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  {question.correctAnswers.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <p className="text-lg">
            <strong>Your Score:</strong> {score} / {questions.length}
          </p>
          {score / questions.length < passPercentage && (
            <div className="mt-4 text-red-600 dark:text-red-400">
              <p className="text-lg font-bold">You failed the quiz.</p>
              <p>Please retry to improve your score.</p>
            </div>
          )}
          {score / questions.length >= passPercentage && (
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400">
                Great job! Keep improving to climb the leaderboard!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        {/* Retake Quiz Button */}
        <button
          onClick={() =>
            navigate("/rest", {
              state: {
                jobDetails,
                employeeDetails,
              },
            })
          }
          className="bg-blue-400 hover:bg-blue-300 text-white font-semibold py-3 px-6 rounded-md"
        >
          Retake Quiz
        </button>

        {/* Submit Quiz Button (Conditionally Rendered) */}
        {score / questions.length >= passPercentage && (
          <button
            onClick={handleSubmit}
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-md"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
   </div>
  );
};

export default QuizResults;