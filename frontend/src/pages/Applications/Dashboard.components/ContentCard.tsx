import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { CalendarClock, CalendarDays, FileSearch, ChevronDown, ChevronUp } from 'lucide-react';
import { FC, useState, useRef, useEffect } from 'react';

interface ContentCardProps {
  candidateName: string;
  startDate: string;
  endDate: string;
  interviewsScheduled: string;
  offersReceived: string;
  feedbackGiven: string;
  location: string;
  skills: string[];
  experienceLevel: string;
  education: string;
  preferredJobType: string;
  avatarSrc: string;
  onViewDetails: () => void; // Pass function to handle view details
}

const ContentCard: FC<ContentCardProps> = ({
  candidateName,
  startDate,
  endDate,
  interviewsScheduled,
  offersReceived,
  feedbackGiven,
  location,
  skills,
  experienceLevel,
  education,
  preferredJobType,
  avatarSrc,
  onViewDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    setMaxHeight(isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px');
  }, [isExpanded]);

  return (
    <div className="flex flex-col py-3 px-5 max-w-[680px] border-b transition-all duration-300 ease-in-out">
      <div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <Avatar className="size-5">
                <AvatarImage src={avatarSrc} />
              </Avatar>
              <div className="font-bold text-lg md:text-xl">{candidateName}</div>
            </div>
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          </div>

          <div className="text-sm font-light text-gray-500 mb-2">
            Location: {location}
          </div>

          <div
            ref={contentRef}
            className="transition-all duration-300 ease-in-out overflow-hidden"
            style={{ maxHeight }}
          >
            <div className="flex flex-col mb-3">
              <div className="flex items-center gap-2 mb-2 text-purple-200">
                <CalendarDays className="size-4" />
                Start Date: {startDate}
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <CalendarClock className="size-4" />
                End Date: {endDate}
              </div>
            </div>

            <div className="mb-2">
              <div>Experience Level: {experienceLevel}</div>
              <div>Education: {education}</div>
              <div>Preferred Job Type: {preferredJobType}</div>
            </div>

            <div className="my-4">
              <div className="flex gap-2 items-center">
                Skills:
                <div className="flex gap-2 overflow-x-auto no-scrollbar flex-wrap">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-slate-500/40 px-3 py-1 rounded-full text-xs">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2 text-blue-400">
                  <FileSearch className="size-4" />
                  {interviewsScheduled}
                  <div className="hidden sm:block">Interviews</div>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FileSearch className="size-4" />
                  {offersReceived}
                  <div className="hidden sm:block">Offers</div>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <FileSearch className="size-4" />
                  {feedbackGiven}
                  <div className="hidden sm:block">Feedbacks</div>
                </div>
              </div>
              <Button variant="outline" className="text-xs" onClick={onViewDetails}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
