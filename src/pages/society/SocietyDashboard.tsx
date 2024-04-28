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
import {
  LuCalendar,
  LuCalendarCheck,
  LuCalendarClock,
  LuUsers,
} from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { timeConverter, upcomingOrPast } from "@/lib/helper";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event } from "@/store/eventSlice";

const SocietyDashboard = () => {
  const currentDate = new Date().toDateString();

  const society = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const societyMetrics = useSelector(
    (store: RootState) => store.society.currentSocietyMetrics
  );
  const societyEvents = useSelector(
    (store: RootState) => store.society.currentSocietyEvents
  );
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[] | null>(null);
  const [privateEvents, setPrivateEvents] = useState<Event[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (societyEvents) {
      const { upcomingEvents, pastEvents, privateEvents } =
        societyEvents.reduce(
          (
            acc: {
              upcomingEvents: Event[];
              pastEvents: Event[];
              privateEvents: Event[];
            },
            event: Event
          ) => {
            if (upcomingOrPast(event.end_date)) {
              acc.upcomingEvents.push(event);
            } else {
              acc.pastEvents.push(event);
            }
            if (event.visibility === "false") {
              acc.privateEvents.push(event);
            }
            return acc;
          },
          { upcomingEvents: [], pastEvents: [], privateEvents: [] }
        );

      setUpcomingEvents(upcomingEvents);
      setPastEvents(pastEvents);
      setPrivateEvents(privateEvents);
    }
  }, [societyEvents]);

  if (!societyEvents) return <h1>No events to display</h1>;
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="welcome flex justify-between items-center">
          <div className="welcome flex flex-col">
            <span className="text  font-semibold  text-md">{currentDate}</span>
            <span className="flex flex-wrap gap-2 text  text-2xl">
              Welcome back{" "}
              <span className="font-bold">{society?.name}! ♥️</span>
            </span>
          </div>
        </div>
        <div>
          <CardHeader className="m-0 px-0">
            <CardTitle className="text-xl">Events & Analytics</CardTitle>
            <CardDescription>
              View and Manage all Events and see their Analytics.
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Events
                </CardTitle>
                <LuCalendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {societyMetrics?.totalEvents ? societyMetrics.totalEvents : 0}
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
                  {societyMetrics?.upcomingEvents
                    ? societyMetrics.upcomingEvents
                    : 0}
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
                  {societyMetrics?.totalEvents
                    ? societyMetrics.totalEvents -
                      (societyMetrics?.upcomingEvents
                        ? societyMetrics.upcomingEvents
                        : 0)
                    : 0}
                </div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <LuUsers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {societyMetrics?.teamMembers}
                </div>
                <p className="text-xs text-muted-foreground"></p>
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
                  {societyEvents.map((event) => {
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
                        <TableCell>
                          <Badge
                            className={`${
                              event.visibility === "true"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                            variant="outline"
                          >
                            {event.visibility === "true" ? "Public" : "Private"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {timeConverter(event.start_date, true)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {timeConverter(event.end_date, true)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.event_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.event_mode}</Badge>
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
                            <Badge variant="outline">{event.event_type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.event_mode}</Badge>
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
                            <Badge variant="outline">{event.event_type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.event_mode}</Badge>
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
                            <Badge variant="outline">{event.event_type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.event_mode}</Badge>
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
  );
};

export default SocietyDashboard;
