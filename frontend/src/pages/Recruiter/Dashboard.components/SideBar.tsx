
import { Button } from "@/components/ui/button";

import {  useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[360px] hidden nhd:flex shrink-0 border-l px-10 py-7 flex-col h-fit">
      <Button variant={"myButton"} className="hidden nhd:block mb-10" onClick={()=>navigate('/create-job')}>Create Job</Button>
      <TipsSection />
      <ResourcesSection />

    </div>
  );
};

// Sample tips data
const tipsData = [
  {
    id: 1,
    title: "Understand Your Audience",
    description: "Tailor your tests to the knowledge level and skills of your audience.",
  },
  {
    id: 2,
    title: "Use Clear Language",
    description: "Ensure questions are clearly stated to avoid confusion.",
  },
  {
    id: 3,
    title: "Balance Question Types",
    description: "Mix multiple-choice, true/false, and open-ended questions for variety.",
  },
  {
    id: 4,
    title: "Pilot Your Tests",
    description: "Test your questions with a small group before full deployment.",
  },
  {
    id: 5,
    title: "Seek Feedback",
    description: "Ask for feedback on your tests to improve future versions.",
  },
];

// Tips Section
const TipsSection: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Tips for Recruiter</div>
    {tipsData.map((tip) => (
      <TipItem key={tip.id} tip={tip} />
    ))}
    <div className="text-sm mb-5">See more tips</div>
  </div>
);

const TipItem: React.FC<{ tip: typeof tipsData[0] }> = ({ tip }) => (
  <div className="mb-4">
    <div className="font-semibold">{tip.title}</div>
    <div className="text-sm font-light">{tip.description}</div>
  </div>
);

// Sample resources data
const resourcesData = [
  "How to Create Effective Tests",
  "Understanding Different Question Types",
  "Analyzing Test Results",
  "Best Practices for Test Creation",
  "Using Technology in Testing",
];

// Resources Section
const ResourcesSection: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Helpful Resources</div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mb-5 overflow-hidden">
      {resourcesData.map((resource, index) => (
        <Button key={index} variant={"myButton"} className="text-xs">
          {resource}
        </Button>
      ))}
    </div>
    <div className="text-sm mb-5">See all resources</div>
  </div>
);







export default SideBar;
