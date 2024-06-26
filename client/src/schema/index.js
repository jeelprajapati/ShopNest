import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const registerSchema = Yup.object({
  username: Yup.string().min(2).required("Username is required!"),
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required!"),
});
export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required!"),
});

export const changePasswordSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email")
    .required("Email is required!"),
  currentPassword: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Current password is required!"),
  newPassword: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("New password is required!"),
  cNewPassword: Yup.string()
  .oneOf(
    [Yup.ref("newPassword"), null],
    "New password and Confirm new password must be same!"
  )
  .required("Confirm password is requird!"),
});
