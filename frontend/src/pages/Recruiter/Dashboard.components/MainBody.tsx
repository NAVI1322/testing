import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components/majorComponents/toast";
import { fetchApplication } from "@/hooks/getApplication";

const MainBody: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [activeTopic, setActiveTopic] = useState<string>("Active");
  const [jobs, setJobs] = useState<any[]>([]); // Dynamic jobs list
  const router = useNavigate();
  const id = localStorage.getItem("Id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "RECRUITER" && !id) {
      Toast("Error", "Try Logging In Again");
      router("/access-denied");
      return;
    }

    const fetchdata = async () => {
      try {
        const data = await fetchApplication(id as string);
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        Toast("Error", "Failed to fetch applications");
      }
    };

    fetchdata();
  }, [role, id, router]);

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
          <Button
            variant={"myButton"}
            className="mb-3 nhd:hidden block m-auto mt-5 w-1/2"
            onClick={() => router("/create-job")}
          >
            Create Test
          </Button>

          <div>
            <CarouselTopics
              activeTopic={activeTopic}
              setActiveTopic={setActiveTopic}
            />
          </div>

          {jobs.map((job, index) => (
            <ContentCard
              key={index}
              site={job.location}
              jobName={job.jobName}
              startDate={job.jobDescription?.startDate || "N/A"}
              endDate={job.jobDescription?.endDate || "N/A"}
              applied={job.applications.length.toString()} // Applications count
              waitlisted={"N/A"} // Placeholder for future use
              shortlisted={"N/A"} // Placeholder for future use
              applications={job.applications} // Pass applications to ContentCard
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