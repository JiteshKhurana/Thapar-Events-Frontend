import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import SocietyMemberCard from "./components/SocietyMemberCard"
import { BiEdit, BiImageAdd, BiPencil, BiPlus } from "react-icons/bi"
import { NavLink } from "react-router-dom"

const EditSocietyProfile = () => {
    return (
        <div className="bg-[#f1f1f1] flex flex-col items-center">
            <div className="heading flex items-center gap-4 py-4">
                <span className="text-2xl font-semibold ml-10">Edit your public profile</span><Button className="bg-[#265073]">Preview</Button>
            </div>
            <div style={{
                backgroundImage: 'url(\'https://www.ccstiet.com/static/home/images/01.jpeg\')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }} className="coverimg w-full h-[350px] flex flex-col justify-between">
                <div className="editcoverimg flex justify-end w-full text-white p-3 pr-10 ">
                    <span className="flex items-center hover:text-gray-300 gap-1">Edit Cover Image<BiEdit className="text-2xl"/></span>
                </div>
                <div className="societynameandimg flex items-center gap-5 ml-10 mb-5">
                    <div style={{
                        backgroundImage: 'url(\'https://avatars.githubusercontent.com/u/34922904?s=280&v=4\')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }} className="societyimg w-[150px] h-[150px] bg-black rounded-full border-2 border-white flex justify-center items-center"><BiPencil className="text-5xl text-white"/>
                    </div>
                    <span className="society-name-heading font-semibold text-5xl text-white">Creative Computing Society</span>
                </div>

            

            </div>

            <div className="editorcontainer w-[80%] my-5 min-h-[100vh] bg-white rounded-lg px-5 py-3">
                <span className="text-black font-semibold text-xl">About</span>
                <Textarea className="my-3 h-[300px] text-lg" placeholder="Write about your society"></Textarea>
                <span className="text-black font-semibold text-xl my-3">Photo Gallery</span>


                <div className="photogallery border-[1px] rounded-md my-3 p-3">
                    <div className="gallery grid lg:grid-cols-4 gap-3 md:grid-cols-2">
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="image"><img src={"https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg"} className="max-h-[400px] max-w-[400px] rounded-lg"></img></div>
                        <div className="overflow-hidden rounded-xl add-image w-[300px] h-[400px] border-2  bg-[url('https://res.cloudinary.com/dy1pmolax/image/upload/v1688824564/gallery_page/2022/7_Large_yhwf6u.jpg')] bg-contain">
                            <div className="h-full text-white w-full backdrop-brightness-50 rounded-xl flex  flex-col justify-center items-center">
                                <span className="flex items-center">
                                <BiPlus className="text-white "/>15   
                                </span>
                                <span>Images</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="bg-[#265073] p-5 hover:bg-slate-900 flex items-center gap-1">Add Image<BiImageAdd className="text-xl"/> </Button>


                <span className="flex text-black font-semibold text-xl my-3">Members</span>
                <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                </div>
                <Button className="bg-[#265073] p-5 hover:bg-slate-900 flex items-center gap-1">Add Member <BiPlus className="text-xl"/> </Button>


            </div>


            <div className="savechanges w-full  bg-white border-y-2 flex justify-between items-center px-10 py-5">
                <NavLink to={'/society/dashboard'}>
                <Button className="bg-white text-black rounded-sm p-6 border-2 hover:bg-gray-300">Cancel</Button>
                </NavLink>

                <NavLink to={'/society/dashboard'}>
                <Button className="bg-[#265073] rounded-sm p-6">Save Changes</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default EditSocietyProfile