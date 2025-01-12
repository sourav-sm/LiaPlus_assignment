const express=require("express");
const verifyToken=require("../middleware/authMiddleware");
const authorizedRoles=require("../middleware/roleMiddleware");
const router=express.Router();


//admin  can access
router.get("/admin",verifyToken,authorizedRoles("admin"),(req,res)=>{
    res.json({message:"Welcome Admin"});
})

router.get("/user",verifyToken, authorizedRoles("admin","user"),(req,res)=>{
    res.json({message:"welcome user"});
})

module.exports=router;