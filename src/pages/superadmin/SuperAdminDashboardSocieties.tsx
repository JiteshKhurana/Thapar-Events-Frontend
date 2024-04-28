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
import { useNavigate } from "react-router-dom";
import SocialMediaFollow from "./components/SocialMediaFollow";

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
  const navigate = useNavigate();

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
                  <TableHead className="py-5">Edit Society</TableHead>
                  <TableHead className="py-5">Instagram</TableHead>
                  <TableHead className="py-5">Youtube</TableHead>
                  <TableHead className="py-5">Linkedin</TableHead>
                  <TableHead className="py-5">Official Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSocieties &&
                  filteredSocieties.map((society) => {
                    return (
                      <TableRow key={society._Sid}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            src={society.image}
                            alt="society pic"
                            className="m-1 aspect-square rounded-sm object-cover"
                            height="64"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {society.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {society.email}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              navigate(society._Sid, {
                                state: {
                                  data: society,
                                },
                              });
                            }}
                            className="flex items-center gap-1"
                          >
                            <BiLinkExternal /> Society Dashboard
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              navigate(society._Sid + "/editsociety", {
                                state: {
                                  data: society,
                                },
                              });
                            }}
                            className="flex items-center gap-1"
                          >
                            <BiLinkExternal /> Edit Society
                          </Button>
                        </TableCell>
                        <SocialMediaFollow
                          platform={society.social_media.Instagram}
                          label="Instagram"
                        />
                        <SocialMediaFollow
                          platform={society.social_media.Youtube}
                          label="Youtube"
                        />
                        <SocialMediaFollow
                          platform={society.social_media.Linkedin}
                          label="Linkedin"
                        />
                        <SocialMediaFollow
                          platform={society.social_media.OfficialWebsite}
                          label="OfficialWebsite"
                        />
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
