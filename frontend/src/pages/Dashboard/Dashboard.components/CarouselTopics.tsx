import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const topics = [
  "For You",
  "Health",
  "Science",
  "Business",
  "Education",
  "Sports",
  "Entertainment",
  "Travel",
  "Lifestyle",
  "Food"
];

const CarouselTopics = () => {
  return (
    <>
      <div className="flex flex-col px-5 fixed bg-[#FFFFFF] dark:bg-[#0A0A0A] z-40">
        <div className="border-b py-3 px-14 max-w-xl md:max-w-[660px] ">
          <Carousel
            opts={{
              align: "start",
            }}
            className=""
          >
            <CarouselContent className="">
              {topics.map((topic, index) => (
                <CarouselItem key={index} className="basis-1/7">
                  <Card className=" border-none">
                    <CardContent className="flex items-center justify-center py-1">
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
      <div className="h-20"></div>
    </>
  );
};

export default CarouselTopics;
