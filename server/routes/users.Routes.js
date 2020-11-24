const router = require('express').Router();
const jwt = require ('jsonwebtoken');
const config = require('config');
const bcrypt =require ('bcrypt');

const user = require('../models/Users');


/* register user  */
router.post('/register', function (req, res, next) {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        res.status(400);
        if (!firstname) {
            res.json({
                msg: 'لطفا نام خود را وارد نمایید'
            });
        } else if (!lastname) {
            res.json({
                msg: "لطفا نام خانوادگی خود را وارد نمایید "
            });
        } else if (!email) {
            res.json({
                msg: "لطفا ایمیل خود را وارد نمایید "
            });
        } else if (!password) {
            res.json({
                msg: "لطفا پسورد خود را وارد نمایید"
            });
        }
    }
    user.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(400).json({
                    msg: "این ایمیل قبلا استفاده شده است"
                });
            } else {
                const newUser = new User({
                    firstname,
                    lastname,
                    email,
                    password
                })
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            {id : user.id },
                            config.get('jwtSecret'),
                            {expiresIn : 3600},
                            (err , token) => {
                                if (err) throw err ; 
                                res.json({
                                    token,
                                    user : {
                                    id :user.id,
                                    name : user.firstname,
                                    email : user.email}
                                })
                            }
                        );
                    })
            }
        })


});

//  login user 
router.post('/login' ,  ( req , res ) =>{
    const { email , password }  =  req.body ; 
    if (!email , !password ) {
        res.status(400);
        if(!email){
            res.json({
                msg : "لطفا ایمیل خود را وارد کنید"
            })
        }else if(!password){
            res.json({
                msg : "لطفا پسورد خود را وارد کنید"
            })
        }
    }
    user.findOne({
        email : email
    }).then( user =>{
        if( !user ) return res.status(400).json({
            msg : 'ایمیل اشتباه است '
        }) ;

        // validate password
        bcrypt.compare( password , user.password )
        .then( isMatch => {
            if (!isMatch) return res.status(400).json({ msg : 'رمز عبور اشتباه است'});
            jwt.sign(
                {id : user.id },
                config.get('jwtSecret'),
                {expiresIn : 3600},
                (err , token) => {
                    if (err) throw err ; 
                    res.json({
                        token,
                        user : {
                        id :user.id,
                        name : user.firstname,
                        email : user.email}
                    })
                }
            );
        })

    })
})

module.exports = router;
