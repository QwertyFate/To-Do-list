const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
var items = [];
var workitems = [];



app.use(express.static("public"));

app.get("/", function(req,res){
    var today = new Date();
    var currentday = today.getDay();
    var dayset = "";
    var option = {
        weekday: "long",
        month: "long",
        day: "numeric"

    };

    dayset = today.toLocaleDateString("en-US", option);
    res.render("list", {kindtitle: dayset, newitemlist: items, location:"/"});
});


app.post("/", function(req,res){
    var newitem = req.body.text;
    items.push(newitem);
    res.redirect("/");
});

app.get("/work", function(req, res){
    res.render("list", {kindtitle:"Work List", newitemlist: workitems, location:"/work" });
});

app.post("/work", function(req,res){
    let item = req.body.text;
    workitems.push(item);
    res.redirect("/work");

});


app.listen(3000,function(){
    console.log("server up at 3000 port");
});