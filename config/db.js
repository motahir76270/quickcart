
import mongoose from 'mongoose';

const cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async() => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/QuickCart`)
    } catch (error) {
        console.error('Database connection error:', error);
    }
}   

