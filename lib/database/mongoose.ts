import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGDB_URL

interface MongooseConnectioin {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Hanlde cache because the connection end right after each query
let cached: MongooseConnectioin = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn

    if (!MONGODB_URL) throw new Error('Missing MongDB url!')

    cached.promise = cached.promise || mongoose.connect(
        MONGODB_URL, {
        dbName: 'imaginigy', bufferCommands: false
    })

    cached.conn = await cached.promise

    return cached.conn
}