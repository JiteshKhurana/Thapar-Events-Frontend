
const EventDashboard = () => {
  return (
    <div className="w-full min-h-[100vh] ">
        <div className="event-cover-image bg-[url('https://www.ccstiet.com/static/home/images/01.jpeg')] h-[300px] flex justify-start items-end">
            <div className="event-name text-white p-9 font-semibold text-5xl">Escalade</div>
        </div>
        <div className="stats px-[30px] mt-7 text-[20px] font-semibold flex-col">
                <span className="text-xl">Event Stats</span>
                <div className="flex flex-wrap gap-3 w-full mt-4">
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Views
                        </span>
                        <span className="font-semibold text-3xl">669</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Registrations
                        </span>
                        <span className="font-semibold text-3xl">369</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Teams Registered
                        </span>
                        <span className="font-semibold text-3xl">45</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Status
                        </span>
                        <span className="font-semibold text-3xl text-green-800">Active</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            Visibility
                        </span>
                        <span className="font-semibold text-3xl">Public</span>
                    </div>
                    <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
                        <span className="font-light text-lg text-gray-600">
                            User Rating
                        </span>
                        <span className="font-semibold text-3xl text-green-800">4.8</span>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default EventDashboard