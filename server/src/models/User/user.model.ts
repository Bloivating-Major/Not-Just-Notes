import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config/config"

// Mongoose Schema for Database
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username already exists"],
        trim : true,
        lowercase : true,
        minlength : [3, "Username must be at least 3 characters"],
        maxlength : [15, "Username must be at most 15 characters"],
    },
    email :{
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exists"],
        trim : true,
        lowercase : true,
        minlength : [6, "Email must be at least 6 characters"],
        maxlength : [40, "Email must be at most 40 characters"],
    },
    password :{
        type : String,
        required : [true, "Password is required"],
    },
    profileImage :{
        type : String,
        default : "https://i.pinimg.com/236x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg",
    }
}, {
    timestamps : true,
});

// Hash password before saving to database
userSchema.statics.hashPassword = async (password : string) => {
    if(!password){
        throw new Error("Password is required");
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Compare password with hashed password in database
userSchema.statics.comparePassword = async (password : string, hashedPassword : string) => {
    if(!password){
        throw new Error("Password is required");
    }

    return await bcrypt.compare(password, hashedPassword);
}


// Generate JWT token for user
userSchema.methods.generateToken = function () {
    const payload = {
      id: this._id,
      username: this.username,
      email: this.email,
    };
  
    // @ts-ignore
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE, // must be string like '1d'
    });
  
    return token;
  };

  // Verify Token
userSchema.statics.verifyToken = function(token : string) {
    if(!token){
        throw new Error("Token is required");
    }
    return jwt.verify(token, config.JWT_SECRET);
}

// Creating Interface for User Document
export interface UserDocument extends mongoose.Document{
    username : string,
    email : string,
    password : string,
    profileImage? : string,
    comparePassword(password : string) : Promise<boolean>,
    generateToken() : string,
}

// Create Interface for User Moel
export interface UserModel extends mongoose.Model<UserDocument>{
    hashPassword(password : string) : Promise<string>,
    comparePassword(password : string, hashedPassword : string) : Promise<boolean>,
    verifyToken(token : string) : any,
}

// Creating User Model
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;