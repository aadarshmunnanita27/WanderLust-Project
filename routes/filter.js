const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/:category",async(req,res)=>{

const {category}=req.params;

const allListings=
await Listing.find({
category
});

res.render(
"listings/index.ejs",
{allListings}
);

});

module.exports=router;