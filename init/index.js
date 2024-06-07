const mongoose = require("mongoose");

const initData = require("./data.js");

const listing = require("../models/listing.js");

let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(mongo_URL);
}

main().then((result)=>{
    console.log("connected to dataBase");
}).catch((err)=>{
    console.log("some eror in database");
});



async function initDB(){
    await listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,owner:"663fa4bc4425fd65ebf5a01e"}))
    await listing.insertMany(initData.data);
    console.log("data was sacved");
}

initDB();