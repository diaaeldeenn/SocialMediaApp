import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name Is Required")
      .min(2, "Name Must Be Atleast 2 Char")
      .max(10, "Name Must Be Atmost 10"),
    email: z.email("Email Is Required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least one special character",
      ),
    rePassword: z.string().nonempty("RePassword Is Requierd"),
    dateOfBirth: z.string().refine(
      (date) => {
        const currentYear = new Date().getFullYear();
        const dateBirth = new Date(date).getFullYear();
        const age = currentYear - dateBirth;
        return age >= 18;
      },
      { error: "Age Must Be Above 18 Years Old." },
    ),
    gender: z.string().nonempty("Gender Is Requierd"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Password Must Match",
  });




export const loginSchema = z.object({
    email: z.email("Email Is Required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least one special character",
      ),
  })
