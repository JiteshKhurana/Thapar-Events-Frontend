// import { Separator } from "@radix-ui/react-dropdown-menu";
import Logo from "../assets/tietlogo.png";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-10 text-white">
      <div className="conatainer flex flex-col items-center justify-center">
        <img src={Logo} className="w-12 mb-3" />
        <span className="college-heading text-sm sm:text-xl font-semibold pb-3 border-b-2 flex justify-center items-center px-3">
          Thapar Institute of Engineering and Technology
        </span>
        <span className="AJAK ">Made with ❤️</span>
      </div>
    </div>
  );
};

export default Footer;
