import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEvents from "@/hooks/useEvents";
import { timeConverter, upcomingOrPast } from "@/lib/helper";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Event } from "@/store/eventSlice";
import { API_ENDPOINT } from "@/lib/constants";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboardEvents = () => {
  useEvents();
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const Events = useSelector((store: RootState) => store.events.eventsList);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[] | null>(null);
  const [privateEvents, setPrivateEvents] = useState<Event[] | null>(null);
  const getPrivateEvents = async () => {
    await axios
      .get(API_ENDPOINT + "event/get/notvisible", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPrivateEvents(res.data))
      .catch((error) => {
        toast(error);
      });
  };
  useEffect(() => {
    getPrivateEvents();
    if (Events) {
      const { upcomingEvents, pastEvents } = Events.reduce(
        (
          acc: { upcomingEvents: Event[]; pastEvents: Event[] },
          event: Event
        ) => {
          if (upcomingOrPast(event.end_date)) {
            acc.upcomingEvents.push(event);
          } else {
            acc.pastEvents.push(event);
          }
          return acc;
        },
        { upcomingEvents: [], pastEvents: [] }
      );

      setUpcomingEvents(upcomingEvents);
      setPastEvents(pastEvents);
    }
  }, [Events]);
  if (!Events)
    return (
      <div className="mx-5 flex min-h-screen w-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
        Loading Events
      </div>
    );
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="">
              <CardHeader className="m-0 px-0">
                <CardTitle className="text-xl">Events</CardTitle>
                <CardDescription>View and Manage all Events.</CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-3">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="private">Private</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden">Image</span>
                        </TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Society Name</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Event Mode</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Event Dashboard</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Events.map((event) => {
                        return (
                          <TableRow key={event._Eid}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                src={event.image}
                                alt="Event image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {event.title}
                            </TableCell>
                            <TableCell className="font-medium">
                              {event.soc_name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${
                                  event.visibility === "true"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                                variant="outline"
                              >
                                {event.visibility === "true"
                                  ? "Public"
                                  : "Private"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {timeConverter(event.start_date, true)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {timeConverter(event.end_date, true)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {event.event_type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {event.event_mode}
                              </Badge>
                            </TableCell>
                            <TableCell>{event.venue}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  navigate("/eventdashboard/" + event._Eid);
                                }}
                                className="flex items-center gap-1"
                              >
                                <BiLinkExternal /> Event Dashboard
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden">Image</span>
                        </TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Society Name</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Event Mode</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Event Dashboard</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEvents &&
                        upcomingEvents.map((event) => {
                          return (
                            <TableRow key={event._Eid}>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  src={event.image}
                                  alt="Event image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  width="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.title}
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.soc_name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    event.visibility === "true"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                  variant="outline"
                                >
                                  {event.visibility === "true"
                                    ? "Public"
                                    : "Private"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.start_date, true)}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.end_date, true)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_mode}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.venue}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {
                                    navigate("/eventdashboard/" + event._Eid);
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <BiLinkExternal /> Event Dashboard
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden">Image</span>
                        </TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Society Name</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Event Mode</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Event Dashboard</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastEvents &&
                        pastEvents.map((event) => {
                          return (
                            <TableRow key={event._Eid}>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  src={event.image}
                                  alt="Event image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  width="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.title}
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.soc_name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    event.visibility === "true"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                  variant="outline"
                                >
                                  {event.visibility === "true"
                                    ? "Public"
                                    : "Private"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.start_date, true)}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.end_date, true)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_mode}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.venue}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {
                                    navigate("/eventdashboard/" + event._Eid);
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <BiLinkExternal /> Event Dashboard
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="private">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden">Image</span>
                        </TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Society Name</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Event Mode</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Event Dashboard</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {privateEvents &&
                        privateEvents.map((event) => {
                          return (
                            <TableRow key={event._Eid}>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  src={event.image}
                                  alt="Event image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  width="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.title}
                              </TableCell>
                              <TableCell className="font-medium">
                                {event.soc_name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    event.visibility === "true"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                  variant="outline"
                                >
                                  {event.visibility === "true"
                                    ? "Public"
                                    : "Private"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.start_date, true)}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timeConverter(event.end_date, true)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_mode}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.venue}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {
                                    navigate("/eventdashboard/" + event._Eid);
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <BiLinkExternal /> Event Dashboard
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardEvents;
