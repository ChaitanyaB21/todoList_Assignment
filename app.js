const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Setting up the mongo DB server on the local system

mongoose.connect("mongodb://127.0.0.1:27017/projectTodoDB");

const itemSchema = new mongoose.Schema({
    // _id : Number,
    itemString: String,
})

const Items = mongoose.model('Item', itemSchema)

// -------------------------------------------------------------------

// Setting up the root route

const itemsList = []
const idList = []

async function updateitemsList() {
    elements = await Items.find({})
    elements.forEach(element => {
        itemsList.push(element.itemString);
    });

    elements.forEach(element => {
        idList.push(element._id);
    });
    
}

updateitemsList();



app.get("/", function (req, res) {

    // Items.collection.find({}).forEach(function(elements){
    //     itemsList.push(elements.itemString);
    // })
    

    res.render("Home.ejs", { list: itemsList , idList : idList});
})

// -----------------------------------------------------------------------

// Setting up the post route 

app.post("/", function (req, res) {
    const input = req.body.input;
    // itemsList.push(input);

    const item = new Items({
        // _id: ,
        itemString: input
    })

    item.save();

    itemsList.push(input);
    res.redirect("/");


})


// -------------------------------------------------------------------------------


app.listen(3000, function () {
    console.log("Internship project is running buttery smooth");
})