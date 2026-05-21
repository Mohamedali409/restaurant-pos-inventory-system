import { useEffect } from 'react';
import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function UpdateStockModal({
  show,
  product,
  onClose,
  setProducts,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        stock: product.stock || 0,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      // Use the new inventory adjust endpoint
      await axiosInstance.put('/inventory/adjust', {
        productId: product._id,
        currentStock: parseInt(data.stock, 10),
      });

      // update ui
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id
            ? { ...p, stock: parseInt(data.stock, 10) }
            : p
        )
      );

      toast.success('Stock updated successfully');
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to update stock');
    }
  };

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title={`Update Stock - ${product?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label fw-bold">Current Stock</label>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stock quantity"
          {...register('stock')}
        />
        <button className="btn btn-primary w-100">
          Save Stock
        </button>
      </form>
    </CustomModal>
  );
}
