const express = require('express');
const router = express.Router();
const Course = require('./../../models/Course')

router.get('/', (req, res) => {
    Course.find()
        .then( courses => res.json(courses) )
        .catch( err => console.log(err) );
});

module.exports = router; 