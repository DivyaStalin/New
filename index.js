const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



const env = require("dotenv").config();
app.use(express.json());




const port = 5050;
const uri = process.env.db_url;
mongoose.connect(
    uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("DB error",err);
});

const dessert = require('./routes/desserts');




app.use('/food',dessert);






app.listen(port,() => {
    console.log("App is listening port:5050");
});
