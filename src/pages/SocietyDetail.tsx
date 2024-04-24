import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardSlider from "@/components/CardSlider";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import CardShimmer from "@/components/CardShimmer";
import {
  BiEnvelope,
  BiLogoLinkedinSquare,
  BiLogoInstagram,
} from "react-icons/bi";
import { Society } from "../store/societySlice";
import { Event } from "@/store/eventSlice";
import { upcomingOrPast } from "@/lib/helper";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SocietyDetail: React.FC = () => {
  const { state } = useLocation();
  const [society, setSociety] = useState<Society | null>(null);
  const [societyEvents, setSocietyEvents] = useState<Event[] | null>(null);
  async function getSocietyDetails() {
    await axios
      .get(API_ENDPOINT + "/soc/get?societyId=" + state.societyId)
      .then((res) => setSociety(res.data))
      .catch((error) => toast(error));
  }
  async function getSocietyEvents() {
    await axios
      .get(API_ENDPOINT + "/soc/get/events?soc_email=" + state.societyEmail)
      .then((res) => setSocietyEvents(res.data))
      .catch((error) => toast(error));
  }
  useEffect(() => {
    getSocietyDetails();
    getSocietyEvents();
  }, []);

  const upcomingEvents = societyEvents?.filter((event) =>
    upcomingOrPast(event.end_date)
  );
  const pastEvents = societyEvents?.filter(
    (event) => !upcomingOrPast(event.end_date)
  );

  if (!society) return <CardShimmer />;
  return (
    <div className="">
      <div className="society-header bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] border-b bg-no-repeat bg-cover">
        <div className="w-full h-[25vh] flex items-end justify-start gap-5 p-5 bg-black bg-opacity-40">
          <div className="heading-container flex items-center justify-start gap-5">
            <Avatar className="h-16 w-16 md:h-24 md:w-24 border">
              <AvatarImage src={society.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-2xl text-white font-semibold">
              {society.name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center px-5">
        <div className="society-detail mt-5 w-full md:w-[80%] max-w-[1920px]">
          <div className=""></div>
          <h2 className="text-2xl my-3 font-semibold ">
            About Society
          </h2>
          <p>{society.about}</p>
          <Separator className="mt-3" />
          {!upcomingEvents ? (
            <>
              <h1 className="text-2xl font-semibold">Upcoming Events</h1>
              <h2>No Upcoming Events to display</h2>
            </>
          ) : (
            <CardSlider
              title="Upcoming Events"
              apply={false}
              itemsToMap={upcomingEvents}
            />
          )}
          {!pastEvents ? (
            <>
              <h1 className="text-2xl font-semibold">Past Events</h1>
              <h2>No Past Events to display</h2>
            </>
          ) : (
            <CardSlider
              title="Past Events"
              apply={false}
              itemsToMap={pastEvents}
            />
          )}
          {society.members && (
            <div className="editorcontainer my-5 min-h-[100vh]rounded-lg  py-3">
              <span className="flex font-semibold text-2xl my-3">
                Our Team
              </span>
              <div className="member-list-container max-h-[90vh] flex flex-col gap-3  rounded-md my-3 overflow-y-scroll no-scrollbar">
                {society.members.map((member) => (
                  <div className="flex p-5 justify-between border rounded-md w-full  bg-background" key={uuidv4()}>
                    <div className="flex flex-col items-start ">
                      <p className="text-lg font-semibold">{member.name}</p>
                      <p className="text-muted-foreground font-semibold">
                        {member.position}
                      </p>
                    </div>
                    <div className="flex justify-center gap-5 p-3">
                      <a href={`mailto:${member.email}`} target="_blank">
                        <BiEnvelope className="text-[1.9rem]" />
                      </a>
                      <a href={member.linkedin} target="_blank">
                        <BiLogoLinkedinSquare className="text-[1.9rem]" />
                      </a>
                      <a href={member.instagram} target="_blank">
                        <BiLogoInstagram className="text-[1.9rem]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {society.faculty && (
            
            <div className="editorcontainer my-5 min-h-[100vh]rounded-lg  py-3">
              <span className="flex font-semibold text-2xl  my-3">
                Faculty
              </span>
              <div className="member-list-container max-h-[90vh] flex flex-col gap-3  rounded-md my-3 overflow-y-scroll no-scrollbar">
                {society.faculty.map((faculty) => (
                  <div className="flex p-5 justify-between border rounded-md w-full  bg-background" key={uuidv4()}>
                    <div className="flex flex-col items-start ">
                      <p className="text-lg font-semibold">{faculty.name}</p>
                      <p className="text-muted-foreground font-semibold">
                        {faculty.position}
                      </p>
                    </div>
                    <div className="flex justify-center gap-5 p-3">
                      <a href={`mailto:${faculty.email}`} target="_blank">
                        <BiEnvelope className="text-[1.9rem]" />
                      </a>
                      <a href={faculty.linkedin} target="_blank">
                        <BiLogoLinkedinSquare className="text-[1.9rem]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocietyDetail;
