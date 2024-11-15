import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const TestStructure = () => {
    interface Question {
        id: string;
        type: string;
        time: number;
        content: string;
        options?: string[];
        correctAnswers?: (string | number)[];
    }

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
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
        if (currentQuestionIndex !== null) {
            const newIndex = updatedQuestions.length === 0 ? null : Math.min(currentQuestionIndex, updatedQuestions.length - 1);
            setCurrentQuestionIndex(newIndex);
        }
    };

    const generateRandomId = (): string => {
        const randomValues = new Uint8Array(16);
        window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const handleQuestionContentChange = (content: string) => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].content = content;
            setQuestions(updatedQuestions);
        }
    };

    const handleOptionChange = (optionIndex: number, value: string) => {
        if (currentQuestionIndex !== null && questions[currentQuestionIndex].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options![optionIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const addOption = () => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options?.push("");
            setQuestions(updatedQuestions);
        }
    };

    const removeOption = (optionIndex: number) => {
        if (currentQuestionIndex !== null && questions[currentQuestionIndex].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].options?.splice(optionIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectAnswerChange = (answerIndex: number, value: string) => {
        if (currentQuestionIndex !== null) {
            const updatedQuestions = [...questions];
            if (!updatedQuestions[currentQuestionIndex].correctAnswers) {
                updatedQuestions[currentQuestionIndex].correctAnswers = [];
            }
            updatedQuestions[currentQuestionIndex].correctAnswers[answerIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const logQuestions = () => {
        console.log(questions);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderQuestion = (type: string) => {
        const question = questions[currentQuestionIndex!];
        switch (type) {
            case "MCQ":
                return (
                    <div className="question-container">
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={question.content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <div>Options:</div>
                        {question.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="option-container">
                                <Checkbox
                                    checked={question.correctAnswers?.includes(optionIndex.toString())}
                                    onCheckedChange={(checked) => handleCorrectAnswerChange(optionIndex, checked ? optionIndex.toString() : "")}
                                />
                                <input
                                    type="text"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                />
                                <Button onClick={() => removeOption(optionIndex)} variant={"myButton"} className="myButton">Remove</Button>
                            </div>
                        ))}
                        <Button onClick={addOption} className="myButton"  variant={"myButton"}>Add Option</Button>
                    </div>
                );
            case "Fill Up":
                return (
                    <div className="question-container">
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={question.content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={question.correctAnswers?.[0] || ""}
                            onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                        />
                    </div>
                );
            case "True/False":
                return (
                    <div className="question-container">
                        <textarea
                            className="border p-2 w-full mb-4 rounded-md"
                            placeholder="Enter your question here..."
                            value={question.content}
                            onChange={(e) => handleQuestionContentChange(e.target.value)}
                        />
                        <RadioGroup
                            defaultValue={question.correctAnswers?.[0] as string || "true"}
                            onValueChange={(value) => handleCorrectAnswerChange(0, value)}
                        >
                            <RadioGroupItem value="true" id="true" />
                            <label htmlFor="true">True</label>
                            <RadioGroupItem value="false" id="false" />
                            <label htmlFor="false">False</label>
                        </RadioGroup>
                    </div>
                );
            default:
                return null;
        }
    };

    const finishTest = () => {
        console.log('Test finished with questions:', questions);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 p-4 border-r">
                <h2 className="text-lg font-semibold mb-4">Question List</h2>
                <div>
                    {questions.map((question, index) => (
                        <div key={question.id} className="flex justify-between items-center">
                            <span>Question {index + 1}</span>
                            <Button onClick={() => removeQuestion(question.id)} className="myButton text-red-600"  variant={"myButton"}>Remove</Button>
                        </div>
                    ))}
                </div>
                <Button onClick={() => setShowQuestionTypeSelection(true)} className="mt-4 w-full myButton"  variant={"myButton"}>Add Question</Button>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                {showQuestionTypeSelection && (
                    <div className="p-4 border rounded-lg shadow-lg mb-4">
                        <div>Choose a question type:</div>
                        <div className="flex gap-4 mt-2">
                            <Button onClick={() => addQuestion("MCQ")} className="myButton" variant={"myButton"}>MCQ</Button>
                            <Button onClick={() => addQuestion("Fill Up")} className="myButton" variant={"myButton"}>Fill Up</Button>
                            <Button onClick={() => addQuestion("True/False")} className="myButton" variant={"myButton"}>True/False</Button>
                        </div>
                    </div>
                )}

                {currentQuestionIndex !== null && questions.length > 0 && renderQuestion(questions[currentQuestionIndex].type)}

                <div className="mt-4">
                    <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === null || currentQuestionIndex === 0}  variant={"myButton"}>Previous</Button>
                    <Button onClick={nextQuestion} disabled={currentQuestionIndex === null || currentQuestionIndex === questions.length - 1}  variant={"myButton"}>Next</Button>
                    <Button onClick={logQuestions} className="ml-2 myButton"  variant={"myButton"}>Log Questions</Button>
                </div>
                <Button onClick={finishTest} className="mt-4 myButton"  variant={"myButton"}>Finish Test</Button>
            </div>
        </div>
    );
};

export default TestStructure;
