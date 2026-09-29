import mongoose from "mongoose";

// Hardcoded MongoDB connection string
const MONGO_URI = "mongodb+srv://FarrukhBalay:FarrukhBalay@cluster0.kqaf8ub.mongodb.net/";


let cached = global._mongooseCache;

if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    // Start a new connection promise only if one isn't already in-flight
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongooseInstance) => {
                console.log("✅ Connected to MongoDB");
                return mongooseInstance;
            })
            .catch((error) => {
                // Clear the cached promise so the next call retries
                cached.promise = null;
                console.error("❌ MongoDB connection error:", error.message);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

mongoose.connection.on("disconnected", () => {
    // Reset cache so the next request re-connects
    cached.conn = null;
    cached.promise = null;
    console.log("⚠️  MongoDB disconnected – connection cache cleared");
});

export default connectToDatabase;
