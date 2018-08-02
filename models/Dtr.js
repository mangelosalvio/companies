const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DtrSchema = new Schema({
    id_no : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    shift_in : {
        type : Date
    },
    lunch_out : {
        type : Date
    },
    lunch_in : {
        type : Date
    },
    shift_out : {
        type : Date
    }
})

module.exports = mongoose.model('dtr',DtrSchema);