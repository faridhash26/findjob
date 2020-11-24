const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;


const advertiseSchema = new Schema({
    company:{
        type : String,
        required: true,
    },
    need : {
        type : String,
        required : true
    },
    location : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    typeofneed : {
        type :String
    },
    dateofenterd : {
        type :Date,
        default : Date.now
    }

})


module.exports = item = mongoose.model('advertise' , advertiseSchema);