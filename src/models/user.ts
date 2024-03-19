

import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: string;
    verifyToken?: string;
    verifyTokenExpiry?: string;
}

const UserSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide a password']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String
});

const User: Model<IUser> = mongoose.models.users || mongoose.model<IUser>("users", UserSchema);

export default User;
