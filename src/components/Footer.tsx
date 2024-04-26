import Logo from "../assets/tietlogo.png";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-10 ">
      <div className="flex flex-col items-center justify-center">
        <img src={Logo} className="w-12 mb-3" />
        <span className="college-heading text-sm sm:text-xl font-semibold pb-3 flex justify-center items-center px-3">
          Thapar Institute of Engineering and Technology
        </span>
      </div>
    </div>
  );
};

export default Footer;
