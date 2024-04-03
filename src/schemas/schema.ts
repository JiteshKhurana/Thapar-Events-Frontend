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

export type FormFields = z.infer<typeof editUserSchema>;
