import mongoose from "mongoose";

export const connectDb= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected :${conn.connection.host}`.bgGreen.black.underline)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
