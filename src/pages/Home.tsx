import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VIDEO_CDN_URL } from "@/lib/constants";
import Footer from "@/components/Footer";

const localizer = momentLocalizer(moment);
import "./index.css";
import useEvents from "@/hooks/useEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import EventComponent from "./EventComponent";
import { timeConverter } from "@/lib/helper";
import CardShimmer from "@/components/CardShimmer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  useEvents();
  const events = useSelector((store: RootState) => store.events.eventsList);

  const EVENTS = events?.map((event) => ({
    start: new Date(timeConverter(event.start_date, true)),
    end: new Date(timeConverter(event.end_date, true)),
    data: { event },
  }));

  return (
    <div>
      <div className="w-full h-[100vh]">
        <video
          className="w-full h-[100vh] bg-black object-cover brightness-50"
          src={VIDEO_CDN_URL}
          loop
          autoPlay
          muted
          controls={false}
        ></video>
        <div className="absolute top-0 z-10 h-full w-full flex flex-col justify-end sm:justify-center pl-2 sm:pl-10 gap-10">
          <h1 className="text-4xl sm:text-6xl  md:text-8xl lg:text-[11vh] text-white font-semibold">
            Competitions,
            <br />
            Workshops,
            <br />
            Fests &<br /> more!
          </h1>
          <p className="flex flex-row sm:flex-col flex-wrap text-xl text-gray-300 font-light self-center sm:self-start">
            <span>Make the most of every opportunity to learn, enjoy</span>
            <span>and level up your skills.</span>
          </p>
          <div className="mb-8 sm:mb-0 mt-24 md:mt-5 flex flex-col sm:flex-row flex-wrap gap-5 self-center sm:self-start">
            <Link to={"/events"}>
              <Button className="text-lg w-[250px] p-6" variant={"secondary"}>
                Explore Now
              </Button>
            </Link>
            <Link to={"/events"}>
              <Button className="text-lg w-[250px] p-6">
                View Past Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className=" flex justify-between items-center flex-col w-full my-5">
          <h2 className="text-3xl font-bold text-center my-5">
            Upcoming Events
          </h2>
          <Carousel
            className="w-[60%]"
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {events?.map(
                (event) =>
                  event?.image && (
                    <CarouselItem
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          "/events/" +
                            event.title.split(" ").join("-").toLowerCase() +
                            "/" +
                            event._Eid
                        )
                      }
                    >
                      <img src={event.image} />
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col ">
        <h2 className="text-3xl font-bold text-center mt-5">Events Calendar</h2>
        <p className="text-center mt-3">
          Easily navigate between all the past and upcoming events !
        </p>
        <div className="h-[95vh] my-5">
          <Calendar
            className="shadow-2xl m-5 mx-3 lg:mx-20 border p-5 rounded-md dark:text-white max-h-[95vh]"
            localizer={localizer}
            events={EVENTS}
            views={["month"]}
            components={{
              event: ({ event }) => {
                const data = event?.data;
                if (data?.event) return <EventComponent event={data?.event} />;
                return <CardShimmer />;
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
