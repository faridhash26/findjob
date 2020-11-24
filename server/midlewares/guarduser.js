const config= require ('config');
const  jwt = require ('jsonwebtoken');
const user = require('../models/Users');



function guardUser (req , res , next){
    const  token = req.header('x-auth-token');

    // check for token
    if(!token) return res.status(401).json({ notoken  : 'notoken'});
    var decoded = null ;
    try{
        // verify json
         decoded = jwt.verify(token , config.get('jwtSecret'));
         
        
    }catch(e){
        res.status(400).json({
            msg: 'token is not valid'
        })
    }
user.findById(decoded.id).then(user=>{
    if(!user) return res.json({error : 'userundifind'});
    if(user.typeofuser === 'admin') {
        req.user = decoded;
        next();
    }
    else return res.status(400).json({error : 'acessdenied'});
    
})

 
}
module.exports = guardUser;




//  req.user = decoded