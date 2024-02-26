import { Button } from "@/components/ui/button"


const SocietyDashboard = () => {
    return (
        <div className="w-full min-h-full  flex flex-col ">
            <div className="welcome flex justify-between items-center  pt-5 px-[30px]">
                <div className="society-greeting">
                    <span className="font-light text-xl text-gray-600">Welcome Back,</span> <br /> <span className="text-3xl font-semibold">Creative Computing Society</span>
                </div>
                <Button className="bg-[#265073] p-6 mr-8"><box-icon name='plus' color="#ffffff" className='text-white'></box-icon>Create New Event</Button>

            </div>
            <div className="stats px-[30px] mt-7 text-[20px] font-semibold flex-col">
                <span className="text-xl">Your Stats</span>
                <div className="flex w-full mt-4">
                    <div className="statsBox mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">Total Events</span>
                        <span className="font-semibold text-3xl">3</span>
                    </div>
                    <div className="statsBox mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">Total Participation</span>
                        <span className="font-semibold text-3xl">672</span>
                    </div>
                    <div className="statsBox mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">Upcoming Events</span>
                        <span className="font-semibold text-3xl">3</span>
                    </div>
                    <div className="statsBox mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">Team Members</span>
                        <span className="font-semibold text-3xl">3</span>
                    </div>
                    <div className="statsBox mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">Total Events</span>
                        <span className="font-semibold text-3xl">3</span>
                    </div>
                </div>
            </div>
            <div className="active px-[30px] mt-[30px]">
                <span className="active text-xl font-semibold">Active and Upcoming Events</span>
                <div className="active-event-list flex flex-col py-3">
                    <div className="active-event-card my-2 flex p-5 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
                        <div className="left-data flex">
                            <div className="active-event-img w-[100px] h-[100px] rounded-md " style={{
                                backgroundImage: 'url(\'https://www.ccstiet.com/media/events/Code_Strike/images/codestrike_no7fba.jpg\')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}></div>
                            <div className="info flex flex-col justify-between mx-4">
                                <div className="event-name font-semibold text-2xl">CodeStrike</div>
                                <div className="det flex flex-col text-gray-800">
                                    <span className="">Coding Competition</span>
                                    <span className="flex items-center"><box-icon name='calendar-event'></box-icon> 12-02-2024 : 14-02-2024</span>
                                </div>

                            </div>

                        </div>
                        <div className="right-data flex flex-col min-h-full items-center justify-around">
                            <Button className="bg-[#265073] ">Event Dashboard</Button>
                            <div className="flex"><span>Status: </span><span>Active</span></div>
                        </div>
                    </div>
                    <div className="active-event-card my-2 flex p-5 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
                        <div className="left-data flex">
                            <div className="active-event-img w-[100px] h-[100px] rounded-md " style={{
                                backgroundImage: 'url(\'https://www.ccstiet.com/media/events/Code_Strike/images/codestrike_no7fba.jpg\')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}></div>
                            <div className="info flex flex-col justify-between mx-4">
                                <div className="event-name font-semibold text-2xl">CodeStrike</div>
                                <div className="det flex flex-col text-gray-800">
                                    <span className="">Coding Competition</span>
                                    <span className="flex items-center"><box-icon name='calendar-event'></box-icon> 12-02-2024 : 14-02-2024</span>
                                </div>

                            </div>

                        </div>
                        <div className="right-data flex flex-col min-h-full items-center justify-around">
                            <Button className="bg-[#265073] ">Event Dashboard</Button>
                            <div className="flex"><span>Status: </span><span>Active</span></div>
                        </div>
                    </div>
                    <div className="active-event-card my-2 flex p-5 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
                        <div className="left-data flex">
                            <div className="active-event-img w-[100px] h-[100px] rounded-md " style={{
                                backgroundImage: 'url(\'https://www.ccstiet.com/media/events/Code_Strike/images/codestrike_no7fba.jpg\')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}></div>
                            <div className="info flex flex-col justify-between mx-4">
                                <div className="event-name font-semibold text-2xl">CodeStrike</div>
                                <div className="det flex flex-col text-gray-800">
                                    <span className="">Coding Competition</span>
                                    <span className="flex items-center"><box-icon name='calendar-event'></box-icon> 12-02-2024 : 14-02-2024</span>
                                </div>

                            </div>

                        </div>
                        <div className="right-data flex flex-col min-h-full items-center justify-around">
                            <Button className="bg-[#265073] ">Event Dashboard</Button>
                            <div className="flex"><span>Status: </span><span>Active</span></div>
                        </div>
                    </div>
                    <div className="active-event-card my-2 flex p-5 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
                        <div className="left-data flex">
                            <div className="active-event-img w-[100px] h-[100px] rounded-md " style={{
                                backgroundImage: 'url(\'https://www.ccstiet.com/media/events/Code_Strike/images/codestrike_no7fba.jpg\')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}></div>
                            <div className="info flex flex-col justify-between mx-4">
                                <div className="event-name font-semibold text-2xl">CodeStrike</div>
                                <div className="det flex flex-col text-gray-800">
                                    <span className="">Coding Competition</span>
                                    <span className="flex items-center"><box-icon name='calendar-event'></box-icon> 12-02-2024 : 14-02-2024</span>
                                </div>

                            </div>

                        </div>
                        <div className="right-data flex flex-col min-h-full items-center justify-around">
                            <Button className="bg-[#265073] ">Event Dashboard</Button>
                            <div className="flex"><span>Status: </span><span>Active</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocietyDashboard