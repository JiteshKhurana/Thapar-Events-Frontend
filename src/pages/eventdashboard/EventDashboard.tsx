import { BiCalendarEvent, BiCopy, BiMoney, BiSolidUserBadge } from "react-icons/bi"
import { useState } from "react";
const EventDashboard = () => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
      const linkToCopy = 'https://example.com'; // Replace this with your actual link
      navigator.clipboard.writeText(linkToCopy)
        .then(() => {
          console.log('Link copied to clipboard:', linkToCopy);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
          console.log(copied)
        })
        .catch(err => {
          console.error('Failed to copy link:', err);
          // You can optionally handle the error here
        });
    }

    return (
        <div className="w-full min-h-[100vh] ">
            <div className="event-cover-image bg-[url('https://www.ccstiet.com/static/home/images/01.jpeg')] h-[300px] flex justify-start items-end">
                <div className="event-name text-white p-9 font-semibold text-5xl">Escalade</div>
            </div>
            <div className="stats p-5  text-xl font-semibold flex-col">
                <span className="text-xl">Event Stats</span>
                <div className="flex flex-wrap gap-3 w-full mt-4">
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Views
                        </span>
                        <span className="font-semibold text-3xl">669</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Registrations
                        </span>
                        <span className="font-semibold text-3xl">369</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Teams Registered
                        </span>
                        <span className="font-semibold text-3xl">45</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Status
                        </span>
                        <span className="font-semibold text-3xl text-green-600">Active</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Visibility
                        </span>
                        <span className="font-semibold text-3xl">Public</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl min-w-[200px] min-h-[100px] p-5 justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            User Rating
                        </span>
                        <span className="font-semibold text-3xl text-green-600">4.8</span>
                    </div>
                </div>
            </div>

            <div className="details-and-share w-full p-5 flex flex-col ">
                <span className="heading font-semibold text-xl ">Event Details</span>
                <div className="flex justify-start gap-5 flex-wrap items-start">

                    <div className="basic-info-and-details flex flex-col min-h-[400px] rounded-lg shadow-xl border-2 mt-3">
                        <div className="detail flex items-center gap-2 m-4">
                            <BiMoney className="text-2xl"/>
                            <div className="flex flex-col">
                                <span className="text-sm">Registration Fees</span>
                                <span className="font-semibold text-xl">Free</span>
                            </div>
                        </div>
                        <div className="detail flex items-center gap-2 m-4">
                            <BiCalendarEvent className="text-2xl"/>
                            <div className="flex flex-col">
                                <span className="text-sm">Registration Deadline</span>
                                <span className="font-semibold text-xl">10-1-2024</span>
                            </div>
                        </div>
                        <div className="detail flex items-center gap-2 m-4">
                            <BiSolidUserBadge className="text-2xl"/>
                            <div className="flex flex-col">
                                <span className="text-sm">Eligibility</span>
                                <span className="font-semibold text-xl">Free</span>
                            </div>
                        </div>
                        <div className="detail flex items-center gap-2 m-4">
                            <BiMoney className="text-2xl"/>
                            <div className="flex flex-col">
                                <span className="text-sm">Venue</span>
                                <span className="font-semibold text-xl">PG Activity Space 2</span>
                            </div>
                        </div>
                        <div className="detail flex items-center gap-2 m-4">
                            <BiMoney className="text-transparent"/>
                            <div className="flex flex-col">
                                <span className="text-sm mb-2">Tags</span>
                                <div className="tags-container flex flex-wrap gap-3">
                                    <span className="tag font-bold text-[#265073] text-sm border-[1px] py-3 px-3 rounded-sm">#CodingCompetition</span>
                                    <span className="tag font-bold text-[#265073] text-sm border-[1px] py-3 px-3 rounded-sm">#Coffee</span>
                                    <span className="tag font-bold text-[#265073] text-sm border-[1px] py-3 px-3 rounded-sm">#Hackathon</span>
                                    <span className="tag font-bold text-[#265073] text-sm border-[1px] py-3 px-3 rounded-sm">#WomenInTech</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="share mt-3 flex flex-col items-center min-w-[300px] p-3 min-h-[200px] border-2 rounded-md shadow-xl">
                        <span>Share Your Event</span>
                        
                        <img src={"https://res.cloudinary.com/dhrfyg57t/image/upload/v1709374479/bit.ly_47Ichil_nxfuvo.png"}
                        className="w-[200px] h-[200px] m-5"></img>
                        
                        <div className="copy-link flex items-center gap-3">
                            <span>https://bit.ly/47lchl</span>
                            <span onClick={copyToClipboard} className="bg-gray-300 p-2 rounded-sm">
                                <BiCopy  className="text-xl"/>

                            </span>
                        </div>
                            {copied && <span className="text-gray-600" >Link copied to clipboard</span>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventDashboard