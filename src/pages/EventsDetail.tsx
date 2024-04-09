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

const EventsDetail: React.FC = () => {
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
  const diffdates = findDifferenceTwoDates(Date.now() / 1000, event.start_date);
  return (
    <div>
      <div className="grid grid-cols-12 gap-10 mx-32 my-8">
        <div className="col-span-8 space-y-5">
          <div className="flex gap-5 p-5 border rounded-lg">
            <Avatar className="h-28 w-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Event Pic</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl">{event.title}</h1>
              <p>{event.soc_name}</p>
              <div className="flex gap-10">
                <p>{event.event_mode}</p>
                <p>
                  {timeConverter(event.start_date, false) + "to "}
                  {timeConverter(event.end_date, false)}
                </p>
                <p>
                  {diffdates >= 0
                    ? diffdates + " days ago"
                    : -diffdates + " days left"}
                </p>
              </div>
              {event.hashtags && (
                <div className="flex gap-5">
                  {event.hashtags.map((hashtag) => (
                    <Badge key={uuidv4()} className="p-2" variant="outline">
                      #{hashtag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <NavigationMenu className="border rounded-lg">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/docs"
                  className={navigationMenuTriggerStyle()}
                >
                  Details
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/docs"
                  className={navigationMenuTriggerStyle()}
                >
                  Dates & Deadlines
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/docs"
                  className={navigationMenuTriggerStyle()}
                >
                  Rewards & Prizes
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="border rounded-lg p-5 space-y-5">
            <div>
              <h2 className="font-semibold text-2xl">
                All that you need to know about {event.title}
              </h2>
              <p>{event.description}</p>
              <h3 className="font-medium my-3">
                Note: The organizers reserve the right to change the opportunity
                details.
              </h3>
            </div>
            <Separator />
            <div>
              <h2 className="font-medium text-xl mb-2">
                Important dates and deadlines:
              </h2>
              <div className="flex flex-col space-y-3">
                <div>
                  <h4 className="font-medium text-lg">Registration Starts</h4>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Registration deadline</h4>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Round 1</h4>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Round 2</h4>
                  <p className="font-light">04 Feb 24, 11:59 PM IST</p>
                </div>
              </div>
            </div>
            <Separator />
            {event.prizes && (
              <div>
                <h2 className="font-medium text-xl mb-2">Rewards & Prizes:</h2>
                {Object.entries(event.prizes).map((prize) => (
                  <div key={uuidv4()}>
                    <h4 className="font-medium text-lg">{prize[0]}</h4>
                    <p>{prize[1]}</p>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            <div>
              <h2 className="font-medium text-xl mb-2">
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
        <div className="col-span-4 space-y-2">
          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <p className="font-medium text-2xl">FREE</p>
              <Button onClick={() => navigate("register")}>Register Now</Button>
            </div>
            <Separator />
            <div>
              <div>
                <p className="font-medium">Registration deadline</p>
                <p>14 Hours</p>
              </div>
              <div>
                <p className="font-medium">Team Size</p>
                <p>1 - 2 Members</p>
              </div>
              <div>
                <p className="font-medium">Total Registrations</p>
                <p>3422</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5 space-y-3">
            <h3 className="font-medium">Eligibility</h3>
            <Separator />
            {event.eligibility === "" ? (
              <p>All the students of TIET</p>
            ) : (
              <p>{event.eligibility}</p>
            )}
          </div>
          <div className="border rounded-lg p-5 space-y-3">
            <Button onClick={copyUrl} className="w-full">
              {copySuccess}
            </Button>
            <div className="flex flex-row gap-2 justify-around">
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
