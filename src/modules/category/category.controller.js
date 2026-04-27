// getCategories;
// createCategory;
// updateCategory;
// deleteCategory;



// const Category = require('./category.model')


import Category from "./category.model"

const getCategories = async(req , res , next)=>{

    try{
        const categories = await Category.find()

        if(categories.length == 0){
            return res.status(404).json({message:"no category found"})
        }

        res.status(200).json({message:"all categroy",categories})

    }
    catch(err){
        next(err)
    }
}





const getCategoryById = async(req , res , next)=>{
    try{
        const category = await Category.findById(req.params.id)
        if (!category){
            return res.status(404).json({message:"category not found"})
        }
        res.status(200).json({category})

    }

    catch(err){
        next(err)
    }
}




const createCategory = async(req , res , next)=>{


    try{

        const {name,image,isActive} = req.body ;
        const chackExist =await Category.findOne({name})
        if (chackExist){
            return res.status(301).json({message:"category alrady exist"})
        }


        const category = await new Category({name,image,isActive})
        category.save()


    }
    catch(err){
        next(err)
    }

}


const updateCategory = async(req, res , next)=>{
    
    try{
        const categoryid = req.params.id;
        const {name,image,isActive} = req.body ;

        const category = await Category.findByIdAndUpdate(categoryid,{name,image,isActive}, {new:true});

        if(!category){
            return res.status(404).json({message:"cetgroy not found"})
        }

        res.status(201).json({message:"category updated",category})
    }
    catch(err){
        next(err)
    }

}


const deleteCategory = async (req , res, next)=>{

    try{
        const categoryid = req.params.id;
        const category = await Category.findByIdAndDelete(categoryid)
        if(!category){
            return res.status(404).json({message:"categroy not found"})
        }
      req.status(201).json({message:"categry deleted ",category})

    }
    
    catch(err){
        next(err)
    }

}


module.exports = {getCategories,getCategoryById,createCategory,updateCategory,deleteCategory}

