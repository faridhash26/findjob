const { json } = require('express');
var express = require('express');
const fs = require('fs');


const advertice = require('../models/advertise');
const Users = require('../models/Users');
const slideItem = require('../models/slider');


var router = express.Router();
/* GET home listing. */

router.get('/adverticeapge' , (req,res)=>{
  advertice.find()
  .sort({ date: -1})
  .then(items => res.json(items));
});



router.get('/bestusers' , (req,res)=>{
  Users.find({ level: 'A'})
  .then(USER=>{
    function randomuser (){
     var random=   Math.floor(Math.random() * USER.length);
     let firstname = USER[random].firstname;
     let _id = USER[random]._id;
     let lastname = USER[random].lastname;
     let userinfo={
       _id:_id,
       firstname:firstname,
       lastname:lastname
     }
     return userinfo
    }
   res.json({bestusers:[randomuser() , randomuser(),randomuser(),randomuser()]})
  })
});




// psot get slider 

// get file from client 
router.post('/uploadslider', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: " no file uploaded" });
  }
  const slidefile = req.files.file;

 
  var locationfile = '../client/public/slider'
  if (!fs.existsSync(locationfile)) {
    fs.mkdirSync(locationfile)
  }

  // find item 
  slideItem.findOne({ filename: slidefile.name })
    .then(FILE => {
      if (FILE) {
        res.status(400).json({
          msg: "این فایل موجود است"
        });
      }
      else{
        
          // save in the directory
          slidefile.mv(`${__dirname}/../../client/public/slider/${slidefile.name}`, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
           
          })

          // save location in the database
          const newslide = new slideItem({
            path :  `/slider/${slidefile.name}`,
            filename:slidefile.name
          }) .save()       
      }
    })
})



// get slider 
router.get('/allslide' ,( req,res)=>{
  slideItem.find()
  .then(items=>res.json(items))
})



module.exports = router;
