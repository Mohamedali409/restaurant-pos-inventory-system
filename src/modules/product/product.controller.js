// getProducts
// createProduct
// updateProduct
// deleteProduct
// getProductById





import Products from "./product.model"




const getProducts = async(req , res , next)=>{

    try{
        const products = await Products.find();
        if(products.length==0){
            return res.status(404).json({message:"no product found"})
        }
        res.status(200).json({message:"all product",products})

    }
    catch(err){
        next(err)
    }
}





const getProductById = async (res , res , next)=>{


    try{
        const product = await Products.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"no product found"})
        }

        res.status(200).json({message:"product found ",product})

    }
    catch(err){
        next(err)
    }


}



const createProduct = async (req , res , next)=>{

    try{

        const {name,description,price,cost,categoryid,barcode,isActive}= req.body ;
        const ExistProduct = await Products.findOne({barcode});
        if(ExistProduct){
            return res.status(301).status({message:"product alrady exist"})
        }
        const product = await new Products({name,description,price,cost,categoryid,barcode,isActive})
        product.save()
        res.status(201).json({message:"product created", product})

    }
    catch(err){
        next(err)
    }
}


const updateProduct = async (req , res , next)=>{
    try{
        const {name,description,price,cost,categoryid,barcode,isActive}= req.body ;
        const product = await Products.findByIdAndUpdate(req.params.id,{name,description,price,cost,categoryid,barcode,isActive},{new:true});
        if(!product){
            return res.status(404).status({message:"product alrady exist"})
        }
        res.status(201).json({message:"product updated",product})

    }
    catch(err){
        next(err)
    }
}





const deleteProduct = async (req , res ,next)=>{

    try{
        const product = await Products.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        res.status(201).status({message:"product deleted"})

    }
    catch(err){
        next(err)
    }
}