const express =require('express');
const hbs=require('hbs');
const path=require('path');


const app= express();
app.set("views",path.join(__dirname+"/views"));
hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine' ,'hbs');

app.use((res,req,next)=>{
    console.log("Hi");
    next();
})

app.use(express.static(__dirname + "/public"));


hbs.registerHelper("date",()=>{
    return new Date().getFullYear()
})

app.get("/",(req,res)=>{
    res.render("home.hbs",{
        "title":"Home Page",

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