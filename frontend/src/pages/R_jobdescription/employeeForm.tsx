import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface JobFormData {
  jobName: string;
  jobDescription: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skillsRequired: string;
  whyWorkWithUs: string;
  wageRate: string;
  location: string;
}

const tips = {
  jobName: "Provide a concise job title to attract the right candidates.",
  wageRate: "Provide the wage or salary range to attract suitable candidates.",
  jobDescription: "Describe the role's responsibilities, expectations, and daily tasks.",
  benefits: "List benefits like health coverage, PTO, or flexible hours to attract talent.",
  ourValues: "Share your company’s values to attract culturally aligned candidates.",
  positionSummary: "Summarize the position and key responsibilities in a few sentences.",
  positionResponsibilities: "Describe the daily responsibilities of this role.",
  skillsRequired: "List essential skills and qualifications needed for the job.",
  whyWorkWithUs: "Highlight why candidates should choose your company over others.",
  location: "Specify the job location, whether it's remote, onsite, or hybrid.",
};

const JobApplicationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    jobName: "",
    jobDescription: "",
    benefits: "",
    ourValues: "",
    positionSummary: "",
    positionResponsibilities: "",
    skillsRequired: "",
    whyWorkWithUs: "",
    wageRate: "",
    location: "",
  });

  const [activeField, setActiveField] = useState<keyof JobFormData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (field: keyof JobFormData | null) => {
    setActiveField(field);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/TestCreator", { state: { formData } });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen  bg-gray-100 dark:bg-blue-100 p-6">
      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-7xl mx-auto  bg-gray-100 dark:bg-blue-100 rounded-lg shadow-lg overflow-hidden h-full">

        {/* Back Button */}
        <div className="w-full md:w-1/4 p-4 flex justify-start   bg-gray-100 dark:bg-blue-100">
          <Button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm "
          >
            Back
          </Button>
        </div>

        <Card className="w-full  bg-gray-100  dark:bg-black md:w-2/3 lg:w-3/4 xl:w-3/4 rounded-lg shadow-lg  overflow-hidden flex flex-col justify-between h-full">
          <CardHeader className="px-6 py-4 bg-blue-50 flex justify-between items-center rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-blue-900">Create a Job Posting</CardTitle>
          </CardHeader>

          <CardContent className="px-6 py-4 space-y-6 flex-grow overflow-auto ">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Name & Wage Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                <Input
                  name="jobName"
                  placeholder="Job Title"
                  value={formData.jobName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("jobName")}
                  onBlur={() => handleFocus(null)}
                  required
                  className="rounded-md text-sm"
                />
                <Input
                  name="wageRate"
                  placeholder="Wage Rate"
                  value={formData.wageRate}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("wageRate")}
                  onBlur={() => handleFocus(null)}
                  required
                  className="rounded-md text-sm"
                />
              </div>

              {/* Location */}
              <Input
                name="location"
                placeholder="Job Location"
                value={formData.location}
                onChange={handleInputChange}
                onFocus={() => handleFocus("location")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
              />

              {/* Text Areas */}
              <Textarea
                name="jobDescription"
                placeholder="Job Description"
                value={formData.jobDescription}
                onChange={handleInputChange}
                onFocus={() => handleFocus("jobDescription")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="benefits"
                placeholder="Benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                onFocus={() => handleFocus("benefits")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="ourValues"
                placeholder="Our Values"
                value={formData.ourValues}
                onChange={handleInputChange}
                onFocus={() => handleFocus("ourValues")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="positionSummary"
                placeholder="Position Summary"
                value={formData.positionSummary}
                onChange={handleInputChange}
                onFocus={() => handleFocus("positionSummary")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="positionResponsibilities"
                placeholder="Position Responsibilities"
                value={formData.positionResponsibilities}
                onChange={handleInputChange}
                onFocus={() => handleFocus("positionResponsibilities")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="skillsRequired"
                placeholder="Skills Required"
                value={formData.skillsRequired}
                onChange={handleInputChange}
                onFocus={() => handleFocus("skillsRequired")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
              <Textarea
                name="whyWorkWithUs"
                placeholder="Why Work With Us"
                value={formData.whyWorkWithUs}
                onChange={handleInputChange}
                onFocus={() => handleFocus("whyWorkWithUs")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md text-sm"
                rows={3}
              />
            </form>
          </CardContent>

          {/* Submit Button */}
          <div className="w-full p-4 flex justify-end mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm"
            >
              Submit Job Posting
            </Button>
          </div>
        </Card>

        {/* Tips Section */}
        <div className="hidden md:block w-full md:w-1/4 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Tips for a Successful Job Posting</h2>
          <ul className="space-y-2">
            {Object.entries(tips).map(([key, tip]) => (
              <li key={key} className="text-sm">
                <strong>{key.replace(/([A-Z])/g, " $1")}</strong>: {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;