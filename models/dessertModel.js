const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dessert =new Schema({
    CName:{
        type:String,
        required:true
    },
    Flavour:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }
    
});

module.exports = mongoose.model('Dessert',Dessert);