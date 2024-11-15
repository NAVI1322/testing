import { Button } from '@/components/ui/button';
import { Star, Heart, HandMetal, CircleMinus, Save, Ellipsis, FileSearch, FileClock, FileCheck2, CalendarClock, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  jobName: string;
  site: string;
  startDate: string;
  endDate: string;

  applied: string;
  waitlisted: string;
  shortlisted: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  startDate,
  endDate,
  jobName,
  site,

  applied,
  waitlisted,
  shortlisted,
}) => {
  return (
    <div className="flex flex-col py-3 px-5">
      <div className="border-b pb-5 max-w-[680px] nhd:ml-0">

        <div>
          <div className="flex flex-col">
                <div className='flex justify-between'>

              <div className="line-clamp-4 font-bold  md:text-lg">
                {jobName}
              </div>
              <div className={`${site.toLowerCase() === 'remote' ? 'text-blue-400' : 'text-orange-400'} font-semibold md:text-lg mr-2`}>
  {site.toLowerCase() === 'remote' ? 'Remote' : 'Office'}
</div>
                </div>
            <div>
              <div className='flex items-center mb-2'>
              </div>
              <div className="font-light text-sm mb-5 flex flex-col gap-[1px]">
                <div className='flex gap-[4px] items-center text-purple-600 dark:text-purple-200'>
                <CalendarDays className='size-4'/>

                Start date: {startDate}
                </div>
                <div className='flex gap-[4px] items-center text-red-500'>
                <CalendarClock className='size-4'/>
                Deadline: {endDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5 text-xs">
              <div className="gap-2 items-center flex text-slate-400">
              <FileSearch className="size-4 block"/>
              <div>{applied}</div>
              <div className='hidden fsty:block '>applied</div>
              </div>
              <div className="gap-2 items-center flex text-yellow-400">
                <FileClock className='size-4 block' />
                <div>{waitlisted}</div>
              <div className='hidden fsty:block '>waitlisted</div>
              </div>
              <div className="gap-2 items-center flex text-green-400">
                <FileCheck2 className='size-4 block'/>
                <div>{shortlisted}</div>
              <div className='hidden fsty:block '>shortlsited</div>
              </div>
            </div>
            <Link to={'/applications'}>
              <Button variant={'myButton'} className='ml-4 mr-2'>
              See Applicants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
