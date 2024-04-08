import { Button } from "@/components/ui/button";
import profilephoto from "../../../assets/profilephoto.jpg";
import { BiEnvelope, BiLogoLinkedinSquare } from "react-icons/bi";

const SocietyMemberCard: React.FC = () => {
  return (
    <div className="society-event-card flex p-3 pr-6 w-full border-[1px] border-gray-400 rounded-xl justify-between">
      <div className="left-data flex">
        <img
          className="active-event-img w-[100px] h-[100px] rounded-md "
          src={profilephoto}
        ></img>
        <div className="info flex flex-col justify-between mx-4">
          <div className="event-name font-semibold text-2xl">Lorem Ipsum</div>
          <div className="det flex flex-col ">
            <div className="font-bold">General Secretary</div>
            <div className="member-profiles flex items-center gap-6">
              <span className="email flex items-center">
                <BiEnvelope className="text-xl" />
                lipsum_be21@thapar.edu
              </span>
              <span className="linkedIn flex items-center">
                <BiLogoLinkedinSquare className="text-xl" />
                linkedin.com/lorem-ipsum
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="right-data flex flex-col min-h-full items-center justify-around">
        <Button className="w-[200px]">Remove Member</Button>
        <Button className="w-[200px]">Edit Member Details</Button>
      </div>
    </div>
  );
};

export default SocietyMemberCard;
