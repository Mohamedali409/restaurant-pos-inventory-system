import { useEffect } from 'react';
import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function UpdateReorderLevelModal({
  show,
  product,
  onClose,
  setProducts,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        reorderLevel: product.reorderLevel || 20,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(`/inventory/${product._id}/reorder-level`, {
        reorderLevel: parseInt(data.reorderLevel, 10),
      });

      // update ui
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id
            ? { ...p, reorderLevel: parseInt(data.reorderLevel, 10) }
            : p
        )
      );

      toast.success('Reorder level updated successfully');
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to update reorder level');
    }
  };

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title={`Update Reorder Level - ${product?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-muted small mb-3">
          Set the minimum stock quantity before this item is considered "Low Stock".
        </p>
        <label className="form-label fw-bold">Reorder Level</label>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="e.g. 20"
          {...register('reorderLevel')}
        />
        <button className="btn btn-primary w-100">
          Save Reorder Level
        </button>
      </form>
    </CustomModal>
  );
}
