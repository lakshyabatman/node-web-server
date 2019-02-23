const mongoose= require('mongoose')
const validator=require('validator')
const users= mongoose.model('users',{
   email:{
       type:String,
       required:true,
       minlength:1,
       trim:true,
       unique:true,
       validate:
       {
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email',
       }
     
       },
   password:{ 
       type:String,
       required:true,
       minlength:1,
       maxlength:20,
       trim:true
   },
   tokens:[{
      access:{
          type:String,
          required:true
      },
      token:{
          type:String,
          required:true
      } 
   }]
})

module.exports={users}