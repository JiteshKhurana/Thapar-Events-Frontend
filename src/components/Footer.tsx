import Logo from "../assets/tietlogo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <div className="my-8 pt-8 mx-16">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <img src={Logo} alt="logo" className="h-10" />
          <div className="flex space-x-2 mt-3">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
        <div className="col-span-8 flex text-xs text-[#7C7C7C] space-x-10">
          <div className="space-y-4">
            <p>About Us</p>
            <p>Sitemap</p>
            <p>Credits</p>
            <p>Help Center</p>
            <p>Community Guidelines</p>
          </div>
          <div className="space-y-4">
            <p>Accessibility</p>
            <p>Mobile</p>
            <p>Marketing</p>
            <p>Advertising</p>
            <p>Report Issue</p>
          </div>
          <div className="space-y-4">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Trust & Safety</p>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <p className="text-xs text-[#7C7C7C] text-center">
        All trademarks are the property of their respective owners
        <br /> All rights reserved © 2024 Invincible
      </p>
    </div>
  );
};

export default Footer;
