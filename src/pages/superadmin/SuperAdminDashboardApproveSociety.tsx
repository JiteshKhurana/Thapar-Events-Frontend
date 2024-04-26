import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINT } from "@/lib/constants";
import { Society } from "@/store/societySlice";
import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

import Cookies from "universal-cookie";

const SuperAdminDashboardApproveSociety = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [notVisibleSocieties, setNotVisibleSocieties] = useState<
    Society[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [color] = useState("#FF0000");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  async function getNotVisibleSociety() {
    await axios
      .get(API_ENDPOINT + "soc/get/notvisible", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotVisibleSocieties(res.data));
  }

  async function ApproveRequest(societyEmail: string) {
    setIsLoading(true);
    await axios
      .post(
        API_ENDPOINT + "soc/update/" + societyEmail,
        {
          visibility: "true",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setIsLoading(false);
        window.location.reload();
      });
  }
  useEffect(() => {
    getNotVisibleSociety();
  }, []);

  if (isLoading)
    return (
      <SyncLoader
        className="text-center justify-center"
        color={color}
        cssOverride={override}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  if (!notVisibleSocieties)
    return (
      <div className="flex min-h-screen w-full flex-col ">
        <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
            No Approval Requests
          </main>
        </div>
      </div>
    );
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div>
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Approve Society's About</CardTitle>
            </CardHeader>
          </div>
          {notVisibleSocieties.map((society) => {
            return (
              <div
                key={society._Sid}
                className="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-black border"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{society.name}</h3>
                    <p className="text-sm ">{society.email}</p>
                    <p className="my-3">{society.about}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      className="btn btn-primary"
                      onClick={() => ApproveRequest(society.email)}
                    >
                      Approve
                    </Button>
                    <Button className="btn btn-danger">Reject</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardApproveSociety;
