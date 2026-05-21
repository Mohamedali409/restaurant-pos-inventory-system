import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .min(1, 'Price must be greater than 0'),
});

const AddProductForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* name */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Product Name"
          className="form-control"
          {...register('name')}
        />
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </div>

      {/* price */}
      <div className="mb-3">
        <input
          type="number"
          placeholder="Price"
          className="form-control"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <small className="text-danger">{errors.price.message}</small>}
      </div>

      <button className="btn btn-primary w-100">Save Product</button>
    </form>
  );
};

export default AddProductForm;
