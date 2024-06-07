const express = require("express");

const router = express.Router({ mergeParams: true });

const controllerUser = require("../controllerss/user.js");

const { saveRedirectUrl,validateUser } = require("../middleware.js");
const passport = require("passport");

// signup route
router
 .route("/signUP")
 .get(controllerUser.signUp )
 .post( validateUser, controllerUser.signUpPost);

// login route

router.route("/login")
.get( controllerUser.renderLogin)
.post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    controllerUser.loginAuthenticat
);

// logout route
router.get("/logout", controllerUser.userLogOut)

module.exports = router;