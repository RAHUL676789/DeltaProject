const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing:joi.object({
        tittle:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        img:joi.string().allow("",null),
        location:joi.string().required(),
        country:joi.string().required(),
        cateogary:joi.string().required()

        
    }).required()
});


module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().min(1).max(5).required(),
        comment:joi.string().required()
    }).required()
})


module.exports.userSchema=joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required()
})