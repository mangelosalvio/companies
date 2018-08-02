const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    id_no : {
        type : String,
        required : true
    },
    password : {
        type : String
    }
});

module.exports = mongoose.model('users', UserSchema);