import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CardShimmer from "@/components/CardShimmer";
import { useNavigate } from "react-router-dom";
import useEvents from "@/hooks/useEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BiCalendar } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { timeConverter, upcomingOrPast } from "@/lib/helper";
import { Input } from "@/components/ui/input";
import { Event } from "@/store/eventSlice";
import { EVENT_TYPES } from "@/lib/constants";

const Events: React.FC = () => {
  useEvents();
  const events = useSelector((store: RootState) => store.events.eventsList);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    if (events) {
      const upcomingEvents = events?.filter((event) =>
        upcomingOrPast(event.end_date)
      );
      setFilteredEvents(upcomingEvents);
      setisLoading(false);
    }
    if (searchText && events) {
      filterEvents();
      setisLoading(false);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [events, searchText]);

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    // Check if the pressed key is "/"
    if (event.key === "/") {
      // Prevent the default action to avoid typing "/" in the input
      event.preventDefault();
      // Focus the search input element
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  function setFilter(typeofEvent: string) {
    if (typeofEvent === "all") setFilteredEvents(events);
    else {
      const data = events?.filter((event) => event.event_type === typeofEvent);
      setFilteredEvents(data || null);
    }
  }

  function filterEvents() {
    const filteredData = filteredEvents?.filter((event) =>
      event.title.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredEvents(filteredData || null);
  }

  function handleChange(value: string) {
    if (value === "past") {
      const filteredData = events?.filter(
        (event) => !upcomingOrPast(event.end_date)
      );
      setFilteredEvents(filteredData || null);
    } else {
      const filteredData = events?.filter((event) =>
        upcomingOrPast(event.end_date)
      );
      setFilteredEvents(filteredData || null);
    }
  }

  if (!events) return <CardShimmer />;
  if (isLoading) {
    return <CardShimmer />;
  }

  return (
    <div>
      <div className="min-h-[90vh] m-10 flex flex-col justify-start items-center bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359227/g73yppeecnbrxpdbhc6q.svg')] bg-no-repeat bg-cover dark:bg-opacity-10">
        <h1 className="font-semibold text-4xl mb-5 ">Explore Events at TIET</h1>
        <div>
          <Tabs
            defaultValue="upcoming"
            className="w-full"
            onValueChange={handleChange}
          >
            <div className="filters-container flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10">
              <TabsList className="mt-5 mx-5 shadow-xl py-3 m-3">
                <TabsTrigger className="w-[150px]" value="upcoming">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger className="w-[150px]" value="past">
                  Past
                </TabsTrigger>
              </TabsList>
              <Select onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Event Type</SelectLabel>
                    {EVENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchText}
                  ref={searchInputRef}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  placeholder="Search an event (Press /)...."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </div>

            <TabsContent value="upcoming">
              <div className="flex flex-wrap justify-center">
                {filteredEvents?.length === 0 ? (
                  <h1 className="text-black text-4xl text-center dark:text-white">
                    No Events to display
                  </h1>
                ) : (
                  filteredEvents?.map((event) => (
                    <Card
                      key={uuidv4()}
                      className="w-[93vw] max-w-[400px] m-5 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359230/iijlpvxuxvaxetfsr9fu.jpg')]"></div>

                      <CardHeader className="flex flex-row space-x-5 ">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            className=""
                            src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.soc_name}</CardDescription>
                          <CardDescription className="flex items-center gap-1">
                            <BiCalendar className="text-black dark:text-white" />
                            {timeConverter(event.start_date, false) + "to "}
                            {timeConverter(event.end_date, false)}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      {event.hashtags && (
                        <CardContent className="flex gap-2 justify-center">
                          {event.hashtags.map(
                            (hashtag) =>
                              hashtag !== "" && (
                                <Badge
                                  key={uuidv4()}
                                  className="p-2"
                                  variant="outline"
                                >
                                  #{hashtag}
                                </Badge>
                              )
                          )}
                        </CardContent>
                      )}
                      <CardFooter>
                        <Button
                          onClick={() =>
                            navigate(
                              event.title.split(" ").join("-").toLowerCase() +
                                "/" +
                                event._Eid
                            )
                          }
                          className="w-full"
                        >
                          Preview
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="flex flex-wrap justify-center">
                {filteredEvents?.length === 0 ? (
                  <h1 className="text-black text-4xl text-center dark:text-white">
                    No Events to display
                  </h1>
                ) : (
                  filteredEvents?.map((event) => (
                    <Card
                      key={uuidv4()}
                      className="w-[93vw] max-w-[400px] m-5 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359230/iijlpvxuxvaxetfsr9fu.jpg')]"></div>

                      <CardHeader className="flex flex-row space-x-5 ">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            className=""
                            src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.soc_name}</CardDescription>
                          <CardDescription className="flex items-center gap-1">
                            <BiCalendar className="text-black dark:text-white" />
                            {timeConverter(event.start_date, false) + "to "}
                            {timeConverter(event.end_date, false)}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      {event.hashtags && (
                        <CardContent className="flex gap-2 justify-center">
                          {event.hashtags.map(
                            (hashtag) =>
                              hashtag !== "" && (
                                <Badge
                                  key={uuidv4()}
                                  className="p-2"
                                  variant="outline"
                                >
                                  #{hashtag}
                                </Badge>
                              )
                          )}
                        </CardContent>
                      )}
                      <CardFooter>
                        <Button
                          onClick={() =>
                            navigate(
                              event.title.split(" ").join("-").toLowerCase() +
                                "/" +
                                event._Eid
                            )
                          }
                          className="w-full"
                        >
                          Preview
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
