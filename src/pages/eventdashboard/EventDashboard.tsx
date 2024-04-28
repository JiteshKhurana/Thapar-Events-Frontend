import {
  LuAirplay,
  LuCalendar,
  LuCalendarCheck,
  LuKeyRound,
  LuMapPin,
  LuPanelTopOpen,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import { useState } from "react";
import CardShimmer from "@/components/CardShimmer";
import { timeConverter, upcomingOrPast } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EmailIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const EventDashboard = () => {
  const event = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  const eventMetrics = useSelector(
    (store: RootState) => store.eventDashboard.currentEventMetrics
  );

  const baseUrl = window.location.origin;
  const url = `${baseUrl}/events/${event?.title
    .split(" ")
    .join("-")
    .toLowerCase()}
  /${event?._Eid}`;
  const [copySuccess, setCopySuccess] = useState("Copy to Clipboard");
  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopySuccess("Link Copied To Clipboard");
    setTimeout(() => setCopySuccess("Copy to Clipboard"), 3000);
  }
  if (!event) return <CardShimmer />;
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="welcome flex justify-between items-center">
        <div className="welcome flex flex-col">
          <span className="flex flex-wrap gap-2 text text-2xl">
            <span className="font-bold">{event?.title}</span>
          </span>
        </div>
      </div>
      <div>
        <CardHeader className="m-0 px-0">
          <CardTitle className="text-xl">Events Analytics</CardTitle>
          <CardDescription>
            View and Manage Event and see Analytics.
          </CardDescription>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Registrations
              </CardTitle>
              <LuUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventMetrics?.totalregistrations}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <LuCalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingOrPast(event.end_date) ? "Upcoming" : "Past"}
              </div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visibility</CardTitle>
              <LuKeyRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {event.visibility === "true" ? "Public" : "Private"}
              </div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-row gap-5 justify-between">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <LuCalendar className="text-2xl" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Registration Deadline
                </p>
              </div>
              <div className="ml-auto font-medium">
                {event.start_date
                  ? timeConverter(event.start_date, false)
                  : "-"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LuUser className="text-2xl" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Eligibility</p>
              </div>
              <div className="ml-auto font-medium">
                {event.eligibility ? event.eligibility : "-"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LuMapPin className="text-2xl" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Venue</p>
              </div>
              <div className="ml-auto font-medium">
                {event.venue ? event.venue : "-"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LuPanelTopOpen className="text-2xl" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Event Mode</p>
              </div>
              <div className="ml-auto font-medium">
                {event.event_mode ? event.event_mode : "-"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LuAirplay className="text-2xl" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Event Type</p>
              </div>
              <div className="ml-auto font-medium">
                {event.event_type ? event.event_type : "-"}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-full flex flex-col ">
          <div className="flex gap-2 flex-wrap justify-between">
            <div className="share flex flex-col items-center border-2 rounded-md shadow-xl p-8">
              <span className="mb-5">Share Your Event</span>
              <QRCodeSVG value={url} includeMargin={true} size={256} />

              <Button onClick={copyUrl} className="w-full my-5">
                {copySuccess}
              </Button>
              <div className="mt-5 flex  gap-2 justify-around">
                <WhatsappShareButton
                  separator="Register on Thapar Events by clicking on this link: "
                  url={
                    "/events/" +
                    event.title.split(" ").join("-").toLowerCase() +
                    "/" +
                    event._Eid
                  }
                  title={`Hey! You know there is ${
                    event.title
                  } happening from ${timeConverter(
                    event.start_date,
                    true
                  )} to ${timeConverter(event.end_date, true)} at ${
                    event.venue
                  }.`}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={
                    "/events/" +
                    event.title.split(" ").join("-").toLowerCase() +
                    "/" +
                    event._Eid
                  }
                  title={`Hey! You know there is ${
                    event.title
                  } happening from ${timeConverter(
                    event.start_date,
                    true
                  )} to ${timeConverter(event.end_date, true)} at ${
                    event.venue
                  } .Register on Thapar Events.`}
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <TwitterShareButton
                  url={
                    "/events/" +
                    event.title.split(" ").join("-").toLowerCase() +
                    "/" +
                    event._Eid
                  }
                  title={`Hey! You know there is ${
                    event.title
                  } happening from ${timeConverter(
                    event.start_date,
                    true
                  )} to ${timeConverter(event.end_date, true)} at ${
                    event.venue
                  } .Register on Thapar Events by clicking on this link:`}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <EmailShareButton
                  url={
                    "/events/" +
                    event.title.split(" ").join("-").toLowerCase() +
                    "/" +
                    event._Eid
                  }
                  subject={`Hey! You know there is ${
                    event.title
                  } happening from ${timeConverter(
                    event.start_date,
                    true
                  )} to ${timeConverter(event.end_date, true)} at ${
                    event.venue
                  } .`}
                  body={event.description}
                  separator=".Register on Thapar Events by clicking on this link:"
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
