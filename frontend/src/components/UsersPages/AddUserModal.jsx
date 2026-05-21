import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function AddUserModal({
  show,
  onClose,
  setUsers,
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Assuming POST /user or /users
      const res = await axiosInstance.post('/users', data);
      
      const newUser = res.data?.user || res.data?.data || res.data;
      
      // update ui
      setUsers((prevUsers) => [...prevUsers, newUser]);

      toast.success('User added successfully');
      reset();
      onClose();
    } catch (err) {
      // Try singular /user if plural fails
      if (err.response?.status === 404) {
        try {
          const res = await axiosInstance.post('/user', data);
          const newUser = res.data?.user || res.data?.data || res.data;
          setUsers((prevUsers) => [...prevUsers, newUser]);
          toast.success('User added successfully');
          reset();
          onClose();
          return;
        } catch (fallbackErr) {
          console.log(fallbackErr);
          toast.error(fallbackErr.response?.data?.message || 'Failed to add user');
        }
      } else {
        console.log(err);
        toast.error(err.response?.data?.message || 'Failed to add user');
      }
    }
  };

  return (
    <CustomModal
      show={show}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Add New User"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <label className="form-label fw-bold">Name <span className="text-danger">*</span></label>
        <input
          className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
          placeholder="User Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <div className="invalid-feedback mb-3" style={{marginTop: '-1rem'}}>{errors.name.message}</div>}

        {/* Email */}
        <label className="form-label fw-bold">Email <span className="text-danger">*</span></label>
        <input
          type="email"
          className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Email Address"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <div className="invalid-feedback mb-3" style={{marginTop: '-1rem'}}>{errors.email.message}</div>}

        {/* Password */}
        <label className="form-label fw-bold">Password <span className="text-danger">*</span></label>
        <input
          type="password"
          className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
          placeholder="Password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
        />
        {errors.password && <div className="invalid-feedback mb-3" style={{marginTop: '-1rem'}}>{errors.password.message}</div>}

        {/* Role */}
        <label className="form-label fw-bold">Role</label>
        <select className="form-select mb-4" {...register('role')}>
          <option value="cashier">Cashier</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {/* submit */}
        <button className="btn btn-primary w-100">
          Save User
        </button>
      </form>
    </CustomModal>
  );
}
