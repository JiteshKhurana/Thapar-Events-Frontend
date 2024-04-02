import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// 10 digits not less or more

const RollRegExp = /^\d{9}$/;
// exactly 9 digits

export const basicSchema = yup.object().shape({
  phoneNo: yup
    .string()
    .matches(phoneRegExp, { message: "Phone number is not valid" })
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid")
    .required("Required"),
  rollNo: yup
    .string()
    .matches(RollRegExp, { message: "Roll number is not valid" })
    .required("Required"),
  batch: yup
    .string()
    .oneOf(["2027", "2026", "2025", "2024", "2023"], "Invalid Batch")
    .required("Required"),
  branch: yup
    .string()
    .oneOf(["CSE", "COE", "ENC", "BIO", "MECH", "CHE"], "Invalid branch")
    .required("Required"),
});
