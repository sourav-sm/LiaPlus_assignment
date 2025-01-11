const mongoose=require("mongoose");

const dbConnect=async()=>{
    try{
        const connect=await mongoose.connect(process.env.DB_URL);
        console.log(`database is connected : ${connect.connection.host},${connect.connection.name}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
   
}

module.exports=dbConnect;