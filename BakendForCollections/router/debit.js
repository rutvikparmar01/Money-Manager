const experess = require("express")
const {body,validationResult}=require("express-validator")
const fetchUser = require("../middleware/fetchUser")
const router = experess.Router();
const Debitdata = require("../models/Debitdata")



//*route :1 For get all debitData

router.get("/showdata",fetchUser,async(req,res)=>{
    try {
        const allData=await Debitdata.find();
        res.json(allData)
    } catch (error) {
        res.status(401).send("internal error")
        console.log(error);
    }
})


//* route : 2  For add DebitData---------------------------

router.post('/addDebit',fetchUser,[
    body("reason","Enter a reason please").isLength({min:5}),
    body("amount","Amount not be empty").notEmpty(),
    body("name","please enter your name").notEmpty()
   ],
async(req,res)=>{
    try {
        const {reason , amount ,name}= req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const debit = new Debitdata({
            reason,
            amount,
            name
        })
        const savedebit=await debit.save();
        res.json(savedebit)
        
    } catch (error) {
        res.status(401).send("internal error");
        console.log(error);
    }
}


)

module.exports = router;