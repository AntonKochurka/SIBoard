import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(1, "Email or username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Please confirm your password")
}).refine(
    (data) => data.password === data.confirm_password, {
        error: "Passwords do not match",
        path: ["confirm_password"]
    }
)

export type SignInSchemaType = z.infer<typeof signInSchema>;
