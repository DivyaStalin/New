const Category = require("../models/categoryModel");
const Dessert = require("../models/dessertModel");
const route = require('express').Router();
 const upload = require('../middleware/upload');

 route.post('/postCategory',upload.single('file'),async(req,res)=>{
 try{   
    const{Name,cID} = req.body;
    const category = new Category({Name,cID})
    if(req.file){
        productdata.file=req.file.filename;
     }

    const result = await category.save();
    if(result){
        res.status(200).json({status:true,message:'success'});
    }else{
        res.status(400).json({status:false,message:'failed'});
    }
}catch(err){
    console.log(err)
} 
});

route.post('/postDessert',async(req,res)=>{
    try{   
        const{CName,Flavour,Image,Price,Quantity} = req.body;
        const category = new Dessert({CName,Flavour,Image,Price,Quantity});
        const result = await category.save();
        if(result){
            res.status(200).json({status:true,message:'success'});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }
});

route.get('/getCategory',async(req,res)=>{
    try{ 
        let query = {Name:req.body.Name};
        const result = await Category.find(query).exec();
        if(result){
            res.status(200).json({status:true,message:'success',Category:result});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }
});

route.get('/getDessertCategoryBased',async(req,res)=>{
    try{ 
        let query = [{$lookup:{
            from:'Dessert',
            localField:'Name',
            foreignField:'CName',
            as:"myResult"
        }}]
        const result = await Category.aggregate(query)
        if(result.length>0){
            res.status(200).json({status:true,message:'success',Category:result});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }
});
//all desserts
route.get('/getAlldeserts',async(req,res)=>{
    try{ 
        
        const result = await Dessert.find();
        if(result){
            res.status(200).json({status:true,message:'success',Category:result});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }
});

//search desserts based on price

route.get('/searchPrice',async(req,res)=>{
    try{ 
        const result = await Dessert.find({Price:req.query.Price});
        if(result){
            res.status(200).json({status:true,message:'success',Category:result});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }
});

route.get('/searchByCategory',async(req,res)=>{
    try{ 
        const result = await Dessert.find({CName:req.query.CName}).count();
        if(result){
            res.status(200).json({status:true,message:'success',Category:result});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }
    }catch(err){
        console.log(err)
    }

});

route.get('/OrderDesserts',async(req,res)=>{
    try{ 
        
        const result = await Dessert.find({CName:req.body.CName});
        console.log(result);
        if(result){
            const result = await Dessert.find({Flavour:req.body.Flavour});
            if(result){
                res.status(200).json({status:true,message:'success'})

            }else{
                res.status(400).json({status:false,message:'All Items sold'})
            } 

        }else{
            res.status(400).json({status:false,message:"Item not found"})
        }
        
    }catch(err){
        console.log(err)
    }

});

route.get('/OrderDessert',async(req,res)=>{
    try{ 
        /*let query = [{
            $match:{$and:[{CName:req.body.CName},{Flavour:req.body.Flavour}]}},
            {$project:{CName:'$CName',_id:0,Price:1,result:{$subtract:['$Quantity',2]}}
        }];
        const data = await Dessert.aggregate(query);*/
        //console.log(data);
        const result = await Dessert.find({CName:req.body.CName});
        //console.log(result);
        if(result){
            const result = await Dessert.find({Flavour:req.body.Flavour});
            if(result){
                res.status(200).json({status:true,message:'success'})

            }else{
                res.status(400).json({status:false,message:'All Items sold'})
            } 

        }else{
            res.status(400).json({status:false,message:"Item not found"})
        }
        
    }catch(err){
        console.log(err)
    }

});



route.get("/latestRecepies",async(req,res)=>{
try{
            const result = await Dessert.find({}).sort({_id:-1}).limit(2);
            if(result){
                res.status(200).json({status:true,message:'success',result:result})

            }else{
                res.status(400).json({status:false,message:'All Items sold'})
            } 
    }catch(err){
        console.log(err)
    }

});

module.exports = route;
