import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("Please Enter your Email"),
  password: yup.string().required("Please Enter your password"),
});