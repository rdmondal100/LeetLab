

import { z } from "zod"

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must not exceed 100 characters" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email is not valid" })
    .transform((val) => val.toLowerCase().trim()),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must include at least one special character" }),
})
