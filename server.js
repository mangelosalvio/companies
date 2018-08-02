require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const path = require('path')

//passport middleare
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;


//routes
const companies = require('./routes/api/companies');
const courses = require('./routes/api/courses');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

mongoose
    .connect(db)
    .then( () => console.log('MongoDB Connected'))
    .catch( (err) => console.log(err) );

app.use('/api/companies',companies);
app.use('/api/courses',courses);

if ( process.env.NODE_ENV === 'production' ) {
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}



const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => console.log(`Server running on PORT ${port}`));