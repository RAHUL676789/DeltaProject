const listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.newReview= async(req,res)=>{
    let reviewlisting = await listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
     newReview.author=req.user._id;
    reviewlisting.reviews.push(newReview);

    console.log(newReview);
    await newReview.save();
    await reviewlisting.save();
    req.flash("success","new review added !");
    
    
    res.redirect(`/listing/${reviewlisting._id}`);
}


module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId}=req.params;

   
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted !");
    res.redirect(`/listing/${id}`);
}