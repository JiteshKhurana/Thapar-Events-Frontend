import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TIET_LOGO_CDN_URL } from "@/lib/constants";
import { Home, LogOut, UserPlus2, Users2, CheckCheck } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const SuperAdminRoot = () => {
  const cookies = new Cookies(null, { path: "/" });

  return (
    <div className="absolute top-0 bg-background flex justify-center w-full">
      <div className="w-full max-w-[1800px]">
        <div className="navbar absolute top-0 bottom-0  left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <img src={TIET_LOGO_CDN_URL} />
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/approvesociety"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <CheckCheck className="h-5 w-5" />
                    <span className="sr-only">Approve Society</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Approve Society</TooltipContent>
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
