import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { Registrations, columns } from "./components/columns";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const ManageEventRegistrations = () => {
  const { eventId } = useParams();
  console.log(eventId);
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [eventRegistrations, setEventRegistrations] = useState<
    Registrations[] | null
  >(null);
  async function getData() {
    await axios
      .get(API_ENDPOINT + "event/get/registrations/" + eventId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEventRegistrations(res.data));
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 m-5">
      <div className="heading flex flex-wrap mt-3 justify-between m-5">
        <h1 className="font-semibold text-2xl">Registrations</h1>
        <Button>Export to csv</Button>
      </div>
      <h2 className="ml-5 text-xl">Total Registrations: 234</h2>
      <div className="px-7">
        {!eventRegistrations ? (
          <h1 className="text-center text-3xl">Loading Registrations</h1>
        ) : (
          <DataTable columns={columns} data={eventRegistrations} />
        )}
      </div>
    </div>
  );
};

export default ManageEventRegistrations;
