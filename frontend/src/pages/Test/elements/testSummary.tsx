import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SummaryProps {
  employeeInfo?: {
    fullName: string;
    email: string;
    phoneNumber: string;
    coverLetter?: string;
  };
  jobData?: {
    jobName: string;
    location: string;
    description: string;
  };
  QuestionObj?: {
    id: string;
    content: string;
  }[];
  userAnswers: string[];
}

const Summary: React.FC<SummaryProps> = ({ employeeInfo, jobData, QuestionObj = [], userAnswers }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Unsaved progress will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmitConfirm = () => {
    const userConfirmed = window.confirm("Are you sure you want to submit the quiz? You will be redirected to the dashboard.");
    if (userConfirmed) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ">
      <h3 className="text-2xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">Summary</h3>
    
      {/* Employee Info Card */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-blue-600 md:flex md:items-start md:justify-between space-y-4 md:space-y-0 md:space-x-6">
        <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 md:mb-0">Employee Information</h4>
        <div className="text-gray-700 dark:text-gray-300 space-y-2 flex-1">
          <p><span className="font-medium">Full Name:</span> {employeeInfo?.fullName || "N/A"}</p>
          <p><span className="font-medium">Email:</span> {employeeInfo?.email || "N/A"}</p>
          <p><span className="font-medium">Phone:</span> {employeeInfo?.phoneNumber || "N/A"}</p>
          <p><span className="font-medium">Cover Letter:</span> {employeeInfo?.coverLetter || "Not provided"}</p>
        </div>
      </div>

      {/* Job Details Card */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-green-600 md:flex md:items-start md:justify-between space-y-4 md:space-y-0 md:space-x-6">
        <h4 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 md:mb-0">Job Details</h4>
        <div className="text-gray-700 dark:text-gray-300 space-y-2 flex-1">
          <p><span className="font-medium">Job Name:</span> {jobData?.jobName || "N/A"}</p>
          <p><span className="font-medium">Location:</span> {jobData?.location || "N/A"}</p>
          <p><span className="font-medium">Description:</span> {jobData?.description || "N/A"}</p>
        </div>
      </div>

      {/* Answers Summary Card */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <h4 className="text-xl font-semibold text-yellow-500 dark:text-yellow-400 mb-4">Your Answers</h4>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {QuestionObj.length > 0 ? (
            QuestionObj.map((question, index) => (
              <div key={question.id} className="py-2 border-b last:border-b-0">
                <p className="font-medium text-gray-800 dark:text-gray-200">Q{index + 1}: {question.content}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Your Answer:</strong> {userAnswers[index] || <span className="italic text-gray-400">Not answered</span>}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300 italic">No questions available.</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <Button
          variant="myButton"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform hover:scale-105"
          onClick={handleSubmitConfirm}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default Summary;
