import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user", "technician"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    otp: String,
    otpExpire: Date,
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
UserSchema.methods.generateOTP = function () {
    this.otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpExpire = Date.now() + 10 * 60 * 1000;
    return this.otp;
};
UserSchema.set("toJSON", {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
});
UserSchema.add({
    id: {
        type: String,
        default: () => uuidv4(),
        required: true,
        unique: true,
    },
});
UserSchema.index({ email: 1, role: 1 }, { unique: true });
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map