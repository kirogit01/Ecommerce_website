import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator:[validator.isEmail,"please ente the Valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        maxLength:[8,"paasword cannot exceet 6 char "]
    },
    avatar:{
        type:String,
        required:true

    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String, // only 1 resetpaaswordtoken :{type:string}
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

export default mongoose.model("User", userSchema);