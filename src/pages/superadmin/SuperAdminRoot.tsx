import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, LogOut, UserPlus2, Users2 } from "lucide-react";
import { BiCalendar } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const SuperAdminRoot = () => {
  const cookies = new Cookies(null, { path: "/" });

  return (
    <div className="absolute top-0 bg-background flex justify-center w-full">
      <div className="super-admin-container w-full max-w-[1800px]">
        <div className="navbar absolute top-0 bottom-0  left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className="h-12 w-12 bg-black p-3 flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <img
                      src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1713374232/tietlogo_paawdb.png"
                      className=""
                    />
                    <span className="sr-only">Home</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/events"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <BiCalendar className="h-5 w-5" />
                    <span className="sr-only">Events</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Events</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/societies"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Users2 className="h-5 w-5" />
                    <span className="sr-only">Societies</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Societies</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/addsociety"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <UserPlus2 className="h-5 w-5" />
                    <span className="sr-only">Add Society</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Add Society</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    onClick={() => {
                      cookies.remove("token");
                      localStorage.clear();
                      toast("Logout successful", {
                        description: "You have successfully logged out.",
                      });
                    }}
                    to="/"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Log Out</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Log Out</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminRoot;
