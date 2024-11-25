import axios from "axios";


export async function handleQuizSubmit(payload:any)  {
  try {

    console.log(payload)


    const response = await axios.post("http://localhost:3000/create/submitApplication", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting quiz data:", error);
    throw new Error("Failed to submit quiz data. Please try again.");
  }
}