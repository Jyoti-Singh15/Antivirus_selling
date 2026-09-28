import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const primaryUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/antivirus_ecommerce";
  const localFallbackUri = "mongodb://127.0.0.1:27017/antivirus_ecommerce";
  
  try {
    await mongoose.connect(primaryUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[Database] MongoDB Connected successfully: ${mongoose.connection.host}`);
  } catch (error) {
    if (primaryUri !== localFallbackUri) {
      console.warn(`[Database Warning] Primary DB connection failed. Attempting local MongoDB (${localFallbackUri})...`);
      try {
        await mongoose.connect(localFallbackUri, {
          autoIndex: true,
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`[Database] Local MongoDB Connected successfully: ${mongoose.connection.host}`);
        return;
      } catch (localErr) {
        console.error(`[Database Error] Could not connect to local MongoDB either.`);
      }
    }
    console.error(`[Database Error] Failed to connect to MongoDB:`, error);
    process.exit(1);
  }
};
