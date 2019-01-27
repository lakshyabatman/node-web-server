const express =require('express');
const mongoose= require('mongoose');
const hbs=require('hbs');
const path=require('path');
const bodyParser= require('body-parser')
const app= express();
const {Todo}=require('./db/todos')
app.set("views",path.join(__dirname+"/views"));
hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine' ,'hbs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())


hbs.registerHelper("date",()=>{
    return new Date().getFullYear()
})



mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser:true})



app.post("/todos",(req,res)=>{
    const newTodo = new Todo({
        text:req.body.data
    }).save().then((doc)=>{
        res.send({
            status:"ok",
            doc,
        })
    }).catch((err)=>{
        res.status(400).send({
            status:"Failed",
            err
        })
    })
})


app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        })
    }).catch((err)=>{
        res.status(400).send({
            status:"failed",
            err
        })
    })
})

app.get("/updateTodo",(req,res)=>{
    db.collection('Todos').findOneAndUpdate({
           text:req.query.text
        },{
            $set:{
                completed:true
            }
        },
        {
            returnOriginal:false,
        }
        ).then((result)=>{
            
            console.log(result)
            res.send("Updated")
        })
})

app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        "title":"About Page",
    })
})
const port=process.env.PORT || 4000
app.listen(port,function(){
    console.log("Server started at Port ",port)
})