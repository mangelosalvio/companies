const express = require('express');
const router = express.Router();
const Company = require('./../../models/Company')
const mongoose = require('mongoose')

router.post('/', (req, res) => {
  console.log(req.body.selectedCourses);
  const selectedCourses = req.body.selectedCourses.map(company => company._id);
  
  let query = {}
  if ( selectedCourses.length > 0 ) {
    query = {
      courses : {
        $elemMatch : {
          _id : {
            $in : selectedCourses
          }
        }
      }
    }
  } 

  Company.find(query)
    .sort({ company_name : 1 })
    .then(companies => res.json(companies) )
    .catch( err => console.log(err) )
});

router.get('/:id', (req, res) => {
  Company.findOne({ _id : req.params.id })
    .then( company => res.json(company) )
    .catch( err => console.log(err) )
}) 


router.post('/:id/courses', (req, res) => {
  Company.findOneAndUpdate({ _id : req.params.id }, {
    $set : {
      courses : req.body.courses
    }
  }, { new : true })
    .then( company => res.json(company) )
    .catch( err => console.log(err) )
}) 

module.exports = router; 