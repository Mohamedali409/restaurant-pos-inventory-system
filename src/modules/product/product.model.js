// name
// description
// price
// cost
// image
// categoryId (ref Category)
// stock
// barcode
// isActive
// createdAt

// product → category (many-to-one)
// product → orderItems
// product → stockLogs







// const mongoose = require ('mongoose');

import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({

name:{
    type : String ,
    required : true ,
},
description :{
    type : String,
    required:true,
},
price:{
    type: Number,
    required: true
},
cost:{
    type:Number,
    required: true
},
image:{
    type:String,
    required: true
    
},
categoryid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
},
barcode:{
    type:String,
    required:true,
},
isActive:{
    type:Boolean,
    default:true
}
},
{timestamps:true}


)

// module.exports= mongoose.model('Products',ProductSchema);

const Products = mongoose.model('Products',ProductSchema);

exports.default= Products
