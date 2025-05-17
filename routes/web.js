const express = require("express");
const homePageController = require("../controllers/homePageController");
const registerController = require("../controllers/registerController");
const verificationController = require("../controllers/verificationController");
const verifyresetController = require("../controllers/verifyresetController");
const loginController = require("../controllers/loginController");
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    //router.get("/reservation", resController.checkLoggedIn, resController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.get("/verify2fa", verificationController.getPageVerify2fa);
    router.get("/verifyreset", verifyresetController.getPageVerifyreset);
    router.post("/register", auth.validateRegister, /*registerController.checkNewUser,*/registerController.SendEmailtoUser);
    router.post("/verify2fa", auth.validateVerify2fa, verificationController.createNewUser);
    //router.post("/verifyreset", auth.validateVerifyreset, verifyresetController.changPassword);
    
    router.get('/a', (req, res) => { //20kmlocation
        res.render("a.ejs")
    })

    router.get('/reservation', (req, res) => { //20kmlocation
        res.render("reservation.ejs")
    })
    router.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    ); // To authenticate the user using google
      
    router.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/error" }), // If the user is not authenticated, redirect to the error page
        function (req, res) {
          // Successful authentication, redirect success.
          res.redirect("/");
          //console.log(userProfile);
        });
    
    router.post("/logout", loginController.postLogOut);
        return app.use("/", router);

};
module.exports = initWebRoutes;
