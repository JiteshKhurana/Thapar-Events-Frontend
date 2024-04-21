import { LuCalendar, LuMapPin, LuUser } from "react-icons/lu";
import { useState } from "react";
import SocietyDashBoardCard from "../society/components/SocietyDashBoardCard";
import CardShimmer from "@/components/CardShimmer";
import { timeConverter, upcomingOrPast } from "@/lib/helper";
import { Button } from "@/components/ui/button";
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
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="event-cover-image bg-[url('https://www.ccstiet.com/static/home/images/01.jpeg')] h-[300px] flex justify-start items-end">
        <div className="event-name text-white p-9 font-semibold text-5xl">
          {event?.title}
        </div>
      </div>
      <div className="px-[30px] flex flex-col mt-5">
        <span className="text-2xl">Event Stats</span>
        <div className="flex flex-wrap w-full mt-4 justify-between">
          <SocietyDashBoardCard
            title={"Registrations"}
            value={eventMetrics?.totalregistrations}
          />
          {/* <SocietyDashBoardCard title={"Teams Registered"} value={672} /> */}
          <SocietyDashBoardCard
            title={"Status"}
            value={upcomingOrPast(event.end_date) ? "Upcoming" : "Past"}
            color={
              upcomingOrPast(event.end_date) ? "text-green-500" : "text-red-500"
            }
          />
          <SocietyDashBoardCard
            title={"Visibility"}
            value={event.visibility === "true" ? "Public" : "Private"}
            color={
              event.visibility === "true" ? "text-green-500" : "text-red-500"
            }
          />
        </div>
      </div>

      <div className="details-and-share w-full p-5 flex flex-col ">
        <span className="heading font-semibold text-xl">Event Details</span>
        <div className="flex gap-2 flex-wrap justify-between">
          <div className="basic-info-and-details flex flex-col min-h-[300px] rounded-lg shadow-xl border-2 mt-3 p-8">
            <div className="detail flex items-center gap-2 m-4">
              <LuCalendar className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Registration Deadline</span>
                <span className="font-semibold text-xl">
                  {timeConverter(event.start_date, false)}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuUser className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Eligibility</span>
                <span className="font-semibold text-xl">
                  {event.eligibility}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuMapPin className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Venue</span>
                <span className="font-semibold text-xl">
                  PG Activity Space 2
                </span>
              </div>
            </div>
          </div>
          <div className="basic-info-and-details flex flex-col min-h-[300px] rounded-lg shadow-xl border-2 mt-3 p-8">
            <div className="detail flex items-center gap-2 m-4">
              <LuMapPin className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Team Event</span>
                <span className="font-semibold text-xl">
                  {event.team ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuMapPin className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Event Mode</span>
                <span className="font-semibold text-xl">
                  {event.event_mode ? event.event_mode : "-"}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuMapPin className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Event Type</span>
                <span className="font-semibold text-xl">
                  {event.event_type ? event.event_type : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className="share mt-3 flex flex-col items-center min-w-[300px] min-h-[200px] border-2 rounded-md shadow-xl p-8">
            <span>Share Your Event</span>
            <QRCodeSVG value={url} includeMargin={true} size={256} />

            <Button onClick={copyUrl} className="w-full my-5">
              {copySuccess}
            </Button>
            <div className="flex flex-row gap-5 justify-around">
              <WhatsappShareButton
                separator=".Register on ConnectHub ASAP "
                url={url}
                title={
                  "Hey! You know there is " +
                  event.title +
                  " happening from " +
                  timeConverter(event.start_date, false) +
                  " to " +
                  timeConverter(event.end_date, false)
                }
              >
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton
                url={url}
                title={
                  "Hey! You know there is " +
                  event.title +
                  " happening from " +
                  timeConverter(event.start_date, false) +
                  " to " +
                  timeConverter(event.end_date, false)
                }
              >
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <TwitterShareButton
                url={url}
                title={
                  "Hey! You know there is " +
                  event.title +
                  " happening from " +
                  timeConverter(event.start_date, false) +
                  " to " +
                  timeConverter(event.end_date, false)
                }
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <EmailShareButton
                url={url}
                subject={
                  "Hey! You know there is " +
                  event.title +
                  " happening from " +
                  timeConverter(event.start_date, false) +
                  " to " +
                  timeConverter(event.end_date, false)
                }
                body={event.description}
                separator=".Register on ConnectHub ASAP "
              >
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
