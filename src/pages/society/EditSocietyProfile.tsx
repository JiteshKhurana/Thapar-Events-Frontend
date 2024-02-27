import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import SocietyMemberCard from "./components/SocietyMemberCard"

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
                    <span className="flex items-center hover:text-gray-300">Edit Cover Image<box-icon name='edit-alt' color="#ffffff"></box-icon></span>
                </div>
                <div className="societynameandimg flex items-center gap-5 ml-10 mb-5">
                    <div style={{
                        backgroundImage: 'url(\'https://avatars.githubusercontent.com/u/34922904?s=280&v=4\')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }} className="societyimg w-[150px] h-[150px] bg-black rounded-full border-2 border-white flex justify-center items-center"><box-icon name='pencil' color="#ffffff" size="lg"></box-icon>
                    </div>
                    <span className="society-name-heading font-medium text-3xl text-white">Creative Computing Society</span>
                </div>

            

            </div>

            <div className="editorcontainer w-[80%] my-5 min-h-[100vh] bg-white rounded-lg px-5 py-3">
                <span className="text-black font-semibold text-xl">About</span>
                <Textarea className="my-3" placeholder="Write about your society"></Textarea>
                <span className="text-black font-semibold text-xl my-3">Photo Gallery</span>
                <div className="photogallery border-[1px] h-[400px] rounded-md my-3">

                </div>
                <span className="text-black font-semibold text-xl my-3">Members</span>
                <div className="member-list-container flex flex-col gap-3 border-[1px] p-[10px] rounded-md my-3">
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                    <SocietyMemberCard/>
                </div>
                <Button className="bg-[#265073] p-5">Add Member <box-icon name='plus' color="#ffffff"></box-icon></Button>


            </div>


            <div className="savchanges w-full  bg-white border-y-2 flex justify-between items-center px-10 py-5">
                <Button className="bg-white text-black rounded-sm p-6 border-2 hover:bg-gray-300">Cancel</Button>
                <Button className="bg-[#265073] rounded-sm p-6">Save Changes</Button>
            </div>
        </div>
    )
}

export default EditSocietyProfile