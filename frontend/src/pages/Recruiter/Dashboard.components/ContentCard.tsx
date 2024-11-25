import { Link } from "react-router-dom";

interface ContentCardProps {
  jobName: string;
  site: string;
  startDate: string;
  endDate: string;
  applied: string;
  waitlisted: string;
  shortlisted: string;
  applications: any[]; // Array of application data
}

const ContentCard: React.FC<ContentCardProps> = ({
  jobName,
  site,
  startDate,
  endDate,
  applied,
  waitlisted,
  shortlisted,
  applications,
}) => {
  return (
    <div className="flex flex-col py-3 px-5">
      <div className="border-b pb-5 max-w-[680px]">
        <div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="font-bold md:text-lg">{jobName}</div>
              <div
                className={`${
                  site.toLowerCase() === "remote"
                    ? "text-blue-400"
                    : "text-orange-400"
                } font-semibold md:text-lg mr-2`}
              >
                {site.toLowerCase() === "remote" ? "Remote" : "Office"}
              </div>
            </div>
            <div className="font-light text-sm mb-5">
              <div className="text-purple-600">Start Date: {startDate}</div>
              <div className="text-red-500">Deadline: {endDate}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs">
              <div>{applied} applied</div>
              <div>{waitlisted} waitlisted</div>
              <div>{shortlisted} shortlisted</div>
            </div>
            <Link
              to="/applications"
              state={{ applications, jobName }} // Pass data via state
              className="ml-4 mr-2"
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                See Applicants
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;