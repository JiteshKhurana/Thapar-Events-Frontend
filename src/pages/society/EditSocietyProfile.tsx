import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SocietyMemberCard from "./components/SocietyMemberCard";
import { BiImageAdd, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
// import SocietyMemberCard from "./components/SocietyMemberCard";
import { BiEnvelope, BiLogoLinkedinSquare, BiPlus } from "react-icons/bi";
import { NavLink } from "react-router-dom";
// import Gallery from "@/assets/gallery.png";
import { useState } from "react";

interface Member {
  id: number;
  name: string;
  position: string;
  email: string;
  linkedin: string;
}

const EditSocietyProfile = () => {
  const navigate = useNavigate();

  // State to hold the list of objects
  const [socMembers, setMembers] = useState<Member[]>([]);

  // Function to add an object to the list
  const addMember = () => {
    const newMember: Member = {
      id: socMembers.length,
      name: "",
      position: "",
      email: "",
      linkedin: "",
    };
    setMembers([...socMembers, newMember]);
  };

  // Function to edit an object in the list
  const editMember = (
    id: number,
    newName: string,
    newPosition: string,
    newEmail: string,
    newLinkedin: string
  ) => {
    const updatedMembers = socMembers.map((member) => {
      if (member.id === id) {
        return {
          ...member,
          name: newName,
          position: newPosition,
          email: newEmail,
          linkedin: newLinkedin,
        };
      }
      return member;
    });

    setMembers(updatedMembers);
  };

  const deleteMember = (id: number) => {
    const updatedMembers = socMembers.filter((Member) => Member.id !== id);
    // Update IDs of remaining socMembers to match their new indices
    const updatedMembersWithNewIds = updatedMembers.map((Member, index) => ({
      ...Member,
      id: index,
    }));
    setMembers(updatedMembersWithNewIds);
  };

  // Function to reorder socMembers in the list
  const reorderMembers = (oldIndex: number, newIndex: number) => {
    const updatedMembers = [...socMembers];
    const movedMember = updatedMembers.splice(oldIndex, 1)[0];
    updatedMembers.splice(newIndex, 0, movedMember);
    setMembers(updatedMembers);
  };

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
                "url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="societyimg w-[150px] h-[150px] bg-black rounded-full border-2flex justify-center items-center"
          ></div>
          <span className="society-name-heading font-semibold text-5xl text-white">
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
        {/* <div className="flex items-center justify-between">
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
        </Button>*/}

        <span className="flex font-semibold text-xl my-3 ">Members</span>
        <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
          {socMembers.map((member, index) => (
            <div className="society-event-card flex flex-wrap p-3 pr-6 w-full border-[1px] border-gray-400 rounded-xl justify-between">
              <div className="left-data flex">
                <img
                  className="active-event-img w-[100px] h-[100px] rounded-md "
                  src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712689058/profilephoto_txeeke.jpg"
                ></img>
                <div className="info flex flex-col justify-between mx-4">
                  <input
                    className="dark:bg-black border p-2 rounded-md max-w-[400px] w-full"
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      editMember(
                        member.id,
                        e.target.value,
                        member.position,
                        member.email,
                        member.linkedin
                      )
                    }
                    placeholder="Member Name"
                  />
                  <div className="detail flex flex-col my-1 ">
                    <input
                      className="dark:bg-black border p-2 rounded-md max-w-[400px] w-full"
                      type="text"
                      value={member.position}
                      onChange={(e) =>
                        editMember(
                          member.id,
                          member.name,
                          e.target.value,
                          member.email,
                          member.linkedin
                        )
                      }
                      placeholder="Member Position"
                    />
                    <div className="member-profiles flex items-center gap-6 m-1">
                      <span className="email flex items-center">
                        <BiEnvelope className="text-xl m-1" />
                        <input
                          className="dark:bg-black border p-2 rounded-md max-w-[400px] w-full"
                          type="text"
                          value={member.email}
                          onChange={(e) =>
                            editMember(
                              member.id,
                              member.name,
                              member.position,
                              e.target.value,
                              member.linkedin
                            )
                          }
                          placeholder="Email"
                        />
                      </span>
                      <span className="linkedIn flex items-center">
                        <BiLogoLinkedinSquare className="text-xl m-1" />
                        <input
                          className="dark:bg-black border p-2 rounded-md max-w-[400px] w-full"
                          type="text"
                          value={member.linkedin}
                          onChange={(e) =>
                            editMember(
                              member.id,
                              member.name,
                              member.position,
                              member.email,
                              e.target.value
                            )
                          }
                          placeholder="LinkedIn Profile"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-data flex flex-wrap min-h-full items-center justify-around gap-1">
                <Button onClick={() => deleteMember(member.id)}>Delete</Button>
                {index > 0 && (
                  <Button onClick={() => reorderMembers(index, index - 1)}>
                    Move Up
                  </Button>
                )}
                {index < socMembers.length - 1 && (
                  <Button onClick={() => reorderMembers(index, index + 1)}>
                    Move Down
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="p-5 flex items-center gap-1" onClick={addMember}>
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
                changes that you may have done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => navigate("/society")}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          onClick={() => {
            toast("Changes Saved Successfully");
            navigate("/society");
          }}
          className="rounded-sm p-6 "
        >
          Save Changes
        </Button>
        <NavLink to={"/society/"}>
          <Button className="rounded-sm p-6 border-2 ">Cancel</Button>
        </NavLink>

        <Button
          className="rounded-sm p-6"
          onClick={() => {
            console.log(socMembers);
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditSocietyProfile;
