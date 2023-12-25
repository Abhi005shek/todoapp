import mongoose from "mongoose";

export default function connectDB(){
mongoose.connect(process.env.MONGO_URI,{
    dbName: 'apidata',
})
.then(() => console.log("Database Connected")).catch(() => console.log("Sorry!! Couldn't Connect"));

}