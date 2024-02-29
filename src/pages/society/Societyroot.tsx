import SocietyNav from "./components/SocietyNav"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { MdDashboard, MdEdit } from "react-icons/md";
import { BiLogOut, BiCalendar } from "react-icons/bi";

import 'boxicons';

import { NavLink, Outlet } from "react-router-dom"

const Societyroot = () => {
    return (
        <div>
            <SocietyNav />
            <ResizablePanelGroup direction="horizontal" className="">
                <ResizablePanel defaultSize={18} className="h-[100vh]">
                    <div className="h-full w-full flex flex-col flex-wrap justify-start items-center" >
                        {/* Nav Menu */}
                        <div className="society-photo bg-black rounded-full w-[200px] mt-[10%]">
                            <img src="https://avatars.githubusercontent.com/u/34922904?s=280&v=4"></img>
                        </div>
                        <div className="w-[full] mt-4 font-semibold text-xl">
                            Creative Computing Society
                        </div>
                        <div className="nav-list  flex w-full justify-center mt-9">
                            <ul className="flex justify-center flex-col gap-5">
                                <NavLink to={'dashboard'}>
                                    <li className="flex items-center gap-2">

                                    <MdDashboard className="text-2xl" />
                                        Dashboard
                                    </li>
                                </NavLink>
                                <NavLink to={'societyevents'}>
                                    <li className="flex items-center gap-2">
                                    <BiCalendar className="text-2xl" />
                                        Events
                                    </li>
                                </NavLink>
                                <NavLink to={'/editsocietyprofile'}>
                                    <li className="flex items-center gap-2">
                                    <MdEdit className="text-2xl" />
                                        Edit Profile
                                    </li>
                                </NavLink>
                                <NavLink to={'/'}>
                                    <li className="flex items-center gap-2">
                                    <BiLogOut className="text-2xl" />
                                        Logout
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel><Outlet /></ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default Societyroot