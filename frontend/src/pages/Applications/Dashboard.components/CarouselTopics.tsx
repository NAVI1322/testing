import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const topics = [
  "Shortlisted",
  "Waitlisted",
  "Interview",
  "Accepted",
  "Rejected",
];

const CarouselTopics: React.FC<{ onTopicSelect: (topic: string) => void }> = ({ onTopicSelect }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic); // Set the active topic
    onTopicSelect(topic); // Call the parent function to filter jobs
  };

  return (
    <div className="flex flex-col py-3 px-5">
      <div className="border-b py-3 px-16 max-w-[680px]">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="ml-2 thd:max-w-[200px] fhd:max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl ehd:max-w-2xl">
            {topics.map((topic, index) => (
              <CarouselItem key={index} className="basis-1/7">
                <Card
                  className={`w-fit border-none ${activeTopic === topic ? 'bg-blue-400 dark:bg-blue-900' : ''}`}
                >
                  <CardContent className="flex items-center justify-center py-1">
                    <button
                      className="text-xs"
                      onClick={() => handleTopicClick(topic)}
                    >
                      {topic}
                    </button>
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
  );
};

export default CarouselTopics;
