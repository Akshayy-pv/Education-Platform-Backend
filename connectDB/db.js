import mongoose from "mongoose"

export const connectDB =async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DATABASE IS CONNECTED ${connect.connection.host}`);

    }
    catch(error){
        console.log("ERROR IN DATABASE CONNECTION",error.message);
        process.exit(2);

    }
    

}