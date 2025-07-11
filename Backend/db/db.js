import "dotenv/config"
import mongoose from "mongoose";

export const db = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)

        if(connection){
            console.log(`Connection Established ✅ ${connection.host}`)
        }
    } catch (error) {
        throw error
    }
};
