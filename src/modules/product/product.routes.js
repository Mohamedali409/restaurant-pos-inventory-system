// GET /api/products
// GET /api/products/:id
// POST /api/products
// PUT /api/products/:id
// DELETE /api/products/:id

// getProductsRoute
// createProductRoute
// updateProductRoute
// deleteProductRoute
// getProductByIdRoute




const express = require("express")
const router = express.Router()


const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require("./product.controller")




router.get("/",getProducts)
router.get("/:id",getProductById)
router.post("/createProduct",createProduct)
router.put("update/:id",updateProduct)
router.delete("delete/:id",deleteProduct)




module.exports=router