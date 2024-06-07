const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap  = require("../utils/asynchWrap.js");
const listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isloggedIn,validateReview,isReviewOwner}= require("../middleware.js");
const controllerReview=require("../controllerss/reviews.js");

   router.post(

    "/",isloggedIn,
   validateReview,
   asyncWrap(controllerReview.newReview)
   
   );



router.delete(
    
    "/:reviewId",
    isloggedIn,isReviewOwner,
    asyncWrap(controllerReview.deleteReview)

);


module.exports = router;