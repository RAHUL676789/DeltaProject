

const listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const expressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema,userSchema} = require("./schema.js");



module.exports.isloggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must have to login");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner=async(req,res,next)=>{
    let {id} = req.params;
    let newListing = await listing.findById(id);
    if(!newListing.owner.equals(res.locals.currUser._id)){
        console.log("hello");
        req.flash("error","you have not permission to edit this listing");
        return res.redirect(`/listing/${id}`);
    }
next();
}


module.exports.validateListing =(req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result.error);
    if (result.error) {
        throw new expressError(400, result.error);
    }
    else {
        next();
    }
};


module.exports.validateReview =(req,res,next)=>{
    let result = reviewSchema.validate(req.body);
    console.log(result.error);
    if(result.error){
       throw new expressError(400,result.error);
    }
    else{
       next();
    }
   }


   module.exports.isReviewOwner=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let deleteReview = await Review.findById(reviewId);
    if(!deleteReview.author.equals(req.user._id)){

        req.flash("error","you are not allow to delete this review");
        return res.redirect(`/listing/${id}`);

    }
    next()
   }
   

   module.exports.validateUser=(req, res, next) => {
    let result = userSchema.validate(req.body);
    console.log(result.error);
    if (result.error) {
        throw new expressError(400, result.error);
    }
    else {
        next();
    }
};

module.exports.isEmpty = (req,res,next)=>{
    if(req.query.destination  != ""){

    }
    else{
       next();
    }

}
// console.log(this.saveRedirectUrl);




