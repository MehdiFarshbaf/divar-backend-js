import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URI : "mongodb://farshbaf_mySite:Mehdi14439@localhost:27017/farshbaf_mySite", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}