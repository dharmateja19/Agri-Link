import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const apiurl = import.meta.env.VITE_BACKEND_BASE_URL
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(process.env.REACT_APP_BACKEND_BASE_URL)
      console.log(apiurl);
      
      const res = await axios.post(`${apiurl}/auth/login`, formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);

      const role = res.data.user.role;
      if (role === 'farmer') navigate('/farmer/dashboard');
      else if (role === 'buyer') navigate('/buyer/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
      <div className='bg-gray-300 min-h-screen flex items-center justify-center pt-[70px]'>
        <form
          className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Login to AgriLink</h2>

          <input
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer transition"
            type="submit"
            value="Login"
          />

          {error && <p className="text-red-600 text-center mt-3">{error}</p>}

          <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
              </Link>
          </p>
        </form>
      </div>
  );
};

export default Login;
