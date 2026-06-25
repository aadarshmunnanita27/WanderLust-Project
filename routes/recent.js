const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/", async (req,res)=>{

    const allListings = await Listing.find()
    .sort({ createdAt:-1 })
    .limit(8);

    res.render(
        "listings/index.ejs",
        { allListings }
    );

});

module.exports = router;