import { BiEdit, BiSolidDashboard } from "react-icons/bi"
import { MdEditNote, MdGroup } from "react-icons/md"
import { NavLink, Outlet } from "react-router-dom"

const EventDashboardRoot = () => {
  return (
    <div className="flex w-full min-h-[100vh] border-t-[1px]">
        <div className="nav flex flex-col justify-start items-center w-[20%]  border-r-[1px]">
            <ul className="mt-[40px] text-xl navlist gap-6 flex flex-col">
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink flex items-center gap-1"><BiSolidDashboard className="text-2xl"/>DashBoard</li>
                </NavLink>
                <NavLink to={'registrations'}>
                    <li className="navlink flex items-center gap-1"><MdGroup className="text-2xl"/>Manage Registrations</li>
                </NavLink>
                {/* <NavLink to={'marketingmails'}>
                    <li className="navlink flex items-center gap-1"><BiEnvelope className="text-2xl"/> Marketing Mails</li>
                </NavLink>
                <NavLink to={'reviews'}>
                    <li className="navlink flex items-center gap-1"><MdReviews className="text-2xl"/>Reviews and Ratings</li>
                </NavLink> */}
                <NavLink to={'editevent'}>
                    <li className="navlink flex items-center gap-1"><BiEdit className="text-2xl"/>Edit Event</li>
                </NavLink>
                <NavLink to={'editregistrationform'}>
                    <li className="navlink flex items-center gap-1"><MdEditNote className="text-2xl"/>Registration Form</li>
                </NavLink>
            </ul>
        </div>
        <Outlet/>

    </div>
  )
}

export default EventDashboardRoot