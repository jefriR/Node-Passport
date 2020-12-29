const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));

// Import Routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');

// Routes
app.use('/', indexRoute);
app.use('/users', userRoute);

// DB Config
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB Connected !!"));

// Init Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server run on port : ${PORT}`));