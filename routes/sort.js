const express=require("express");
const router=express.Router();

const Listing=
require("../models/listing");

router.get("/low",
async(req,res)=>{

const allListings=
await Listing.find()
.sort({price:1});

res.render(
"listings/index.ejs",
{allListings}
);

});

router.get("/high",
async(req,res)=>{

const allListings=
await Listing.find()
.sort({price:-1});

res.render(
"listings/index.ejs",
{allListings}
);

});

module.exports=router;