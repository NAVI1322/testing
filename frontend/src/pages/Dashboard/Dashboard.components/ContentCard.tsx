import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import useFormattedDateTime from '@/hooks/formattime';
import { Star } from 'lucide-react';

interface ContentCardProps {
  key: string;
  avatarSrc: string;
  avatarFallback: string;
  name: string;
  publication: string;
  articleHeading: string;
  articleDescription: string;
  articleImageSrc: string;
  date: string;
  time: string;
  HandleApplicationClickEvent: (jobId: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  key,
  avatarSrc,
  avatarFallback,
  name,
  publication,
  articleHeading,
  articleDescription,
  articleImageSrc,
  time,
  HandleApplicationClickEvent 
}) => {
  const { formattedDate, formattedTime } = useFormattedDateTime(time);

  return (
    <div 
      className=" flex flex-col py-3 px-5 hover:shadow-lg hover:rounded-md duration-300 cursor-pointer transition-colors 
      hover:bg-light:bg-gray-200/70 dark:hover:bg-gray-800/70"
      onClick={() => HandleApplicationClickEvent(key)}
    >
      <div className="border-b hover:border-none pb-5 max-w-[680px] nhd:ml-0">
        <div className="flex text-xs items-center gap-2 mb-4">
          <Avatar className="size-5">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-[100px] truncate">{name}</div>
          <div className="font-light">in</div>
          <div className="min-w-[100px] truncate">{publication}</div>
        </div>
        <div>
          <div className="flex gap-10">
            <div>
              <div className="line-clamp-4 font-bold mb-2 md:text-lg text-blue-500 ">
                {articleHeading}
              </div>
              <div className="line-clamp-2 font-light text-sm mb-5">
                {articleDescription}
              </div>
            </div>
            <img
              src={articleImageSrc}
              className="w-20 h-14 shrink-0 md:w-40 md:h-[107px]"
              alt="article image"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5 text-xs">
              <Star className="block size-4" />
              <div className="date">{formattedDate}</div>
            </div>
            <div className="flex items-center gap-5 text-xs">
              <div className="w-40 h-full hidden md:block">{formattedTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
