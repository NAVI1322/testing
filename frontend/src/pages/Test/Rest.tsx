import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/ui/stars-background";
import { useNavigate, useLocation } from "react-router-dom";

interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswers: string[];
  type: "multiple-choice" | "true-false";
  timeLimit: number;
}

interface JobDetails {
  jobId: string;
  QuestionObj: Question[];
  jobData: JobDescription;
}

interface JobDescription {
  jobName: string;
  location: string;
  description: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skills: string;
  whyWorkWithUs: string;
}

interface EmployeeDetails {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  location: string;
  resume: string | null;
  coverLetter: string;
  whyJoin: string;
  availability: string;
}

interface LocationState {
  jobDetails: JobDetails;
  employeeDetails: EmployeeDetails;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [allAttempts, setAllAttempts] = useState<string[][]>([]);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { jobDetails, employeeDetails }: LocationState = location.state || {};
  const { jobId, QuestionObj, jobData } = jobDetails || {};

  const filteredQuestions = QuestionObj.filter(
    (question) =>
      question.type === "multiple-choice" || question.type === "true-false"
  );

  if (!filteredQuestions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100 text-red-800">
        <h1 className="text-2xl font-bold">Error: No valid questions available!</h1>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalDuration = currentQuestion?.timeLimit || 40;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isActive && elapsedTime < totalDuration) {
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    } else if (elapsedTime >= totalDuration) {
      setIsActive(false);
      handleNext();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, elapsedTime]);

  const handleOptionSelect = (option: string) => {
    if (currentQuestion.type === "multiple-choice") {
      setSelectedAnswers((prev) =>
        prev.includes(option) ? prev.filter((ans) => ans !== option) : [...prev, option]
      );
    } else {
      setSelectedAnswers([option]);
    }
  };

  const handleNext = () => {
    setAllAttempts((prev) => [...prev, selectedAnswers]);
    setSelectedAnswers([]);

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setElapsedTime(0);
      setIsActive(true);
    } else {
      setShowEndScreen(true);
      setIsActive(false);
    }
  };

  const handleSubmit = () => {
    const quizData = {
      jobId,
      employeeDetails,
      answers: allAttempts,
      questions: filteredQuestions,
    };

    console.log("Quiz Data Submitted:", quizData);
    navigate("/summary", { state: quizData });
  };

  const remainingTime = totalDuration - elapsedTime;
  const progress = Math.min((elapsedTime / totalDuration) * 100, 100).toFixed(2);

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <StarsBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col h-full w-[95%] max-w-4xl mx-auto py-6">
        {showEndScreen ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              Quiz Summary
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {/* Your Details Section */}
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4">Your Details</h2>
                <p>
                  <strong>Job Name:</strong> {jobData.jobName || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {jobData.location || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong> {jobData.description || "N/A"}
                </p>
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
                <p>
                  <strong>Name:</strong> {employeeDetails.firstName}{" "}
                  {employeeDetails.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {employeeDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {employeeDetails.phoneNumber}
                </p>
                <p>
                  <strong>Cover Letter:</strong>{" "}
                  {employeeDetails.coverLetter || "N/A"}
                </p>
              </div>

              {/* Your Attempt Section */}
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4">Your Attempt</h2>
                <ul className="space-y-4">
                  {filteredQuestions.map((question, index) => (
                    <li
                      key={question.id}
                      className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md"
                    >
                      <p className="font-semibold">
                        {index + 1}. {question.content}
                      </p>
                      <p>
                        <strong>Your Answer:</strong>{" "}
                        {allAttempts[index]?.join(", ") || "No answer selected"}
                      </p>
                      <p>
                        <strong>Correct Answer:</strong>{" "}
                        {question.correctAnswers.join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleSubmit}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-md"
                >
                  Submit Quiz
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full">
            <div className="w-full flex justify-between items-center font-medium text-lg mb-4">
              <span className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Question {currentQuestionIndex + 1}/{filteredQuestions.length}
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                Time Remaining: {remainingTime}s
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                {currentQuestion.content}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`w-full py-3 rounded-lg text-left px-4 font-medium ${
                      selectedAnswers.includes(option)
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-md">
                  <div
                    className="bg-blue-500 h-2 rounded-md"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers.length === 0}
                  className="ml-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  {currentQuestionIndex === filteredQuestions.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;