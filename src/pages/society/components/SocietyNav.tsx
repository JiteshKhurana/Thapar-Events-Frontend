import tietlogo from "../../../assets/tietlogo.png"


const SocietyNav = () => {
    return (
        <div>
            <nav className="w-full h-[90px] border-b-2 dark:bg-neutral-900 flex justify-around items-center px-[7px]">
                <div className="logo flex items-center">
                    <img src={tietlogo} className="w-[45px]"></img>
                    <h1 className="text-4xl ml-[5px] font-semibold">ConnectHub</h1>
                </div>
                <div className="heading"> <span className="text-xl font-semibold">Creative Computing Society</span> <span>| Society DashBoard</span> </div>
                <div className="society-photo bg-black rounded-full w-[50px] h-[50px]"><img src="https://avatars.githubusercontent.com/u/34922904?s=280&v=4" className="w-[50px] h-[50px] mr-[10px]"></img></div>
            </nav>

        </div>
    )
}

export default SocietyNav