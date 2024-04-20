import { z } from "zod";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// 10 digits not less or more

const RollRegExp = /^\d{9}$/;
// exactly 9 digits

export const editUserSchema = z.object({
  phone: z
    .string()
    .regex(phoneRegExp, { message: "Phone number is not valid" })
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid"),
  rollNo: z.string().regex(RollRegExp, { message: "Roll number is not valid" }),
  batch: z.string({
    required_error: "Please select a batch.",
  }),
  branch: z.string({
    required_error: "Please select a branch.",
  }),
});

export const userEventRegisterSchemas = z.object({
  parameters: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(50, "Too Long").optional(),
        description: z
          .string()
          .min(2, "Too Short")
          .max(100, "Too Long")
          .optional(),
      })
    )
    .optional(),
});

export const editSocietySchema = z.object({
  name: z.string().min(2, "Too Short").max(40, "Too Long"),
  about: z.string().min(10, "Too Short").max(1000, "Too Long"),
  members: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(40, "Too Long"),
        email: z.string().email(),
        position: z.string().min(2, "Too Short").max(40, "Too Long"),
        instagram: z.string().min(0).url("Enter a URL").max(255),
        linkedin: z.string().min(0).url("Enter a URL").max(255),
      })
    )
    .optional(),
  faculty: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(40, "Too Long"),
        email: z.string().email(),
        position: z.string().min(2, "Too Short").max(40, "Too Long"),
        linkedin: z.string().min(0).url("Enter a URL").max(255),
      })
    )
    .optional(),
});

// const MAX_FILE_SIZE = 500000000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const addEventPosterSchema = z.object({
  photos: z
    .any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 50MB.`)
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
    .optional(),
});

export const editEventSchema = z.object({
  title: z.string().min(2, "Too Short").max(50, "Too Long"),
  description: z.string().min(2, "Too Short").max(2000, "Too Long"),
  start_date: z.date({
    required_error: "start date is required.",
  }),
  end_date: z.date({
    required_error: "end date is required.",
  }),
  eligibility: z.string().min(2, "Too Short").max(50, "Too Long"),
  event_type: z.string({ required_error: "Please Select Event Type" }),
  event_mode: z.string({ required_error: "Please Select Event Mode" }),
  visibility: z.string(),
  venue: z
    .string({ required_error: "Please Enter Venue" })
    .min(2, "Too Short")
    .max(50, "Too Long"),
  hashtags: z.array(z.string().max(20, "Too Long")).optional(),
  social_media: z.object({
    Instagram: z.string().min(0).url("Enter a URL").max(255).or(z.literal("")),
    Facebook: z.string().min(0).url("Enter a URL").max(255).or(z.literal("")),
    X: z.string().min(0).url("Enter a URL").max(255).or(z.literal("")),
    OfficialWebsite: z
      .string()
      .min(0)
      .url("Enter a URL")
      .max(255)
      .or(z.literal("")),
  }),
  deadlines: z
    .array(
      z.object({
        date: z.date().optional(),
        title: z.string().min(2, "Too Short").max(50, "Too Long").optional(),
        description: z
          .string()
          .min(2, "Too Short")
          .max(200, "Too Long")
          .optional(),
      })
    )
    .optional(),

  rounds: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(50, "Too Long").optional(),
        description: z
          .string()
          .min(2, "Too Short")
          .max(200, "Too Long")
          .optional(),
      })
    )
    .optional(),

  prizes: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(50, "Too Long").optional(),
        description: z
          .string()
          .min(2, "Too Short")
          .max(100, "Too Long")
          .optional(),
      })
    )
    .optional(),

  parameters: z
    .array(
      z.object({
        name: z.string().min(2, "Too Short").max(50, "Too Long").optional(),
        description: z
          .string()
          .min(2, "Too Short")
          .max(100, "Too Long")
          .optional(),
      })
    )
    .optional(),
});

export const userFeedbackSchema = z.object({
  message: z.string().min(2, "Write a Bigger Message").max(5000, "Too Long"),
});

export type FormFields = z.infer<typeof editUserSchema>;
export type userEventRegisterFormFields = z.infer<
  typeof userEventRegisterSchemas
>;
export type editSocietyFormFields = z.infer<typeof editSocietySchema>;
export type editEventFormFields = z.infer<typeof editEventSchema>;
export type addEventPosterFields = z.infer<typeof addEventPosterSchema>;
export type userFeedbackFields = z.infer<typeof userFeedbackSchema>;
