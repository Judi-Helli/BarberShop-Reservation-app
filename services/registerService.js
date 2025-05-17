const DBConnection = require("./../configs/DBConnection");
const bcrypt = require("bcryptjs");

const nodemailer =require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'weisseinv@gmail.com', //change to your email
        pass: 'wxcs psoe zhpl rcre', //change to your password
        
    }
})

function generateRandomCode() {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    return randomCode.toString();
}

function sendVerificationEmail(toEmail) {
const verificationCode = generateRandomCode();

let mailOpstions = {
    from: 'sendingemailtoauth@gmail.com',
    to: toEmail,
    subject:'Authentication Email',
    html:'<h1>'+verificationCode+'</h1>',}

transporter.sendMail(mailOpstions,(err,data) => {
    if(err) console.log('SendMail error : '+err)
    else console.log('mail sended with verification code : '+  verificationCode)

   return verificationCode
})
}


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                name: data.name,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
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
module.exports = {
    createNewUser: createNewUser,
    sendVerificationEmail
    //generateRandomCode
};
