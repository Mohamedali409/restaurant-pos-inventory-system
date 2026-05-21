import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomModal from '../ui/CustomModal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { axiosInstance } from '../../api/axiosInstance';

// schema
const CategoriesSchema = z.object({
  name: z.string().min(3, 'Name is required'),
});

const HeaderCategories = ({ onCategoryAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategoriesSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosInstance.post('/category', data);
      toast.success('Category added successfully ✅');
      setShowModal(false);
      reset();
      if (onCategoryAdded) onCategoryAdded();
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-3 rounded">
      <div>
        <h5 className="fw-bold fs-2">Categories</h5>
        <p>Manage your menu items and pricing</p>
      </div>

      <button className="btn btn-orange" onClick={() => setShowModal(true)}>
        <FaPlus className="me-2" />
        Add Categories
      </button>

      <CustomModal show={showModal} onClose={() => setShowModal(false)} title="Add Product">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            {...register('name')}
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </CustomModal>
    </header>
  );
};

export default HeaderCategories;
