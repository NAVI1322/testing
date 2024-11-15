import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

const jobs = [
  {
    jobName: "Software Developer",
    startDate: "Oct 19, 2024",
    endDate: "Dec 3, 2024",
    site: "Remote",
    applied: "123",
    waitlisted: "31",
    shortlisted: "23",
    category: "Active",
  },
  {
    jobName: "Data Analyst",
    startDate: "Nov 1, 2024",
    endDate: "Jan 15, 2025",
    site: "Office",
    applied: "80",
    waitlisted: "10",
    shortlisted: "5",
    category: "Scheduled",
  },
  {
    jobName: "UX Designer",
    startDate: "Sept 15, 2024",
    endDate: "Dec 1, 2024",
    site: "Remote",
    applied: "150",
    waitlisted: "50",
    shortlisted: "30",
    category: "Completed",
  },
  {
    jobName: "Web Developer",
    startDate: "Oct 10, 2024",
    endDate: "Dec 10, 2024",
    site: "Remote",
    applied: "90",
    waitlisted: "20",
    shortlisted: "15",
    category: "Active",
  },
  {
    jobName: "Project Manager",
    startDate: "Dec 5, 2024",
    endDate: "Feb 1, 2025",
    site: "Office",
    applied: "50",
    waitlisted: "5",
    shortlisted: "2",
    category: "Drafts",
  },
  {
    jobName: "QA Engineer",
    startDate: "Jan 1, 2025",
    endDate: "Feb 28, 2025",
    site: "Office",
    applied: "200",
    waitlisted: "80",
    shortlisted: "60",
    category: "Removed",
  },
  {
    jobName: "Product Designer",
    startDate: "Oct 25, 2024",
    endDate: "Jan 10, 2025",
    site: "Remote",
    applied: "70",
    waitlisted: "15",
    shortlisted: "10",
    category: "Archive",
  },
  {
    jobName: "Marketing Specialist",
    startDate: "Nov 20, 2024",
    endDate: "Jan 30, 2025",
    site: "Office",
    applied: "60",
    waitlisted: "12",
    shortlisted: "8",
    category: "Scheduled",
  },
  {
    jobName: "Business Analyst",
    startDate: "Dec 1, 2024",
    endDate: "Feb 15, 2025",
    site: "Remote",
    applied: "130",
    waitlisted: "45",
    shortlisted: "20",
    category: "Active",
  },
  {
    jobName: "Graphic Designer",
    startDate: "Sept 10, 2024",
    endDate: "Nov 25, 2024",
    site: "Office",
    applied: "75",
    waitlisted: "25",
    shortlisted: "18",
    category: "Completed",
  },
  {
    jobName: "Content Writer",
    startDate: "Oct 5, 2024",
    endDate: "Dec 31, 2024",
    site: "Remote",
    applied: "110",
    waitlisted: "35",
    shortlisted: "25",
    category: "Drafts",
  },
  {
    jobName: "Technical Support",
    startDate: "Nov 15, 2024",
    endDate: "Jan 20, 2025",
    site: "Office",
    applied: "90",
    waitlisted: "28",
    shortlisted: "22",
    category: "Scheduled",
  },
  {
    jobName: "Sales Manager",
    startDate: "Oct 12, 2024",
    endDate: "Dec 24, 2024",
    site: "Office",
    applied: "140",
    waitlisted: "40",
    shortlisted: "32",
    category: "Active",
  },
  {
    jobName: "Customer Success Specialist",
    startDate: "Dec 1, 2024",
    endDate: "Feb 28, 2025",
    site: "Remote",
    applied: "125",
    waitlisted: "55",
    shortlisted: "35",
    category: "Removed",
  },
  {
    jobName: "System Administrator",
    startDate: "Sept 25, 2024",
    endDate: "Dec 15, 2024",
    site: "Office",
    applied: "95",
    waitlisted: "30",
    shortlisted: "20",
    category: "Completed",
  },
  {
    jobName: "DevOps Engineer",
    startDate: "Oct 18, 2024",
    endDate: "Jan 10, 2025",
    site: "Remote",
    applied: "180",
    waitlisted: "70",
    shortlisted: "50",
    category: "Archive",
  },
  {
    jobName: "SEO Specialist",
    startDate: "Nov 5, 2024",
    endDate: "Jan 25, 2025",
    site: "Remote",
    applied: "88",
    waitlisted: "20",
    shortlisted: "14",
    category: "Drafts",
  },
  {
    jobName: "IT Consultant",
    startDate: "Dec 20, 2024",
    endDate: "Mar 1, 2025",
    site: "Office",
    applied: "77",
    waitlisted: "18",
    shortlisted: "12",
    category: "Scheduled",
  },
  {
    jobName: "Database Administrator",
    startDate: "Jan 5, 2025",
    endDate: "Feb 28, 2025",
    site: "Remote",
    applied: "200",
    waitlisted: "80",
    shortlisted: "60",
    category: "Removed",
  },
  {
    jobName: "Network Engineer",
    startDate: "Oct 15, 2024",
    endDate: "Dec 30, 2024",
    site: "Office",
    applied: "100",
    waitlisted: "35",
    shortlisted: "25",
    category: "Active",
  },
];


const MainBody: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [activeTopic, setActiveTopic] = useState<string>("Active"); // State for the selected topic
const navigate=useNavigate()
  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.clientHeight);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
        <div
          className="overflow-y-clip nhd:overflow-y-scroll no-scrollbar"
          style={{ height: `${sidebarHeight}px` }}
        >
                <Button variant={"myButton"} className="mb-3 nhd:hidden block m-auto mt-5 w-1/2" onClick={()=>navigate('/teststructure')}>Create Test</Button>

          <div>
            <CarouselTopics activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
          </div>
          {jobs
            .filter(job => job.category === activeTopic) // Filter jobs based on active topic
            .map((job, index) => (
              <ContentCard
                key={index}
                site={job.site}
                jobName={job.jobName}
                startDate={job.startDate}
                endDate={job.endDate}
                applied={job.applied}
                waitlisted={job.waitlisted}
                shortlisted={job.shortlisted}
              />
            ))}
        </div>
        <div ref={sidebarRef}>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default MainBody;
