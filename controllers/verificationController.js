const registerService = require("./../services/registerService");
const { validationResult } = require("express-validator");
//const sendEmail = require("./../sendEmail");

let getPageVerify2fa = (req, res) => {
    return res.render("verify2fa.ejs", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {
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
        name: req.session.name,
        email: req.session.email,
        password: req.session.password
    };
    console.log('Befor create user: ',newUser);
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};
module.exports =  {getPageVerify2fa: getPageVerify2fa,
                   createNewUser: createNewUser};