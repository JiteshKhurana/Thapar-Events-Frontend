import { DataTable } from "./components/data-table";
import { Registrations, columns } from "./components/columns";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ManageEventRegistrations = () => {
  const { eventId } = useParams();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [eventRegistrations, setEventRegistrations] = useState<
    Registrations[] | null
  >([]);
  const eventMetrics = useSelector(
    (store: RootState) => store.eventDashboard.currentEventMetrics
  );
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
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-semibold text-2xl">Registrations</h1>

      <h2 className="ml-5 text-xl">
        Total Registrations: {eventMetrics?.totalregistrations}
      </h2>
      <div className="px-7">
        {!eventRegistrations ? (
          <h1 className="text-center text-3xl">No Registrations</h1>
        ) : eventRegistrations?.length === 0 ? (
          <h1 className="text-center text-3xl">Loading...</h1>
        ) : (
          <DataTable columns={columns} data={eventRegistrations} />
        )}
      </div>
    </div>
  );
};

export default ManageEventRegistrations;
