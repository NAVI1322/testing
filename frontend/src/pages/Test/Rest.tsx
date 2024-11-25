import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/ui/stars-background";
import { useNavigate, useLocation } from "react-router-dom";

interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswers: string[];
  type: "multiple-choice" | "true-false" | "MCQ";
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
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { jobDetails, employeeDetails }: LocationState = location.state || {};
  const { QuestionObj } = jobDetails || {};

  // Generate random questions only once
  useEffect(() => {
    const filteredQuestions = QuestionObj.filter(
      (question) =>
        question.type === "multiple-choice" ||
        question.type === "true-false" ||
        question.type === "MCQ"
    );

    const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 8);

    setRandomQuestions(selectedQuestions);
  }, [QuestionObj]);

  // Timer logic
  useEffect(() => {
    if (!randomQuestions.length) return;

    let timer: NodeJS.Timeout | undefined;
    if (isActive && elapsedTime < (randomQuestions[currentQuestionIndex]?.timeLimit || 40)) {
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    } else if (elapsedTime >= (randomQuestions[currentQuestionIndex]?.timeLimit || 40)) {
      setIsActive(false);
      handleNext();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [elapsedTime, isActive, randomQuestions, currentQuestionIndex]);

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers([option]);
  };

  const handleNext = () => {
    setAllAttempts((prev) => [...prev, selectedAnswers]);
    setSelectedAnswers([]);

    if (currentQuestionIndex < randomQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setElapsedTime(0);
      setIsActive(true);
    } else {
      handleSubmit();
    }
  };

  const calculateScore = (): number => {
    return randomQuestions.reduce((score, question, index) => {
      const userAnswers = allAttempts[index] || [];
      const correctAnswers = question.correctAnswers;

      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((ans) => correctAnswers.includes(ans));
      return isCorrect ? score + 1 : score;
    }, 0);
  };

  const handleSubmit = () => {
    const quizData = {
      jobDetails,
      employeeDetails,
      answers: allAttempts,
      questions: randomQuestions.map((q) => ({
        content: q.content,
        correctAnswers: q.correctAnswers,
      })),
      score: calculateScore(),
    };

    console.log("Navigating with State:", quizData);
    navigate("/quiz-results", { state: quizData });
  };

  const remainingTime =
    randomQuestions[currentQuestionIndex]?.timeLimit - elapsedTime || 0;
  const progress = Math.min(
    (elapsedTime /
      (randomQuestions[currentQuestionIndex]?.timeLimit || 40)) *
      100,
    100
  ).toFixed(2);

  if (!randomQuestions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100 text-red-800">
        <h1 className="text-2xl font-bold">
          Error: No valid questions available!
        </h1>
      </div>
    );
  }

  const currentQuestion = randomQuestions[currentQuestionIndex];

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <StarsBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col h-full w-[95%] max-w-4xl mx-auto py-6">
        <div className="flex flex-col items-center h-full">
          <div className="w-full flex justify-between items-center font-medium text-lg mb-4">
            <span className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Question {currentQuestionIndex + 1}/{randomQuestions.length}
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              Time Remaining: {remainingTime}s
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{currentQuestion.content}</h2>
            <div className="space-y-3">
              {currentQuestion.type === "true-false" ? (
                <>
                  <button
                    className={`w-full py-3 rounded-lg text-left px-4 font-medium ${
                      selectedAnswers.includes("true")
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                    onClick={() => handleOptionSelect("true")}
                  >
                    True
                  </button>
                  <button
                    className={`w-full py-3 rounded-lg text-left px-4 font-medium ${
                      selectedAnswers.includes("false")
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                    onClick={() => handleOptionSelect("false")}
                  >
                    False
                  </button>
                </>
              ) : (
                currentQuestion.options.map((option) => (
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
                ))
              )}
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
                {currentQuestionIndex === randomQuestions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;