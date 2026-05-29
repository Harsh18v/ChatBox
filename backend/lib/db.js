import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4,
        });
        console.log('Connected to DB');
        console.log('Connected to DB:', mongoose.connection.db.databaseName);

    } catch (error) {
        console.error('MongoDB connection failed:', error.message || error);
        throw error;
    }
}