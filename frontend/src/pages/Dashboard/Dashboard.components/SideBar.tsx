import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DOMPurify from "dompurify";
import { Briefcase, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobData {
  id: string;
  jobDescription: {
    jobName: string;
    location: string;
    description: string;
    benefits: string;
    ourValues: string;
    positionSummary: string;
    positionResponsibilities: string;
    skills: string;
    whyWorkWithUs: string;
  };
  createdAt: string;
  questions: {
    id: string;
    type: string;
    content: string;
    options: string[];
    correctAnswers: string[];
  }[];
}

const SideBar: React.FC<{ jobData: JobData }> = ({ jobData }) => {
  const navigate = useNavigate();

  const QuestionObj = jobData.questions;
  const jobId = jobData.id;

  const handleNextStepClickEvent = () => {
    if (QuestionObj && jobId) {
      navigate('/description', { state: { QuestionObj, jobId, jobData } });
    } else {
      alert("Invalid job data");
    }
  };

  const sanitize = (content: string) => DOMPurify.sanitize(content);

  return (
    <div className="flex justify-center w-full max-w-[400px]">
      {/* Scrollable Card */}
      <Card className="w-full max-w-[360px] h-auto border-0 overflow-hidden">
        <CardHeader className="p-4 flex flex-col gap-4 items-start">
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {sanitize(jobData.jobDescription.jobName)}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <MapPin className="w-5 h-5" /> {sanitize(jobData.jobDescription.location)} • Posted on {new Date(jobData.createdAt).toLocaleDateString()}
          </CardDescription>
          <Button
            onClick={() => handleNextStepClickEvent()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 shadow-md"
          >
            Apply Now
          </Button>
        </CardHeader>

        <CardContent className="px-6 pb-4 space-y-6 overflow-y-auto" style={{ maxHeight: '60vh' }}>
          {[
            { title: "Job Description", content: jobData.jobDescription.description },
            { title: "Benefits", content: jobData.jobDescription.benefits },
            { title: "Our Values", content: jobData.jobDescription.ourValues },
            { title: "Position Summary", content: jobData.jobDescription.positionSummary },
            { title: "Position Responsibilities", content: jobData.jobDescription.positionResponsibilities },
            { title: "Skills Required", content: jobData.jobDescription.skills },
            { title: "Why Work With Us", content: jobData.jobDescription.whyWorkWithUs },
          ].map((section, index) => (
            <section key={index} className="border-b pb-4">
              <h2 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">{section.title}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">{sanitize(section.content)}</p>
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBar;