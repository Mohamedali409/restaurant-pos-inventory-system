import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { CiUser } from 'react-icons/ci';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import style from './Register.module.css';

import { toast } from 'react-toastify';
import { z } from 'zod';
import { axiosInstance } from '../../../api/axiosInstance';

const schema = z
  .object({
    name: z.string().min(1, 'User name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post('/auth/register', data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${style['register-page']}`}>
      <div className={`${style.authContent} text-center`}>
        <div className="info">
          <div className={`${style.logo} mb-3`}>
            <CiUser size={50} />
          </div>

          <h4 className="fw-bold">Create Account</h4>
          <p className="text-muted small">Join Restaurant POS today</p>
        </div>

        <div className={` ${style['register-card']} text-center p-4 shadow`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 text-start">
              <label className="form-label fs-14">name</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <BiUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  {...register('name')}
                />
              </div>
              {errors.name && <small className="text-danger">{errors.name.message}</small>}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fs-14">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaEnvelope />
                </span>
                <input type="email" className="form-control" {...register('email')} />
              </div>
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fs-14">Password</label>
              <div className="input-group">
                <span className="input-group-text  bg-white">
                  <FaLock />
                </span>
                <input type="password" className="form-control" {...register('password')} />
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fs-14">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text  bg-white">
                  <FaLock />
                </span>
                <input type="password" className="form-control" {...register('confirmPassword')} />
              </div>
              {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword.message}</small>
              )}
            </div>

            <button type="submit" className="btn btn-orange w-100 mb-3">
              Create Account
            </button>
          </form>

          <p className="small mb-0">
            Already have an account?{' '}
            <Link to="/auth" className="text-orange">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
