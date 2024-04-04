import { Button } from "@/components/ui/button";
import Slider1 from "../assets/slider.png";
import Autoplay from "embla-carousel-autoplay";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VIDEO_CDN_URL } from "@/lib/constants";
// import axios from "axios";

const localizer = momentLocalizer(moment);

// Define the type for your event objects
interface Event {
  title: string;
  start: Date;
  end: Date;
  url: string; // Add a URL field to your event interface
}

const EventComponent: React.FC<{ event: Event }> = ({ event }) => (
  <a
    className="p-3 w-full h-full"
    href={event.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {event.title}
  </a>
);

const MyEventWrapper: React.FC = ({ children }: any) => (
  // <div className={`bg-${getRandomColorClass}`}>
  <div className="p-1">{children}</div>
);

const Home: React.FC = () => {
  const [calEvents] = useState<Event[]>([
    {
      title: "Meeting",
      start: new Date(2024, 3, 1, 10, 0),
      end: new Date(2024, 3, 5, 12, 0),
      url: "https://www.example.com",
    },
    {
      title: "Conference",
      start: new Date(2024, 3, 3, 13, 0),
      end: new Date(2024, 3, 3, 17, 0),
      url: "https://www.example.com",
    },
    {
      title: "Appointment",
      start: new Date(2024, 3, 7, 9, 0),
      end: new Date(2024, 3, 7, 10, 0),
      url: "https://www.example.com",
    },
    {
      title: "Appointment1",
      start: new Date(2024, 3, 7, 9, 0),
      end: new Date(2024, 3, 7, 10, 0),
      url: "https://www.example.com",
    },
    {
      title: "Appointment2",
      start: new Date(2024, 3, 7, 9, 0),
      end: new Date(2024, 3, 7, 10, 0),
      url: "https://www.example.com",
    },
    {
      title: "Appointment3",
      start: new Date(2024, 3, 7, 9, 0),
      end: new Date(2024, 3, 7, 10, 0),
      url: "https://www.example.com",
    },
  ]);

  //---------------Function to Fetch Events from API------------------
  // useEffect(() => {
  //     axios
  //         .get('http://localhost:3001/events')
  //         .then((response) => {
  //             console.log(response.data);
  //             const appointments: Event[] = response.data.map((appointment: any) => ({
  //                 ...appointment,
  //                 start: convertDate(appointment.start),
  //                 end: convertDate(appointment.end),
  //             }));
  //             setCalEvents(appointments);
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // }, []);

  return (
    <div>
      <div className="w-full h-[100vh]">
        {/* <div className=" brightness-50 overflow-clip -z-10"> */}
        <video
          // className="absolute  w-full h-[100vh] object-cover pointer-events-none"
          className="w-full h-[100vh] bg-black object-cover brightness-50"
          src={VIDEO_CDN_URL}
          loop
          autoPlay
          muted
          controls={false}
        ></video>
        {/* </div> */}
        <div className="absolute top-0 z-10 h-full w-full flex flex-col justify-center pl-20 gap-10">
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl text-white font-semibold">
            Competitions,
            <br />
            Workshops,
            <br />
            Fests &<br /> more!
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Make the most of every opportunity to learn, enjoy
            <br /> and level up your skills.
          </p>
          <div className="flex flex-wrap gap-5 ">
            <Link to={"/societies"}>
              <Button className="text-xl w-[300px]" size="lg">
                Explore Now
              </Button>
            </Link>
            <Link to={"/events"}>
              <Button
                className="text-xl w-[300px]"
                size="lg"
                variant={"secondary"}
              >
                View Past Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-96 my-5">
        <h2 className="text-3xl font-bold text-center my-5">Upcoming Events</h2>
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
        <h2 className="text-3xl font-bold text-center my-5">Events Calender</h2>
        <p className="text-center my-3">
          Easily navigate between all the past and upcoming events !
        </p>

        <Calendar
          localizer={localizer}
          events={calEvents}
          startAccessor="start"
          endAccessor="end"
          className="m-5 mx-20 border p-5 rounded-md h-[700px]"
          views={["month", "week", "day"]}
          components={{
            event: EventComponent, // Use custom event component
            eventWrapper: MyEventWrapper,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
