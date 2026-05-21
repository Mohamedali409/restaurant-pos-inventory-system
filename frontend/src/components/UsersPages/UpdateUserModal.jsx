import { useEffect } from 'react';
import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function UpdateUserModal({
  show,
  user,
  onClose,
  setUsers,
}) {
  const { register, handleSubmit, reset } = useForm();

  // fill form with old data
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'cashier',
      });
    }
  }, [user, reset]);

  // update user
  const onSubmit = async (data) => {
    try {
      // Trying PUT /users/:id or PUT /user/:id
      await axiosInstance.put(`/users/${user._id}`, data);

      // update ui
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id
            ? { ...u, ...data }
            : u
        )
      );

      toast.success('User updated successfully');
      onClose();
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await axiosInstance.put(`/user/${user._id}`, data);
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id
                ? { ...u, ...data }
                : u
            )
          );
          toast.success('User updated successfully');
          onClose();
          return;
        } catch (fallbackErr) {
          console.log(fallbackErr);
          toast.error(fallbackErr.response?.data?.message || 'Failed to update user');
        }
      } else {
        console.log(err);
        toast.error(err.response?.data?.message || 'Failed to update user');
      }
    }
  };

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title="Update User"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <label className="form-label fw-bold">Name</label>
        <input
          className="form-control mb-3"
          placeholder="User Name"
          {...register('name')}
        />

        {/* Email */}
        <label className="form-label fw-bold">Email</label>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          {...register('email')}
        />

        {/* Role */}
        <label className="form-label fw-bold">Role</label>
        <select className="form-select mb-4" {...register('role')}>
          <option value="cashier">Cashier</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {/* submit */}
        <button className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </CustomModal>
  );
}
