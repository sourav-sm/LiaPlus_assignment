const expres=require ("express");
const dotenv=require("dotenv");
const dbConnect=require("./config/dbConnect");

dotenv.config();
dbConnect();

const app=expres();

//middleware
app.use(expres.json())

//routes

//start the server
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
