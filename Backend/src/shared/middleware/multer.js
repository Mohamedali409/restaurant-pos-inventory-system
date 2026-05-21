// import multer from "multer";

// const storageCategory = multer.diskStorage({
//   destination: (req, res, cd) => {
//     cd(null, "uploads/category");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const uploadCategory = multer({ storage: storageCategory });
// const uploadCategoryImage = uploadCategory.single("image");

// const storageProduct = multer.diskStorage({
//   destination: (req, res, cd) => {
//     cd(null, "uploads/product");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const updateProduct = multer({ storage: storageProduct });
// const uploadProductImage = updateProduct.single("image");

// export { uploadCategoryImage, uploadProductImage };

import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

// helper function
const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}`);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${randomUUID()}${ext}`;
      cb(null, uniqueName);
    },
  });
};

// common limits (optional but recommended)
const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

// Category upload
const uploadCategory = multer({
  storage: createStorage("category"),
  limits,
});

// Product upload
const uploadProduct = multer({
  storage: createStorage("product"),
  limits,
});

export const uploadCategoryImage = uploadCategory.single("image");
export const uploadProductImage = uploadProduct.single("image");
