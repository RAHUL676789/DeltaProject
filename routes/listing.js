const express = require("express");

const router = express.Router();
exports.router = router;

const listing = require("../models/listing.js");

const asyncWrap = require("../utils/asynchWrap.js");

const { find } = require("../models/reviews.js");
const {isloggedIn,isOwner,validateListing} = require("../middleware.js");
const controllerssListing = require("../controllerss/listing.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({storage})


// "/" routes


router
.route("/")
.get(asyncWrap(controllerssListing.index))
.post( isloggedIn,upload.single("listing[img]"),validateListing,asyncWrap(controllerssListing.newListing));

router.get("/cateogary",controllerssListing.cateogary);

// new route
router.get("/new",isloggedIn,controllerssListing.renderNewForm);
router.get("/search",asyncWrap(controllerssListing.searchListing));



// "/:id routes"

router
.route("/:id")
.get(asyncWrap(controllerssListing.showListing))
.put(isloggedIn,isOwner,upload.single("listing[img]"),validateListing,asyncWrap(controllerssListing.updateListing))
.delete(isloggedIn,isOwner,asyncWrap(controllerssListing.deleteListing));

router.get("/:id/edit",isloggedIn,isOwner,asyncWrap(controllerssListing.editListing));

router.post("/:id/newImage",isloggedIn,upload.single("listing[img]"),isOwner,asyncWrap(controllerssListing.newImageListing));

module.exports = router;