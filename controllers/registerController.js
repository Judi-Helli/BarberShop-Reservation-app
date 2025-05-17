const registerService = require("./../services/registerService");
const verificationService = require("./../services/verificationService");
const { validationResult } = require("express-validator");
//const sendEmail = require("./../sendEmail");
const DBConnection = require("./../configs/DBConnection");


let getPageRegister = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    }); 
};
let checkNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user object
    /*let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };*/
    email = req.body.email;
    console.log('Befor check new user: ',email);
    try {
        await verificationService.checkNewUserExist(email);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};


let SendEmailtoUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user object
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

        req.session.name = req.body.name
        req.session.email = req.body.email
        req.session.password = req.body.password
    
    console.log(newUser);
    try {
        await registerService.sendVerificationEmail(req.body.email);
        return res.redirect("/verify2fa");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }

};
module.exports = {
    getPageRegister: getPageRegister,
    checkNewUser:    checkNewUser,
    SendEmailtoUser: SendEmailtoUser};

