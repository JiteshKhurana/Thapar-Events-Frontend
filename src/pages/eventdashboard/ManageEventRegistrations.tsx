/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "./components/data-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";

// Define a base type for Registrations
export type Registrations = {
  name: string;
  email: string;
  phoneno: string;
  rollno: string;
  [key: string]: any; // Allow dynamic fields
};

const ManageEventRegistrations = () => {
  const { eventId } = useParams();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [eventRegistrations, setEventRegistrations] = useState<
    Registrations[] | null
  >([]);
  const [columns, setColumns] = useState<ColumnDef<Registrations>[]>([]);

  const eventMetrics = useSelector(
    (store: RootState) => store.eventDashboard.currentEventMetrics
  );

  async function getData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_ENDPOINT +
          "event/get/registrations/" +
          eventId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      setEventRegistrations(data);

      // Create static columns
      const staticColumns: ColumnDef<Registrations>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => (
            <div className="font-semibold">{row.getValue("name")}</div>
          ),
        },
        {
          accessorKey: "email",
          header: "Email",
          cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
          accessorKey: "phoneno",
          header: "Phone No.",
          cell: ({ row }) => <div>{row.getValue("phoneno")}</div>,
        },
        {
          accessorKey: "rollno",
          header: "Roll No.",
          cell: ({ row }) => <div>{row.getValue("rollno")}</div>,
        },
      ];

      // Generate dynamic columns from parameters array
      const dynamicColumns: ColumnDef<Registrations>[] = [];
      if (data && data.length > 0) {
        const firstEntry = data[0];
        if (firstEntry.parameters && Array.isArray(firstEntry.parameters)) {
          firstEntry.parameters.forEach((param: any) => {
            dynamicColumns.push({
              accessorKey: param.name,
              header: param.name,
              cell: ({ row }) => (
                <div>
                  {row.original.parameters.find(
                    (p: any) => p.name === param.name
                  )?.description || "-"}
                </div>
              ),
            });
          });
        }
      }

      // Combine static and dynamic columns
      setColumns([...staticColumns, ...dynamicColumns]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
