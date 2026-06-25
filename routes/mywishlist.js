const express=require("express");
const router=express.Router();

const User=
require("../models/user");

router.get("/",
async(req,res)=>{

const user=
await User.findById(
req.user._id
)
.populate("wishlist");

res.render(
"wishlist.ejs",
{
listings:user.wishlist
}
);

});

module.exports=router;