

const listing = require("../models/listing.js");

module.exports.index=async (req, res, next) => {

    const allListing = await listing.find({});
    res.render("./listing/index.ejs", { allListing });

};

module.exports.renderNewForm =(req, res) => {
   
    res.render("listing/new.ejs");
};


module.exports.showListing =   async (req, res, next) => {

    let { id } = req.params;

    let signlisting = await listing.findById(id)
    .populate(
        {
        path:"reviews",

        populate:{
            path:"author"
        }
    })
    .populate("owner");
    console.log(signlisting);

    if(!signlisting){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listing");
    }
    // console.log(signlisting);
    res.render("listing/show.ejs", { signlisting });
}


module.exports.editListing= async(req, res, next) => {

    let { id } = req.params;

    let findlisting = await listing.findById(id);
     let originalimgUrl = findlisting.img[0].url;
     let imageURl = originalimgUrl.replace("/upload","/upload/w_250");
     console.log(imageURl);
    if(!findlisting){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listing");
    }

    res.render("listing/edit.ejs", { findlisting,imageURl });
}

module.exports.newListing= async (req, res, next) => {


    let url = req.file.path;
    let filename = req.file.filename;
    
    let newlisting = new listing(req.body.listing);
     newlisting.owner=req.user._id;
     newlisting.img.push({url,filename});
    await newlisting.save();
    req.flash("success","new listing added !");

    res.redirect("/listing");

}


module.exports.updateListing= async (req, res, next) => {
    if (!req.body.listing) {
        throw new expressError(400, "send valid data for listing");
    }
    let { id } = req.params;

    let updatedListing=await listing.findByIdAndUpdate(id, { ...req.body.listing });
   
console.log(req.file);

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.img[0] = {url,filename};
        await updatedListing.save();
        console.log("updated");
    }

  
    req.flash("success","listing updated !");

    
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing=async (req, res, next) => {
    let { id } = req.params;

    let deleteList = await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect(`/listing`);
}


module.exports.newImageListing = async(req,res,next)=>{
     let {id} = req.params;
     let newImageListing = await listing.findById(id);
     console.log(req.file);
     console.log("ello new image");

     let url = req.file.path;
     let filename = req.file.filename;

     newImageListing.img.push({url,filename});

     newImageListing.save();
     console.log("new imgae aded");
     req.flash("success","new image added");
     res.redirect(`/listing/${id}`);
}


module.exports.searchListing = async(req,res)=>{
    console.log(req.query);
    const {destination} = req.query;
    let searchListing = await listing.find({$or:[{location:destination},{country: destination}]});

    if(!(searchListing.length > 0)){
        req.flash("error","destination not found/search based on their country or state");
        return res.redirect("/listing");
    }
   
    res.render("listing/search.ejs",{searchListing});

};


module.exports.cateogary=async(req,res)=>{
    const {cateogary} = req.query;
    console.log(cateogary);
    let cateogaryListing = await listing.find({cateogary:cateogary});
    console.log(cateogaryListing);

    if(!(cateogaryListing.length > 0)){
             req.flash("error","cateogary not found please select another cateogary");
             return res.redirect("/listing");
    }
    res.render("listing/cateogary.ejs",{cateogaryListing});
}