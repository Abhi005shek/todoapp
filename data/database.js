import mongoose from "mongoose";

export default function connectDB(){
mongoose.connect(process.env.MONGO_URI,{
    dbName: 'apidata',
})
.then((c) => console.log(`Database Connected with ${c.connection.host}`)).catch(() => console.log("Sorry!! Couldn't Connect"));

}