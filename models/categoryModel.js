const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    Name : {
        type:String,
        required:true
    },
    cID:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
        
    }
});

module.exports = mongoose.model('Category',Category);