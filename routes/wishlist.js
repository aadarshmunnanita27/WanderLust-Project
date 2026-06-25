const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Add to wishlist
router.post("/:id", async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                wishlist: req.params.id
            }
        }
    );

    res.redirect("/listings/" + req.params.id);
});

// Remove from wishlist
router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                wishlist: id
            }
        }
    );

    req.flash("success", "Removed from wishlist!");

    res.redirect("/listings/" + id);
});

module.exports = router;