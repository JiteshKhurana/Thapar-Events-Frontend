import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SocietyEventCard from "./components/SocietyEventCard"
import { BiPlus } from "react-icons/bi";


const SocietyEvents = () => {
  return (
    <div>
        <div className="w-full min-h-full  flex flex-col ">
            <div className="welcome flex justify-start items-center  pt-5 px-[30px]">
                <div className="your-events">
                    <span className="text-2xl font-semibold">Your Events</span>
                </div>
                <Button className="bg-[#265073] p-5 ml-8"><BiPlus className="text-xl"/>Create New Event</Button>

            </div>

            <div className="eventList px-[30px] mt-[40px]">
                <div className="searchbar flex justify-start items-center">
                <Input className="w-[400px] rounded-full" placeholder="Search Events"/> 
                <Button className="bg-[#265073] px-6 mx-2 rounded-full">Search</Button>
                </div>
                <div className="event-list flex flex-col py-3">
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                    <SocietyEventCard/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SocietyEvents