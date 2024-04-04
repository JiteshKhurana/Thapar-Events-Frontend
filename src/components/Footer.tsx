// import { Separator } from "@radix-ui/react-dropdown-menu";
import Logo from "../assets/tietlogo.png";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#265073] w-full flex flex-col items-center py-10 text-white">
      <div className="conatainer flex flex-col items-center">
        <img src={Logo} className="w-12 mb-3"/>
        <span className="college=heading text-xl pb-3 border-b-2">Thapar Institute of Engineering and Technology</span>
        {/* <Separator className=""/> */}
        <a href="https://github.com//kunalarora0930" className="hover:scale-125 transition-all "><span className="AJAK ">Made with ❤️ <span className="font-bold text-2xl">AJAK</span></span></a>
      </div>
    </div>
  );
};

export default Footer;
