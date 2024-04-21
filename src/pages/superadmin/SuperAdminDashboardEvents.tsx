import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { BiLinkExternal } from "react-icons/bi";

const Events = [
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    visibility: "Public",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    visibility: "Public",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    visibility: "Public",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    visibility: "Not Visible",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    visibility: "Not Visible",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    status: "Upcoming",
    visibility: "Public",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
  {
    img: "https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg",
    name: "Kuch Bhi",
    status: "Past",
    visibility: "Public",
    date: "12:4:2024",
    registrations: "69",
    created_at: "10-3-2024",
  },
];

const SuperAdminDashboardEvents = () => {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="">
              <CardHeader className="m-0 px-0">
                <CardTitle className="text-xl">Events</CardTitle>
                <CardDescription>View and Manage all Events.</CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-3">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="draft">Upcoming</TabsTrigger>
                  <TabsTrigger value="archived" className="hidden sm:flex">
                    Past
                  </TabsTrigger>
                </TabsList>
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full min-w-[300px] rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="hidden">Image</span>
                        </TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Registrations
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Events.map((event) => {
                        return (
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                src={event.img}
                                alt="Event image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {event.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{event.status}</Badge>
                            </TableCell>
                            <TableCell>{event.visibility}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {event.registrations}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {event.created_at}
                            </TableCell>
                            <TableCell>
                              <div className="event-dashboard_link flex items-center gap-1">
                                <BiLinkExternal /> Event Dashboard
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardEvents;
