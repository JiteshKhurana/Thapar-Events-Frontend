import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { addEventReportFields, addEventReportSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AddEventReport = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const event = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<addEventReportFields>({
    defaultValues: {
      report: undefined,
    },
    resolver: zodResolver(addEventReportSchema),
  });

  const [success, setSuccess] = useState(false);
  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }
  if (!event) return <div>Loading...</div>;
  const onSubmit: SubmitHandler<addEventReportFields> = async (data) => {
    const formData = new FormData();
    if (data.report) {
      formData.append("report", data.report[0]);
    }

    await axios
      .post(
        import.meta.env.VITE_API_ENDPOINT +
          "event/poster/upload/" +
          event?._Eid,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setSuccess(true);
        reset();
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-semibold text-2xl mt-3 flex flex-wrap m-5">
        Add/Update Event Report
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          {...register("report")}
          type="file"
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,application/pdf"
        />
        {errors.report && (
          <div className="text-red-500">{String(errors.report.message)}</div>
        )}
        <Button className="w-full" disabled={isSubmitting} type="submit">
          Submit
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default AddEventReport;
