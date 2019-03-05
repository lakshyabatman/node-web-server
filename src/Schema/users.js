const mongoose= require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
 const userSchema= mongoose.Schema({
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

userSchema.methods.generateAuthToken=function(){
    var user=this
    var access='auth'
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()
    user.tokens=user.tokens.concat([{access,token}])
    
    return user.save().then(()=>{
        return token;
    })
}


userSchema.statics.findByToken= function (token) {
    var User=this
    var decoded
    try {
        decoded=jwt.verify(token,'abc123')
    } catch (error) {
        return Promise.reject()
    }

    return users.findOne({
         '_id':decoded._id,
         'tokens.token':token,
         'tokens.access':'auth',
    })
}

const users= mongoose.model('users',userSchema)

module.exports={users}