//const registerService = require("./../services/registerService");
const { validationResult } = require("express-validator");
//const sendEmail = require("./../sendEmail");

let getPageVerifyreset = (req, res) => {
    return res.render("verifyreset.ejs", {
        errors: req.flash("errors")
    });
};

module.exports =  {getPageVerifyreset: getPageVerifyreset}