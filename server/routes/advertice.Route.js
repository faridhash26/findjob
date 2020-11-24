const router = require('express').Router();

const advertice = require('../models/advertise');
const userguard = require('../midlewares/guarduser');






// add the advertice item 
router.post('/additem',userguard , (req, res) => {
    const {company , need ,  location  ,description , typeofneed} = req.body;
    const newadvertice = new advertice({
        company,
        need,
        location,
        description,
        typeofneed
    });
    newadvertice.save()
    .then(
        res.json({
            msg : 'درخواست شما با موفقیت ثبت گردید'
        })
    )
})

// remove advertice item
router.delete( '/:id',userguard  , (req,res) =>{
    advertice.findById(req.params.id)
    .then(item=> item.remove().then(()=>res.json({successdelete : "آیتم با موفقیت حذف شد"})))
    .catch(err => res.status(404).json({error : " آیتم مورد نظر پیدا نشد"}))
})

module.exports = router;