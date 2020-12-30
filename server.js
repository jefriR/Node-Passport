const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
})); //BodyParser
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})); //Session
app.use(flash()); //ConenctFlash

// Import Routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');

// Routes
app.use('/', indexRoute);
app.use('/users', userRoute);

// Global Variabel
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next(); 
});

// DB Config
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB Connected !!"));

// Init Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server run on port : ${PORT}`));