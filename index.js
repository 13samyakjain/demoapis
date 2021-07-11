const express = require('express');
const app = express();
if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}
const PORT = process.env.PORT || 3001;
const loginuser = require('./routes/user')
const location = require('./routes/locations')
const child = require('./routes/child')
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const mongoose = require('mongoose')
app.use(cors({credentials:true}))
app.use(expressSession({
    secret:'app secret',
    resave:true,
    saveUninitialized:true
}))
app.use(cookieParser('app secret'))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)
app.use('/user', loginuser);
app.use('/location',location);
app.use('/child',child)
mongoose.connect(process.env.mogoDB)
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})
