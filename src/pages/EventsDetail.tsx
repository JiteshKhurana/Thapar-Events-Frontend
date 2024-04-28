import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/constants";
import CardShimmer from "@/components/CardShimmer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  timeConverter,
  findDifferenceTwoDates,
  upcomingOrPast,
  isLoggedIn,
  isAdmin,
  isSuperAdmin,
  isUser,
} from "@/lib/helper";
import {
  EmailIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { LuClipboardCopy } from "react-icons/lu";
import {
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Event } from "@/store/eventSlice";
import { BiCalendarEvent, BiGroup, BiMap, BiTime } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";

import { MdGroups } from "react-icons/md";
import Cookies from "universal-cookie";

const EventsDetail: React.FC = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<number>(0);
  const [userRegistered, setUserRegistered] = useState<boolean>(false);

  async function checkRegistered() {
    try {
      const res = await axios.get(
        API_ENDPOINT + "/event/check/registrations/" + eventId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRegistered(res.data.message);
    } catch (error) {
      toast(String(error));
    }
  }

  async function getEvents() {
    try {
      const res = await axios.get(
        API_ENDPOINT + "/event/get?eventId=" + eventId
      );
      setEvent(res.data.event);
      setRegistrations(res.data.registrations);
    } catch (error) {
      toast(String(error));
    }
  }
  useEffect(() => {
    getEvents();
    isLoggedIn() && isUser() && checkRegistered();
  }, []);
  const [copySuccess, setCopySuccess] = useState("SHARE THE EVENT");
  async function copyUrl() {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess("Link Copied To Clipboard");
    setTimeout(() => setCopySuccess("SHARE THE EVENT"), 3000);
  }

  if (!event) return <CardShimmer />;

  const diffdates = findDifferenceTwoDates(
    Date.now() / 1000,
    Number(event.start_date)
  );
  return (
    <div className="flex flex-wrap justify-center">
      <div className="coverimage w-full h-[250px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-cover bg-no-repeat"></div>
      <div className="w-full max-w-[1800px] grid grid-cols-8 lg:grid-cols-12 gap-6 mx-3 lg:mx-32 my-5">
        <div className="col-span-8 space-y-2">
          <div className="flex gap-5 p-5  bg-white dark:bg-black shadow-xl border rounded-lg">
            <Avatar className="h-28 w-28">
              <AvatarImage src={event.image} />
              <AvatarFallback>Event Pic</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2 overflow-hidden">
              <h1 className="text-4xl font-semibold">{event.title}</h1>
              <span className="text-gray-500 font-semibold text-xl">
                {event.soc_name}
              </span>
              <div className="flex gap-2 sm:gap-5  flex-wrap">
                <span className="flex items-center gap-1">
                  <BiMap />
                  {event.event_mode}
                </span>
                <span className="flex items-center gap-1">
                  <BiCalendarEvent />
                  {timeConverter(event.start_date, false) + "to "}
                  {timeConverter(event.end_date, false)}
                </span>
                <span className="flex items-center gap-1">
                  <BiTime />
                  {diffdates >= 0
                    ? diffdates + " days ago"
                    : -diffdates + " days left"}
                </span>
              </div>
              {event.hashtags && (
                <div className="flex gap-1">
                  {event.hashtags.map(
                    (hashtag) =>
                      hashtag !== "" && (
                        <Badge key={uuidv4()} className="p-2" variant="outline">
                          #{hashtag}
                        </Badge>
                      )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className=" bg-white dark:bg-black shadow-xl border rounded-lg p-5 space-y-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xl">
                All that you need to know about {event.title}
              </h2>
              <span className="event-description ">{event.description}</span>
              <h3 className="font-medium text-gray-500 text-sm">
                Note: The organizers reserve the right to change the opportunity
                details.
              </h3>
            </div>
            <Separator />
            {event.deadlines && (
              <div>
                <h2 className="font-semibold text-xl mb-2">
                  Important dates and deadlines:
                </h2>
                {event.deadlines.map((deadline) => (
                  <div key={uuidv4()} className="flex flex-col space-y-1">
                    <span className="font-medium text-lg">
                      {deadline.title} : {timeConverter(deadline.date, true)}{" "}
                      IST
                    </span>
                    <span className="text-gray-300">
                      {deadline.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            {event.rounds && (
              <div>
                <h2 className="font-semibold text-xl mb-2">Rounds:</h2>
                {event.rounds.map((round) => (
                  <div key={uuidv4()} className="flex flex-col my-1">
                    <span className="font-medium text-lg">{round.name}</span>
                    <span className="">{round.description}</span>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            {event.prizes && (
              <div>
                <h2 className="font-semibold text-xl mb-2">
                  Rewards & Prizes:
                </h2>
                {event.prizes.map((prize) => (
                  <div key={uuidv4()} className="flex flex-col my-1">
                    <span className="font-medium text-lg">{prize.name}</span>
                    <span className="">{prize.description}</span>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            <Button
              onClick={() =>
                navigate("eventgallery", {
                  state: {
                    event: event,
                  },
                })
              }
            >
              Event Gallery
            </Button>
            <Separator />
            {/* {event.social_media && (
              <div>
                <h2 className="font-semibold text-xl mb-2">
                  Follow on Social Media
                </h2>
                <div className="flex flex-row space-x-5">
                  {Object.entries(event.social_media).map(
                    ([key, val]) =>
                      val !== "" && (
                        <a key={uuidv4()} href={val} target="_blank">
                          {key}
                        </a>
                      )
                  )}
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div className="col-span-8 md:col-span-4 space-y-3">
          {upcomingOrPast(event.end_date) ? (
            <div className="shadow-xl border rounded-lg p-5 space-y-3">
              {userRegistered ? (
                <Button className="w-full" disabled>
                  You are Registered
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={
                    isAdmin() || isSuperAdmin() || event.register === "false"
                  }
                  onClick={() =>
                    navigate("register", {
                      state: {
                        event: event,
                      },
                    })
                  }
                >
                  {isAdmin() || isSuperAdmin()
                    ? "You Can't Register"
                    : event.register === "true"
                    ? "Register Now"
                    : "Registrations Closed"}
                </Button>
              )}
            </div>
          ) : null}
          <div className="bg-background shadow-xl border rounded-lg p-5 ">
            <div className="flex items-center">
              <LuMapPin className="mr-3 font-semibold text-2xl" />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Venue</span>
                <span>{event.venue}</span>
              </div>
            </div>
            {event.team === "true" && (
              <div className="flex items-center">
                <BiGroup className="mr-3 font-semibold text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Team Size</span>
                  <span>1 - 2 Members</span>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <MdGroups className="mr-3 font-semibold text-2xl" />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">
                  Total Registrations
                </span>
                <span>{registrations}</span>
              </div>
            </div>
          </div>
          <div className="bg-background shadow-xl border rounded-lg p-5 ">
            <span className="font-semibold text-lg">Eligibility</span>
            <Separator className="my-3" />
            {event.eligibility === "" ? (
              <span>All the students of TIET</span>
            ) : (
              <span>{event.eligibility}</span>
            )}
          </div>
          <div className="bg-background shadow-xl border rounded-lg p-5 ">
            <Button onClick={copyUrl} className="w-full">
              <div className="flex flex-row gap-2 items-center">
                <p>{copySuccess}</p>
                <LuClipboardCopy />
              </div>
            </Button>
            <div className="mt-5 flex  gap-2 justify-around">
              <WhatsappShareButton
                separator=".Register on ConnectHub ASAP "
                url={location.href}
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
                url={location.href}
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
                url={location.href}
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
                url={location.href}
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

export default EventsDetail;
