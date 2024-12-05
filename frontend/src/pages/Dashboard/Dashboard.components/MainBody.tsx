import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import { getJobsDetails } from "@/hooks/getDetails";
import { Toast } from "@/components/majorComponents/toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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

const MainBody: React.FC = () => {
  const [currentJob, setCurrentJob] = useState<JobData | undefined>();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    async function fetchJobs() {
      try {
        const res = await getJobsDetails();
        console.log(res.data)
        setJobData(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch job data:", error);
        setError("Failed to load job listings.");
      }
    }
    fetchJobs();
  }, []);

  const toggleSidebar = (job: JobData) => {
    if (!isSidebarVisible) {
      setSidebarVisible(true);
    }
    setCurrentJob(job); // Update the sidebar content dynamically
  };

  const handleBackButtonClick = () => {
    setSidebarVisible(false);
    setTimeout(() => setCurrentJob(undefined), 300); // Reset content after closing
  };

  return (
    <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
      {/* Main Content */}
      <div className="overflow-y-clip nhd:overflow-y-scroll no-scrollbar h-screen z-20 bg-[#FFFFFF] dark:bg-[#0A0A0A]">
        <div>
          <CarouselTopics />
        </div>
        {!isLoaded ? (
          <ContentCard
            key=""
            avatarSrc=""
            avatarFallback=""
            name="Loading..."
            publication=""
            articleHeading="Loading..."
            articleDescription="Please wait while data is loading."
            articleImageSrc="/default-image.png"
            date=""
            time=""
            HandleApplicationClickEvent={() => {}}
          />
        ) : (
          jobData.map((job) => (
            <motion.div
              key={job.id}
              onClick={() => toggleSidebar(job)}
              className="z-30 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentCard
                key={job.id}
                avatarSrc="/default-avatar.png"
                avatarFallback="N"
                name={job.jobDescription.location}
                publication={job.jobDescription.skills}
                articleHeading={job.jobDescription.jobName}
                articleDescription={job.jobDescription.description}
                articleImageSrc="/default-image.png"
                date={new Date(job.createdAt).toLocaleDateString()}
                time={job.createdAt}
                HandleApplicationClickEvent={() => toggleSidebar(job)}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Sidebar */}
      <AnimatePresence>
  {isSidebarVisible && (
    <motion.div
      className={`transition-transform duration-500 ease-in-out ${
        isMobile ? "fixed inset-0 z-50 bg-[#0A0A0A]" : "translate-x-0"
      }`}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex-col h-full bg-[#FFFFFF] dark:bg-[#0A0A0A]">
        {/* Back Button for Mobile */}
        {isMobile && (
          <Button
            onClick={handleBackButtonClick}
            variant={"myButton"}
            className="absolute top-5 right-5 bg-gray-800 text-white rounded-md px-6 py-3 z-50 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back
          </Button>
        )}

        {/* Sidebar Content with scrollable area */}
        <motion.div
          key={currentJob?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-y-auto"
        >
          {currentJob && <SideBar jobData={currentJob} />}
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default MainBody;