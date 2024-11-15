import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import { getJobsDetails } from "@/hooks/getDetails";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components/majorComponents/toast";

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
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [jobData, setJobData] = useState<JobData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoaded, setisLoaded] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = (currentJob: JobData) => {
        setSidebarVisible(!isSidebarVisible);
        setCurrentJob(currentJob);
    };

    const handleBackButtonClick = () => {
        setSidebarVisible(false);
        setCurrentJob(undefined);
    };

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
        setisLoaded(false);
        async function fetchJobs() {
            try {
                const res = await getJobsDetails();
                setJobData(res.data);
                setisLoaded(true);
            } catch (error) {
                console.error("Failed to fetch job data:", error);
                setError("Failed to load job listings.");
            }
        }
        fetchJobs();
    }, []);

    function template(jobId: string) {
        return null;
    }

    function HandleApplicationClickEvent(jobId: string) {
        const selectedJob = jobData.find((job) => job.id === jobId);
        if (selectedJob) {
            setCurrentJob(selectedJob);
        } else {
            Toast("Error", "Job not found for the given ID.");
        }
    }

    return (
        <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
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
                        HandleApplicationClickEvent={() => template("loading")}
                    />
                ) : (
                    jobData.map((job) => (
                        <div key={job.id} onClick={() => toggleSidebar(job)} className="z-30 relative">
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
                                HandleApplicationClickEvent={() => HandleApplicationClickEvent(job.id)}
                            />
                        </div>
                    ))
                )}
            </div>
            <div
                ref={sidebarRef}
                className={`transition-transform duration-500 ease-in-out ${isSidebarVisible ? (isMobile ? 'fixed inset-0 z-50 bg-[#0A0A0A]' : 'translate-x-0') : '-translate-x-[450px]'
                    }`}
            >

                {currentJob && <div className="flex-col">
                    <div className="flex  justify-center items-center gap-5 m-5">                
                        {isSidebarVisible && isMobile && (
                            <div>
                        <button
                            onClick={handleBackButtonClick}
                            className=" bg-gray-800 text-white rounded-md px-4 py-2 z-50 w-fit h-fit self-start mb-5"
                        >
                            Back
                        </button>
                    <div className="h-screen">

                    <div className="flex h-[90%] justify-center overflow-y-auto">
                        <SideBar jobData={currentJob} />
                        </div>
                    </div>
                            
                            </div>
                    )}
                        <div className="hidden md:flex h-screen justify-center overflow-y-auto">
                        <SideBar jobData={currentJob} />
                        </div>
                    </div>
                        </div>}
                        
            </div>
        </div>
    );
};

export default MainBody;
