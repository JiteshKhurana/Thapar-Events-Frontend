import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, LogOut, PanelLeft, UserPlus2, Users2 } from "lucide-react";
import { BiCalendar } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";


const SuperAdminRoot = () => {
  return (
    <div className="absolute top-0 bg-background flex justify-center w-full">

      <div className="super-admin-container w-full max-w-[1800px]">

        <div className="navbar absolute top-0 bottom-0  left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            {/* <NavLink
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <BiCalendar className="text-xl transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </NavLink> */}
            <TooltipProvider>

              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className="h-12 w-12 bg-black p-3 flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <img src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1713374232/tietlogo_paawdb.png" className=""/ >
                    <span className="sr-only">Home</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip> */}

              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/superadmin/events"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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

              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LineChart className="h-5 w-5" />
                    <span className="sr-only">Analytics</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Analytics</TooltipContent>
              </Tooltip> */}

            </TooltipProvider>

          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="#"
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
        
        <Sheet>
          <SheetTrigger asChild className="flex border m-5">
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <NavLink
                to="/"
                className="mt-8 group flex h-10  shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <img src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1713374232/tietlogo_paawdb.png" className="h-5 w-5"/>
                <span className="">ConnectHub</span>
              </NavLink>

              {/* <NavLink
                to="/superadmin"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </NavLink> */}

              <NavLink
                to="/superadmin/events"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Calendar className="h-5 w-5" />
                Events
              </NavLink>

              <NavLink
                to="/superadmin/societies"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Societies
              </NavLink>

              <NavLink
                to="/superadmin/addsociety"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <UserPlus2 className="h-5 w-5" />
                Add Society
              </NavLink>
              
              {/* <NavLink
                to="/superadmin/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Analytics
              </NavLink> */}

              <NavLink
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>

        <Outlet />
      </div>
    </div>

  );
};

export default SuperAdminRoot;
