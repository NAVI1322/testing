import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContentCard from "./ContentCard";
import Modal from "./Modal";
import SideBar from "./SideBar";

const Applications: React.FC = () => {
  const location = useLocation();
  const { applications, jobName } = location.state || { applications: [], jobName: "" };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [_, setSidebarHeight] = useState<number>(0);

  // Update sidebar height when mounted
  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.clientHeight);
    }
  }, []);

  const openModal = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center gap-8 p-5 ">
      {/* Main Content */}
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Applications for {jobName}</h1>
        {applications.length > 0 ? (
          applications.map((application: any, index: number) => (
            <ContentCard
              key={index}
              candidateName={`${application.employee.firstName} ${application.employee.lastName}`}
              startDate={new Date(application.appliedAt).toLocaleDateString()}
              endDate={new Date(application.appliedAt).toLocaleDateString()} // Placeholder endDate
              interviewsScheduled="N/A" // Replace with real data if available
              offersReceived="N/A" // Replace with real data if available
              feedbackGiven="N/A" // Replace with real data if available
              location={application.employee.location || "Unknown"}
              skills={["N/A"]} // Replace with real skills if available
              experienceLevel="N/A" // Replace with real data if available
              education="N/A" // Replace with real data if available
              preferredJobType="N/A" // Replace with real data if available
              avatarSrc="https://via.placeholder.com/150" // Placeholder avatar
              onViewDetails={() => openModal(application.employee)}
            />
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className="w-64 flex-shrink-0 ml-28">
        <SideBar />
      </div>

      {/* Modal for candidate details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={
          selectedCandidate
            ? {
                candidateName: `${selectedCandidate.firstName} ${selectedCandidate.lastName}`,
                experienceLevel: "N/A", // Replace with real data if available
                education: "N/A", // Replace with real data if available
                preferredJobType: "N/A", // Replace with real data if available
                skills: ["N/A"], // Replace with real skills if available
              }
            : null
        }
      />
    </div>
  );
};

export default Applications;