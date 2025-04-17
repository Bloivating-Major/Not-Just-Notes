import User from "../models/User/user.model";
import { CreateUserInput , LoginInput } from "../models/User/user.schema";

export const createUser = async({username, email, password} : CreateUserInput) => {
    // If any field is missing
    if(!username || !email || !password){
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await User.hashPassword(password);

    // Create user
    const user = new User({
        username,
        email,
        password : hashedPassword,
    });

    // Save user to database
    await user.save();

    // Remove Password from response
    user.password = undefined as unknown as string;


    return user;
}

export const loginUser = async ({email, password} : LoginInput) => {
    // Find user by email
    const user = await User.findOne({email});

    // If user not found
    if(!user){
        throw new Error("Invalid Credentials");
    }

    // Verify Password
    const isPasswordValid = await User.comparePassword(password, user.password);

    // If password is invalid
    if(!isPasswordValid){
        throw new Error("Invalid Credentials");
    }

    // Remove password from response
    user.password = undefined as unknown as string;

    return user;
}

