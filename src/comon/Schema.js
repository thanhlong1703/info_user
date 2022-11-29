//
import * as yup from "yup";

export const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().max(20).required(),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    age: yup.number().positive().integer().required(),
    phone: yup.string().required(),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required(),
    country: yup.string().required(),
  })
  .required();
