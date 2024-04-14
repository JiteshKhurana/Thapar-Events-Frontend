import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Registrations = {
  name: string;
  email: string;
  phoneNo: string;
  rollNo: string;
  branch: "CSE" | "COE" | "ENC" | "MECH" | "CHE" | "BIO";
  batch: "2023" | "2024" | "2025" | "2026" | "2027";
};

export const columns: ColumnDef<Registrations>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNo",
    header: "Phone No",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "batch",
    header: "Batch",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
];
