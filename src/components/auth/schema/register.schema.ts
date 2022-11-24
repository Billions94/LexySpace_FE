import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup.string().required("Please Enter a username"),
  email: yup.string().email().required("Please Enter your Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});
