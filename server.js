require('dotenv').config();
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const initWebRoutes = require("./routes/web"); 
const initGoogle = require("./configs/GoogleAuth");
const bodyParser = require("body-parser");
const cookieParser = require ('cookie-parser');
const session =require ("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");

const app = express();

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

//Config Google
initGoogle(app);


app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

//Set up server engine 0dfj     1edj    fjf thwe causse you loved it to usc g 

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ClipperBook is running on port ${port}!`));
