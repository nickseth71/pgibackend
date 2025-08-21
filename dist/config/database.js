import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MongoDB URI is not defined.");
        }
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=database.js.map