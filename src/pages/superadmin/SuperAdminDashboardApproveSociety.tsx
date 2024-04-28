import CardShimmer from "@/components/CardShimmer";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Society } from "@/store/societySlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const SuperAdminDashboardApproveSociety = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [notVisibleSocieties, setNotVisibleSocieties] = useState<
    Society[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getNotVisibleSociety() {
    await axios
      .get(import.meta.env.VITE_API_ENDPOINT + "soc/get/notvisible", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotVisibleSocieties(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast(error);
        setIsLoading(false);
      });
  }

  async function ApproveRequest(societyEmail: string) {
    setIsLoading(true);
    await axios
      .post(
        import.meta.env.VITE_API_ENDPOINT + "soc/update/" + societyEmail,
        {
          visibility: "true",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        // Filter out the Approved Society
        const updatedSocieties = notVisibleSocieties?.filter(
          (society) => society.email !== societyEmail
        );
        // Update the state with the new array
        setNotVisibleSocieties(updatedSocieties || null);
        toast("Request Approved");
        setIsLoading(false);
      })
      .catch((error) => {
        toast(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getNotVisibleSociety();
  }, []);

  if (isLoading) return <CardShimmer />;

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div>
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Approve Society's About</CardTitle>
            </CardHeader>
          </div>
          {!notVisibleSocieties ? (
            <h1>No Approval Requests</h1>
          ) : (
            notVisibleSocieties.map((society) => {
              return (
                <div
                  key={society._Sid}
                  className="flex flex-col gap-2 p-4 rounded-lg shadow-md border"
                >
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">
                        {" " + society.name}
                      </h3>
                      <h3 className="text-md">{" " + society.email}</h3>
                      <h3 className="text-md font-semibold">
                        Society's About:
                        <span className="font-light">
                          {" " + society.about}
                        </span>
                      </h3>
                    </div>
                    <Button
                      className="my-auto"
                      onClick={() => ApproveRequest(society.email)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardApproveSociety;
