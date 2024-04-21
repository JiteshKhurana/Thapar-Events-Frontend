import CardShimmer from "@/components/CardShimmer";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import useSocieties from "@/hooks/useSocieties";
import { Society } from "@/store/societySlice";
import { RootState } from "@/store/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useSelector } from "react-redux";

const SuperAdminDashboardSocieties = () => {
  useSocieties();
  const Societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );
  const [filteredSocieties, setFilteredSocieties] = useState<Society[] | null>(
    Societies
  );
  const [searchtext, setSearchtext] = useState<string>("");

  function filterSocieties() {
    const filteredData = Societies?.filter((society: Society) =>
      society.name.toUpperCase().includes(searchtext.toUpperCase())
    );
    setFilteredSocieties(filteredData || null);
  }

  useEffect(() => {
    filterSocieties();
  }, [searchtext, Societies]);
  if (!Societies) return <CardShimmer />;
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div className="">
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Societies</CardTitle>
              <CardDescription>View and Manage all Societies.</CardDescription>
            </CardHeader>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative mr-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchtext}
                onChange={(e) => setSearchtext(e.target.value)}
                type="search"
                placeholder="Search..."
                className="w-full min-w-[400px] rounded-lg bg-background pl-8"
              />
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="hidden">Image</span>
                  </TableHead>
                  <TableHead className="py-5">Society Name</TableHead>
                  <TableHead className="py-5">Email</TableHead>
                  <TableHead className="py-5">Society DashBoard</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSocieties &&
                  filteredSocieties.map((event) => {
                    return (
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            src={event.image}
                            alt="society pic"
                            className="m-1 aspect-square rounded-sm object-cover"
                            height="64"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.email}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {}}
                            className="flex items-center gap-1"
                          >
                            <BiLinkExternal /> Society Dashboard
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardSocieties;
