import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import CreateTest from "@/hooks/CreateTest";
import { Toast } from "@/components/majorComponents/toast";
import { useNavigate } from "react-router-dom";
// import Modal from "@/components/ui/modal";



const CustomModal = ({ show, onClose, onConfirm, title, message, loading }: any) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-blue-500/90 rounded-md shadow-lg p-6 w-[90%] md:w-[500px]">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div className="mb-4">
            {Array.isArray(message) ? (
              message.map((line, index) => <p key={index}>{line}</p>)
            ) : (
              <p>{message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <Button onClick={onClose} variant="outline" disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="myButton"
              disabled={loading}
              className={`flex items-center space-x-2 ${
                loading ? "cursor-wait" : ""
              }`}
            >
              {loading && (
                <span className="loader h-4 w-4 border-t-2 border-white border-opacity-90 rounded-full animate-spin mr-2"></span>
              )}
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  };
interface MainBodyProps {
  formData?: {
    jobName: string;
    jobDescription: string;
    benefits: string;
    ourValues: string;
    positionSummary: string;
    positionResponsibilities: string;
    skillsRequired: string;
    whyWorkWithUs: string;
    wageRate: string;
  };
}

const TestStructure = (formData: MainBodyProps) => {
  interface Question {
    id: string;
    type: string;
    time: number;
    content: string;
    options?: string[];
    correctAnswers?: (string | number)[];
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestionTypeSelection, setShowQuestionTypeSelection] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
  const [_, setValidationIssues] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  type CheckedState = boolean | "indeterminate";
  
  const router = useNavigate();

  const addQuestion = (type: string) => {
    const newQuestion: Question = {
      id: generateRandomId(),
      type: type,
      time: 30,
      content: "",
      options: type === "MCQ" ? [""] : [],
      correctAnswers: [],
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
    setShowQuestionTypeSelection(false);

    console.log(questions)
  };

  const removeQuestion = (id: string) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    if (currentQuestionIndex >= updatedQuestions.length) {
      setCurrentQuestionIndex(updatedQuestions.length - 1);
    }
  };

  const generateRandomId = (): string => {
    const randomValues = new Uint8Array(16);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleQuestionContentChange = (content: string) => {
    if (questions[currentQuestionIndex]) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].content = content;
      setQuestions(updatedQuestions);
    }
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (questions[currentQuestionIndex]?.options) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].options![optionIndex] = value;
      setQuestions(updatedQuestions);
    }
  };

  const addOption = () => {
    if (questions[currentQuestionIndex]) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].options?.push("");
      setQuestions(updatedQuestions);
    }
  };

  const removeOption = (optionIndex: number) => {
    if (questions[currentQuestionIndex]?.options) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].options?.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleCorrectAnswerChange = (option: string, isChecked: CheckedState) => {
    if (questions[currentQuestionIndex]) {
      const updatedQuestions = [...questions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
  
      // Convert CheckedState to boolean
      const checked = isChecked === true;
  
      if (checked) {
        // Add option to correctAnswers
        currentQuestion.correctAnswers = [...(currentQuestion.correctAnswers || []), option];
      } else {
        // Remove option from correctAnswers
        currentQuestion.correctAnswers = (currentQuestion.correctAnswers || []).filter(
          (answer) => answer !== option
        );
      }
  
      setQuestions(updatedQuestions);
    }
  };

  const validateQuestions = () => {
    const issues: string[] = [];
    questions.forEach((question, index) => {
      if (!question.content.trim()) {
        issues.push(`Question ${index + 1} is empty.`);
      }
      if (question.type === "MCQ") {
        question.options?.forEach((option, optIndex) => {
          if (!option.trim()) {
            issues.push(`Option ${optIndex + 1} of Question ${index + 1} is empty.`);
          }
        });
        if (!question.correctAnswers?.length) {
          issues.push(`Question ${index + 1} has no correct answer.`);
        }
      }
    });
    return issues;
  };

  const handleFinishTest = () => {
    const issues = validateQuestions();
    if (issues.length > 0) {
      setValidationIssues(issues);
    }
    setShowModal(true);
  };


  const finishTest = async () => {
    setLoading(true); 
    setShowModal(false);
  
    try {
      const Email = localStorage.getItem("email");
      const Role = localStorage.getItem("role");
      const id = localStorage.getItem("Id");
  
      if (!id || !Email || !Role) {
        Toast("Error", "Unauthorized access. Redirecting...");
        ("/access-denied");
        return;
      }
  
      const recruiterDetails = {
        token: id,
        email: Email,
        role: Role,
      };
      
      // Make sure you're passing a valid argument, replacing `null` with `recruiterDetails`
      const response = await CreateTest(formData, questions, recruiterDetails); 
  
      console.log("Test created successfully:", response);
      Toast("Success", "Test created successfully");
       router("/recruiter");
    } catch (error: any) {
      console.error("Error creating test:", error.message || error);
      Toast("Failed", "Something went wrong. Please try again.");
    }
  };

  const renderQuestion = (type: string) => {
    const question = questions[currentQuestionIndex];

    if (showQuestionTypeSelection) return;
    switch (type) {
      case "MCQ":
        return (
          <div className="question-container mb-4 p-4 border rounded-md shadow-sm">
            <div className="font-semibold mb-5">Question {currentQuestionIndex + 1}</div>
            <textarea
              className="border p-2 w-full mb-4 rounded-md bg-transparent resize-none"
              placeholder="Enter your question here..."
              value={question.content}
              onChange={(e) => handleQuestionContentChange(e.target.value)}
            />
            <div className="text-lg font-medium mb-2">Options:</div>
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
               <Checkbox
  checked={question.correctAnswers?.includes(option)}
  onCheckedChange={(isChecked) => handleCorrectAnswerChange(option, isChecked)}
/>
                <input
                  type="text"
                  className="border p-1 ml-2 flex-grow rounded-md bg-transparent outline-0"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                />
                <Button onClick={() => removeOption(optionIndex)} variant={"destructive"} className="ml-2">
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addOption} variant={"myButton"} className="mt-2">
              Add Option
            </Button>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Question List</h2>
        <div>
          {questions.map((question, index) => (
            <div key={question.id} className="flex justify-between items-center mb-2">
              <span>Question {index + 1}</span>
              <Button onClick={() => removeQuestion(question.id)} variant={"destructive"}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button
          onClick={() => setShowQuestionTypeSelection(true)}
          className="mt-4 w-full myButton"
          variant={"myButton"}
        >
          Add Question
        </Button>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-4">
        {showQuestionTypeSelection && (
          <div className="p-4 border rounded-lg shadow-lg mb-4">
            <div className="font-semibold mb-5">Choose a question type:</div>
            <div className="flex gap-4 mt-2 justify-center space-x-2">
              <Button onClick={() => addQuestion("MCQ")} variant={"myButton"}>
                MCQ
              </Button>
              <Button disabled variant={"ghost"}>
                More Types Soon....
              </Button>
            </div>
          </div>
        )}

        {questions.length > 0 && renderQuestion(questions[currentQuestionIndex].type)}

        <div className="mt-4 flex flex-col items-center">
        <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={finishTest}
        title="Confirm Submission"
        message={["Are you sure you want to submit the test?"]}
        loading={loading} // Pass loading state to modal
      />
<div className="mt-4 flex flex-col items-center space-y-4">
  {questions.length > 1 && (
    <div className="flex space-x-4">
      {currentQuestionIndex > 0 && (
        <Button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          className="myButton"
        >
          Previous Question
        </Button>
      )}
      {currentQuestionIndex < questions.length - 1 && (
        <Button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          className="myButton"
        >
          Next Question
        </Button>
      )}
    </div>
  )}
  <Button onClick={handleFinishTest} className="w-full" variant="myButton">
    Finish Test
  </Button>
</div>
        </div>
      </div>
    </div>
  );
};

export default TestStructure;