import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://xurmochoyxona1:AJT75.X9mfsdfcweEFnq@xurmo.vvlxzvk.mongodb.net/Xurmo?retryWrites=true&w=majority&appName=Xurmo";

if (!MONGODB_URI) {
  console.log("Please define the MONGODB_URI environment variable inside .env.local");
  
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
	var mongoose: any;
}

let cached = global.mongoose as any;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;