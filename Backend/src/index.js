const express=require("express");
const dotenv=require("dotenv");
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes')
const cors=require("cors");

dotenv.config();
dbConnect();

const app=express();
app.use(cors());

//middleware
app.use(express.json())

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);

//start the server
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
