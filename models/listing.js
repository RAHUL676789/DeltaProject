
const mongoose= require("mongoose");
let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

const Review = require("./reviews.js");
const { string } = require("joi");

async function main(){
    await mongoose.connect(mongo_URL);
}

main().then((result)=>{
    console.log("connected to dataBase");
}).catch((err)=>{
    console.log("some eror in database");
});

let Schema = mongoose.Schema;

let listingsSchema = new Schema({
    tittle:{
        type:String,
        required:true
    },

    description:{
        type : String
    },

    price:{
        type : Number,
        required:true
    },

    img:[


        {
       
        url:String,
        filename:String
       }

    ],

    location:{
        type : String
    },
    country:{
        type :String
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    cateogary:{
        type:String,
        default:"mountain city",
        enum:["Trending","Rooms","mountain city","Castle","Farms","Amazing Tools","Camping","Arctic","Iconic City"]

    }

});


  
listingsSchema.post('findOneAndDelete',async(listing)=>{
    console.log("post middlewar");
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})


let listing = mongoose.model("listinG",listingsSchema);

module.exports = listing;