require('./config/config');
const express =require('express');
const _=require("lodash");
const hbs=require('hbs');
const path=require('path');
const bodyParser= require('body-parser');
const app= express();
const {Todo}=require('./Schema/todos');
const {users}=require('./Schema/users');
const {authenticate}=require('./middleware/authenticate')
app.set("views",path.join(__dirname+"/views"));
hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine' ,'hbs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

hbs.registerHelper("date",()=>{
    return new Date().getFullYear()
})

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

app.delete("/todos",(req,res)=>{
   
    console.log(req.body._id)

    Todo.findByIdAndRemove({
        _id: req.body._id
        }).then((todo)=>{
        if(!todo){
            return res.status(400).send("Todo doesnt exist")
        }
        res.send(todo)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.get("/updateTodo",(req,res)=>{
    if(req.query.text){
        Todo.findByIdAndUpdate((req.query.id),{
            text:req.query.text
        },
        {
            new:true
        }).then((todo)=>{
            res.send({
                status:"ok",
                todo
            })
        }).catch((err)=>{
            res.status(400).send({
                status:"Failed",
                err
            })
        })
    }
    else{
        Todo.findByIdAndUpdate((req.query.id),{
            completed:true
        },
        {
            new:true
        }).then((todo)=>{
            res.send({
                status:"ok",
                todo
            })
        }).catch((err)=>{
            res.status(400).send({
                status:"Failed",
                err
            })
        })
    }
})

app.post('/users',(req,res)=>{
    var body =_.pick(req.body,['email','password'])
    var user= new users(body)
    user.save().then(()=>{
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })


})


app.get('/users',authenticate,(req,res)=>{
    res.send(req.user)
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