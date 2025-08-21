import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
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
UserSchema.virtual('id').get(function () {
    return this._id.toString();
});
UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map