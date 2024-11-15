import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cardData = [
    {
        title: "Live Interviews",
        description: "Find the perfect match and interview live directly through our platform.",
      },
      {
        title: "Skills Testing",
        description: "Take the guesswork out of training and hiring. Choose from 500 standard job-based and subject-based tests.",
      },
      {
        title: "Background Checks",
        description: "Reduce your time to hire by 80% and get results in minutes.",
      },
      {
        title: "Job Matching Algorithm",
        description: "Utilize our AI-driven algorithm to match candidates with jobs more efficiently.",
      },
      {
        title: "Virtual Onboarding",
        description: "Streamline the onboarding process with our virtual onboarding tool.",
      },
      {
        title: "Performance Tracking",
        description: "Monitor employee performance with our comprehensive tracking system.",
      },
];

export default function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="flex w-full max-w-4xl  m-auto mt-6 my-10 lg:my-20"
    >
      <CarouselContent>
        {cardData.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-blue-100 dark:bg-blue-900 "> {/* Background for light/dark modes */}
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3> {/* Title color for light/dark modes */}
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-4">{item.description}</p> {/* Description color for light/dark modes */}
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition"> {/* Button styles for light/dark modes */}
                    Learn More
                  </button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
