// GET /api/categories
// POST /api/categories
// PUT /api/categories/:id
// DELETE /api/categories/:id

// getCategoriesRoute
// createCategoryRoute
// updateCategoryRoute
// deleteCategoryRoute



const express = require("express")


const router = express.Router()


const [getCategories, getCategoryById, createCategory,updateCategory,deleteCategory ] = require("./category.controller")


router.get('/',getCategories)
router.get('/:id',getCategoryById)
router.post('/createCategory',createCategory)
router.put('/updateCategory/:id',updateCategory)
router.delete('deltecategirt/:id',deleteCategory)



module.exports = router