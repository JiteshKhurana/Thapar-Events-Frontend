import { editEventFormFields, editEventSchema } from "@/schemas/schema";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
// import { BiCalendar } from "react-icons/bi";

const EditEvent = () => {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<editEventFormFields>({
    defaultValues: {
      title: "",
      description: "",
      eligibility: "",
      venue: "",
      event_mode: "offline",
      event_type: "technical",
      visibility: true,
      social_media: {
        Instagram: "",
        Facebook: "",
        X: "",
        OfficialWebsite: "",
      },

      date1: {
        Date: new Date(),
        Title: "",
        Description: "",
      },
      date2: {
        Date: new Date(),
        Title: "",
        Description: "",
      },
      date3: {
        Date: new Date(),
        Title: "",
        Description: "",
      },
      date4: {
        Date: new Date(),
        Title: "",
        Description: "",
      },

      round1: {
        Title: "",
        Description: "",
      },
      round2: {
        Title: "",
        Description: "",
      },
      round3: {
        Title: "",
        Description: "",
      },
      round4: {
        Title: "",
        Description: "",
      },

      prize1: {
        Title: "",
        Description: "",
      },
      prize2: {
        Title: "",
        Description: "",
      },
      prize3: {
        Title: "",
        Description: "",
      },
      prize4: {
        Title: "",
        Description: "",
      },

    },
    resolver: zodResolver(editEventSchema),
  });
  const onSubmit: SubmitHandler<editEventFormFields> = (data) => {
    console.log(data);
  };
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl py-5 my-5">
      <h1 className="font-semibold text-2xl mt-3 flex flex-wrap m-5">
        Edit Event
      </h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input {...register("title")} type="text" placeholder="Event Title" />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Event Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Description of the event."
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="eligibility">Eligibility</Label>
          <Input
            type="text"
            {...register("eligibility")}
            placeholder="Eligibility criteria for the event."
          />
          {errors.eligibility && (
            <div className="text-red-500">{errors.eligibility.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="venue">Venue</Label>
          <Input
            type="text"
            {...register("venue")}
            placeholder="Where the event will be held."
          />
          {errors.venue && (
            <div className="text-red-500">{errors.venue.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="event_mode">Event Mode</Label>
          <select
            {...register("event_mode")}
            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.event_mode && (
            <div className="text-red-500">{errors.event_mode.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="event_type">Event Type</Label>
          <select
            {...register("event_type")}
            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
            <option value="other">Other</option>
          </select>
          {errors.event_type && (
            <div className="text-red-500">{errors.event_type.message}</div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="visibility" />
          <Label htmlFor="visibility">Visibility</Label>
          {errors.visibility && (
            <div className="text-red-500">{errors.visibility.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="eligibility">Hashtags</Label>
          <div className="flex flex-row flex-wrap gap-2">
            <Input className="w-full max-w-[400px]"
              type="text"
              {...register("hashtags.0")}
              placeholder="Hashtag #1"
            />
            <Input className="w-full max-w-[400px]"
              type="text"
              {...register("hashtags.1")}
              placeholder="Hashtag #2"
            />
            <Input className="w-full max-w-[400px]"
              type="text"
              {...register("hashtags.2")}
              placeholder="Hashtag #3"
            />
          </div>
          {errors.hashtags && (
            <div className="text-red-500">{errors.hashtags.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="social_media">Social Media Handles</Label>
          <div className="flex flex-wrap gap-2">
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("social_media.Instagram")}
              placeholder="Instagram"
            />
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("social_media.Facebook")}
              placeholder="Facebook"
            />
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("social_media.X")}
              placeholder="X"
            />
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("social_media.OfficialWebsite")}
              placeholder="Official Website"
            />
          </div>
          {errors.social_media && (
            <div className="text-red-500">{errors.social_media.message}</div>
          )}
        </div>



{/* ---------------------Deadlines Container ----------------------------------*/}
        <div className="datesanddeadlines flex flex-col gap-3">
          <span className="dates-heading text-xl font-semibold">Important Dates and Deadlines</span>

          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Date-1</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("date1.Title")}
            /></span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Date:</span>
              <input type="datetime-local" className="p-1 border rounded-md"
                {...register("date1.Date")}
              />
            </span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("date1.Description")}
              /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Date-2</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("date2.Title")}
            /></span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Date:</span>
              <input type="datetime-local" className="p-1 border rounded-md"
                {...register("date2.Date")}
              />
            </span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("date2.Description")}
              /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Date-3</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("date3.Title")}
            /></span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Date:</span>
              <input type="datetime-local" className="p-1 border rounded-md"
                {...register("date3.Date")}
              />
            </span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("date3.Description")}
              /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Date-4</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("date4.Title")}
            /></span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Date:</span>
              <input type="datetime-local" className="p-1 border rounded-md"
                {...register("date4.Date")}
              />
            </span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("date4.Description")}
              /></span>
          </div>

          
        </div>

{/* ---------------------Rounds Container ----------------------------------*/}
        <div className="rounds flex flex-col gap-3">
          <span className="rounds-heading text-xl font-semibold">Rounds</span>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Round-1</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
            {...register("round1.Title")}
            /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
            {...register("round1.Description")}
            /></span>
          </div>
          

          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Round-2</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
            {...register("round2.Title")}
            /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
            {...register("round2.Description")}
            /></span>
          </div>
          

          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Round-3</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
            {...register("round3.Title")}
            /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
            {...register("round3.Description")}
            /></span>
          </div>
          

          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Round-4</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
            {...register("round4.Title")}
            /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
            {...register("round4.Description")}
            /></span>
          </div>
          
        </div>

{/* ---------------------Prizes Container ----------------------------------*/}
        <div className="prizes flex flex-col gap-3">

          <span className="prizes-heading text-xl font-semibold">Prizes</span>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Prize-1</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("prize1.Title")}
              /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("prize1.Description")}
            /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Prize-2</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("prize2.Title")}
              /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("prize2.Description")}
            /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Prize-3</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("prize3.Title")}
              /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("prize3.Description")}
            /></span>
          </div>


          <div className="event-round border rounded-md flex flex-col gap-1 p-1 sm:p-3">
            <span className="font-semibold">Prize-4</span>
            <span className="title flex items-center gap-1"><span className="font-medium text-sm">Title:</span>  
            <Input className="w-full max-w-[400px]" 
              {...register("prize4.Title")}
              /></span>
            <span className="title flex flex-wrap items-start gap-1"><span className="font-medium text-sm">Description:</span>
            <Textarea className="w-full max-w-[800px]" 
              {...register("prize4.Description")}
            /></span>
          </div>


        </div>


        <Button disabled={isSubmitting} type="submit" className="py-3 px-10 ">
          {isSubmitting ? "Loading..." : "Save Changes"}
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}


      </form>
    </div>
  );
};

export default EditEvent;
