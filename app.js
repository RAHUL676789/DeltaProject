

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// basic setUp..........

const express = require("express");

const MongoStore = require('connect-mongo');

const app = express();

const mongoose = require("mongoose");

const path = require("path");




const dbURL =process.env.ATLASDB_URL;


// const dbURL = 'mongodb://127.0.0.1:27017/test'


async function main(){
    await mongoose.connect(dbURL);
    
}

main().then((result)=>{
    console.log("connected to dataBase");
}).catch((err)=>{
    console.log("some eror in database");
});


app.listen(8080,()=>{
    console.log(`app is listinig in the port 8080`);
})





app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public/css")));

app.use(express.static(path.join(__dirname,"/public/js")));

app.use(express.urlencoded({extended:true}));

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");

app.engine("ejs",ejsMate);


const expressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");

const reviewsRouter = require("./routes/reviews.js");

const userRouter = require("./routes/user.js");

const session = require("express-session");

const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy= require("passport-local");
const User = require("./models/user.js");


const store = MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("error in mongo session store",err);

})


const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//basic setUp complete ........

app.use(async(req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
   
    next();
});



app.use("/listing",listingRouter);

// reviews 

app.use("/listing/:id/reviews",reviewsRouter);

// users

app.use("/",userRouter);



app.all("*",(req,res,next)=>{
   next(new expressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
  
    let {statusCode=500,message="something went wrong"} = err;
    res.status(statusCode).render("listing/error.ejs",{message});
})


