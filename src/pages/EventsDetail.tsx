import { Badge } from "@/components/ui/badge";
import Banner from "../assets/banner.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const EventsDetail = () => {
  return (
    <div>
      <img src={Banner} />
      <div className="grid grid-cols-12 gap-10 mx-32 my-8">
        <div className="col-span-8 space-y-5">
          <div className="flex gap-5 p-5 border rounded-lg">
            <Avatar className="h-28 w-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl">Creative Computing Society</h1>
              <p>Microsoft Learn Student Chapter</p>
              <div className="flex gap-10">
                <p>Offline</p>
                <p>27-02-2024</p>
                <p>9 Days Left </p>
              </div>
              <div className="flex gap-5">
                <Badge className="p-2" variant="outline">
                  #Engineering
                </Badge>
                <Badge className="p-2" variant="outline">
                  #Coffee
                </Badge>
                <Badge className="p-2" variant="outline">
                  #Coding
                </Badge>
              </div>
            </div>
          </div>
          <NavigationMenu className="border rounded-lg">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Details
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dates & Deadlines
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Rewards & Prizes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="border rounded-lg p-5 space-y-5">
            <div>
              <h2 className="font-semibold text-2xl">
                All that you need to know about MAKE4THON
              </h2>
              <h3 className="font-medium text-lg">Guidelines</h3>
              <ul className="list-disc font-light">
                <li>
                  This event applies only to the students of TIET irrespective
                  of their programs.
                </li>
                <li>
                  Inter-specialization & inter-batch teams across batches are
                  allowed.
                </li>
                <li>There will be a total of 3 rounds for this event.</li>
                <li>
                  The event is scheduled for 5th February's evening and all the
                  rounds will be held offline only in 1 sitting.
                </li>
                <li>
                  The venue and time details will be communicated at a later
                  stage.
                </li>
                <li>
                  It is a cryptic hunt that requires you to navigate through 3
                  different rounds.
                </li>
                <li>
                  Rounds require you to mine bitcoins followed by choosing
                  alternatives and executing a chase strategy
                </li>
              </ul>
              <h3 className="font-medium text-lg">Event Rules:</h3>
              <ul className="list-disc font-light">
                <li>
                  All the assets can be used in developing the game make sure
                  you have the rights to use the assets.
                </li>
                <li>Your game should be made within the stipulated time.</li>
                <li>
                  Relevance to the theme is preferred and has points if the
                  theme is shown in the gam.
                </li>
              </ul>
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
            <div>
              <h2 className="font-medium text-xl mb-2">Rewards & Prizes:</h2>
              <p className="mb-2">Prize pool worth INR 100,000 </p>
              <div className="flex flex-col space-y-3">
                <div>
                  <h4 className="font-medium text-lg">First Prize</h4>
                  <p>Cash Prize of INR 10000</p>
                  <p>GFG Voucher worth INR 2000 </p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Second Prize</h4>
                  <p>Cash Prize of INR 10000</p>
                  <p>GFG Voucher worth INR 2000 </p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Third Prize</h4>
                  <p>Cash Prize of INR 10000</p>
                  <p>GFG Voucher worth INR 2000 </p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="font-medium text-xl mb-2">
                Follow on Social Media
              </h2>
              <div className="flex space-x-5">
                <FaInstagram />
                <FaTwitter />
                <FaFacebook />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 space-y-2">
          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <p className="font-medium text-2xl">FREE</p>
              <Button>Register Now</Button>
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
            <p>All the students of TIET</p>
          </div>
          <div className="border rounded-lg p-5 space-y-3">
            <Button className="w-full">SHARE</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetail;
