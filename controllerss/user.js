
const User = require("../models/user.js");


module.exports.signUp=(req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signUpPost= async (req, res) => {

    try {
        let { username, email, password } = req.body;
        let user1 = new User({ username, email });

        let newUser = await User.register(user1, password);
        req.logIn(newUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust");
            res.redirect("/listing");
        })

    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signUp");
    }

}

module.exports.renderLogin=(req, res) => {
    res.render("user/login.ejs");
}


module.exports.loginAuthenticat= async (req, res) => {

        req.flash("success", "you login to the page of wandelust welcome");

        let redirectUrl = res.locals.redirectUrl || "/listing";

         res.redirect(redirectUrl);

}


module.exports.userLogOut=(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out from wanderlust");
        res.redirect("/listing");
    })
}