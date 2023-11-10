const mongoose=require("mongoose")
const {Schema} = mongoose

const DebitSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
       
      
      },
     
   reason:{
    type:String,
    require:true
   },
  
   amount : {
     type:Number,
     require:true
   },
   name:{
    type:String,
    require:true
   },
   Date:{
     type:Date,
     default:Date.now
   }




})

module.exports=mongoose.model("debit",DebitSchema)