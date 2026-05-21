import { useEffect, useState } from 'react';
import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';

export default function UpdateTable({
  show,
  product,
  onClose,
  setProducts,
}) {

  // categories state
  const [categories, setCategories] = useState([]);

  // react hook form
  const { register, handleSubmit, reset } = useForm();

  // fetch categories
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/category');
        setCategories(res.data.category || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();

  }, []);

  // fill form with old data
  useEffect(() => {

    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        categoryId: product.categoryId?._id,
      });
    }

  }, [product, reset]);

  // update product
  const onSubmit = async (data) => {

    try {

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('cost', data.cost);
      formData.append('barcode', data.barcode || '');
      formData.append('categoryId', data.categoryId);

      // image
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      // api update
      await axiosInstance.put(
        `/products/${product._id}`,
        formData
      );

      // update ui
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id
            ? {
                ...p,
                ...data,
                categoryId: categories.find(
                  (cat) => cat._id === data.categoryId
                ),
              }
            : p
        )
      );

      // close modal
      onClose();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title="Update Product"
    >

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* name */}
        <input
          className="form-control mb-2"
          placeholder="Product Name"
          {...register('name')}
        />

        {/* description */}
        <input
          className="form-control mb-2"
          placeholder="Description"
          {...register('description')}
        />

        {/* price */}
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          {...register('price')}
        />

        {/* cost */}
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Cost"
          {...register('cost')}
        />

        {/* category */}
        <select
          className="form-control mb-2"
          {...register('categoryId')}
        >

          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.name}
            </option>
          ))}

        </select>

        {/* barcode */}
        <input
          className="form-control mb-2"
          placeholder="Barcode"
          {...register('barcode')}
        />

        {/* image */}
        <input
          type="file"
          className="form-control mb-3"
          {...register('image')}
        />

        {/* submit */}
        <button className="btn btn-primary w-100">
          Update Product
        </button>

      </form>

    </CustomModal>
  );
}