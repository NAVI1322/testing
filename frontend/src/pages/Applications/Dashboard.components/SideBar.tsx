import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const SideBar: React.FC = () => {
  return (
    <div className="w-[360px] hidden nhd:flex shrink-0 border-l px-10 py-7 flex-col h-fit">
      <TopCandidates />
      <RelevantSkills />
      <NetworkSuggestions />
      {/* <SavedProfiles /> */}
      <RecruiterLinks />
    </div>
  );
};

const topCandidatesData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    description: "Experienced in React and TypeScript.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Scientist",
    description: "Skilled in Python and Machine Learning.",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "AI Engineer",
    description: "Focused on NLP and AI model optimization.",
  },
];

const TopCandidates: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Top Candidates</div>
    {topCandidatesData.map((candidate) => (
      <CandidateItem key={candidate.id} candidate={candidate} />
    ))}
    <div className="text-sm mb-5">View all candidates</div>
  </div>
);

const CandidateItem: React.FC<{ candidate: typeof topCandidatesData[0] }> = ({ candidate }) => (
  <div className="mb-4">
    <div className="flex text-xs items-center gap-2 mb-3 overflow-hidden">
      <Avatar className='size-5'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="">{candidate.name}</div>
      <div className="font-light"> - </div>
      <div className="">{candidate.role}</div>
    </div>
    <div className="text-sm font-semibold">{candidate.description}</div>
  </div>
);

const relevantSkills = [
  "React.js",
  "Data Analysis",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
];

const RelevantSkills: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">In-Demand Skills</div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mb-5 overflow-hidden">
      {relevantSkills.map((skill, index) => (
        <Button key={index} variant={"myButton"} className="text-xs">{skill}</Button>
      ))}
    </div>
    <div className="text-sm mb-5">Explore all skills</div>
  </div>
);

const networkSuggestionsData = [
  {
    id: 1,
    name: "David Williams",
    bio: "Recruiter at Tech Solutions.",
  },
  {
    id: 2,
    name: "Emma Johnson",
    bio: "Talent Acquisition at Creative Minds.",
  },
  {
    id: 3,
    name: "Fiona Zhang",
    bio: "HR Specialist at OpenSource Inc.",
  },
];

const NetworkSuggestions: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Network Suggestions</div>
    {networkSuggestionsData.map((contact) => (
      <NetworkItem key={contact.id} contact={contact} />
    ))}
    <div className="text-sm">See all suggestions</div>
  </div>
);

const NetworkItem: React.FC<{ contact: typeof networkSuggestionsData[0] }> = ({ contact }) => (
  <div className="mb-4">
    <div className="flex text-xs items-center gap-2 mb-3 overflow-hidden">
      <Avatar className='size-5 self-start'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="">{contact.name}</div>
        <div className="font-light">{contact.bio}</div>
      </div>
      <Button variant={"outline"}>Connect</Button>
    </div>
  </div>
);

const recruiterLinksData = [
  "LinkedIn",
  "Glassdoor",
  "Indeed",
  "GitHub Jobs",
  "Stack Overflow Jobs",
  "AngelList",
  "HackerRank",
  "LeetCode",
  "Coursera",
  "Udacity",
];

const SavedProfiles: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Saved Profiles</div>
    <div className="text-xs font-light">
      Click the <Save className="inline size-4" /> icon on any candidate's profile to save them for later review.
    </div>
  </div>
);

const RecruiterLinks: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    {recruiterLinksData.map((link, index) => (
      <a key={index} href="#" className="text-xs hover:underline">{link}</a>
    ))}
  </div>
);

export default SideBar;
