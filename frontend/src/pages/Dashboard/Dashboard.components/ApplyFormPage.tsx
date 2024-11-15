import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ApplyFormPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobData, jobId } = location.state;
  
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleNextStepClickEvent = () => {
    navigate("/rest", { state: { jobId, employeeInfo, jobData } });
  };

  return (
    <div className="flex justify-center items-center h-screen py-6">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Apply for {jobData.jobDescription.jobName}</h2>
        <form className="space-y-4">
          <Input
            type="text"
            name="fullName"
            placeholder="Your Name"
            value={employeeInfo.fullName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={employeeInfo.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Your Phone Number"
            value={employeeInfo.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="coverLetter"
            placeholder="Write a short cover letter"
            rows={4}
            value={employeeInfo.coverLetter}
            onChange={handleInputChange}
          />
          <Button type="button" onClick={handleNextStepClickEvent} className="w-full bg-blue-600 text-white">
            Next Step
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplyFormPage;
