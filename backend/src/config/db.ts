import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/antivirus_ecommerce";
    
    await mongoose.connect(connUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[Database] MongoDB Connected successfully: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB:`, error);
    process.exit(1);
  }
};
