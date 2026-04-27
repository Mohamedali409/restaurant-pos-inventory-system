// name
// description
// isActive
// createdAt

// العلاقات:
// category → products (one-to-many)



import mongoose from "mongoose";



const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    }
    
}, { timestamps: true }
)


// module.exports= mongoose.model('Category',CategorySchema);

const Category = mongoose.model('Category',CategorySchema);

exports.default = Category ;