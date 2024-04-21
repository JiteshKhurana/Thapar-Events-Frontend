import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { v4 as uuidv4 } from "uuid";
import {
  BiEnvelope,
  BiLogoLinkedinSquare,
  BiLogoInstagram,
} from "react-icons/bi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Society } from "@/store/societySlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import { upcomingOrPast } from "@/lib/helper";
import { Event } from "@/store/eventSlice";
import SuperadminSocietyEventCard from "./components/SuperadminSocietyEventCard";
import Cookies from "universal-cookie";
import { currentSocietyMetrics } from "@/store/societyProfileSlice";
import SocietyDashBoardCard from "../society/components/SocietyDashBoardCard";

const SuperAdminDashboardSocietyProfile = () => {
  const { state } = useLocation();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const society: Society = state.data;
  const [societyEvents, setSocietyEvents] = useState<Event[] | null>(null);
  const [societyMetrics, setSocietyMetrics] = useState<currentSocietyMetrics>();

  async function getSocietyEvents() {
    await axios
      .get(API_ENDPOINT + "/soc/get/events?soc_email=" + society.email)
      .then((res) => setSocietyEvents(res.data))
      .catch((error) => toast(error));
  }
  async function getSocietyMetrics() {
    await axios
      .get(API_ENDPOINT + "soc/dashboard/" + society.email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSocietyMetrics(res.data));
  }
  useEffect(() => {
    getSocietyEvents();
    getSocietyMetrics();
  }, []);
  if (!society) return <h1>Loading Society</h1>;
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div className="flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
            <div className="welcome flex justify-between items-center pt-5 px-1 lg:px-5">
              <div className="welcome flex flex-col">
                <div className="flex flex-row space-x-5 items-center">
                  <Avatar className="w-28 h-28">
                    <AvatarImage src={society.image} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-4xl font-semibold">
                    {society?.name}
                  </span>
                </div>
                <div className="my-3 flex flex-col">
                  <span className="active text-xl font-semibold">About</span>
                  <span className="text-xl">{society?.about}</span>
                </div>
              </div>
            </div>
            <div className="px-1 lg:px-5 flex flex-col mt-5">
              <span className="active text-xl font-semibold">
                Society Stats
              </span>
              <div className="flex flex-wrap w-full mt-4 justify-between">
                <SocietyDashBoardCard
                  title={"Total Events"}
                  value={societyMetrics?.totalEvents}
                />
                <SocietyDashBoardCard
                  title={"Upcoming Events"}
                  value={societyMetrics?.upcomingEvents}
                />
                <SocietyDashBoardCard
                  title={"Team Members"}
                  value={societyMetrics?.teamMembers}
                />
              </div>
            </div>
            <div className="active px-1 lg:px-5 mt-[30px]">
              <span className="active text-xl font-semibold">
                Society Events
              </span>
              <div className="active-event-list flex flex-col py-3">
                {societyEvents
                  ?.filter((event: Event) => upcomingOrPast(event.end_date))
                  .map((event) => (
                    <SuperadminSocietyEventCard
                      event={event}
                      key={event._Eid}
                    />
                  ))}
              </div>
            </div>
            {society.members && (
              <div className="px-1 lg:px-5 flex flex-col mt-5">
                <span className="active text-xl font-semibold">
                  Society Members
                </span>
                <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
                  <div className="flex overflow-x-scroll no-scrollbar space-x-5">
                    {society.members.map((member) => (
                      <Card className="w-1/4 min-w-[300px] p-5" key={uuidv4()}>
                        <CardContent className="text-center">
                          <p className="text-xl font-bold">{member.name}</p>
                          <p className="text-gray-400 text-xl">
                            {member.position}
                          </p>
                        </CardContent>
                        <CardFooter className="justify-between">
                          <a href={`mailto:${member.email}`} target="_blank">
                            <BiEnvelope className="text-3xl" />
                          </a>
                          <a href={member.linkedin} target="_blank">
                            <BiLogoLinkedinSquare className="text-3xl" />
                          </a>
                          <a href={member.instagram} target="_blank">
                            <BiLogoInstagram className="text-3xl" />
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {society.faculty && (
              <div className="px-1 lg:px-5 flex flex-col mt-5">
                <span className="active text-xl font-semibold">
                  Faculty Members
                </span>
                <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
                  <div className="flex overflow-x-scroll no-scrollbar space-x-5">
                    {society.faculty.map((facult) => (
                      <Card className="w-1/4 min-w-[300px] p-5" key={uuidv4()}>
                        <CardContent className="text-center">
                          <p className="text-xl font-bold">{facult.name}</p>
                          <p className="text-gray-400 text-xl">
                            {facult.position}
                          </p>
                        </CardContent>
                        <CardFooter className="justify-between">
                          <a href={`mailto:${facult.email}`} target="_blank">
                            <BiEnvelope className="text-3xl" />
                          </a>
                          <a href={facult.linkedin} target="_blank">
                            <BiLogoLinkedinSquare className="text-3xl" />
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardSocietyProfile;
