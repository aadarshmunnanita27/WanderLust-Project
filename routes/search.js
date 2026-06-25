const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/", async(req,res)=>{

    const {q} = req.query;

    const allListings = await Listing.find({
        $or:[
            {title:{$regex:q,$options:"i"}},
            {location:{$regex:q,$options:"i"}},
            {country:{$regex:q,$options:"i"}}
        ]
    });

    res.render(
        "listings/index.ejs",
        {allListings}
    );
});

module.exports = router;