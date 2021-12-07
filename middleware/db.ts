import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const connection = mongoose.connection;
  if (connection.readyState >= 1) return;

  if (process.env.MONGO_URI) {
    return mongoose.connect(
      process.env.MONGO_URI,
      {
        // @ts-ignore
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      null
    );
  } else throw Error("No URI");
};

export const jsonify = (obj: Record<string, any>) => {
  return JSON.parse(JSON.stringify(obj));
};
