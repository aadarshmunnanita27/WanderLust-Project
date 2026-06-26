// if(process.env.NODE_ENV != "production"){
//     require("dotenv").config();
// }
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

// console.log("Current directory:", __dirname);
// console.log("ATLASDB_URL =", process.env.ATLASDB_URL);
// require("dotenv").config();
// console.log(process.env);
// console.log(process.env.ATLASDB_URL);

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_TOKEN,
});

// const MONGO_URL = "mongodb://localhost:27017/wanderlust";
const MONGO_URL =  process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "6a31946a9360210aa85e50f9",
    }));
       
    for (let listing of initdata.data) {

        const response = await geocodingClient
            .forwardGeocode({
                query: `${listing.location}, ${listing.country}`,
                limit: 1,
            })
            .send();

        if (response.body.features.length > 0) {
            listing.geometry = response.body.features[0].geometry;
            // console.log(listing.location, response.body.features[0]?.geometry);
        }
    }

    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");
}
initDB();



