import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CiUser } from 'react-icons/ci';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { axiosInstance } from '../../../api/axiosInstance';
import { getDefaultPathByRole } from '../../../Routers/ProtectedRoute';
import style from './Login.module.css';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      console.log();
      const token = response.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      const role = response.data?.user?.role;
      const userid = response.data.user._id;
      if (role) {
        localStorage.setItem('role', role);
        localStorage.setItem('userid', userid);
      }
      toast.success(response.data.message);
      navigate(getDefaultPathByRole(role), { replace: true });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${style['login-page']}`}>
      <div className={`${style.authContent} text-center`}>
        <div className="info">
          <div className={`${style.logo} mb-3`}>
            <CiUser size={50} />
          </div>

          <h4 className="fw-bold">Welcome Back</h4>
          <p className="text-muted small">Sign in to your Restaurant POS account</p>
        </div>

        <div className={` ${style['login-card']} text-center p-4 shadow`}>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button type="submit" className="btn text-white btn-orange w-100 mb-3">
              Login
            </button>
          </form>

          <p className="small mb-0">
            Don&apos;t have an account?{' '}
            <Link to="/auth/register" className="text-orange">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
