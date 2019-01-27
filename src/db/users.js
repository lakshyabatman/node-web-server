const mongoose= require('mongoose');

const users= mongoose.model('users',{
   name:{
       type:String,
       required:true,
       minlength:1,
       trim:true
   },
   password:{
       type:String,
       required:true,
       minlength:1,
       maxlength:20,
       trim:true
   }
})

module.exports={users}