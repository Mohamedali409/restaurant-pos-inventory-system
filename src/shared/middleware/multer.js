import multer from "multer";

const storageCategory = multer.diskStorage({
  destination: (req, res, cd) => {
    cd(null, "uploads/category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadCategory = multer({ storage: storageCategory });
const uploadCategoryImage = uploadCategory.single("image");

const storageProduct = multer.diskStorage({
  destination: (req, res, cd) => {
    cd(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const updateProduct = multer({ storage: storageProduct });
const uploadProductImage = updateProduct.single("image");

export { uploadCategoryImage, uploadProductImage };
