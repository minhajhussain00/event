import { PRIVATE_MONGODB_URI } from "$env/static/private";
import mongoose from "mongoose";
import { dbName } from "../constant";

const MONGODB_URI = PRIVATE_MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export async function connectToDB() {
  const readyState = mongoose.connection.readyState;

  if (readyState === 1) {
    return mongoose;
  }

  if (readyState === 2) {
    await mongoose.connection.asPromise();
    return mongoose;
  }
  return mongoose.connect(`${MONGODB_URI}/${dbName}`);
}
