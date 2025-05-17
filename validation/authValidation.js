const { check } = require("express-validator");

let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

let validateLogin = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password")
    .not().isEmpty()
];

let validateVerify2fa = [
    check("verificationCode", "Invalid verificationCode .. must be at least 5 chars long")
    .isLength({ min: 5 }),
    /*.custom((value, { req }) => {
        return value === req.body.verificationCode
    })*/
];

let validateVerifyreset = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];


module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin,
    validateVerify2fa: validateVerify2fa,
    validateVerifyreset: validateVerifyreset
};
