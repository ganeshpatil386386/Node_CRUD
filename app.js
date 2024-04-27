const express = require("express");
const { title } = require("process");
const path = require("path")
require("dotenv").config();
const user = require("./models/userModel")
const app = express();

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, "/public")))


const PORT = process.env.PORT || 8081

app.get("/", (req, res) => {
    res.render("index")    
});

app.get("/read", async (req, res) => {
   let getUsers = await user.find()
    res.render("read", {getUsers})    
});

app.post("/crush", async (req, res) => {
    try{
    const {name,email,imageurl} = req.body;
    let sendData = await user.create({
        name,
        email,
        imageurl
    })    

    res.redirect("/read")
    }catch(err){
        console.log(err)
    }
});

app.get("/deluser/:id", async (req,res)=>{
    let userDel = await user.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})

app.get("/upuser/:id", async (req,res)=>{
    const userUp = await user.findOne({_id: req.params.id})
    res.render("update", {userUp})
})

app.post("/edit/:id", async (req,res)=>{
    const {name,email,imageurl} = req.body;
    const Edituser = await user.findOneAndUpdate({_id: req.params.id}, {name,email,imageurl}, {new:true})
    res.redirect("/read")
})












app.get("/create", async (req, res) => {
   let userCreation = await user.create({
        name: "Ganesh",
        email: "ganesh@gmail.com",
        username: "devgancode"
    })

    
    res.send(userCreation)
});

app.get("/update", async (req, res) => {
    
   let userUpdate = await user.findOneAndUpdate(
    {name:"Ganesh"}, // findOne by name
    {username:"Shreya"}, // what to update
    {new: true} // returns updated user
)

    
    res.send(userUpdate)
})

app.get("/delete", async (req,res) => {
    let userDelete = await user.findOne({name:"Shreya"})    
    

    res.send(userDelete);
})
app.listen(PORT, (req,res)=> {
    console.log(`app is running on port: ${PORT}`)
})