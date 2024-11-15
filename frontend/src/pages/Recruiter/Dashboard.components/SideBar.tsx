import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[360px] hidden nhd:flex shrink-0 border-l px-10 py-7 flex-col h-fit">
      <Button variant={"myButton"} className="hidden nhd:block mb-10" onClick={()=>navigate('/teststructure')}>Create Test</Button>
      <TipsSection />
      <ResourcesSection />
      <FollowExperts />
      <ReadingList />
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

// Sample expert data
const expertsData = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    bio: "Expert in Educational Psychology.",
  },
  {
    id: 2,
    name: "Mark Thompson",
    bio: "Specialist in Assessment Design.",
  },
  {
    id: 3,
    name: "Linda Green",
    bio: "Experienced Test Developer.",
  },
];

// Follow Experts Section
const FollowExperts: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Experts to Follow</div>
    {expertsData.map((expert) => (
      <FollowItem key={expert.id} expert={expert} />
    ))}
    <div className="text-sm">See all experts</div>
  </div>
);

const FollowItem: React.FC<{ expert: typeof expertsData[0] }> = ({ expert }) => (
  <div className="mb-4">
    <div className="flex text-xs items-center gap-2 mb-3 overflow-hidden">
      <Avatar className='size-5 self-start'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="">{expert.name}</div>
        <div className="font-light">{expert.bio}</div>
      </div>
      <Button variant={"outline"}>Follow</Button>
    </div>
  </div>
);

// Reading List Section
const ReadingList: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Reading List</div>
    <div className="text-xs font-light">
      Click the <Save className="inline size-4" /> icon on any story to add it to your reading list or a custom list that you can share.
    </div>
  </div>
);

export default SideBar;
