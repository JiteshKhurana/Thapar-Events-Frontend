import { Button } from "@/components/ui/button";
import Slider1 from "../assets/slider.png";
import Autoplay from "embla-carousel-autoplay";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden brightness-50">
          <iframe
            className="w-full aspect-video pointer-events-none -mt-16"
            src={
              "https://www.youtube.com/embed/LOWbKBodXFg?si=yqu9x7AaH7arwj5Y&amp;start=0&autoplay=1&mute=1&loop=1&controls=0&disablekb=1"
            }
            title="YouTube video player"
            allow=" encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <h1 className="absolute top-28 left-16 text-8xl text-white font-semibold">
          Competitions,
          <br />
          Workshops,
          <br />
          Fests &<br /> more!
        </h1>
        <p className="absolute bottom-44 left-16 text-xl text-gray-300 font-light">
          Make the most of every opportunity to learn, enjoy
          <br /> and level up your skills.
        </p>
        <div>
          <Button
            onClick={() => navigate("societies")}
            className="absolute bottom-28 left-16"
            size="lg"
          >
            Explore Now
          </Button>
          <Button
            onClick={() => navigate("events")}
            className="absolute bottom-28 left-72"
            size="lg"
            variant={"secondary"}
          >
            View Past Events
          </Button>
        </div>
      </div>
      <div className="mx-96 my-5">
        <h2 className="text-3xl text-center my-5">Upcoming Events</h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <img src={Slider1} />
            </CarouselItem>
            <CarouselItem>
              <img src={Slider1} />
            </CarouselItem>
            <CarouselItem>
              <img src={Slider1} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Separator />
      <div>
        <h2 className="text-3xl text-center my-5">2024 Events Calender</h2>
        <p className="text-center my-3">
          Easily navigate between all the past and upcoming events !
        </p>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border flex justify-center"
        />
      </div>
    </div>
  );
};

export default Home;
