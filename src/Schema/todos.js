const mongoose=require('mongoose')

var TodoSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})


const Todo= mongoose.model("Todo",TodoSchema)


module.exports={Todo}