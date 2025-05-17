const DBConnection = require("./../configs/DBConnection");
const bcrypt = require("bcryptjs");

let checkNewUserExist = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data);
        if (isEmailExist) {
            reject(`This email "${data}" has already exist. Please choose an other email`);
        } 
    });
};

let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};



module.exports = {checkNewUserExist};