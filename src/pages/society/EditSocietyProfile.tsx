import { Button } from "@/components/ui/button";
// import { BiEnvelope, BiLogoLinkedinSquare, BiPlus } from "react-icons/bi";
// import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { editSocietyFormFields, editSocietySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import Cookies from "universal-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { editSociety } from "@/store/societyProfileSlice";

// interface Member {
//   id: number;
//   name: string;
//   position: string;
//   email: string;
//   linkedin: string;
// }

const EditSocietyProfile = () => {
  // State to hold the list of objects
  // const [socMembers, setMembers] = useState<Member[]>([]);

  // Function to add an object to the list
  // const addMember = () => {
  //   const newMember: Member = {
  //     id: socMembers.length,
  //     name: "",
  //     position: "",
  //     email: "",
  //     linkedin: "",
  //   };
  //   setMembers([...socMembers, newMember]);
  // };

  // // Function to edit an object in the list
  // const editMember = (
  //   id: number,
  //   newName: string,
  //   newPosition: string,
  //   newEmail: string,
  //   newLinkedin: string
  // ) => {
  //   const updatedMembers = socMembers.map((member) => {
  //     if (member.id === id) {
  //       return {
  //         ...member,
  //         name: newName,
  //         position: newPosition,
  //         email: newEmail,
  //         linkedin: newLinkedin,
  //       };
  //     }
  //     return member;
  //   });

  //   setMembers(updatedMembers);
  // };

  // const deleteMember = (id: number) => {
  //   const updatedMembers = socMembers.filter((Member) => Member.id !== id);
  //   // Update IDs of remaining socMembers to match their new indices
  //   const updatedMembersWithNewIds = updatedMembers.map((Member, index) => ({
  //     ...Member,
  //     id: index,
  //   }));
  //   setMembers(updatedMembersWithNewIds);
  // };

  // // Function to reorder socMembers in the list
  // const reorderMembers = (oldIndex: number, newIndex: number) => {
  //   const updatedMembers = [...socMembers];
  //   const movedMember = updatedMembers.splice(oldIndex, 1)[0];
  //   updatedMembers.splice(newIndex, 0, movedMember);
  //   setMembers(updatedMembers);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const society = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<editSocietyFormFields>({
    defaultValues: {
      name: society?.name,
      about: society?.about,
    },
    resolver: zodResolver(editSocietySchema),
  });

  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }

  const onSubmit: SubmitHandler<editSocietyFormFields> = async (
    data: editSocietyFormFields
  ) => {
    await axios
      .post(API_ENDPOINT + "soc/update/" + society?.email, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSuccess(true);
        dispatch(editSociety(res.data));
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="heading flex items-center gap-4 py-2">
        <span className="text-3xl font-semibold">Edit your public profile</span>
      </div>

      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <label>About</label>
        <textarea
          {...register("about")}
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Write about your society"
        ></textarea>
        {errors.about && (
          <div className="text-red-500">{errors.about.message}</div>
        )}

        {/* <div className="rounded-lg px-5 py-3">
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
      </div> */}

        <div className="savechanges w-full flex justify-between items-center px-10 py-5">
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
                  This action cannot be undone. Any changes done will be
                  discarded.
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
            disabled={isSubmitting}
            type="submit"
            className="rounded-sm p-6"
          >
            {isSubmitting ? "Loading..." : "Save Changes"}
          </Button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditSocietyProfile;
