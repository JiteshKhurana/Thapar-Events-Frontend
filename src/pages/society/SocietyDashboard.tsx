import { Button } from "@/components/ui/button"


const SocietyDashboard = () => {
    return (
        <div className="bg-gray-300 w-full h-full flex flex-col">
            <div className="welcome flex justify-between items-center  pt-5 px-[30px]">
                <div className="society-greeting">
                    <span className="font-light text-xl text-gray-600">Welcome Back,</span> <br /> <span className="text-3xl font-semibold">Creative Computing Society</span>
                </div>
                <Button className="bg-[#265073]"><box-icon name='plus' color="#ffffff" className='text-white'></box-icon>Create New Event</Button>

            </div>
            <div className="stats px-[30px] mt-7 text-[20px] font-semibold">
                <span className="">Your Stats</span>
            </div>
        </div>
    )
}

export default SocietyDashboard