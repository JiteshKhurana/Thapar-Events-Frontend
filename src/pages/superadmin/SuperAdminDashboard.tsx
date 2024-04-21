import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useEvents from "@/hooks/useEvents";
import useSocieties from "@/hooks/useSocieties";
import { upcomingOrPast } from "@/lib/helper";
import { Event } from "@/store/eventSlice";
import { RootState } from "@/store/store";
import { CreditCard, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SuperAdminDashboard = () => {
  useEvents();
  useSocieties();
  const events = useSelector((store: RootState) => store.events.eventsList);
  const [upcomingEvents, setUpcomingEvents] = useState<number>(0);
  useEffect(() => {
    if (events) {
      const filteredEvents = events.filter((event: Event) =>
        upcomingOrPast(event.end_date)
      );
      setUpcomingEvents(filteredEvents.length);
    }
  }, [events]);
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div className="">
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Societies</CardTitle>
              <CardDescription>View and Manage all Societies.</CardDescription>
            </CardHeader>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Events
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {events ? events.length : 0}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Events
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEvents}</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Past Events
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {events ? events.length - upcomingEvents : 0}
                </div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Societies
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {societies ? societies.length : 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
