import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LuCalendar,
  LuCalendarCheck,
  LuCalendarClock,
  LuKeyRound,
  LuUsers,
} from "react-icons/lu";

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
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import useSocieties from "@/hooks/useSocieties";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  useEvents();
  useSocieties();
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const Events = useSelector((store: RootState) => store.events.eventsList);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[] | null>(null);
  const [privateEvents, setPrivateEvents] = useState<Event[] | null>(null);
  const [NoUsers, setNoUsers] = useState<number>(0);

  const getPrivateEvents = async () => {
    await axios
      .get(API_ENDPOINT + "event/get/notvisible", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPrivateEvents(res.data))
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast(error.response?.data);
        } else {
          toast("An error occurred");
        }
      });
  };
  const getUsers = async () => {
    try {
      await axios
        .get(API_ENDPOINT + "users/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setNoUsers(res.data.length));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      } else {
        toast("An error occurred");
      }
    }
  };
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );
  useEffect(() => {
    getPrivateEvents();
    getUsers();
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
                <CardTitle className="text-xl">Events & Analytics</CardTitle>
                <CardDescription>
                  View and Manage all Events and see their Analytics.
                </CardDescription>
              </CardHeader>
              <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-6">
                <Card x-chunk="dashboard-01-chunk-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <LuUsers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{NoUsers}</div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Events
                    </CardTitle>
                    <LuCalendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Events ? Events.length : 0}
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Events
                    </CardTitle>
                    <LuCalendarCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {upcomingEvents ? upcomingEvents.length : 0}
                    </div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Past Events
                    </CardTitle>
                    <LuCalendarClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Events
                        ? Events.length -
                          (upcomingEvents ? upcomingEvents.length : 0)
                        : 0}
                    </div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Private Events
                    </CardTitle>
                    <LuKeyRound className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {privateEvents ? privateEvents.length : 0}
                    </div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Societies
                    </CardTitle>
                    <LuUsers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {societies ? societies.length : 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-wrap gap-3 my-10">
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

export default SuperAdminDashboard;
