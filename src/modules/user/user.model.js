import {model, Schema} from "mongoose";

const OTPSchema = new Schema({
    code: {
        type: String,
        required: false,
        default: undefined
    },
    expiresIn: {
        type: Number,
        required: false,
        default: 0
    }
})

const UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        required: [true, "وارد کردن شماره موبایل الزامی است."],
        unique: true,
    },
    otp: {type: OTPSchema},
    verifiedMobile: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {timestamps: true})

const UserModel = model("user", UserSchema);

export default UserModel;