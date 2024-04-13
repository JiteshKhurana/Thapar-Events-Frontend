import {
  LuCalendar,
  LuHash,
  LuIndianRupee,
  LuMapPin,
  LuUser,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import SocietyDashBoardCard from "../society/components/SocietyDashBoardCard";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { API_ENDPOINT } from "@/lib/constants";
import { Event } from "@/store/eventSlice";
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
const EventDashboard = () => {
  const { state } = useLocation();
  const [event, setEvent] = useState<Event | null>(null);
  async function getEvents() {
    axios
      .get(API_ENDPOINT + "event/get?eventId=" + state.eventId)
      .then((res) => setEvent(res.data))
      .catch((error) => toast(error));
  }
  useEffect(() => {
    getEvents();
  }, []);
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/events/${event?.title
    .split(" ")
    .join("-")
    .toLowerCase()}
  /${event?._Eid}`;
  const [copySuccess, setCopySuccess] = useState("SHARE THE EVENT");
  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopySuccess("Link Copied To Clipboard");
    setTimeout(() => setCopySuccess("SHARE THE EVENT"), 3000);
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
          <SocietyDashBoardCard title={"Registrations"} value={369} />
          <SocietyDashBoardCard title={"Teams Registered"} value={672} />
          <SocietyDashBoardCard
            title={"Status"}
            value={upcomingOrPast(event.end_date) ? "Upcoming" : "Past"}
            color={
              upcomingOrPast(event.end_date) ? "text-green-500" : "text-red-500"
            }
          />
        </div>
      </div>

      <div className="details-and-share w-full p-5 flex flex-col ">
        <span className="heading font-semibold text-xl">Event Details</span>
        <div className="flex gap-5 flex-wrap justify-start">
          <div className="basic-info-and-details flex flex-col min-h-[400px] rounded-lg shadow-xl border-2 mt-3">
            <div className="detail flex items-center gap-2 m-4">
              <LuIndianRupee className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Registration Fees</span>
                <span className="font-semibold text-xl">Free</span>
              </div>
            </div>
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
          <div className="basic-info-and-details flex flex-col min-h-[400px] rounded-lg shadow-xl border-2 mt-3">
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
                  {event.event_mode}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuMapPin className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Event Type</span>
                <span className="font-semibold text-xl">
                  {event.event_type}
                </span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuHash className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm mb-2">Tags</span>
                <div className="tags-container flex flex-wrap gap-3">
                  {event.hashtags.map((hashtag) => (
                    <Badge className="p-2" variant="outline">
                      #{hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="share mt-3 flex flex-col items-center min-w-[300px] p-3 min-h-[200px] border-2 rounded-md shadow-xl">
            <span>Share Your Event</span>
            <img
              src={
                "https://res.cloudinary.com/dhrfyg57t/image/upload/v1709374479/bit.ly_47Ichil_nxfuvo.png"
              }
              className="w-[200px] h-[200px] m-5"
            ></img>

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
                hashtags={event.hashtags}
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
