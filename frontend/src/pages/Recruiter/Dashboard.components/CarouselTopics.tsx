import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const topics = [
  "Active",
  "Scheduled",
  "Completed",
  "Removed",
  "Drafts",
  "Archive"
];

interface CarouselTopicsProps {
  activeTopic: string; // Current active topic
  setActiveTopic: (topic: string) => void; // Function to set active topic
}

const CarouselTopics: React.FC<CarouselTopicsProps> = ({ activeTopic, setActiveTopic }) => {
  return (
    <>
      <div className="flex flex-col py-3 px-5">
        <div className="border-b py-3 px-16 max-w-[680px] ">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="thd:max-w-[200px] fhd:max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl ehd:max-w-2xl ml-4">
              {topics.map((topic, index) => (
                <CarouselItem key={index} className="basis-1/7">
                  <Card className={`w-fit border-none ${activeTopic === topic ? 'bg-blue-400 dark:bg-blue-900' : ''}`}>
                    <CardContent className="flex items-center justify-center py-1 cursor-pointer" 
                      onClick={() => setActiveTopic(topic)} // Use onClick to set active topic
                    >
                      <span className="text-xs">{topic}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CarouselTopics;
