// import { Separator } from "@radix-ui/react-dropdown-menu";
import Logo from "../assets/tietlogo.png";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-10 ">
      <div className="conatainer flex flex-col items-center justify-center">
        <img src={Logo} className="w-12 mb-3" />
        <span className="college-heading text-sm sm:text-xl font-semibold pb-3 border-b-2 flex justify-center items-center px-3">
          Thapar Institute of Engineering and Technology
        </span>
        <span className="AJAK mt-2">Made with ❤️</span>
        <div className="names-container flex flex-wrap gap-3 font-semibold text-lg ">
        <a href="https://linkedin.com" target="blank" className="AJAK hover:scale-110 hover:border-b-2 hover:border-b-black transition-all duration-300">Akshay</a>
        <a href="https://linkedin.com" target="blank" className="AJAK hover:scale-110 hover:border-b-2 hover:border-b-black transition-all duration-300">Jitesh</a>
        <a href="https://linkedin.com" target="blank" className="AJAK hover:scale-110 hover:border-b-2 hover:border-b-black transition-all duration-300">Ashish</a>
        <a href="https://linkedin.com" target="blank" className="AJAK hover:scale-110 hover:border-b-2 hover:border-b-black transition-all duration-300">Kunal</a>

        </div>
      </div>
    </div>
  );
};

export default Footer;
