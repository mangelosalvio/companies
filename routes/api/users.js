const express = require('express')
const router = express.Router()
const User = require('./../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('./../../config/keys')
const passport = require('passport');

const validateRegisterInput = require('./../../validators/register');
const validateLoginData = require('./../../validators/login');

router.get('/', (req,res) => {

})

router.post('/login',(req,res) => {

    const {isValid, errors} = validateLoginData(req.body)

    if ( !isValid ) {
        return res.status(401).json(errors);
    }

    User.findOne({
        id_no : req.body.id_no
    }).then((user) => {
        if ( !user ) {
            errors['id_no'] = 'ID number not found';
            return res.status(401).json(errors);
        }

        bcrypt.compare(req.body.password, user.password)
            . then((isMatch) => {
                console.log(req.body.password, user.password, isMatch);
                if ( isMatch ) {

                    const payload = {
                        id : user._id,
                        id_no : user.id_no,
                        name : user.name
                    }

                    //sign token
                    jwt.sign(payload, keys.secretOrKey, { expiresIn : 3600 }, (err, token) => {
                        return res.json({
                            success : true,
                            token : "Bearer " + token
                        })
                    });                    
                } else {
                    return res.status(401).json({password : 'Password is invalid'}) 
                }

                
            })
    })
})

router.post('/register', (req,res)  => {

    const { errors, isValid } = validateRegisterInput(req.body);


    if ( !isValid ) {
        return res.status(401).json(errors);
    }

    User.findOne({ id_no : req.body.id_no })
        .then((user) => {
            if ( user ) {
                return res.status(401).json({id_no : 'ID Number already exists'});
            } else {
                const newUser = new User({
                    name : req.body.name,
                    id_no : req.body.id_no,
                    password : req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)  throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then( user => res.json(user) )
                            .catch( err => console.log(err) )
                    })
                })
            }
        })
})

router.get('/current', passport.authenticate('jwt', {session : false}), (req,res) => {
    return res.json({
        id : req.user.id,
        name : req.user.name,
        id_no : req.user.id_no
    });
})

module.exports = router;