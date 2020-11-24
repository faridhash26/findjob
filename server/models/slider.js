const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
    filename:{
        type:String
    },
    description:{
        type:String
    },
    path:{
        type:String,
        required:true
    }
    
})
module.exports = slideItem = mongoose.model('slideItem' , sliderSchema);