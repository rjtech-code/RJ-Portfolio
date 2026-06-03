import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[ERROR] Database connection failed: ${error.message}`);
        // Automatically attempt reconnection handled by Mongoose default settings
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
