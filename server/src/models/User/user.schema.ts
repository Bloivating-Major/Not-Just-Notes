import { z } from "zod";

// Schema for creating user
export const userSchema = z.object({
    username : z.string({
        required_error : "Username is required"
    })
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be at most 15 characters")
    .trim()
    .toLowerCase(),

    email : z.string({
        required_error : "Email is required"
    })
    .email("Invalid email format")
    .min(6, "Email must be at least 6 characters")
    .max(40, "Email must be at most 40 characters")
    .trim()
    .toLowerCase(),

    password : z.string({
        required_error : "Password is required"
    })
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),

    profileImage : z.string()
    .url("Invalid URL format")
    .optional()
    .default("https://i.pinimg.com/236x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg"),
});

// Schema for updating user (making all fields optional)
export const updateUserSchema = userSchema.partial();

// Schema specifically for login
export const loginSchema = z.object({
    email : z.string({
        required_error : "Email is required"
    }).email("Invalid email format"),
    password : z.string({
        required_error : "Password is required"
    })
});

// Export types
export type CreateUserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
