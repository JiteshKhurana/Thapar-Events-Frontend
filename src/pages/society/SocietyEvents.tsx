import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SocietyEvents = () => {
  return (
    <div>
        <div className="w-full min-h-full  flex flex-col ">
            <div className="welcome flex justify-start items-center  pt-5 px-[30px]">
                <div className="your-events">
                    <span className="text-2xl font-semibold">Your Events</span>
                </div>
                <Button className="bg-[#265073] p-5 ml-8"><box-icon name='plus' color="#ffffff" className='text-white'></box-icon>Create New Event</Button>

            </div>

            <div className="active px-[30px] mt-[40px]">
                <div className="searchbar flex justify-start items-center">
                <Input className="w-[400px] rounded-full" placeholder="Search Events"/> 
                <Button className="bg-[#265073] px-6 mx-2 rounded-full">Search</Button>
                </div>
                <div className="active-event-list flex flex-col py-3">
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                    <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
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
                            <div className="flex"><span>Status: </span><span className="text-green-800 font-bold ml-1">Active</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SocietyEvents