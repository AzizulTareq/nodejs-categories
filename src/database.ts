import mongoose, { Connection } from "mongoose";

const connectString: string = process.env.MONGO_URL

export const connectDB = async (): Promise<Connection> => {
  try {
    const db = await mongoose.connect(connectString);

    console.log("Connected to MongoDB");
    return db.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
