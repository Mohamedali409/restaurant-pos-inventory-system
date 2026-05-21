import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomModal from '../ui/CustomModal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { axiosInstance } from '../../api/axiosInstance';

// schemas
const productSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  cost: z.number().min(0, 'Cost must be 0 or more'),
  categoryId: z.string().min(1, 'Category is required'),
  barcode: z.string().optional(),
  image: z.any(), //
});

const HeaderProducts = ({ onProductAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/category');
        console.log(res.data.category);
        setCategories(res.data.category);
      } catch {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  //  submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('cost', data.cost);
      formData.append('categoryId', data.categoryId);
      formData.append('barcode', data.barcode || '');

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product added successfully ');
      setShowModal(false);
      reset();
      if (onProductAdded) onProductAdded();
    } catch (error) {
      toast.error(error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded">
      <div>
        <h5 className="fw-bold fs-2">Products</h5>
        <p>Manage your menu items and pricing</p>
      </div>

      <button className="btn btn-orange" onClick={() => setShowModal(true)}>
        <FaPlus className="me-2" />
        Add Product
      </button>

      <CustomModal show={showModal} onClose={() => setShowModal(false)} title="Add Product">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <input className="form-control mb-2" placeholder="Product Name" {...register('name')} />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}

          {/* description */}
          <input
            className="form-control mb-2"
            placeholder="Description"
            {...register('description')}
          />
          {errors.description && (
            <small className="text-danger">{errors.description.message}</small>
          )}

          {/* price */}
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <small className="text-danger">{errors.price.message}</small>}

          {/* cost */}
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Cost"
            {...register('cost', { valueAsNumber: true })}
          />
          {errors.cost && <small className="text-danger">{errors.cost.message}</small>}

          {/* category dropdown  */}
          <select className="form-control mb-2" {...register('categoryId')}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}

          {/* barcode */}
          <input className="form-control mb-2" placeholder="Barcode" {...register('barcode')} />

          {/* image */}
          <input type="file" className="form-control mb-3" {...register('image')} />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </CustomModal>
    </header>
  );
};

export default HeaderProducts;
