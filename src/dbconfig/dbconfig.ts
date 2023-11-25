import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = await mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log("MongDB connection failed: " + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
