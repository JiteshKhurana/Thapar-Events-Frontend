import Logo from "../assets/tietlogo.png";
import Facebook from "../assets/facebook.svg";
import Linkedin from "../assets/linkedin.svg";
import X from "../assets/x.svg";
import Insta from "../assets/insta.svg";
import Play from "../assets/play.svg";
import Apple from "../assets/apple.svg";
import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <div className="my-8 pt-8">
      <div className="flex justify-between mx-10">
        <div>
          <img src={Logo} alt="logo" className="h-10" />
          <div className="flex space-x-2 mt-3">
            <img src={Facebook} alt="face" />
            <img src={X} alt="x" />
            <img src={Insta} alt="insta" />
            <img src={Linkedin} alt="link" />
          </div>
        </div>
        <div className="flex text-xs text-[#7C7C7C] space-x-10">
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
        <div className="flex flex-col space-y-6">
          <button className="bg-black rounded-xl flex p-2 space-x-2">
            <img className="my-auto" src={Apple} alt="apple" />
            <div className="text-white">
              <p className="text-sm font-light">Download on the</p>
              <h2 className="font-medium text-start">App Store</h2>
            </div>
          </button>
          <button className="bg-black rounded-xl flex p-2 space-x-2">
            <img className="my-auto" src={Play} alt="play" />
            <div className="text-white">
              <p className="text-sm font-light">Download on the</p>
              <h2 className="font-medium text-start">Play Store</h2>
            </div>
          </button>
        </div>
      </div>
      <Separator className="my-2" />
      <p className="text-xs text-[#7C7C7C] mx-36">
        All trademarks are the property of their respective owners
        <br /> All rights reserved © 2024 Thapar
      </p>
    </div>
  );
};

export default Footer;
