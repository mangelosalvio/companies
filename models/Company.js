const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    company_name : {
        type : String,
        required : true
    },
    company_address : {
        type : String
    },
    courses : {
        type : Array
    }
})

module.exports = mongoose.model('companies',CompanySchema);