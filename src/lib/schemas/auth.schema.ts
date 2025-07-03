import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters long")
    .max(64, "Password must be at most 64 characters long"),
  firstName: z.string().min(1, "First name is required").max(26, "First name must be at most 26 characters long"),
  lastName: z.string().min(1, "Last name is required").max(26, "Last name must be at most 26 characters long"),
  phone: z.string().regex(/^\d{9,15}$/, "Phone number must be between 9 and 15 digits"),
});

export type RegisterSchemaType = z.infer<typeof registerFormSchema>;
