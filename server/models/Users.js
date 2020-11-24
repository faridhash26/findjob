const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    register_date:{
        type: Date,
        default:Date.now
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type: String
    },
    gender:{
        type: String
    },
    birthyear:{
        type: Number
    },
    address:{
        type:String
    },
    about:{
        type: Array
    },
    skills:{
        type: Array
    },
    documents:{
        type: Array
    },
    projects:{
        type: Array
    },
    typeofuser:{
        type : String,
        default : 'user'
    },
    requests:{
        type: Array
    },
    level:{
        type: String
    },

});

UserSchema.pre('save' , function(next){
    const user = this ;
    bcrypt.genSalt(10 , (err , salt) =>{
        if (err) throw err ;
        bcrypt.hash(user.password , salt  , (err ,encpass) =>{
            if (err) throw err ; 
            user.password = encpass;
            next();
        })
    })
})

module.exports = User = mongoose.model('user' , UserSchema);