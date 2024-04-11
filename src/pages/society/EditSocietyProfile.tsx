import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SocietyMemberCard from "./components/SocietyMemberCard";
import { BiImageAdd, BiPlus } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Gallery from "@/assets/gallery.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EditSocietyProfile = () => {
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="heading flex items-center gap-4 py-2">
        <span className="text-3xl font-semibold">Edit your public profile</span>
      </div>
      <div
        style={{
          backgroundImage:
            "url('https://www.ccstiet.com/static/home/images/01.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="coverimg w-full h-[350px] flex flex-col justify-between"
      >
        <div className="editcoverimg flex justify-end w-full text-white p-3 pr-10 ">
          {/* <span className="flex items-center hover:text-gray-300 gap-1">
            Edit Cover Image
            <BiEdit className="text-2xl" />
          </span> */}
        </div>
        <div className="societynameandimg flex items-center gap-5 ml-10 mb-5">
          <div
            style={{
              backgroundImage:
                "url('https://avatars.githubusercontent.com/u/34922904?s=280&v=4')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="societyimg w-[150px] h-[150px] bg-black rounded-full border-2flex justify-center items-center"
          ></div>
          <span className="society-name-heading font-semibold text-5xl">
            Creative Computing Society
          </span>
        </div>
      </div>

      <div className="editorcontainer my-5 min-h-[100vh]rounded-lg px-5 py-3">
        <span className="font-semibold text-xl">About</span>
        <Textarea
          className="my-3 h-[300px] text-lg"
          placeholder="Write about your society"
        ></Textarea>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium my-8">Photo Gallery</h2>
          <Button>See All</Button>
        </div>
        <div className="flex overflow-x-scroll no-scrollbar space-x-5">
          {Array(12)
            .fill(0)
            .map(() => (
              <img src={Gallery} className="h-1/3 w-1/3 rounded-xl" />
            ))}
        </div>
        <Button className="p-5 flex items-center gap-1 my-5">
          Add Image
          <BiImageAdd className="text-xl" />
        </Button>

        <span className="flexfont-semibold text-xl my-3">Members</span>
        <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
          <SocietyMemberCard />
          <SocietyMemberCard />
          <SocietyMemberCard />
          <SocietyMemberCard />
          <SocietyMemberCard />
        </div>
        <Button className="p-5 flex items-center gap-1">
          Add Member <BiPlus className="text-xl" />{" "}
        </Button>
      </div>

      <div className="savechanges w-full border-y-2 flex justify-between items-center px-10 py-5">
        {/* <NavLink to={"/society/dashboard"}>
          
        </NavLink> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-sm p-6 border-2 hover:bg-gray-300">
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <NavLink to={"/society/dashboard"}>
          <Button className="rounded-sm p-6">Save Changes</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default EditSocietyProfile;
