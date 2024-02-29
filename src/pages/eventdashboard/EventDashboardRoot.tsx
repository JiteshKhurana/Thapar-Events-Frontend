import { BiSolidDashboard } from "react-icons/bi"
import { NavLink, Outlet } from "react-router-dom"

const EventDashboardRoot = () => {
  return (
    <div className="flex w-full min-h-[100vh] border-t-[1px]">
        <div className="nav flex flex-col justify-star items-center w-[20%]  border-r-[1px]">
            <ul className="navlist">
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink flex items-center "><BiSolidDashboard className="text-xl"/>DashBoard</li>
                </NavLink>
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink">Manage Registrations</li>
                </NavLink>
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink">Marketing Mails</li>
                </NavLink>
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink">Reviews and Ratings</li>
                </NavLink>
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink">Edit Event</li>
                </NavLink>
                <NavLink to={'/eventdashboard'}>
                    <li className="navlink">Registration Form</li>
                </NavLink>
            </ul>
        </div>
        <Outlet/>

    </div>
  )
}

export default EventDashboardRoot