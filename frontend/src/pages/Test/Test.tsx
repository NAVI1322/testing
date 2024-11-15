import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Summary from './elements/testSummary';

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-up";
  time?: number;
  content: string;
  options: string[];
  correctAnswers: string[];
}

interface LocationState {
  jobId?: string;
  QuestionObj?: Question[];
  employeeInfo?: EmployeeInfo;
  jobData?: JobDescriptionProps;
}

interface EmployeeInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
}

interface JobDescriptionProps {
  jobName: string;
  location: string;
  description: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skills: string;
  whyWorkWithUs: string;
  createdAt: string;
}

const Test: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const location = useLocation();
  const { jobId: JobId, QuestionObj = [], employeeInfo, jobData }: LocationState = location.state as LocationState;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestStarted && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft]);

  useEffect(() => {
    setTimeLeft(QuestionObj[currentQuestionIndex]?.time || 30);
  }, [QuestionObj, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QuestionObj.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(QuestionObj[currentQuestionIndex + 1]?.time || 30);
    } else {
      setIsTestStarted(false);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const quizData = { employeeInfo, JobId, answers: userAnswers, QuestionObj, jobData };
    try {
      const response = await fetch("https://yourserver.com/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) throw new Error("Failed to submit quiz data");
      console.log("Quiz submitted successfully:", await response.json());
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const currentQuestion = QuestionObj[currentQuestionIndex];

  return (
    <div>
      {employeeInfo && <h2>Welcome, {employeeInfo.fullName}!</h2>}
      {isTestStarted ? (
        <>
          <h3>{currentQuestion?.content}</h3>

          {currentQuestion?.type === "multiple-choice" && (
            <div>
              {currentQuestion.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerChange(option)}>
                  {userAnswers[currentQuestionIndex] === option && <span>✓</span>}
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion?.type === "true-false" && (
            <div>
              {["True", "False"].map((option) => (
                <button key={option} onClick={() => handleAnswerChange(option)}>
                  {userAnswers[currentQuestionIndex] === option && <span>✓</span>}
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion?.type === "fill-up" && (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer"
              value={userAnswers[currentQuestionIndex] || ""}
            />
          )}

          <div>
            <p>Time left: {timeLeft !== null ? timeLeft : 0} seconds</p>
            <button onClick={handleNextQuestion}>Next</button>
          </div>
        </>
      ) : (
        <Summary
          employeeInfo={employeeInfo}
          jobData={jobData}
          QuestionObj={QuestionObj}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
};

export default Test;
