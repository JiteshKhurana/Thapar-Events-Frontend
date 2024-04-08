import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const EditEvent = () => {
  const defaultDescription = "<b>Give a detailed description of your event</b>";

  const [formData, setFormData] = useState({
    eventName: "",
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10),
    tags: "",
    teamCompetition: true,
    minTeamSize: 1,
    maxTeamSize: 1,
    description: defaultDescription,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleDescriptionChange = (value: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     description: value,
  //   }));
  // };

  const handleSwitch = (value: boolean) => {
    setFormData({
      ...formData,
      teamCompetition: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can perform form submission handling here, such as sending data to a server
    console.log(formData);
    // Reset form fields
    // setFormData({
    //     eventName: '',
    //     fromDate: new Date().toISOString().slice(0, 10),
    //     toDate: new Date().toISOString().slice(0, 10),
    //     tags: '',
    //     teamCompetition: false,
    //     minTeamSize: 1,
    //     maxTeamSize: 1,
    //     description: '',
    // });
  };

  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="">
          <span className="font-semibold">Event Name:</span>
          <Input
            placeholder="Enter a title for your Event"
            className="border w-[400px]"
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <span className="font-semibold flex mb-2">Event Dates:</span>
          <div className="ml-3">
            <span className="font-semibold">Start Date:</span>
            <Input
              className="border w-[400px]"
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />

            <span className="font-semibold">End Date:</span>
            <Input
              className="border w-[400px]"
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="">
          <span className="font-semibold">Tags:</span>
          <Input
            className="border"
            placeholder="Enter a list of tags separated by comma( , ) Ex: #Coding, #WomenInTech, #Environment"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold flex items-center">
            Team Competition:
            {/* <Checkbox className="" name="teamCompetition" checked={formData.teamCompetition} onClick={handleChange} /> */}
            {/* <input className="ml-2" type="checkbox" name="teamCompetition" checked={formData.teamCompetition} onChange={handleChange} /> */}
            <Switch
              className="ml-3"
              name="teamCompetition"
              checked={formData.teamCompetition}
              onClick={() => {
                handleSwitch(!formData.teamCompetition);
              }}
            />
          </span>
          {formData.teamCompetition && (
            <div className="ml-3">
              <div className="">
                Min Team Size:
                <Input
                  className="border w-[400px]"
                  type="number"
                  name="minTeamSize"
                  value={formData.minTeamSize}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                Max Team Size:
                <Input
                  className="border w-[400px]"
                  type="number"
                  name="maxTeamSize"
                  value={formData.maxTeamSize}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
        <div className="">
          <span className="font-semibold">Description:</span>
          <Textarea />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditEvent;
