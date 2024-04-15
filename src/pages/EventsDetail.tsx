import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/constants";
import CardShimmer from "@/components/CardShimmer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { timeConverter, findDifferenceTwoDates } from "@/lib/helper";
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
import { Event } from "@/store/eventSlice";
import { BiCalendarEvent, BiGroup, BiMap, BiMoney, BiTime } from "react-icons/bi";
import { MdGroups } from "react-icons/md";


const EventsDetail: React.FC = () => {
  const token = localStorage.getItem("token");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  async function getEvents() {
    axios
      .get(API_ENDPOINT + "/event/get?eventId=" + eventId)
      .then((res) => setEvent(res.data))
      .catch((error) => toast(error));
  }
  useEffect(() => {
    getEvents();
  }, []);
  const [copySuccess, setCopySuccess] = useState("SHARE THE EVENT");
  async function copyUrl() {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess("Link Copied To Clipboard");
    setTimeout(() => setCopySuccess("SHARE"), 3000);
  }

  if (!event) return <CardShimmer />;

  async function createCalendarEvent() {
    console.log("creating calendar event");
    if (!event?.start_date || !event?.end_date) {
      // Handle the case when start_date or end_date is undefined
      return;
    }
    const calEvent = {
      summary: event?.title,
      description: event?.description,
      start: {
        dateTime: new Date(
          timeConverter(event?.start_date, true)
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(timeConverter(event?.end_date, true)).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    // await axios
    //   .post(
    //     "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    //     JSON.stringify(calEvent),
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     toast("Event Created, Check Your Google Calender");
    //   });
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token, // Access token for google
        },
        body: JSON.stringify(calEvent),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      })
      .catch((error) => console.log(error.message));
  }

  const diffdates = findDifferenceTwoDates(Date.now() / 1000, event.start_date);
  return (
    <div className="flex flex-wrap justify-center bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712223505/Clip_path_group_jvxubn.svg')] bg-cover">
      <div className="coverimage w-full h-[250px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-cover bg-no-repeat"></div>
      <div className="w-full max-w-[1800px] grid grid-cols-8 lg:grid-cols-12 gap-6 mx-3 lg:mx-32 my-5">
        <div className="col-span-8 space-y-2">
          <div className="flex gap-5 p-5  bg-white dark:bg-black shadow-xl border rounded-lg">
            <Avatar className="h-28 w-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Event Pic</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2 overflow-hidden">
              <h1 className="text-4xl font-semibold">{event.title}</h1>
              <span className="text-gray-600 font-semibold">{event.soc_name}</span>
              <div className="flex gap-2 sm:gap-5  flex-wrap">
                <span className="flex items-center gap-1"><BiMap />{event.event_mode}</span>
                <span className="flex items-center gap-1"><BiCalendarEvent />
                  {timeConverter(event.start_date, false) + "to "}
                  {timeConverter(event.end_date, false)}
                </span>
                <span className="flex items-center gap-1"><BiTime />
                  {diffdates >= 0
                    ? diffdates + " days ago"
                    : -diffdates + " days left"}
                </span>
              </div>
              {event.hashtags && (
                <div className="flex gap-1">
                  {event.hashtags.map((hashtag) => (
                    <Badge key={uuidv4()} className="p-2" variant="outline">
                      #{hashtag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className=" bg-white dark:bg-black w-full flex shadow-xl border rounded-lg p-3 ">

            <NavigationMenu className="">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={navigationMenuTriggerStyle()}
                  >
                    Details
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={navigationMenuTriggerStyle()}
                  >
                    Dates & Deadlines
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={navigationMenuTriggerStyle()}
                  >
                    Rewards & Prizes
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            <div>
              <h2 className="font-semibold text-xl mb-2">
                Important dates and deadlines:
              </h2>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                  <span className="font-semibold ">Registration Starts</span>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold ">Registration deadline</span>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold ">Round 1</span>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold ">Round 2</span>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
              </div>
            </div>
            <Separator />
            {event.prizes && (
              <div>
                <h2 className="font-semibold text-xl mb-2">Rewards & Prizes:</h2>
                {Object.entries(event.prizes).map((prize) => (
                  <div key={uuidv4()} className="flex flex-col my-1">
                    <span className="font-medium text-lg">{prize[0]}</span>
                    <span className="">{prize[1]}</span>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            <div>
              <h2 className="font-semibold text-xl mb-2">
                Follow on Social Media
              </h2>
              {event.social_media && (
                <div className="flex flex-row space-x-5">
                  {Object.entries(event.social_media).map((link) => (
                    <a target="_blank" href={link[1]}>
                      {link[0]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-8 md:col-span-4 space-y-3 ">
          <div className=" bg-white dark:bg-black shadow-xl border rounded-lg p-5 space-y-3">
            <div className="flex justify-between items-center ">
              <span className="flex items-center gap-1 font-semibold text-[1.5rem]"><BiMoney className="text-3xl" />FREE</span>
              <Button onClick={() => navigate("register")}>Register Now</Button>
            </div>
            <Separator />
            <div>
              <div className="flex items-center">
                <BiTime className="mr-3 font-semibold text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Registration deadline</span>
                  <span>14 Hours</span>
                </div>
              </div>
              <div className="flex items-center">
                <BiGroup className="mr-3 font-semibold text-2xl" />

                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Team Size</span>
                  <span>1 - 2 Members</span>
                </div>
              </div>
              <div className="flex items-center">
                <MdGroups className="mr-3 font-semibold text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Total Registrations</span>
                  <span>3422</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white dark:bg-black shadow-xl border rounded-lg p-5 ">
            <span className="font-semibold text-lg">Eligibility</span>
            <Separator className="my-3" />
            {event.eligibility === "" ? (
              <span>All the students of TIET</span>
            ) : (
              <span>{event.eligibility}</span>
            )}
          </div>
          <div className=" bg-white dark:bg-black shadow-xl border rounded-lg p-5 ">
            <div className="buttons-container flex flex-col gap-2 ">

              <Button onClick={createCalendarEvent} className="w-full">
                Add to Google Calendar
              </Button>
              <Button onClick={copyUrl} className="w-full">
                {copySuccess}
              </Button>
            </div>
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
