import {
  LuCalendar,
  LuClipboardList,
  LuHash,
  LuIndianRupee,
  LuMapPin,
  LuUser,
} from "react-icons/lu";
import { useState } from "react";
import SocietyDashBoardCard from "../society/components/SocietyDashBoardCard";
import { Badge } from "@/components/ui/badge";
const EventDashboard = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    const linkToCopy =
      "http://event.thapar.edu/events/creative-computing-society"; // Replace this with your actual link
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        console.log("Link copied to clipboard:", linkToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        console.log(copied);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        // You can optionally handle the error here
      });
  };

  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="event-cover-image bg-[url('https://www.ccstiet.com/static/home/images/01.jpeg')] h-[300px] flex justify-start items-end">
        <div className="event-name text-white p-9 font-semibold text-5xl">
          Escalade
        </div>
      </div>
      <div className="px-[30px] flex flex-col mt-5">
        <span className="text-2xl">Event Stats</span>
        <div className="flex flex-wrap w-full mt-4 justify-between">
          <SocietyDashBoardCard title={"Registrations"} value={369} />
          <SocietyDashBoardCard title={"Teams Registered"} value={672} />
          <SocietyDashBoardCard
            title={"Status"}
            value={"Active"}
            color="text-green-500"
          />
          <SocietyDashBoardCard
            title={"Visibility"}
            value={"Public"}
            color="text-green-500"
          />
        </div>
      </div>

      <div className="details-and-share w-full p-5 flex flex-col ">
        <span className="heading font-semibold text-xl ">Event Details</span>
        <div className="flex justify-start gap-5 flex-wrap items-start">
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
                <span className="font-semibold text-xl">10-1-2024</span>
              </div>
            </div>
            <div className="detail flex items-center gap-2 m-4">
              <LuUser className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm">Eligibility</span>
                <span className="font-semibold text-xl">Free</span>
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
            <div className="detail flex items-center gap-2 m-4">
              <LuHash className="text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm mb-2">Tags</span>
                <div className="tags-container flex flex-wrap gap-3">
                  <Badge className="p-2" variant="outline">
                    #CodingCompetition
                  </Badge>
                  <Badge className="p-2" variant="outline">
                    #Hackathon
                  </Badge>
                  <Badge className="p-2" variant="outline">
                    #Coffee
                  </Badge>
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

            <div className="copy-link flex items-center gap-3">
              <span>https://bit.ly/47lchl</span>
              <span onClick={copyToClipboard} className=" p-2 rounded-sm">
                <LuClipboardList className="text-xl" />
              </span>
            </div>
            {copied && <span>Link copied to clipboard</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
