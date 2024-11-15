import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import Modal from "./Modal";

// Array of jobs data with status
// Array of jobs data with status
const jobs = [
  {
    candidateName: "Navneet Paaji",
    startDate: "Oct 19, 2024",
    endDate: "Dec 3, 2024",
    site: "Remote",
    interviewsScheduled: "2",
    offersReceived: "1",
    feedbackGiven: "3",
    location: "New Delhi, India",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    experienceLevel: "Mid-level",
    education: "Bachelor's in Computer Science",
    avatarSrc: "https://github.com/shadcn.png",
    preferredJobType: "Remote",
    status: "Shortlisted",
  },
  {
    candidateName: "Anjali Sharma",
    startDate: "Sept 10, 2024",
    endDate: "Nov 15, 2024",
    site: "On-site",
    interviewsScheduled: "1",
    offersReceived: "0",
    feedbackGiven: "2",
    location: "Bangalore, India",
    skills: ["Node.js", "Express", "MongoDB"],
    experienceLevel: "Junior",
    education: "Master's in IT",
    avatarSrc: "https://github.com/anjali.png",
    preferredJobType: "On-site",
    status: "Waitlisted",
  },
  {
    candidateName: "Ravi Kumar",
    startDate: "Nov 1, 2024",
    endDate: "Dec 20, 2024",
    site: "Remote",
    interviewsScheduled: "0",
    offersReceived: "1",
    feedbackGiven: "1",
    location: "Mumbai, India",
    skills: ["Python", "Django", "Flask"],
    experienceLevel: "Senior",
    education: "Bachelor's in Engineering",
    avatarSrc: "https://github.com/ravi.png",
    preferredJobType: "Remote",
    status: "Accepted",
  },
  {
    candidateName: "Priya Patel",
    startDate: "Oct 5, 2024",
    endDate: "Dec 31, 2024",
    site: "Remote",
    interviewsScheduled: "3",
    offersReceived: "2",
    feedbackGiven: "5",
    location: "Ahmedabad, India",
    skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
    experienceLevel: "Mid-level",
    education: "Bachelor's in Information Technology",
    avatarSrc: "https://github.com/priya.png",
    preferredJobType: "Remote",
    status: "Shortlisted",
  },
  {
    candidateName: "Arjun Mehta",
    startDate: "Nov 25, 2024",
    endDate: "Jan 20, 2025",
    site: "On-site",
    interviewsScheduled: "2",
    offersReceived: "1",
    feedbackGiven: "3",
    location: "Chennai, India",
    skills: ["Java", "Spring Boot", "MySQL"],
    experienceLevel: "Senior",
    education: "Master's in Computer Applications",
    avatarSrc: "https://github.com/arjun.png",
    preferredJobType: "On-site",
    status: "Waitlisted",
  },
  {
    candidateName: "Sneha Kapoor",
    startDate: "Dec 1, 2024",
    endDate: "Feb 10, 2025",
    site: "Hybrid",
    interviewsScheduled: "4",
    offersReceived: "3",
    feedbackGiven: "7",
    location: "Pune, India",
    skills: ["C#", ".NET", "Azure"],
    experienceLevel: "Mid-level",
    education: "Bachelor's in Software Engineering",
    avatarSrc: "https://github.com/sneha.png",
    preferredJobType: "Hybrid",
    status: "Accepted",
  },
  {
    candidateName: "Manish Agarwal",
    startDate: "Sept 20, 2024",
    endDate: "Nov 30, 2024",
    site: "On-site",
    interviewsScheduled: "1",
    offersReceived: "0",
    feedbackGiven: "2",
    location: "Kolkata, India",
    skills: ["PHP", "Laravel", "JavaScript"],
    experienceLevel: "Junior",
    education: "Bachelor's in Computer Science",
    avatarSrc: "https://github.com/manish.png",
    preferredJobType: "On-site",
    status: "Rejected",
  },
  {
    candidateName: "Rina Das",
    startDate: "Oct 1, 2024",
    endDate: "Dec 25, 2024",
    site: "Remote",
    interviewsScheduled: "5",
    offersReceived: "4",
    feedbackGiven: "6",
    location: "Hyderabad, India",
    skills: ["Angular", "TypeScript", "Node.js"],
    experienceLevel: "Senior",
    education: "Master's in Computer Science",
    avatarSrc: "https://github.com/rina.png",
    preferredJobType: "Remote",
    status: "Accepted",
  },
  {
    candidateName: "Vikram Singh",
    startDate: "Nov 10, 2024",
    endDate: "Jan 5, 2025",
    site: "Hybrid",
    interviewsScheduled: "2",
    offersReceived: "1",
    feedbackGiven: "3",
    location: "Gurgaon, India",
    skills: ["AWS", "DevOps", "Terraform"],
    experienceLevel: "Mid-level",
    education: "Bachelor's in Information Technology",
    avatarSrc: "https://github.com/vikram.png",
    preferredJobType: "Hybrid",
    status: "",
  },
  {
    candidateName: "Neha Verma",
    startDate: "Oct 15, 2024",
    endDate: "Dec 20, 2024",
    site: "On-site",
    interviewsScheduled: "3",
    offersReceived: "2",
    feedbackGiven: "5",
    location: "Jaipur, India",
    skills: ["Ruby on Rails", "PostgreSQL", "Heroku"],
    experienceLevel: "Mid-level",
    education: "Master's in Software Engineering",
    avatarSrc: "https://github.com/neha.png",
    preferredJobType: "On-site",
    status: "Accepted",
  },
];

// Assuming jobs is   imported or defined somewhere above
// import jobs from './path/to/jobs';

const MainBody: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [selectedTopic, setSelectedTopic] = useState<string>("Shortlisted");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // Use more specific type as necessary

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.clientHeight);
    }
  }, []);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic); // Set selected topic to filter jobs
  };

  const openModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
        <div className="overflow-y-clip nhd:overflow-y-scroll no-scrollbar">
          <CarouselTopics onTopicSelect={handleTopicSelect} />
          {jobs
            .filter((job) => job.status === selectedTopic) // Filter jobs based on selected topic
            .map((job, index) => (
              <ContentCard
                key={index}
                candidateName={job.candidateName}
                startDate={job.startDate}
                endDate={job.endDate}
                interviewsScheduled={job.interviewsScheduled}
                offersReceived={job.offersReceived}
                feedbackGiven={job.feedbackGiven}
                location={job.location}
                skills={job.skills}
                experienceLevel={job.experienceLevel}
                education={job.education}
                preferredJobType={job.preferredJobType}
                avatarSrc={job.avatarSrc}
                onViewDetails={() => openModal(job)} // Use the openModal function
              />
            ))}
        </div>
        <div ref={sidebarRef}>
          <SideBar />
        </div>
      </div>

      {/* Modal for displaying candidate details */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          candidate={selectedJob} // Pass selected job to the Modal
        />
      )}
    </>
  );
};

export default MainBody;
