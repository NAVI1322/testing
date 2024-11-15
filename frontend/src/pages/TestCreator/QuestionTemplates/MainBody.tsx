import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";



interface MainBodyProps {
    formdata?: {
        jobName: string;
        skills: string;
        description: string;
        location: string;
        benefits: string;
        ourValues: string;
        whyWorkWithUs: string;
        positionSummary: string;
        positionResponsibilities: string;
    };
}



interface MainBodyProps {
    formdata?: {
        jobName: string;
        skills: string;
        description: string;
        location: string;
        benefits: string;
        ourValues: string;
        whyWorkWithUs: string;
        positionSummary: string;
        positionResponsibilities: string;
    };
}

const TestStructure = (formdata:MainBodyProps) => {
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

    const addQuestion = (type: string) => {
        const newQuestion: Question = {
            id: generateRandomId(),
            type: type,
            time: 30,
            content: "",
            options: type === "MCQ" ? [""] : [],
            correctAnswers: type === "Fill Up" ? [""] : [],
        };
        setQuestions([...questions, newQuestion]);
        setCurrentQuestionIndex(questions.length);
        setShowQuestionTypeSelection(false);
    };

    const removeQuestion = (id: string) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
        if (currentQuestionIndex >= updatedQuestions.length) {
            setCurrentQuestionIndex(updatedQuestions.length - 1);
        }
    };

    const generateRandomId = (): string => {
        const randomValues = new Uint8Array(16);
        window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues, byte => byte.toString(16).padStart(2, '0')).join('');
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

    const handleCorrectAnswerChange = (answerIndex: number, value: string) => {
        // Check if there is a current question available
        if (questions[currentQuestionIndex]) {
            // Create a shallow copy of the questions array to avoid direct mutation
            const updatedQuestions = [...questions];
            
            // Initialize the correctAnswers property if it doesn't exist
            if (!updatedQuestions[currentQuestionIndex].correctAnswers) {
                updatedQuestions[currentQuestionIndex].correctAnswers = [];
            }
            
            // Update the specific correct answer at the given answerIndex with the new value
            updatedQuestions[currentQuestionIndex].correctAnswers[answerIndex] = value;
            
            // Update the state of questions to trigger a re-render with the new data
            setQuestions(updatedQuestions);
        }
    };
    
    

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
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
                                    checked={question.correctAnswers?.includes(optionIndex.toString())}
                                    onCheckedChange={(checked) => handleCorrectAnswerChange(optionIndex, checked ? optionIndex.toString() : "")}
                                />
                                <input
                                    type="text"
                                    className="border p-1 ml-2 flex-grow rounded-md bg-transparent outline-0"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                />
                                <Button onClick={() => removeOption(optionIndex)} variant={"destructive"} className="ml-2 ">Remove</Button>
                            </div>
                        ))}
                        <Button onClick={addOption} variant={"myButton"} className="mt-2">Add Option</Button>
                    </div>
                );
            case "Fill Up":
                return (
                    <div className="question-container mb-4 p-4 border rounded-md shadow-sm">
                        <div className="font-semibold mb-5">Question {currentQuestionIndex + 1}</div>
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md bg-transparent resize-none"
                            placeholder="Enter your question here..."
                            value={question.content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border p-1 w-full rounded-md bg-transparent outline-0"
                            placeholder="Correct Answer"
                            value={question.correctAnswers?.[0] || ""}
                            onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                        />
                    </div>
                );
            case "True/False":
                return (
                    <div className="question-container mb-4 p-4 border rounded-md shadow-sm">
                        <div className="font-semibold mb-5">Question {currentQuestionIndex + 1}</div>
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md bg-transparent resize-none"
                            placeholder="Enter your question here..."
                            value={question.content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <RadioGroup
                            onValueChange={(value) => handleCorrectAnswerChange(0, value)}
                        >
                            <div className="flex items-center">
                                <RadioGroupItem value="true"  id="true" />
                                <label htmlFor="true" className="ml-2">True</label>
                                <RadioGroupItem value="false" id="false" className="ml-4" />
                                <label htmlFor="false" className="ml-2">False</label>
                            </div>
                        </RadioGroup>
                    </div>
                );
            default:
                return null;
        }
    };

    const finishTest = async () => {
        console.log(formdata)
        console.log(JSON.stringify(questions,null,2))
    // await CreateTest(formdata,questions)

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
                            <Button onClick={() => removeQuestion(question.id)} variant={"destructive"}>Remove</Button>
                        </div>
                    ))}
                </div>
                <Button onClick={() => setShowQuestionTypeSelection(true)} className="mt-4 w-full myButton" variant={"myButton"}>Add Question</Button>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 w-full p-4">
                {showQuestionTypeSelection && (
                    <div className="p-4 border rounded-lg shadow-lg mb-4">
                        <div className="font-semibold mb-5">Choose a question type :</div>
                        <div className="flex gap-4 mt-2 justify-center space-x-2">
                            <Button onClick={() => addQuestion("MCQ")} variant={"myButton"}>MCQ</Button>
                            <Button onClick={() => addQuestion("Fill Up")} variant={"myButton"}>Fill Up</Button>
                            <Button onClick={() => addQuestion("True/False")} variant={"myButton"}>True/False</Button>
                        </div>
                    </div>
                )}

                {questions.length > 0 && renderQuestion(questions[currentQuestionIndex].type)}

                <div className="mt-4 flex flex-col md:flex-row justify-between">
                    <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} variant={"outline"}>Previous</Button>
                    <Button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1} variant={"outline"}>Next</Button>   
                </div>
                <div className="mt-4 flex flex-col md:flex-row justify-between">
                <Button onClick={finishTest} className="mt-4 md:mt-0 w-full" variant={"myButton"}>Finish Test</Button>  </div>
             
            </div>
        </div>
    );
};

export default TestStructure;